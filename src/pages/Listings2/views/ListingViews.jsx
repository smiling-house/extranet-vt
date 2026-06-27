/* ──────────────────────────────────────────────────────────────────────────
   Listing views — Expanded (default) / Grid / Table presentational layouts.
   Pure presentation over the SAME data the legacy row uses. No data fetching,
   no mutations. The bulk-select checkbox keeps the legacy name/value so the
   page's existing "Update Status" tooling works in every view. "View details"
   reuses the legacy navigation to the full property page (where per-listing
   admin actions live); the "Classic" switcher option keeps the original row.
   ────────────────────────────────────────────────────────────────────────── */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PATH_PROPERTY } from "../../../Util/constants";
import "./listings-redesign.css";

/* ── Inline icons (Phosphor-ish, currentColor) ───────────────────────────── */
const I = {
  bed: <path d="M2 18v-5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5M2 18h20M2 18v2M22 18v2M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />,
  bath: <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3ZM5 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M5 20l-1 1M20 20l1 1" />,
  users: <path d="M16 19a4 4 0 0 0-8 0M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19a3 3 0 0 0-4-2.8M18 11a2.5 2.5 0 0 0 0-5M4 19a3 3 0 0 1 4-2.8M6 11a2.5 2.5 0 0 1 0-5" />,
  ruler: <path d="M3 17 17 3l4 4L7 21l-4-4ZM7 13l2 2M11 9l2 2M15 5l2 2" />,
  pin: <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  camera: <path d="M3 8h3l1.5-2h9L18 8h3v12H3V8Zm9 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />,
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
  eye: <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  share: <path d="M18 8a3 3 0 1 0-3-3M6 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.5 13.5l7 4M15.5 6.5l-7 4" />,
  compare: <path d="M12 3v18M6 7H3l3-4 3 4H6Zm0 0v7a3 3 0 0 0 6 0M18 7h-3l3-4 3 4h-3Zm0 0v7a3 3 0 0 1-6 0" />,
  chat: <path d="M4 5h16v11H9l-5 4V5Z" />,
  heart: <path d="M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.6 12 20 12 20Z" />,
  check: <path d="M20 6 9 17l-5-5" />,
  link: <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />,
  geo: <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  sparkle: <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3ZM18 14l.9 2.3 2.3.9-2.3.9L18 20l-.9-2.3-2.3-.9 2.3-.9L18 14Z" />,
  paw: <path d="M8 14c-2 0-3 1.5-3 3s1.5 2 3 2 3 .6 4 .6 2.5-.6 4-.6 3-.5 3-2-1-3-3-3c-1.5 0-2.5 1-4 1s-2.5-1-4-1ZM6.5 10a1.5 2 0 1 0 0-.01M17.5 10a1.5 2 0 1 0 0-.01M9.5 7a1.5 2 0 1 0 0-.01M14.5 7a1.5 2 0 1 0 0-.01" />,
  leaf: <path d="M5 19s-1-9 5-13c4-2.7 9-2 9-2s.7 5-2 9c-4 6-12 6-12 6ZM5 19c2-4 5-7 9-9" />,
  search: <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />,
  layers: <path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  rows: <path d="M4 6h16M4 12h16M4 18h16" />,
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  tableI: <path d="M3 5h18v14H3zM3 10h18M9 5v14" />,
};
const Icon = ({ d, size = 18, stroke = 1.8, fill = "none", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>{d}</svg>
);

/* ── Error boundary — keep one bad listing from white-screening the page ──── */
export class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) { console.error("Listings view error:", err, info); }
  render() {
    if (this.state.err) {
      return (
        <div className="lr"><div className="lr-state">
          <h3>Something went wrong rendering these listings</h3>
          <p>The rest of the app is fine. Try another view, or switch to Classic.</p>
          <span className="link" onClick={() => this.setState({ err: null })}>Retry →</span>
        </div></div>
      );
    }
    return this.props.children;
  }
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const CUR = { EUR: "€", USD: "$", GBP: "£", CHF: "CHF " };
const sym = (c) => CUR[c] || (c ? c + " " : "");
const money = (n, c) => (n || n === 0) ? `${sym(c)}${Number(n).toLocaleString()}` : "—";
const pct = (f) => (f || f === 0) ? `${Math.round(f * 100)}%` : "—";

