import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import Paging from "../../components/Paging/index.js";
import constants from "../../Util/constants.js";
import swal from "sweetalert";
import {
    fetchAgodaListings, saveAgodaConfig, setAgodaEnabled, pushListing,
    mirrorImages, cpapiCreateProperty, cpapiCreateRoom, cpapiCreateRatePlan, cpapiCreateProduct,
} from "../../services/agoda.service.js";

// Agoda distribution property picker. Server feed (GET /services/agoda/listings)
// computes eligibility, mirror state and last push per listing; this screen
// drives the whole per-listing lifecycle:
//   Mirror images -> Create on Agoda (CPAPI property/room/rateplan/product,
//   codes auto-saved to xdata.agoda) -> Enable -> Push ARI.
// Manual code entry stays available for properties that already exist on
// Agoda's side (codes provided by Agoda support).
const PER_PAGE = constants.PAGING_LISTING_SIZE || 50;

const REASON_LABELS = {
    inactive: "inactive", "no-currency": "no currency", "no-calendar": "no calendar",
    "no-geo": "no coordinates", "few-photos": "less than 3 photos", "no-capacity": "no capacity",
};

const AgodaListings = (props) => {
    const { agency, agent, screenSize, activeMenu, handleToggleMenu } = props;

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [busyRow, setBusyRow] = useState(null); // listingId currently running an action
    const [q, setQ] = useState("");
    const [accountId, setAccountId] = useState("");
    const [status, setStatus] = useState(""); // '' | enabled | disabled | ready | blocked
    const [edits, setEdits] = useState({});   // id -> {hotelCode, roomTypeCode, ratePlanCode, currency}
    const [showCodes, setShowCodes] = useState(null); // listingId with the codes editor open

    const load = useCallback(async (pg = page) => {
        setIsLoading(true);
        try {
            const data = await fetchAgodaListings({
                accountId, q, status, skip: (pg - 1) * PER_PAGE, limit: PER_PAGE,
            });
            setItems(Array.isArray(data?.items) ? data.items : []);
            setTotal(Number(data?.total) || 0);
        } catch (e) {
            swal({ title: "Could not load listings", text: e?.response?.data?.error || e?.message || String(e), icon: "error" });
            setItems([]);
        }
        setIsLoading(false);
    }, [accountId, q, status, page]);

    useEffect(() => { load(1); setPage(1); /* eslint-disable-next-line */ }, [status]);

    const onChangePage = (pg) => { setPage(pg); load(pg); };
    const onSearch = () => { setPage(1); load(1); };

    const editFor = (d) => {
        const a = d.agoda || {};
        const e = edits[d.id] || {};
        return {
            hotelCode: e.hotelCode ?? a.hotelCode ?? "",
            roomTypeCode: e.roomTypeCode ?? a.roomTypeCode ?? "",
            ratePlanCode: e.ratePlanCode ?? a.ratePlanCode ?? "",
            currency: e.currency ?? a.currency ?? d.currency ?? "",
        };
    };
    const setEdit = (id, field, value) =>
        setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));

    const run = async (d, label, fn, { reload = true } = {}) => {
        setBusyRow(d.id);
        try {
            const res = await fn();
            if (reload) await load(page);
            setBusyRow(null);
            return res;
        } catch (e) {
            setBusyRow(null);
            swal({ title: `${label} failed`, text: e?.response?.data?.error || e?.message || String(e), icon: "error" });
            return null;
        }
    };

    const saveRow = async (d) => {
        const cfg = { ...editFor(d), enabled: d.enabled };
        if (!cfg.hotelCode || !cfg.roomTypeCode || !cfg.ratePlanCode) {
            swal({ title: "HotelCode, RoomType and RatePlan are required", icon: "error" });
            return;
        }
        const res = await run(d, "Save", () => saveAgodaConfig(d.id, cfg));
        if (res) { setShowCodes(null); swal({ title: "Saved", text: d.title, icon: "success", timer: 1200 }); }
    };

    const toggleEnabled = (d) =>
        run(d, d.enabled ? "Disable" : "Enable", () => setAgodaEnabled(d.id, !d.enabled));

    const mirrorRow = async (d) => {
        const res = await run(d, "Mirror images", () => mirrorImages(d.id));
        if (res) swal({
            title: "Images mirrored",
            text: `${res.uploaded || 0} uploaded, ${res.reused || 0} reused${res.failedCount ? `, ${res.failedCount} FAILED` : ""}`,
            icon: res.failedCount ? "warning" : "success",
        });
    };

    // Full CPAPI chain. Property creation returns the hotel code; Agoda needs
    // ~5 min before accepting rooms/rate plans, so the chain stops there on
    // first run — pressing the button again finishes room -> rateplan -> product.
    const createOnAgoda = async (d) => {
        if (!d.mirrored) {
            swal({ title: "Mirror images first", text: "Agoda ingests image URLs from our CDN — run Mirror before creating the property.", icon: "warning" });
            return;
        }
        const cfg = d.agoda || {};
        if (!cfg.hotelCode) {
            const res = await run(d, "Create property", () => cpapiCreateProperty(d.id));
            if (res?.success) swal({
                title: "Property created on Agoda",
                text: `Hotel code ${res.id}. Agoda needs ~5 minutes before the room and rate plan can be created — press "Create on Agoda" again then.`,
                icon: "success",
            });
            return;
        }
        if (!cfg.roomTypeCode) {
            const res = await run(d, "Create room", () => cpapiCreateRoom(d.id));
            if (!res?.success) return;
        }
        if (!(d.agoda?.ratePlanCode) && !(edits[d.id]?.ratePlanCode)) {
            const res = await run(d, "Create rate plan", () => cpapiCreateRatePlan(d.id));
            if (!res?.success) return;
        }
        const res = await run(d, "Create product", () => cpapiCreateProduct(d.id));
        if (res?.success) swal({ title: "Sellable product mapped on Agoda", text: d.title, icon: "success" });
    };

    const pushRow = async (d) => {
        const acct = d.accountId || accountId;
        if (!acct) { swal({ title: "No accountId for this listing", icon: "error" }); return; }
        const res = await run(d, "Push", () => pushListing(acct, d.id));
        if (res) {
            const results = res.results || [];
            const failed = results.filter((r) => !r.success && !r.skipped);
            swal({
                title: failed.length ? "Push finished with errors" : "ARI pushed",
                text: `${results.length} chunk(s): ${results.filter((r) => r.success).length} ok, ${results.filter((r) => r.skipped).length} unchanged, ${failed.length} failed${failed[0]?.errorMessage ? ` — ${failed[0].errorMessage}` : ""}`,
                icon: failed.length ? "warning" : "success",
            });
        }
    };

    const badge = (d) => {
        if (d.enabled) return <span style={{ ...pill, background: "#1d6f42" }}>Enabled</span>;
        if (d.configured) return <span style={{ ...pill, background: "#4a5ac0" }}>Configured</span>;
        if (d.ready) return <span style={{ ...pill, background: "#2b6cb0" }}>Ready</span>;
        const txt = (d.blockers || []).map((r) => REASON_LABELS[r] || r).join(", ");
        return <span style={{ ...pill, background: "#a15c1a" }} title={txt}>Blocked ({(d.blockers || []).length})</span>;
    };

    const syncBadge = (d) => {
        const s = d.lastSync;
        if (!s) return <span style={{ color: "#999", fontSize: 11 }}>never</span>;
        const color = s.status === "acked" ? "#1d6f42" : s.status === "failed" ? "#b02b2b" : "#a15c1a";
        return (
            <span style={{ color, fontSize: 11 }} title={s.errorMessage || ""}>
                {s.status} {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ""}
            </span>
        );
    };

    return (
        <div className="page-container">
            <div className="page-header">VT-Extranet : Agoda Distribution</div>
            <Sidebar agency={agency} agent={agent} screenSize={screenSize} activeMenu={activeMenu} handleToggleMenu={handleToggleMenu} />
            <div className="page-body">
                <div className="listings-container">
                    <LoadingBox visible={isLoading} />
                    <div className="listings-main">
                        <div style={note}>
                            Lifecycle per listing: <b>Mirror</b> photos to our CDN → <b>Create on Agoda</b> (property → room →
                            rate plan → product; codes save automatically) → <b>Enable</b> → <b>Push</b> ARI. Codes can also be
                            entered manually via ⚙ for properties that already exist on Agoda.
                        </div>

                        <div className="row" style={{ margin: "10px 0", gap: 8, display: "flex", flexWrap: "wrap" }}>
                            <input className="form-control" style={{ maxWidth: 240 }} placeholder="Guesty accountId (G-...) — optional"
                                value={accountId} onChange={(e) => setAccountId(e.target.value)} />
                            <input className="form-control" style={{ maxWidth: 240 }} placeholder="Search name / id"
                                value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch()} />
                            <button className="btn btn-primary" onClick={onSearch}>Search</button>
                            <select className="form-control" style={{ maxWidth: 200 }} value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">All</option>
                                <option value="enabled">Enabled</option>
                                <option value="disabled">Not enabled</option>
                                <option value="ready">Ready</option>
                                <option value="blocked">Blocked</option>
                            </select>
                            <span style={{ alignSelf: "center", color: "#555" }}>{total} listings</span>
                        </div>

                        <table className="table table-sm" style={{ fontSize: 13 }}>
                            <thead>
                                <tr>
                                    <th></th><th>Status</th><th>Listing</th><th>Location</th>
                                    <th>Photos</th><th>Mirrored</th><th>Agoda codes</th><th>Last push</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((d) => {
                                    const e = editFor(d);
                                    const busy = busyRow === d.id;
                                    return (
                                        <React.Fragment key={d.id}>
                                            <tr style={busy ? { opacity: 0.5 } : undefined}>
                                                <td>{d.thumb ? <img src={d.thumb} alt="" style={{ width: 44, height: 32, objectFit: "cover", borderRadius: 3 }} /> : null}</td>
                                                <td>{badge(d)}</td>
                                                <td style={{ maxWidth: 260 }}>
                                                    <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.title}</div>
                                                    <div style={{ color: "#888", fontSize: 11 }}>{d.id} · {d.currency}{d.calDays ? ` · ${d.calDays}d cal` : ""}</div>
                                                </td>
                                                <td style={{ maxWidth: 160 }}>{d.city}{d.city && d.country ? ", " : ""}{d.country}</td>
                                                <td>{d.photos}</td>
                                                <td>{d.mirrored ? <span style={{ color: "#1d6f42" }}>{d.mirrored} ✓</span> : <span style={{ color: "#a15c1a" }}>no</span>}</td>
                                                <td style={{ fontSize: 11 }}>
                                                    {d.configured
                                                        ? <span title={`hotel ${d.agoda.hotelCode} / room ${d.agoda.roomTypeCode} / rate ${d.agoda.ratePlanCode}`}>{d.agoda.hotelCode} ✓</span>
                                                        : <span style={{ color: "#999" }}>{d.agoda?.hotelCode ? `${d.agoda.hotelCode} (partial)` : "—"}</span>}
                                                    <button style={gear} title="Edit codes manually" onClick={() => setShowCodes(showCodes === d.id ? null : d.id)}>⚙</button>
                                                </td>
                                                <td>{syncBadge(d)}</td>
                                                <td style={{ whiteSpace: "nowrap" }}>
                                                    <button style={btn} disabled={busy} onClick={() => mirrorRow(d)} title="Copy photos to our CDN">Mirror</button>
                                                    <button style={{ ...btn, background: "#4a5ac0" }} disabled={busy || !d.ready} onClick={() => createOnAgoda(d)} title="Create property/room/rateplan/product via CPAPI">
                                                        {d.configured ? "Re-create" : d.agoda?.hotelCode ? "Continue create" : "Create on Agoda"}
                                                    </button>
                                                    <button style={{ ...btn, background: d.enabled ? "#a15c1a" : "#1d6f42" }} disabled={busy || (!d.enabled && !d.configured)} onClick={() => toggleEnabled(d)}
                                                        title={!d.enabled && !d.configured ? "Needs Agoda codes first" : ""}>
                                                        {d.enabled ? "Disable" : "Enable"}
                                                    </button>
                                                    <button style={{ ...btn, background: "#2b6cb0" }} disabled={busy || !d.configured} onClick={() => pushRow(d)}>Push</button>
                                                </td>
                                            </tr>
                                            {showCodes === d.id && (
                                                <tr>
                                                    <td colSpan={9} style={{ background: "#f7f8fa" }}>
                                                        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 8px" }}>
                                                            <label style={lbl}>HotelCode <input style={inp} value={e.hotelCode} onChange={(ev) => setEdit(d.id, "hotelCode", ev.target.value)} /></label>
                                                            <label style={lbl}>RoomType <input style={inp} value={e.roomTypeCode} onChange={(ev) => setEdit(d.id, "roomTypeCode", ev.target.value)} /></label>
                                                            <label style={lbl}>RatePlan <input style={inp} value={e.ratePlanCode} onChange={(ev) => setEdit(d.id, "ratePlanCode", ev.target.value)} /></label>
                                                            <label style={lbl}>Currency <input style={{ ...inp, width: 56 }} value={e.currency} onChange={(ev) => setEdit(d.id, "currency", ev.target.value)} /></label>
                                                            <button style={btn} disabled={busy} onClick={() => saveRow(d)}>Save codes</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                                {items.length === 0 && !isLoading && (
                                    <tr><td colSpan={9} style={{ textAlign: "center", color: "#888", padding: 24 }}>No listings.</td></tr>
                                )}
                            </tbody>
                        </table>

                        <Paging totalItems={total} currentPage={page} perPage={PER_PAGE} onChangePage={onChangePage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const pill = { color: "#fff", padding: "2px 8px", borderRadius: 10, fontSize: 11, whiteSpace: "nowrap" };
const inp = { width: 110, fontSize: 12, padding: "2px 4px" };
const lbl = { fontSize: 11, color: "#555", display: "flex", alignItems: "center", gap: 4 };
const btn = { color: "#fff", background: "#192C3D", border: "none", borderRadius: 3, padding: "3px 8px", marginRight: 4, fontSize: 12, cursor: "pointer" };
const gear = { border: "none", background: "transparent", cursor: "pointer", fontSize: 13, marginLeft: 4 };
const note = { background: "#eef4fb", border: "1px solid #c9dcf0", borderRadius: 4, padding: "8px 12px", fontSize: 12, color: "#274a6d", margin: "8px 0" };

export default AgodaListings;
