// Property page building blocks, CloudStay-style (dashboard/listings/pms/[id]):
//   <PropertyHeader>  title · status pill · PMS/source · id · photo count
//   <PropertyHero>    1 + 4 gallery from the curated (hidden-stripped) photos
//   <TabBar>          Details | Photos | Calendar | Reviews | Raw data | Sync data
//   <FlagsCard>       status / instant book / featured / collections / on-demand
//   <CalendarTab>     3-month availability + nightly price grid from fullCalendar
//   <ReviewsTab>      whatever the PMS payload carries (RU/Guesty reviews not pulled yet)
//   <RawDataTab>      listing.data + xdata as JSON with copy
//   <SyncDataTab>     every sync/bookkeeping field on xdata, flat table
// Kept byte-identical between extranet-sh and extranet-vt.
import React, { useMemo, useState } from "react";
import { MODE_HELP, MODE_LABEL, listingOptions } from "../../Util/bookingMode";
import { setListingBookingMode } from "../../Util/bookingModeApi";
import { currentActor } from "../../Util/partner";
import "./property-tabs.css";

const esc = (v) => (v === null || v === undefined ? "" : String(v));
const picUrl = (p) => (!p ? "" : typeof p === "string" ? p : p.original || p.large || p.regular || p.url || p.thumbnail || "");

export const TABS = [
  { key: "details", label: "Details" },
  { key: "photos", label: "Photos" },
  { key: "calendar", label: "Calendar" },
  { key: "reviews", label: "Reviews" },
  { key: "raw", label: "Raw data", admin: true },
  { key: "sync", label: "Sync data", admin: true },
];
export const isAdminUser = () => { try { return ["extranet-vt-logged-in-role", "extranet-sh-logged-in-role"].some((k) => localStorage.getItem(k) === "admin") && !localStorage.getItem("partnerLogin"); } catch (e) { return false; } };
export const canSeeTab = (key, admin) => { const t = TABS.find((x) => x.key === key); return !!t && (!t.admin || admin); };

const statusPill = (status) => {
  const s = String(status || "Pending");
  const cls = s === "Approved" ? "ok" : s === "Declined" ? "bad" : s === "Inactive" ? "neutral" : "warn";
  return <span className={`pt-pill ${cls}`}>{s}</span>;
};

const SOURCE_LABEL = { SH: "Smiling House", RU: "Rentals United", G: "Rentals United (DH)", BP: "BookingPal", HW: "Hostaway", guesty_channel_api: "Guesty (legacy)", guesty_partner_api: "Guesty", smiling_house_api: "Smiling House", VillasInStBarth: "Villas in St Barth", InvenioHomes: "Invenio Homes" };
export const sourceLabel = (src) => SOURCE_LABEL[src] || src || "PMS";

export const PropertyHeader = ({ title, subtitle, status, source, id, photos, instantBook, actions }) => (
  <div className="pt-header">
    <div className="pt-header-main">
      <h1 className="pt-title">{esc(title)} {statusPill(status)}{instantBook?.effective ? <span className="pt-pill ib">⚡ Instant book</span> : null}</h1>
      <div className="pt-sub">
        <span className="pt-src">{sourceLabel(source)}</span>
        {id && <><span className="pt-dot">·</span><span className="pt-id">{esc(id)}</span></>}
        {subtitle && <><span className="pt-dot">·</span><span>{esc(subtitle)}</span></>}
        {Number.isFinite(photos) && <><span className="pt-dot">·</span><span>{photos} photos</span></>}
      </div>
    </div>
    <div className="pt-header-actions">
      {id && <a className="pt-btn" href={`https://www.smilinghouse.ch/property/${encodeURIComponent(id)}/`} target="_blank" rel="noreferrer" title="Public page on smilinghouse.ch">smilinghouse.ch ↗</a>}
      {id && <a className="pt-btn" href={`https://login.villatracker.com/property/${encodeURIComponent(id)}`} target="_blank" rel="noreferrer" title="Public page on Villa Tracker">villatracker.com ↗</a>}
      {actions}
    </div>
  </div>
);

