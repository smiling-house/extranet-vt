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

localStorage.setItem('extranet-vt-logged-in-role', 'admin');
			
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
	console.log("extranet partner details:", user)
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
			const partner = result.data.partners.filter((partner) => (partner.accountId === user.password) && (partner.email === user.email) && (partner.twofa === user.twoFA) )
			console.log('found?', partner ? partner : 'no')
			// test if external partners password is right?
			if (partner.length) {
				console.log('PARTNER is :', partner[0])
				localStorage.setItem("partnerLogin", partner[0].accountId);
				localStorage.setItem("partnerName", partner[0].pmName);


					
				
				const result = await userService.signIn({
					"email": "tech.smilinghouse@gmail.com",
					//"password": "VT2024",
					"password": "VT2026",
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


//Task: EXTRANET VT - Check the possibilities of adding admin login
//Task URL : https://app.asana.com/1/1200178813358971/project/1209114491925523/task/1210009551590540
//By Jaison on 2025-04-21 - START
					
//localStorage.setItem('agent_role', result.agent.role);
//localStorage.setItem('agent_status', result.agent.status);

//By Jaison on 2025-04-21 - END


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


export const signInEx_CheckPartner = (user, chkRememberMe, callback) => {
	console.log("extranet partner details:", user)
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
		
		//&source=VT
		const result = await userRequest.get(`local/partners?accountId=${user?.password}`,
			{accountId:user.password, 
				limit:200, 
				skip:0,
			},
		);
		
		console.log("partner result=", result.data);
		if (!result.data?.success) {
			callback('failed');
		}
		else {
			console.log("partner result=", result);
			console.log("result.data.partners=", result.data.partners);
			const partner = result.data.partners.filter((partner) => (partner.accountId === user.password) && (partner.email === user.email) ) //&& (partner.twofa === user.twoFA) 
			console.log('found?', partner ? partner : 'no')
			// test if external partners password is right?
			if (partner.length) {
				console.log('PARTNER is :', partner[0])
				localStorage.setItem("partnerLogin", partner[0].accountId);
				localStorage.setItem("partnerName", partner[0].pmName);

localStorage.setItem('extranet-vt-logged-in-role', 'partner');		

		const result = await userService.signIn({
			"email": "tech.smilinghouse@gmail.com",
			//"password": "VT2024",
			"password": "VT2026",
			//"twofa":"extranetVT"
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

				localStorage.removeItem('extranet-vt-logged-in-role');

				toast.error('Login Attempt Failed', {
					position: 'top-right',
					toastClassName: 'custom-toast',
				});
			}


		}
	}
};

// Unified login: a single form, admin path tried FIRST.
// 1) Try the agent/admin credential login (/agent/login) -> role 'admin'.
//    Admins log in cleanly with NO Shub call and NO 401 in the console.
// 2) Only if that fails, try the external-partner flow (password = Shub accountId) -> role 'partner'.
// Callback receives 'partner' | 'admin' | 'failed'. The partner half depends on the Shub
// token in constants.SHUB_TOKEN; while that token is rejected by the backend, partner login
// cannot succeed (returns 'failed') — admin login is unaffected.
export const signInUnified = (user, chkRememberMe, callback) => {
	return async (dispatch) => {
		log.debug("UserActions -> signInUnified -> Enter");
		if (!user || !user.email || !user.password) {
			callback('failed');
			return;
		}

		// --- Attempt 1: agent / admin credential login (silent probe, no Shub call) ---
		// signInSilent (not signIn): this probe fails for every partner login,
		// and signIn would toast the backend's "agent Email not found" at them.
		const adminResult = await userService.signInSilent(user);
		if (adminResult.ok) {
			// A leftover partner session must not survive an admin login:
			// getProfile() redirects to the partner pages whenever partnerLogin
			// is set (the old /adminlogin page cleared these on mount too).
			localStorage.removeItem("partnerLogin");
			localStorage.removeItem("partnerName");
			localStorage.setItem("agent", JSON.stringify(adminResult.agent));
			localStorage.setItem("jToken", adminResult.token);
			localStorage.setItem("id", adminResult.agent._id);
			localStorage.setItem("agent_id", adminResult.agent.agent_id);
			localStorage.setItem("agency_id", adminResult.agent.agency_id);
			localStorage.setItem('extranet-vt-logged-in-role', 'admin');
			await dispatch({
				type: actionTypes.USER_LOGGED_IN,
				data: user
			});
			toast.success(adminResult.message || 'Logged in successfully', {
				position: 'top-right',
				toastClassName: 'custom-toast',
			});
			callback('admin');
			return;
		}

		// --- Attempt 2: external partner (password treated as accountId) ---
		// Runs on ANY failed admin probe, including 401: a partner's email can
		// also exist as an agent account (e.g. internal/dual-identity emails),
		// so a wrong-agent-password response must not block the partner path.
		try {
			const shubRequest = axios.create({
				baseURL: constants.SHUB_URL,
				headers: {
					Authorization: constants.SHUB_TOKEN,
				},
			});
			const partnerRes = await shubRequest.get(`local/partners?accountId=${user.password}`,
				{ accountId: user.password, limit: 200, skip: 0 },
			);
			if (partnerRes.data?.success) {
				const matches = partnerRes.data.partners.filter(
					(partner) => (partner.accountId === user.password) && (partner.email === user.email)
				);
				if (matches.length) {
					const partner = matches[0];
					console.log('PARTNER is :', partner);
					localStorage.setItem("partnerLogin", partner.accountId);
					localStorage.setItem("partnerName", partner.pmName);
					localStorage.setItem('extranet-vt-logged-in-role', 'partner');
					// One-shot flag: the landing page shows the welcome toast, because a
					// toast fired here dies with the full-page redirect before anyone sees it.
					sessionStorage.setItem('extranet-welcome-toast', partner.pmName || '1');

					// Fire-and-forget: stamp lastExtranetLogin on the partner record.
					// Without this there is no server-side trace of WHICH partner
					// logged in (the session below uses a shared internal account).
					shubRequest.post(`local/partners/extranet-login/${partner.accountId}`)
						.catch((e) => console.log('extranet-login stamp failed', e?.message));

					const result = await userService.signInSilent({
						"email": "tech.smilinghouse@gmail.com",
						"password": "VT2026",
					});
					if (result.ok) {
						localStorage.setItem("agent", JSON.stringify(result.agent));
						localStorage.setItem("jToken", result.token);
						localStorage.setItem("id", result.agent._id);
						localStorage.setItem("agent_id", result.agent.agent_id);
						localStorage.setItem("agency_id", result.agent.agency_id);
						await dispatch({
							type: actionTypes.USER_LOGGED_IN,
							data: user
						});
						toast.success('Logged in successfully', {
							position: 'top-right',
							toastClassName: 'custom-toast',
						});
						callback('partner');
						return;
					}
					localStorage.removeItem("partnerLogin");
					localStorage.removeItem("partnerName");
					localStorage.removeItem('extranet-vt-logged-in-role');
				}
			}
		} catch (e) {
			console.log('Partner lookup failed', e);
		}

		// Both attempts failed. When the email IS a real agent (401 wrong
		// password / 200 approval-pending etc.) surface that specific error;
		// otherwise stay generic — "agent Email not found" would only confuse
		// a partner who mistyped their accountId.
		const agentError = (adminResult.status === 401 || adminResult.status === 200)
			? adminResult.message : null;
		toast.error(agentError || 'Login attempt failed', {
			position: 'top-right',
			toastClassName: 'custom-toast',
		});
		callback('failed');
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