const pics = (property, xdata) =>
  (xdata?.pictures?.length ? xdata.pictures : property?.pictures) || [];
const picUrl = (arr, i) => arr.length ? arr[((i % arr.length) + arr.length) % arr.length]?.original : "";

const COLLECTIONS = [
  { key: "eventCollection", label: "Events", icon: I.sparkle },
  { key: "familyCollection", label: "Family", icon: I.users },
  { key: "petsCollection", label: "Pets", icon: I.paw },
  { key: "ecoCollection", label: "Eco", icon: I.leaf },
];

const statusBadge = (status) => {
  if (status === "Approved") return { cls: "ok", label: "Approved", icon: I.check };
  if (status === "Declined") return { cls: "bad", label: "Declined", icon: null };
  return { cls: "warn", label: status || "Pending", icon: null };
};

/* normalise a raw listing item → flat fields the views render */
export const normalize = (it) => {
  const property = it.listing || it.property || {};
  const xdata = it.xdata || {};
  const a = property.address || {};
  const p = property.prices || {};
  return {
    raw: it, property, xdata,
    id: property._id || it.id,
    code: property.nickname || "",
    title: xdata.title || property.title || property.nickname || "Untitled",
    type: property.propertyType || "",
    beds: xdata.beds ?? property.bedrooms,
    baths: property.bathrooms,
    guests: property.accommodates,
    area: property.squareMeters || property.area || xdata.area,
    country: a.country, region: a.state || xdata.region, city: a.city, zip: a.zipcode,
    weekday: p.basePrice, weekend: p.weekendBasePrice, currency: p.currency,
    weekDisc: p.weeklyPriceFactor, monthDisc: p.monthlyPriceFactor,
    status: xdata.status, autodecline: xdata.autodecline,
    mapped: !!(xdata.region && xdata.region !== "unmapped" && xdata.region !== ""),
    geo: !!a.zipcode,
    tags: xdata.tags || [],
    checkValue: (xdata.region === "unmapped" || xdata.region === "" || xdata.region == null)
      ? `${property._id}_unmapped` : property._id,
    photos: pics(property, xdata).length,
  };
};

/* ── Shared subcomponents ────────────────────────────────────────────────── */
const Caps = ({ d, small }) => (
  <div className={`lr-caps${small ? " sm" : ""}`}>
    {d.beds != null && <Cap icon={I.bed} v={d.beds} lab="beds" small={small} />}
    {d.baths != null && <Cap icon={I.bath} v={d.baths} lab="baths" small={small} />}
    {d.guests != null && <Cap icon={I.users} v={d.guests} lab="guests" small={small} />}
    {d.area != null && <Cap icon={I.ruler} v={`${d.area} m²`} lab="area" small={small} />}
  </div>
);
const Cap = ({ icon, v, lab }) => (
  <div className="lr-cap">
    <span className="ic"><Icon d={icon} size={16} /></span>
    <b>{v}</b>{lab && <span>{lab}</span>}
  </div>
);

const Loc = ({ d }) => (
  <div className="lr-loc">
    <span className="pin"><Icon d={I.pin} size={15} /></span>
    {d.country && <b>{d.country}</b>}
    {d.region && <><span className="sep">·</span>{d.region}</>}
    {d.city && <><span className="sep">·</span>{d.city}</>}
    {d.zip && <span className="zip">· {d.zip}</span>}
    {!d.country && !d.region && !d.city && <span className="zip">No location</span>}
  </div>
);