export const PropertyHero = ({ photos = [], onOpen }) => {
  const urls = photos.map(picUrl).filter(Boolean);
  const main = urls[0];
  const side = urls.slice(1, 5);
  return (
    <div className="pt-hero" onClick={onOpen} role="button" title="Open photos">
      <div className="pt-hero-main">
        {main ? <img src={main} alt="" /> : <div className="pt-hero-empty">No photos</div>}
        {urls.length > 5 && <span className="pt-hero-count">{urls.length} photos</span>}
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="pt-hero-small">
          {side[i] ? <img src={side[i]} alt="" /> : <div className="pt-hero-empty" />}
        </div>
      ))}
    </div>
  );
};

export const TabBar = ({ tab, onChange, counts = {}, admin = false }) => (
  <div className="pt-tabs" role="tablist">
    {TABS.filter((t) => !t.admin || admin).map((t) => (
      <button key={t.key} role="tab" type="button" aria-selected={tab === t.key} className={tab === t.key ? "active" : ""} onClick={() => onChange(t.key)}>
        {t.label}{counts[t.key] !== undefined && counts[t.key] !== null ? <em>{counts[t.key]}</em> : null}
      </button>
    ))}
  </div>
);

const Row = ({ k, children, tone }) => (
  <tr><td className="pt-k">{k}</td><td className={`pt-v ${tone || ""}`}>{children}</td></tr>
);

/**
 * The per-property booking-mode control (D6).
 *
 * Writes straight to the hub — the hub owns this setting, so there is nothing
 * local to keep in step. The select is disabled while the write is in flight and
 * REVERTS on failure: a control that silently keeps the value it failed to save
 * is how a partner ends up believing a property is on Instant Book when it is
 * not, which for this particular setting means believing a card will be charged.
 *
 * `bookingMode.override` is the stored value (null = inheriting), NOT the
 * effective one — the dropdown must show what this listing itself says, with
 * inheritance offered as its own option.
 */
const BookingModeRow = ({ hubId, bookingMode, onChanged }) => {
  const [saving, setSaving] = useState(false);
  const [value, setValue] = useState(bookingMode?.override || "");
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const options = listingOptions(bookingMode?.partnerDefault);

  const change = async (next) => {
    const previous = value;
    setValue(next); setSaving(true); setError(null); setSaved(false);
    try {
      // "" is the inherit option; the hub takes null and $unsets the override.
      const res = await setListingBookingMode({ hubId, mode: next || null, actor: currentActor() });
      setSaved(true);
      if (onChanged) onChanged(res);
    } catch (e) {
      setValue(previous);
      setError(e?.response?.data?.error || e?.message || "the change did not save");
    } finally { setSaving(false); }
  };

  const effective = value || bookingMode?.partnerDefault || "enquiry";
  return (
    <div className="pt-bm">
      <select
        className="pt-bm-select"
        value={value}
        disabled={saving}
        onChange={(e) => change(e.target.value)}
        aria-label="Booking mode for this property"
      >
        {options.map((o) => <option key={o.value || "inherit"} value={o.value}>{o.label}</option>)}
      </select>
      {saving ? <span className="pt-muted"> · saving…</span> : null}
      {saved && !saving ? <span className="pt-muted"> · saved</span> : null}
      {error ? <span className="pt-bm-error"> · {esc(error)}</span> : null}
      {/* What the guest actually gets. Spelled out because "Instant Book" and
          "Instant confirmation" differ in exactly one way a partner cares about
          — whether the card is charged — and the words alone do not say it. */}
      <div className="pt-muted pt-bm-help">{MODE_HELP[effective]}</div>
      {bookingMode?.inert ? (
        <div className="pt-bm-error">
          This source has no reservation API, so the setting is stored but inert — the listing stays enquiry-only.
        </div>
      ) : null}
      {bookingMode?.setBy ? (
        <div className="pt-muted">Last changed by {esc(bookingMode.setBy)}{bookingMode.setAt ? ` · ${esc(String(bookingMode.setAt).slice(0, 10))}` : ""}</div>
      ) : null}
    </div>
  );
};

