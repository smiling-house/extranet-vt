import React, { useCallback, useEffect, useState } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, } from "@mui/material"
import Popup from "../../components/Popup/index.js";
import Button from "../../components/Buttons/Button/Button"
import pageBg from '../../assets/bk_pool.png'
import { data } from "./makeData.js"
import axios from "axios"
import PageHeader from "../../components/PageHeader"
import { useLocation, useHistory } from "react-router-dom";

import "./EListings.scss"
import Paging from "../../components/Paging"
import constants from "../../Util/constants"
import { BsChevronDown } from "react-icons/bs"

import AuthService from "../../services/auth.service"
import swal from "sweetalert"
import LoadingBox from "../../components/LoadingBox"

import Sidebar from "../../components/Sidebar";
import EPSListingrow from "./row/EPSlistingRow"

import dayjs from 'dayjs'

import menuIcon from '../../assets/icons8-menu-50.png'
import * as userActions from "../../store/redux/User/actions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import {
	
	APP_DISPLAY_NAME,
	PATH_LOGIN
} from "../../Util/constants.js";

const EPartnerReservationsProperties = (props) => {
    const dispatch = useDispatch();	
    const {agent, agency, token, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props
    const [refresh, setRefresh] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [onlyConnected, setOnlyConnected] = useState(false)
    const [onlyDisConnected, setOnlyDisConnected] = useState(false)
    const [onlyPending, setOnlyPending] = useState(false)





//Added by Jaison for this new component - START
const [totalReservation, setTotalReservation] = useState(0);
const [reservations, setReservations] = useState([]);
const [epartner_id_reservations, setEpartner_id_reservations] = useState('');

const Epartner = JSON.parse(localStorage.getItem("EpartnerReservation"));
// const partnerId = Epartner.partnerId;

const agentLoggedIn = JSON.parse( localStorage.getItem('agent') );
const agentData = JSON.parse( localStorage.getItem('agent') );
const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');

const [onReservationStatusChange, setOnReservationStatusChange] = useState(false);
const [onCancelReservation, setOnCancelReservation] = useState(false);
const [selectedReservations, setSelectedReservations] = useState(null);

    const [updateStatusProcess, setUpdateStatusProcess] = useState(0);
    const [propStatus, setPropStatus] = useState('');
    
    const [decliningReason, setDecliningReason] = useState('');
    const [decliningReasonOther, setDecliningReasonOther] = useState('');
    const [actualDecliningReason, setActualDecliningReason] = useState('');

        const [checkedAll, setCheckedAll] = useState(false);
    

    const [filterPropertyStatus, setFilterPropertyStatus] = useState('');
    const filterByPropertyStatus = (event) => {
        console.log(event.target.value)
        setFilterPropertyStatus(event.target.value);

        unCheckAll();
        setCheckedAll(false)        
    }



const checkAll = () => {
        document.querySelectorAll('input[name="reservation_ids_to_update[]"]').forEach(checkbox => {
            checkbox.checked = true;
        });       
}
const unCheckAll = () => {
        document.querySelectorAll('input[name="reservation_ids_to_update[]"]').forEach(checkbox => {
            checkbox.checked = false;
        });  
}

const checkUncheckAll = () => {

    if(checkedAll===false) {

        checkAll();
        setCheckedAll(true)

    }

    if(checkedAll===true) {

        unCheckAll();
        setCheckedAll(false)

    }

}    


    async function updateSelectedListingsStatus() {
return; //This function is not in use. Delete this later if not required       

if(propStatus==='Declined' && decliningReason==='') {

    swal({
        show: true,
        icon: 'error',
        title: 'Choose the reason for declining!',
        text: ''
    });
        
    return false;
}
        

if(propStatus==='Declined' && decliningReason==='Other' && decliningReasonOther.trim()==='') {

    swal({
        show: true,
        icon: 'error',
        title: 'Enter the other reason for declining!',
        text: ''
    });
        
    return false;
}


let reason_decline = '';
if(propStatus==='Declined') {
    if(decliningReason==='Other') {
        reason_decline = decliningReasonOther
    } else {
        reason_decline =  decliningReason 
    }
} 





        const checkboxes = document.querySelectorAll('input[name="reservation_ids_to_update[]"]:checked');
        const reservationIdsToUpdate = Array.from(checkboxes).map(cb => cb.value);

if(propStatus==='Approved') {

    /*
    let unmapped_properties = 0;
    reservationIdsToUpdate.forEach((id) => {
    if(id.includes('unmapped')) {
        unmapped_properties++;
    }
    });

    if(unmapped_properties > 0) {

        swal({
            show: true,
            icon: 'error',
            title: 'One or more selected properties have unmapped region!. Please map them first before approving',
            text: ''
        })   
        
        return false;
        
    }
    */

}        




        const reservationDataToUpdate = {'reservationID':reservationIdsToUpdate, 'status':propStatus, decliningReason:reason_decline, statusUpdatedBy:agentData.firstName}



        if(reservationDataToUpdate.length > 0 && propStatus !== '') {
            const ShubResponse = await userRequest.post(constants.SHUB_URL+'/local/listings/update-multiple-listings-status11', reservationDataToUpdate);

            if(ShubResponse.data.success === true) {


                swal({
                    show: true,
                    icon: 'success',
                    title: ShubResponse.data.message,
                    text: ShubResponse.data.message
                });
                
                setUpdateStatusProcess( updateStatusProcess + 1 ); //No efefct inside useEffect. So added the below line to run the function to refresh page
                getAllListings();
                
            } else {
                swal({
                    show: true,
                    icon: 'error',
                    title: ShubResponse.data.message,
                    text: ShubResponse.data.message
                })                
            }
        }

      } 
    
//Added by Jaison for this new component - END


    //const EpartnerIds = JSON.parse(localStorage.getItem("EpartnerIds"));
        
    //const [filteredIds, setFilteredIds] = useState(EpartnerIds)

    const [slicedIds, setSlicedIds] = useState({})
    

    const [selectedCollections, setSelectedCollections] = useState([])
    const [selectedChannels, setSelectedChannels] = useState([])
    // const agent = JSON.parse(localStorage.getItem("agent"));
    // const agency = JSON.parse(localStorage.getItem("travelAgency"));
    let searchParms = {}
    const [searchInputes, setsearchInputes] = useState({
    })
    const history = useHistory();
    const location = useLocation(); 



    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [tableData, setTableData] = useState(() => data)
    // state for Listings
    const [listings, setListings] = useState([])
    const [isRefresh, setIsRefresh] = useState(false)
    const [filterChannel, setFilterChannel] = useState([])
    //modal state
    const [modalData, setModalData] = useState({
        title: "Add new Client",
    })
    const [filterListings, setFilterListings] = useState()
    const [searchListings, setSearchListings] = useState("")
    const [pageNumber, setPageNumber] = useState(0)
    
const [count, setCount] = useState(0); // useState((onlyDisConnected||onlyConnected)?filteredIds.length:Epartner.ids?.length) //Recheck this


useEffect(() => {
    setEpartner_id_reservations(localStorage.getItem('epartner-id-reservations'));
}, []);






    const toggleFilterChannel = (channel) => {
        var newFilters = filterChannel// saving the currentXdata

        if (newFilters.findIndex((i) => i === channel) > -1) {
            console.log('remove channel from filterChannel', channel)
            newFilters.filter((f) => f !== channel) // remove from filter channel list
        } else { //add to channel or channel to xdata tags
            newFilters = [...newFilters, channel]
        }
        console.log("after:", newFilters)
        setFilterChannel(newFilters)
        handleSearchListings('channels', newFilters)

    }


    const doSearch = pageNumber => {
        getAllListings()
    }

    let clientPagingFrom = 1 + pageNumber * constants.PAGING_LISTING_SIZE
    let clientPagingTo = (pageNumber + 1) * constants.PAGING_LISTING_SIZE

    const onChangePage = pageNumber => {
        console.log("going to page=", pageNumber)
        setPageNumber(pageNumber)
        clientPagingFrom = 1 + pageNumber * constants.PAGING_LISTING_SIZE
        clientPagingTo = (pageNumber + 1) * constants.PAGING_LISTING_SIZE
        if (count<clientPagingTo) {clientPagingTo=count}
        doSearch(pageNumber)
    }

    const handleCreateNewRow = (values) => {
        tableData.push(values)
        setTableData([...tableData])
    }

    const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g'

    const userRequest = axios.create({
        headers: {
            'x-api-key': 'swwSK4tqWyYHP4GvRF7qHNOoSGVs7nwSekPKyLQD'
            // Authorization: `Bearer ${token2}`
            // Authorization: `Bearer ${Epartner.bearerToken}`
        }
    })

    const getAllListings = async () => {


        // Slicing the JSON
const limit = constants.PAGING_LISTING_SIZE; // Number of items to take
const skip = clientPagingFrom-1;  // Number of items to skip
        // filter=pending&sortBy=startDate:desc
        const params= {
            // limit: constants.PAGING_LISTING_SIZE, 
            // skip: 0,
            // filter: 'pending',
            sortBy: 'startDate:desc'
        }
    
    console.log('getting from /listings:',params)
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join("&")

    if (true) {
        const shubSearch=constants.SHUB_URL+'/eps/get-all-reservations'+'?';
        console.log(`get ${shubSearch}${queryString}`)
        setIsLoading(true)
        userRequest.get(`${shubSearch}${queryString}`).then(async response => {
            setIsLoading(false)
            if (response) {
               
    console.log("::::response.data.reservations::::",response.data.reservations)
                
    if(response?.data?.totalReservation) {
        setTotalReservation(response?.data?.totalReservation);
    }
    if(response?.data?.reservations) {
        setReservations(response?.data?.reservations);

    }
                
                if (response?.data?.error) {
                    swal({
                        show: true,
                        icon: 'error',
                        title: 'Opps!!',
                        text: response?.data?.error
                    })
                } else {
                
                /*
                setListings(response.data?.listings)
                setCount(Epartner.count?.shared)
                setFilterListings(response.data?.listings)
                localStorage.setItem("count", response?.data?.count)
                */

// console.log(':::::partnerId:::::', partnerId)
console.log(':::::reservations:::::',reservations)
return                

                   // console.log('props loaded on offset:',clientPagingFrom,response.data?.listings)
                    setRefresh(true)
                }
            }
        }).catch(response => {
            swal({
                show: true,
                icon: 'error',
                title: 'Opps!!',
                text: "No Data Found"
            })
        })
    }
}





 useEffect(() => {
     console.log("useEffect 2 - refresh!:",refresh)

     getAllListings()
//     setRefresh(false)

 }, [refresh,isRefresh,epartner_id_reservations])


 useEffect(() => {
     console.log("useEffect First time")

     getAllListings()

 }, [])



 const handleOnlyConnected = () => {
    setOnlyConnected(true);
    setOnlyDisConnected(false);
    // Filtering the ids where status is 'connected'
    const connectedIds = Object.entries(Epartner.ids).filter(([key, value]) => value.status === "connected");
    const transformedData = Object.fromEntries(
    Object.values(connectedIds).map(([id, details]) => [id, details])
  );
    console.log('transformedData:::', transformedData)      
    
    if( !Object.keys(transformedData).length ) {
        //setFilteredIds({})
    } else {
        //setFilteredIds(transformedData);
    }    
    
    //console.log("Only Connected",transformedData)
    getAllListings();
}

const handleAllStatuses = () => {
    setOnlyConnected(false);
    setOnlyDisConnected(false);
    //setFilteredIds(Epartner.ids)
    console.log("All ids ")

}

const handleOnlyDisConnected = () => {
    setOnlyConnected(false);
    setOnlyDisConnected(true);
    // Filtering the ids where status is 'disconnected'
    const disconnectedIds = Object.entries(Epartner.ids).filter(([key, value]) => value.status === "disconnected");
    const transformedData = Object.fromEntries(
        Object.values(disconnectedIds).map(([id, details]) => [id, details])
      );
console.log('transformedData:::', transformedData)  

    if( !Object.keys(transformedData).length ) {
        //setFilteredIds({})
    } else {
        //setFilteredIds(transformedData);
    }

    console.log("Only Disconnected",transformedData)

}

const handleOnlyPending = () => {
    setOnlyConnected(false);
    setOnlyDisConnected(true);
    // Filtering the ids where status is 'disconnected'
    const disconnectedIds = Object.entries(Epartner.ids).filter(([key, value]) => value.status === "pending");
    const transformedData = Object.fromEntries(
        Object.values(disconnectedIds).map(([id, details]) => [id, details])
      );
console.log('transformedData:::', transformedData)  

    if( !Object.keys(transformedData).length ) {
        //setFilteredIds({})
    } else {
        //setFilteredIds(transformedData);
    }

    console.log("Only Pending",transformedData)

}

const handleSearchListings = (name, value) => {
    setsearchInputes({ ...searchInputes, [name]: value })
    console.log("search req:", searchInputes)
}


const handleSearchButton = () => {
    handleSearchListings('accountId', Epartner.accountId)
    searchInputes.accountId = Epartner.accountId
    if (searchInputes.q) {
        console.log('searching listings per q :', searchInputes.q, 'accountId:', Epartner.accountId)
        delete searchInputes.id
        delete searchInputes.filters
        delete searchInputes.accountId
    } else
        if (searchInputes.id) { // on id remove the accountId search
            if (searchInputes.id) {

                searchInputes.filters = '[{"field":"ids", "operator":"$in", "value": ["' + searchInputes.id + '"]}]'
                delete searchInputes.id
                delete searchInputes.accountId
                delete searchInputes.q
                console.log('searching listings per id:', searchInputes)
            } else {
                delete searchInputes.filters
                delete searchInputes.id
            }
        }

    console.log("pressed search button:", searchInputes)
    AuthService.trianglLuxuryApi(searchInputes).then((response) => {
        if (response) {
            setListings(response.listings)
            console.log('search results:', response)
            if (response.listings.length === 0) {
                swal({
                    show: true,
                    icon: 'error',
                    title: 'Opps!!',
                    text: "No Data Found"
                })
            }
        }
    }).catch((e) => {
        console.log(e)
    })
}


const headerSearchRow = () => {

//External Partner API - By Jaison - 2025 August 13 - END
let connected_count = 0;
let disconnected_count = 0;
let pending_count = 0;
let shared_count = 0;



shared_count = connected_count + disconnected_count + pending_count;
//External Partner API - By Jaison - 2025 August 13 - END

/*
    const connectedButton=`${Epartner.count?.connected} connected`
    const disconnectedButton=`${Epartner.count?.disconnected} disconnected`
    const allButton=`${Epartner.count?.shared} ALL`
*/
    const connectedButton=`${connected_count} connected`
    const disconnectedButton=`${disconnected_count} disconnected`
    const pendingButton=`${pending_count} pending`
    const allButton=`${shared_count} ALL`

    return (
        <div className="container-fluid px-3 py-3">
            <div className="row g-3">
                {/* Search Inputs */}
                <div className="col-12 col-md-6 col-lg-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Property name / Nick name" 
                        onChange={(e) => handleSearchListings("q", e.target.value)}
                        style={{height: '45px'}}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter property id" 
                        onChange={(e) => handleSearchListings("id", e.target.value)}
                        style={{height: '45px'}}
                    />
                </div>
                <div className="col-12 col-sm-6 col-lg-2">
                    <Button 
                        style={{ 
                            height: '45px', 
                            width: '100%', 
                            fontSize: '14px', 
                            borderRadius: '5px' 
                        }} 
                        variant="green" 
                        text="Search" 
                        onClick={handleSearchButton} 
                    />
                </div>
                
                {/* Status Buttons */}
                <div className="col-6 col-sm-4 col-lg-2">
                    <Button 
                        style={{ 
                            height: '45px', 
                            width: '100%', 
                            fontSize: '12px', 
                            borderRadius: '5px' 
                        }} 
                        variant={onlyConnected ? "blue" : "green"} 
                        text={`${connected_count} Connected`} 
                        onClick={handleOnlyConnected} 
                    />
                </div>
                <div className="col-6 col-sm-4 col-lg-2">
                    <Button 
                        style={{ 
                            height: '45px', 
                            width: '100%', 
                            fontSize: '12px', 
                            borderRadius: '5px' 
                        }} 
                        variant={onlyDisConnected ? "blue" : "green"} 
                        text={`${disconnected_count} Disconnected`} 
                        onClick={handleOnlyDisConnected} 
                    />
                </div>
                <div className="col-6 col-sm-4 col-lg-3">
                    <Button 
                        style={{ 
                            height: '45px', 
                            width: '100%', 
                            fontSize: '12px', 
                            borderRadius: '5px' 
                        }} 
                        variant={onlyPending ? "blue" : "green"} 
                        text={`${pending_count} Pending`} 
                        onClick={handleOnlyPending} 
                    />
                </div>
                <div className="col-6 col-lg-3">
                    <Button 
                        style={{ 
                            height: '45px', 
                            width: '100%', 
                            fontSize: '12px', 
                            borderRadius: '5px' 
                        }} 
                        variant={!onlyDisConnected && !onlyConnected ? "blue" : "green"} 
                        text={`${shared_count} ALL`} 
                        onClick={handleAllStatuses} 
                    />
                </div>
            </div>
        </div>
    )

    // return ( 
    //     <div className="listings-search-container row">
    //         <div className="col-sm-2">
    //             <input type="text" className="listings-search-input form-control" placeholder="Property name / Nick name" onChange={(e) => handleSearchListings("q", e.target.value)} />
    //         </div>
    //         <div className="col-sm-2">
    //             <input type="text" className="listings-search-input form-control" placeholder="Enter property id" onChange={(e) => handleSearchListings("id", e.target.value)} />
    //         </div>
    //         <div className="col-sm-1">
    //             <Button style={{ height: '60px', width: '120px', fontSize: '15px', borderRadius: '5px' }} variant="green" text="Search" onClick={handleSearchButton} />
    //         </div>
    //         <span className="listings-search-separator" />
    //         <div className="col-sm-2">
    //             <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={onlyConnected?"blue":"green" } text={connectedButton} onClick={handleOnlyConnected} />
    //         </div>
    //         <div className="col-sm-2">
    //             <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={onlyDisConnected?"blue":"green" } text={disconnectedButton} onClick={handleOnlyDisConnected} />
    //         </div>
    //         <div className="col-sm-2">
    //             <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={onlyPending?"blue":"green" } text={pendingButton} onClick={handleOnlyPending} />
    //         </div>            
    //         <div className="col-sm-2">
    //             <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={!onlyDisConnected&&!onlyConnected?"blue":"green" } text={allButton} onClick={handleAllStatuses} />
    //         </div>
    //     </div>
    // )
}

const columns = [
    /* {
        id: 'checkBox',
        name: '',
    }, */    
    {
        id: 'PartnerName',
        name: 'Partner Name',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    }, {
        id: 'PropertyName',
        name: 'Property Name',
        sortable: true,
        width: '1fr'
    }, {
        id: 'PropertyID',
        name: 'Property ID',
        sortable: true,
        selector: row => row.nick,
        cell: row => <div>{row.nickName}</div>,
        width: '1fr'
    },   {
        id: 'Start Date',
        name: 'StartDate',
        sortable: true,
        selector: row => row.nick,
        cell: row => <div>{row.nickName}</div>,
        width: '250px'
    }, {
        id: 'End Date',
        name: 'EndDate',
        sortable: true,
        selector: row => row.phone,
        cell: row => <div>{row.phone}</div>,
        width: '200px'
    }, {
        id: 'Curreny',
        name: 'Curreny',
        width: '1fr',
        headerStyle: { backgroundColor: '#F5F5F2' },
        sortable: true,
        selector: row => row.offers,
        width: '450px'
    }, {
        id: 'GuestEmail',
        name: 'Guest Details',
        headerStyle: { backgroundColor: '#F5F5F2' },
        sortable: true,
        selector: row => row.savedSearch,
        width: '150px'
    },
    {
        id: 'guestBookingStatus',
        name: 'Guest Booking Status',
        headerStyle: { backgroundColor: '#F5F5F2' },
        sortable: true,
        selector: row => row.savedSearch,
        width: '150px'
    }
    
]

let totalListings = count
const ListingsPagingFrom = 1 + pageNumber * constants.PAGING_LISTING_SIZE
let ListingsPagingTo = (pageNumber + 1) * constants.PAGING_LISTING_SIZE
if (totalListings < ListingsPagingTo) {
    ListingsPagingTo = totalListings
}





  const handleStatusButton = async(epartnerSharedId,connected) => {


    //Need to verify and correct this ***
    const updateEpartnerShareData = Epartner.ids
    const newStatus=connected?'connected':'disconnected'   
    updateEpartnerShareData[epartnerSharedId].status = newStatus
    const data = {id: epartnerSharedId, status:newStatus}
    // console.log('partnerId : ' + partnerId)
    console.log('epartnerSharedId: ' + epartnerSharedId, connected?'connect it!':'disconnect it!')
    console.log('ids to update:',data)
    setIsLoading(true)
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/eps/update-external-partner-id-status/`, data)
    console.log('res:',ShubResponse)
    if (ShubResponse.data?.success) {
        await swal({
            show: true,
            title: ` ${epartnerSharedId}: changed status to ${updateEpartnerShareData[epartnerSharedId].status}` ,
            text: `ID:${epartnerSharedId}`,
            icon:  "success" ,
            timer: 10000
        })
    } else {
        await swal({
            show: true,
            title: ` ${epartnerSharedId}: could not changed status to ${updateEpartnerShareData[epartnerSharedId].status}` ,
            text: `ERROR:${JSON.stringify(ShubResponse.data?.errors)}`,
            icon:  "error" ,
            timer: 10000
        }) 
    }
    setIsLoading(false)
    /*
    Epartner.ids = updateEpartnerShareData
    Epartner.count.connected+=(connected?1:-1)
    Epartner.count.disconnected-=(connected?1:-1)
    localStorage.setItem("Epartner", JSON.stringify(Epartner))
    */
    doSearch()
  }


  const changeReservationStatus = (status, reservation) => {
    setOnReservationStatusChange(status)
    setSelectedReservations(reservation)
  }
  const onCloseResStatus = () => {
    // update reservation status here to declined.....
    // then change the state to hide popup.....
    setOnReservationStatusChange(false)
    setOnCancelReservation(false)

    setSelectedReservations(null)
  }
  const onSubmitResStatus = () => {
    // update reservation status here to approved.....
    // then change the state to hide popup.....
    setOnReservationStatusChange(false)
    setSelectedReservations(null)
  }


  const cancelReservation = (status, reservation) => {
    setOnCancelReservation(status)
    setSelectedReservations(reservation)
  }  

//Copied from VT-Front\src\pages\Reservations\EditReservation\index.js
  const handleResConfirmation = async (reservationData) => {    

//const reservationUniqueID = `EPS-VT-TEST_${reservationData?.reservationID}`; //Testing
const reservationUniqueID = `EPS-VT_${reservationData?.reservationID}`; //LIVE


    let data = JSON.stringify({
      "client": {
        "firstName": reservationData?.guestFirstName,
        "lastName": reservationData?.guestLastName,
        "phone": reservationData?.guestPhoneNumbers,
        "email": reservationData?.guestEmail
      },
      "dateFrom": dayjs(reservationData?.startDate).format("MM.DD.YYYY"),
      "dateTo": dayjs(reservationData?.endDate).format("MM.DD.YYYY"),
      "currency": reservationData?.currency,
      "numberOfGuests":reservationData.numberOfGuests,
      "adults": reservationData?.adults,
      "children": reservationData?.children,
      "resChannel": "VT",
      "reservationId": reservationUniqueID,
      "ResStatus": "Commit"
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: constants.SHUB_URL+'/reserve/' + reservationData?.propertyId + '?reservation_request_from=eps',
      headers: {
        'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c',
        //'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjY4YmMwNzA0NjBjMGU1NGYxOWU3NjVjIiwiYXBwbGljYXRpb25JZCI6IjY0NDkxMWJlMjEwN2Q3MDAyMWZmZGM4MSIsImFjY291bnRJZCI6IjY0MDYyNWVhMDYyMGU0MDAzMWI4NTk3ZCIsImlzcyI6InByb2R1Y3Rpb24uZ3Vlc3R5LmNvbSIsIm5hbWUiOiJhcHBsaWNhdGlvbiIsInJvbGUiOiJ1c2VyIiwidXNlclJvbGVzIjpbeyJyb2xlSWQiOnsicGVybWlzc2lvbnMiOlsibGlzdGluZy52aWV3ZXIiXX19XSwicmVxdWVzdGVyIjoiT1RBQGd1ZXN0eS5jb20iLCJpYXQiOjE3MjA0MzQ4MDB9.OyVIohRJRwoYGENJY0NtVV65ouxh5iHBSkDSSbs-VFI',
        'Account-Id': '640625ea0620e40031b8597d',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then(async (response) => {
        console.log('RESPONSE:::', response);
        console.log('RESPONSE DATA:::', response.data);
        console.log('RESPONSE DATA STRINGIFY:::', JSON.stringify(response.data));
        if (response.data.success) { 

            console.log('RESERVATION/BOOKING SUCCESS!');
            console.log('reservationUniqueID:::', reservationUniqueID);            

            //update VTHUB db status,agent,reservationUniqueID in collection eps_reservations
            const response = await AuthService.updateReservationStatus(reservationData, 'approved', agentData.firstName, reservationUniqueID);
            //console.log('response.data from VTHUB:::', response.data)    

            //swal
            if(response.success) {
                //swal("success", "Reservation is approved! " + response.data.message, "success");
                swal({
                    show: true,
                    title: 'Success',
                    text: "Reservation is approved! " + response.message + ' (RESERVATION ID : '+reservationUniqueID+')',
                    icon: "success"
                })
                
                //re-render this page here
                getAllListings();
                
            } else {
                //swal("error", response.data.message, "error");
                console.log('ERROR 1:::', response.error)
                console.log('response.data.message 1:::', response.data.message)
                swal({
                    show: true,
                    title: 'Error',
                    text: response.message,
                    icon: "error"
                })                
            }                    

            //reload
            
        } else {
           // swal("error", 'Guesty reservation failed!', "error");
            console.log('ERROR 2:::', response.error)
            console.log('response.data.message 2:::', response.data.message)           
            swal({
                show: true,
                title: 'Error',
                text: 'Reservation failed! ' + response.data.message,
                icon: "error"
            })            
        }

      })
      .catch((error) => {
        console.log('error RES:', error);
      });



    /*
    const response = await AuthService.updateReservationStatus(reservationData, 'approved', agentData.firstName);
    console.log(response);
    swal("Success", "Reservation is approved", "success");
    // } catch (error) {
    //   console.error("Error confirming reservation:", error);
    //   swal("Error", "Failed to approve reservation", "error");
    // }    
    onClose();
    */

  }

  
    const handleResDecline = async (reservationData) => {

        
            const response = await AuthService.declineReservation(reservationData, 'declined', agentData.firstName);
            //console.log('response.data from VTHUB:::', response.data)    
                
            //swal
            if(response.success) {
                //swal("success", , "success");
                swal({
                    show: true,
                    title: 'Success',
                    text: "Reservation has been declined! " + response.message,
                    icon: "success"
                })      
                
                //re-render this page
                getAllListings();

            } else {
                //swal("error", response.data.message, "error");
                swal({
                    show: true,
                    title: 'Error',
                    text: response.message,
                    icon: "error"
                })                
            }         
        
    }



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

const handleResCancellation = async (reservationData) => { 
    if(window.confirm('Are you sure you want to cancel this reservation? ' + reservationData.reservationUniqueID)) {

const reservationUniqueID = reservationData?.reservationUniqueID

  if(!reservationUniqueID) {
        swal({
        show: true,
        title: 'Error',
        text: 'reservationUniqueID can not be empty!',
        icon: "error"
    })

    return false;
  }


    let data = JSON.stringify({
      "client": {
        "firstName": reservationData?.guestFirstName,
        "lastName": reservationData?.guestLastName,
        "phone": reservationData?.guestPhoneNumbers,
        "email": reservationData?.guestEmail
      },
      "dateFrom": dayjs(reservationData?.startDate).format("MM.DD.YYYY"),
      "dateTo": dayjs(reservationData?.endDate).format("MM.DD.YYYY"),
      "currency": reservationData?.currency,
      "numberOfGuests":reservationData.numberOfGuests,
      "adults": reservationData?.adults,
      "children": reservationData?.children,
      "resChannel": "VT",
      "reservationId": reservationUniqueID,
      "ResStatus": "Cancel"
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: constants.SHUB_URL+'/reserve-cancel/' + reservationData?.propertyId + '?reservation_request_from=eps',
      headers: {
        'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c',
        //'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjY4YmMwNzA0NjBjMGU1NGYxOWU3NjVjIiwiYXBwbGljYXRpb25JZCI6IjY0NDkxMWJlMjEwN2Q3MDAyMWZmZGM4MSIsImFjY291bnRJZCI6IjY0MDYyNWVhMDYyMGU0MDAzMWI4NTk3ZCIsImlzcyI6InByb2R1Y3Rpb24uZ3Vlc3R5LmNvbSIsIm5hbWUiOiJhcHBsaWNhdGlvbiIsInJvbGUiOiJ1c2VyIiwidXNlclJvbGVzIjpbeyJyb2xlSWQiOnsicGVybWlzc2lvbnMiOlsibGlzdGluZy52aWV3ZXIiXX19XSwicmVxdWVzdGVyIjoiT1RBQGd1ZXN0eS5jb20iLCJpYXQiOjE3MjA0MzQ4MDB9.OyVIohRJRwoYGENJY0NtVV65ouxh5iHBSkDSSbs-VFI',
        'Account-Id': '640625ea0620e40031b8597d',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then(async (response) => {
        console.log('RESPONSE DATA:::', response.data);
        console.log('RESPONSE DATA STRINGIFY:::', JSON.stringify(response.data));
        if (response.data.success) { 

            console.log('CANCELLATION SUCCESS!');
            console.log('reservationUniqueID:::', reservationUniqueID)

            //update VTHUB db status,agent,reservationUniqueID in collection eps_reservations
            const response = await AuthService.updateReservationStatus(reservationData, 'cancelled', agentData.firstName, reservationUniqueID);
            //console.log('response.data from VTHUB:::', response.data)    

            //swal
            if(response.success) {
                //swal("success", "Reservation is approved! " + response.data.message, "success");
                swal({
                    show: true,
                    title: 'Success',
                    text: "Cancellation is done! " + response.message + ' (RESERVATION ID : '+reservationUniqueID+')',
                    icon: "success"
                })
                
                //re-render this page here
                getAllListings();
                
            } else {
                //swal("error", response.data.message, "error");
                swal({
                    show: true,
                    title: 'Error',
                    text: response.message,
                    icon: "error"
                })                
            }                    

            //reload
            
        } else {
           // swal("error", 'Guesty reservation failed!', "error");
            swal({
                show: true,
                title: 'Error',
                text: 'Cancellation failed!',
                icon: "error"
            })            
        }

      })
      .catch((error) => {
        console.log('error RES:', error);
      });


    }
}

return (
    
    // <div className="page-container">
        
    //     {/* <div className="page-header">{APP_DISPLAY_NAME} - EPartner Reservation Properties</div> */}
    //     <div className="page-header" style={{
    //         marginLeft: showSideBarMenu ? '250px' : '0',
    //         transition: 'margin-left 0.3s ease',
    //         // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //         background: 'linear-gradient(135deg, #104109 0%, #2d5a2b 100%)',
    //         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    //         borderBottom: '1px solid rgba(255,255,255,0.1)'
    //     }}>
    //         <div className="container-fluid" style={{padding: '0px 50px'}}>
    //             <div className="row align-items-center py-3">
    //                 {/* Left Section - Menu & Title */}
    //                 <div className="col-lg-8 col-md-7 col-sm-8 col-6">
    //                     <div className="d-flex align-items-center">
    //                         <button 
    //                             className="btn btn-link p-0 me-3 text-white border-0"
    //                             onClick={showOrHideSideBarMenu}
    //                             style={{
    //                                 background: 'none',
    //                                 fontSize: '1.2rem',
    //                                 transition: 'transform 0.2s ease'
    //                             }}
    //                             onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
    //                             onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
    //                         >
    //                             <img 
    //                                 src={menuIcon} 
    //                                 alt="Menu" 
    //                                 style={{
    //                                     width: '28px',
    //                                     height: '28px',
    //                                     filter: 'brightness(0) invert(1)'
    //                                 }} 
    //                             />
    //                         </button>
                            
    //                         <div className="header-title">
    //                             <h1 className="mb-0 text-white d-none d-md-block" style={{
    //                                 fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
    //                                 fontWeight: '600',
    //                                 letterSpacing: '-0.5px'
    //                             }}>
    //                                 <span className="d-none d-sm-inline">{APP_DISPLAY_NAME} : </span>
                                    
    //                                 <span className="d-none d-md-inline"> - {agentData.firstName}</span>
    //                             </h1>
                                
    //                             {/* Mobile-only welcome message aligned with menu button */}
    //                             <div className="d-md-none d-flex align-items-center">
    //                                 <span className="text-white" style={{
    //                                     fontSize: '1.1rem',
    //                                     fontWeight: '500',
    //                                     lineHeight: '28px' // Matches menu button height for alignment
    //                                 }}>
    //                                     Welcome, {agentData.firstName}
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
                    
    //                 {/* Right Section - User Actions */}
    //                 <div className="col-lg-4 col-md-5 col-sm-4 col-6">
    //                     <div className="d-flex justify-content-end align-items-center">
    //                         {/* User Info - Hidden on small screens */}
    //                         <div className="d-none d-lg-flex align-items-center me-3">
    //                             <div className="user-avatar me-2" style={{
    //                                 width: '35px',
    //                                 height: '35px',
    //                                 borderRadius: '50%',
    //                                 background: 'rgba(255,255,255,0.2)',
    //                                 display: 'flex',
    //                                 alignItems: 'center',
    //                                 justifyContent: 'center',
    //                                 color: 'white',
    //                                 fontWeight: 'bold',
    //                                 fontSize: '14px'
    //                             }}>
    //                                 {agentData.firstName.charAt(0).toUpperCase()}
    //                             </div>
    //                             <div className="text-white">
    //                                 <div style={{fontSize: '14px', fontWeight: '500'}}>
    //                                     {agentData.firstName}
    //                                 </div>
    //                                 <div style={{fontSize: '12px', opacity: '0.8'}}>
    //                                     {extranet_vt_logged_in_role === 'admin' ? 'Administrator' : 'Partner'}
    //                                 </div>
    //                             </div>
    //                         </div>
                            
    //                         {/* Sign Out Button */}
    //                         <button
    //                             className="btn btn-outline-light btn-sm"
    //                             onClick={signOut}
    //                             style={{
    //                                 borderRadius: '25px',
    //                                 padding: '8px 20px',
    //                                 fontSize: '14px',
    //                                 fontWeight: '500',
    //                                 border: '2px solid rgba(255,255,255,0.3)',
    //                                 transition: 'all 0.3s ease',
    //                                 backdropFilter: 'blur(10px)'
    //                             }}
    //                             onMouseOver={e => {
    //                                 e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
    //                                 e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
    //                             }}
    //                             onMouseOut={e => {
    //                                 e.currentTarget.style.background = 'transparent';
    //                                 e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
    //                             }}
    //                         >
    //                             <span className=" d-sm-inline">Sign Out</span>
    //                             <span className="d-sm-none">
    //                                 <i className="fas fa-sign-out-alt"></i>
    //                             </span>
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     {showSideBarMenu===true && (
    //         <Sidebar
    //             agency={agency}
    //             agent={agent}
    //             token={token}
    //             screenSize={screenSize}
    //             activeMenu={activeMenu}
    //             handleToggleMenu={handleToggleMenu}
    //             setActiveMenu={setActiveMenu}
    //             showOrHideSideBarMenu={showOrHideSideBarMenu}
    //         />
    //     )}
    //     <div className={showSideBarMenu ? `${"page-body"}` : "page-body-nomargin"} >
        <Layout
            pageTitle=""
            agency={agency}
            agent={agent}
            token={token}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
        >
            <div className="listings-container"
                style={{ backgroundImage: `url(${pageBg})` }}
            >
                <LoadingBox visible={isLoading} />
                <div>
                    <PageHeader 
                    PageHeader={true} 
                    doSearch={doSearch} 
                    handleSearchListings={handleSearchListings} 
                    searchOpen={true} 
                    topBgColor="rgb(119 198 85)">
                    </PageHeader>
                    {headerSearchRow()}
                </div>

                <div className="listings-main">
                    <div className="container-fluid px-3">
                        <div className="row mb-3">
                            <div className="col-12">
                                <div className="listings-title" style={{
                                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                    lineHeight: '1.4',
                                    wordBreak: 'break-word'
                                }}>
                                    {Epartner?.pmName ? Epartner?.pmName : ''} / 
                                    {Epartner?.contactName ? Epartner?.contactName : ''} / 
                                    {Epartner?.email ? Epartner?.email : ''} / 
                                    AccountID {Epartner?.accountId ? Epartner?.accountId : ''} / 
                                    Source: {Epartner?.source ? Epartner?.source : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="listings-title">
                        {Epartner?.pmName ? Epartner?.pmName : ''} /{Epartner?.contactName ? Epartner?.contactName : ''} / {Epartner?.email ? Epartner?.email : ''} / AccountID {Epartner?.accountId ? Epartner?.accountId : ''}/ source: {Epartner?.source ? Epartner?.source : ''}
                    </div> */}
                    {/* <div className="listings-paging">Displaying  {ListingsPagingFrom}-{ListingsPagingTo} of {totalListings ? totalListings : "?"} Reservations</div> */}
                    {/* Paging Info */}
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="listings-paging" style={{fontSize: '14px'}}>
                                Displaying {ListingsPagingFrom}-{ListingsPagingTo} of {totalListings || "?"} Reservations
                            </div>
                        </div>
                    </div>
                    {/* {<Paging perPage={constants.PAGING_LISTING_SIZE} totalItems={totalListings} currentPage={pageNumber} onChangePage={onChangePage} />} */}
                    <div className="row mb-3">
                        <div className="col-12">
                            <Paging 
                                perPage={constants.PAGING_LISTING_SIZE} 
                                totalItems={totalListings} 
                                currentPage={pageNumber} 
                                onChangePage={onChangePage} 
                            />
                        </div>
                    </div>

    {
        selectedReservations && (
            <Popup>
                <div className="approve-agent-container">
                    <div className="approve-agent-header">
                        <div className="approve-agent-title">Approving by Admin:</div>
                        <div className="approve-agent-sub-header">
                            <div>Main Agent : <b>{agentData.firstName}</b></div>
                            <div className="approve-agent-sub-header-separator" />
                            <div>Agency: <b>{agentData.agencyName}</b></div>
                        </div>
                    </div>

                    <div className="approve-agent-main">

                        <div class="row">
                            <div class="col-6">
                                <input type="button" class="btn btn-primary" value="Approve Reservation" onClick={()=>handleResConfirmation(selectedReservations)} />
                            </div>

                            <div class="col-6">
                                <input type="button" class="btn btn-danger" value="Decline Reservation" onClick={()=>handleResDecline(selectedReservations)} />
                            </div>                            
                        </div>

                    </div>

                    <div className="approve-agent-footer">
                        <Button
                            style={{ fontSize: '18px', marginRight: '30px' }}
                            variant="link"
                            text="Cancel"
                            onClick={onCloseResStatus}
                        />
                        {/* <Button
                            style={{ fontSize: '18px' }}
                            text="Confirm"
                            onClick={() => onSubmitResStatus(selectedReservations)}
                        /> */}
                    </div>
                </div>
            </Popup>
        )
    }



    {onCancelReservation &&
(
            <Popup>
                <div className="approve-agent-container">
                    <div className="approve-agent-header">
                        <div className="approve-agent-title">Cancelling Reservation by Admin:</div>
                        <div className="approve-agent-sub-header">
                            <div>Main Agent : <b>{agentData.firstName}</b></div>
                            <div className="approve-agent-sub-header-separator" />
                            <div>Agency: <b>{agentData.agencyName}</b></div>
                        </div>
                    </div>

                    <div className="approve-agent-main">

                        <div class="row">
                            <div class="col-12">
                                <input type="button" class="btn btn-danger" value="Cancel Reservation" onClick={()=>handleResCancellation(selectedReservations)} />
                            </div>                           
                        </div>

                    </div>

                    <div className="approve-agent-footer">
                        <Button
                            style={{ fontSize: '18px', marginRight: '30px' }}
                            variant="link"
                            text="Cancel"
                            onClick={onCloseResStatus}
                        />
                        {/* <Button
                            style={{ fontSize: '18px' }}
                            text="Confirm"
                            onClick={() => onSubmitResStatus(selectedReservations)}
                        /> */}
                    </div>
                </div>
            </Popup>
        )
    }

{/* extranet_vt_logged_in_role==='admin' &&
    <section>
<div style={{'padding':'10px', 'display':'flex', 'align-items':'center', 'row-gap':'20px', 'position':'sticky'}}>
    <div class="col-3">
        <label><strong>Change Selected Property Status:</strong></label>
        <select class="form-control" onChange={ (e) => setPropStatus(e.target.value) }>
            <option value="">-Select Status--</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
        </select>

            {propStatus==='Declined' &&
            <section>
            <label><strong>Select Declining Reason:</strong></label>
            <select class="form-control" onChange={ (e) => setDecliningReason(e.target.value)  }>
                <option value="">-Select Reason--</option>
                <option value="Reason 1">Reason 1</option>
                <option value="Reason 2">Reason 2</option>
                <option value="Other">Other</option>
            </select>
            </section>
            }

            {decliningReason==='Other' &&
            <section>
            <label><strong>Enter the other reason for declining:</strong></label>
            <input required type="text" class="form-control" onChange={ (e) => setDecliningReasonOther(e.target.value) }  />
            </section>
            }

    </div>
</div>

<div style={{'padding':'10px', 'display':'flex', 'align-items':'center', 'row-gap':'20px', 'position':'sticky'}}>
    <div class="col-3">
        <button class="btn btn-primary" onClick={updateSelectedListingsStatus}>Update Status</button>        
    </div>       
</div>

</section>
*/}



                    <div style={{ padding: '0 20px' }}>
                        <div class="table-responsive" style={{ overflow: "auto" }}>
                                <table class="table">
                                    <thead style={{ backgroundColor: "#f9f9f7" }} >
                                        <tr>
                                            {columns?.map((item, index) => {
                                                return <>
                                                    <th key={index} scope="col" className="p-4 " style={{ cursor: "pointer", width: item.width }}>{item.name} <BsChevronDown /></th>
                                                </>
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.map((item, index) => {
                                            //console.log("listing item:",index+1,item, Epartner.ids)
                                            console.log(item)
                                            const ApropertyId = item.reservationID
                                            // const fullCalendar = item.fullCalendar
                                            //find the status on the partner per id 
                                            // const EPSStatus = constants.AVAIL_STATUS.includes(
                                            //     Epartner.ids[ApropertyId]?.status?.toLowerCase()
                                            //   ) ?Epartner.ids[ApropertyId]?.status.toLowerCase():  '-'          
                                                //console.log('status:',ApropertyId,EPSStatus)
                                            return <>
                                                <tr>
                                                    {<EPSListingrow
                                                        handleStatusButton={handleStatusButton}
                                                        key={ApropertyId}
                                                        property={item.listing}
                                                        xdata={item.xdata}
                                                        agent={agent}
                                                        Epartner={Epartner}
                                                        EPSstatus={'-'}
                                                        id={ApropertyId}
                                                        fullCalendar={[]}
                                                        uid="row{item.listing._id}"

                                                        eps_reservation_data={item}
                                                        changeReservationStatus={changeReservationStatus}
                                                        cancelReservation={cancelReservation}
                                                    />}
                                                </tr>
                                            </>
                                        })}
                                        
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>

                <CreateNewAccountModal
                    columns={columns}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                    modalData={modalData}
                />
            </div>
        </Layout>
    //     </div>
    // </div>
)

}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
    open,
    columns,
    onClose,
    onSubmit,
    modalData,
}) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = ""
            return acc
        }, {})
    )

    //console.log("data from modal >>>>", modalData)

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values)
        onClose()
    }

    return (
        <Dialog open={open}>
            <DialogTitle
                textAlign="center"
                className="font-color"
                style={{ background: "#F2F9FC" }}
            >
                {modalData.title}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: "100%",
                            minWidth: { xs: "300px", sm: "360px", md: "500px" },
                            gap: "1.5rem",
                        }}
                    >
                        <div className="row g-3 pt-3">
                            <div className="col-md-6 px-4">
                                <div className="row mb-2">
                                    <label htmlFor="inputText4" className="form-label mb-1 ps-0">
                                        Listing Name*
                                    </label>
                                    <input
                                        type="name"
                                        className="form-control rounded-0 py-2"
                                        id="inputText4"
                                        placeholder="Enter name"
                                    />
                                </div>
                                <div className="row mb-2">
                                    <label htmlFor="inputText14" className="form-label mb-1 ps-0">
                                        Property Nick*
                                    </label>
                                    <input
                                        type="name"
                                        className="form-control rounded-0 py-2"
                                        id="inputText14"
                                        placeholder="CAE000"
                                    />
                                </div>
                                <div className="row mb-2">
                                    <label
                                        htmlFor="inputAddress"
                                        className="form-label mb-1 ps-0"
                                    >
                                        Client Phone*
                                    </label>
                                    <input
                                        type="phone"
                                        className="form-control rounded-0 py-2"
                                        id="inputAddress"
                                        placeholder="+41-79-489-7021"
                                        maxLength={11}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 px-4">
                                <div className="row mb-2">
                                    <label
                                        htmlFor="inputAddress"
                                        className="form-label mb-1 ps-0"
                                    >
                                        Nick Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded-0 py-2"
                                        id="inputAddress"
                                        placeholder="Smiling"
                                    />
                                </div>
                                <div className="row mb-2">
                                    <label
                                        for="exampleFormControlTextarea1"
                                        class="form-label mb-1 ps-0"
                                    >
                                        Notes
                                    </label>
                                    <textarea
                                        class="form-control rounded-0 py-2"
                                        id="exampleFormControlTextarea1"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <button
                    type="submit"
                    className="btn btn-success border-radius-0 w-25 py-2"
                    style={{ backgroundColor: "#165093" }}
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </DialogActions>
        </Dialog>
    )
}

const validateRequired = (value) => !!value.length
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
const validateAge = (age) => age >= 18 && age <= 50

export default EPartnerReservationsProperties
