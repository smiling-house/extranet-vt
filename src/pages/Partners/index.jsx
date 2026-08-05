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

import addTitleIcon from "../../assets/icons/admin/add-title-icon.svg";
import editTitleIcon from "../../assets/icons/admin/edit-title-icon.svg";

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
	PATH_SIGNOUT,
	PATH_LOGIN,
	APP_DISPLAY_NAME
} from "../../Util/constants";

import { data } from "./makeData.js";
import "./Admin.scss";
import "./PartnersRestyle.scss";
import { toast } from 'react-toastify';
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

import menuIcon from '../../assets/icons8-menu-50.png'
import * as userActions from "../../store/redux/User/actions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";


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


const dispatch = useDispatch();	


const [showSideBarMenu, setShowSideBarMenu] = useState(false);
  const signOut = () => {
	localStorage.clear();
	dispatch(userActions.signOut());
	history.push(PATH_LOGIN);
  };
const showOrHideSideBarMenu=()=> {
	if(showSideBarMenu===true) {
		setShowSideBarMenu(false);
	} else if(showSideBarMenu===false) {
		setShowSideBarMenu(true);
	}
}  


	const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props

	const agentData = JSON.parse(agent);

	const divRefs = React.useRef([]);
	const partnerLogin = getStorageValue('partnerLogin')
	const partnerName = getStorageValue('partnerName')
	const [searchInputes, setsearchInputes] = useState({
		pmName: "",
		accountId: partnerLogin,
	})
	const history = useHistory();
	const location = useLocation();
	const [editClickedId, setEditClickedId] = useState("")
	const [editPartnerId, seteditPartnerId] = useState("")
	const [SelectedPartner, setSelectedPartner] = useState(null);
	const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
	const [selectedPartnerToEdit, setSelectedPartnerToEdit] = useState(null);
	const [selectedPartnerToDelete, setSelectedPartnerToDelete] = useState(null);
	const [partnerToApprove, setPartnerToApprove] = useState(null);
	// Reconnect drill-down modal: which legacy listings still lack a G- twin
	const [reconnectFor, setReconnectFor] = useState(null);   // partner row
	const [showInactiveAccounts, setShowInactiveAccounts] = useState(false);
	const [reconnectList, setReconnectList] = useState(null); // fetched listings

	const openReconnectList = async (item) => {
		if (!(item.reconnect_properties_count > 0)) return;
		setReconnectFor(item);
		setReconnectList(null);
		try {
			const res = await userRequest.get(`local/partners/reconnect-listings/${item.accountId}`, {
				params: { channelSource: item.source === 'G' ? 'VT' : item.source },
			});
			setReconnectList(res.data?.listings || []);
		} catch (e) {
			console.log('reconnect-listings fetch failed', e?.message);
			setReconnectList([]);
		}
	};
	const [partnerToDisApprove, setPartnerToDisApprove] = useState(null);
	const [totalPartners, setTotalPartners] = useState(null);
	const [partners, setPartners] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
	// console.log("Partners >>>>", Partners);
	const [filterPartners, setFilterPartners] = useState();
	// console.log("filterPartners >>>>", filterPartners);
	const [searchPartners, setSearchPartners] = useState("");

localStorage.setItem('partners_page','partners');
	useEffect(() => {
		const who = sessionStorage.getItem('extranet-welcome-toast');
		if (who) {
			sessionStorage.removeItem('extranet-welcome-toast');
			toast.success(`Welcome back${who !== '1' ? ', ' + who : ''}!`, { position: 'top-right', toastClassName: 'custom-toast' });
		}
	}, []);

let property_status_to_filter_gs = '';
	//const [pageNumber, setPageNumber] = useState(page);
		//added by jaison for Liron 2025-June 11
		let defaultPageNumber = 0;
		let queryParams = new URLSearchParams(window.location.search);
		let page = parseInt( queryParams.get('page') );	

		if(!page) {
			
			defaultPageNumber = 0;
		} else {			
			defaultPageNumber = page;			
		}
		localStorage.setItem('partnersPageLastPageNumber', defaultPageNumber);
		const [pageNumber, setPageNumber] = useState(defaultPageNumber);

/*		
if( queryParams.get('page') ) {
	property_status_to_filter = localStorage.getItem("property_status_to_filter");
} else {
	localStorage.setItem('property_status_to_filter', '');
}
*/

