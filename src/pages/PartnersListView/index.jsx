// ---------------------------------------------------------------------------
// Shared partner-list page for RU/DH source-partitioned partners.
//
// Backs the new "Guesty PMs" (source='G') and "RU PMs" (source='RU') menu
// entries under Partner Management. One component, two thin wrapper pages
// (PartnersGuestyDH, PartnersRuDH) pass different apiParams.
//
// Design goals vs the legacy PartnersSH / PartnersVT / PartnersRU:
//   * single backend call per page load — /local/partners-by-source is
//     an aggregation that returns partners + status counts inline, so we
//     drop the N+1 pattern that made the legacy pages take 3-5s.
//   * static reference data (allZipcodes + exchange rates) is fetched
//     once per session via a module-scope memo, not on every render.
//   * no synchronous pre-drill-down POST for zipcodes — Listings2 loads
//     its own; the round-trip added latency for no visible benefit.
//   * debounced search input so we don't rebuild request params on every
//     keystroke.
//
// Visual language matches theme-dashboard.css + DuplicatedListings.scss.
// Note on "Sort by": the label is honest — /local/partners-by-source uses
// the status param ONLY to pick a sort key, never to filter. See
// getBySource() in VTHub api/controllers/users.js.
// ---------------------------------------------------------------------------

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FiUsers, FiChevronRight, FiChevronLeft } from "react-icons/fi";

import Layout from "../../components/Layout/index.js";
import Paging from "../../components/Paging";
import { PATH_LISTINGS } from "../../Util/constants";
import constants from "../../Util/constants";
import "./PartnersListView.scss";

// ---------------------------------------------------------------------------
// Module-scope caches — survive component unmount/mount and cross-page
// navigation, so switching between the Guesty and RU pages doesn't refetch
// zipcodes or exchange rates. Cleared only on full page reload / sign-out.
// ---------------------------------------------------------------------------
let allZipcodesCache = null;
let exchangeRatesCache = null;

const userRequest = axios.create({
  baseURL: constants.SHUB_URL,
  headers: { Authorization: constants.SHUB_TOKEN },
});

async function ensureAllZipcodes() {
  if (allZipcodesCache) return allZipcodesCache;
  try {
    const res = await userRequest.post("local/all-zipcodes");
    allZipcodesCache = res.data || [];
    localStorage.setItem("allZipcodes", JSON.stringify(allZipcodesCache));
  } catch (e) {
    console.error("ensureAllZipcodes failed", e?.message || e);
    allZipcodesCache = [];
  }
  return allZipcodesCache;
}

async function ensureExchangeRates() {
  if (exchangeRatesCache) return exchangeRatesCache;
  try {
    const res = await axios.get("https://api.villatracker.ch/xchange");
    exchangeRatesCache = res.data || {};
  } catch (e) {
    console.error("ensureExchangeRates failed", e?.message || e);
    exchangeRatesCache = {};
  }
  return exchangeRatesCache;
}

// Sort-by options — labels match the count columns.
const SORT_OPTIONS = [
  { key: "", label: "Total" },
  { key: "Approved", label: "Approved" },
  { key: "Pending", label: "Pending" },
  { key: "Declined", label: "Declined" },
  { key: "Unmapped", label: "Unmapped" },
];

// Small helper — pill for a count with variant + zero styling.
function CountPill({ variant, value, onClick }) {
  const isZero = !value || Number(value) === 0;
  return (
    <span
      className={`status-pill ${variant} ${isZero ? "is-zero" : ""}`}
      onClick={(e) => {
        if (isZero) return;
        e.stopPropagation();
        onClick?.();
      }}
    >
      {isZero ? "—" : value}
    </span>
  );
}

