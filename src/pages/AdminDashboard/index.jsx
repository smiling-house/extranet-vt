// ---------------------------------------------------------------------------
// AdminDashboard — read-only overview page for /dashboard (admin landing).
//
// Composition:
//   * Hero band with welcome + last-refreshed pill.
//   * KPI grid: 4 stat cards (Listings, Partners, Sources, Countries).
//   * Breakdown row: Partners by Source (colour-coded, matches sidebar
//     badges) + Top Countries by Listings (from /local/listing-counts).
//
// Data fetching: all requests fire in parallel via Promise.all. Every
// per-source partner request has its own .catch so one bad endpoint can't
// blank the whole dashboard. Results cache in sessionStorage for 5 minutes
// so re-visiting the page is instant.
//
// No links — nothing on this page navigates. Row items are informational
// only; the sidebar remains the primary navigation entry point.
// ---------------------------------------------------------------------------

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiHome,
  FiUsers,
  FiLayers,
  FiGlobe,
  FiRefreshCw,
} from "react-icons/fi";

import Layout from "../../components/Layout/index.js";
import AuthService from "../../services/auth.service";
import constants from "../../Util/constants";
import "./AdminDashboard.scss";

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

const CACHE_KEY = "adminDashboardData";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const userRequest = axios.create({
  baseURL: constants.SHUB_URL,
  headers: { Authorization: constants.SHUB_TOKEN },
});

// Each source's fetcher returns a Promise resolving to { count, error? }.
// Errors are caught locally so one failing endpoint doesn't fail Promise.all.
const partnerFetchers = [
  {
    key: "guesty",
    label: "Guesty PMs",
    letters: "G",
    tint: "green",
    fetch: () =>
      userRequest
        .get("local/partners-by-source", {
          params: { provider: "rentalsunited_api", source: "G", limit: 1, skip: 0 },
        })
        .then((r) => ({ count: Number(r?.data?.count) || 0 }))
        .catch((e) => ({ count: 0, error: e?.message || String(e) })),
  },
  {
    key: "ru",
    label: "RU PMs",
    letters: "R",
    tint: "cyan",
    fetch: () =>
      userRequest
        .get("local/partners-by-source", {
          params: { provider: "rentalsunited_api", source: "RU", limit: 1, skip: 0 },
        })
        .then((r) => ({ count: Number(r?.data?.count) || 0 }))
        .catch((e) => ({ count: 0, error: e?.message || String(e) })),
  },
  {
    key: "hostaway",
    label: "Hostaway PMs",
    letters: "H",
    tint: "purple",
    fetch: () =>
      AuthService.listHostawayPartners()
        .then((r) => ({ count: (r?.data?.accounts || []).length }))
        .catch((e) => ({ count: 0, error: e?.message || String(e) })),
  },
  {
    key: "bart",
    label: "BART PMs",
    letters: "B",
    tint: "amber",
    fetch: () =>
      userRequest
        .get("local/partners", {
          params: {
            provider: "VillasInStBarth",
            source: "VillasInStBarth",
            limit: 1,
            skip: 0,
          },
        })
        .then((r) => ({ count: Number(r?.data?.count) || 0 }))
        .catch((e) => ({ count: 0, error: e?.message || String(e) })),
  },
  {
    key: "invenio",
    label: "INVENIO PMs",
    letters: "I",
    tint: "indigo",
    fetch: () =>
      userRequest
        .get("local/partners", {
          params: {
            provider: "InvenioHomes",
            source: "InvenioHomes",
            limit: 1,
            skip: 0,
          },
        })
        .then((r) => ({ count: Number(r?.data?.count) || 0 }))
        .catch((e) => ({ count: 0, error: e?.message || String(e) })),
  },
  {
    key: "bp",
    label: "BP PMs",
    letters: "P",
    tint: "pink",
    fetch: () =>
      userRequest
        .get("local/partners-bookingpal", { params: { limit: 1, skip: 0 } })
        .then((r) => ({ count: Number(r?.data?.count) || 0 }))
        .catch((e) => ({ count: 0, error: e?.message || String(e) })),
  },
];

async function fetchListingSummary() {
  try {
    const res = await userRequest.get("local/listing-counts");
    const data = res?.data || {};
    return {
      totalListed: Number(data.totalListed) || 0,
      byCountry: Array.isArray(data.byCountry) ? data.byCountry : [],
    };
  } catch (e) {
    return { totalListed: 0, byCountry: [], error: e?.message || String(e) };
  }
}