export const FlagsCard = ({ xdata = {}, property = {}, source, instantBook, bookingMode, tags = [], dashboardUrl = "https://dashboard.villatracker.com" }) => {
  const id = property._id || property.id;
  const collections = [["eventCollection", "Events"], ["familyCollection", "Family"], ["petsCollection", "Pets"], ["sustainCollection", "Sustainable"], ["ecoCollection", "Eco"]].filter(([k]) => tags.includes(k)).map(([, l]) => l);
  const onDemand = tags.includes("onDemand") || xdata?.qod?.enabled === true;
  return (
    <div className="pt-card">
      <h3>Listing settings</h3>
      <table className="pt-table"><tbody>
        <Row k="Status">{statusPill(xdata.status)}{xdata.declineReason ? <span className="pt-muted"> · {esc(xdata.declineReason)}</span> : null}</Row>
        <Row k="Booking mode">
          {bookingMode ? (
            <>
              <span className={`pt-pill ${bookingMode.tone === "on" ? "ok" : bookingMode.tone === "info" ? "info" : "neutral"}`}>
                {MODE_LABEL[bookingMode.effective]}
              </span>
              {/* No longer "set it in the dashboard" — this IS where it is set. */}
              <BookingModeRow hubId={id} bookingMode={bookingMode} />
            </>
          ) : instantBook ? (
            // Pre-D6 fallback for any caller not yet passing bookingMode.
            <>
              <span className={`pt-pill ${instantBook.effective ? "ok" : "neutral"}`}>{instantBook.effective ? "ON" : "OFF"}</span>
              {instantBook?.label ? <span className="pt-muted"> · {esc(instantBook.label)}</span> : null}
            </>
          ) : <span className="pt-muted">—</span>}
        </Row>
        <Row k="Featured">
          <span className="pt-muted">Homepage featured set is curated in the dashboard (smilinghouse.ch homepage)</span>
        </Row>
        <Row k="Collections">{collections.length ? collections.map((c) => <span key={c} className="pt-pill info">{c}</span>) : <span className="pt-muted">none</span>}</Row>
        <Row k="On demand">{onDemand ? <span className="pt-pill warn">Quote on demand</span> : <span className="pt-muted">no — live prices</span>}</Row>
        <Row k="Source">{sourceLabel(source)}{xdata.pmName ? <span className="pt-muted"> · {esc(xdata.pmName)}</span> : null}</Row>
        <Row k="Region">{esc(xdata.region || "unmapped")}{xdata.subregion ? ` › ${esc(xdata.subregion)}` : ""}{xdata.city ? ` › ${esc(xdata.city)}` : ""}</Row>
      </tbody></table>
    </div>
  );
};

// ── Calendar ────────────────────────────────────────────────────────────────
const dayKey = (d) => d.toISOString().slice(0, 10);
const isAvail = (e) => (e ? (typeof e.status === "string" ? /avail/i.test(e.status) && !/un/i.test(e.status) : (e.allotment ?? 1) > 0) : null);

