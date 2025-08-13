import React, { useCallback, useEffect, useState } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, } from "@mui/material"
import Icon from 'react-web-vector-icons'
import { useDispatch, useSelector } from "react-redux";
import VTChannelIcon from "../../assets/channels/icons/VTChannel.svg"
import VTChannelIconOn from "../../assets/channels/icons/VTChannel-on.svg"
import VTChannelIconOnBlue from "../../assets/channels/icons/VTChannel-on-blue.svg"
import VTChannelLabel from "../../assets/channels/icons/label-VTChannel.svg"

import SHChannelIcon from "../../assets/channels/icons/SHChannel.svg"
import SHChannelIconOn from "../../assets/channels/icons/SHChannel-on.svg"
import SHChannelIconOnBlue from "../../assets/channels/icons/SHChannel-on-blue.svg"
import SHChannelLabel from "../../assets/channels/icons/label-SHChannel.svg"

import TLChannelIcon from "../../assets/channels/icons/TLChannel.svg"
import TLChannelIconOn from "../../assets/channels/icons/TLChannel-on.svg"
import TLChannelIconOnBlue from "../../assets/channels/icons/TLChannel-on-blue.svg"
import TLChannelLabel from "../../assets/channels/icons/label-TLChannel.svg"

import Button from "../../components/Buttons/Button/Button"
import pageBg from '../../assets/bk_pool.png'
import { data } from "./makeData.js"
import axios from "axios"
import { baseURL } from "../../core/index.js"
import PageHeader from "../../components/PageHeader"
import { PATH_PROPERTY } from "../../Util/constants"
import { useLocation, useHistory } from "react-router-dom";

import "./EListings.scss"
import Paging from "../../components/Paging"
import constants from "../../Util/constants"
import closeIcon from '../../assets/icons/closeIcon.png'
import { BsChevronDown } from "react-icons/bs"
import { IoIosSearch } from "react-icons/io"
import { BiCalendarCheck } from "react-icons/bi"
import AuthService from "../../services/auth.service"
import swal from "sweetalert"
import LoadingBox from "../../components/LoadingBox"
import CollectionIcon from "../../components/CollectionIcon"
import * as propertyActions from "../../store/redux/Property/actions";
import Sidebar from "../../components/Sidebar";
import EPSListingrow from "./row/EPSlistingRow"
import EPartners from "../EPartners/index.jsx";
const NEW_CLIENT = {
    id: "-1",
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    phone: "",
}