// ---------------------------------------------------------------------------
// Small presentation helpers
// ---------------------------------------------------------------------------

const KpiCard = ({ icon, iconTint, label, value, subtext, loading }) => (
  <div className="dash-kpi">
    <div className={`dash-kpi-icon tint-${iconTint}`}>{icon}</div>
    <div className="dash-kpi-body">
      <div className="dash-kpi-label">{label}</div>
      <div className="dash-kpi-value">
        {loading ? <span className="dash-skeleton" style={{ width: 92 }} /> : formatNumber(value)}
      </div>
      {subtext && <div className="dash-kpi-subtext">{subtext}</div>}
    </div>
  </div>
);

const PartnerSourceRow = ({ letters, tint, label, count, maxCount, loading }) => {
  const pct = maxCount > 0 ? Math.max(6, Math.round((count / maxCount) * 100)) : 0;
  return (
    <div className="dash-src-row">
      <span className={`dash-src-badge tint-${tint}`}>{letters}</span>
      <span className="dash-src-label">{label}</span>
      <span className="dash-src-bar">
        {!loading && count > 0 && (
          <span className={`dash-src-bar-fill tint-${tint}`} style={{ width: `${pct}%` }} />
        )}
      </span>
      <span className="dash-src-count">
        {loading ? <span className="dash-skeleton" style={{ width: 24, height: 12 }} /> : formatNumber(count)}
      </span>
    </div>
  );
};

const CountryRow = ({ country, count, maxCount, loading }) => {
  const pct = maxCount > 0 ? Math.max(6, Math.round((count / maxCount) * 100)) : 0;
  return (
    <div className="dash-country-row">
      <span className="dash-country-name">{country || "Unknown"}</span>
      <span className="dash-country-bar">
        {!loading && <span className="dash-country-bar-fill" style={{ width: `${pct}%` }} />}
      </span>
      <span className="dash-country-count">
        {loading ? <span className="dash-skeleton" style={{ width: 32, height: 12 }} /> : formatNumber(count)}
      </span>
    </div>
  );
};

function formatNumber(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString();
}