const Cols = ({ d, mini }) => {
  const active = COLLECTIONS.filter((c) => d.tags?.indexOf(c.key) > -1);
  if (!active.length) return <span className="lr-loc"><span className="zip">No collections</span></span>;
  return (
    <div className="lr-cols">
      {active.map((c) => mini
        ? <span key={c.key} className="lr-colmini" title={c.label} style={{ color: "var(--cyan-ink)" }}><Icon d={c.icon} size={15} /></span>
        : <span key={c.key} className="lr-col"><span style={{ color: "var(--cyan-ink)" }}><Icon d={c.icon} size={15} /></span>{c.label}</span>
      )}
    </div>
  );
};

const StatusBadges = ({ d, full }) => {
  const s = statusBadge(d.status);
  return (
    <>
      <span className={`lr-badge ${s.cls}`}>{s.icon && <Icon d={s.icon} size={13} />}{s.label}</span>
      {full && <span className={`lr-badge ${d.mapped ? "info" : "neutral"}`}><Icon d={I.link} size={13} />{d.mapped ? "Mapped" : "Unmapped"}</span>}
      {full && <span className="lr-badge neutral"><Icon d={I.geo} size={13} />{d.geo ? "Geo synced" : "No geo"}</span>}
    </>
  );
};

const Carousel = ({ d, h, sm, onView }) => {
  const arr = pics(d.property, d.xdata);
  const [i, setI] = useState(0);
  const [fav, setFav] = useState(false);
  const url = picUrl(arr, i);
  const go = (e, n) => { e.stopPropagation(); setI((x) => x + n); };
  return (
    <div className="lr-img" style={{ height: h }} onClick={onView} role="button">
      <div className="ph" style={url ? { backgroundImage: `url(${url})` } : undefined}>{!url && "Exterior"}</div>
      {d.code && <span className="idtag">{d.code}{d.type ? ` · ${d.type}` : ""}</span>}
      <button className={`heart${fav ? " on" : ""}`} title="Favourite"
        onClick={(e) => { e.stopPropagation(); setFav((v) => !v); }}>
        <Icon d={I.heart} size={17} fill={fav ? "currentColor" : "none"} />
      </button>
      {arr.length > 1 && <>
        <button className={`nav prev${sm ? " sm" : ""}`} onClick={(e) => go(e, -1)}><Icon d={I.left} size={sm ? 13 : 16} /></button>
        <button className={`nav next${sm ? " sm" : ""}`} onClick={(e) => go(e, 1)}><Icon d={I.right} size={sm ? 13 : 16} /></button>
      </>}
      <span className="counter"><Icon d={I.camera} size={12} />{arr.length ? `${(((i % arr.length) + arr.length) % arr.length) + 1} / ${arr.length}` : "0"}</span>
    </div>
  );
};

const Select = ({ d }) => (
  <input type="checkbox" className="lr-check" name="listing_ids_to_update[]" value={d.checkValue}
    onClick={(e) => e.stopPropagation()} title="Select for bulk status update" />
);

const PriceBlock = ({ d }) => (
  <div className="lr-pricing">
    <div className="lab">Pricing</div>
    <div className="lr-price-grid">
      <span className="k">Weekday</span><span className="v">{money(d.weekday, d.currency)}</span>
      <span className="k">Weekend</span><span className="v">{money(d.weekend, d.currency)}</span>
      <span className="k">Week disc.</span><span className="v">{pct(d.weekDisc)}</span>
      <span className="k">Mo. disc.</span><span className="v">{pct(d.monthDisc)}</span>
    </div>
  </div>
);

