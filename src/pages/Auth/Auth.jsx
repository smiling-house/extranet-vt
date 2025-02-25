import React, { useEffect, useState } from "react";
import { validateEmail, } from "../../Util/ValidationUtil.js";
import Logo from "../../components/Icons/Logo/Logo";
import "./Auth.css";
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

const Auth = (props) => {


	return (
		<>
			<SignIn />
		</>
	);
};
export default Auth;



export const SignIn = () => {


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
			history.push("/home");
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

	useEffect(() => {
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
	return <>
		<section>
			<div className="row">
				{/* Left Image */}
				<div className="col-md-5 d-none d-md-block">
					<img src={LeftImage} className="img-fluid" alt="Left Image" style={{ height: '178vh', objectFit: 'cover' }} />
				</div>
				{/* Right Content */}
				<div className="col-12 col-md-7" style={{ position: 'relative' }}>
					<div className="container text-center p-4">
						<div className="mt-5 mb-5 w-100 d-flex justify-content-center">
							<div style={{ width: '250px' }}>
								<Logo />
							</div>
						</div>
						<h1>EXTRANET</h1>

						<div className="row justify-content-center mt-4">
							<div className="col-8">
								<EmailInput
									onSubmit={handleSubmit}
									value={email}
									setValue={setEmail}
									label="E-Mail*"
									inputName="email"
									showLoginLink="none"
									placeholder="E-mail address"
									error={state.error}
								/>
							</div>
							<div className="col-8 mt-2">
								<PasswordInput
									onSubmit={handleSubmit}
									value={password}
									setValue={setPassword}
									label="your Guesty account ID*"
									inputName="password"
									placeholder="guesty Account ID"
									error={state?.error}
									showLoginLink="none"
								/>
							</div>
							{
								codeSent && (
									<div className="col-8 mt-2">
										<NameInput
											onSubmit={handleSubmit}
											value={twoFA}
											setValue={setTwoFA}
											label="2FA Code*"
											inputName="twoFA"
											placeholder="2FA Code"
											error={state?.error}
											showLoginLink="none"
										/>
									</div>
								)
							}
							<div className="col-8 mt-2">
								<div className="row d-flex justify-content-between align-items-center">
									<div className="col-6 mb-2">
										<Checkbox uid="chkRememberMe" label="Remember Me" checked={chkRememberMe} onChange={(value) => setChkRememberMe(value)} />
									</div>
									<div className="col-6"><h4>
										<span onClick={() => history.push("/forgotPassword")} className="text-decoration-underline text-primary cst-cursor">
											Forgot password?
										</span></h4>
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-4 d-flex justify-content-center">

							<div className="col-8">
								<button
									style={{
										height: "66px",
										borderRadius: '6px',
										fontWeight: "100",
										fontSize: "22px",
										color: "#fff",
										backgroundColor: "#165093",
									}}
									className="btn btn-primary p-3 col-12"
									fullwidth={true}
									loading={state.loading}
									text="Extranet login"
									onClick={(e) => {
										setState({ ...state, error: undefined });
										handleSubmitEx(e);
									}}
								>{codeSent?('Extranet login'):('Send 2FA Code')}</button>
							</div>
						</div>
						<div className={styles.return_to_login_wrapper}>
							<h4 className="mt-5 mb-5">Don't have an account yet?<span className="text-decoration-underline text-primary cst-cursor" onClick={() => history.push("/signup")}>Join us!</span></h4>
						</div>
					</div>
					{/* Model Footer */}
					<div className="col-12 model-footer pt-5 mb-2 cst-footer-add-css">
						<hr className="pb-3"></hr>
						<TermsFooter isMobile={smallScreen} />
					</div>
				</div>
			</div>
		</section>
	</>
}

