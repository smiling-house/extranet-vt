import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Icon from 'react-web-vector-icons';
import Button from "../../components/Buttons/Button/Button.jsx";
import pageBg from '../../assets/SigninPic.jpeg';

import CollectionIcon from "../../components/CollectionIcon/index.js";

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
import PageHeader from "../../components/PageHeader/index.js";
import swal from "sweetalert";
import Datatable from "../../components/Datatable/index.js";
// import DataTable from 'react-data-table-component';

import Popup from "../../components/Popup/index.js";

import {
    PATH_EPARTNERS,
    PATH_LISTINGS,
    PATH_EPS_LISTINGS,
    PATH_SELECT,
    PATH_EPS_EPARTNER_MANAGE,
    PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES
} from "../../Util/constants.js";

import "./EPartner.scss";


import axios from "axios";
import { baseURL } from "../../core/index.js";
import Paging from "../../components/Paging/index.js";
import constants from "../../Util/constants.js";
import countryList from "../../Util/data/countries.json";
import { RawOff } from "@mui/icons-material";
import { BsChevronDown } from "react-icons/bs";

import Sidebar from "../../components/Sidebar/index.js";
import LoadingBox from "../../components/LoadingBox/index.js";
import { v4 as uuidv4 } from 'uuid'


const EPartners = (props) => {
    const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props
    const divRefs = React.useRef([]);

    const [searchInputes, setsearchInputes] = useState({
        pmName: "",
        accountId: "",
    })
    const history = useHistory();
    const location = useLocation();
    const [editClickedId, seteditClickedId] = useState("")
    const [editePartnerId, seteditePartnerId] = useState("")
    const [SelectedEPartner, setSelectedEPartner] = useState(null);
    const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
    const [selectedEPartnerToEdit, setSelectedEPartnerToEdit] = useState(null);
    const [selectedEPartnerToDelete, setSelectedEPartnerToDelete] = useState(null);
    const [EPartnerToApprove, setEPartnerToApprove] = useState(null);
    const [EPartnerToDisApprove, setEPartnerToDisApprove] = useState(null);
    const [totalEPartners, setTotalEPartners] = useState(null);
    const [EPartners, setEPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    // console.log("EPartners >>>>", EPartners);
    const [filterEPartners, setFilterEPartners] = useState();
    // console.log("filterEPartners >>>>", filterEPartners);
    const [searchEPartners, setSearchEPartners] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    let EPartnersPagingFrom = 1 + pageNumber * constants.PAGING_EPARTNERS_SIZE;
    let EPartnersPagingTo = (EPartnersPagingFrom + constants.PAGING_EPARTNERS_SIZE > totalEPartners) ? totalEPartners : EPartnersPagingFrom + constants.PAGING_PARTNERS_SIZE

    const userRequest = axios.create({
        baseURL: constants.SHUB_URL,
        headers: {
            Authorization: constants.SHUB_TOKEN,
        },
    });
    const getAllEPSReservations = async () => {
        setIsLoading(true)
        const EpartnersResponse = await userRequest.get(`eps/get-all-reservations`,
            { params: { limit: constants.PAGING_EPARTNERS_SIZE, skip: EPartnersPagingFrom - 1 } },
        );
        setIsLoading(false)
        console.log("EpartnersResponse data:", EpartnersResponse.data)
        if (EpartnersResponse.data) {
            localStorage.setItem("EpartnerCount", EpartnersResponse.data.count);
            setEPartners(EpartnersResponse.data.partners);
            setTotalEPartners(parseInt(EpartnersResponse.data.count))
        } else { console.log("error on reading Epartners api from eps/get-all-reservations") }
    };
    const getSearchEPartners = async () => {
        setIsLoading(true)
        const params = (searchInputes.partnerName !== '' || searchInputes.partnerId !== '') ?
            (searchInputes.partnerName !== '') ? {
                limit: constants.PAGING_EPARTNERS_SIZE,
                skip: EPartnersPagingFrom - 1,
                partnerName: searchInputes.partnerName,
            } :
                {
                    limit: constants.PAGING_PARTNERS_SIZE,
                    skip: EPartnersPagingFrom - 1,
                    partnerId: searchInputes.partnerId
                } :

            {
                limit: constants.PAGING_EPARTNERS_SIZE,
                skip: EPartnersPagingFrom - 1,
            }
        console.log('loading search:', params)
        const EpartnersResponse = await userRequest.get(`eps/get-all-reservations`,
            {
                params
            },
        );
        console.log()
        setIsLoading(false)
        localStorage.setItem("EpartnerCount", EpartnersResponse.data.count);
        setTotalEPartners(parseInt(EpartnersResponse.data.count))
        setEPartners(EpartnersResponse.data.partners);
    };


    useEffect(() => {
        getAllEPSReservations();
    }, []);

    useEffect(() => {
        console.log('search:', searchInputes)
    }, [searchInputes]);

    const GoToEPartnerReservations = (Epartner, partnerId) => {
        console.log("see listings for partner:", partnerId, Epartner);
        localStorage.setItem("EpartnerReservation", JSON.stringify(Epartner))
        localStorage.setItem("epartner-id-reservations", partnerId)

        //localStorage.setItem("EpartnerIds", JSON.stringify(Epartner.ids))
        //console.log('::Epartner.ids::', Epartner.ids)
        //if (!Epartner.shared) {
        
        
        /*if (!Epartner.ids) {
            swal({
                show: true,
                icon: 'error',
                title: 'Opps!!',
                text: "still No shared listings Data Found for partner ID :" + partnerId
            })
        } else {*/
            history.push(PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES, { Epartner, partnerId });
        //}

    };

    const goToEpartnerManage = (ePartnerEmail, ePartner) => {
        localStorage.setItem('ePartnerEmail', ePartnerEmail)
        localStorage.setItem('Epartner', JSON.stringify(ePartner))
        history.push(PATH_EPS_EPARTNER_MANAGE);
    }

    const doSearch = pageNumber => {
        EPartnersPagingFrom = 1 + pageNumber * constants.PAGING_EPARTNERS_SIZE;
        EPartnersPagingTo = (EPartnersPagingFrom + constants.PAGING_EPARTNERS_SIZE > totalEPartners) ? totalEPartners : EPartnersPagingFrom + constants.PAGING_EPARTNERS_SIZE
        console.log("skipping : ", EPartnersPagingFrom - 1);
        getAllEPSReservations();
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
        setSelectedEPartner(null)
        setSelectedEPartnerToDelete(null)
        setSelectedEPartnerToEdit(null)
        getAllEPSReservations();
        document.body.style.overflow = "auto";
    };

    const onShowEditMenu = (row) => {
        setSelectedRowToEdit(row);
        console.log("Row to edit=", row);
    };



    const columns = [
        {
            name: '#',
            width: '50px'
        },
        {
            name: 'Partner Name',
            width: '350px'
        }, {
            name: 'partner ID',
            width: '80px'
        },
            {
            name: 'Status',
            width: '80px'
        },		
        {
            name: 'shared ids',
            width: '250px'
        },
        {
            name: 'connected',
            sortable: true,
            width: '150px'
        }, {
            name: 'pending',
            width: '150px'
        }, {
            name: 'disconnected',
            width: '150px'
        }/*, {
            name: 'uploading agent',
            width: '350px'
        }, {
            name: 'Person',
            width: '350px'
        }, {
            name: 'phone',
            width: '350px'
        }, {
            name: 'email',
            width: '350px'
        }, {
            name: 'provider',
            width: '150px'
        }, {
            name: 'Updated at',
            width: '300px'
        }
            */
    ];

    // selectedRowToEdit && console.log("pos: ", selectedRowToEdit.id, divRefs.current[selectedRowToEdit.id].getBoundingClientRect().top);
    // paging numbering:

    const handleSearchFuntionality = (name, value) => {
        console.log('set search:', name, value)
        setsearchInputes({ ...searchInputes, [name]: value })

    }
    const handlSearchButtonAdmin = () => {
        getSearchEPartners();
    }


    return (
        <div className="page-container">
            <div className="page-header">VT-Extranet : EPS Reservations</div>
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
{/*
                    <PageHeader
                        handleSearchFuntionality={handleSearchFuntionality}
                        searchInputes={searchInputes}
                        handlSearchButtonAdmin={handlSearchButtonAdmin}
                        searchOpen={null}
                        topBgColor="rgb(119, 198, 85)" />
*/}



                    <div className="agencies-main">
                        <div className="agencies-title">EPS Reservations
                            <div className="agencies-main-subtitle">Displaying EPS Reservations {EPartnersPagingFrom}-{EPartnersPagingTo} of {totalEPartners ? totalEPartners : "?"}
                            </div>
                        </div>
                        {<Paging perPage={constants.PAGING_EPARTNERS_SIZE} totalItems={localStorage.getItem("EpartnerCount")} currentPage={pageNumber} onChangePage={onChangePage} />}
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
                                    {EPartners?.map((item, index) => {


//External Partner API - By Jaison - 2025 July 24 - START
let connected_count = 0;
let disconnected_count = 0;
let pending_count = 0;
let shared_count = 0;

if (item?.ids && typeof item.ids === 'object') {
  // Iterate over the values of the object
  Object.values(item.ids).forEach((idObj) => {
    switch (idObj.status) {
      case 'connected':
        connected_count++;
        break;
      case 'disconnected':
        disconnected_count++;
        break;
      case 'pending':
        pending_count++;
        break;
      default:
        break;
    }
  });
}

shared_count = connected_count + disconnected_count + pending_count;

//External Partner API - By Jaison - 2025 July 24 - END

                                        //console.log("item ", index, item)
                                        return <>
                                            <tr >
                                                <td className="pmName px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4 >{totalEPartners - EPartnersPagingFrom - index + 1}</h4></td>
                                                <td className="pmName px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4 >{item.partnerName != null ? item.partnerName : ""}</h4></td>
                                                <td className="accountId px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 >{item.partnerId !== null ? item.partnerId : ""}</h4></td>

<td className="px-4 p-3 text-primary cst-cursor"><h4>{item.status}</h4></td>

<td className="Listings px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToEPartnerReservations(item, item.partnerId)}>{/*item.count?.shared ? item.count?.shared : "No listings"*/}{shared_count}</h4></td>
<td className="VT provider px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToEPartnerReservations(item, item.partnerId)}>{/*item.count?.approved*/}{connected_count}</h4></td>
<td className="SH provider px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToEPartnerReservations(item, item.partnerId)}>{/*item.count?.pending*/}{pending_count}</h4></td>
<td className="SH provider px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToEPartnerReservations(item, item.partnerId)}>{/*item.count?.declined*/}{disconnected_count}</h4></td>
                                                
                                                {/*<td className="SH provider px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4>{item?.agent}</h4></td>
                                                <td className="contactName px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4 >{item.contactName != null ? item.contactName : ""}</h4></td>
                                                <td className="pmPhone px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4>{item.pmPhone != null ? item.pmPhone : ""}</h4></td>
                                                <td className="email px-4 p-3  text-primary text-decoration-underline cst-cursor" ><h4 >{item.email != null ? item.email : ""}</h4></td>
                                                <td className="provider px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 >{item.provider !== null ? item.provider : ""}</h4></td>
                                                <td className="Updated px-4 p-3"><h4>{item.updatedAt !== null && item.updatedAt !== "" ? item.updatedAt.slice(0, 10) : ""}</h4></td>
                                                <td className="clientId px-4 p-3 text-primary text-decoration-underline cst-cursor"><h4 onClick={() => GoToEPartnerReservations(item, item.partnerId)}>{item.partnerId ? "" : item.partnerId ? item.partnerId : ""}</h4>
                                                </td>
                                                */}
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

export default EPartners;