const Listings = (props) => {
    const { token, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props
    const [refresh, setRefresh] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [onlyConnected, setOnlyConnected] = useState(false)
    const [onlyDisConnected, setOnlyDisConnected] = useState(false)
    const [onlyPending, setOnlyPending] = useState(false)

    const Epartner = JSON.parse(localStorage.getItem("Epartner"));
    const partnerId = Epartner.partnerId

    const EpartnerIds = JSON.parse(localStorage.getItem("EpartnerIds"));
        
    const [filteredIds, setFilteredIds] = useState(EpartnerIds)

    const [slicedIds, setSlicedIds] = useState({})
    

    const [selectedCollections, setSelectedCollections] = useState([])
    const [selectedChannels, setSelectedChannels] = useState([])
    const agent = JSON.parse(localStorage.getItem("agent"));
    const agency = JSON.parse(localStorage.getItem("travelAgency"));
    let searchParms = {}
    const [searchInputes, setsearchInputes] = useState({
    })
    const history = useHistory();
    const location = useLocation(); 




    //console.log('partnerId:' + partnerId)
    
    // const accountId = localStorage.getItem("accountId")
    // const user_image = agency?.userImage
    // const [allPage, setAllPage] = useState(false)
    // const [all, setAll] = useState(false)
    // const [events, setEvents] = useState()
    // const [emailLog, setemailLog] = useState("")
    // const [NickNameLog, setNickNameLog] = useState("")
    // const [phoneLog, setePhoneLog] = useState("")
    // const [singleClientData, setsingleClientData] = useState([])
    // const [selectedClientToShowOffers, setSelectedClientToShowOffers] = useState(null)
    // const [selectedClientToShowSavedSearch, setSelectedClientToShowSavedSearch] = useState(null)
    // const [selectedClientToEdit, setSelectedClientToEdit] = useState(null)
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
    const [count, setCount] = useState((onlyDisConnected||onlyConnected)?filteredIds.length:Epartner.ids?.length)
    // const dispatch = useDispatch();
    // const properties = useSelector((state) => state.property.properties);
    // const source = location.state && location.state.source;

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

  //By Jaison
  const handleStatusButton = async(epartnerSharedId,connected) => {


    //Need to verify and correct this ***
    const updateEpartnerShareData = Epartner.ids
    const newStatus=connected?'connected':'disconnected'   
    updateEpartnerShareData[epartnerSharedId].status = newStatus
    const data = {id: epartnerSharedId, status:newStatus}
    console.log('partnerId : ' + partnerId)
    console.log('epartnerSharedId: ' + epartnerSharedId, connected?'connect it!':'disconnect it!')
    console.log('ids to update:',data)
    setIsLoading(true)
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/eps/update-external-partner-id-status/${partnerId}`, data)
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
            Authorization: `Bearer ${token2}`
        }
    })

    const getAllListings = async () => {


        // Slicing the JSON
const limit = constants.PAGING_LISTING_SIZE; // Number of items to take
const skip = clientPagingFrom-1;  // Number of items to skip

//filteredIds
//const slicedIds = Object.entries(EpartnerIds)
const slicedIds = Object.entries(filteredIds)
  .slice(skip, skip + limit) // Apply skip and limit
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

        
console.log('slicedIds:', slicedIds );        
console.log('Object.keys(slicedIds)', Object.keys(slicedIds));        
        //get ids as csv for read from shub
        const idsString = Object.keys(slicedIds).map(key => key).join('","')
		const filter_ids='[{"field":"ids", "operator":"$in", "value": ["'+idsString+'"]}]';

        console.log(':::filter_ids:::',filter_ids)
        const accountId = Epartner?.accountId ? Epartner?.accountId : ''//585a39dbe43900100017e9e8 // 640625ea0620e40031b8597d
        const params= { 
            filters:filter_ids,
            limit: constants.PAGING_LISTING_SIZE, 
            skip: 0,
            sortBy: 'data.nickname:1'
    }
    
    console.log('getting from /listings:',params)
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join("&")

    if (true) {
        const shubSearch=constants.SHUB_URL+'/local/listings?';
        console.log(`get ${shubSearch}${queryString}`)
        setIsLoading(true)
        userRequest.get(`${shubSearch}${queryString}`).then(async response => {
            setIsLoading(false)
            if (response) {
                console.log("::::LISTINGS DATA::::",response)
                
                
                if (response?.data?.error) {
                    swal({
                        show: true,
                        icon: 'error',
                        title: 'Opps!!',
                        text: response?.data?.error
                    })
                } else {
                    setListings(response.data?.listings)
                setCount(Epartner.count?.shared)
                setFilterListings(response.data?.listings)
                localStorage.setItem("count", response?.data?.count)
                   // console.log('props loaded on offset:',clientPagingFrom,response.data?.listings)
                    setRefresh(true)
                }
            }
        }).catch(response => {
            swal({
                show: true,
                icon: 'error',
                title: 'Opps!!',
                text: "No Data Found on Account ID :" + accountId
            })
        })
    }
}

const updatePartnerData = async (propertyId, oldXdata, newXdata) => {
    console.log("move on Epartner->", newXdata)
    console.log("update Epartner", Epartner, "moving " + propertyId + " to channels:" + newXdata.channel)
    //updates the data on Epartner collection per change of channels (pending, approved, TL VT SH)
    let updatedPartner = Epartner
    // remove Id from TL SH VT arrays:
    updatedPartner.TL.filter((f) => f !== propertyId)
    updatedPartner.SH.filter((f) => f !== propertyId)
    updatedPartner.VT.filter((f) => f !== propertyId)
    updatedPartner.approved.filter((f) => f !== propertyId)
    updatedPartner.pending.filter((f) => f !== propertyId)
    updatedPartner.ids.filter((f) => f !== propertyId)
    // add the propertyId to the right channels:
    if (newXdata.channel.length > 0) // channel exist=approved
    {
        updatedPartner.approved = [...updatedPartner.TL, propertyId] // approved the id
        if (newXdata.channel.findIndex((i) => i === 'TL') > -1) {
            updatedPartner.TL = [...updatedPartner.TL, propertyId]
            console.log('added to TL')
        }
        if (newXdata.channel.findIndex((i) => i === 'SH') > -1) {
            updatedPartner.SH = [...updatedPartner.SH, propertyId]
            console.log('added to SH')
        }
        if (newXdata.channel.findIndex((i) => i === 'VT') > -1) {
            updatedPartner.VT = [...updatedPartner.VT, propertyId]
            console.log('added to VT')
        }
    } else {  // move to pending list
        updatedPartner.pending = [...updatedPartner.pending, propertyId] // approved the id
    }
    updatedPartner.ids = [...updatedPartner.ids, propertyId] // add to ids
    console.log('Shub response to update Epartner data (account Id=' + Epartner.accountId + '):' + constants.SHUB_URL + `/update/${Epartner.accountId}`, updatedPartner)
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/eps-update/${Epartner.accountId}`, updatedPartner)
    localStorage.setItem("Epartner", JSON.stringify(updatedPartner)) // update Epartner data
    setRefresh(true)
}



/*
useEffect(() => {
    console.log("useEffect 1 - 1st time!:",refresh)
    setFilteredIds(Epartner.ids)

}, [])
*/

 useEffect(() => {
     console.log("useEffect 2 - refresh!:",refresh)
     console.log(':::Epartner.ids before getAllListings:::', Epartner.ids)
     getAllListings()
//     setRefresh(false)

 }, [refresh,isRefresh,filteredIds])




useEffect(() => {
    
    //setFilteredIds(EpartnerIds);

    /*
    const setFilterIdsSlicedIds = async () => {

        const limit = constants.PAGING_LISTING_SIZE;
        const skip = clientPagingFrom - 1;

        console.log(':::EpartnerIds:::', EpartnerIds);
        const slicedIdsData = Object.entries(EpartnerIds) // not from state!
            .slice(skip, skip + limit)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        
        setSlicedIds(slicedIdsData);
    };

    setFilterIdsSlicedIds();
    */
    getAllListings();
}, []);



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
        setFilteredIds({})
    } else {
        setFilteredIds(transformedData);
    }    
    
    //console.log("Only Connected",transformedData)
    getAllListings();
}

