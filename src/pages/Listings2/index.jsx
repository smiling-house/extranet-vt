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

import { getStorageValue } from "../../Util/general.js";

import "./Listings.scss"
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
import Listingrow from "./row/listingRow"
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
    const [selectedCollections, setSelectedCollections] = useState([])
    const [selectedChannels, setSelectedChannels] = useState([])
    const agent = JSON.parse(localStorage.getItem("agent"));
    const agency = JSON.parse(localStorage.getItem("travelAgency"));
    let searchParms = {}
    const [searchInputes, setsearchInputes] = useState({
    })
    const history = useHistory();
    const location = useLocation();
    const partner = JSON.parse(localStorage.getItem("partner"))
    const accountId = localStorage.getItem("accountId")
    const user_image = agency?.userImage
    const [allPage, setAllPage] = useState(false)
    const [all, setAll] = useState(false)
    const [events, setEvents] = useState()
    const [emailLog, setemailLog] = useState("")
    const [NickNameLog, setNickNameLog] = useState("")
    const [phoneLog, setePhoneLog] = useState("")
    const [singleClientData, setsingleClientData] = useState([])
    const [selectedClientToShowOffers, setSelectedClientToShowOffers] = useState(null)
    const [selectedClientToShowSavedSearch, setSelectedClientToShowSavedSearch] = useState(null)
    const [selectedClientToEdit, setSelectedClientToEdit] = useState(null)
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
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();
    const properties = useSelector((state) => state.property.properties);
    const source = location.state && location.state.source;

