import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as userActions from '../../store/redux/User/actions';
import styles from "./ResetPasswordPage.module.scss";
import Button from "../../components/Buttons/Button/Button";
import Logo from "../../components/Icons/Logo/Logo";
import TermsFooter from "../../components/TermsFooter/TermsFooter";
import { useHistory } from "react-router-dom";
import PoolImg from '../../assets/bk_pool.png'
import './ResetPassword.css';
import { validateEmail } from "../../Util/ValidationUtil";
import EmailInput from "../../components/Forms/Fields/EmailInput/EmailInput";
import LeftImage from '../../assets/SigninPic.jpeg'
import AuthService from "../../services/auth.service";
import swal from "sweetalert";
const ResetPasswordPage = () => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [sent, setSent] = useState(false);
	const dispatch = useDispatch();

	const [state, setState] = useState({
		loading: false
	});
	const [smallScreen, setSmallScreen] = useState(false);
	const [screenSize, setScreenSize] = useState(null);

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
		}
		else if (!validateEmail(email)) {
			setState({
				...state,
				error: {
					msg: "Looks like you forgot something",
					placement: "email",
				},
				loading: false,
			});
		}
		else {
			// await dispatch(userActions.forgotPassword(email));
			var paylod = { "email": email }
			AuthService.ForgotPasswordApi(paylod)
				.then((response) => {
					if (response.message !== undefined) {
						swal({
							show: true,
							icon: "success",
							title: "Success",
							text: `${response.message}`,
						});
					} else if (response.code) {
						swal({
							show: true,
							icon: "success",
							title: "Success",
							text: `Please check gmail inbox`,
						});
					}
				})
				.catch((e) => {
					console.log(e);
				});
			setSent(true);
		}
	};

	return (
		<>
			<section>
				<div className="row">
					{/* Left Image */}
					<div className="col-md-5 d-none d-md-block">
						<img src={LeftImage} className="img-fluid" alt="Left Image" style={{ height: '178vh', objectFit: 'cover' }} />
					</div>
					{/* Right Content */}
					<div className="col-md-7">
						<div className="container text-center p-4">
							<div className="mt-5 mb-5 w-100 d-flex justify-content-center">
								<div style={{ width: '250px' }}>
									<Logo />
								</div>
							</div>
							<h1>Reset your password</h1>
							<h4 className={styles.instructions}>
								Enter the email address you usually log in with <br />
								and we’ll send you instructions to reset your password.
							</h4>
							<div className="row justify-content-center mt-4">
								<div className="col-7">
									{/* Email Input */}
									<EmailInput
										onSubmit={handleSubmit}
										value={email}
										setValue={setEmail}
										label="E-Mail*"
										inputName="email"
										showLoginLink="none"
										error={state.error}
										placeholder={"E-mail address"}
									/>
								</div>
							</div>
							<div className="row mt-4 justify-content-center">
								<div className="col-7">
									{/* Reset Password Button */}
									<Button
										fullwidth={true}
										variant="primary"
										loading={state.loading}
										text="Reset password"
										onClick={(e) => {
											setState({ ...state, error: undefined });
											handleSubmit(e);
										}}
									/>
								</div>
							</div>
							<div className={styles.return_to_login_wrapper}>
								{/* Return to Sign In */}
								<h5 className="mt-5">Return to <span className="link" onClick={() => history.push("/login")}>Sign in</span></h5>
							</div>
							<h5 className="mt-5 mb-5" >Please contact us if you have any trouble resetting your password.</h5>

						</div>
						<div className="col-md-7 col-12 model-footer pt-5 mb-2 cst-footer-add-css">
							<hr className="pb-3"></hr>
							<TermsFooter isMobile={smallScreen} />
						</div>

					</div>
				</div>
			</section>
		</>
	);
};

export default ResetPasswordPage;
