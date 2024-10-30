import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../components/Icons/Logo/Logo";
import bottomLogos from '../../assets/desktop/welcome/welcome-bottom-logos.png';

import './Welcome.scss'
import Button from "../../components/Buttons/Button/Button";

const Welcome = props => {
	const history = useHistory();


	return (
		<section className="welcome-bg">

			<div className="text-center welcome-middle-bg pt-5 mb-5">
				<div   style={{   display: 'flex', zoom: '100%' }}>
					<Logo />
				</div>
				<div className="welcome-middle container mt-5">
					<div style={{ fontSize: '45px' }}>Hello, Travel Professionals!</div>
					<h4 style={{ padding: '20px 0 50px 0',  fontWeight: 500, textAlign: 'center' }}>
						You’re invited to explore thousands of<br />
						vacation rentals across the world’s most<br />
						desirable destinations.
					</h4>
					<div className="col-sm-8 col-12">
						<button className="btn btn-primary col-12" style={{ "background-color": "#0f4c90", "font-size": "26px","borderColor":"#0f4c90" }} onClick={() => history.push("/login")}>Sign in</button>

					</div>
				</div>
				<img src={bottomLogos} alt="" />
			</div>

		</section>
	)
};

export default Welcome;