//Task: EXTRANET VT - Check the possibilities of adding admin login
//Task URL : https://app.asana.com/1/1200178813358971/project/1209114491925523/task/1210009551590540
//By Jaison on 2025-04-21 - START	
/*				
const agent_role = getStorageValue('agent_role');
const agent_status = getStorageValue('agent_status');
*/
const agentLoggedIn = JSON.parse( localStorage.getItem('agent') );
const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');

/*
const [filterPropertyStatus, setFilterPropertyStatus] = useState('');
const filterByPropertyStatus = (event) => {
	console.log(event.target.value)
	setFilterPropertyStatus(event.target.value);
}
*/


const property_status_to_filter_ls = localStorage.getItem('property_status_to_filter_gs'); //ls => local storage
if(property_status_to_filter_ls) {
	property_status_to_filter_gs = property_status_to_filter_ls;
}
	const [filterPropertyStatus, setFilterPropertyStatus] = useState(property_status_to_filter_gs);
	const filterByPropertyStatus = (event) => {
		localStorage.setItem('property_status_to_filter_gs', event.target.value);
		setFilterPropertyStatus(event.target.value);      
	}

const [serialNumber, setSerialNumber] = useState(0);
//By Jaison on 2025-04-21 - END	


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
			{ params: { limit: constants.PAGING_PARTNERS_SIZE, skip: partnersPagingFrom - 1, provider:'guesty_channel_api' } },
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
				provider:'guesty_channel_api',
				//source:'VT',
				status:filterPropertyStatus 
			} :
				{
					limit: constants.PAGING_PARTNERS_SIZE,
					skip: partnersPagingFrom - 1,
					accountId: searchInputes.accountId,
				// no provider filter here: an accountId is already exact, and
				// G- twin partners carry provider 'rentalsunited_api' — pinning
				// guesty_channel_api made every G- partner login show 0 rows.
				//source:'VT',
				status:filterPropertyStatus
				} :

			{
				limit: constants.PAGING_PARTNERS_SIZE,
				skip: partnersPagingFrom - 1,
				provider:'guesty_channel_api',
				//source:'VT',
				status:filterPropertyStatus
			}


if(extranet_vt_logged_in_role==='admin') {	//By Jaison 2025 July 11
	delete params.source
}			

		console.log('loading search::::', params)


//Task: EXTRANET VT - Check the possibilities of adding admin login
//Task URL : https://app.asana.com/1/1200178813358971/project/1209114491925523/task/1210009551590540
//By Jaison on 2025-04-21 - START	
/*	
if(agent_role) {
	if(agent_role === 'admin' && agent_status==='approved') {
		delete params.accountId; //To fetch all partners
		console.log('loading search:', params)
	}
}
*/
//By Jaison on 2025-04-21 - END		

		//const partnersResponse = await userRequest.get(`local/partners`,
		const partnersResponse = await userRequest.get(`local/partners`,
			{
				params
			},
		);
		console.log()

		let partnersToShow = partnersResponse.data.partners;
		let countToShow = partnersResponse.data.count;

		// Partner logins: a PM can have a legacy account AND a RUDH (G-) twin
		// on the same email. Whichever accountId they logged in with, widen the
		// lookup to their email so BOTH accounts appear, clearly labelled below.
		if (extranet_vt_logged_in_role === 'partner' && partnersToShow?.length) {
			const partnerEmail = partnersToShow[0].email;
			if (partnerEmail) {
				try {
					const byEmail = await userRequest.get(`local/partners`, { params: { email: partnerEmail } });
					if (byEmail.data?.success && byEmail.data.partners?.length) {
						const seen = new Set();
						partnersToShow = byEmail.data.partners.filter(pr => {
							const key = `${pr.accountId}|${pr.source}`;
							if (seen.has(key)) return false;
							seen.add(key);
							return true;
						});
						countToShow = partnersToShow.length;
					}
				} catch (e) { console.log('email-wide partner lookup failed', e?.message); }
			}
		}

		setIsLoading(false)
		localStorage.setItem("partnerCount", countToShow);
		setTotalPartners(parseInt(countToShow))
		setPartners(partnersToShow);

		console.log('partners console by jaison:', partnersToShow);
	};



async function allZipcodes() {
	const responseDataAllZips = await userRequest.post('local/all-zipcodes');
	const allZipcodes = responseDataAllZips.data;	
	localStorage.setItem('allZipcodes', JSON.stringify(allZipcodes));
	console.log('allZipcodes:', allZipcodes)		
}
//allZipcodes();

