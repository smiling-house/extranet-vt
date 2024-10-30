import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Icon from 'react-web-vector-icons';
import Button from "../../components/Buttons/Button/Button";
import pageBg from '../../assets/SigninPic.jpeg';

import CollectionIcon from "../../components/CollectionIcon";

import VTChannelIcon from "../../assets/channels/icons/VTChannel.svg";
import VTChannelIconOn from "../../assets/channels/icons/VTChannel-on.svg";
import VTChannelIconOnBlue from "../../assets/channels/icons/VTChannel-on-blue.svg";
import VTChannelLabel from "../../assets/channels/icons/label-VTChannel.svg";

import SHChannelIcon from "../../assets/channels/icons/SHChannel.svg";
import SHChannelIconOn from "../../assets/channels/icons/SHChannel-on.svg";
import SHChannelIconOnBlue from "../../assets/channels/icons/SHChannel-on-blue.svg";
import SHChannelLabel from "../../assets/channels/icons/label-SHChannel.svg";

import TLChannelIcon from "../../assets/channels/icons/TLChannel.svg";
import TLChannelIconOn from "../../assets/channels/icons/TLChannel-on.svg";
import TLChannelIconOnBlue from "../../assets/channels/icons/TLChannel-on-blue.svg";
import TLChannelLabel from "../../assets/channels/icons/label-TLChannel.svg";

import eventsIcon from "../../assets/special-collection/icons/events.svg";
import eventsIconOn from "../../assets/special-collection/icons/events-on.svg";
import eventsIconOnBlue from "../../assets/special-collection/icons/events-on-blue.svg";
import eventsLabel from "../../assets/special-collection/icons/label-events.svg";


import editIcon from '../../assets/icons/admin-edit-icon.png';
import editAdminIcon from '../../assets/icons/admin/menu/edit.svg';
import addAdminIcon from '../../assets/icons/admin/menu/add.svg';
import deleteAdminIcon from '../../assets/icons/admin/menu/delete.svg';
import PageHeader from "../../components/PageHeader";
import swal from "sweetalert";
import Datatable from "../../components/Datatable";
// import DataTable from 'react-data-table-component';

import Popup from "../../components/Popup";
import EditPartner from "./EditPartner";
import {
	PATH_PARTNERS,
	PATH_LISTINGS,
} from "../../Util/constants";

import { data } from "./makeData.js";
import "./Admin.scss";
import ApproveAgent from "./ApproveAgent";
import DisApproveAgent from "./DisApproveAgent";
import DeletePartner from "./DeleteAgency";
import axios from "axios";
import { baseURL } from "../../core/index.js";
import Paging from "../../components/Paging";
import constants from "../../Util/constants";
import countryList from "../../Util/data/countries.json";
import { RawOff } from "@mui/icons-material";
import { BsChevronDown } from "react-icons/bs";
import ClientOfferLog from "./ClientOfferLog";
import Sidebar from "../../components/Sidebar";
import LoadingBox from "../../components/LoadingBox";
import { getStorageValue } from "../../Util/general.js";
import BankDetails from "./BankDetails/index.js";

const NEW_PARTNER = {
	id: "-1",
	partnerName: "",
	contactName: "",
	email: "",
	token: "",
	phone: "",
	basicChannels: [],
	source: 'SH',
	accountChannel: "Smiling House"
};
const NEW_PARTNER_SH = {
	accountChannel: "Smiling House",
	id: "-1",
	partnerName: "",
	contactName: "",
	email: "",
	token: "",
	phone: "",
	basicChannels: ["SH"],
	source: "SH"
};
const NEW_PARTNER_VT = {
	accountChannel: "Villa Tracker",
	id: "-1",
	partnerName: "",
	contactName: "",
	email: "",
	token: "",
	phone: "",
	basicChannels: ["VT"],
	source: "VT"
};

