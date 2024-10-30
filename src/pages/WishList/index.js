import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePickerArrival from "../../components/Forms/Fields/DatePickerArrival/DatePickerArrival";
import DatePickerDeparture from "../../components/Forms/Fields/DatePickerDeparture/DatePickerDeparture";
import pageBg from '../../assets/SigninPic.jpeg';
import notesIcon from '../../assets/notes.png';
import pagingLine from '../../assets/icons/paging-line.png';
import searchLogo from '../../assets/icons/search.png';
import Button from "../../components/Buttons/Button/Button";
import PageHeader from "../../components/PageHeader";
import * as propertyActions from '../../store/redux/Property/actions';
import constants from "../../Util/constants";
import LoadingBox from "../../components/LoadingBox";
import Datatable from "../../components/Datatable";
import { data } from "./data";

import './WishList.scss';
import Row from "../../components/Row";
import AuthService from "../../services/auth.service";
import moment from "moment/moment";
import { Height } from "@mui/icons-material";
import { BsChevronDown } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";

const WishList = props => {
	const [pageNumber, setPageNumber] = useState(0);
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.property.isLoading);
	const wishListItems = useSelector(state => state.property.wishListItems);
	const [showData, setData] = useState([])
	const doSearch = pageNumber => {
		//console.log("loading page ", pageNumber);
		dispatch(propertyActions.loadProperties(pageNumber));
	};

	const onPrevPage = () => {
		const pn = pageNumber - 1;
		setPageNumber(pn);
		doSearch(pn);
	};

	const onNextPage = () => {
		const pn = pageNumber + 1;
		setPageNumber(pn);
		doSearch(pn);
	};

	const onGotoPage = page => {
		setPageNumber(page);
		doSearch(page);
	};

	const generatePaginationLinks = (currentPage, totalPages) => {
		let links = [];

		// Link to previous page
		if (currentPage > 1) {
			links.push(<div key={-1} className="wishlist-paging-prev-next" onClick={onPrevPage}>Prev</div>);
		}

		// Link to previous page
		if (currentPage > 3) {
			links.push(<div key={-2} className="wishlist-paging-prev-next" onClick={() => onGotoPage(0)}>1</div>);
			links.push(<div key={-3}>. . .</div>);
		}

		// Links to plus/minus 3 pages from current page
		for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
			if (i === currentPage) {
				links.push(<div key={i} className="wishlist-paging-number-selected">{i}</div>);
			} else {
				links.push(<div key={i} className="wishlist-paging-number" onClick={() => onGotoPage(i - 1)}>{i}</div>);
			}
		}

		// Link to next page
		if (currentPage < totalPages) {
			links.push(<div key={-4} className="wishlist-paging-prev-next" onClick={onNextPage}>Next</div>)
		}

		return links;
	};

	const renderPaging = () => {
		const pageSize = constants.PAGING_PAGE_SIZE;
		const pageCount = Math.ceil(wishListItems.count / pageSize);

		const paginationLinks = generatePaginationLinks(pageNumber + 1, pageCount);

		if (paginationLinks.length < 1) {
			return (
				<div className="pt-4 pb-2 px-4">
					<h1>Wish List Request Log</h1>
				</div>
			)
		}

		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div className="wishlist-main-title">Wish List Request Log</div>
				<div className="wishlist-paging">
					<img src={pagingLine} alt="" style={{ marginRight: '15px' }} />
					{paginationLinks}
				</div>
			</div>
		)
	};


	const columns = [
		{
			id: 'requestDate',
			name: 'Request Date',
			selector: row => row.requestDate,
			cell: row => row.requestDate,
			width: '1fr'
		}, {
			id: 'destination',
			name: 'Destination',
			sortable: true,
			selector: row => row.destination,
			cell: row => <div>{row.destination}</div>,
			width: '1fr'
		}, {
			id: 'clientName',
			name: 'Client Name',
			sortable: true,
			selector: row => row.clientName,
			cell: row => <div className="link18" onClick={() => { }}>{row.clientName}</div>,
			width: '1fr'
		}, {
			id: 'arrive',
			name: 'Arrive',
			sortable: true,
			selector: row => row.arrive,
			cell: row => row.arrive,
			cellStyle: { display: 'block', padding: '10px 0px' },
			width: '1fr'
		}, {
			id: 'depart',
			name: 'Depart',
			sortable: true,
			selector: row => row.depart,
			cell: row => row.depart,
			cellStyle: { display: 'block', padding: '10px 0px' },
			width: '1fr'
		}, {
			id: 'guests',
			name: 'Guests',
			sortable: true,
			selector: row => row.guests,
			cell: row => <div>{row.guests}</div>,
			width: '1fr'
		}, {
			id: 'bedrooms',
			name: 'Bed Rooms',
			sortable: true,
			selector: row => row.bedrooms,
			cell: row => <div>{row.bedrooms}</div>,
			width: '1fr'
		}, {
			id: 'priceRange',
			name: 'Price Range',
			sortable: true,
			selector: row => row.priceRange,
			cell: row => <div>{row.priceRange}</div>,
			width: '1fr'
		}, {
			id: 'offer',
			name: 'Villa tracker Offer',
			headerStyle: { color: '#1B9C5D' },
			sortable: true,
			selector: row => row.offer,
			cell: row => <Row>
				<div >{row.offer} &nbsp;</div>
				<img src={notesIcon} alt="" style={{ cursor: 'pointer' }} />
			</Row>,
			width: '1fr'
		}
	];

	useEffect(() => {
		AuthService.GetWishListLog().then((response) => {
			setData(response.wishlists)
		}).catch((e) => {
			console.log(e)
		})
	}, [])

	return (
		<div className="wishlists-container" style={{ backgroundImage: `url(${pageBg})`, backgroundSize: '100%' }}>
			<PageHeader />
			<div className="wishlist-top-row row mt-2 pb-4 px-3">
				<div className="col-sm-2 mb-2">
					<input type="text" className="wislist-search-input form-control" placeholder="Enter reservation ID" />
				</div>
				<div className="wishlist-top-row2-button col-sm-2  mb-2">
					<DatePickerArrival />
				</div>
				<div className="wishlist-top-row2-button col-sm-2  mb-2">
					<DatePickerDeparture />
				</div>
				<div className="wishlist-top-row2-button col-sm-2  mb-2">
					<Button
						onClick={() => doSearch(0)}
						style={{ height: '60px', fontSize: '20px' }}
						icon={<img src={searchLogo} style={{ width: '22px', marginRight: '5px' }} alt="" />}
						fullwidth={true}
						variant="green"
						text="Search"
					/>
				</div>
			</div>

			{
				wishListItems != null && wishListItems.length === 0 ?
					<div className="wishlist-results" style={{ backgroundColor: '#FFF' }}>
						<LoadingBox visible={isLoading} />

						{wishListItems && renderPaging()}

						{/* <div className="table-responsive px-4">
							<Datatable
							leftPad='50px'
								//bodyHeight="calc(100vh - 160px)"
								data={showData}
								columns={columns}
								patchBgColor="#F5F5F2"
							/>
						</div> */}
						<div className="table-responsive">
							<table class="table">
								<thead style={{ backgroundColor: "#f9f9f7" }} >
									<tr>
										{columns?.map((iteam, index) => {
											return <>
												<th scope="col" className="p-4 " style={{cursor:"pointer"}}><h3>{iteam.name} <BsChevronDown/></h3></th>
											</>
										})}
									</tr>
								</thead>
								<tbody>
									{showData?.map((iteam, index) => {
										return <>
											<tr >
												<th className="px-4 p-3"><h4>{iteam.requestDate !== null ? iteam.requestDate : "-"}</h4></th>
												<td className="px-4 p-3"><h4>{iteam.destination != null ? iteam.destination : "-"}</h4></td>
												<td className="px-4 p-3 text-primary text-decoration-underline"><h4>{iteam.clientName !== null ? iteam.clientName : "-"}</h4></td>
												<td className="px-4 p-3"><h4>{iteam.arrive !== null ? iteam.arrive : "-"}</h4></td>
												<td className="px-4 p-3"><h4>{iteam.depart !== null ? iteam.depart : "-"}</h4></td>
												<td className="px-4 p-3"><h4>{iteam.guests !== null ? iteam.guests : "-"}</h4></td>
												<td className="px-4 p-3"><h4>{iteam.bedroom != null ? iteam.bedroom : "-"}</h4></td>
												<td className="px-4 p-3"><h4>{iteam.priceRange !== null ? iteam.priceRange : "-"}</h4></td>
												<td className="px-4 p-3"><h4>{iteam.offer !== null ? iteam.offer : "-"} <CgFileDocument style={{color:"green" ,fontSize:"26px"}}/></h4></td>
											</tr>
										</>
									})}
								</tbody>
							</table>
						</div>

					</div>
					:
					<div className="wishlist-results" style={{ backgroundColor: '#FFF' }}>No results</div>
			}
		</div>
	)
};

export default WishList;