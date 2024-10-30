import React from "react";
import Logo from "../../components/Icons/Logo/Logo";
import TermsFooter from "../../components/TermsFooter/TermsFooter";
import { useHistory } from "react-router-dom";
import LeftImage from '../../assets/SigninPic.jpeg'
import styles from "../Auth/Auth.module.scss";
import bottomLogos from '../../assets/desktop/welcome/welcome-bottom-logos.png';

import './SignupThanks.css';
import { useState } from "react";
import { useEffect } from "react";

const SignupThanks = () => {
	const history = useHistory();
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
	return (
		<>
			{/* // <div className="thanks-container">
		// 	<div className="thanks-pic-left" />
		// 	<div className="thanks-main">

		// 		<div className="thanks-box-parent">
		// 			<div className="thanks-box-child">

		// 				<div>
		// 					<div className="w-100 d-flex justify-content-center">
		// 						<div style={{width: '200px'}}>
		// 							<Logo />
		// 						</div>
		// 					</div>
		// 					<div className="thanks-titles">
		// 						<div className="thanks-title1">Thank You!</div>
		// 						<div className="thanks-title2">Your request has been sent.</div>
		// 						<div className="thanks-title3">
		// 						We’ve received your details and will begin our reviewing process.<br/>
		// 						Please expect an email from us shortly after this is done.
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>

		// 			<div style={{padding: '100px 0'}}>
		// 				<img src={bottomLogos} alt="" />
		// 			</div>
		// 		</div>

		// 		<div className="auth-footer">
		// 			<TermsFooter />
		// 		</div>
		// 	</div>
		// </div> */}
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
							<h1 className="mt-5">Thank You!</h1>

							<h1 className="mb-4">Your request has been sent.</h1>

							<h4 className={`${styles.instructions} mt-5 mb-5`}>
								We’ve received your details and will begin our reviewing process.
								Please expect an email from us shortly after this is done.
							</h4>

							<div className="mt-5">
								<img src={bottomLogos} alt="bottomLogos" className="img-fluid mt-5" />
							</div>
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

export default SignupThanks;
