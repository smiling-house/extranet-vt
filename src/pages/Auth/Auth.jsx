import React, { useEffect, useState } from "react";
import { validateEmail, } from "../../Util/ValidationUtil.js";
import Logo from "../../components/Icons/Logo/Logo";
import brandLogo from "../../assets/logos/vt-extranet-logo.svg";
import "./Auth.css";
import "./auth-redesign.css";
import styles from "./Auth.module.scss";
import { useDispatch } from "react-redux";
import * as userActions from '../../store/redux/User/actions';
import TermsFooter from "../../components/TermsFooter/TermsFooter";
import Alert from "../../components/Alert/Alert";
import { useHistory } from "react-router-dom";
import Checkbox from "../../components/Checkbox";
import LeftImage from '../../assets/SigninPic.jpeg'
import EmailInput from "../../components/Forms/Fields/EmailInput/EmailInput";
import PasswordInput from "../../components/Forms/Fields/PasswordInput/PasswordInput";
import NameInput from "../../components/Forms/Fields/NameInput/NameInput";
import { toast } from "react-toastify";
import { getStorageValue } from "../../Util/general.js";

import {PATH_PARTNERS, PATH_HOME, PATH_DASHBOARD} from '../../Util/constants.js'

const Auth = (props) => {

	return (
		<>
			<SignIn />
		</>
	);
};
export default Auth;



