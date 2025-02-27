import * as actionTypes from './actionTypes';
import * as userService from './service'
import axios from 'axios';
import constants from '../../../Util/constants';
import { toast } from 'react-toastify';
const log = require("loglevel").getLogger("UserActions");
log.setLevel("debug");

export const signIn = (user, chkRememberMe, callback) => {
	console.log("user details:", user)
	return async (dispatch) => {
		log.debug("UserActions -> signIn -> Enter");
		// check if login is of a PM: email,bearerToken
		const result = await userService.signIn(user);
		if (result == null) {
			callback('failed');
		}
		else {
			console.log("result=", result);
			localStorage.setItem("agent", JSON.stringify(result.agent));
			localStorage.setItem("jToken", result.token);
			//props.setToken(result.data.token);
			localStorage.setItem("id", result.agent._id);
			localStorage.setItem("agent_id", result.agent.agent_id);
			localStorage.setItem("agency_id", result.agent.agency_id);
			//props.setUser(result.data.agent);
			if (chkRememberMe) {
				localStorage.setItem("agent", JSON.stringify(result.agent));
			}

			await dispatch({
				type: actionTypes.USER_LOGGED_IN,
				data: user
			});
			callback('ok');
		}
	}
};

export const sendtwoFAcode = (user, chkRememberMe, callback) => {
	console.log("externat partner details for 2FA:", user)
	return async (dispatch) => {
		log.debug("UserActions -> signInPartners -> Enter");

		const result = await userService.sendtwoFAcode(user);
		console.log(result)
		if(!result.success) {
			callback(false);
		} else {
			callback(true);
		}

		// const userRequest = axios.create({
		// 	baseURL: constants.SHUB_URL,
		// 	headers: {
		// 		Authorization: constants.SHUB_TOKEN,
		// 	},
		// });
		// const result = await userRequest.post(`local/partners/twofa`,
		// 	{ email:user.email, accountId:user.password },
		// );
		// console.log("partner result=", result.data);
		// if (!result.data?.success) {
		// 	callback('failed');
		// }
		// else {
		// 	console.log("partner result=", result);
		// 	const partner = result.data.partners.filter((partner) => (partner.accountId === user.password) && (partner.email === user.email))
		// 	console.log('found?', partner ? 'yes' : 'no')
		// 	// test if external partners password is right?
		// 	if (partner) {
		// 		console.log('PARTNER is :', partner[0])
		// 		localStorage.setItem("partnerLogin", partner[0].accountId);
		// 		localStorage.setItem("partnerName", partner[0].pmName);
		// 		const result = await userService.signIn({
		// 			"email": "tech.smilinghouse@gmail.com",
		// 			"password": "VT2024"
		// 		})
		// 		if (result == null) {
		// 			callback('failed');
		// 		}
		// 		else {
		// 			console.log("result=", result);
		// 			localStorage.setItem("agent", JSON.stringify(result.agent));
		// 			localStorage.setItem("jToken", result.token);
		// 			//props.setToken(result.data.token);
		// 			localStorage.setItem("id", result.agent._id);
		// 			localStorage.setItem("agent_id", result.agent.agent_id);
		// 			localStorage.setItem("agency_id", result.agent.agency_id);
		// 			//props.setUser(result.data.agent);
		// 			if (chkRememberMe) {
		// 				localStorage.setItem("agent", JSON.stringify(result.agent));
		// 			}

		// 			await dispatch({
		// 				type: actionTypes.USER_LOGGED_IN,
		// 				data: user
		// 			});
		// 			callback('ok');
		// 		}
		// 	} else {
		// 		localStorage.removeItem("partnerLogin");
		// 		localStorage.removeItem("partnerName");
		// 	}


		// }
	}
};

export const signInEx = (user, chkRememberMe, callback) => {
	console.log("externat partner details:", user)
	if (!user) {callback('failed');}
	if (!user.password||!user.email||!user.twoFA)
	{callback('failed');}
	return async (dispatch) => {
		log.debug("UserActions -> signInPartners -> Enter");
		const userRequest = axios.create({
			baseURL: constants.SHUB_URL,
			headers: {
				Authorization: constants.SHUB_TOKEN,
			},
		});
		
		const result = await userRequest.get(`local/partners?accountId=${user?.password}`,
			{accountId:user.password, 
				limit:200, 
				skip:0},
		);
		console.log("partner result=", result.data);
		if (!result.data?.success) {
			callback('failed');
		}
		else {
			console.log("partner result=", result);
			const partner = result.data.partners.filter((partner) => (partner.accountId === user.password) && (partner.email === user.email) && (partner.twofa === user.twoFA))
			console.log('found?', partner ? partner : 'no')
			// test if external partners password is right?
			if (partner.length) {
				console.log('PARTNER is :', partner[0])
				localStorage.setItem("partnerLogin", partner[0].accountId);
				localStorage.setItem("partnerName", partner[0].pmName);
				const result = await userService.signIn({
					"email": "tech.smilinghouse@gmail.com",
					"password": "VT2024",
					"twofa":"extranetVT"
				})
				if (result == null) {
					callback('failed');
				}
				else {
					console.log("result=", result);
					localStorage.setItem("agent", JSON.stringify(result.agent));
					localStorage.setItem("jToken", result.token);
					//props.setToken(result.data.token);
					localStorage.setItem("id", result.agent._id);
					localStorage.setItem("agent_id", result.agent.agent_id);
					localStorage.setItem("agency_id", result.agent.agency_id);
					//props.setUser(result.data.agent);
					if (chkRememberMe) {
						localStorage.setItem("agent", JSON.stringify(result.agent));
					}

					await dispatch({
						type: actionTypes.USER_LOGGED_IN,
						data: user
					});
					toast.success('Logged in successfully', {
						position: 'top-right',
						toastClassName: 'custom-toast',
					});
					callback('ok');
				}
			} else {
				localStorage.removeItem("partnerLogin");
				localStorage.removeItem("partnerName");
				toast.error('Login Attempt Failed', {
					position: 'top-right',
					toastClassName: 'custom-toast',
				});
			}


		}
	}
};

export const signUp = (agent, callback) => {
	return async (dispatch) => {
		log.debug("UserActions -> signUp -> Enter");

		const result = await userService.signUp(agent);
		if (result == null) {
			callback('failed');
		}
		else {
			callback('ok');
		}
	}
};

export const setLoggedInUser = user => {
	return {
		type: actionTypes.USER_LOGGED_IN,
		data: user
	}
};

export const forgotPassword = email => {
	return async (dispatch) => {
		log.debug("UserActions -> forgotPassword -> Enter");
		await userService.forgotPassword(email);
	}
};


export const signOut = () => {
	return async (dispatch) => {
		log.debug("UserActions -> signOut -> Enter");

		localStorage.removeItem("agent");
		localStorage.removeItem("travelAgency");
		localStorage.removeItem("agent_id");
		await dispatch({
			type: actionTypes.USER_LOGGED_OUT
		});
	}
};