const Partners = (props) => {
	const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props
	const divRefs = React.useRef([]);
	const partnerLogin = getStorageValue('partnerLogin')
	const partnerName = getStorageValue('partnerName')
	const [searchInputes, setsearchInputes] = useState({
		pmName: "",
		accountId: partnerLogin,
	})
	const history = useHistory();
	const location = useLocation();
	const [editClickedId, seteditClickedId] = useState("")
	const [editPartnerId, seteditPartnerId] = useState("")
	const [SelectedPartner, setSelectedPartner] = useState(null);
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
	const [selectedPartnerToEdit, setSelectedPartnerToEdit] = useState(null);
	const [selectedPartnerToDelete, setSelectedPartnerToDelete] = useState(null);
	const [partnerToApprove, setPartnerToApprove] = useState(null);
	const [partnerToDisApprove, setPartnerToDisApprove] = useState(null);
	const [totalPartners, setTotalPartners] = useState(null);
	const [partners, setPartners] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
	// console.log("Partners >>>>", Partners);
	const [filterPartners, setFilterPartners] = useState();
	// console.log("filterPartners >>>>", filterPartners);
	const [searchPartners, setSearchPartners] = useState("");
	const [pageNumber, setPageNumber] = useState(0);
	const inputFileds = {
		agentName: "",
		managerLastName: "",
		lastName: "",
		agencyName: "",
		agentName: "",
		agentPhone: "",
		email: "",
		phone: "",
		address: "",
		zipcode: "",
		city: "",
		country: "",
		currency: "",
		password: "",
		confirmPassword: "",
		userImage: "",
		IBAN: "",
		bankName: "",
		extraDetails: "",
		holderAdress: "",
		holderCity: "",
		holderCountry: "",
		holderFirstName: "",
		holderzipcode: "",
		swiftNumber: "",
		addPaylodDyanmic: "",
		emailTitle: "",
		emailText: "",
		postalCode: "",
	  };
	
	  const [formData, setformData] = useState(inputFileds);


	const handleInputField = (e) => {
		const { name, value, files } = e.target;
		console.log(name, value);
		const updatedFormData = { ...formData, [name]: value };
	
		setformData(updatedFormData);
		localStorage.setItem("formData", JSON.stringify(updatedFormData));

	  };

	let partnersPagingFrom = 1 + pageNumber * constants.PAGING_PARTNERS_SIZE;
	let partnersPagingTo = (partnersPagingFrom + constants.PAGING_PARTNERS_SIZE > totalPartners) ? totalPartners : partnersPagingFrom + constants.PAGING_PARTNERS_SIZE

	const userRequest = axios.create({
		baseURL: constants.SHUB_URL,
		headers: {
			Authorization: constants.SHUB_TOKEN,
		},
	});
	const getAllPartners = async () => {
		setIsLoading(true)
		const partnersResponse = await userRequest.get(`local/partners`,
			{ params: { limit: constants.PAGING_PARTNERS_SIZE, skip: partnersPagingFrom - 1 } },
		);
		setIsLoading(false)
		//console.log("response:",partnersResponse.data)
		if (partnersResponse.data) {
			localStorage.setItem("partnerCount", partnersResponse.data.count);
			setPartners(partnersResponse.data.partners);
			setTotalPartners(parseInt(partnersResponse.data.count))
		} else { console.log("error on reading partners api from shub/local/partners") }
	};
	const getSearchPartners = async () => {
		setIsLoading(true)
		const params = (searchInputes.pmName !== '' || searchInputes.accountId !== '') ?
			(searchInputes.pmName !== '') ? {
				limit: constants.PAGING_PARTNERS_SIZE,
				skip: partnersPagingFrom - 1,
				pmName: searchInputes.pmName,
				//channelSource: 'VT',
				source:'VT'
			} :
				{
					limit: constants.PAGING_PARTNERS_SIZE,
					skip: partnersPagingFrom - 1,
					accountId: searchInputes.accountId,
					//channelSource: 'VT',
				source:'VT'
				} :

			{
				limit: constants.PAGING_PARTNERS_SIZE,
				skip: partnersPagingFrom - 1,
				//channelSource: 'VT',
				source:'VT'
			}
		console.log('loading search:', params)
		const partnersResponse = await userRequest.get(`local/partners`,
			{
				params
			},
		);
		console.log()
		setIsLoading(false)
		localStorage.setItem("partnerCount", partnersResponse.data.count);
		setTotalPartners(parseInt(partnersResponse.data.count))
		setPartners(partnersResponse.data.partners);
	};


	useEffect(() => {

		if (partnerLogin) {
			console.log('partnerLogin: (should see only the PM listings)', partnerLogin, partnerName)
		}
		getSearchPartners()
	}, []);

	useEffect(() => {
		console.log('search:', searchInputes)
	}, [searchInputes]);

	const GoToPartnerListings = (partner, accountId) => {
		console.log("see listings for account:", accountId, partner.source);
		localStorage.setItem("partner", JSON.stringify(partner))
		if (!partner.offsetRead) {
			swal({
				show: true,
				icon: 'error',
				title: 'Opps!!',
				text: "No Data Found on Account ID :" + accountId + ' channel: ' + partner.source
			})
		} else {
			history.push(PATH_LISTINGS, { partner, accountId, source: partner.source });
		}

	};

	const doSearch = pageNumber => {
		partnersPagingFrom = 1 + pageNumber * constants.PAGING_PARTNERS_SIZE;
		partnersPagingTo = (partnersPagingFrom + constants.PAGING_PARTNERS_SIZE > totalPartners) ? totalPartners : partnersPagingFrom + constants.PAGING_PARTNERS_SIZE
		console.log("skipping : ", partnersPagingFrom - 1);
		getAllPartners();
		//setShowSelection(false);
		//dispatch(PartnerActions.loadpartners(pageNumber));
	};


	const onChangePage = pageNumber => {
		console.log("page=", pageNumber + 1);
		setPageNumber(pageNumber);
		doSearch(pageNumber);
	};

	const menuStyle = () => {
		const pos = divRefs.current[selectedRowToEdit.id].getBoundingClientRect();
		const top = (pos.top > window.innerHeight) ? (window.innerHeight) : pos.top;
		return { top: `${top}px`, left: `${pos.left - 170}px` };
	};

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const clearEditMenu = () => {
		setSelectedRowToEdit(null);
		goToTop()
	};
	const onClose = () => {
		setSelectedRowToEdit(null);
		setSelectedPartner(null)
		setSelectedPartnerToDelete(null)
		setSelectedPartnerToEdit(null)
		document.body.style.overflow = "auto";
	};

	const onShowEditMenu = (row) => {
		setSelectedRowToEdit(row);
		console.log("Row to edit=", row);
	};

	const onEditPartner = (id, selectedPartner) => {
		seteditClickedId(id)
		setSelectedPartnerToEdit(selectedPartner);
		clearEditMenu();
		document.body.style.overflow = "hidden";
	};

	const updatePartner = (accountId, editedPartner) => {
		console.log("partner to save:", accountId, editedPartner)
	};

	const onAddPartnerSH = () => {
		seteditClickedId(0)
		setSelectedPartnerToEdit(NEW_PARTNER_SH);
		document.body.style.overflow = "hidden";
		clearEditMenu();
	};
	const onAddPartnerVT = () => {
		seteditClickedId(0)
		setSelectedPartnerToEdit(NEW_PARTNER_VT);
		document.body.style.overflow = "hidden";
		clearEditMenu();
	};

	const onDeletePartner = () => {
		setSelectedPartnerToDelete(selectedRowToEdit);
		document.body.style.overflow = "hidden";
		clearEditMenu();
	};

	const onPartnerToApprove = (row) => {
		setPartnerToApprove(row);
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
			name: '#',
			width: '50px'
		},
		{
			name: 'partner Name',
			width: '350px'
		},  {
			name: 'Account ID',
			width: '250px'
		}, {
			name: 'Listings',
			width: '80px'
		}, {
			name: 'APPROVED',
			sortable: true,
			width: '150px'
		}, {
			name: 'PENDING',
			width: '150px'
		}, {
			name: 'DECLINED',
			width: '150px'
		}, {
			name: 'Updated at',
			width: '300px'
		}
	];

	// selectedRowToEdit && console.log("pos: ", selectedRowToEdit.id, divRefs.current[selectedRowToEdit.id].getBoundingClientRect().top);
	// paging numbering:

	const handleSearchFuntionality = (name, value) => {
		console.log('set search:', name, value)
		setsearchInputes({ ...searchInputes, [name]: value })

	}
	const handlSearchButtonAdmin = () => {
		getSearchPartners();
	}

	const renderChannels = (row) => {
		return (
			<div className="channels-main-selection-icons"
				style={{
					paddingTop: '15px',
					display: 'grid',
					gridTemplateColumns: '80px 80px 80px',
					justifyItems: 'center',
				}}>
				<CollectionIcon
					path={VTChannelIcon}
					pathOver={VTChannelIconOn}
					selected={row?.source?.indexOf("VT") > -1}
					selected2={false}
					label={VTChannelLabel}
					readOnly={true}
				/>
				<CollectionIcon
					readOnly={true}
					path={SHChannelIcon}
					pathOver={SHChannelIconOn}
					pathOver2={SHChannelIconOnBlue}
					selected={row?.source?.indexOf("SH") > -1}
					selected2={false}
					label={SHChannelLabel}
				/>
			</div>
		)
	};
	return (
		<div className="page-container">
			<div className="page-header">Villa Tracker Extranet : PMs</div>
			<Sidebar
				agency={agency}
				agent={agent}
				token={token}
				screenSize={screenSize}
				activeMenu={activeMenu}
				handleToggleMenu={handleToggleMenu}
			/>
			<div className={activeMenu ? `${"page-body"}` : "page-body"} >

				<div className="agencies-container" >
					<LoadingBox visible={isLoading} />
					{selectedRowToEdit &&
						<>
							<div className="agencies-floating-edit-menu-floater" onClick={clearEditMenu} />
							<div className="agencies-floating-edit-menu" style={menuStyle()}>
								{/* <div className="agencies-floating-edit-menu-row" onClick={onEditPartner}><img src={editAdminIcon} alt="" />&nbsp;&nbsp;Edit Partner</div> */}
								<div className="agencies-floating-edit-menu-row" onClick={onDeletePartner}><img src={deleteAdminIcon} alt="" />&nbsp;&nbsp;Delete Partner</div>
								<div className="agencies-floating-edit-menu-row" onClick={onAddPartnerSH}><img src={addAdminIcon} alt="" />&nbsp;&nbsp;Add Partner</div>
								<div className="agencies-floating-edit-menu-row" onClick={clearEditMenu}>&nbsp;&nbsp;close X</div>
							</div>
						</>
					}

					{partnerToApprove &&
						<Popup width={820} onClose={onClose}>
							<ApproveAgent partner={partnerToApprove} onClose={onClose} />
						</Popup>
					}
					{partnerToDisApprove &&
						<Popup width={820} onClose={onClose}>
							<DisApproveAgent partner={partnerToDisApprove} onClose={onClose} />
						</Popup>
					}

					{selectedPartnerToDelete &&
						<Popup width={820} onClose={onClose}>
							<DeletePartner partner={selectedPartnerToDelete} onClose={onClose} />
						</Popup>
					}
					{selectedPartnerToEdit &&
						<div className="popup-wrapper" >
							<div className="popup-container p-2" style={{ width: "730px" }} >
								<EditPartner
									agent={agent}
									newPartnerID={parseInt(totalPartners) + 1}
									editClickedId={editClickedId}
									editPartnerId={editPartnerId}
									partner={selectedPartnerToEdit}
									partners={partners}
									onClose={onClose}
								/>
							</div>
						</div>
					}
					{
						SelectedPartner &&
						<ClientOfferLog
							token={token}
							partner={SelectedPartner}
							onClose={onClose}
						/>
					}

					<div className="agencies-main">
						<div className="agencies-title">Guesty PM List
							{!partnerLogin && (<>
								<a class="dropdown-item" href="#" onClick={onAddPartnerSH}><img src={addAdminIcon} /> connect GUESTY PM partner SH = Smiling House </a>
								<a class="dropdown-item" href="#" onClick={onAddPartnerVT}><img src={addAdminIcon} /> connect GUESTY PM partner VT = Villa Tracker </a>
							</>)}

							<div className="agencies-main-subtitle">Displaying PMs {partnersPagingFrom}-{partnersPagingTo} of {totalPartners ? totalPartners : "?"}
							</div>
						</div>
						{<Paging perPage={constants.PAGING_PARTNERS_SIZE} totalItems={localStorage.getItem("partnerCount")} currentPage={pageNumber} onChangePage={onChangePage} />}
						<div className="table-responsive px-3">
							<table class="table">
								<thead style={{ backgroundColor: "#f9f9f7" }} >
									<tr>
										{columns?.map((item, index) => {
											return <>
												<th scope="col" style={{ cursor: "pointer", width: item.width }}><h3>{item.name} <BsChevronDown /></h3></th>
											</>
										})}
									</tr>
								</thead>
								<tbody>
									{partners?.map((item, index) => {
										//console.log("item ", index, item)
										return <>
											<tr >
												<td className="pmName px-4 p-3  text-primary  cst-cursor" ><h4>{totalPartners - partnersPagingFrom - index + 1}</h4></td>
												<td className="pmName px-4 p-3  text-primary  cst-cursor" ><h4>{item.pmName != null ? item.pmName : ""}</h4></td>
												<td className="accountId px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => onEditPartner(item._id, item)}>{item.accountId !== null ? item.accountId : ""}</h4></td>
												<td className="Listings px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToPartnerListings(item, item.accountId)}>{item.offsetRead ? item.offsetRead : "No listings"}/({item.count ? item.count : ""})</h4></td>
												<td className="VT provider px-4 p-3 text-primary  cst-cursor"><h4>{(Object.prototype.hasOwnProperty.call(item, 'approved')) && item.approved?.length}</h4></td>
												<td className="SH provider px-4 p-3 text-primary  cst-cursor"><h4>{(Object.prototype.hasOwnProperty.call(item, 'pending')) && item.pending?.length}</h4></td>
												<td className="SH provider px-4 p-3 text-primary  cst-cursor"><h4>{(Object.prototype.hasOwnProperty.call(item, 'declined')) && item.declined?.length}</h4></td>
												<td className="Updated px-4 p-3"><h4>{item.updatedAt !== null && item.updatedAt !== "" ? item.updatedAt.slice(0, 10) : ""}</h4></td>
											</tr >
										</>
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div >
			</div>
		</div>
	);
};

export default Partners;
