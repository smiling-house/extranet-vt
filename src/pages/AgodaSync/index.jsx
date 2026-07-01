import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import swal from "sweetalert";
import { fetchSyncLedger, pushAllEnabled } from "../../services/agoda.service.js";

// Agoda outbound push ledger (agoda_sync). Backend: GET /services/agoda/sync-ledger,
// POST /services/agoda/sync/:accountId (both existing).
const STATUS_COLORS = { acked: "#1d6f42", sent: "#2b6cb0", pending: "#a15c1a", failed: "#a12a2a" };

const AgodaSync = (props) => {
    const { agency, agent, screenSize, activeMenu, handleToggleMenu } = props;

    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [accountId, setAccountId] = useState("");
    const [viewXml, setViewXml] = useState(null);

    const load = async () => {
        setIsLoading(true);
        try {
            const q = {};
            if (status) q.status = status;
            if (accountId) q.accountId = accountId;
            const data = await fetchSyncLedger(q);
            const list = Array.isArray(data) ? data : (data?.items || data?.ledger || []);
            setRows(list);
        } catch (e) {
            swal({ title: "Could not load ledger", text: e?.message || String(e), icon: "error" });
            setRows([]);
        }
        setIsLoading(false);
    };

    useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

    const pushAll = async () => {
        if (!accountId) { swal({ title: "Enter an accountId to push all enabled", icon: "error" }); return; }
        setIsLoading(true);
        try {
            const res = await pushAllEnabled(accountId);
            setIsLoading(false);
            swal({ title: "Push all queued", text: JSON.stringify(res).slice(0, 300), icon: "success" });
            load();
        } catch (e) {
            setIsLoading(false);
            swal({ title: "Push failed", text: e?.message || String(e), icon: "error" });
        }
    };

    const fmt = (d) => (d ? new Date(d).toISOString().replace("T", " ").slice(0, 16) : "");

    return (
        <div className="page-container">
            <div className="page-header">VT-Extranet : Agoda Sync Status</div>
            <Sidebar agency={agency} agent={agent} screenSize={screenSize} activeMenu={activeMenu} handleToggleMenu={handleToggleMenu} />
            <div className="page-body">
                <div className="listings-container">
                    <LoadingBox visible={isLoading} />
                    <div className="listings-main">
                        <div className="listings-title">Outbound ARI push ledger</div>
                        <div className="row" style={{ margin: "10px 0", gap: 8, display: "flex", flexWrap: "wrap" }}>
                            <input className="form-control" style={{ maxWidth: 260 }} placeholder="accountId (G-...)" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
                            <select className="form-control" style={{ maxWidth: 180 }} value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">All statuses</option>
                                <option value="pending">pending</option>
                                <option value="sent">sent</option>
                                <option value="acked">acked</option>
                                <option value="failed">failed</option>
                            </select>
                            <button className="btn btn-primary" onClick={load}>Refresh</button>
                            <button className="btn" style={{ background: "#1d6f42", color: "#fff" }} onClick={pushAll}>Push all enabled</button>
                        </div>

                        <table className="table table-sm" style={{ fontSize: 13 }}>
                            <thead>
                                <tr><th>Status</th><th>Listing</th><th>Hotel/Room/Rate</th><th>Range</th><th>Att.</th><th>Error</th><th>Updated</th><th>XML</th></tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => (
                                    <tr key={r._id || i}>
                                        <td><span style={{ color: "#fff", background: STATUS_COLORS[r.status] || "#555", padding: "2px 8px", borderRadius: 10, fontSize: 11 }}>{r.status}</span></td>
                                        <td style={{ fontSize: 11 }}>{r.listingId}</td>
                                        <td style={{ fontSize: 11 }}>{r.hotelCode} / {r.roomTypeCode} / {r.ratePlanCode}</td>
                                        <td style={{ fontSize: 11 }}>{fmt(r.dateFrom)} → {fmt(r.dateTo)}</td>
                                        <td>{r.attempts ?? 0}</td>
                                        <td style={{ maxWidth: 200, color: "#a12a2a", fontSize: 11 }}>{r.errorMessage || r.errorCode || ""}</td>
                                        <td style={{ fontSize: 11 }}>{fmt(r.updatedAt || r.lastAttemptAt)}</td>
                                        <td>
                                            {(r.requestXml || r.responseXml) && (
                                                <button style={{ fontSize: 11, cursor: "pointer" }} onClick={() => setViewXml(r)}>view</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {rows.length === 0 && !isLoading && (
                                    <tr><td colSpan={8} style={{ textAlign: "center", color: "#888", padding: 24 }}>No push records.</td></tr>
                                )}
                            </tbody>
                        </table>

                        {viewXml && (
                            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setViewXml(null)}>
                                <div style={{ background: "#fff", padding: 16, width: "80%", maxHeight: "80%", overflow: "auto" }} onClick={(e) => e.stopPropagation()}>
                                    <h4>Request</h4>
                                    <pre style={{ whiteSpace: "pre-wrap", fontSize: 11 }}>{viewXml.requestXml || "(none)"}</pre>
                                    <h4>Response</h4>
                                    <pre style={{ whiteSpace: "pre-wrap", fontSize: 11 }}>{viewXml.responseXml || "(none)"}</pre>
                                    <button className="btn btn-secondary" onClick={() => setViewXml(null)}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgodaSync;
