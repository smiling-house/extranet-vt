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
	PATH_LOGIN
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

import menuIcon from '../../assets/icons8-menu-50.png'
import * as userActions from "../../store/redux/User/actions";
import { useDispatch, useSelector } from "react-redux";


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
localStorage.removeItem('property_status_to_filter');

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


	//const [pageNumber, setPageNumber] = useState(page);
		//added by jaison for Liron 2025-June 11
		let defaultPageNumber =0;
		let queryParams = new URLSearchParams(window.location.search);
		let page = parseInt( queryParams.get('page') );	
		if(!page) {
			defaultPageNumber = 0;
		} else {
			defaultPageNumber = page;			
		}
		const [pageNumber, setPageNumber] = useState(defaultPageNumber);



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


	const [filterPropertyStatus, setFilterPropertyStatus] = useState('');
	const filterByPropertyStatus = (event) => {
		console.log(event.target.value)
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

	async function allZipcodes() {
		const responseDataAllZips = await userRequest.post('local/all-zipcodes');
		const allZipcodes = responseDataAllZips.data;	
		localStorage.setItem('allZipcodes', JSON.stringify(allZipcodes));
		console.log('allZipcodes:', allZipcodes)		
	}
	allZipcodes();

	const getAllPartners = async () => {
		setIsLoading(true)
		const partnersResponse = await userRequest.get(`local/partners`,
			{ params: { limit: constants.PAGING_PARTNERS_SIZE, skip: partnersPagingFrom - 1, source:'VT' } },
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
				source:'VT',
				status:filterPropertyStatus 
			} :
				{
					limit: constants.PAGING_PARTNERS_SIZE,
					skip: partnersPagingFrom - 1,
					accountId: searchInputes.accountId,
				provider:'guesty_channel_api',					
				source:'VT',
				status:filterPropertyStatus
				} :

			{
				limit: constants.PAGING_PARTNERS_SIZE,
				skip: partnersPagingFrom - 1,
				provider:'guesty_channel_api',
				source:'VT',
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
		setIsLoading(false)
		localStorage.setItem("partnerCount", partnersResponse.data.count);
		setTotalPartners(parseInt(partnersResponse.data.count))
		setPartners(partnersResponse.data.partners);

		console.log('partners console by jaison:',partnersResponse.data.partners);		
	};


	useEffect(() => {

		if (partnerLogin) {
			console.log('partnerLogin: (should see only the PM listings)', partnerLogin, partnerName)
		}
		getSearchPartners()
	}, [filterPropertyStatus]);

	useEffect(() => {
		console.log('search:', searchInputes)
	}, [searchInputes]);

	const GoToPartnerListings = async(partner, accountId, property_status_to_filter='') => {

const responseDataUniqueZips = await userRequest.post(`local/partners/properties-unique-zipcodes`,
	{ accountId: accountId, channelSource: partner.source },
);

const partnerPropertiesUniqueZipcodes = responseDataUniqueZips.data;
localStorage.setItem('partnerPropertiesUniqueZipcodes', JSON.stringify(partnerPropertiesUniqueZipcodes));

		console.log("see listings for account:", accountId, partner.source);
		localStorage.setItem("partner", JSON.stringify(partner))
		localStorage.setItem("property_status_to_filter", property_status_to_filter)
		if (!partner.offsetRead) {
			swal({
				show: true,
				icon: 'error',
				title: 'Oops!!',
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
		},
		{
			name: 'GS Channel',
			width: '250px'
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
			<div className="page-header"><img src={menuIcon} style={{'width':'25px'}} className="cst-cursor" onClick={showOrHideSideBarMenu} />&nbsp;Villa Tracker Extranet : PMs - {agentData.firstName} (<span className="cst-cursor" onClick={signOut}>Sign Out</span>)</div>
{showSideBarMenu===true &&			
			<Sidebar
				agency={agency}
				agent={agent}
				token={token}
				screenSize={screenSize}
				activeMenu={activeMenu}
				handleToggleMenu={handleToggleMenu}
			/>
}
			<div className={showSideBarMenu ? `${"page-body"}` : "page-body-nomargin"} >

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


{extranet_vt_logged_in_role==='admin' &&
<div className="agencies-search-container">
          <div className="navigation-bar" style={{ position: "absolute", marginBottom: "110px" }}> </div>
          <div className="row">
            <div className="col-sm-8">
              <input type="text" className="form-control" placeholder="Search by PM Name"  onChange={(e) => handleSearchFuntionality("pmName",e.target.value)} />
            </div>
            <div className="col-sm-2">
              <button className="form-control" style={{ height: "60px", width: "200px", fontSize: "20px", borderRadius: "6px", fontWeight: 100, }} onClick={() => handlSearchButtonAdmin()}>
                <span>Search</span>
              </button>
            </div>
            <span className=" agencies-search-separator"></span>
          </div>
        </div>
}


						<div className="agencies-title">
							
{extranet_vt_logged_in_role==='admin' && <span>Guesty PM List</span> }
{extranet_vt_logged_in_role==='partner' && <span>Guesty PM Home</span> }

							{!partnerLogin && (<>
								{/*<a class="dropdown-item" href="#" onClick={onAddPartnerSH}><img src={addAdminIcon} /> connect GUESTY PM partner SH = Smiling House </a>*/}
								<a class="dropdown-item" href="#" onClick={onAddPartnerVT}><img src={addAdminIcon} /> connect GUESTY PM partner VT = Villa Tracker </a>
							</>)}

							<div className="agencies-main-subtitle">Displaying PMs {partnersPagingFrom}-{partnersPagingTo} of {totalPartners ? totalPartners : "?"}
							</div>
						</div>



{extranet_vt_logged_in_role==='admin' &&
<div className="row">
<div className="col-12">
                    <div className="listings-search-container row">
                    <div className="col-sm-2">
                        <label style={{'color':'white'}}><strong>Filter by Status</strong></label>
                        <select class="form-control" onChange={(e)=>filterByPropertyStatus(e)}>
                            <option value="">--All--</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Declined">Declined</option>
                        </select>                        
                    </div>

                    </div>
</div>
</div>
}


						{<Paging perPage={constants.PAGING_PARTNERS_SIZE} totalItems={localStorage.getItem("partnerCount")} currentPage={pageNumber} onChangePage={onChangePage} />}
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
									{partners?.map((item, index) => {
										//console.log("item ", index, item)
										return <>
											<tr >
												<td className="pmName px-4 p-3  text-primary  cst-cursor" ><h4>{/*totalPartners - partnersPagingFrom - index + 1*/}
												{serialNumber+index+1}
												</h4></td>
												<td className="pmName px-4 p-3  text-primary  cst-cursor" ><h4>{item.pmName != null ? item.pmName : ""}</h4></td>
												<td className="accountId px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => onEditPartner(item._id, item)}>{item.accountId !== null ? item.accountId : ""}</h4></td>

<td className="accountId px-4 p-3 text-primary cst-cursor"><h4>{item.source}</h4></td>												

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
