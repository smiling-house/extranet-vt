import axios from 'axios';
import constants from "../../../Util/constants";
import { toast } from 'react-toastify';

const log = require("loglevel").getLogger("UserService");
log.setLevel("debug");

axios.interceptors.request.use(request => {
	// log.info('Starting Request', request.url);
	return request;
});

axios.interceptors.response.use(response => {
	// //console.log('Response:', response)
	return response;
});

export const signIn = async user => {
console.log("UserService -> signIn -> Enter");

	return axios.post(`${constants.BASE_URL}/agent/login`, user)
		.then(async response => {
			const res = response.data;
			// log.debug("UserService -> signIn -> response: " + res);
			toast.success(res.message, {
				position: 'top-right',
				toastClassName: 'custom-toast',
			});
			return res;
		})
		.catch(response => {
			// log.debug("userService -> signIn -> error: ");
			log.debug(response);
			 
			toast.error(response.response.data.message, {
				position: 'top-right',
				toastClassName: 'custom-toast',
			});
	return null;
})
};

export const signInEx = async user => {
	log.debug("UserService -> signInEx -> Enter");

	return axios.post(`${constants.SHUB_URL}/external-partners/login`, user)
		.then(async response => {
			const res = response.data;
			// log.debug("UserService -> signIn -> response: " + res);
			toast.success(res.message, {
				position: 'top-right',
				toastClassName: 'custom-toast',
			});
			return res;
		})
		.catch(response => {
			// log.debug("userService -> signIn -> error: ");
			log.debug(response);
			 
			toast.error(response.response.data.message, {
				position: 'top-right',
				toastClassName: 'custom-toast',
			});
	return null;
})
};

export const sendtwoFAcode = async user => {
	log.debug("UserService -> twofa -> Enter");

	return axios.post(`${constants.SHUB_URL}/local/partners/twofa`, user)
		.then(async response => {
			const res = response.data;
			// log.debug("UserService -> signIn -> response: " + res);
			if(res.success) {
				toast.success(res.message, {
					position: 'top-right',
					toastClassName: 'custom-toast',
				});
				
			} else {
				toast.error(res.message, {
					position: 'top-right',
					toastClassName: 'custom-toast',
				});
			}
			return res;
			
		})
		.catch(response => {
			// log.debug("userService -> signIn -> error: ");
			log.debug(response);
			 
			toast.error(response.response.data.message, {
				position: 'top-right',
				toastClassName: 'custom-toast',
			});
	return null;
})
};

export const signUp = async user => {
	log.debug("UserService -> signUp -> Enter");

	return axios.post(`${constants.BASE_URL}/agent/signup`, user)
		.then(async response => {
			const res = response.data;
			log.debug("UserService -> signUp -> response: " + res.data?.user);
			return res;
		})
		.catch(response => {
			log.debug("userService -> signUp -> error: ");
			log.debug(response);
			return null;
		})
};

export const forgotPassword = async email => {
 
	return axios.post(`${constants.BASE_URL}/agent/forget-password`, { email })
		.then(async response => {
			const res = response.data;
			console.log(response,"mayur")
		 
 			return res;
		})
		.catch(response => {
			log.debug(response);
			return null;
		})
};

export const signOut = () => {
	try {
	}
	catch (e) { }
};

