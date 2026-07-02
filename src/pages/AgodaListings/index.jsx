import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import Paging from "../../components/Paging/index.js";
import constants from "../../Util/constants.js";
import swal from "sweetalert";
import {
    fetchAgodaListings, saveAgodaConfig, setAgodaEnabled, pushListing,
} from "../../services/agoda.service.js";
import {
    agodaBlockingReasons, AGODA_REASON_LABELS, isAgodaConfigured, isAgodaEnabled,
} from "../../Util/agodaEligibility.js";

// Agoda distribution property picker. Reads the Guesty listings feed
// (/local/listings, existing) and lets staff enable + map each listing to its
// Agoda codes. Writes go to the per-listing config endpoints (see
// AGODA-UI-PLAN.md §2 — PENDING BACKEND).
const PER_PAGE = constants.PAGING_LISTING_SIZE || 100;

const AgodaListings = (props) => {
    const { agency, agent, screenSize, activeMenu, handleToggleMenu } = props;

    const [listings, setListings] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [q, setQ] = useState("");
    const [accountId, setAccountId] = useState("");
    const [filter, setFilter] = useState("all"); // all | enabled | eligible | blocked
    const [edits, setEdits] = useState({});       // id -> {hotelCode, roomTypeCode, ratePlanCode, currency}

    const load = useCallback(async (pg = page) => {
        setIsLoading(true);
        try {
            const data = await fetchAgodaListings({
                accountId, q, skip: (pg - 1) * PER_PAGE, limit: PER_PAGE,
            });
            setListings(Array.isArray(data?.listings) ? data.listings : []);
            setCount(Number(data?.count) || 0);
        } catch (e) {
            swal({ title: "Could not load listings", text: e?.message || String(e), icon: "error" });
            setListings([]);
        }
        setIsLoading(false);
    }, [accountId, q, page]);

    useEffect(() => { load(1); setPage(1); /* eslint-disable-next-line */ }, []);

    const onChangePage = (pg) => { setPage(pg); load(pg); };
    const onSearch = () => { setPage(1); load(1); };

    const editFor = (d) => {
        const a = d.xdata?.agoda || {};
        const e = edits[d.id] || {};
        return {
            hotelCode: e.hotelCode ?? a.hotelCode ?? "",
            roomTypeCode: e.roomTypeCode ?? a.roomTypeCode ?? "",
            ratePlanCode: e.ratePlanCode ?? a.ratePlanCode ?? "",
            currency: e.currency ?? a.currency ?? d.data?.prices?.currency ?? "",
        };
    };
    const setEdit = (id, field, value) =>
        setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));

    const saveRow = async (d) => {
        const cfg = { ...editFor(d), enabled: isAgodaEnabled(d) };
        if (!cfg.hotelCode || !cfg.roomTypeCode || !cfg.ratePlanCode) {
            swal({ title: "HotelCode, RoomType and RatePlan are required", icon: "error" });
            return;
        }
        setIsLoading(true);
        try {
            await saveAgodaConfig(d.id, cfg);
            swal({ title: "Saved", text: d.data?.title || d.id, icon: "success" });
            await load(page);
        } catch (e) {
            setIsLoading(false);
            swal({ title: "Save failed (backend endpoint pending?)", text: e?.message || String(e), icon: "error" });
        }
    };

    const toggleEnabled = async (d) => {
        const next = !isAgodaEnabled(d);
        setIsLoading(true);
        try {
            await setAgodaEnabled(d.id, next);
            await load(page);
        } catch (e) {
            setIsLoading(false);
            swal({ title: "Toggle failed (backend endpoint pending?)", text: e?.message || String(e), icon: "error" });
        }
    };

    const pushRow = async (d) => {
        const acct = accountId || d.accountId;
        if (!acct) { swal({ title: "No accountId for this listing", icon: "error" }); return; }
        setIsLoading(true);
        try {
            const res = await pushListing(acct, d.id);
            setIsLoading(false);
            swal({ title: "Push queued", text: JSON.stringify(res).slice(0, 300), icon: "success" });
        } catch (e) {
            setIsLoading(false);
            swal({ title: "Push failed", text: e?.message || String(e), icon: "error" });
        }
    };

    const rows = listings.filter((d) => {
        const reasons = agodaBlockingReasons(d);
        if (filter === "enabled") return isAgodaEnabled(d);
        if (filter === "eligible") return reasons.length === 0 && !isAgodaEnabled(d);
        if (filter === "blocked") return reasons.length > 0;
        return true;
    });

    const badge = (d) => {
        const reasons = agodaBlockingReasons(d);
        if (isAgodaEnabled(d)) return <span style={{ ...pill, background: "#1d6f42" }}>Enabled</span>;
        if (reasons.length === 0) return <span style={{ ...pill, background: "#2b6cb0" }}>Ready</span>;
        const txt = reasons.map((r) => AGODA_REASON_LABELS[r] || r).join(", ");
        return <span style={{ ...pill, background: "#a15c1a" }} title={txt}>Blocked ({reasons.length})</span>;
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
                            Enable + map each listing to its Agoda codes. Writes use the per-listing config
                            endpoints in VTHub (require the api.villatracker.com deploy to take effect).
                        </div>

                        <div className="row" style={{ margin: "10px 0", gap: 8, display: "flex", flexWrap: "wrap" }}>
                            <input className="form-control" style={{ maxWidth: 260 }} placeholder="Guesty accountId (G-...) — optional"
                                value={accountId} onChange={(e) => setAccountId(e.target.value)} />
                            <input className="form-control" style={{ maxWidth: 260 }} placeholder="Search name / nickname"
                                value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch()} />
                            <button className="btn btn-primary" onClick={onSearch}>Search</button>
                            <select className="form-control" style={{ maxWidth: 220 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="all">All</option>
                                <option value="enabled">Enabled</option>
                                <option value="eligible">Eligible (not enabled)</option>
                                <option value="blocked">Blocked</option>
                            </select>
                            <span style={{ alignSelf: "center", color: "#555" }}>{count} listings</span>
                        </div>

                        <table className="table table-sm" style={{ fontSize: 13 }}>
                            <thead>
                                <tr>
                                    <th>Status</th><th>Listing</th><th>Location</th>
                                    <th>HotelCode</th><th>RoomType</th><th>RatePlan</th><th>Cur</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((d) => {
                                    const e = editFor(d);
                                    return (
                                        <tr key={d.id}>
                                            <td>{badge(d)}</td>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{d.data?.title || d.data?.nickname || d.id}</div>
                                                <div style={{ color: "#888", fontSize: 11 }}>{d.id}{isAgodaConfigured(d) ? " • configured" : ""}</div>
                                            </td>
                                            <td style={{ maxWidth: 180 }}>{d.data?.address?.city || d.xdata?.city || ""}, {d.data?.address?.country || d.xdata?.country || ""}</td>
                                            <td><input style={inp} value={e.hotelCode} onChange={(ev) => setEdit(d.id, "hotelCode", ev.target.value)} /></td>
                                            <td><input style={inp} value={e.roomTypeCode} onChange={(ev) => setEdit(d.id, "roomTypeCode", ev.target.value)} /></td>
                                            <td><input style={inp} value={e.ratePlanCode} onChange={(ev) => setEdit(d.id, "ratePlanCode", ev.target.value)} /></td>
                                            <td><input style={{ ...inp, width: 56 }} value={e.currency} onChange={(ev) => setEdit(d.id, "currency", ev.target.value)} /></td>
                                            <td style={{ whiteSpace: "nowrap" }}>
                                                <button style={btn} onClick={() => saveRow(d)}>Save</button>
                                                <button style={{ ...btn, background: isAgodaEnabled(d) ? "#a15c1a" : "#1d6f42" }} onClick={() => toggleEnabled(d)}>
                                                    {isAgodaEnabled(d) ? "Disable" : "Enable"}
                                                </button>
                                                <button style={{ ...btn, background: "#2b6cb0" }} onClick={() => pushRow(d)}>Push</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {rows.length === 0 && !isLoading && (
                                    <tr><td colSpan={8} style={{ textAlign: "center", color: "#888", padding: 24 }}>No listings.</td></tr>
                                )}
                            </tbody>
                        </table>

                        <Paging totalItems={count} currentPage={page} perPage={PER_PAGE} onChangePage={onChangePage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const pill = { color: "#fff", padding: "2px 8px", borderRadius: 10, fontSize: 11, whiteSpace: "nowrap" };
const inp = { width: 90, fontSize: 12, padding: "2px 4px" };
const btn = { color: "#fff", background: "#192C3D", border: "none", borderRadius: 3, padding: "3px 8px", marginRight: 4, fontSize: 12, cursor: "pointer" };
const note = { background: "#fff6e6", border: "1px solid #f0d9a8", borderRadius: 4, padding: "8px 12px", fontSize: 12, color: "#7a5a1a", margin: "8px 0" };

export default AgodaListings;