export const SignIn = () => {

	const partnerLoginEmail = localStorage.getItem('partnerLoginEmail');
	const partnerLoginAccountId = localStorage.getItem('partnerLoginAccountId');	

	const dispatch = useDispatch();

	const history = useHistory();
	const [smallScreen, setSmallScreen] = useState(false);
	const [screenSize, setScreenSize] = useState(null);
	const [chkRememberMe, setChkRememberMe] = useState(false);
	const [chkAgreeToTerms, setChkAgreeToTerms] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [twoFA, setTwoFA] = useState("");
  	const [codeSent, setCodeSent] = useState(false);


	const setQrCredentials = () => {
		setEmail(partnerLoginEmail);
		setPassword(partnerLoginAccountId);		
	}


	const partnerLogin = getStorageValue('partnerLogin')
	const [state, setState] = useState({
		loading: false
	});

	const signupCallback = result => {
		console.log("result", result)
		if (result === 'ok') {
			window.open("/home", "_self")
		}
	};

	const signupExCallback = result => {
		console.log("EX result", result)
		if (result === 'ok') {
			window.open("/", "_self")
			console.log('partnerLogin', partnerLogin)
		}
	};

	const signupExCallback_CheckPartner = result => {
		console.log("unified login result", result)
		if (result === 'partner') {
			window.open(PATH_PARTNERS, "_self")
		} else if (result === 'admin') {
			// Admin landing is the dashboard. Legacy PATH_HOME still routes to
			// AdminDashboard as a safety net for any surviving redirects.
			window.open(PATH_DASHBOARD, "_self")
		} else {
			setState({
				...state,
				error: {
					msg: "That email and password combination is incorrect.",
					placement: "email",
				},
				loading: false,
			});
		}
	};

	const twoFACallback = (result) => {
		if (result) {
			setCodeSent(true);
		} else {
			setCodeSent(false);
		}
	}

	const loginCallback = result => {
		// //console.log(result);
		if (result === "failed") {
			setState({
				...state,
				error: {
					msg: "That email and password combination is incorrect.",
					placement: "email",
				},
				loading: false
			});
		}
		else {
			// Admin dashboard is the canonical landing route.
			history.push(PATH_DASHBOARD);
		}
	};
	const handleSubmit = async event => {
		event.preventDefault();
		setState({
			...state,
			loading: false,
			error: {}
		});

		if (email.length === 0) {
			setState({
				...state,
				error: {
					msg: "Please enter an email",
					placement: "email",
				},
				loading: false,
			});
		} else if (!validateEmail(email)) {
			setState({
				...state,
				error: {
					msg: "Looks like you forgot something",
					placement: "email",
				},
				loading: false,
			});
		} else if (password.length === 0) {
			setState({
				...state,
				error: {
					msg: "Please enter a password",
					placement: "password",
				},
				loading: false,
			});
		} else if (password.length < 6) {
			setState({
				...state,
				error: {
					msg: "Password must be at least 6 characters long",
					placement: "password",
				},
				loading: false,
			});
		} else {
			const user = {
				email: email,
				password: password
			};
			// console.log(user, "user")
			dispatch(userActions.signIn(user, chkRememberMe, signupCallback));
		}
	};
	const handleSubmitEx = async event => {
		
		event.preventDefault();
		setState({
			...state,
			loading: false,
			error: {}
		});

		if (email.length === 0) {
			setState({
				...state,
				error: {
					msg: "Please enter an email",
					placement: "email",
				},
				loading: false,
			});
		} else if (!validateEmail(email)) {
			setState({
				...state,
				error: {
					msg: "Looks like you forgot something",
					placement: "email",
				},
				loading: false,
			});
		} else if (password.length === 0) {
			setState({
				...state,
				error: {
					msg: "Please enter a password/accountId for EXTRANET",
					placement: "password",
				},
				loading: false,
			});
		} else if (password.length < 6) {
			setState({
				...state,
				error: {
					msg: "Password/accountID must be at least 6 characters long",
					placement: "password",
				},
				loading: false,
			});
		} else if(twoFA.length === 0 && codeSent) {
			setState({
			  ...state,
			  error: {
				msg: "Please enter the 2fa code sent to your email",
				placement: "2FA CODE"
			  },
			  loading: false,
			});
		} else if(twoFA.length !== 4 && codeSent) {
			setState({
			  ...state,
			  error: {
				msg: "Please enter a valid code",
				placement: "2FA CODE"
			  },
			  loading: false,
			});
		} else {
			if(!codeSent) {
				
				const user = {
					email: email,
					password: password
				};
				// console.log(user, "user")
				dispatch(userActions.sendtwoFAcode(user, chkRememberMe, twoFACallback));
			} else {
			
				const user = {
					email: email,
					password: password,
					twoFA: twoFA
				};
				// console.log(user, "user")
				dispatch(userActions.signInEx(user, chkRememberMe, signupExCallback));
			}
			
		}
	};


	
	const handleSubmitEx_CheckPartner = async event => {
		
		event.preventDefault();
		setState({
			...state,
			loading: false,
			error: {}
		});

		if (email.length === 0) {
			setState({
				...state,
				error: {
					msg: "Please enter an email",
					placement: "email",
				},
				loading: false,
			});
		} else if (!validateEmail(email)) {
			setState({
				...state,
				error: {
					msg: "Looks like you forgot something",
					placement: "email",
				},
				loading: false,
			});
		} else if (password.length === 0) {
			setState({
				...state,
				error: {
					msg: "Please enter a password/accountId for EXTRANET",
					placement: "password",
				},
				loading: false,
			});
		} else if (password.length < 6) {
			setState({
				...state,
				error: {
					msg: "Password/accountID must be at least 6 characters long",
					placement: "password",
				},
				loading: false,
			});
		} 
		
 			else {
			
				const user = {
					email: email,
					password: password,
				};
				// console.log(user, "user")
				//dispatch(userActions.signInEx(user, chkRememberMe, signupExCallback));
				dispatch(userActions.signInUnified(user, chkRememberMe, signupExCallback_CheckPartner));
			}		

	};


	useEffect(() => {

		setQrCredentials();

		const handleResize = () => setScreenSize(window.innerWidth);
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);


	}, []);

	useEffect(() => {
		if (screenSize < 768) {
			setSmallScreen(true);
		} else {
			setSmallScreen(false);
		}
	}, [screenSize]);



	return (
		<div className="auth-split">
			<div className="auth-left">
				<div className="auth-left-logo"><img src={brandLogo} alt="Villa Tracker Extranet" /></div>
				<div className="auth-left-mid">
					<h1 className="auth-headline">Manage your villas, all in one place.</h1>
					<p className="auth-sub">The VT Extranet gives partners real-time access to bookings, availability and guest details.</p>
				</div>
				<div className="auth-left-footer">By Smiling House</div>
				<span className="auth-circle c1" />
				<span className="auth-circle c2" />
			</div>

			<div className="auth-right">
				<form className="auth-form" onSubmit={(e) => { e.preventDefault(); setState({ ...state, error: undefined }); handleSubmitEx_CheckPartner(e); }}>
					<div className="auth-eyebrow">VT Extranet</div>
					<h2 className="auth-title">Sign in to your account</h2>
					<p className="auth-desc">Enter your credentials below to continue.</p>

					{new URLSearchParams(window.location.search).get('expired') && !state?.error?.msg && (
							<div className="auth-error">Your session expired — please sign in again.</div>
						)}
						{state?.error?.msg && <div className="auth-error">{state.error.msg}
							<div className="auth-error-sub">Partner? Make sure the password is your Account ID, or <span className="auth-link" onClick={() => history.push("/forgotPassword")}>resend your access details</span>.</div>
						</div>}

					<label className="auth-label" htmlFor="auth-email">E-Mail</label>
					<input
						id="auth-email"
						className="auth-input"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail address"
						autoComplete="username"
					/>

					<div className="auth-label-row">
						<label className="auth-label" htmlFor="auth-pw">Password / Account ID</label>
						<span className="auth-link" onClick={() => history.push("/forgotPassword")}>Resend access details</span>
					</div>
					<input
						id="auth-pw"
						className="auth-input pw"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						autoComplete="current-password"
					/>
						<div className="auth-hint">Partners: your password is the Account ID from your welcome email.</div>

					{codeSent && (
						<>
							<label className="auth-label" htmlFor="auth-2fa">2FA Code</label>
							<input
								id="auth-2fa"
								className="auth-input pw"
								type="text"
								value={twoFA}
								onChange={(e) => setTwoFA(e.target.value)}
								placeholder="2FA Code"
							/>
						</>
					)}

					<label className="auth-remember">
						<input type="checkbox" checked={chkRememberMe} onChange={(e) => setChkRememberMe(e.target.checked)} />
						Remember me
					</label>

					<button type="submit" className="auth-btn" disabled={state.loading}>
						Log in to Extranet
					</button>

					<p className="auth-cta">Don't have an account yet? <span onClick={() => history.push("/signup")}>Join us</span></p>
				</form>
			</div>
		</div>
	);
}