/* ── EXPANDED ROW (default) ──────────────────────────────────────────────── */
export const ExpandedRow = ({ item, onView }) => {
  const d = normalize(item);
  return (
    <article className="lr-exp">
      <Carousel d={d} h={214} onView={onView} />
      <div className="lr-exp-mid">
        <div className="lr-exp-head">
          <span className="lr-exp-select"><Select d={d} /></span>
          <span className="lr-exp-title">{d.title}</span>
          {d.type && <span className="lr-type">{d.type}</span>}
        </div>
        <div className="lr-exp-sub">
          {d.id && <span>ID {d.id}</span>}
          {d.code && <span className="code">{d.code}</span>}
          <span>{d.photos} photos</span>
        </div>
        <Caps d={d} />
        <Loc d={d} />
        <hr className="lr-divider" />
        <div className="lr-exp-pc">
          <PriceBlock d={d} />
          <div><div className="lab" style={{ font: "800 10px/1 Manrope", letterSpacing: ".07em", textTransform: "uppercase", color: "var(--muted-2)", marginBottom: 8 }}>Collections</div><Cols d={d} /></div>
        </div>
      </div>
      <div className="lr-exp-rail">
        <div className="badges"><StatusBadges d={d} full /></div>
        <div className="spacer" />
        <button className="lr-btn primary" onClick={onView}><Icon d={I.eye} size={16} />View details</button>
        <div className="row2">
          <button className="lr-btn ghost"><Icon d={I.chat} size={15} />Contact</button>
          <button className="lr-icobtn" title="Share"><Icon d={I.share} size={15} /></button>
          <button className="lr-icobtn" title="Compare"><Icon d={I.compare} size={15} /></button>
        </div>
      </div>
    </article>
  );
};

/* ── GRID CARD ───────────────────────────────────────────────────────────── */
export const GridCard = ({ item, onView }) => {
  const d = normalize(item);
  const s = statusBadge(d.status);
  return (
    <article className="lr-card">
      <Carousel d={d} h={208} sm onView={onView} />
      <div className="lr-card-body">
        <div className="lr-card-head">
          <span className="lr-card-title">{d.title}</span>
          <span className={`lr-badge ${s.cls}`}>{s.icon && <Icon d={s.icon} size={12} />}{s.label}</span>
        </div>
        <Loc d={d} />
        <div className="lr-card-caps"><Caps d={d} small /></div>
        <div className="lr-card-pc">
          <div><div className="lr-fromlab">From / night</div><div className="lr-bigprice">{money(d.weekday, d.currency)}</div></div>
          <Cols d={d} mini />
        </div>
        <div className="lr-card-foot">
          <button className="lr-btn primary" onClick={onView}><Icon d={I.eye} size={15} />View details</button>
          <span className="lr-exp-select"><Select d={d} /></span>
          <button className="lr-icobtn" title="Share"><Icon d={I.share} size={15} /></button>
        </div>
      </div>
    </article>
  );
};

/* ── TABLE ROW ───────────────────────────────────────────────────────────── */
export const TableRow = ({ item, onView }) => {
  const d = normalize(item);
  return (
    <tr>
      <td style={{ width: 38 }}><Select d={d} /></td>
      <td>
        <div className="lr-tbl-prop">
          <Carousel d={d} h={84} sm onView={onView} />
          <div className="meta">
            <span className="lr-tbl-title" onClick={onView} style={{ cursor: "pointer" }}>{d.title}</span>
            <span className="lr-tbl-sub">{d.id && <>ID {d.id}</>}{d.code && <span className="code">{d.code}</span>}</span>
            {d.type && <span className="lr-type" style={{ alignSelf: "flex-start" }}>{d.type}</span>}
          </div>
        </div>
      </td>
      <td><Caps d={d} small /></td>
      <td><Loc d={d} /></td>
      <td>
        <div className="lr-tbl-price">
          <div className="lr-bigprice" style={{ fontSize: 16 }}>{money(d.weekday, d.currency)} <small>/ night</small></div>
          <span className="lr-tbl-sub" style={{ color: "var(--muted-3)" }}>Wkd {money(d.weekday, d.currency)} · Wknd {money(d.weekend, d.currency)}</span>
          <Cols d={d} mini />
        </div>
      </td>
      <td>
        <div className="lr-tbl-status">
          <StatusBadges d={d} full={false} />
          <span className={`lr-badge ${d.mapped ? "info" : "neutral"}`}><Icon d={I.link} size={12} />{d.mapped ? "Mapped" : "Unmapped"}</span>
          <div className="acts">
            <button className="lr-icobtn sm" title="View details" onClick={onView}><Icon d={I.eye} size={14} /></button>
            <button className="lr-icobtn sm" title="Share"><Icon d={I.share} size={14} /></button>
            <button className="lr-icobtn sm" title="Compare"><Icon d={I.compare} size={14} /></button>
          </div>
        </div>
      </td>
    </tr>
  );
};

