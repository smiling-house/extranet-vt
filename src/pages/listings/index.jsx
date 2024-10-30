import React, { useEffect, useState } from "react";
import Icon from 'react-web-vector-icons';
import Button from "../../components/Buttons/Button/Button";
import pageBg from '../../assets/SigninPic.jpeg';

import approvedIcon from '../../assets/icons/partnerListings/approved.svg';
import editAdminIcon from '../../assets/icons/admin/menu/edit.svg';
import addAdminIcon from '../../assets/icons/admin/menu/add.svg';
import deleteAdminIcon from '../../assets/icons/admin/menu/delete.svg';
import PageHeader from "../../components/PageHeader";
import Datatable from "../../components/Datatable";
// import DataTable from 'react-data-table-component';

import Popup from "../../components/Popup";
import EditAgency from "./EditAgency";

import { data } from "./makeData.js";
import "./Listings.scss";
import ApproveAgent from "./ApproveAgent";
import DisApproveAgent from "./DisApproveAgent";
import DeleteAgency from "./DeleteAgency";
import axios from "axios";
import { baseURL } from "../../core/index.js";
import Paging from "../../components/Paging";
import constants from "../../Util/constants";
import countryList from "../../Util/data/countries.json";
import { RawOff } from "@mui/icons-material";
import { BsChevronDown } from "react-icons/bs";
import Sidebar from "../../components/Sidebar";
import LoadingBox from "../../components/LoadingBox";
const NEW_AGENCY = {
	id: "-1",
	agencyName: "",
	agentName: "",
	address: "",
	email: "",
	country: "",
	city: "",
	postalCode: "",
	notes: "",
	phone: ""
};

