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
// ---------------------------------------------------------------------------

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BsChevronDown } from "react-icons/bs";
import addAdminIcon from "../../assets/icons/admin/menu/add.svg";

import Layout from "../../components/Layout/index.js";
import LoadingBox from "../../components/LoadingBox";
import Paging from "../../components/Paging";
import { PATH_LISTINGS } from "../../Util/constants";
import constants from "../../Util/constants";
import "../PartnersRU/Admin.scss";

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

const PartnersListView = (props) => {
  const {
    title,
    apiParams,
    connectPartnerLabel,
    statusFilterKey,
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

  // -------------------------------------------------------------------------
  // Local state
  // -------------------------------------------------------------------------
  const [partners, setPartners] = useState([]);
  const [totalPartners, setTotalPartners] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const extranetRole = localStorage.getItem("extranet-vt-logged-in-role");
  const isAdmin = extranetRole === "admin";

  // -------------------------------------------------------------------------
  // Derived pagination display
  // -------------------------------------------------------------------------
  const partnersPagingFrom = 1 + pageNumber * constants.PAGING_PARTNERS_SIZE;
  const partnersPagingTo = useMemo(() => {
    const cap = partnersPagingFrom + constants.PAGING_PARTNERS_SIZE - 1;
    return totalPartners && cap > totalPartners ? totalPartners : cap;
  }, [partnersPagingFrom, totalPartners]);

  // -------------------------------------------------------------------------
  // Data fetch — single aggregation endpoint
  // -------------------------------------------------------------------------
  const loadPartners = useCallback(async () => {
    setIsLoading(true);
    const params = {
      ...apiParams,
      limit: constants.PAGING_PARTNERS_SIZE,
      skip: partnersPagingFrom - 1,
      status: filterPropertyStatus || undefined,
      pmName: searchInput || undefined,
    };
    try {
      const res = await userRequest.get("local/partners-by-source", { params });
      const data = res?.data || {};
      const rows = Array.isArray(data.partners) ? data.partners : [];
      const count = Number(data.count) || 0;
      setPartners(rows);
      setTotalPartners(count);
      localStorage.setItem("partnerCount", String(count));
    } catch (e) {
      console.error("local/partners-by-source failed", e?.message || e);
      setPartners([]);
      setTotalPartners(0);
    }
    setIsLoading(false);
  }, [apiParams, partnersPagingFrom, filterPropertyStatus, searchInput]);

  // Load reference data ONCE on mount (module-cached across pages).
  useEffect(() => {
    ensureAllZipcodes();
    ensureExchangeRates();
  }, []);

  // Reload partners when the effective query params change.
  useEffect(() => {
    loadPartners();
  }, [loadPartners]);

  // Debounce the search input — commit to the query ~300ms after last keystroke.
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setSearchInput(searchInputRaw);
      // Any search-input change resets to the first page.
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

  const filterByPropertyStatus = (nextValue) => {
    if (statusFilterKey) localStorage.setItem(statusFilterKey, nextValue);
    setFilterPropertyStatus(nextValue);
    setPageNumber(0);
  };

  const goToPartnerListings = (partner, propertyStatus = "") => {
    localStorage.setItem("property_status_to_filter_listings", propertyStatus);
    // Listings2 reads channelSource + accountId from location state; the
    // legacy pre-drill-down POST to /local/partners/properties-unique-zipcodes
    // is intentionally dropped — the destination page loads its own.
    localStorage.setItem("partner", JSON.stringify(partner));
    history.push(PATH_LISTINGS, {
      partner,
      accountId: partner.accountId,
      source: apiParams.channelSource || partner.source || "SH",
    });
  };

  // -------------------------------------------------------------------------
  // Columns — kept in sync with the legacy pages' layout for parity.
  // -------------------------------------------------------------------------
  const columns = [
    { name: "#", width: "50px" },
    { name: "Partner Name", width: "300px" },
    { name: "Account ID", width: "230px" },
    { name: "Total", width: "80px" },
    { name: "Approved", width: "100px" },
    { name: "Pending", width: "100px" },
    { name: "Declined", width: "100px" },
    { name: "Unmapped", width: "100px" },
    { name: "Onboarded", width: "120px" },
  ];

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
      <div className="agencies-container">
        <LoadingBox visible={isLoading} />

        <div className="agencies-main">
          {isAdmin && (
            <div className="search-container">
              <div className="row">
                <div
                  className="col-lg-5 col-md-8 col-12"
                  style={{ margin: 2 }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by PM Name"
                    value={searchInputRaw}
                    onChange={(e) => setSearchInputRaw(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="agencies-title">
            <span>{title}</span>

            {connectPartnerLabel && (
              <button
                type="button"
                className="dropdown-item"
                style={{
                  whiteSpace: "unset",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => {
                  // Connect-partner modal is out of scope for the new pages;
                  // for now, keep the affordance visible but no-op. Legacy
                  // pages still have the fully wired modal.
                }}
              >
                <img src={addAdminIcon} alt="" /> {connectPartnerLabel}
              </button>
            )}

            <div className="agencies-main-subtitle">
              Displaying PMs {partnersPagingFrom}-{partnersPagingTo} of{" "}
              {totalPartners || "?"}
            </div>
          </div>

          {isAdmin && (
            <div className="container-fluid px-0">
              <div className="row mx-0">
                <div className="col-12">
                  <div className="filterbystatus-container">
                    <div className="row align-items-end">
                      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <label className="form-label text-white mb-2">
                          <strong>Filter by Status</strong>
                        </label>
                        <div className="dropdown w-100">
                          <button
                            className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                              minWidth: "120px",
                              fontSize: "14px",
                              padding: "8px 12px",
                              border: "1px solid #ced4da",
                              borderRadius: "4px",
                              backgroundColor: "#fff",
                              color: "#333",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>{filterPropertyStatus || "--All--"}</span>
                          </button>
                          <ul
                            className="dropdown-menu w-100"
                            style={{
                              maxHeight: "200px",
                              overflowY: "auto",
                              fontSize: "14px",
                            }}
                          >
                            {["", "Approved", "Pending", "Declined", "Unmapped"].map(
                              (opt) => (
                                <li key={opt || "all"}>
                                  <button
                                    className={`dropdown-item ${
                                      filterPropertyStatus === opt
                                        ? "active"
                                        : ""
                                    }`}
                                    type="button"
                                    onClick={() => filterByPropertyStatus(opt)}
                                  >
                                    {opt || "--All--"}
                                  </button>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Paging
            perPage={constants.PAGING_PARTNERS_SIZE}
            totalItems={totalPartners}
            currentPage={pageNumber}
            onChangePage={onChangePage}
          />

          <div className="table-responsive px-3">
            <table className="table">
              <thead style={{ backgroundColor: "#f9f9f7" }}>
                <tr>
                  {columns.map((c) => (
                    <th
                      key={c.name}
                      scope="col"
                      style={{ cursor: "pointer", width: c.width }}
                    >
                      {c.name} <BsChevronDown />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partners.map((item, index) => (
                  <tr key={item._id || `${item.accountId}-${index}`}>
                    <td className="px-4 p-3 text-primary cst-cursor">
                      <h4>{serialBase + index + 1}</h4>
                    </td>
                    <td className="pmName px-4 p-3 text-primary cst-cursor">
                      <h4>{item.pmName || ""}</h4>
                    </td>
                    <td className="accountId px-4 p-3 text-primary text-decoration-underline cst-cursor">
                      <h4>{item.accountId || ""}</h4>
                    </td>
                    <td className="px-4 p-3 text-primary text-decoration-underline cst-cursor">
                      <h4 onClick={() => goToPartnerListings(item)}>
                        {item.total_properties_count ?? 0}
                      </h4>
                    </td>
                    <td className="px-4 p-3 text-primary cst-cursor">
                      <h4
                        onClick={() => goToPartnerListings(item, "Approved")}
                      >
                        {item.approved_properties_count ?? 0}
                      </h4>
                    </td>
                    <td className="px-4 p-3 text-primary cst-cursor">
                      <h4 onClick={() => goToPartnerListings(item, "Pending")}>
                        {item.pending_properties_count ?? 0}
                      </h4>
                    </td>
                    <td className="px-4 p-3 text-primary cst-cursor">
                      <h4
                        onClick={() => goToPartnerListings(item, "Declined")}
                      >
                        {item.declined_properties_count ?? 0}
                      </h4>
                    </td>
                    <td className="px-4 p-3 text-primary cst-cursor">
                      <h4
                        onClick={() => goToPartnerListings(item, "unmapped")}
                      >
                        {item.unmapped_properties_count ?? 0}
                      </h4>
                    </td>
                    <td className="px-4 p-3">
                      <h4>
                        {item.createdAt
                          ? String(item.createdAt).slice(0, 10)
                          : ""}
                      </h4>
                    </td>
                  </tr>
                ))}
                {!isLoading && partners.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 p-3 text-center"
                    >
                      <h4>No partners found.</h4>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PartnersListView;