const handleAllStatuses = () => {
    setOnlyConnected(false);
    setOnlyDisConnected(false);
    setFilteredIds(Epartner.ids)
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
        setFilteredIds({})
    } else {
        setFilteredIds(transformedData);
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
        setFilteredIds({})
    } else {
        setFilteredIds(transformedData);
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

if (EpartnerIds && typeof EpartnerIds === 'object') {
  // Iterate over the values of the object
  Object.values(EpartnerIds).forEach((idObj) => {
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

    return ( //comment
        <div className="listings-search-container row">
            <div className="col-sm-2">
                <input type="text" className="listings-search-input form-control" placeholder="Property name / Nick name" onChange={(e) => handleSearchListings("q", e.target.value)} />
            </div>
            <div className="col-sm-2">
                <input type="text" className="listings-search-input form-control" placeholder="Enter property id" onChange={(e) => handleSearchListings("id", e.target.value)} />
            </div>
            <div className="col-sm-1">
                <Button style={{ height: '60px', width: '120px', fontSize: '15px', borderRadius: '5px' }} variant="green" text="Search" onClick={handleSearchButton} />
            </div>
            <span className="listings-search-separator" />
            <div className="col-sm-2">
                <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={onlyConnected?"blue":"green" } text={connectedButton} onClick={handleOnlyConnected} />
            </div>
            <div className="col-sm-2">
                <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={onlyDisConnected?"blue":"green" } text={disconnectedButton} onClick={handleOnlyDisConnected} />
            </div>
            <div className="col-sm-2">
                <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={onlyPending?"blue":"green" } text={pendingButton} onClick={handleOnlyPending} />
            </div>            
            <div className="col-sm-2">
                <Button style={{ height: '60px', width: '160px', fontSize: '15px', borderRadius: '5px' }} variant={!onlyDisConnected&&!onlyConnected?"blue":"green" } text={allButton} onClick={handleAllStatuses} />
            </div>
        </div>
    )
}

const columns = [
    {
        id: 'firstName',
        name: 'ID',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        selector: row => row.firstName,
        width: '1fr'
    }, {
        id: 'nickName',
        name: 'Status',
        sortable: true,
        selector: row => row.nick,
        cell: row => <div>{row.nickName}</div>,
        width: '1fr'
    }, {
        id: 'nickName',
        name: 'days',
        sortable: true,
        selector: row => row.nick,
        cell: row => <div>{row.nickName}</div>,
        width: '1fr'
    },  {
        id: 'nickName',
        name: 'collections',
        sortable: true,
        selector: row => row.nick,
        cell: row => <div>{row.nickName}</div>,
        width: '250px'
    }, {
        id: 'phone',
        name: 'Action',
        sortable: true,
        selector: row => row.phone,
        cell: row => <div>{row.phone}</div>,
        width: '200px'
    }, {
        id: 'offers',
        name: 'Location',
        width: '1fr',
        header: (column, index) => (
            <div key={index} style={{ color: '#1B9C5D', backgroundColor: '#F5F5F2', fontSize: '22px', fontWeight: 500 }}>
                Location
            </div>
        ),
        headerStyle: { backgroundColor: '#F5F5F2' },
        sortable: true,
        selector: row => row.offers,
        width: '450px'
    }, {
        id: 'savedSearch',
        name: 'agent',
        header: (column, index) => (
            <div key={index} style={{ color: '#1B9C5D', backgroundColor: '#F5F5F2', fontSize: '21px', lineHeight: '21px', fontWeight: 500 }}>
                Agent
            </div>
        ),
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

return (
    
    <div className="page-container">
        
        <div className="page-header">VT-Extranet</div>
        <Sidebar
            agency={agency}
            agent={agent}
            token={token}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
        />
        <div className={activeMenu ? `${"page-body"}` : "page-body"} >

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
                    <div className="listings-title">{Epartner?.pmName ? Epartner?.pmName : ''} /{Epartner?.contactName ? Epartner?.contactName : ''} / {Epartner?.email ? Epartner?.email : ''} / AccountID {Epartner?.accountId ? Epartner?.accountId : ''}/ source: {Epartner?.source ? Epartner?.source : ''}</div>
                    <div className="listings-paging">Displaying  {ListingsPagingFrom}-{ListingsPagingTo} of {totalListings ? totalListings : "?"} Listings</div>
                    {<Paging perPage={constants.PAGING_LISTING_SIZE} totalItems={totalListings} currentPage={pageNumber} onChangePage={onChangePage} />}
                    <div style={{ padding: '0 20px' }}>
                        <div class="table-responsive" style={{ overflow: "auto" }}>
                                <table class="table">
                                    <thead style={{ backgroundColor: "#f9f9f7" }} >
                                        <tr>
                                            {columns?.map((iteam, index) => {
                                                return <>
                                                    <th key={index} scope="col" className="p-4 " style={{ cursor: "pointer", width: iteam.width }}><h3>{iteam.name} <BsChevronDown /></h3></th>
                                                </>
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listings.map((iteam, index) => {
                                            //console.log("listing item:",index+1,iteam, Epartner.ids)

                                            const ApropertyId = iteam.listing?._id
                                            const fullCalendar = iteam.fullCalendar
                                            //find the status on the partner per id 
                                            const EPSStatus = constants.AVAIL_STATUS.includes(
                                                Epartner.ids[ApropertyId]?.status?.toLowerCase()
                                              ) ?Epartner.ids[ApropertyId]?.status.toLowerCase():  '-'          
                                                //console.log('status:',ApropertyId,EPSStatus)
                                            return <>
                                                <tr>
                                                    {<EPSListingrow
                                                        handleStatusButton={handleStatusButton}
                                                        key={ApropertyId}
                                                        property={iteam.listing}
                                                        xdata={iteam.xdata}
                                                        agent={agent}
                                                        Epartner={Epartner}
                                                        EPSstatus={EPSStatus}
                                                        id={ApropertyId}
                                                        fullCalendar={fullCalendar}
                                                        uid="row{iteam.listing._id}"
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
        </div>
    </div>
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

export default Listings