/* ── VIEW SWITCHER ───────────────────────────────────────────────────────── */
export const VIEW_MODES = [
  { key: "expanded", label: "Rows", icon: I.rows },
  { key: "grid", label: "Grid", icon: I.grid },
  { key: "table", label: "Table", icon: I.tableI },
];
export const ViewSwitcher = ({ value, onChange, count, bare }) => {
  const sw = (
    <div className="lr-switch">
      {VIEW_MODES.map((m) => (
        <button key={m.key} className={value === m.key ? "is-active" : ""} onClick={() => onChange(m.key)}>
          <Icon d={m.icon} size={15} />{m.label}
        </button>
      ))}
    </div>
  );
  if (bare) return sw;
  return (
    <div className="lr lr-toolbar">
      {sw}
      {count != null && <span className="lr-count">{count} listing{count === 1 ? "" : "s"}</span>}
    </div>
  );
};

/* ── Page header / toolbar ───────────────────────────────────────────────── */
export const ListingsHeader = ({
  partner, accountId, from, to, total, viewMode, onViewMode, isAdmin,
  onGoBack, onSearchId, onFilterStatus, onFilterZip, zipcodes, onFilterRegion,
  propStatus, onPropStatus, decliningReason, onDecliningReason, onDecliningOther,
  onUpdateStatus, onSelectAll, selectAllChecked, onClearFilters, paging,
}) => (
  <div className="lr lr-head">
    <div className="lr-head-top">
      <button className="lr-goback" onClick={onGoBack}><Icon d={I.left} size={15} />Go back</button>
      <nav className="lr-crumbs">
        {partner?.pmName && <span>{partner.pmName}</span>}
        {partner?.contactName && <><span className="sep">›</span><span>{partner.contactName}</span></>}
        {(accountId || partner?.accountId) && <><span className="sep">›</span><span>Account {accountId || partner?.accountId}</span></>}
        {partner?.source && <><span className="sep">›</span><span className="accent">channelSource · {partner.source}</span></>}
      </nav>
    </div>

    <div className="lr-title-row">
      <div>
        <h1 className="lr-h1">All listings</h1>
        <div className="lr-sub">
          <span className="layers"><Icon d={I.layers} size={15} /></span>
          Displaying <b>{from}–{to}</b> of <b>{total != null ? total : "?"}</b> properties
        </div>
      </div>
      <ViewSwitcher value={viewMode} onChange={onViewMode} bare />
    </div>

    <div className="lr-filterbar">
      <div className="lr-search">
        <span className="si"><Icon d={I.search} size={16} /></span>
        <input type="text" placeholder="Search by Property ID..." onChange={(e) => onSearchId(e.target.value)} />
      </div>
      <select className="lr-filter" onChange={onFilterStatus} defaultValue="">
        <option value="">Status: All</option>
        <option value="Approved">Approved</option>
        <option value="Pending">Pending</option>
        <option value="Declined">Declined</option>
      </select>
      <select className="lr-filter" onChange={onFilterZip} defaultValue="">
        <option value="">Zipcode: All</option>
        {zipcodes && zipcodes.map((z, i) => <option key={i} value={z}>{z}</option>)}
      </select>
      <select className="lr-filter" onChange={onFilterRegion} defaultValue="">
        <option value="">Region: All</option>
        <option value="Mapped">Mapped</option>
        <option value="Unmapped">Unmapped</option>
      </select>
      <button className="lr-clear" onClick={onClearFilters}><Icon d={I.x} size={14} />Clear filters</button>
    </div>

    {isAdmin &&
      <div className="lr-bulkbar">
        <label className="lr-bulk-check"><input type="checkbox" checked={!!selectAllChecked} onChange={onSelectAll} />Select all on this page</label>
        <span className="lr-sep" />
        <span className="lab">Change status to</span>
        <select onChange={(e) => onPropStatus(e.target.value)} defaultValue="">
          <option value="">Select status…</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>
        {propStatus === 'Declined' &&
          <select onChange={(e) => onDecliningReason(e.target.value)} defaultValue="">
            <option value="">Select reason…</option>
            <option value="Too cheap">Too cheap</option>
            <option value="With watermark/Picture information">With watermark/Picture information</option>
            <option value="Not feet quality">Not feet quality</option>
            <option value="Existing as SH partner">Existing as SH partner</option>
            <option value="Other">Other</option>
          </select>}
        {decliningReason === 'Other' &&
          <input type="text" placeholder="Other reason…" onChange={(e) => onDecliningOther(e.target.value)} />}
        <button className="lr-bulk-btn" onClick={onUpdateStatus}><Icon d={I.check} size={15} />Update status</button>
      </div>}

    {paging &&
      <div className="lr-pagerow">
        <span className="showing">Showing <b>{from}–{to}</b> of <b>{total != null ? total : "?"}</b></span>
        <div className="right">{paging}</div>
      </div>}
  </div>
);

