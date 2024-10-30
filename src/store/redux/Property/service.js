import axios from 'axios';
import constants from "../../../Util/constants";
//import default_res from '../../../Util/guesty_listing_defualt_res.json';
const log = require("loglevel").getLogger("PropertyService");
log.setLevel("debug");

export const addPartnerShub = async (accountId,channels,agent) => {
	log.debug("PropertyService -> addPartnerShub -> Enter");

	const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g';


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

	const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g';

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
	const guestySearch='https://api.triangle.luxury/services/guesty/openapi/listings?';
	const shubSearch='https://api.triangle.luxury/local/listings?';
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

	const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g';

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
	const guestySearch='https://api.triangle.luxury/services/guesty/openapi/listings?';
	const shubSearch='https://api.triangle.luxury/local/listings?';
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

	const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g';

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
		const guestySearch='https://api.triangle.luxury/services/guesty/openapi/listings?';
		const shubSearch='https://api.triangle.luxury/local/listings?';
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

