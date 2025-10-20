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

import eventsIcon from "../../assets/special-collection/icons/events.svg"
import eventsIconOn from "../../assets/special-collection/icons/events-on.svg"
import eventsIconOnBlue from "../../assets/special-collection/icons/events-on-blue.svg"
import eventsLabel from "../../assets/special-collection/icons/label-events.svg"

import dogsIcon from "../../assets/special-collection/icons/dogs.svg"
import dogsIconOn from "../../assets/special-collection/icons/dogs-on.svg"
import dogsIconOnBlue from "../../assets/special-collection/icons/dogs-on-blue.svg"
import dogsLabel from "../../assets/special-collection/icons/label-pets.svg"

import greenIcon from "../../assets/special-collection/icons/green.svg"
import greenIconOn from "../../assets/special-collection/icons/green-on.svg"
import greenIconOnBlue from "../../assets/special-collection/icons/green-on-blue.svg"
import greenLabel from "../../assets/special-collection/icons/label-sustainable.svg"

import familiesIcon from "../../assets/special-collection/icons/kids.svg"
import familiesIconOn from "../../assets/special-collection/icons/kids-on.svg"
import familiesIconOnBlue from "../../assets/special-collection/icons/kids-on-blue.svg"
import familiesLabel from "../../assets/special-collection/icons/label-families.svg"
import bathIcon from "../../assets/property/baths.png";
import bedsIcon from "../../assets/property/beds.png";
import peopleIcon from "../../assets/property/people.png";


import Button from "../../components/Buttons/Button/Button.jsx"
import pageBg from '../../assets/bk_pool.png'
import { data } from "./makeData.js"
import axios from "axios"
import { baseURL } from "../../core/index.js"
import PageHeader from "../../components/PageHeader/index.js"
import { PATH_PROPERTY, PATH_EPARTNERS } from "../../Util/constants.js"
import { useLocation, useHistory } from "react-router-dom";

