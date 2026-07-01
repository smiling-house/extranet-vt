import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import InputField from "../../components/InputField";
import swal from "sweetalert";
import { registerAccount, testAuth } from "../../services/agoda.service.js";

// Agoda account credentials + connection test.
// Backend: POST /services/agoda/account (existing), GET /v1/agoda/auth/test.
const AgodaAccount = (props) => {
    const { agency, agent, screenSize, activeMenu, handleToggleMenu } = props;

    const [accountId, setAccountId] = useState("");
    const [email, setEmail] = useState("");
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const save = async () => {
        if (!accountId || !clientId || !clientSecret) {
            swal({ title: "accountId, Client ID and Client Secret are required", icon: "error" });
            return;
        }
        setIsLoading(true);
        try {
            const res = await registerAccount({ accountId, email, clientId, clientSecret });
            setIsLoading(false);
            if (res?.success === false) {
                swal({ title: "Could not save account", text: res.error || res.message || "", icon: "error" });
            } else {
                swal({ title: "Agoda account saved", icon: "success" });
            }
        } catch (e) {
            setIsLoading(false);
            swal({ title: "Error saving account", text: e?.message || String(e), icon: "error" });
        }
    };

    const test = async () => {
        setIsLoading(true);
        try {
            const res = await testAuth(accountId);
            setIsLoading(false);
            if (res?.success) {
                swal({ title: "Connection OK", text: `Token valid until ${res.tokenValidUntil || "?"}`, icon: "success" });
            } else {
                swal({ title: "Connection failed", text: res?.error || res?.message || "", icon: "error" });
            }
        } catch (e) {
            setIsLoading(false);
            swal({ title: "Connection failed", text: e?.message || String(e), icon: "error" });
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">VT-Extranet : Agoda Account</div>
            <Sidebar
                agency={agency}
                agent={agent}
                screenSize={screenSize}
                activeMenu={activeMenu}
                handleToggleMenu={handleToggleMenu}
            />
            <div className="page-body">
                <div className="listings-container">
                    <LoadingBox visible={isLoading} />
                    <div className="listings-main">
                        <div className="listings-title">Agoda YCS account credentials</div>
                        <div style={{ maxWidth: 720 }}>
                            <div className="row">
                                <div className="col-6">
                                    <InputField label="Guesty Account ID (G-...)*" value={accountId} onChange={setAccountId} placeholder="G-..." style={{ marginTop: "20px" }} />
                                </div>
                                <div className="col-6">
                                    <InputField label="Contact Email" value={email} onChange={setEmail} placeholder="ops@..." style={{ marginTop: "20px" }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <InputField label="Agoda Client ID*" value={clientId} onChange={setClientId} placeholder="Client ID" style={{ marginTop: "20px" }} />
                                </div>
                                <div className="col-6">
                                    <InputField label="Agoda Client Secret*" value={clientSecret} onChange={setClientSecret} placeholder="Client Secret" style={{ marginTop: "20px" }} />
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 24 }}>
                                <div className="col-6">
                                    <button className="btn btn-success border-radius-0 py-2 px-4" style={{ backgroundColor: "#192C3D", color: "#fff" }} onClick={save}>
                                        Save Account
                                    </button>
                                    &nbsp;&nbsp;
                                    <button className="btn border-radius-0 py-2 px-4" style={{ backgroundColor: "#2b7a4b", color: "#fff" }} onClick={test}>
                                        Test Connection
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgodaAccount;
