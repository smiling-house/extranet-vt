import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
//import whiteLogo from '../../assets/smiling-house-logo-white.png';
import headerSearch from '../../assets/icons/header-search.png';
import favorite from '../../assets/icons/favorite.png';
import {
	PATH_COLLECTIONS,
	PATH_FAVORITES,
	PATH_HOT_DESTINATIONS,
	PATH_LOGIN,
	PATH_WISH_LIST
} from "../../Util/constants";
import * as userActions from "../../store/redux/User/actions";
import AuthService from "../../services/auth.service";

import './PageHeaderTopRow.scss';

const PageHeaderTopRow = props => {
	const { style, onToggleSearch, bgColor } = props;
	const dispatch = useDispatch();
	const history = useHistory();
	const screenSize = localStorage.getItem("screenSize");
	const [setLogo, setsetLogo] = useState([])
	const signOut = () => {
		localStorage.clear();

		dispatch(userActions.signOut());
		history.push(PATH_LOGIN);

	};

	const innerStyle = style || {
		backgroundColor: bgColor || 'transparent'
	};
	const agent = JSON.parse(localStorage.getItem("agent"));
	const agency = JSON.parse(localStorage.getItem("travelAgency"));
	const user_image = agency?.userImage;

	useEffect(() => {
		AuthService.GetProfile(agent?.agent_id).then((response) => {
			setsetLogo(response.agent)			 
		 
		}).catch((e) => {
			console.log(e)
		})
	}, [])

	return (
		<div className="search-header-top-row row-sm-7" style={innerStyle}>
			<div className="search-header-top-row-logo-container">
				<span onClick={signOut}> Hello, {`${agent?.firstName} ${agent?.lastName} ${agency?.agencyName === null ? "" : "(" + agency?.agencyName + ")"}`}
				</span>
				
			</div>
			{(screenSize > 1000) ? (
				<div className="search-header-top-row-buttons">
					<span className="search-header-top-row-button-separator">|</span>
					<span className="search-header-top-row-button colpage-header-top-row2-button mb-2" onClick={signOut}>Sign Out</span>
				</div>
			) : ('')}
		</div>
	)
};

export default PageHeaderTopRow;