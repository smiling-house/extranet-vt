import React, { useEffect, useState } from "react";
import notesIcon from '../../../assets/icons/notes.svg';
import specialEvents from '../../../assets/special-collection/events.svg';
import specialFamilies from '../../../assets/special-collection/families.svg';
import greenIcon from '../../../assets/special-collection/green.svg';
import dogsIcon from '../../../assets/special-collection/pets.svg';
import './ClientOfferLog.scss';
import Datatable from "../../../components/Datatable";
import Button from "../../../components/Buttons/Button/Button";
import axios from "axios";
import { baseURL } from "../../../core/index.js";
import Paging from "../../../components/Paging";
import constants from "../../../Util/constants";
import { BsChevronDown } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";

const ClientOfferLog = props => {
	console.log(props, "props")
	const { partner, onClose, token, phoneLog, emailLog, NickNameLog } = props;
	const [clientLogs, setClientLogs] = useState([]);
	const [isRefresh, setIsRefresh] = useState(false);
	// console.log("clientLogs >>>>", clientLogs);
	const [filterClientLogs, setFilterClientLogs] = useState();
	// console.log("filterClientLogs >>>>", filterClientLogs);
	const [searchClientLogs, setSearchClientLogs] = useState("");
	const [pageNumber, setPageNumber] = useState(0);
	console.log("partner for logs:", partner)
	const doSearch = pageNumber => {
		console.log("skipping : ", pageNumber * constants.PAGING_LISTING_SIZE);
		getAllClientLogs();
	};

	let clientPagingFrom = 1 + pageNumber * constants.PAGING_LISTING_SIZE;
	let clientPagingTo = (pageNumber + 1) * constants.PAGING_LISTING_SIZE;

	const onChangePage = pageNumber => {
		console.log("page=", pageNumber);
		setPageNumber(pageNumber);
		clientPagingFrom = 1 + pageNumber * constants.PAGING_LISTING_SIZE;
		clientPagingTo = (pageNumber + 1) * constants.PAGING_LISTING_SIZE;
		doSearch(pageNumber);
	};


	const userRequest = axios.create({
		baseURL: baseURL,
		headers: {
			token: `Bearer ${token}`,
		},
	});

	const getAllClientLogs = async () => {
		const clientLogsResponse = await userRequest.get(`/client-log/getAllLogs`, {
			params: { client_id: 2, limit: constants.PAGING_LISTING_SIZE, skip: clientPagingFrom - 1 },
		}
		);
		console.log("fetched clientsLogs >>>>", clientLogsResponse.data.totalLogs, clientLogsResponse.data.clientsLogs);
		clientLogs.totalLogs = clientLogsResponse.data.totalLogs;
		setClientLogs(clientLogsResponse.data.clientsLogs);
		setFilterClientLogs(clientLogsResponse.data.clientsLogs);
	};

	useEffect(() => {
		getAllClientLogs();
	}, [isRefresh]);

	const handleSearchClientLogs = async (clientLogs) => {
		// console.log("client: ", client);
		setSearchClientLogs(clientLogs);

		let matches = [];

		if (clientLogs.length > 0) {
			matches = await clientLogs.filter((filt) => {
				const regex = new RegExp(`${clientLogs}`, "gi");
				return filt.email.match(regex) || filt.name.match(regex);
			});
		}
		console.log("matches >>>", matches);
		if (clientLogs.length > 0) {
			setFilterClientLogs(matches);
		} else {
			setFilterClientLogs(clientLogs);
		}
	};

	const renderSpecialCollections = row => {
		return (
			<div>
				<img src={specialEvents} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
				<img src={specialFamilies} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
				<img src={greenIcon} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
				<img src={dogsIcon} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
			</div>
		)
	};

	const renderCheckRow = row => {
		return (
			<div className="offer-datagrid-property">
				{console.log("row data is:", row)}
				<input type="checkbox" style={{ marginRight: '15px', width: '20px' }} />
				<div className="link18">{row.property_id}</div>
			</div>
		)
	};

	const columns = [
		{
			id: 'propertyId',
			name: 'Property Id',
			//selector: row => row.propertyId,
			cell: row => renderCheckRow(row),
			width: '220px'
		}, {
			id: 'specialCollection',
			name: 'Special Collection',
			//selector: row => row.lastName,
			cell: row => renderSpecialCollections(row),
			width: '220px'
		}, {
			id: 'booked',
			name: 'Booked',
			sortable: true,
			//selector: row => row.booked,
			cell: row => <div>{row.booked ? "Y" : "-"}</div>,
			width: '130px'
		}, {
			id: 'propertyName',
			name: 'Property Name',
			sortable: true,
			//selector: row => row.propertyName,
			cell: row => <div className="link18" style={{ textOverflow: 'ellipsis', width: '530px', overflow: 'hidden' }}>{row.propertyName}</div>,
			width: '560px'
		}, {
			id: 'whereTo',
			name: 'Where To',
			sortable: true,
			//selector: row => row.whereTo,
			cell: row => <div>{row.whereTo}</div>,
			width: '200px'
		}, {
			id: 'links',
			name: 'Links',
			sortable: true,
			//selector: row => row.links,
			cell: row => <div>{row.links ? "Y" : "-"}</div>,
			width: '1fr'
		}, {
			id: 'brochure',
			name: 'Brochure',
			sortable: true,
			//selector: row => row.brochure,
			cell: row => <div>{row.brochure ? "Y" : "-"}</div>,
			width: '1fr'
		}, {
			id: 'offerDate',
			name: 'Date of offer',
			sortable: true,
			//selector: row => row.offerDate,
			cell: row => <div style={{ width: '100%', textAlign: 'center' }}>{row.offerDate}</div>,
			width: '1fr'
		}
	];

	let data = [{
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	}, {
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	}, {
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	}, {
		propertyId: 1235043639,
		booked: '5.1.2023',
		propertyName: 'Amazing Villa with infinity views & sunsets',
		whereTo: 'London, uk',
		links: 'Y',
		offerDate: '10.1.2023'
	}];

	data = [...data, ...data, ...data];

	return (
		<div className="popup-wrapper" >
			<div className="popup-container">
				<div className="fluid-container">
					<div class="modal-content" >
						<div class="modal-body">
							<h2 className="text-center pt-2">partner listings <span style={{ color: '#165093' }}>{partner.partnerName}</span></h2>
							<div className=" p-2 row">
								<div className="col-md-3">
									<label>Account ID</label>
									<input type="text" className="form-control" placeholder="Account ID" value={partner.accountID} disabled />
								</div>
								<div className="col-md-3">
									<lable>Email Address</lable>
									<input type="text" className="form-control" placeholder="Email Address" value={partner.email} disabled />
								</div>
								<div className="col-md-3">
									<lable>Phone Number</lable>
									<input type="text" className="form-control" placeholder="Phone Number" value={phoneLog} disabled />
								</div>
							</div>

							<div className="d-flex justify-content-start">
								<div className="px-4"><b>Listings Details</b></div>
								<div className="px-4"><b>Pending:</b> 54</div>
								<div className="px-4"><b>VT:</b> 25</div>
								<div className="px-4"><b>SH:</b> 12</div>
								<div className="px-4"><b>VT:</b> 10</div>
								<div className="px-4" style={{ color: '#036AE1', fontWeight: 'bold' }}>Note&nbsp;&nbsp;<img src={notesIcon} /></div>
							</div>


							{/* {<Paging perPage={constants.PAGING_LISTING_SIZE} totalItems={clientLogs.totalLogs} currentPage={pageNumber} onChangePage={onChangePage} />} */}

							{/* <Datatable
					leftPad='140px'
					data={filterClientLogs || clientLogs}
					columns={columns}
					patchBgColor="#FDFDFD"
					headerBgColor="#FDFDFD"
					rowsBgColor="#FDFDFD"
				/> */}
							<div class="table-responsive">
								<table class="table">
									<thead style={{ backgroundColor: "#f9f9f7" }} >
										<tr>
											{columns?.map((iteam, index) => {
												return <>
													<th key={index} scope="col" className="p-4 " style={{ cursor: "pointer" }}><h3>{iteam.name} <BsChevronDown />  </h3></th>
												</>
											})}
										</tr>
									</thead>
									<tbody>
										{console.log(filterClientLogs, "filterClientLogs")}
										{filterClientLogs?.map((iteam, index) => {
											return <>
												<tr key={index}>
													<th className="px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4>{iteam.property_id != null ? iteam.property_id : "-"}</h4></th>
													<td className="px-4 p-3"><h4> {renderSpecialCollections(iteam.property_id)}</h4></td>
													<td className="px-4 p-3 "><h4>{iteam.booked == true ? "Y" : "-"}</h4></td>
													<td className="px-4 p-3"><h4>{iteam.propertyName !== null ? iteam.propertyName : "-"}</h4></td>
													<td className="px-4 p-3"><h4>{iteam.destination !== null ? iteam.destination : "-"}</h4></td>
													<td className="px-4 p-3 cst-cursor"><h4>{iteam.links == true ? <TiTickOutline /> : "-"}</h4></td>
													<td className="px-4 p-3 cst-cursor"><h4 >{iteam.brochure == true ? "Y" : '-'}</h4></td>
													<td className="px-4 p-3 cst-cursor"><h4 >{iteam.dateAction} </h4></td>
												</tr>
											</>
										})}
									</tbody>
								</table>
							</div>

							<div className="d-flex justify-content-md-end p-3">
								<Button
									style={{ fontSize: '18px', marginRight: '30px' }}
									variant="link"
									text="Close"
									onClick={onClose}
								/>
								<Button
									style={{ fontSize: '18px' }}
									text="Resend offer now"
									onClick={onClose}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default ClientOfferLog;