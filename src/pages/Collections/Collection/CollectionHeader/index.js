import React from "react";
import pets from '../../../../assets/collections/icons/pets.png';
import events from '../../../../assets/collections/icons/events.png';
import family from '../../../../assets/collections/icons/family.png';
import sustainable from '../../../../assets/collections/icons/sustainable.png';
import constants from "../../../../Util/constants";
import './CollectionHeader.scss';
import SelectedPropertiesDropdown from "../../../../components/SelectedPropertiesDropdown";
import SortByDropdown from "../../../../components/SortByDropdown";
import DestinationsDropDown from "../../../../components/DestinationsDropDownOld";

const CollectionHeader = (props,pageNumber,propertyPagingTo,propertyPagingFrom) => {
	const { type, onShowSelectedProperties } = props;

const selectDestination=destination=>{
	console.log("destination:",destination)
	localStorage.setItem("newDestination",destination);
}

	const src = (
		type === 'Event' ? events :
			type === 'Family' ? family :
				type === 'Pet Friendly' ? pets :
					sustainable
	);
	
	let totalCount = localStorage.getItem("count") ? localStorage.getItem("count") : 0;
	console.log("from", propertyPagingFrom," TO ",propertyPagingTo)
	return (
		<div className="collection-header-container row">
			<div className="collection-header-left col-4">
				<img src={src} alt="" />
				<div className="collection-header-title col-4">
					<div style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>The Global {type} Collection</div>
					<div style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>Displaying properties {propertyPagingFrom}-{propertyPagingTo} of {totalCount ? totalCount : "?"} In {localStorage.getItem("destination") ? localStorage.getItem("destination") : "?"}</div>
				</div>
			</div>
			<div style={{ margin: '0 20px' }} className="col-3">
				<SelectedPropertiesDropdown onShowSelection={onShowSelectedProperties} />
			</div>
			<div style={{ margin: '0 20px' }} className="col-4">
				<DestinationsDropDown selectDestination={selectDestination}/>
				<div className="">
					<SortByDropdown />
				</div>


			</div>
		</div>
	)
};

export default CollectionHeader;