import "./EListings.scss"
import Paging from "../../components/Paging/index.js"
import constants from "../../Util/constants.js"
import closeIcon from '../../assets/icons/closeIcon.png'
import { BsChevronDown, BsFilter } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io"
import { BiCalendarCheck } from "react-icons/bi"
import AuthService from "../../services/auth.service.js"
import swal from "sweetalert"
import LoadingBox from "../../components/LoadingBox/index.js"
import CollectionIcon from "../../components/CollectionIcon/index.js"
import * as propertyActions from "../../store/redux/Property/actions.js";
import Sidebar from "../../components/Sidebar/index.js";
import EPSListingrow from "./row/EPSlistingRow.js"
import EPartners from "../EPartners/index.jsx";
import EPSFilter from "./EPSFilter/index.js";

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
    const [filteredIds, setFilteredIds] = useState({})
    const [selectedCollections, setSelectedCollections] = useState([])
    const [selectedChannels, setSelectedChannels] = useState([])
    const agent = JSON.parse(localStorage.getItem("agent"));
    const agency = JSON.parse(localStorage.getItem("travelAgency"));
    let searchParms = {}
    const [searchInputes, setsearchInputes] = useState({
    })
    const history = useHistory();
    const location = useLocation(); 

    const Epartner = JSON.parse(localStorage.getItem("Epartner"))
    console.log('Epartner', Epartner)
    console.log('Epartner ids:::', Epartner.ids)
    const partnerId = Epartner.partnerId
    //console.log('partnerId:' + partnerId)


    const [currentEpartnerIds, setCurrentEpartnerIds] = useState( typeof Epartner.ids === 'undefined' || Epartner.ids === null ? {} : Epartner.ids )
    
    
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
    // const [filteredlistings, setFilteredListings] = useState([])
    const [selectedfilteredlistings, setSelectedFilteredListings] = useState([])
    const [selectedAllListings, setSelectedAllListings] = useState(false);
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
    
    const [searchtag, setSearchtag] = useState("Title");
    const [searchtagvalue, setSearchtagvalue] = useState("");
    const [filtervaldata, setFiltervaldata] = useState([]);
    // const [countries, setCountries] = useState(JSON.parse(localStorage.getItem('countries')) || []);
    // const [cities, setCities] = useState(JSON.parse(localStorage.getItem('cities')) || []);
    // const [regions, setRegions] = useState(JSON.parse(localStorage.getItem('regions')) || []);
    const [tags, setTags] = useState([]);
    const [amneties, setAmneties] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [filteredDataList, setFilteredDataList] = useState([])
    const [searchFilteredListData, setSearchFilteredListData] = useState([])
    

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

    console.log('Epartner.ids: ' ,Epartner.ids)

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
        getFilteredListings(filtervaldata, searchtag, searchtagvalue, pageNumber)
        // getAllListings()
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
        
    const getFilteredListings = async (querydata, searchbytag, searchbytagvalue, page = false) => {
        // console.log(querydata, searchbytag, searchbytagvalue)
        let dontsend = false;
        if(!page) page = pageNumber;
        const limit = constants.PAGING_LISTING_SIZE; // Number of items to take
        const skip = clientPagingFrom-1;  // Number of items to skip
        let filters = "[";
        if(querydata.length) {
            querydata.map((query, qryindx) => {
                let queryvaluesstr = query.value.join('","');
                filters = filters + `{"field" : "${query.field}", "operator": "${query.operator}", "value" : ["${queryvaluesstr}"]}`;
                if(qryindx < querydata.length -1) {
                    filters = filters + ","
                }
            })
            dontsend = false;
        } /*else {
            const slicedIds = Object.entries(filteredIds)
            .slice(skip, skip + limit) // Apply skip and limit
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
            // console.log('E ids:', slicedIds, Object.keys(slicedIds));        
            // //get ids as csv for read from shub
            const idsString = Object.keys(slicedIds).map(key => key).join('","')
            if(idsString === '') { dontsend = true; } else { dontsend = false; }
            filters= filters + '{"field":"ids", "operator":"$in", "value": ["'+idsString+'"]}';
        }
        */

        filters = filters + "]";
        console.log('filters:',filters)
        console.log(searchbytagvalue)
        if(searchbytagvalue !== "") {
            filters = filters + `&${searchbytag.charAt(0).toLowerCase() + searchbytag.slice(1).toLowerCase()}=${searchbytagvalue.toLowerCase()}`;
            
        }
        const accountId = Epartner?.accountId ? Epartner?.accountId : ''//585a39dbe43900100017e9e8 // 640625ea0620e40031b8597d
        const params= { 
            filters,
            limit: constants.PAGING_LISTING_SIZE, 
            skip: skip,
            sortBy: 'data.nickname:1',
            source: 'guesty_channel_api' //need only guesty properties for external partners now
        } 
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join("&")
        console.log(queryString)
        const shubSearch=constants.SHUB_URL+'/local/listings?';
        if(!dontsend) { 
            setIsLoading(true)
            userRequest.get(`${shubSearch}${queryString}&isListed=true`).then(async response => {
                setIsLoading(false)
                if (response) {
                    console.log("listings :",response)
                    if (response?.data?.error) {
                        swal({
                            show: true,
                            icon: 'error',
                            title: 'Opps!!',
                            text: response?.data?.error
                        })
                    } else {
                        setListings(response.data?.listings)
                        // setCount(Epartner.count?.shared)
                        setCount(response?.data?.count)
                        setFilterListings(response.data?.listings)
                        localStorage.setItem("count", response?.data?.count)
                        // console.log('props loaded on offset:',clientPagingFrom,response.data?.listings)
                            // setRefresh(true)
                    }
                }
            }).catch(response => {
                swal({
                    show: true,
                    icon: 'error',
                    title: 'Opps!!',
                    text: "No Data Found on Account ID :" + accountId
                })
                .then(() => setIsLoading(false))
            })
        } else {
            setIsLoading(false)
        }
        
        // console.log('filters:',filters)
        // console.log('getting from /listings:',params)
        // console.log(queryString)
    }
    const getAllListings = async () => {
        // Slicing the JSON
        const limit = constants.PAGING_LISTING_SIZE; // Number of items to take
        const skip = clientPagingFrom-1;  // Number of items to skip

        const slicedIds = Object.entries(filteredIds)
        .slice(skip, skip + limit) // Apply skip and limit
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        
        console.log('E ids:', slicedIds, Object.keys(slicedIds));        
        //get ids as csv for read from shub
        const idsString = Object.keys(slicedIds).map(key => key).join('","')
		const filter_ids='[{"field":"ids", "operator":"$in", "value": ["'+idsString+'"]}]';

        console.log('filter_ids:',filter_ids)
        const accountId = Epartner?.accountId ? Epartner?.accountId : ''//585a39dbe43900100017e9e8 // 640625ea0620e40031b8597d
        const params= { 
            filters:filter_ids,
            limit: constants.PAGING_LISTING_SIZE, 
            skip: 0,
            sortBy: 'data.nickname:1' ,
            source: 'guesty_channel_api' //need only guesty properties for external partners now          
    }
    
    console.log('getting from /listings:',params)
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join("&")
    console.log(queryString)
    if (true) {
        const shubSearch=constants.SHUB_URL+'/local/listings?';
        console.log(`get ${shubSearch}${queryString}`)
        setIsLoading(true)
        userRequest.get(`${shubSearch}${queryString}&isListed=true`).then(async response => {
            setIsLoading(false)
            if (response) {
                console.log("listings :",response)
                
                
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
            }).then(() => setIsLoading(false))
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

useEffect(() => {
    console.log("1st time!:",refresh)
    setFilteredIds(Epartner.ids)
}, [])

 useEffect(() => {
     console.log("refresh!:",refresh)
    //  getAllListings()
     getFilteredListings([], 'Nickname', '')
//     setRefresh(false)

 }, [refresh,isRefresh,filteredIds])



 const handleOnlyConnected = () => {
    setOnlyConnected(true);
    setOnlyDisConnected(false);
    // Filtering the ids where status is 'connected'
    const connectedIds = Object.entries(Epartner.ids).filter(([key, value]) => value.status === "connected");
    const transformedData = Object.fromEntries(
    Object.values(connectedIds).map(([id, details]) => [id, details])
  );
    setFilteredIds(transformedData)
    console.log("Only Connected",transformedData)
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
    setFilteredIds(transformedData)
    console.log("Only Disconnected",transformedData)

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
    const connectedButton=`${Epartner.count?.connected} connected`
    const disconnectedButton=`${Epartner.count?.disconnected} disconnected`
    const allButton=`${Epartner.count?.shared} ALL`
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

const isNullOrEmptyArray = (arr) => {
    return arr == null || arr.length === 0;
};

const renderSpecialCollections = (item) => {
    return (
      /* 	<div>
              <img src={specialEvents} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
              <img src={specialFamilies} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
              <img src={greenIcon} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
              <img src={dogsIcon} className="img-fluid" style={{ marginRight: '5px', width: '25px' }} />
          </div> */
      <div className="search-main-selection-icons"
        style={{
          paddingTop: '5px',
          display: 'grid',
          gridTemplateColumns: '60px 60px 60px 60px',
          justifyItems: 'center',
        }}>
        <CollectionIcon
          readOnly={true}
          path={eventsIcon}
          pathOver={eventsIconOn}
          pathOver2={eventsIconOnBlue}
          selected={item.xdata.tags?.indexOf("eventCollection") > -1}
          label={eventsLabel}
          style={{height: '50px'}}
          //onClick={() => toggleCollection("eventCollection")}
        />
        <CollectionIcon
          readOnly={true}
          path={familiesIcon}
          pathOver={familiesIconOn}
          pathOver2={familiesIconOnBlue}
          selected={
            item.xdata.tags?.indexOf("familyCollection") > -1
          }
          label={familiesLabel}
          style={{height: '50px'}}
          //onClick={() => toggleCollection("familyCollection")}
        />
        <CollectionIcon
          readOnly={true}
          path={dogsIcon}
          pathOver={dogsIconOn}
          pathOver2={dogsIconOnBlue}
          selected={item.xdata.tags?.indexOf("petsCollection") > -1}
          label={dogsLabel}
          style={{height: '50px'}}
          //onClick={() => toggleCollection("petsCollection")}
        />
        <CollectionIcon
          readOnly={true}
          path={greenIcon}
          pathOver={greenIconOn}
          //pathOver2={greenIconOnBlue}
          selected={
            item.xdata.tags?.indexOf("ecoCollection") > -1
          }
          label={greenLabel}
          style={{height: '50px'}}
          //onClick={() => toggleCollection("ecoCollection")}
        />

      </div>
    )
}

const handleSelectedListings = (item, indx) => {

    let newselectedfilteredlistings = JSON.parse(JSON.stringify(selectedfilteredlistings));
    const selectedIds = new Set(newselectedfilteredlistings.map(item => item.listing._id));
    if(selectedIds.has(item.listing._id)) {
        newselectedfilteredlistings.splice(indx, 1);
        
    } else {

        newselectedfilteredlistings.push(item)
    }
    setSelectedAllListings(newselectedfilteredlistings.length === listings.length);
    setSelectedFilteredListings(newselectedfilteredlistings);

}

const handleSelectAllListings = () => {
    console.log(selectedAllListings)
    console.log(!selectedAllListings)
    let newselectedfilteredlistings = JSON.parse(JSON.stringify(selectedfilteredlistings));
    let newselectedAllListings = !selectedAllListings;
    console.log(newselectedAllListings)
    if(newselectedAllListings) {
        newselectedfilteredlistings = JSON.parse(JSON.stringify(listings))
    } else {
        newselectedfilteredlistings = [];
    }
    setSelectedAllListings(newselectedAllListings);
    setSelectedFilteredListings(newselectedfilteredlistings);
}
const deSelectAllListings = () => {
    let newselectedfilteredlistings = JSON.parse(JSON.stringify(selectedfilteredlistings));
    let newselectedAllListings = false;
    console.log(newselectedAllListings)
    if(newselectedAllListings) {
        newselectedfilteredlistings = JSON.parse(JSON.stringify(listings))
    } else {
        newselectedfilteredlistings = [];
    }
    setSelectedAllListings(newselectedAllListings);
    setSelectedFilteredListings(newselectedfilteredlistings);
}

/**
 * Updates the selected listings for the external partner.
 *
 * This function creates an array of objects, each keyed by the listing's `_id` and containing
 * status and update metadata. It then constructs a payload and sends it to the AuthService
 * to update the listings for the partner. Success and error feedback is shown via SweetAlert.
 *
 * Example output for each selected listing:
 * [
 *   {
 *     "listing_id": {
 *       "status": "pending",
 *       "updateStatic": false,
 *       "updateCalendar": false,
 *       "staticUpdated": "2025-01-27T07:43:59.404Z",
 *       "calendarUpdated": "2025-01-27T07:43:59.404Z"
 *     }
 *   }
 * ]
 *
 * @function
 * @returns {void}
 */
const updateFilteredListings = () => {

    // console.log('ppv - updateFilteredListings', selectedfilteredlistings)
    const now = new Date().toISOString();
    const selectedlistings =  selectedfilteredlistings.map(item => ({
        [item.listing._id]: {
            status: "pending",
            updateStatic: false,
            updateCalendar: false,
            staticUpdated: now,
            calendarUpdated: now
        }
    }));

//Added by Jaison - 2025 October 20 - START
let runSyncExternalPropertiesUrl = false; //Default false - to avoid sync on each update
let currentEpartnerIdsLength = Object.keys(currentEpartnerIds).length;
let listingIdsToBeSyncedByEpartner = [] ;
if(currentEpartnerIdsLength === 0 && selectedlistings.length > 0) {
    runSyncExternalPropertiesUrl = true; //First time adding properties - run sync to create external properties url
    listingIdsToBeSyncedByEpartner = [] ; //This line is redundant but added for clarity. When this array is empty need to sync all properties
}

if(currentEpartnerIdsLength > 0) {
    //runSyncExternalPropertiesUrl = true;

    //Form listingIdsToBeSyncedByEpartner array
    /*
    console.log('Form listingIdsToBeSyncedByEpartner array')
    console.log('currentEpartnerIds::')
    console.log(currentEpartnerIds)
    console.log('selectedlistings::')
    console.log(selectedlistings)
    */

    let currentEpartnerIdsKeys = Object.keys(currentEpartnerIds);
    
    console.log(currentEpartnerIdsKeys)

    for (const obj of selectedlistings) {
        const singleListingId = Object.keys(obj)[0];

        if (!currentEpartnerIdsKeys.includes(singleListingId)) {
            listingIdsToBeSyncedByEpartner.push(singleListingId)
        }        
    }    


    if(listingIdsToBeSyncedByEpartner.length > 0) {
        runSyncExternalPropertiesUrl = true;
    }

}

console.log('listingIdsToBeSyncedByEpartner:::')
console.log(listingIdsToBeSyncedByEpartner)

console.log('runSyncExternalPropertiesUrl:::')
console.log(runSyncExternalPropertiesUrl)
//Added by Jaison - 2025 October 20 - END

    const uploadPayload = {
        content: { 'ids' : selectedlistings },
        partnerId: partnerId,
        token: Epartner.bearerToken
    }
    AuthService.uploadSelectedListings(partnerId,uploadPayload).then((response) => {
        // console.log(response)
        if(response && response.data && response.data.success) {


//Added by Jaison - 2025 October 20 - START            
if(runSyncExternalPropertiesUrl===true) {
    if(Epartner.syncExternalPropertiesUrl && Epartner.syncExternalPropertiesUrl !== '') {
        axios.post(Epartner.syncExternalPropertiesUrl, {listingIds: listingIdsToBeSyncedByEpartner})
    }
}
//Added by Jaison - 2025 October 20 - END            

            const ids = Object.keys(response?.data?.updatedPartner?.ids);
            swal({
                show: true,
                icon: "success",
                title: `${selectedfilteredlistings.length} ${selectedfilteredlistings.length > 1 ? 'ids' : 'id'} updated for external Partner ${Epartner.partnerName} (${Epartner.email})`,
                text: "Successfully updated listings",
            }).then(() => {
                // history.push(PATH_EPARTNERS);
            })

        } else {
            throw new Error(`Error updating listings: ${response?.data?.message || 'Unknown error'}`);
        }

    }).catch((e) => {
        console.log(e)
        swal({
            show: true,
            icon: "error",
            title: "Opps!!",
            text: `Error updating listings: ${e.response?.data?.message || e.message}`,
        }).then(() => {
            // history.push(PATH_EPARTNERS);
        });
        
    })
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
                    <div className="row" style={{margin: 0, padding: "5px"}}>
                        {/* <div className="col-6">
                            <div className="listings-title">{Epartner?.pmName ? Epartner?.pmName : ''} /{Epartner?.contactName ? Epartner?.contactName : ''} / {Epartner?.email ? Epartner?.email : ''} / AccountID {Epartner?.accountId ? Epartner?.accountId : ''}/ source: {Epartner?.source ? Epartner?.source : ''}</div>
                        </div> */}
                        <EPSFilter getFilteredListings={getFilteredListings} setSearchTag={setSearchtag} setSearchTagValue={setSearchtagvalue} setFilterValData={setFiltervaldata} />
                        
                    </div>
                    
                    {/* <div className="listings-paging">Displaying  {ListingsPagingFrom}-{ListingsPagingTo} of {totalListings ? totalListings : "?"} Listings</div> */}
                    {<Paging perPage={constants.PAGING_LISTING_SIZE} totalItems={totalListings} currentPage={pageNumber} onChangePage={onChangePage} />}
                    <div style={{ padding: '0 20px' }}>
                        <div class="table-responsive" style={{ overflow: "auto" }}>
                                <table class="table" style={{borderSpacing: 0,borderCollapse:'seperate'}}>
                                    
                                    <thead style={{ backgroundColor: "#ffffff" }} >
                                        <tr> 
                                            
                                            <th scope="col" className="column-header" >
                                                <div>
                                                    <input 
                                                        className={`selectlisting-input`} 
                                                        type="checkbox" 
                                                        checked={selectedAllListings}
                                                        onChange={handleSelectAllListings}
                                                    />
                                                </div>
                                            </th>
                                            <th scope="col" className="column-header" style={{ cursor: "pointer" }}>
                                                <span>Property</span>
                                            </th>
                                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            selectedfilteredlistings.map((iteam, index) => {
                                                return (
                                                    <tr key={`slflt${index}`}>
                                                        <td className="column-body" >
                                                            <input 
                                                                className={`selectlisting-input`} 
                                                                type="checkbox" 
                                                                checked={new Set(selectedfilteredlistings.map(itm => itm.listing._id)).has(iteam.listing._id)} 
                                                                onChange={() => handleSelectedListings(iteam, index)} 
                                                            />
                                                        </td>
                                                        <td className="column-body two-line-cell">
                                                            <div class="line-one">
                                                                {
                                                                    !isNullOrEmptyArray(iteam.xdata.pictures) ? (
                                                                        <img src={`${iteam.xdata.pictures[0].original}`} alt="Main Photo" class="main-photo" />
                                                                    ) : !isNullOrEmptyArray(iteam.listing.pictures) ? (
                                                                        <img src={`${iteam.listing.pictures[0].original}`} alt="Main Photo" class="main-photo" />
                                                                    ) : ('')
                                                                }
                                                                
                                                            </div>
                                                            <div class="line-two">
                                                                <div class="line-two-line-one">
                                                                    <span class="nick-title">
                                                                        <strong class="nick">{iteam.listing.nickname}</strong> - <span class="title"><strong class="nick">{iteam.listing?.propertyType}</strong>, </span>
                                                                    </span>
                                                                    <span class="nick-title">
                                                                        <span class="title">{iteam.listing?.address?.country},{iteam.listing?.address?.state},{iteam.listing?.address?.city} {iteam.listing?.address?.full}</span>
                                                                    </span>
                                                                </div>
                                                                <div class="line-two-line-two flx-dr-rw">
                                                                    <div class="base-price">
                                                                        <span>
                                                                            Base Price: <strong>{iteam.listing?.prices?.basePrice} {iteam.listing?.prices?.currency}</strong>
                                                                        </span>
                                                                        <span>
                                                                            Weekend:  <strong>{iteam.listing?.prices?.weekendBasePrice || iteam.listing?.prices?.basePrice} {iteam.listing?.prices?.currency}</strong>
                                                                        </span>
                                                                        <span>
                                                                            {iteam.listing?.prices?.weeklyPriceFactor < 1 && (
                                                                                <>
                                                                                    week discount: <strong>{parseInt(100 - iteam.listing?.prices?.weeklyPriceFactor * 100)}% </strong>
                                                                                </>
                                                                            )}
                                                                        </span>
                                                                        <span>
                                                                            {iteam.listing?.prices?.monthlyPriceFactor < 1 && (
                                                                                <>
                                                                                    month discount: <strong>{parseInt(100 - iteam.listing?.prices?.monthlyPriceFactor * 100)}% </strong>
                                                                                </>
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div class="collections">
                                                                        {renderSpecialCollections(iteam)}
                                                                        <div className="property-box-footer-left" style={{marginTop: "-10px"}}>
                                                                            <div className="property-box-footer-left-icon">
                                                                                <img src={peopleIcon} alt="" style={{width: '30px', height: '30px'}} />
                                                                                <span className="pd-l10p">{iteam.listing?.accommodates}</span>
                                                                            </div>
                                                                            <div className="property-box-footer-left-icon">
                                                                                <img src={bedsIcon} alt="" style={{width: '30px', height: '30px'}} />
                                                                                <span className="pd-l10p">{iteam.xdata?.beds}</span>
                                                                            </div>
                                                                            <div className="property-box-footer-left-icon">
                                                                                <img src={bathIcon} alt="" style={{width: '30px', height: '30px'}} />
                                                                                <span className="pd-l10p">{iteam.listing?.bathrooms}</span>
                                                                            </div>
                                                                            <div className="property-box-footer-left-icon">
                                                                                {/* <img src={bedsIcon} alt="" style={{width: '30px', height: '30px'}} /> */}
                                                                                <div>Bedrooms</div>
                                                                                <span className="pd-l10p">{iteam.listing?.bedrooms}</span>
                                                                            </div>

                                                                        </div>
                                                                    </div> 
                                                                    <div class="channel">
                                                                        <span>Channel : <strong>{iteam.channelSource}</strong></span>
                                                                        <span>Partner Manager : <strong>{iteam.xdata.pmName}</strong></span>
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    {listings.map((iteam, index) => {
                                        const selectIds = selectedfilteredlistings.map(itm => itm.listing._id);
                                        if(selectIds.indexOf(iteam.listing._id) === -1) {
                                            return (
                                                <tr key={`fltlst${index}`}>
                                                    <td className="column-body" >
                                                        <input 
                                                            className={`selectlisting-input`} 
                                                            type="checkbox" 
                                                            checked={new Set(selectedfilteredlistings.map(itm => itm.listing._id)).has(iteam.listing._id)} 
                                                            onChange={() => handleSelectedListings(iteam, index)} 
                                                        />
                                                    </td>
                                                    <td className="column-body two-line-cell">
                                                        <div class="line-one">
                                                            {
                                                                !isNullOrEmptyArray(iteam.xdata.pictures) ? (
                                                                    <img src={`${iteam.xdata.pictures[0].original}`} alt="Main Photo" class="main-photo" />
                                                                ) : !isNullOrEmptyArray(iteam.listing.pictures) ? (
                                                                    <img src={`${iteam.listing.pictures[0].original}`} alt="Main Photo" class="main-photo" />
                                                                ) : ('')
                                                            }
                                                            
                                                        </div>
                                                        <div class="line-two">
                                                            <div class="line-two-line-one">
                                                                <span class="nick-title">
                                                                    <strong class="nick">{iteam.listing.nickname}</strong> - <span class="title"><strong class="nick">{iteam.listing?.propertyType}</strong>, </span>
                                                                </span>
                                                                <span class="nick-title">
                                                                    <span class="title">{iteam.listing?.address?.country},{iteam.listing?.address?.state},{iteam.listing?.address?.city} {iteam.listing?.address?.full}</span>
                                                                </span>
                                                            </div>
                                                            <div class="line-two-line-two flx-dr-rw">
                                                                <div class="base-price">
                                                                    <span>
                                                                        Base Price: <strong>{iteam.listing?.prices?.basePrice} {iteam.listing?.prices?.currency}</strong>
                                                                    </span>
                                                                    <span>
                                                                        Weekend:  <strong>{iteam.listing?.prices?.weekendBasePrice || iteam.listing?.prices?.basePrice} {iteam.listing?.prices?.currency}</strong>
                                                                    </span>
                                                                    <span>
                                                                        {iteam.listing?.prices?.weeklyPriceFactor < 1 && (
                                                                            <>
                                                                                week discount: <strong>{parseInt(100 - iteam.listing?.prices?.weeklyPriceFactor * 100)}% </strong>
                                                                            </>
                                                                        )}
                                                                    </span>
                                                                    <span>
                                                                        {iteam.listing?.prices?.monthlyPriceFactor < 1 && (
                                                                            <>
                                                                                month discount: <strong>{parseInt(100 - iteam.listing?.prices?.monthlyPriceFactor * 100)}% </strong>
                                                                            </>
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div class="collections">
                                                                    {renderSpecialCollections(iteam)}
                                                                    <div className="property-box-footer-left" style={{marginTop: "-10px"}}>
                                                                        <div className="property-box-footer-left-icon">
                                                                            <img src={peopleIcon} alt="" style={{width: '30px', height: '30px'}} />
                                                                            <span className="pd-l10p">{iteam.listing?.accommodates}</span>
                                                                        </div>
                                                                        <div className="property-box-footer-left-icon">
                                                                            <img src={bedsIcon} alt="" style={{width: '30px', height: '30px'}} />
                                                                            <span className="pd-l10p">{iteam.xdata?.beds}</span>
                                                                        </div>
                                                                        <div className="property-box-footer-left-icon">
                                                                            <img src={bathIcon} alt="" style={{width: '30px', height: '30px'}} />
                                                                            <span className="pd-l10p">{iteam.listing?.bathrooms}</span>
                                                                        </div>
                                                                        <div className="property-box-footer-left-icon">
                                                                            {/* <img src={bedsIcon} alt="" style={{width: '30px', height: '30px'}} /> */}
                                                                            <div>Bedrooms</div>
                                                                            <span className="pd-l10p">{iteam.listing?.bedrooms}</span>
                                                                        </div>
    
                                                                    </div>
                                                                </div> 
                                                                <div class="channel">
                                                                    <span>Channel : <strong>{iteam.channelSource}</strong></span>
                                                                    <span>Partner Manager : <strong>{iteam.xdata.pmName}</strong></span>
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) 
                                        }
                                        return null;
                                    })}
                                    </tbody>
                                </table>
                                {/* <table class="table">
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
                                </table> */}
                        </div>
                        <div className="row" style={{margin: 0, padding: "5px"}}>
                            <div className="col-12" style={{textAlign: 'right'}}>
                                <span className="btn-custom01"> 
                                    {selectedfilteredlistings.length ? `${selectedfilteredlistings.length} selected` : ''}
                                </span>
                                <span>
                                    <button className="btn btn-secondary btn-custom02" onClick={deSelectAllListings} >Cancel</button>
                                </span>
                                <span>
                                    <button className="btn btn-primary btn-custom01" disabled={!selectedfilteredlistings.length} onClick={() => updateFilteredListings(false)}>Done</button>
                                </span>
                                
                            </div>
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
