import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pageBg from '../../assets/SigninPic.jpeg';
import PageHeader from "../../components/PageHeader";
import likeFull from '../../assets/icons/like-full.png';
import * as propertyActions from '../../store/redux/Property/actions';
import constants from "../../Util/constants";
import LoadingBox from "../../components/LoadingBox";
import SortByDropdown from "../../components/SortByDropdown";
import { useLocation } from "react-router-dom";
import Paging from "../../components/Paging";
import PropertyBox from "../SearchProperty/PropertyBox";

import './Favorites.scss';

const Favorites = props => {
	const [pageNumber, setPageNumber] = useState(0);
	const dispatch = useDispatch();
	const location = useLocation();
	const isLoading = useSelector(state => state.property.isLoading);
	const favorites = useSelector(state => state.property.favorites);
	const selectedProperties = useSelector(state => state.property.selectedProperties);
	const myparam = location.state && location.state.params;

	useEffect(() => {
		const load = async () => {
			dispatch(propertyActions.loadFavorites(pageNumber));
		};
		load();
	}, [myparam]);

	const doSearch = pageNumber => {
		//console.log("loading page ", pageNumber);
		dispatch(propertyActions.loadFavorites(pageNumber));
	};

	const propertyPagingFrom = 1 + pageNumber * constants.PAGING_PAGE_SIZE;
	const propertyPagingTo = (pageNumber + 1) * constants.PAGING_PAGE_SIZE;

	const onToggleProperty = property => {
		dispatch(propertyActions.toggleProperty(property));
	};

	const onChangePage = pageNumber => {
		setPageNumber(pageNumber);
		doSearch(pageNumber);
	};

	if (favorites == null) {
		return (
			<div className="favorites-container" style={{ backgroundImage: `url(${pageBg})`, backgroundSize: '100%' }} />
		)
	}

	return (
		<div className="favorites-container" style={{ backgroundImage: `url(${pageBg})`, backgroundSize: '100%' }}>

			<PageHeader doSearch={doSearch} searchOpen={false} />
			<div className="favorites-results" style={{ backgroundColor: '#FFF' }}>
				<div className="favorites-top-panel">
					<div>
						<div className="favorites-main-title"><img src={likeFull} style={{ width: '40px' }} alt="" /> My Favorite Properties</div>
						<div className="favorites-main-subtitle">Displaying properties {propertyPagingFrom}-{propertyPagingTo} of 1050</div>
					</div>
					<div style={{ display: 'flex', paddingTop: '10px' }}>
						<SortByDropdown />
					</div>
				</div>

				<LoadingBox visible={isLoading} />
//									
				{favorites && <Paging totalItems={favorites.count} currentPage={pageNumber} onChangePage={onChangePage} />}

				<div className="favorites-boxes row">
					{
						favorites && favorites.listings.map((property, i) => {
							const selected = selectedProperties.findIndex(p => p._id === property._id) > -1;
							return (
								<PropertyBox key={i} favorited={true} property={property} selected={selected} onToggle={() => onToggleProperty(property)} />
																	)
						})
					}
				</div>
			</div>
		</div>
	)
};

export default Favorites;