const Admin = (props) => {
	const { props, token } = props
	const divRefs = React.useRef([]);

	const [searchInputes, setsearchInputes] = useState({
		accountId: '',
		pmName: '',
	})
	const [isLoading, setIsLoading] = useState(false)
	const [editClickedId, seteditClickedId] = useState("")
	const [editAgencyId, seteditAgencyId] = useState("")
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
	const [selectedAgencyToEdit, setSelectedAgencyToEdit] = useState(null);
	const [selectedAgencyToDelete, setSelectedAgencyToDelete] = useState(null);
	const [agencyToApprove, setAgencyToApprove] = useState(null);
	const [agencyToDisApprove, setAgencyToDisApprove] = useState(null);
	const [totalAgencies, setTotalAgencies] = useState(null);
	const [agencies, setAgencies] = useState([]);
	// console.log("Agencies >>>>", Agencies);
	const [filterAgencies, setFilterAgencies] = useState();
	// console.log("filterAgencies >>>>", filterAgencies);
	const [searchAgencies, setSearchAgencies] = useState("");
	const [pageNumber, setPageNumber] = useState(0);
	const userRequest = axios.create({
		baseURL: baseURL,
		headers: {
			token: `Bearer ${token}`,
		},
	});
	const getAllPartners = async () => {
		setIsLoading(true)
		const partnersResponse = await userRequest.get(`partners/get-partners`,
			{ params: { limit: constants.PAGING_AGENCIES_SIZE, skip: agenciesPagingFrom - 1 } },
		);
		setIsLoading(false)
		localStorage.setItem("partnerCount", partnersResponse.data?.totalPartners);
		console.log(partnersResponse.data.partners)
		setAgencies(partnersResponse.data.partners);
	};
	const getSearchPartners = async () => {
		params = searchInputes.forEach.map((x) => x).join('&')
		console.log('search Q:',params)
		const partnersResponse = await userRequest.get(`partners/get-partners`,
			{
				params: {
					limit: constants.PAGING_AGENCIES_SIZE,
					skip: agenciesPagingFrom - 1,
					pmName: searchInputes.pmName,

				}
			},
		);
		localStorage.setItem("partnerCount", partnersResponse.data?.totalAgencies);
		setAgencies(partnersResponse.data.agencies);
	};


	useEffect(() => {
		getAllPartners();
	}, []);


	const doSearch = pageNumber => {
		//console.log("skipping : ", pageNumber * constants.PAGING_AGENCIES_SIZE);
		getAllPartners();
		//setShowSelection(false);
		//dispatch(agencyActions.loadagencies(pageNumber));
	};

	let agenciesPagingFrom = 1 + pageNumber * constants.PAGING_AGENCIES_SIZE;
	let agenciesPagingTo = (pageNumber + 1) * constants.PAGING_AGENCIES_SIZE;

	const onChangePage = pageNumber => {
		console.log("page=", pageNumber);
		setPageNumber(pageNumber);
		agenciesPagingFrom = 1 + pageNumber * constants.PAGING_AGENCIES_SIZE;
		agenciesPagingTo = (pageNumber + 1) * constants.PAGING_AGENCIES_SIZE;
		doSearch(pageNumber);
	};

	const menuStyle = () => {
		const pos = divRefs.current[selectedRowToEdit.id].getBoundingClientRect();
		const top = (pos.top > window.innerHeight) ? (window.innerHeight) : pos.top;
		return { top: `${top}px`, left: `${pos.left - 170}px` };
	};

	const clearEditMenu = () => {
		setSelectedRowToEdit(null);
	};

	const onShowEditMenu = (row) => {
		setSelectedRowToEdit(row);
		console.log("Row to edit=", row);
	};

	const onEditAgency = (id, agencyidd) => {
		seteditClickedId(id)
		seteditAgencyId(agencyidd)
		setSelectedAgencyToEdit(id);
		clearEditMenu();
	};

	const onAddAgency = () => {
		setSelectedAgencyToEdit(NEW_AGENCY);
		clearEditMenu();
	};

	const onDeleteAgency = () => {
		setSelectedAgencyToDelete(selectedRowToEdit);
		clearEditMenu();
	};

	const onAgencyToApprove = (row) => {
		setAgencyToApprove(row);
		console.log("Row to approve=", row);
		console.log("country=", row.country);
		const ccIndex = countryList.findIndex((i) => i.name === row.country);
		const cc = ccIndex ? countryList[ccIndex].code : "";
		console.log("countryCode=", cc);

	};
	function getCountryCode(row) {
		const ccIndex = countryList.findIndex((i) => i.name === row.country);
		const cc = ccIndex ? countryList[ccIndex].code : "";
		return cc;
	}

	const columns = [
		{
			id: 'partnerID',
			name: 'ID',
			selector: row => row.partnerID,
			cell: row => row.partnerID ? String(row.partnerID).padStart(4, "0") : "---",
			width: '80px'
		}, {
			id: 'partnerName',
			name: 'Partner',
			selector: row => row.agencyName,
			cell: row => <div className="link18" onClick={() => setSelectedAgencyToEdit(row)}>{row.agencyName}</div>,
			width: '350px'
		}, {
			id: 'accountID',
			name: 'Account ID',
			sortable: true,
			selector: row => row.accountID,
			cell: row => <div className="link18" onClick={() => setSelectedAgencyToEdit(row)}>{row.accountID}</div>,
			width: '250px'
		}, {
			id: 'listings',
			name: 'listings',
			sortable: true,
			//selector: row => row.subAgent,
			cell: row => <div className="link18" onClick={() => { }}>{row.listings.count}</div>,
			width: '180px'
		}, {
			id: 'contactName',
			name: 'Contact Person',
			sortable: true,
			selector: row => row.contactName,
			cell: row => <div className="link18" onClick={() => setSelectedAgencyToEdit(row)}>{row.contactName}</div>,
			width: '250px'
		}, {
			id: 'email',
			name: 'Email Address',
			sortable: true,
			selector: row => row.email,
			cell: row => row.email,
			cellStyle: { display: 'block', padding: '10px 0px' },
			width: '250px'
		}, {
			id: 'phone',
			name: 'Phone No.',
			sortable: true,
			selector: row => row.phone,
			cell: row => <div>{row.phone}</div>,
			width: '250px'
		}, {
			id: 'country',
			name: 'Country',
			sortable: true,
			selector: row => row.country,
			cell: row => <div>
				{row.country ? row.country : ''}
				{row.countryCode && <img width='50px' src={'https://purecatamphetamine.github.io/country-flag-icons/3x2/' + row.countryCode + '.svg'} />}
			</div>,
			width: '180px'
		}, {
			id: 'status',
			name: 'Status',
			width: '180px',
			sortable: true,
			//selector: row => row.status,
			cell: row => (row.status == "pending") ?
				<div className="link18" onClick={() => onAgencyToApprove(row)}>{row.status}</div> :
				<div className="link18-no-line" onClick={() => setAgencyToDisApprove(row)}>{row.status}</div>

		}, {
			id: 'uploadedAt',
			name: 'uploaded At',

			sortable: true,
			//selector: row => row.approvedAt,
			cell: row => (row.status == "pending") ? '' : <div className="link18-date">{row.uploadedAt}</div>,
			width: '150px'
		}, {
			id: 'VT',
			name: 'VT channel',
			sortable: true,
			//selector: row => row.firstSignIn,
			cell: row => (row.status == "pending") ? '' : <div className="link18-date">{row.VT.count}</div>,
			width: '150px'
		}, {
			id: 'SH',
			name: 'SH Channel',
			sortable: true,
			//selector: row => row.lastSignIn,
			cell: row => (row.status == "pending") ? '' : <div className="link18-date">{row.SH.count}</div>,
			width: '150px'
		}, {
			id: 'edit',
			name: 'Edit',
			header: (column, index) => (
				<div key={index} style={{ color: '#1B9C5D', backgroundColor: '#F5F5F2', fontSize: '22px', fontWeight: 500 }}>
					Edit
				</div>
			),
			headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
			sortable: true,
			//selector: row => row.offers,
			cell: (row) => (
				<div onClick={() => onShowEditMenu(row)} className="agencies-edit-icon" key={row.id}
					ref={(element) => divRefs.current[row.id] = element}>
					<img src={editIcon} alt="" />
				</div>
			),
			width: '100px'
		}
	];

	// selectedRowToEdit && console.log("pos: ", selectedRowToEdit.id, divRefs.current[selectedRowToEdit.id].getBoundingClientRect().top);
	// paging numbering:

	const handleSearchFuntionality = (value, name) => {
		console.log(name, value, "sdjsdhbh")
		setsearchInputes({ ...searchInputes, [name]: value })
	}
	const handlSearchButtonAdmin = () => {
		getSearchPartners();
	}
	function handekanda(status) {
		if (status !== "pending") {
			setAgencyToDisApprove("null")
		}
	}
	return (
		<div className="agencies-container" >
			<div className="page-header">Villa Tracker Extranet</div>
			<Sidebar
				agency={agency}
				agent={agent}
				token={token}
			// screenSize={screenSize}
			// activeMenu={activeMenu}
			// handleToggleMenu={handleToggleMenu}
			/>
			<PageHeader
				handleSearchFuntionality={handleSearchFuntionality}
				searchInputes={searchInputes}
				handlSearchButtonAdmin={handlSearchButtonAdmin}
				addUser={onAddAgency}
				searchOpen={null}
				topBgColor="#133B71" />
			{selectedRowToEdit &&
				<>
					<div className="agencies-floating-edit-menu-floater" onClick={clearEditMenu} />
					<div className="agencies-floating-edit-menu" style={menuStyle()}>
						{/* <div className="agencies-floating-edit-menu-row" onClick={onEditAgency}><img src={editAdminIcon} alt="" />&nbsp;&nbsp;Edit Agency</div> */}
						<div className="agencies-floating-edit-menu-row" onClick={onDeleteAgency}><img src={deleteAdminIcon} alt="" />&nbsp;&nbsp;Delete Agency</div>
						<div className="agencies-floating-edit-menu-row" onClick={onAddAgency}><img src={addAdminIcon} alt="" />&nbsp;&nbsp;Add Agency</div>
						<div className="agencies-floating-edit-menu-row" onClick={clearEditMenu}>&nbsp;&nbsp;close X</div>
					</div>
				</>
			}

			{agencyToApprove &&
				<Popup width={820} onClose={() => setAgencyToApprove(null)}>
					<ApproveAgent agency={agencyToApprove} onClose={() => setAgencyToApprove(null)} />
				</Popup>
			}
			{agencyToDisApprove &&
				<Popup width={820} onClose={() => setAgencyToDisApprove(null)}>
					<DisApproveAgent agency={agencyToDisApprove} onClose={() => setAgencyToDisApprove(null)} />
				</Popup>
			}

			{selectedAgencyToDelete &&
				<Popup width={820} onClose={() => setSelectedAgencyToDelete(null)}>
					<DeleteAgency agency={selectedAgencyToDelete} onClose={() => setSelectedAgencyToDelete(null)} />
				</Popup>
			}

			{
				selectedAgencyToEdit &&
				<div className="popup-wrapper" >
					<div className="popup-container p-2" style={{ width: "730px" }} >
						<EditAgency editClickedId={editClickedId} editAgencyId={editAgencyId} agency={selectedAgencyToEdit} agencies={agencies} onClose={() => setSelectedAgencyToEdit(null)} />
					</div>
				</div>
			}

			<div className="agencies-main">
				<LoadingBox visible={isLoading} />
				<div className="agencies-title">Guesty Partner List
					<div className="agencies-main-subtitle">Displaying Partners {agenciesPagingFrom}-{agenciesPagingTo} of {localStorage.getItem("partnerCount") ? localStorage.getItem("partnerCount") : "?"}</div>
				</div>
				{<Paging perPage={constants.PAGING_AGENCIES_SIZE} totalItems={400} currentPage={pageNumber} onChangePage={onChangePage} />}
				{/*
				<div style={{ padding: '0 20px' }}>
					<Datatable
						topWidth='2500px'
						leftPad='650px'
						data={agencies}
						columns={columns}
						patchBgColor="#F5F5F2" />
				</div> */}
				<div className="table-responsive px-3">
					<table class="table">
						<thead style={{ backgroundColor: "#f9f9f7" }} >
							<tr>
								{columns?.map((iteam, index) => {
									return <>
										<th scope="col" className="p-4 " style={{ cursor: "pointer" }}><h3>{iteam.name} <BsChevronDown /></h3></th>
									</>
								})}
							</tr>
						</thead>
						<tbody>
							{agencies?.map((iteam, index) => {
								return <>
									<tr >
										<th className="px-4 p-3 "><h4>{iteam._id !== null ? iteam._id : "-"}</h4></th>
										<td className="px-4 p-3  text-primary  cst-cursor" ><h4>{iteam.status != null ? iteam.status == "approved" ? <img src={approvedIcon} alt="" /> : "-" : "-"}</h4></td>
										<td className="px-4 p-3 text-primary  cst-cursor"><h4>{iteam.accountID !== null ? iteam.accountID : "-"}</h4></td>
										<td className="px-4 p-3"><h4>{iteam.listings.count !== null && iteam.listings.count !== "" ? iteam.listings.count : "-"}</h4></td>
										<td className="px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => onEditAgency(iteam._id, iteam.partnerID)}>{iteam.contactName !== null ? iteam.contactName : "-"}</h4></td>
										<td className="px-4 p-3"><h4>{iteam.email !== null && iteam.email !== "" ? iteam.email : "-"}</h4></td>
										<td className="px-4 p-3"><h4>{iteam.phone !== null && iteam.phone !== "" ? iteam.phone : "-"}</h4></td>
										<td className="px-4 p-3"><h4>{iteam.country !== null ? <img width='50px' src={'https://purecatamphetamine.github.io/country-flag-icons/3x2/' + iteam?.countryCode?.slice(0, 2).toUpperCase() + '.svg'} /> : "-"}</h4></td>
										<td className="px-4 p-3  text-primary text-decoration-underline cst-cursor"><h4 onClick={() => onAgencyToApprove(iteam)}>{iteam.status !== null && iteam.status !== "" ? iteam.status : "-"}</h4></td>
										<td className="px-4 p-3"><h4>{iteam.uploadedAt !== null && iteam.uploadedAt !== "" ? iteam.uploadedAt : "-"}</h4></td>
										<td className="px-4 p-3"><h4>{iteam.VTCount !== null && iteam.VTCount !== "" ? iteam.VTCount : "-"}</h4></td>
										<td className="px-4 p-3"><h4>{iteam.SHCount !== null && iteam.SHCount !== "" ? iteam.SHCount : "-"}</h4></td>
										<td className="px-4 p-3">
											<div class="dropdown">
												<img src={editIcon} alt="editIcon" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: "pointer" }} />
												<ul class="dropdown-menu">
													<li><a class="dropdown-item" href="#" onClick={onAddAgency}><img src={addAdminIcon} /> Add Partner</a></li>
													<li><a class="dropdown-item" href="#" onClick={() => onEditAgency(iteam._id, iteam.partnerID)}><img src={editAdminIcon} /> Edit Partner</a></li>
													<li><a class="dropdown-item" href="#" onClick={onDeleteAgency}><img src={deleteAdminIcon} /> Delete Partner</a></li>
												</ul>
											</div>
										</td>

									</tr >
								</>
							})}
						</tbody>
					</table>
				</div>
			</div>

		</div >
	);
};

export default Admin;