const fetchCurrenciesExchangeRates = async () => {
	try {
		//axios.defaults.headers.common["Authorization"] = `Bearer ${jToken}`;
		const response = await userRequest.get("https://api.villatracker.com/xchange");
		const exchangeRates = response.data;

		const exchangeRatesData = {}

		if (exchangeRates.length > 0) {
			exchangeRates.forEach((item, index) => {
				exchangeRatesData[item.currency_code] = {conversion_rates:item.conversion_rates}
			});
		}

		localStorage.setItem("exchangeRatesData", JSON.stringify(exchangeRatesData));
	}
	catch (error) {
		console.error("Error fetching currencies:", error);
	}
}
//fetchCurrenciesExchangeRates();	


	useEffect(() => {
		if (partnerLogin) {
			console.log('partnerLogin: (should see only the PM listings)', partnerLogin, partnerName)
		}
		getSearchPartners();

	allZipcodes();
	fetchCurrenciesExchangeRates();

	}, [filterPropertyStatus]);

	useEffect(() => {
		console.log('search:', searchInputes)
	}, [searchInputes]);

	const GoToPartnerListings = async(partner, accountId, propertyStatusToFilter='') => {
localStorage.setItem('property_status_to_filter_listings', propertyStatusToFilter);

// G- twin listings live under channelSource 'VT', never 'G' — same twin
// mapping as the hub count pipelines, otherwise every drill-down from a
// G- row comes back empty.
const drillChannelSource = partner.source === 'G' ? 'VT' : partner.source;
const responseDataUniqueZips = await userRequest.post(`local/partners/properties-unique-zipcodes`,
	{ accountId: accountId, channelSource: drillChannelSource },
);

const partnerPropertiesUniqueZipcodes = responseDataUniqueZips.data;
localStorage.setItem('partnerPropertiesUniqueZipcodes', JSON.stringify(partnerPropertiesUniqueZipcodes));

		console.log("see listings for account:", accountId, partner.source);
		localStorage.setItem("partner", JSON.stringify({ ...partner, source: drillChannelSource }))

		/*if (!partner.offsetRead) {
			swal({
				show: true,
				icon: 'error',
				title: 'Oops!!',
				text: "No Data Found on Account ID :" + accountId + ' channel: ' + partner.source
			})
		} else {*/
			history.push(PATH_LISTINGS, { partner: { ...partner, source: drillChannelSource }, accountId, source: drillChannelSource });
		//}

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
		
		localStorage.setItem('partnersPageLastPageNumber', pageNumber); //added by jaison for Liron 2025-June 11

		setPageNumber(pageNumber); //default

		doSearch(pageNumber);

		setSerialNumber(pageNumber * constants.PAGING_PARTNERS_SIZE);

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
		setEditClickedId(id)
		setSelectedPartnerToEdit(selectedPartner);
		clearEditMenu();
		document.body.style.overflow = "hidden";
	};

	const updatePartner = (accountId, editedPartner) => {
		console.log("partner to save:", accountId, editedPartner)
	};

	const onAddPartnerSH = () => {
		setEditClickedId(0)
		setSelectedPartnerToEdit(NEW_PARTNER_SH);
		document.body.style.overflow = "hidden";
		clearEditMenu();
	};
	const onAddPartnerVT = () => {
		setEditClickedId(0)
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
		},
		{
			name: 'GS Channel',
			width: '250px'
		},		
		{
			name: 'Account',
			width: '130px'
		},
		{
			name: 'Listings',
			width: '100px'
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
		}, 
 {
			name: 'UNMAPPED',
			width: '150px'
		},
		{
			name: 'RECONNECT',
			width: '150px'
		},
		{
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
// 		<div className="page-container">
// 			<div className="page-header" style={{
// 				marginLeft: showSideBarMenu ? '250px' : '0',
// 				transition: 'margin-left 0.3s ease',
// 				// background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// 				background: 'linear-gradient(135deg, #104109 0%, #2d5a2b 100%)',
// 				boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
// 				borderBottom: '1px solid rgba(255,255,255,0.1)'
// 			}}>
// 				<div className="container-fluid" style={{padding: '0px 50px'}}>
// 					<div className="row align-items-center py-3">
// 						{/* Left Section - Menu & Title */}
// 						<div className="col-lg-8 col-md-7 col-sm-8 col-6">
// 							<div className="d-flex align-items-center">
// 								<button 
// 									className="btn btn-link p-0 me-3 text-white border-0"
// 									onClick={showOrHideSideBarMenu}
// 									style={{
// 										background: 'none',
// 										fontSize: '1.2rem',
// 										transition: 'transform 0.2s ease'
// 									}}
// 									onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
// 									onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
// 								>
// 									<img 
// 										src={menuIcon} 
// 										alt="Menu" 
// 										style={{
// 											width: '28px',
// 											height: '28px',
// 											filter: 'brightness(0) invert(1)'
// 										}} 
// 									/>
// 								</button>
								
// 								<div className="header-title">
// 									<h1 className="mb-0 text-white d-none d-md-block" style={{
// 										fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
// 										fontWeight: '600',
// 										letterSpacing: '-0.5px'
// 									}}>
// 										<span className="d-none d-sm-inline">{APP_DISPLAY_NAME} : </span>
// 										<span>PMs</span>
// 										<span className="d-none d-md-inline"> - {agentData.firstName}</span>
// 									</h1>
									
// 									{/* Mobile-only welcome message aligned with menu button */}
// 									<div className="d-md-none d-flex align-items-center">
// 										<span className="text-white" style={{
// 											fontSize: '1.1rem',
// 											fontWeight: '500',
// 											lineHeight: '28px' // Matches menu button height for alignment
// 										}}>
// 											Welcome, {agentData.firstName}
// 										</span>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
						
// 						{/* Right Section - User Actions */}
// 						<div className="col-lg-4 col-md-5 col-sm-4 col-6">
// 							<div className="d-flex justify-content-end align-items-center">
// 								{/* User Info - Hidden on small screens */}
// 								<div className="d-none d-lg-flex align-items-center me-3">
// 									<div className="user-avatar me-2" style={{
// 										width: '35px',
// 										height: '35px',
// 										borderRadius: '50%',
// 										background: 'rgba(255,255,255,0.2)',
// 										display: 'flex',
// 										alignItems: 'center',
// 										justifyContent: 'center',
// 										color: 'white',
// 										fontWeight: 'bold',
// 										fontSize: '14px'
// 									}}>
// 										{agentData.firstName.charAt(0).toUpperCase()}
// 									</div>
// 									<div className="text-white">
// 										<div style={{fontSize: '14px', fontWeight: '500'}}>
// 											{agentData.firstName}
// 										</div>
// 										<div style={{fontSize: '12px', opacity: '0.8'}}>
// 											{extranet_vt_logged_in_role === 'admin' ? 'Administrator' : 'Partner'}
// 										</div>
// 									</div>
// 								</div>
								
// 								{/* Sign Out Button */}
// 								<button
// 									className="btn btn-outline-light btn-sm"
// 									onClick={signOut}
// 									style={{
// 										borderRadius: '25px',
// 										padding: '8px 20px',
// 										fontSize: '14px',
// 										fontWeight: '500',
// 										border: '2px solid rgba(255,255,255,0.3)',
// 										transition: 'all 0.3s ease',
// 										backdropFilter: 'blur(10px)'
// 									}}
// 									onMouseOver={e => {
// 										e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
// 										e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
// 									}}
// 									onMouseOut={e => {
// 										e.currentTarget.style.background = 'transparent';
// 										e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
// 									}}
// 								>
// 									<span className=" d-sm-inline">Sign Out</span>
// 									<span className="d-sm-none">
// 										<i className="fas fa-sign-out-alt"></i>
// 									</span>
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>			
// 			{/* <div className="page-header" style={{marginLeft: showSideBarMenu ? '250px' : 'unset'}}>
// 				<img src={menuIcon} style={{'width':'25px'}} className="cst-cursor" onClick={showOrHideSideBarMenu} />
// 				&nbsp;{APP_DISPLAY_NAME} : PMs - {agentData.firstName} 
// 				<span className="cst-cursor" onClick={signOut}>Sign Out</span>
// 			</div> */}
// {showSideBarMenu===true &&			
// 			<Sidebar
// 				agency={agency}
// 				agent={agent}
// 				token={token}
// 				screenSize={screenSize}
// 				activeMenu={activeMenu}
// 				handleToggleMenu={handleToggleMenu}
// 				showOrHideSideBarMenu={showOrHideSideBarMenu}
// 			/>
// }
// 			<div className={showSideBarMenu ? `${"page-body"}` : "page-body-nomargin"} >
				<Layout
					pageTitle="PMs"
					agency={agency}
					agent={agent}
					token={token}
					screenSize={screenSize}
					activeMenu={activeMenu}
					handleToggleMenu={handleToggleMenu}
					setActiveMenu={setActiveMenu}
				>
					<div className="agencies-container partners-legacy-restyle" >
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

						{reconnectFor &&
							<Popup width={860} onClose={() => { setReconnectFor(null); setReconnectList(null); }}>
								<div className="reconnect-modal">
									<h3>Properties to reconnect — {reconnectFor.pmName} <span className="acct-pill acct-pill--legacy">Legacy</span></h3>
									<p className="reconnect-modal-note">
										These properties only exist on your legacy account. To migrate them, open your own
										Guesty account and go to <b>Channel distribution settings</b>, then reconnect each
										property to the <b>{reconnectFor.source === 'SH' ? 'Smiling House' : 'Villa Tracker'} channel</b> —
										we can't do this from our side. Once reconnected, each property moves to your{' '}
										<span className="acct-pill acct-pill--new">New system</span> account and syncs automatically.
									</p>
									{reconnectList?.length > 0 && (
										<button type="button" className="reconnect-csv-btn" onClick={() => {
											const rows = [['Title', 'Listing ID', 'Status', 'Channel'], ...reconnectList.map(l => [l.title, l.id, l.status, reconnectFor.source === 'SH' ? 'Smiling House' : 'Villa Tracker'])];
											const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
											const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
											const el = document.createElement('a');
											el.href = url; el.download = `reconnect-${reconnectFor.accountId}.csv`; el.click();
											URL.revokeObjectURL(url);
										}}>Download CSV</button>
									)}
									{reconnectList === null && <div className="reconnect-modal-loading">Loading…</div>}
									{reconnectList !== null && (
										<div className="reconnect-modal-tablewrap">
											<table>
												<thead><tr><th>#</th><th>Property</th><th>Listing ID</th><th>Status</th></tr></thead>
												<tbody>
													{reconnectList.map((l, i) => (
														<tr key={l.id}>
															<td>{i + 1}</td>
															<td className="rc-title">{l.title}</td>
															<td className="rc-id">{l.id}</td>
															<td><span className={`status-chip status-chip--${(l.status || '').toLowerCase()}`}>{l.status || '—'}</span></td>
														</tr>
													))}
													{reconnectList.length === 0 && <tr><td colSpan={4}>Nothing to reconnect.</td></tr>}
												</tbody>
											</table>
										</div>
									)}
								</div>
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
							/* Bootstrap Modal for EditPartner with fixed height, scroll, and dynamic right shift if sidebar is open */
							<div
								className="modal fade show"
								tabIndex="-1"
								role="dialog"
								style={{
									display: 'block',
									backgroundColor: 'rgba(0,0,0,0.5)',
									zIndex: 1050,
									position: 'fixed',
									top: 0,
									left: showSideBarMenu ? '200px' : 0, // adjust 320px to your sidebar width
									right: 0,
									bottom: 0,
									transition: 'left 0.3s',
									'margin-top': '50px'
								}}
							>
								<div className="modal-dialog modal-lg" role="document">
									<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title" style={{
											fontSize: '25px',
											padding: '10px 0px 10px 15px'
										}}>
											{editClickedId ? (
												<>
													<span>
														<img src={editTitleIcon} alt="" style={{ width: 28, height: 28, marginRight: 16 }} />
													</span>
													<span>
														Property Manager Details
													</span>
													<span style={{ fontWeight: 400, fontSize: 18, color: '#888' }}>
														| {selectedPartnerToEdit?.source ? selectedPartnerToEdit?.source === 'SH' ? 'Smiling House' : 'Villa Tracker' : ''}
													</span>
												</>
												
											) : (
												<>
													<span>
														<img src={addTitleIcon} alt="" style={{ width: 28, height: 28, marginRight: 16 }} />
													</span>
													<span>
														Add Partner
													</span>
													<span style={{ fontWeight: 400, fontSize: 18, color: '#888' }}>
														&nbsp;| {selectedPartnerToEdit?.source ? selectedPartnerToEdit?.source === 'SH' ? 'Smiling House' : 'Villa Tracker' : ''}
													</span>
												</>
											)
											}
										</h4>
										<button
											type="button"
											className="close"
											aria-label="Close"
											onClick={onClose}
											style={{
												fontSize: '2.2rem',
												fontWeight: 700,
												color:'#212121',
												opacity: 1,
												background: 'none',
												marginLeft: 'auto',
												marginRight: '20px',
												marginTop: '-10px',
												zIndex: 20,
												cursor: 'pointer',
												lineHeight: 1
											}}
											onMouseOver={e => (e.currentTarget.style.color ='#5f5f5f')}
											onMouseOut={e => (e.currentTarget.style.color = '#212121')}
											>
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body" style={{ padding: 0, maxHeight: '85vh', overflowY: 'auto' }}>
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


	{extranet_vt_logged_in_role==='admin' && (
			<div className="search-container">
			
			<div className="row">
				<div className="col-lg-5 col-md-8 col-12" style={{margin: 2}}>
				<input type="text" className="form-control" placeholder="Search by PM Name"  onChange={(e) => handleSearchFuntionality("pmName",e.target.value)} />
				</div>
				<div className="col-lg-2 col-md-2 col-12" style={{margin: 2}}>
				<button 
					className="btn btn-primary w-100" 
					style={{ 
						height: "60px", 
						fontSize: "18px", 
						borderRadius: "6px", 
						fontWeight: 400 
					}}  
					onClick={() => handlSearchButtonAdmin()}>
					<span>Search</span>
				</button>
				</div>
				{/* <span className=" agencies-search-separator"></span> */}
			</div>
			</div>
	)}


							{extranet_vt_logged_in_role === 'partner' && partners?.some(pr => !/^G-/.test(pr.accountId || '')) && partners?.some(pr => /^G-/.test(pr.accountId || '')) && (
								<div className="migration-infobox">
									<div className="migration-infobox-title">You have two accounts while we upgrade our system</div>
									<div className="migration-infobox-body">
										<span className="acct-pill acct-pill--new">New system</span> is your current account — new bookings and updates sync here.&nbsp;
										<span className="acct-pill acct-pill--legacy">Legacy</span> is the old connection. The <b>Reconnect</b> column shows properties that only exist on your legacy account — <b>you need to reconnect these yourself in your Guesty account &rarr; Channel distribution settings, for the relevant channel</b> (we can't do it from our side). Once reconnected, they move to your new account and sync automatically. Counts differ per row because each account only shows the properties shared with <b>that</b> connection.
									</div>
								</div>
							)}
							<div className="agencies-title">
	{extranet_vt_logged_in_role==='admin' && <span>Guesty PM List</span> }
	{extranet_vt_logged_in_role==='partner' && <span>Guesty PM Home</span> }

								{!partnerLogin && (<>
									{/*<a class="dropdown-item" href="#" onClick={onAddPartnerSH}><img src={addAdminIcon} /> connect GUESTY PM partner SH = Smiling House </a>*/}
									<a class="dropdown-item" style={{whiteSpace: 'unset'}} href="#" onClick={onAddPartnerVT}><img src={addAdminIcon} /> connect GUESTY PM partner VT = Villa Tracker </a>
								</>)}

								<div className="agencies-main-subtitle">Displaying PMs {partnersPagingFrom}-{partnersPagingTo} of {totalPartners ? totalPartners : "?"}
								</div>
							</div>



	{extranet_vt_logged_in_role==='admin' && (
		<div className="container-fluid px-0">
			<div className="row mx-0">
				<div className="col-12">
					<div className="filterbystatus-container">
						<div className="row align-items-end">
							<div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
								<label className="form-label text-white mb-2">
									<strong>Filter by Status</strong>
								</label>
								<div className="dropdown w-100">
									<button 
										className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
										type="button" 
										id="statusFilterDropdown" 
										data-bs-toggle="dropdown" 
										aria-expanded="false"
										style={{
											minWidth: '120px',
											fontSize: '14px',
											padding: '8px 12px',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											backgroundColor: '#fff',
											color: '#333',
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center'
										}}
									>
										<span>{filterPropertyStatus || '--All--'}</span>
									</button>
									<ul 
										className="dropdown-menu w-100" 
										aria-labelledby="statusFilterDropdown"
										style={{
											maxHeight: '200px',
											overflowY: 'auto',
											fontSize: '14px'
										}}
									>
										<li>
											<button 
												className={`dropdown-item ${!filterPropertyStatus ? 'active' : ''}`}
												type="button"
												onClick={() => filterByPropertyStatus({target: {value: ''}})}
											>
												--All--
											</button>
										</li>
										<li>
											<button 
												className={`dropdown-item ${filterPropertyStatus === 'Approved' ? 'active' : ''}`}
												type="button"
												onClick={() => filterByPropertyStatus({target: {value: 'Approved'}})}
											>
												Approved
											</button>
										</li>
										<li>
											<button 
												className={`dropdown-item ${filterPropertyStatus === 'Pending' ? 'active' : ''}`}
												type="button"
												onClick={() => filterByPropertyStatus({target: {value: 'Pending'}})}
											>
												Pending
											</button>
										</li>
										<li>
											<button 
												className={`dropdown-item ${filterPropertyStatus === 'Declined' ? 'active' : ''}`}
												type="button"
												onClick={() => filterByPropertyStatus({target: {value: 'Declined'}})}
											>
												Declined
											</button>
										</li>

										<li>
											<button 
												className={`dropdown-item ${filterPropertyStatus === 'unmapped' ? 'active' : ''}`}
												type="button"
												onClick={() => filterByPropertyStatus({target: {value: 'unmapped'}})}
											>
												Unmapped
											</button>
										</li>

									</ul>
								</div>                      
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	}


							{/* Only render the pager when there is more than one page — a lone "1"
							    button above a one-row table is noise. Multi-page behaviour unchanged. */}
							{Number(localStorage.getItem("partnerCount")) > constants.PAGING_PARTNERS_SIZE &&
								<Paging perPage={constants.PAGING_PARTNERS_SIZE} totalItems={localStorage.getItem("partnerCount")} currentPage={pageNumber} onChangePage={onChangePage} />}
							<div className="table-responsive px-3">
								<table class="table">
									<thead style={{ backgroundColor: "#f9f9f7" }} >
										<tr>
											{columns?.map((item, index) => {
												return <>
													{/*<th scope="col" style={{ cursor: "pointer", width: item.width }}><h3>{item.name} <BsChevronDown /></h3></th>*/}
	<th scope="col" style={{ cursor: "pointer", width: item.width }}>{item.name} <BsChevronDown /></th>
												</>
											})}
										</tr>
									</thead>
									<tbody>
										{(extranet_vt_logged_in_role === 'partner' && !showInactiveAccounts
											? partners?.filter(pr => (pr.total_properties_count || 0) + (pr.reconnect_properties_count || 0) + (pr.unmapped_properties_count || 0) > 0)
											: partners)?.map((item, index) => {
											// Partner view: the G- twin record often carries the person's
											// name in pmName (no company). All rows belong to one PM there,
											// so borrow the company name from a sibling legacy record and
											// show the contact underneath.
											const groupCompany = extranet_vt_logged_in_role === 'partner'
												? partners.find(pr => !/^G-/.test(pr.accountId || '') && pr.pmName?.trim())?.pmName?.trim()
												: null;
											const bigName = (groupCompany || item.pmName || '').trim();
											const subName = [item.contactName, item.pmName]
												.map(n => (n || '').trim())
												.find(n => n && n !== bigName) || '';
											//console.log("item ", index, item)
											return <>
												<tr >
													<td className="pmName px-4 p-3  text-primary  cst-cursor" ><h4>{/*totalPartners - partnersPagingFrom - index + 1*/}
													{serialNumber+index+1}
													</h4></td>
													<td className="pmName px-4 p-3  text-primary  cst-cursor text-decoration-underline" onClick={() => GoToPartnerListings(item, item.accountId)}>
													<h4 className="pm-name-main">{bigName}</h4>
													{subName && <div className="pm-name-sub">{subName}</div>}
												</td>
													<td className="accountId px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => onEditPartner(item.accountId, item)}>{item.accountId !== null ? item.accountId : ""}</h4></td>

	<td className="accountId px-4 p-3 text-primary cst-cursor"><h4>{extranet_vt_logged_in_role === 'partner' ? ({ G: 'New system', VT: 'Villa Tracker', SH: 'Smiling House' }[item.source] || item.source) : item.source}</h4></td>

	<td className="acctType px-4 p-3">
		{/^G-/.test(item.accountId || '') ? (
			<span className="acct-pill acct-pill--new" title="Your current account on our new distribution system. New bookings and updates sync here.">New system</span>
		) : (
			<>
				<span className="acct-pill acct-pill--legacy" title="Old connection. Reconnect its remaining properties in Guesty — once reconnected they migrate to your new account automatically.">Legacy</span>
				{item.total_properties_count > 0 && item.reconnect_properties_count >= 0 && (
					<div className="migration-progress" title={`${Math.max(item.total_properties_count - item.reconnect_properties_count, 0)} of ${item.total_properties_count} properties migrated to the new system`}>
						<div className="migration-progress-bar"><span style={{ width: `${Math.min(100, Math.round(100 * Math.max(item.total_properties_count - item.reconnect_properties_count, 0) / item.total_properties_count))}%` }} /></div>
						<div className="migration-progress-label">{Math.max(item.total_properties_count - item.reconnect_properties_count, 0)}/{item.total_properties_count} migrated</div>
					</div>
				)}
			</>
		)}
	</td>												

	{/*<td className="Listings px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToPartnerListings(item, item.accountId)}>{item.offsetRead ? item.offsetRead : "No listings"}/({item.count ? item.count : ""})</h4></td>*/}

	<td className="Listings px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToPartnerListings(item, item.accountId)}>{item.total_properties_count}</h4></td>

	{/*
	<td className="VT provider px-4 p-3 text-primary  cst-cursor"><h4>{(Object.prototype.hasOwnProperty.call(item, 'approved')) && item.approved?.length}</h4></td>
	*/}
	<td className="VT provider px-4 p-3 text-primary  cst-cursor"><h4 onClick={() => GoToPartnerListings(item, item.accountId, 'Approved')}>{item.approved_properties_count}</h4></td>
	{/*
	<td className="SH provider px-4 p-3 text-primary  cst-cursor"><h4>{(Object.prototype.hasOwnProperty.call(item, 'pending')) && item.pending?.length}</h4></td>
	*/}
	<td className="SH provider px-4 p-3 text-primary  cst-cursor"><h4 onClick={() => GoToPartnerListings(item, item.accountId, 'Pending')}>{item.pending_properties_count}</h4></td>

	{/*
	<td className="SH provider px-4 p-3 text-primary  cst-cursor"><h4>{(Object.prototype.hasOwnProperty.call(item, 'declined')) && item.declined?.length}</h4></td>
	*/}
	<td className="SH provider px-4 p-3 text-primary  cst-cursor"><h4 onClick={() => GoToPartnerListings(item, item.accountId, 'Declined')}>{item.declined_properties_count}</h4></td>

	<td className="SH provider px-4 p-3 text-primary  cst-cursor"><h4 onClick={() => GoToPartnerListings(item, item.accountId, 'unmapped')}>{item.unmapped_properties_count}</h4></td>

	<td className="disconnected px-4 p-3" title={item.reconnect_properties_count > 0 ? `Click to see which ${item.reconnect_properties_count} propert${item.reconnect_properties_count === 1 ? 'y needs' : 'ies need'} reconnecting from YOUR Guesty account. We cannot do this from our side.` : 'Nothing to reconnect on this account.'}>
		<h4 className={item.reconnect_properties_count > 0 ? 'disc-pill disc-pill--warn cst-cursor' : 'disc-pill'} onClick={() => openReconnectList(item)}>{item.reconnect_properties_count ?? 0}</h4>
	</td>	

	<td className="Updated px-4 p-3"><h4>{item.updatedAt !== null && item.updatedAt !== "" ? item.updatedAt.slice(0, 10) : ""}</h4></td>
												</tr >
											</>
										})}
									</tbody>
								</table>
							</div>
							{extranet_vt_logged_in_role === 'partner' && partners?.some(pr => (pr.total_properties_count || 0) + (pr.reconnect_properties_count || 0) + (pr.unmapped_properties_count || 0) === 0) && (
								<div className="inactive-accounts-toggle" onClick={() => setShowInactiveAccounts(v => !v)}>
									{showInactiveAccounts ? 'Hide' : 'Show'} inactive accounts ({partners.filter(pr => (pr.total_properties_count || 0) + (pr.reconnect_properties_count || 0) + (pr.unmapped_properties_count || 0) === 0).length})
								</div>
							)}
						</div>
					</div >
				</Layout>
		// 	</div>
		// </div>
	);
};

export default Partners;