/* ── VIEWPORT: renders the chosen layout over the listings array ─────────── */
export const ListingsViewport = (props) => (
  <ErrorBoundary><ListingsViewportInner {...props} /></ErrorBoundary>
);
const ListingsViewportInner = ({ mode, listings = [], loading, hasPartner = true }) => {
  const history = useHistory();
  const onView = (item) => () => {
    const property = item.listing || item.property;
    const xdata = item.xdata;
    try { localStorage.setItem("property", JSON.stringify(property)); } catch (e) {}
    let acc = '';
    try { acc = localStorage.getItem('accountId') || ''; } catch (e) {}
    const search = property?._id ? `?id=${property._id}${acc ? `&acc=${acc}` : ''}` : '';
    history.push({ pathname: PATH_PROPERTY, search }, { property, xdata });
  };

  if (!hasPartner) return (
    <div className="lr"><div className="lr-state">
      <h3>No partner selected</h3>
      <p>Pick a partner to view their listings.</p>
      <span className="link" onClick={() => history.push("/partners")}>Go to Partners →</span>
    </div></div>
  );
  if (loading) return (
    <div className="lr"><div className="lr-expanded-list">
      {[0, 1, 2].map((i) => <div key={i} className="lr-skel" style={{ height: 254 }} />)}
    </div></div>
  );
  if (!listings.length) return (
    <div className="lr"><div className="lr-state">
      <h3>No listings found</h3>
      <p>This partner has no listings matching the current filters.</p>
    </div></div>
  );

  if (mode === "grid") return (
    <div className="lr"><div className="lr-grid">
      {listings.map((it, i) => <GridCard key={(it.listing?._id) || i} item={it} onView={onView(it)} />)}
    </div></div>
  );
  if (mode === "table") return (
    <div className="lr"><div className="lr-tablewrap"><table className="lr-table">
      <thead><tr>
        <th></th><th>Property</th><th>Capacity</th><th>Location</th><th>Pricing &amp; Collections</th><th>Status</th>
      </tr></thead>
      <tbody>{listings.map((it, i) => <TableRow key={(it.listing?._id) || i} item={it} onView={onView(it)} />)}</tbody>
    </table></div></div>
  );
  /* default: expanded */
  return (
    <div className="lr"><div className="lr-expanded-list">
      {listings.map((it, i) => <ExpandedRow key={(it.listing?._id) || i} item={it} onView={onView(it)} />)}
    </div></div>
  );
};