//By Jaison 2025-04-22 - START
    const partnerPropertiesUniqueZipcodes = JSON.parse(getStorageValue('partnerPropertiesUniqueZipcodes') );
    const allZipcodes = JSON.parse(getStorageValue('allZipcodes') );

    const [updateStatusProcess, setUpdateStatusProcess] = useState(0);
    const [propStatus, setPropStatus] = useState('');
    const [filterPropertyStatus, setFilterPropertyStatus] = useState('');
    const filterByPropertyStatus = (event) => {
        console.log(event.target.value)
        setFilterPropertyStatus(event.target.value);
    }

    const [filterPropertyZipcode, setFilterPropertyZipcode] = useState('');
    const filterByZipcode = (event) => {
        console.log(event.target.value)
        setFilterPropertyZipcode(event.target.value);
    }    
    
    async function approveSelectedListings() {

        const checkboxes = document.querySelectorAll('input[name="listing_ids_to_update[]"]:checked');
        const listingIdsToUpdate = Array.from(checkboxes).map(cb => cb.value);
        console.log('listingIdsToUpdate:::', listingIdsToUpdate)

        const updateListingsData = {'accountId':partner?.accountId,'ids':listingIdsToUpdate, 'status':propStatus}

        if(listingIdsToUpdate.length > 0 && propStatus !== '') {
            const ShubResponse = await userRequest.post(constants.SHUB_URL+'/local/listings/update-multiple-listings-status', updateListingsData);

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

//Task URL : https://app.asana.com/1/1200178813358971/project/1209114491925523/task/1210009551590540
/*
const agent_role = getStorageValue('agent_role');
const agent_status = getStorageValue('agent_status');
*/
const agentLoggedIn = JSON.parse( localStorage.getItem('agent') );
//By Jaison 2025-04-22 - END

    const toggleFilterChannel = (channel) => {
        var newFilters = filterChannel// saving the currentXdata
        console.log("before:", newFilters)
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
            Authorization: `Bearer ${token2}`
        }
    })

    const getAllListings = async () => {

        const accountId = partner?.accountId ? partner?.accountId : ''//585a39dbe43900100017e9e8 // 640625ea0620e40031b8597d
        const params= { 
            source:(accountId!=='585a39dbe43900100017e9e8')?source:'SH',
            accountId,
            limit: constants.PAGING_LISTING_SIZE, 
            skip: clientPagingFrom - 1,
            sortBy: 'data.nickname:1',
    }


    //task: EXTRANET VT - Check the possibilities of adding admin login - https://app.asana.com/1/1200178813358971/project/1209114491925523/task/1210009551590540
    //By Jaison 2025-04-22 START 
    if(filterPropertyStatus !== '') {       
        params.status = filterPropertyStatus;
    } else if(filterPropertyStatus==='') {
        delete params.status;
    }

    if(filterPropertyZipcode !== '') {       
        params.extranet_filter_zipcode = filterPropertyZipcode;
    } else if(filterPropertyZipcode==='') {
        delete params.extranet_filter_zipcode;
    }    
    //By Jaison 2025-04-22 END

    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    console.log('getting from /listings:',params)
    if (accountId.length > 0) {
        const shubSearch=constants.SHUB_URL+'/local/listings?';
        setIsLoading(true)
        userRequest.get(`${shubSearch}${queryString}`).then(async response => {
            setIsLoading(false)
            if (response) {
                console.log("listings :",response)
                
                setListings(response.data?.listings)
                setCount(response?.data?.count)
                setFilterListings(response.data?.listings)
                localStorage.setItem("count", response?.data?.count)
                if (response?.listings?.length == 0) {
                    swal({
                        show: true,
                        icon: 'error',
                        title: 'Opps!!',
                        text: "No Data Found on Account ID :" + accountId
                    })
                } else {
                    console.log('props loaded on offset:',clientPagingFrom,response.data?.listings)
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
    console.log("move on partner->", newXdata)
    console.log("update partner", partner, "moving " + propertyId + " to channels:" + newXdata.channel)
    //updates the data on partner collection per change of channels (pending, approved, TL VT SH)
    let updatedPartner = partner
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
    console.log('Shub response to update partner data (account Id=' + partner.accountId + '):' + constants.SHUB_URL + `/update/${partner.accountId}`, updatedPartner)
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/update/${partner.accountId}`, updatedPartner)
    localStorage.setItem("partner", JSON.stringify(updatedPartner)) // update partner data
    setRefresh(true)
}

const updateXdata = async (ID, xdataPayload) => {
    //585a39dbe43900100017e9e8
    console.log("saving xdata for ID>>>>", ID, ":", xdataPayload)
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/local/xdata/${ID}`, xdataPayload)
    console.log("Shub response to save xdata:", ShubResponse)
    await swal({
        show: true,
        title: 'data update on SHUB',
        text: 'GSID:'+ID,
        icon: ShubResponse.data?.success ? "success" : "error",
        timer: 1500
    })
    getAllListings()
}


 useEffect(() => {
     console.log("refresh!:",refresh)
     getAllListings()
//     setRefresh(false)

 }, [refresh,isRefresh, filterPropertyStatus,updateStatusProcess, filterPropertyZipcode])

const handleSearchListings = (name, value) => {
    setsearchInputes({ ...searchInputes, [name]: value })
    console.log("search req:", searchInputes)
}
const handleSearchButton = () => {
    handleSearchListings('accountId', partner.accountId)
    searchInputes.accountId = partner.accountId
    if (searchInputes.q) {
        console.log('searching listings per q :', searchInputes.q, 'accountId:', partner.accountId)
        delete searchInputes.id
        delete searchInputes.filters
        //delete searchInputes.accountId
    } else
        if (searchInputes.id) { // on id remove the accountId search
            if (searchInputes.id) {

                searchInputes.filters = '[{"field":"ids", "operator":"$in", "value": ["' + searchInputes.id + '"]}]'
                delete searchInputes.id
                //delete searchInputes.accountId
                delete searchInputes.q
                console.log('searching listings per id:', searchInputes)
            } else {
                delete searchInputes.filters
                delete searchInputes.id
            }
        }
        setIsLoading(true)
    console.log("pressed search button:", searchInputes)
    AuthService.trianglLuxuryApi(searchInputes).then((response) => {
        setIsLoading(false)
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
    return (
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
        </div>
    )
}

const columns = [
    {
        name: 'property',
    },   
    {
      
        name: 'Status',
    }, 
     {
    
        name: 'Special Collections'
     }, {
       
        name: 'Geo-Location',
       
    }
]

let totalListings = localStorage.getItem("count") ? localStorage.getItem("count") : 0
const ListingsPagingFrom = 1 + pageNumber * constants.PAGING_LISTING_SIZE
let ListingsPagingTo = (pageNumber + 1) * constants.PAGING_LISTING_SIZE
if (totalListings < ListingsPagingTo) {
    ListingsPagingTo = totalListings
}

return (
    
    <div className="page-container">
        
        <div className="page-header">Villa Tracker Extranet</div>
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
                    {/* <PageHeader 
                    PageHeader={true} 
                    doSearch={doSearch} 
                    handleSearchListings={handleSearchListings} 
                    searchOpen={true} 
                    topBgColor="rgb(119 198 85)">
                    </PageHeader> */}
                    {headerSearchRow()}
                </div>

                <div className="listings-main">
                    <div className="listings-title">{partner?.pmName ? partner?.pmName : ''} /{partner?.contactName ? partner?.contactName : ''} / AccountID {partner?.accountId ? partner?.accountId : ''}</div>
                    <div className="listings-paging">Displaying  {ListingsPagingFrom}-{ListingsPagingTo} of {totalListings ? totalListings : "?"} Listings</div>

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

                    <div className="col-sm-2">
                    <label style={{'color':'white'}}><strong>Filter by Zipcode</strong></label>
                    <select class="form-control" onChange={(e)=>filterByZipcode(e)}>
                        <option value="">--All--</option>
                        {partnerPropertiesUniqueZipcodes.map((item, index) => {
                            return <>
                                <option value={item}>{item}</option>
                            </>
                        })}            
                    </select>
                    </div>
                    </div>
            
{agentLoggedIn.role==='admin' && agentLoggedIn.status==='approved' &&
    <section>
<div style={{'padding':'10px', 'display':'flex', 'align-items':'center', 'row-gap':'20px', 'position':'sticky'}}>
    <div class="col-3">
        <label><strong>Change Selected Property Status</strong></label>
        <select class="form-control" onChange={ (e) => setPropStatus(e.target.value) }>
            <option value="">--Select Status--</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
        </select>
    </div>
</div>

<div style={{'padding':'10px', 'display':'flex', 'align-items':'center', 'row-gap':'20px', 'position':'sticky'}}>
<div class="col-3">
    <button class="btn btn-primary" onClick={approveSelectedListings}>Update Status</button>        
    </div>    
</div> 
</section>
}            

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

const countryZipKey = iteam.listing.address.country + '_' + iteam.listing.address.zipcode;

if(allZipcodes[countryZipKey] !== 'undefined') {
    var listingAddressZipExists = true
} else {
    var listingAddressZipExists = false
}


                                            console.log("listing item:",index+1,iteam)
                                            const ApropertyId = iteam.listing?._id
                                            const fullCalendar = iteam.fullCalendar
                                            return <>
                                                <tr>
                                                    {<Listingrow
                                                        key={ApropertyId}
                                                        property={iteam.listing}
                                                        xdata={iteam.xdata}
                                                        agent={agent}
                                                        partner={partner}
                                                        id={ApropertyId}
                                                        fullCalendar={fullCalendar}
                                                        updateXdata={updateXdata}
                                                        uid="row{iteam.listing._id}" 
                                                        listingAddressZipExists={listingAddressZipExists} 

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
