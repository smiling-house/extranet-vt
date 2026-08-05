import React from "react";
import axios from 'axios';


import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./theme-dashboard.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
// ---------------------------------------------------------------------------
// Session expiry: any 401 from the VT backend while a session token exists
// means the jToken died — clear the session and land on /login with a notice
// instead of leaving half-broken pages. Applies to the default axios instance
// AND every axios.create() instance (interceptors are per-instance).
// ---------------------------------------------------------------------------
const handle401 = (err) => {
  try {
    const status = err?.response?.status;
    const url = err?.config?.url || '';
    const onLogin = window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/adminlogin');
    if (status === 401 && localStorage.getItem('jToken') && /backend\.villatracker\.com/.test(url) && !onLogin) {
      localStorage.clear();
      window.location.href = '/login?expired=1';
    }
  } catch (e) { /* never block the original error */ }
  return Promise.reject(err);
};
axios.interceptors.response.use((r) => r, handle401);
const __origCreate = axios.create.bind(axios);
axios.create = (cfg) => {
  const inst = __origCreate(cfg);
  inst.interceptors.response.use((r) => r, handle401);
  return inst;
};

require('react-web-vector-icons/fonts');


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