function formatRelativeTime(iso) {
  if (!iso) return "never";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const secs = Math.round((now - then) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString();
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const AdminDashboard = (props) => {
  const {
    token,
    agency,
    agent,
    screenSize,
    activeMenu,
    handleToggleMenu,
    setActiveMenu,
  } = props;

  const agentData = useMemo(() => {
    try {
      return agent ? JSON.parse(agent) : null;
    } catch {
      return null;
    }
  }, [agent]);
  const firstName = agentData?.firstName || "there";

  const [isLoading, setIsLoading] = useState(true);
  const [refreshedAt, setRefreshedAt] = useState(null);
  const [listingSummary, setListingSummary] = useState({ totalListed: 0, byCountry: [] });
  const [partnerCounts, setPartnerCounts] = useState(() =>
    partnerFetchers.map((f) => ({ ...f, count: 0, loading: true }))
  );

  const loadAll = useCallback(async (bypassCache = false) => {
    // Try cache first.
    if (!bypassCache) {
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          if (cached?.ts && Date.now() - cached.ts < CACHE_TTL_MS) {
            setListingSummary(cached.listingSummary || { totalListed: 0, byCountry: [] });
            setPartnerCounts(
              partnerFetchers.map((f, i) => ({
                ...f,
                count: cached.partnerCounts?.[i]?.count || 0,
                loading: false,
              }))
            );
            setRefreshedAt(new Date(cached.ts).toISOString());
            setIsLoading(false);
            return;
          }
        }
      } catch (_) {
        // fall through — malformed cache, refetch fresh.
      }
    }

    setIsLoading(true);
    const [summary, ...partnerResults] = await Promise.all([
      fetchListingSummary(),
      ...partnerFetchers.map((f) => f.fetch()),
    ]);

    setListingSummary(summary);
    const nextPartnerCounts = partnerFetchers.map((f, i) => ({
      ...f,
      count: partnerResults[i]?.count || 0,
      loading: false,
    }));
    setPartnerCounts(nextPartnerCounts);

    const now = Date.now();
    setRefreshedAt(new Date(now).toISOString());
    setIsLoading(false);

    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          ts: now,
          listingSummary: summary,
          partnerCounts: nextPartnerCounts.map((p) => ({ count: p.count })),
        })
      );
    } catch (_) { /* ignore quota errors */ }
  }, []);

  useEffect(() => {
    loadAll(false);
  }, [loadAll]);

  // --- Derived metrics for the KPI row ---
  const totalListings = listingSummary.totalListed;
  const totalPartners = partnerCounts.reduce((s, p) => s + (p.count || 0), 0);
  const totalSources = partnerFetchers.length; // constant — 6 channels
  const totalCountries = listingSummary.byCountry.length;

  // Sorted top-5 for the "Top Countries" card.
  const topCountries = useMemo(
    () => (listingSummary.byCountry || []).slice(0, 6),
    [listingSummary.byCountry]
  );
  const maxCountryCount = topCountries[0]?.count || 0;
  const remainingCountries = Math.max(0, totalCountries - topCountries.length);

  // Sorted partner rows for the breakdown, biggest count first.
  const partnerRows = useMemo(
    () => [...partnerCounts].sort((a, b) => (b.count || 0) - (a.count || 0)),
    [partnerCounts]
  );
  const maxPartnerCount = partnerRows[0]?.count || 0;

  return (
    <Layout
      pageTitle="Admin Dashboard"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="admin-dashboard">
        {/* Hero */}
        <div className="page-hero dash-hero">
          <div className="page-hero-left">
            <div className="page-hero-icon page-hero-icon--dash">
              <FiHome size={22} />
            </div>
            <div>
              <h1 className="page-hero-title">Welcome, {firstName}</h1>
              <p className="page-hero-subhead">
                Villa Tracker admin dashboard — a snapshot of your inventory
              </p>
            </div>
          </div>
          <div className="page-hero-meta">
            <span className="page-hero-pill dash-refreshed-pill" title={refreshedAt || ""}>
              Data refreshed {formatRelativeTime(refreshedAt)}
            </span>
            <button
              type="button"
              className="dash-refresh-btn"
              onClick={() => loadAll(true)}
              disabled={isLoading}
              aria-label="Refresh dashboard"
              title="Refresh dashboard"
            >
              <FiRefreshCw size={14} className={isLoading ? "spinning" : ""} />
              <span>{isLoading ? "Refreshing…" : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* KPI grid */}
        <div className="dash-kpi-grid">
          <KpiCard
            icon={<FiHome size={20} />}
            iconTint="cyan"
            label="Total Listings"
            value={totalListings}
            subtext="Deduped, live inventory"
            loading={isLoading}
          />
          <KpiCard
            icon={<FiUsers size={20} />}
            iconTint="green"
            label="Total Partners"
            value={totalPartners}
            subtext={`Across ${totalSources} integrated channels`}
            loading={isLoading}
          />
          <KpiCard
            icon={<FiLayers size={20} />}
            iconTint="purple"
            label="Sources"
            value={totalSources}
            subtext="Distribution channels"
            loading={false /* constant — never a skeleton */}
          />
          <KpiCard
            icon={<FiGlobe size={20} />}
            iconTint="amber"
            label="Countries covered"
            value={totalCountries}
            subtext="From listing regions"
            loading={isLoading}
          />
        </div>

        {/* Breakdown grid */}
        <div className="dash-breakdown-grid">
          <section className="dash-card">
            <header className="dash-card-header">
              <h2 className="dash-card-title">Partners by Source</h2>
              <p className="dash-card-subtitle">Active channels only</p>
            </header>
            <div className="dash-card-body">
              {partnerRows.map((p) => (
                <PartnerSourceRow
                  key={p.key}
                  letters={p.letters}
                  tint={p.tint}
                  label={p.label}
                  count={p.count}
                  maxCount={maxPartnerCount}
                  loading={isLoading}
                />
              ))}
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-header">
              <h2 className="dash-card-title">Top Countries by Listings</h2>
              <p className="dash-card-subtitle">Deduped active property counts</p>
            </header>
            <div className="dash-card-body">
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <div className="dash-country-row" key={`sk-${i}`}>
                    <span className="dash-skeleton" style={{ width: 100, height: 14 }} />
                    <span className="dash-country-bar" />
                    <span className="dash-skeleton" style={{ width: 40, height: 14 }} />
                  </div>
                ))}
              {!isLoading && topCountries.length === 0 && (
                <div className="dash-empty">No country data available yet.</div>
              )}
              {!isLoading &&
                topCountries.map((c) => (
                  <CountryRow
                    key={c.country || "unknown"}
                    country={c.country}
                    count={c.count}
                    maxCount={maxCountryCount}
                    loading={false}
                  />
                ))}
              {!isLoading && remainingCountries > 0 && (
                <div className="dash-more">
                  + {remainingCountries} more countr{remainingCountries === 1 ? "y" : "ies"}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
