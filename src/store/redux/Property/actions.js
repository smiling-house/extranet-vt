import * as actionTypes from './actionTypes';
import * as propertyService from './service';

const log = require("loglevel").getLogger("PropertyActions");
log.setLevel("debug");


export const addPartnerShub = (data) => {
	return async (dispatch) => {
		log.debug("PropertyActions -> addPartnerShub-> Enter");

		await dispatch ({
			type: actionTypes.ADDING_PARTNER,
			data: true
		});

		const listings = await propertyService.addPartnerShub(data);

		await dispatch ({
			type: actionTypes.PARTNER_ADDED,
			data: listings
		});
	}
};
export const loadProperty = (propertyId) => {
	return async (dispatch) => {
		log.debug("PropertyActions -> loadProperty-> Enter");

		await dispatch ({
			type: actionTypes.LOADING_PROPERTY,
			data: true
		});

		const properties = await propertyService.loadProperty(propertyId);

		await dispatch ({
			type: actionTypes.PROPERTY_LOADED,
			data: properties
		});
	}
};

export const loadProperties = (pageNumber) => {
	return async (dispatch) => {
		log.debug("PropertyActions -> loadProperties -> Enter");

		await dispatch ({
			type: actionTypes.LOADING_PROPERTIES,
			data: true
		});

		const properties = await propertyService.loadProperties(pageNumber);

		await dispatch ({
			type: actionTypes.PROPERTIES_LOADED,
			data: properties
		});
	}
};

export const loadFavorites = (pageNumber) => {
	return async (dispatch) => {
		log.debug("PropertyActions -> loadFavorites -> Enter");

		await dispatch ({
			type: actionTypes.LOADING_FAVORITES,
			data: true
		});

		const favorites = await propertyService.loadFavorites(pageNumber);

		await dispatch ({
			type: actionTypes.FAVORITES_LOADED,
			data: favorites
		});
	}
};

export const toggleProperty = property => {
	return {
		type: actionTypes.TOGGLE_SELECTED_PROPERTY,
		data: property.listing
	};
};

export const clearProperties = () => {
	return {
		type: actionTypes.CLEAR_PROPERTIES
	};
};
