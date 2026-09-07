import axios from 'axios';
import constants from "../../../Util/constants";
import { ShubAuth } from "../../../core";
//import default_res from '../../../Util/guesty_listing_defualt_res.json';
const log = require("loglevel").getLogger("PropertyService");
log.setLevel("debug");

export const loadProperties = async (pageNumber,token) => {
	log.debug("PropertyService -> loadProperties -> Enter");

	const token2 = ShubAuth;

	const reqInstance = axios.create({
		headers: {
			Authorization: `Bearer ${token2}`
		}
	});
	const tagsS = localStorage.getItem("tags") ? localStorage.getItem("tags") : "";
	//console.log("tags", tagsS);
	const adults=localStorage.getItem("adults")?localStorage.getItem("adults"):0;
	const children=localStorage.getItem("children")?localStorage.getItem("children"):0;
	const Bathrooms=localStorage.getItem("Bathrooms")?localStorage.getItem("Bathrooms"):0;
	const bedrooms=localStorage.getItem("bedrooms")?localStorage.getItem("bedrooms"):0;
	const dateFrom=localStorage.getItem("dateFrom")?localStorage.getItem("dateFrom"):0;
	const dateTo=localStorage.getItem("dateTo")?localStorage.getItem("dateTo"):0;
	if (dateFrom&&dateTo) {const available = '{' + '/"checkIn/":/"' + dateFrom + '/",/"checkOut/":' +dateTo + '/",/"minOccupancy/":' + adults +children + '}';
	console.log("available:", available);}

	const params = {
		q: localStorage.getItem("destination"),
		limit: constants.PAGING_PAGE_SIZE,
		skip: pageNumber * constants.PAGING_PAGE_SIZE,
		available:available
	};
	console.log("params:", params);
	const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
	const guestySearch='https://api.villatracker.com/services/guesty/openapi/listings?';
	const shubSearch='https://api.villatracker.com/local/listings?';
	return reqInstance.get(`${shubSearch}${queryString}`)
		.then(async response => {
			const res = response.data;
			console.log("PropertyService -> loadProperties -> response: ", res);
			if (res.count) {
				//console.log("count:", res.count);
				{ localStorage.setItem("count", res.count); }
			}
			return res;
		})
		.catch(response => {
			log.debug("PropertyService -> loadProperties -> error: ");
			log.debug(response);
			return response;
		})
	// localStorage.setItem("count", default_res.count);
	// return default_res;
};

export const loadFavorites = async (favorites,token) => {
	log.debug("PropertyService -> loadFavorites -> Enter");

	if (!favorites) {return "no favorites"} 

	else {
		console.log("fav=",favorites);
	const token2 = ShubAuth;

	const reqInstance = axios.create({
		headers: {
			Authorization: `Bearer ${token2}`
		}
	});

	const queryString = Object.keys(favorites).map(key => favorites[key]).join(' ');
	const guestySearch='https://api.villatracker.com/services/guesty/openapi/listings?ids=';
	const shubSearch='https://api.villatracker.com/local/listings?ids=';
	console.log("API FAVORITES REQUEST=",`${shubSearch}"${queryString}"`);
	return reqInstance.get(`${shubSearch}"${queryString}"`)
		.then(async response => {
			const res = response.data;
			console.log("PropertyService -> loadFavorites -> response: ", res);
			if (res.count) {
				//console.log("count:", res.count);
				{ localStorage.setItem("count", res.count); }
			}
			return res;
		})
		.catch(response => {
			log.debug("PropertyService -> loadFavorites -> error: ");
			log.debug(response);
			return response;
		})
	}

};