const PartnersListView = (props) => {
  const {
    title,
    subhead,
    apiParams,
    statusFilterKey,
    // Backend endpoint (defaults to the RU/DH source-partitioned aggregation).
    // Legacy channel pages point at their own routes (e.g. 'local/partners',
    // 'local/partners-bookingpal') via the wrapper — the shell code is the same.
    endpoint = "local/partners-by-source",
    // Route to drill down to when a row is clicked. Defaults to /listings, but
    // e.g. BookingPal has its own listings page (PATH_LISTINGS_BOOKINGPAL).
    drilldownPath = PATH_LISTINGS,
    // Layout props passed through from the route.
    token,
    agency,
    agent,
    screenSize,
    activeMenu,
    handleToggleMenu,
    setActiveMenu,
  } = props;

  const history = useHistory();

  // Stable key for apiParams so useCallback deps compare by value, not by
  // reference — wrapper passes a fresh object literal every render. Reading
  // apiParams inside the callback stays fine because React always closes over
  // the latest render's value on a re-render, and we only re-run the callback
  // when the stringified key actually changes.
  const apiParamsKey = JSON.stringify(apiParams || {});

  // -------------------------------------------------------------------------
  // Local state
  // -------------------------------------------------------------------------
  const [partners, setPartners] = useState([]);
  const [totalPartners, setTotalPartners] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const initialPage = (() => {
    const qs = new URLSearchParams(window.location.search);
    const p = parseInt(qs.get("page"), 10);
    return Number.isFinite(p) && p >= 0 ? p : 0;
  })();
  const [pageNumber, setPageNumber] = useState(initialPage);

  const persistedStatus =
    (statusFilterKey && localStorage.getItem(statusFilterKey)) || "";
  const [filterPropertyStatus, setFilterPropertyStatus] =
    useState(persistedStatus);

  const [searchInputRaw, setSearchInputRaw] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const searchDebounceRef = useRef(null);

  // -------------------------------------------------------------------------
  // Derived pagination display
  // -------------------------------------------------------------------------
  const partnersPagingFrom = 1 + pageNumber * constants.PAGING_PARTNERS_SIZE;
  const partnersPagingTo = useMemo(() => {
    const cap = partnersPagingFrom + constants.PAGING_PARTNERS_SIZE - 1;
    return totalPartners && cap > totalPartners ? totalPartners : cap;
  }, [partnersPagingFrom, totalPartners]);

  const totalPages = useMemo(() => {
    if (!totalPartners) return 1;
    return Math.max(1, Math.ceil(totalPartners / constants.PAGING_PARTNERS_SIZE));
  }, [totalPartners]);

  // -------------------------------------------------------------------------
  // Data fetch — single aggregation endpoint
  // -------------------------------------------------------------------------
  const loadPartners = useCallback(
    async (isFirstLoad = false) => {
      if (isFirstLoad) setIsLoading(true);
      else setIsRefetching(true);
      // Whatever the wrapper hands us in apiParams (provider, source,
      // channelSource, etc.) is passed straight through as query params.
      // The shell only owns limit/skip/status/pmName.
      const params = {
        ...(apiParams || {}),
        limit: constants.PAGING_PARTNERS_SIZE,
        skip: partnersPagingFrom - 1,
        status: filterPropertyStatus || undefined,
        pmName: searchInput || undefined,
      };
      try {
        const res = await userRequest.get(endpoint, { params });
        const data = res?.data || {};
        const rows = Array.isArray(data.partners) ? data.partners : [];
        const count = Number(data.count) || 0;
        setPartners(rows);
        setTotalPartners(count);
        localStorage.setItem("partnerCount", String(count));
      } catch (e) {
        console.error(`${endpoint} failed`, e?.message || e);
        setPartners([]);
        setTotalPartners(0);
      }
      setIsLoading(false);
      setIsRefetching(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      endpoint,
      apiParamsKey,
      partnersPagingFrom,
      filterPropertyStatus,
      searchInput,
    ]
  );

  // Load reference data ONCE on mount (module-cached across pages).
  useEffect(() => {
    ensureAllZipcodes();
    ensureExchangeRates();
  }, []);

  // First load flag — separates skeleton from top-bar refetch spinner.
  const firstLoadDoneRef = useRef(false);
  useEffect(() => {
    const isFirst = !firstLoadDoneRef.current;
    loadPartners(isFirst);
    firstLoadDoneRef.current = true;
  }, [loadPartners]);

  // Debounce the search input — commit to the query ~300ms after last keystroke.
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setSearchInput(searchInputRaw);
      setPageNumber(0);
    }, 300);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchInputRaw]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  const onChangePage = (nextPage) => {
    localStorage.setItem("partnersPageLastPageNumber", String(nextPage));
    setPageNumber(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setSort = (nextValue) => {
    if (statusFilterKey) localStorage.setItem(statusFilterKey, nextValue);
    setFilterPropertyStatus(nextValue);
    setPageNumber(0);
  };

  const clearSearch = () => {
    setSearchInputRaw("");
    setSearchInput("");
    setPageNumber(0);
  };

  const resetAllFilters = () => {
    if (statusFilterKey) localStorage.setItem(statusFilterKey, "");
    setFilterPropertyStatus("");
    setSearchInputRaw("");
    setSearchInput("");
    setPageNumber(0);
  };

  const goToPartnerListings = (partner, propertyStatus = "") => {
    localStorage.setItem("property_status_to_filter_listings", propertyStatus);
    localStorage.setItem("partner", JSON.stringify(partner));
    history.push(drilldownPath, {
      partner,
      accountId: partner.accountId,
      // Prefer the wrapper-supplied channelSource; fall back to the partner
      // document's own source field (legacy pages rely on this) and finally SH.
      source: apiParams?.channelSource || partner.source || "SH",
      status: propertyStatus || undefined,
    });
  };

  const hasActiveFilters = !!(searchInput || filterPropertyStatus);
  const showEmpty = !isLoading && partners.length === 0;
  const serialBase = pageNumber * constants.PAGING_PARTNERS_SIZE;

  return (
    <Layout
      pageTitle={title}
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="partners-view">
        {/* Hero */}
        <div className="page-hero">
          <div className="page-hero-left">
            <div className="page-hero-icon">
              <FiUsers size={22} />
            </div>
            <div>
              <h1 className="page-hero-title">{title}</h1>
              {subhead && <p className="page-hero-subhead">{subhead}</p>}
            </div>
          </div>
          <div className="page-hero-meta">
            <span className="page-hero-pill">
              {totalPartners
                ? `${totalPartners} partner${totalPartners === 1 ? "" : "s"}`
                : "— partners"}
            </span>
            <div className="page-hero-pager" role="group" aria-label="Pagination">
              <button
                type="button"
                className="page-hero-pager-btn"
                onClick={() => onChangePage(Math.max(0, pageNumber - 1))}
                disabled={pageNumber <= 0}
                aria-label="Previous page"
                title="Previous page"
              >
                <FiChevronLeft size={16} />
              </button>
              <span className="page-hero-pager-label">
                Page {pageNumber + 1} of {totalPages}
              </span>
              <button
                type="button"
                className="page-hero-pager-btn"
                onClick={() =>
                  onChangePage(Math.min(totalPages - 1, pageNumber + 1))
                }
                disabled={pageNumber >= totalPages - 1}
                aria-label="Next page"
                title="Next page"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by PM name…"
              value={searchInputRaw}
              onChange={(e) => setSearchInputRaw(e.target.value)}
              aria-label="Search partners by PM name"
            />
            {isRefetching && !searchInputRaw && (
              <span className="search-spinner" aria-hidden="true" />
            )}
            {searchInputRaw && (
              <button
                type="button"
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                <IoMdClose size={16} />
              </button>
            )}
          </div>

          <div className="sort-wrap">
            <span className="sort-wrap-label">Sort by</span>
            <div className="sort-chips" role="tablist" aria-label="Sort partners by count">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key || "total"}
                  type="button"
                  role="tab"
                  aria-selected={filterPropertyStatus === opt.key}
                  className={filterPropertyStatus === opt.key ? "active" : ""}
                  onClick={() => setSort(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="partners-card">
          <div className="partners-table-scroll">
            <table className="partners-table">
              <thead>
                <tr>
                  <th style={{ width: 44 }}>#</th>
                  <th>Partner Name</th>
                  <th>Account ID</th>
                  <th style={{ width: 90 }}>Total</th>
                  <th style={{ width: 100 }}>Approved</th>
                  <th style={{ width: 100 }}>Pending</th>
                  <th style={{ width: 100 }}>Declined</th>
                  <th style={{ width: 100 }}>Unmapped</th>
                  <th style={{ width: 110 }}>Onboarded</th>
                  <th style={{ width: 32 }} aria-label="Open" />
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`skeleton-${i}`}>
                      <td className="serial">
                        <span className="skeleton-block" style={{ width: 22 }} />
                      </td>
                      <td>
                        <span className="skeleton-block" style={{ width: 180 }} />
                      </td>
                      <td>
                        <span className="skeleton-block" style={{ width: 220 }} />
                      </td>
                      {[0, 1, 2, 3, 4].map((k) => (
                        <td key={k}>
                          <span className="skeleton-pill" />
                        </td>
                      ))}
                      <td>
                        <span className="skeleton-block" style={{ width: 78 }} />
                      </td>
                      <td />
                    </tr>
                  ))}

                {!isLoading &&
                  partners.map((item, index) => (
                    <tr
                      key={item._id || `${item.accountId}-${index}`}
                      onClick={() => goToPartnerListings(item)}
                    >
                      <td className="serial" data-label="#">
                        {serialBase + index + 1}
                      </td>
                      <td className="pm-name" data-label="Partner Name" title={item.pmName || ""}>
                        {item.pmName || "—"}
                      </td>
                      <td className="account-id" data-label="Account ID" title={item.accountId || ""}>
                        {item.accountId || ""}
                      </td>
                      <td data-label="Total">
                        <CountPill
                          variant="total"
                          value={item.total_properties_count}
                          onClick={() => goToPartnerListings(item)}
                        />
                      </td>
                      <td data-label="Approved">
                        <CountPill
                          variant="approved"
                          value={item.approved_properties_count}
                          onClick={() => goToPartnerListings(item, "Approved")}
                        />
                      </td>
                      <td data-label="Pending">
                        <CountPill
                          variant="pending"
                          value={item.pending_properties_count}
                          onClick={() => goToPartnerListings(item, "Pending")}
                        />
                      </td>
                      <td data-label="Declined">
                        <CountPill
                          variant="declined"
                          value={item.declined_properties_count}
                          onClick={() => goToPartnerListings(item, "Declined")}
                        />
                      </td>
                      <td data-label="Unmapped">
                        <CountPill
                          variant="unmapped"
                          value={item.unmapped_properties_count}
                          onClick={() => goToPartnerListings(item, "unmapped")}
                        />
                      </td>
                      <td className="onboarded" data-label="Onboarded">
                        {item.createdAt ? String(item.createdAt).slice(0, 10) : "—"}
                      </td>
                      <td className="arrow-cell" aria-hidden="true">
                        <FiChevronRight className="row-arrow" />
                      </td>
                    </tr>
                  ))}

                {showEmpty && (
                  <tr>
                    <td colSpan={10} style={{ padding: 0 }}>
                      <div className="empty-state">
                        <div className="empty-state-icon">
                          <FiUsers />
                        </div>
                        <h3 className="empty-state-title">No partners found</h3>
                        <p className="empty-state-hint">
                          {hasActiveFilters
                            ? "Try clearing your search or changing the sort."
                            : "There are no partners in this cohort yet."}
                        </p>
                        {hasActiveFilters && (
                          <button
                            type="button"
                            className="empty-state-action"
                            onClick={resetAllFilters}
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPartners > 0 && (
            <div className="partners-card-footer">
              <Paging
                perPage={constants.PAGING_PARTNERS_SIZE}
                totalItems={totalPartners}
                currentPage={pageNumber}
                onChangePage={onChangePage}
              />
              <div
                style={{
                  textAlign: "right",
                  fontSize: "0.78rem",
                  color: "#6b7280",
                  marginTop: 6,
                }}
              >
                Displaying {partnersPagingFrom}–{partnersPagingTo} of {totalPartners}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PartnersListView;