export const CalendarTab = ({ fullCalendar = [], currency = "", months = 12 }) => {
  const [offset, setOffset] = useState(0);
  const byDay = useMemo(() => {
    const m = new Map();
    for (const e of Array.isArray(fullCalendar) ? fullCalendar : []) {
      const k = typeof e?.date === "string" ? e.date.slice(0, 10) : e?.date instanceof Date ? dayKey(e.date) : null;
      if (k) m.set(k, e);
    }
    return m;
  }, [fullCalendar]);
  if (!byDay.size) return <div className="pt-empty">No calendar data synced for this listing yet.</div>;

  const start = new Date(); start.setDate(1); start.setMonth(start.getMonth() + offset);
  const monthsArr = Array.from({ length: months }, (_, i) => { const d = new Date(start); d.setMonth(start.getMonth() + i); return d; });
  const stats = { avail: 0, blocked: 0, prices: [] };
  for (const e of byDay.values()) { const a = isAvail(e); if (a) stats.avail++; else if (a === false) stats.blocked++; if (e.price > 0) stats.prices.push(Number(e.price)); }
  const minP = stats.prices.length ? Math.min(...stats.prices) : null, maxP = stats.prices.length ? Math.max(...stats.prices) : null;

  return (
    <div>
      <div className="pt-cal-head">
        <div className="pt-muted">{byDay.size} days synced · {stats.avail} available · {stats.blocked} blocked{minP !== null ? ` · nightly ${minP}–${maxP} ${currency}` : ""}</div>
        <div className="pt-cal-nav">
          <button type="button" onClick={() => setOffset(offset - months)}>‹</button>
          <button type="button" onClick={() => setOffset(0)}>Today</button>
          <button type="button" onClick={() => setOffset(offset + months)}>›</button>
        </div>
      </div>
      <div className="pt-cal">
        {monthsArr.map((m) => {
          const first = new Date(m.getFullYear(), m.getMonth(), 1);
          const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
          const pad = (first.getDay() + 6) % 7;
          return (
            <div key={m.toISOString()} className="pt-month">
              <div className="pt-month-name">{m.toLocaleString("en", { month: "long", year: "numeric" })}</div>
              <div className="pt-grid">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div key={i} className="pt-dow">{d}</div>)}
                {Array.from({ length: pad }).map((_, i) => <div key={`p${i}`} />)}
                {Array.from({ length: days }).map((_, i) => {
                  const d = new Date(Date.UTC(m.getFullYear(), m.getMonth(), i + 1));
                  const e = byDay.get(dayKey(d));
                  const a = isAvail(e);
                  const cls = a === null ? "none" : a ? "avail" : "blocked";
                  return (
                    <div key={i} className={`pt-day ${cls}`} title={e ? `${dayKey(d)} · ${a ? "available" : "blocked"}${e.price ? ` · ${e.price} ${e.currency || currency}` : ""}${e.minStay ? ` · min ${e.minStay}` : ""}` : dayKey(d)}>
                      <span className="n">{i + 1}</span>
                      {e?.price > 0 && <span className="p">{Math.round(e.price)}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-legend"><span className="avail" /> available <span className="blocked" /> blocked <span className="none" /> not synced</div>
    </div>
  );
};

// ── Reviews ─────────────────────────────────────────────────────────────────
export const ReviewsTab = ({ property = {}, xdata = {} }) => {
  const reviews = property.reviews || xdata.reviews || [];
  const rating = property.rating || property.reviewsAvg || xdata.rating || null;
  if (!Array.isArray(reviews) || !reviews.length) {
    return (
      <div className="pt-empty">
        {rating ? <div className="pt-rating">★ {esc(rating)}</div> : null}
        Guest reviews are not pulled from the PMS yet. Rentals United reviews (Pull_ListPropertyReviews) and Guesty reviews will appear here once the review sync ships.
      </div>
    );
  }
  return (
    <div className="pt-reviews">
      {rating ? <div className="pt-rating">★ {esc(rating)} · {reviews.length} reviews</div> : null}
      {reviews.map((r, i) => (
        <div key={i} className="pt-review">
          <div className="pt-review-head"><strong>{esc(r.author || r.guestName || r.name || "Guest")}</strong> <span className="pt-muted">{esc(r.date || r.createdAt || "")}</span> {r.rating ? <span className="pt-pill ok">★ {esc(r.rating)}</span> : null}</div>
          <div>{esc(r.text || r.comment || r.publicReview || r.review || "")}</div>
        </div>
      ))}
    </div>
  );
};

// ── Raw data ────────────────────────────────────────────────────────────────
const JsonBlock = ({ title, value }) => {
  const [open, setOpen] = useState(true);
  const txt = useMemo(() => { try { return JSON.stringify(value, null, 2); } catch (e) { return String(value); } }, [value]);
  const copy = () => { try { navigator.clipboard.writeText(txt); } catch (e) {} };
  return (
    <div className="pt-card">
      <div className="pt-json-head">
        <h3>{title} <span className="pt-muted">{txt ? `${(txt.length / 1024).toFixed(1)} KB` : ""}</span></h3>
        <div><button type="button" onClick={copy}>Copy</button> <button type="button" onClick={() => setOpen(!open)}>{open ? "Collapse" : "Expand"}</button></div>
      </div>
      {open && <pre className="pt-json">{txt}</pre>}
    </div>
  );
};

export const RawDataTab = ({ property, xdata, fullCalendar, ratePlans }) => (
  <div>
    <JsonBlock title="Listing data (PMS payload as stored in the hub · data)" value={property} />
    <JsonBlock title="Hub enrichment (xdata)" value={xdata} />
    {ratePlans ? <JsonBlock title="Rate plans" value={ratePlans} /> : null}
    {Array.isArray(fullCalendar) && fullCalendar.length ? <JsonBlock title={`fullCalendar (${fullCalendar.length} days)`} value={fullCalendar.slice(0, 60)} /> : null}
  </div>
);

// ── Sync data ───────────────────────────────────────────────────────────────
const fmt = (v) => {
  if (v === null || v === undefined || v === "") return <span className="pt-muted">—</span>;
  if (typeof v === "boolean") return <span className={`pt-pill ${v ? "ok" : "neutral"}`}>{String(v)}</span>;
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) return new Date(v).toLocaleString();
  if (v instanceof Date) return v.toLocaleString();
  if (typeof v === "object") { const s = JSON.stringify(v); return <code className="pt-code" title={s}>{s.length > 160 ? s.slice(0, 160) + "…" : s}</code>; }
  return String(v);
};

const GROUPS = [
  { title: "Identity & source", keys: ["source", "channelSource", "accountId", "pmName", "nickname", "isListed", "isActive", "lastUpdated", "createdAt", "updatedAt"] },
  { title: "Approval", keys: ["status", "statusUpdatedBy", "admin_approval", "declineReason", "autoDecline", "autodecline", "sourceInactive", "deadAtSource"] },
  { title: "Photos & branding scan", keys: ["pictureBrandingSummary", "pictureBrandingScannedAt", "pictureBrandingHeroUrl", "pictureBrandingPending", "pictureBrandingModel", "pictureBrandingUpdatedAt", "picturesFingerprint", "picturehashesPending", "picturehashesAlgo"] },
  { title: "Distribution", keys: ["ruPutLast", "ruPutStatus", "ruPropertyId", "ruId", "instantBook", "instantBookEffective", "instantBookSetAt", "instantBookSetBy", "qod", "onDemand", "channels", "channel", "tags"] },
  { title: "Geo", keys: ["continent", "regionGroup", "country", "region", "subregion", "city", "regionLocked", "geoSource", "zipcode", "lat", "lng"] },
  { title: "Content", keys: ["title", "titleSource", "titleGeneratedAt", "desc", "descSource", "translations", "beds", "area"] },
];

export const SyncDataTab = ({ listing = {}, xdata = {}, property = {} }) => {
  const flat = { ...xdata };
  const top = { source: listing.source || listing.channelSource, channelSource: listing.channelSource, accountId: listing.accountId || property.accountId, isListed: listing.isListed, lastUpdated: listing.lastUpdated, nickname: property.nickname };
  for (const [k, v] of Object.entries(top)) if (flat[k] === undefined && v !== undefined) flat[k] = v;
  const used = new Set();
  const groups = GROUPS.map((g) => ({ ...g, rows: g.keys.filter((k) => flat[k] !== undefined).map((k) => { used.add(k); return [k, flat[k]]; }) })).filter((g) => g.rows.length);
  const rest = Object.keys(flat).filter((k) => !used.has(k) && !["pictureBranding", "pictures"].includes(k)).sort().map((k) => [k, flat[k]]);
  return (
    <div className="pt-sync">
      {groups.map((g) => (
        <div key={g.title} className="pt-card">
          <h3>{g.title}</h3>
          <table className="pt-table"><tbody>{g.rows.map(([k, v]) => <Row key={k} k={k}>{fmt(v)}</Row>)}</tbody></table>
        </div>
      ))}
      {rest.length ? (
        <div className="pt-card">
          <h3>Other xdata fields <span className="pt-muted">({rest.length})</span></h3>
          <table className="pt-table"><tbody>{rest.map(([k, v]) => <Row key={k} k={k}>{fmt(v)}</Row>)}</tbody></table>
        </div>
      ) : null}
    </div>
  );
};
