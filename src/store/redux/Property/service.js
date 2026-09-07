import axios from 'axios';
import constants from "../../../Util/constants";
import { ShubAuth } from "../../../core";
//import default_res from '../../../Util/guesty_listing_defualt_res.json';
const log = require("loglevel").getLogger("PropertyService");
log.setLevel("debug");

export const addPartnerShub = async (accountId,channels,agent) => {
	log.debug("PropertyService -> addPartnerShub -> Enter");

	const token2 = ShubAuth;


	const reqInstance = axios.create({
		headers: {
			Authorization: `Bearer ${token2}`,
			'Account-Id': accountId,
			channels: channels,
			agent: agent
		}
	});

	const queryString = '/services/guesty/channel/listings';
	return reqInstance.get(`${constants.SHUB_URL}${queryString}`)
		.then(async response => {
			const res = response.data;
			console.log("PropertyService -> addPartnerShub ->local Shub response: ", res);
			console.log(res.listings[0].listing);
			if (res.count) {
				console.log("count:", res.count);
				//{ localStorage.setItem("count", res.count); }
			}
			return res;
		})
		.catch(response => {
			log.debug("PropertyService -> addPartnerShub -> error: ");
			log.debug(response);
			return response;
		})
}

export const loadProperty = async (propertyId) => {
	log.debug("PropertyService -> loadProperty -> Enter");

	const token2 = ShubAuth;

	const reqInstance = axios.create({
		headers: {
			Authorization: `Bearer ${token2}`
		}
	});
	
	const filter_ids='[{"field":"ids", "operator":"$in", "value": ["'+propertyId+'"]}]';

	const params = {
		filters:  filter_ids,
		limit: 1,
		skip: 0,
		
	};
	// q: localStorage.getItem("destination"),
	//available:available,
	const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
	const guestySearch='https://api.villatracker.com/services/guesty/openapi/listings?';
	const shubSearch='https://api.villatracker.com/local/listings?';
	return reqInstance.get(`${shubSearch}${queryString}`)
		.then(async response => {
			const res = response.data;
			console.log("PropertyService -> loadProperty ->local Shub response: ", res);
			console.log(res.listings[0].listing);
			if (res.count) {
				console.log("count:", res.count);
				localStorage.setItem("count", res.count); 
			}
			return res;
		})
		.catch(response => {
			log.debug("PropertyService -> loadProperty -> error: ");
			log.debug(response);
			return response;
		})
	// localStorage.setItem("count", default_res.count);
	// return default_res;
};

export const loadProperties = async (pageNumber,token) => {
	log.debug("PropertyService -> loadProperties -> Enter");

	const token2 = ShubAuth;

	const reqInstance = axios.create({
		headers: {
			Authorization: `Bearer ${token2}`
		}
	});
	const destination=localStorage.getItem("destination")?localStorage.getItem("destination"):"";
	let tags = localStorage.getItem("tags") ? localStorage.getItem("tags") : "";
	let Atags=tags.split(',');
	let Btags='"'+Atags.join('","')+'"';
	console.log('Btags=',Btags);
	const filter_ids=(Btags!='""')?
	'[{"field":"tags", "operator":"$in", "value": ['+Btags+']}]':"";
	console.log("filter_ids=", filter_ids);
	const adults=parseInt(localStorage.getItem("adults")?localStorage.getItem("adults"):0);
	const children=parseInt(localStorage.getItem("children")?localStorage.getItem("children"):0);
	const Bathrooms=parseInt(localStorage.getItem("Bathrooms")?localStorage.getItem("Bathrooms"):0);
	const bedrooms=parseInt(localStorage.getItem("bedrooms")?localStorage.getItem("bedrooms"):0);
	const dateFrom=localStorage.getItem("dateFrom")?localStorage.getItem("dateFrom"):0;
	const dateTo=localStorage.getItem("dateTo")?localStorage.getItem("dateTo"):0;
	const guests=parseInt(adults+children)?parseInt(adults+children):1;
	
	const available = (dateFrom&&dateTo)?
	'{' + '"checkIn":"' + dateFrom + '","checkOut":"' +dateTo + '","minOccupancy":' + guests + '}':'';
	//console.log("available:", available);

	const params = {
		q:destination,
		limit: constants.PAGING_PAGE_SIZE,
		skip: pageNumber * constants.PAGING_PAGE_SIZE,
		
	};
	if (filter_ids!='') {params.filters=filter_ids}
	//if (available!='') {params.available=available}
console.log("params:",params)
	// q: localStorage.getItem("destination"),
	//available:available,
	const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
	const guestySearch='https://api.villatracker.com/services/guesty/openapi/listings?';
	const shubSearch='https://api.villatracker.com/local/listings?';
	return reqInstance.get(`${shubSearch}${queryString}`)
		.then(async response => {
			const res = response.data;
			console.log("PropertyService -> loadProperties ->local Shub response: ", res);
			console.log(res.listings[0].listing);
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

export const loadFavorites = async (pageNumber,token) => {
	log.debug("PropertyService -> loadFavorites -> Enter");
	const TOKEN = localStorage.getItem("jToken");

	const userRequest = axios.create({
		baseURL: constants.BASE_URL,
		headers: {
			token: `Bearer ${TOKEN}`,
		},
	});

	const token2 = ShubAuth;

	const reqInstance = axios.create({
		headers: {
			Authorization: `Bearer ${token2}`
		}
	});

	const readFavorites = async () => {
		const agentID = localStorage.getItem("agent_id");
		return userRequest.get(`/favorite/get-favorites?agent_id=${agentID}`)
		.then(async response => {
			const res = response.data;
			//console.log("PropertyService -> loadProperties -> response: ", res);
			if (res.totalFavorites) {
				//console.log("count:", res.count);
				{ localStorage.setItem("count", res.totalFavorites); }
			}
			
		const favorites=res.favorites[0].favorites;
		const favoritesCSV= Object.keys(favorites).map(key => favorites[key]).join('", "');
		console.log(favoritesCSV,"=favorites");
		const filter_ids='[{"field":"ids", "operator":"$in", "value": ["'+favoritesCSV+'"]}]';
		const params = {
			filters:  filter_ids,
			limit: constants.PAGING_PAGE_SIZE,
			skip: pageNumber * constants.PAGING_PAGE_SIZE,
		};
	
		const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		const guestySearch='https://api.villatracker.com/services/guesty/openapi/listings?';
		const shubSearch='https://api.villatracker.com/local/listings?';
		return reqInstance.get(`${shubSearch}${queryString}`)
			.then(async response => {
				const res = response.data;
				//console.log("PropertyService -> loadProperties -> response: ", res);
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
		})
		.catch(response => {
			log.debug("PropertyService -> loadFavorites -> error: ");
			log.debug(response);
			return response;
		})

	}
	
	let favorites=readFavorites(); // reads the favorites of the agent from backend
	return favorites;
	
	// localStorage.setItem("count", default_res.count);
	// return default_res;
};

