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

import { data } from "./makeData.js";

import axios from "axios"
import { baseURL } from "../../core/index.js"
import PageHeader from "../../components/PageHeader"
import { PATH_PROPERTY,PATH_SIGNOUT,PATH_LOGIN, APP_DISPLAY_NAME } from "../../Util/constants"
import { useLocation, useHistory } from "react-router-dom";

import { getStorageValue } from "../../Util/general.js";

import "../Listings2/Listings.scss"

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


import menuIcon from '../../assets/icons8-menu-50.png'
import * as userActions from "../../store/redux/User/actions";
import Layout from "../../components/Layout";

const NEW_CLIENT = {
    id: "-1",
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    phone: "",
}


const ListingsRU_DECLINED_BUT_LISTED_ON_RU = (props) => {
const partnersPageLastPageNumber = localStorage.getItem('partnersPageLastPageNumber'); //added by jaison for Liron 2025 June 11
    
const [searchPropertyId, setSearchPropertyId] = useState('');

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

const goToPartnersPage = () => {
    //alert(partnersPageLastPageNumber)
    history.push('/partners?page='+partnersPageLastPageNumber);
}

    const { agency, agent, token, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props

    	const agentData = JSON.parse( localStorage.getItem('agent') );


    const [refresh, setRefresh] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCollections, setSelectedCollections] = useState([])
    const [selectedChannels, setSelectedChannels] = useState([])
    // const agent = JSON.parse(localStorage.getItem("agent"));
    // const agency = JSON.parse(localStorage.getItem("travelAgency"));
    let searchParms = {}
    const [searchInputes, setsearchInputes] = useState({
    })
    const history = useHistory();
    const location = useLocation();
    const partner = JSON.parse(localStorage.getItem("partner"))
    const accountId = localStorage.getItem("accountId")

    const property_status_to_filter = localStorage.getItem("property_status_to_filter")

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
    
    const [decliningReason, setDecliningReason] = useState('');
    const [decliningReasonOther, setDecliningReasonOther] = useState('');
    const [actualDecliningReason, setActualDecliningReason] = useState('');


    const [filterPropertyStatus, setFilterPropertyStatus] = useState('');
    const filterByPropertyStatus = (event) => {
        console.log(event.target.value)
        setFilterPropertyStatus(event.target.value);

        unCheckAll();
        setCheckedAll(false)        
    }


const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');

    const [checkedAll, setCheckedAll] = useState(false);

    const [filterPropertyZipcode, setFilterPropertyZipcode] = useState('');
    const filterByZipcode = (event) => {
        console.log(event.target.value)
        setFilterPropertyZipcode(event.target.value);

        unCheckAll();
        setCheckedAll(false)        
    }    

    const [filterRegionMappedUnmapped, setFilterRegionMappedUnmapped] = useState('');
    const filterByMappedUnmappedRegion = (event) => {
        console.log(event.target.value)
        setFilterRegionMappedUnmapped(event.target.value);

        unCheckAll();
        setCheckedAll(false)        
    }    

    

function updateDecliningReasonData() { //Didn't work all the time.
    if(propStatus==='Declined') {
    if(decliningReason==='Other') {
        setActualDecliningReason( decliningReasonOther );
    } else {
        setActualDecliningReason(  decliningReason );
    }
} else {
    setActualDecliningReason('')
}
}    

const checkAll = () => {
        document.querySelectorAll('input[name="listing_ids_to_update[]"]').forEach(checkbox => {
            checkbox.checked = true;
        });       
}
const unCheckAll = () => {
        document.querySelectorAll('input[name="listing_ids_to_update[]"]').forEach(checkbox => {
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





        const checkboxes = document.querySelectorAll('input[name="listing_ids_to_update[]"]:checked');
        const listingIdsToUpdate = Array.from(checkboxes).map(cb => cb.value);

if(propStatus==='Approved') {

    let unmapped_properties = 0;
    listingIdsToUpdate.forEach((id) => {
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

}        


const listingIdsToUpdateCleaned = listingIdsToUpdate.map(id => id.replace('_unmapped', ''));


        const updateListingsData = {'accountId':partner?.accountId,'ids':listingIdsToUpdateCleaned, 'status':propStatus, decliningReason:reason_decline, statusUpdatedBy:agentData.firstName}

console.log('updateListingsData:::', updateListingsData);
//return false;

        if(listingIdsToUpdateCleaned.length > 0 && propStatus !== '') {
            const ShubResponse = await userRequest.post(constants.SHUB_URL+'/local/listings/update-multiple-listings-status-just-for-ids', updateListingsData);

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
            //source:(accountId!=='585a39dbe43900100017e9e8')?source:'SH',

            /*
            source:'smiling_house_api',
            channelSource:partner.source,
            accountId,
            limit: constants.PAGING_LISTING_SIZE, 
            skip: clientPagingFrom - 1,
            sortBy: 'data.nickname:1',
            */
            limit: constants.PAGING_LISTING_SIZE, 
            skip: clientPagingFrom - 1,
            ids: ["sh6100",
"sh6106",
"sh6120",
"sh6289",
"sh6293",
"sh6305",
"sh6309",
"sh6317",
"sh6349",
"sh6350",
"sh6353",
"sh6863",
"sh6865",
"sh7037",
"sh7038",
"sh7039",
"sh7040",
"sh7041",
"sh7042",
"sh7044",
"sh7047",
"sh7054",
"sh7055",
"sh7057",
"sh7061",
"sh7063",
"sh7065",
"sh7066",
"sh7071",
"sh7073",
"sh7074",
"sh7075",
"sh7076",
"sh7077",
"sh7079",
"sh7081",
"sh7083",
"sh7089",
"sh7095",
"sh7097",
"sh7098",
"sh7099",
"sh7100",
"sh7101",
"sh7102",
"sh7104",
"sh7105",
"sh7106",
"sh7109",
"sh7111",
"sh7112",
"sh7117",
"sh7118",
"sh7119",
"sh7121",
"sh7128",
"sh7129",
"sh7131",
"sh7133",
"sh7137",
"sh7138",
"sh7140",
"sh7141",
"sh7147",
"sh7149",
"sh7150",
"sh7151",
"sh7152",
"sh7155",
"sh7156",
"sh7158",
"sh7159",
"sh7161",
"sh7164",
"sh7165",
"sh7166",
"sh7167",
"sh7168",
"sh7169",
"sh7170",
"sh7172",
"sh7173",
"sh7709",
"sh7711",
"sh7712",
"sh7825",
"sh7826",
"sh7827",
"sh7832",
"sh7833",
"sh7834",
"sh7835",
"sh7836",
"sh7837",
"sh7844",
"sh7848",
"sh7856",
"sh7860",
"sh7865",
"sh7866",
"sh7869",
"sh7870",
"sh7875",
"sh7883",
"sh7884",
"sh8023",
"sh8024",
"sh8105",
"sh8194",
"sh8305",
"sh8306",
"sh8310",
"sh8311",
"sh8322",
"sh8323",
"sh8331",
"sh8334",
"sh8335",
"sh8343",
"sh8355",
"sh8364",
"sh8370",
"sh8374",
"sh8375",
"sh8376",
"sh8426",
"sh8570",
"sh8571",
"sh8572",
"sh8573",
"sh8574",
"sh8575",
"sh8576",
"sh8577",
"sh8578",
"sh8579",
"sh8580",
"sh8581",
"sh8582",
"sh8583",
"sh8584",
"sh8585",
"sh8586",
"sh8587",
"sh8588",
"sh8589",
"sh8590",
"sh8591",
"sh8592",
"sh8593",
"sh8594",
"sh8595",
"sh8596",
"sh8597",
"sh8598",
"sh8634",
"sh8636",
"sh8638",
"sh8778",
"sh8802",
"sh8867",
"sh9152",
"sh9480",
"sh9483",
"sh9485",
"sh9486",
"sh9491",
"sh9496",
"sh9502",
"sh9506",
"sh9508",
"sh9547",
"sh9590",
"sh9829",
"sh9888",
"sh9894",
"sh9895",
"sh9896",
"sh9970",
"sh9971",
"sh9986",
"sh9987",
"sh10163",
"sh10170",
"sh10174",
"sh10384",
"sh10387",
"sh10388",
"sh10390",
"sh10395",
"sh10396",
"sh10402",
"sh10403",
"sh10405",
"sh10406",
"sh10407",
"sh10408",
"sh10411",
"sh10412",
"sh10413",
"sh10416",
"sh10417",
"sh10666",
"sh10679",
"sh10681",
"sh10686",
"sh10692",
"sh10694",
"sh10695",
"sh10697",
"sh10699",
"sh10702",
"sh10706",
"sh10720",
"sh10721",
"sh10817",
"sh10818",
"sh10819",
"sh10828",
"sh10829",
"sh10837",
"sh10838",
"sh10839",
"sh10840",
"sh10841",
"sh10842",
"sh10843",
"sh10844",
"sh10845",
"sh10889",
"sh10895",
"sh10896",
"sh10904",
"sh10905",
"sh10906",
"sh10907",
"sh10918",
"sh10919",
"sh10921",
"sh10981",
"sh10984",
"sh10989",
"sh10990",
"sh10991",
"sh11008",
"sh11017",
"sh11022",
"sh11024",
"sh11040",
"sh11046",
"sh11049",
"sh11051",
"sh11055",
"sh11056",
"sh11057",
"sh11058",
"sh11059",
"sh11060",
"sh11061",
"sh11062",
"sh11063",
"sh11072",
"sh11076",
"sh11077",
"sh11078",
"sh11079",
"sh11081",
"sh11082",
"sh11083",
"sh11084",
"sh11085",
"sh11086",
"sh11087",
"sh11089",
"sh11090",
"sh11092",
"sh11093",
"sh11094",
"sh11095",
"sh11102",
"sh11104",
"sh11117",
"sh11119",
"sh11121",
"sh11163",
"sh11164",
"sh11169",
"sh11170",
"sh11172",
"sh11173",
"sh11180",
"sh11182",
"sh11183",
"sh11184",
"sh11185",
"sh11186",
"sh11187",
"sh11190",
"sh11194",
"sh11195",
"sh11196",
"sh11201",
"sh11202",
"sh11203",
"sh11204",
"sh11205",
"sh11215",
"sh11216",
"sh11221",
"sh11222",
"sh11223",
"sh11224",
"sh11226",
"sh11227",
"sh11228",
"sh11231",
"sh11234",
"sh11235",
"sh11236",
"sh11237",
"sh11238",
"sh11239",
"sh11240",
"sh11242",
"sh11243",
"sh11246",
"sh11247",
"sh11248",
"sh11249",
"sh11250",
"sh11260",
"sh11546",
"sh11552",
"sh11559",
"sh11562",
"sh11564",
"sh11565",
"sh11568",
"sh11569",
"sh11570",
"sh11571",
"sh11572",
"sh11573",
"sh11574",
"sh11575",
"sh11576",
"sh11578",
"sh11580",
"sh11581",
"sh11583",
"sh11586",
"sh11587",
"sh11592",
"sh11594",
"sh11597",
"sh11604",
"sh11613",
"sh11655",
"sh11669",
"sh11670",
"sh11671",
"sh11674",
"sh11678",
"sh11679",
"sh11686",
"sh11688",
"sh11689",
"sh11690",
"sh11691",
"sh11692",
"sh11693",
"sh11709",
"sh11710",
"sh11711",
"sh11712",
"sh11713",
"sh11714",
"sh11715",
"sh11716",
"sh11717",
"sh11745",
"sh11747",
"sh11779",
"sh11780",
"sh11781",
"sh11782",
"sh11783",
"sh11784",
"sh11785",
"sh11786",
"sh11787",
"sh11788",
"sh11789",
"sh11790",
"sh11791",
"sh11792",
"sh11793",
"sh11798",
"sh11811",
"sh11820",
"sh11882",
"sh11886",
"sh11890",
"sh11893",
"sh11895",
"sh11899",
"sh11900",
"sh11902",
"sh12123",
"sh12182",
"sh12193",
"sh12260",
"sh12261",
"sh12262",
"sh12263",
"sh12264",
"sh12289",
"sh12366",
"sh12368",
"sh12442",
"sh12445",
"sh12447",
"sh12448",
"sh12451",
"sh12452",
"sh12457",
"sh12458",
"sh12465",
"sh12482",
"sh12598",
"sh12601",
"sh12602",
"sh12605",
"sh12606",
"sh12607",
"sh12609",
"sh12615",
"sh12618",
"sh12619",
"sh12622",
"sh12623",
"sh12624",
"sh12625",
"sh12626",
"sh13535",
"sh13536",
"sh13537",
"sh13538",
"sh13539",
"sh13540",
"sh13542",
"sh13544",
"sh13545",
"sh13547",
"sh13549",
"sh13550",
"sh13551",
"sh13554",
"sh13556",
"sh13557",
"sh13560",
"sh13561",
"sh13562",
"sh13563",
"sh13564",
"sh13565",
"sh13566",
"sh13569",
"sh13570",
"sh13572",
"sh13573",
"sh13574",
"sh13870",
"sh13871",
"sh13872",
"sh13873",
"sh13875",
"sh13876",
"sh13877",
"sh13878",
"sh13879",
"sh13880",
"sh13881",
"sh13882",
"sh13883",
"sh13884",
"sh13885",
"sh13886",
"sh13887",
"sh13889",
"sh13890",
"sh13892",
"sh13893",
"sh13894",
"sh13895",
"sh13897",
"sh13898",
"sh13899",
"sh13900",
"sh13901",
"sh13902",
"sh13903",
"sh13904",
"sh13905",
"sh13907",
"sh13908",
"sh13909",
"sh13910",
"sh13911",
"sh13912",
"sh13913",
"sh13914",
"sh13915",
"sh13916",
"sh13925",
"sh13926",
"sh14187",
"sh14188",
"sh14189",
"sh14192",
"sh14193",
"sh14899",
"sh14900",
"sh16118",
"sh16119",
"sh16120",
"sh16121",
"sh16122",
"sh16124",
"sh16125",
"sh16126",
"sh16127",
"sh16128",
"sh16129",
"sh16586",
"sh16587",
"sh16589",
"sh16590",
"sh16591",
"sh16593",
"sh16595",
"sh17878",
"sh17886",
"sh17926",
"sh17934",
"sh17935",
"sh17937",
"sh17938",
"sh17939",
"sh17941",
"sh17945",
"sh17948",
"sh17949",
"sh17952",
"sh17953",
"sh17954",
"sh17955",
"sh17956",
"sh17957",
"sh17958",
"sh17959",
"sh17960",
"sh17961",
"sh17962",
"sh17964",
"sh17965",
"sh17966",
"sh17967",
"sh18493",
"sh18495",
"sh18496",
"sh18497",
"sh18499",
"sh18501",
"sh18502",
"sh18506",
"sh18514",
"sh18520",
"sh18523",
"sh18524",
"sh18700",
"sh18701",
"sh18960",
"sh18961",
"sh19147",
"sh19150",
"sh19151",
"sh19152",
"sh19153",
"sh19157",
"sh19158",
"sh19159",
"sh19160",
"sh19161",
"sh19162",
"sh19163",
"sh19164",
"sh19166",
"sh19167",
"sh19168",
"sh19169",
"sh19171",
"sh19172",
"sh19173",
"sh19174",
"sh19175",
"sh19176",
"sh19177",
"sh19178",
"sh19179",
"sh19180",
"sh19181",
"sh19182",
"sh19184",
"sh19185",
"sh19188",
"sh19189",
"sh19190",
"sh19191",
"sh19192",
"sh19194",
"sh19195",
"sh19196",
"sh19197",
"sh19198",
"sh19209",
"sh19210",
"sh19211",
"sh19212",
"sh19435",
"sh19436",
"sh19440",
"sh19470",
"sh19471",
"sh19479",
"sh19480",
"sh19481",
"sh19482",
"sh19483",
"sh19484",
"sh19485",
"sh19486",
"sh19487",
"sh19488",
"sh19489",
"sh19490",
"sh19491",
"sh19492",
"sh19493",
"sh19702",
"sh19703",
"sh19709",
"sh19710",
"sh19711",
"sh19713",
"sh19714",
"sh19716",
"sh19721",
"sh19722",
"sh20236",
"sh20241",
"sh20345",
"sh20346",
"sh20347",
"sh20348",
"sh20349",
"sh20350",
"sh20351",
"sh20352",
"sh20353",
"sh20355",
"sh20356",
"sh20357",
"sh20358",
"sh20359",
"sh20360",
"sh20361",
"sh20362",
"sh20363",
"sh20364",
"sh20365",
"sh20366",
"sh20367",
"sh20368",
"sh20369",
"sh20370",
"sh20371",
"sh20372",
"sh20374",
"sh20375",
"sh20376",
"sh20377",
"sh20378",
"sh20379",
"sh20380",
"sh20381",
"sh20382",
"sh20383",
"sh20384",
"sh20385",
"sh20386",
"sh20387",
"sh20388",
"sh20389",
"sh20390",
"sh20391",
"sh20392",
"sh20393",
"sh20394",
"sh20395",
"sh20396",
"sh20397",
"sh20398",
"sh20399",
"sh20400",
"sh20401",
"sh20402",
"sh20403",
"sh20404",
"sh20405",
"sh20406",
"sh20408",
"sh20409",
"sh20410",
"sh20411",
"sh20412",
"sh20413",
"sh20414",
"sh20415",
"sh20416",
"sh20417",
"sh20418",
"sh20419",
"sh20420",
"sh20421",
"sh20422",
"sh20423",
"sh20424",
"sh20425",
"sh20426",
"sh20427",
"sh20428",
"sh20429",
"sh20431",
"sh20432",
"sh20433",
"sh20434",
"sh20435",
"sh20436",
"sh20441",
"sh20442",
"sh20443",
"sh20444",
"sh20445",
"sh20446",
"sh20447",
"sh20448",
"sh20449",
"sh20450",
"sh20451",
"sh20452",
"sh20453",
"sh20454",
"sh20455",
"sh20456",
"sh20457",
"sh20459",
"sh20460",
"sh20461",
"sh20462",
"sh20463",
"sh20465",
"sh20466",
"sh20467",
"sh20468",
"sh20469",
"sh20470",
"sh20471",
"sh20472",
"sh20473",
"sh20474",
"sh20475",
"sh20476",
"sh20477",
"sh20478",
"sh20479",
"sh20480",
"sh20481",
"sh20482",
"sh20483",
"sh20484",
"sh20485",
"sh20486",
"sh20487",
"sh20488",
"sh20489",
"sh20490",
"sh20491",
"sh20492",
"sh20493",
"sh20494",
"sh20495",
"sh20496",
"sh20499",
"sh20501",
"sh20502",
"sh20503",
"sh20504",
"sh20505",
"sh20506",
"sh20507",
"sh20508",
"sh20509",
"sh20510",
"sh20511",
"sh20512",
"sh20513",
"sh20514",
"sh20515",
"sh20516",
"sh20517",
"sh20518",
"sh20519",
"sh20520",
"sh20521",
"sh20522",
"sh20523",
"sh20526",
"sh20527",
"sh20528",
"sh20529",
"sh20530",
"sh20531",
"sh20532",
"sh20533",
"sh20534",
"sh20535",
"sh20563",
"sh20565",
"sh20570",
"sh20576",
"sh20578",
"sh20583",
"sh20584",
"sh20585",
"sh20588",
"sh20590",
"sh20592",
"sh20796",
"sh20820",
"sh20821",
"sh20822",
"sh20823",
"sh20824",
"sh20825",
"sh20826",
"sh20827",
"sh20851",
"sh20852",
"sh20854",
"sh20855",
"sh20857",
"sh20858",
"sh20860",
"sh20861",
"sh20862",
"sh20863",
"sh20865",
"sh20941",
"sh20942",
"sh20943",
"sh20944",
"sh20945",
"sh20946",
"sh20947",
"sh20948",
"sh20949",
"sh20950",
"sh20951",
"sh20953",
"sh20954",
"sh20955",
"sh20956",
"sh20957",
"sh20958",
"sh20959",
"sh20961",
"sh20963",
"sh20964",
"sh20965",
"sh20966",
"sh20967",
"sh20971",
"sh20972",
"sh20973",
"sh20974",
"sh20975",
"sh20977",
"sh20978",
"sh20979",
"sh20980",
"sh20981",
"sh20982",
"sh20990",
"sh20991",
"sh20993",
"sh20998",
"sh20999",
"sh21002",
"sh21004",
"sh21005",
"sh21007",
"sh21008",
"sh21009",
"sh21010",
"sh21011",
"sh21012",
"sh21013",
"sh21018",
"sh21019",
"sh21021",
"sh21022",
"sh21023",
"sh21024",
"sh21025",
"sh21026",
"sh21027",
"sh21028",
"sh21029",
"sh21030",
"sh21031",
"sh21032",
"sh21033",
"sh21035",
"sh21036",
"sh21037",
"sh21038",
"sh21039",
"sh21040",
"sh21041",
"sh21042",
"sh21044",
"sh21141",
"sh21143",
"sh21145",
"sh21147",
"sh21182",
"sh21183",
"sh21184",
"sh21185",
"sh21186",
"sh21187",
"sh21188",
"sh21190",
"sh21191",
"sh21192",
"sh23832",
"sh23877",
"sh23878",
"sh24096",
"sh24097",
"sh24113",
"sh24114",
"sh24237",
"sh24238",
"sh24239",
"sh24240",
"sh24242",
"sh24243",
"sh24244",
"sh24245",
"sh24246",
"sh24247",
"sh24248",
"sh24251",
"sh24252",
"sh24253",
"sh24254",
"sh24255",
"sh24256",
"sh24257",
"sh24258",
"sh24259",
"sh24260",
"sh24262",
"sh24263",
"sh24265",
"sh24582",
"sh24583",
"sh24584",
"sh24585",
"sh24586",
"sh24587",
"sh24588",
"sh24589",
"sh24590",
"sh24592",
"sh24593",
"sh24594",
"sh24595",
"sh24596",
"sh24630",
"sh24631",
"sh24632",
"sh24633",
"sh24634",
"sh24665",
"sh24666",
"sh24667",
"sh24669",
"sh24670",
"sh24671",
"sh24673",
"sh24674",
"sh24675",
"sh24676",
"sh24677",
"sh24678",
"sh24679",
"sh24680",
"sh24681",
"sh24682",
"sh24683",
"sh24684",
"sh24685",
"sh24686",
"sh24693",
"sh24694",
"sh24696",
"sh24697",
"sh24698",
"sh24699",
"sh24702",
"sh24703",
"sh24715",
"sh24716",
"sh24717",
"sh24754",
"sh24755",
"sh24756",
"sh24758",
"sh24759",
"sh24760",
"sh24761",
"sh24763",
"sh24764",
"sh24765",
"sh24766",
"sh24767",
"sh24768",
"sh24771",
"sh24774",
"sh24784",
"sh24792",
"sh24794",
"sh24795",
"sh24796",
"sh24797",
"sh24798",
"sh24799",
"sh24801",
"sh24803",
"sh24804",
"sh24805",
"sh24807",
"sh24808",
"sh24810",
"sh24811",
"sh24812",
"sh24813",
"sh24814",
"sh24815",
"sh24816",
"sh24818",
"sh24819",
"sh24820",
"sh24822",
"sh24824",
"sh24832",
"sh24833",
"sh24835",
"sh24836",
"sh24837",
"sh24838",
"sh24839",
"sh24840",
"sh24841",
"sh24842",
"sh24843",
"sh24844",
"sh24845",
"sh24846",
"sh24847",
"sh24848",
"sh24849",
"sh24850",
"sh24851",
"sh24852",
"sh24854",
"sh24857",
"sh24859",
"sh24861",
"sh24868",
"sh25180",
"sh25251",
"sh25252",
"sh25253",
"sh25254",
"sh25286",
"sh25400",
"sh25401",
"sh25402",
"sh25403",
"sh25405",
"sh25406",
"sh25407",
"sh25408",
"sh25409",
"sh25410",
"sh25411",
"sh25412",
"sh25413",
"sh25414",
"sh25416",
"sh25425",
"sh25426",
"sh25427",
"sh25428",
"sh25429",
"sh25431",
"sh25496",
"sh25497",
"sh25498",
"sh25499",
"sh25500",
"sh25501",
"sh25502",
"sh25503",
"sh25504",
"sh25505",
"sh25506",
"sh25507",
"sh25509",
"sh25510",
"sh25511",
"sh25512",
"sh25513",
"sh25514",
"sh25515",
"sh25516",
"sh25517",
"sh25518",
"sh25519",
"sh25520",
"sh25521",
"sh25523",
"sh25524",
"sh25525",
"sh25526",
"sh25528",
"sh25529",
"sh25533",
"sh25534",
"sh25535",
"sh25536",
"sh25540",
"sh25541",
"sh25544",
"sh25545",
"sh25732",
"sh25733",
"sh25734",
"sh25735",
"sh25736",
"sh25737",
"sh25738",
"sh25741",
"sh25742",
"sh25744",
"sh25745",
"sh25746",
"sh25747",
"sh25748",
"sh25749",
"sh25750",
"sh25751",
"sh25752",
"sh25753",
"sh25754",
"sh25755",
"sh25756",
"sh25757",
"sh25760",
"sh25761",
"sh25762",
"sh25763",
"sh25764",
"sh25765",
"sh25766",
"sh25767",
"sh25768",
"sh25769",
"sh25770",
"sh25771",
"sh25772",
"sh25773",
"sh25774",
"sh25775",
"sh25776",
"sh25777",
"sh25778",
"sh25779",
"sh25780",
"sh25781",
"sh25969",
"sh26045",
"sh26046",
"sh26051",
"sh26054",
"sh26055",
"sh26056",
"sh26175",
"sh26176",
"sh26298",
"sh26299",
"sh26300",
"sh26301",
"sh26302",
"sh26539",
"sh26540",
"sh26541",
"sh26542",
"sh26543",
"sh26624",
"sh26652",
"sh26654",
"sh26655",
"sh26656",
"sh26657",
"sh26658",
"sh26659",
"sh26662",
"sh26663",
"sh26664",
"sh26665",
"sh26666",
"sh26667",
"sh26670",
"sh26671",
"sh26673",
"sh26674",
"sh26675",
"sh26677",
"sh26678",
"sh26679",
"sh26682",
"sh26683",
"sh26685",
"sh26687",
"sh26688",
"sh26689",
"sh26690",
"sh26691",
"sh26692",
"sh26693",
"sh26694",
"sh26700",
"sh26702",
"sh26703",
"sh26704",
"sh26705",
"sh26709",
"sh26710",
"sh26711",
"sh26712",
"sh26713",
"sh26714",
"sh26716",
"sh26719",
"sh26720",
"sh26721",
"sh26797",
"sh26823",
"sh26832",
"sh26859",
"sh26860",
"sh26861",
"sh26862",
"sh26863",
"sh26864",
"sh26865",
"sh26866",
"sh26867",
"sh26868",
"sh26869",
"sh26870",
"sh26871",
"sh26872",
"sh26873",
"sh26874",
"sh26875",
"sh26876",
"sh26877",
"sh26878",
"sh26879",
"sh26880",
"sh26881",
"sh26882",
"sh26883",
"sh26884",
"sh26887",
"sh26963",
"sh26964",
"sh26965",
"sh26966",
"sh26967",
"sh26968",
"sh26969",
"sh26970",
"sh26972",
"sh26973",
"sh26974",
"sh26975",
"sh26976",
"sh26977",
"sh26978",
"sh26979",
"sh26980",
"sh26981",
"sh26983",
"sh26984",
"sh26995",
"sh26996",
"sh27046",
"sh27048",
"sh27050",
"sh27051",
"sh27053",
"sh27054",
"sh27055",
"sh27056",
"sh27059",
"sh27065",
"sh27066",
"sh27067",
"sh27068",
"sh27070",
"sh27073",
"sh27074",
"sh27075",
"sh27076",
"sh27078",
"sh27079",
"sh27080",
"sh27082",
"sh27083",
"sh27085",
"sh27087",
"sh27088",
"sh27090",
"sh27092",
"sh27096",
"sh27097",
"sh27098",
"sh27099",
"sh27101",
"sh27102",
"sh27104",
"sh27105",
"sh27106",
"sh27108",
"sh27109",
"sh27110",
"sh27112",
"sh27113",
"sh27114",
"sh27115",
"sh27116",
"sh27117",
"sh27118",
"sh27119",
"sh27120",
"sh27124",
"sh27125",
"sh27126",
"sh27127",
"sh27134",
"sh27136",
"sh27137",
"sh27138",
"sh27139",
"sh27233",
"sh27237",
"sh27238",
"sh27255",
"sh27256",
"sh27260",
"sh27263",
"sh27265",
"sh27267",
"sh27268",
"sh27272",
"sh27278",
"sh27279",
"sh27280",
"sh27281",
"sh27282",
"sh27284",
"sh27285",
"sh27286",
"sh27289",
"sh27291",
"sh27292",
"sh27294",
"sh27295",
"sh27296",
"sh27299",
"sh27301",
"sh27302",
"sh27303",
"sh27306",
"sh27307",
"sh27310",
"sh27325",
"sh27328",
"sh27331",
"sh27333",
"sh27339",
"sh27341",
"sh27345",
"sh27347",
"sh27349",
"sh27351",
"sh27352",
"sh27353",
"sh27355",
"sh27356",
"sh27357",
"sh27358",
"sh27359",
"sh27360",
"sh27361",
"sh27362",
"sh27363",
"sh27364",
"sh27365",
"sh27366",
"sh27367",
"sh27368",
"sh27370",
"sh27376",
"sh27377",
"sh27378",
"sh27379",
"sh27381",
"sh27382",
"sh27383",
"sh27384",
"sh27385",
"sh27386",
"sh27387",
"sh27388",
"sh27389",
"sh27390",
"sh27391",
"sh27392",
"sh27393",
"sh27394",
"sh27395",
"sh27396",
"sh27397",
"sh27398",
"sh27399",
"sh27400",
"sh27401",
"sh27402",
"sh27403",
"sh27404",
"sh27405",
"sh27406",
"sh27407",
"sh27408",
"sh27418",
"sh27419",
"sh27421",
"sh27422",
"sh27424",
"sh27425",
"sh27426",
"sh27427",
"sh27428",
"sh27429",
"sh27431",
"sh27433",
"sh27437",
"sh27471",
"sh27474",
"sh27475",
"sh27490",
"sh27492",
"sh27493",
"sh27495",
"sh27498",
"sh27499",
"sh27590",
"sh27591",
"sh27592",
"sh27613",
"sh27674",
"sh27691",
"sh27692",
"sh27693",
"sh27694",
"sh27772",
"sh27782",
"sh27785",
"sh27786",
"sh27788",
"sh27814",
"sh27815",
"sh27817",
"sh27850",
"sh27909",
"sh27912",
"sh27918",
"sh27919",
"sh27920",
"sh27921",
"sh27922",
"sh27923",
"sh27924",
"sh27925",
"sh27926",
"sh27927",
"sh27928",
"sh27929",
"sh27930",
"sh27931",
"sh27932",
"sh27933",
"sh27973",
"sh27996",
"sh27999",
"sh28008",
"sh28016",
"sh28116",
"sh28117",
"sh28136",
"sh28137",
"sh28138",
"sh28140",
"sh28141",
"sh28142",
"sh28143",
"sh28144",
"sh28145",
"sh28146",
"sh28147",
"sh28148",
"sh28150",
"sh28151",
"sh28152",
"sh28197",
"sh28198",
"sh28238",
"sh28239",
"sh28240",
"sh28338",
"sh28345",
"sh28375",
"sh28376",
"sh28377",
"sh28378",
"sh28379",
"sh28380",
"sh28381",
"sh28382",
"sh28387",
"sh28388",
"sh28397",
"sh28398",
"sh28399",
"sh28400",
"sh28401",
"sh28402",
"sh28403",
"sh28449",
"sh28479",
"sh28500",
"sh28557",
"sh28568",
"sh28580",
"sh28612",
"sh28613",
"sh28656",
"sh28672",
"sh28673",
"sh28674",
"sh28991",
"sh29024",
"sh29025",
"sh29026",
"sh29028",
"sh29029",
"sh29030",
"sh29031",
"sh29032",
"sh29033",
"sh29034",
"sh29035",
"sh29037",
"sh29038",
"sh29039",
"sh29040",
"sh29042",
"sh29043",
"sh29045",
"sh29046",
"sh29048",
"sh29050",
"sh29051",
"sh29054",
"sh29057",
"sh29058",
"sh29059",
"sh29060",
"sh29061",
"sh29062",
"sh29063",
"sh29066",
"sh29068",
"sh29070",
"sh29074",
"sh29076",
"sh29078",
"sh29080",
"sh29082",
"sh29085",
"sh29086",
"sh29088",
"sh29090",
"sh29092",
"sh29093",
"sh29095",
"sh29097",
"sh29098",
"sh29100",
"sh29102",
"sh29103",
"sh29104",
"sh29105",
"sh29128",
"sh29135",
"sh29137",
"sh29139",
"sh29141",
"sh29142",
"sh29145",
"sh29148",
"sh29149",
"sh29152",
"sh29161",
"sh29162",
"sh29163",
"sh29164",
"sh29165",
"sh29166",
"sh29168",
"sh29169",
"sh29170",
"sh29171",
"sh29172",
"sh29173",
"sh29174",
"sh29175",
"sh29176",
"sh29177",
"sh29178",
"sh29179",
"sh29180",
"sh29181",
"sh29182",
"sh29183",
"sh29184",
"sh29185",
"sh29186",
"sh29187",
"sh29188",
"sh29189",
"sh29190",
"sh29191",
"sh29193",
"sh29194",
"sh29195",
"sh29205",
"sh29206",
"sh29207",
"sh29208",
"sh29210",
"sh29225",
"sh29226",
"sh29227",
"sh29228",
"sh29229",
"sh29232",
"sh29233",
"sh29234",
"sh29235",
"sh29236",
"sh29242",
"sh29243",
"sh29244",
"sh29245",
"sh29246",
"sh29247",
"sh29248",
"sh29249",
"sh29250",
"sh29251",
"sh29252",
"sh29253",
"sh29254",
"sh29255",
"sh29256",
"sh29257",
"sh29258",
"sh29259",
"sh29260",
"sh29261",
"sh29262",
"sh29263",
"sh29264",
"sh29265",
"sh29266",
"sh29267",
"sh29268",
"sh29269",
"sh29270",
"sh29271",
"sh29272",
"sh29273",
"sh29274",
"sh29275",
"sh29276",
"sh29277",
"sh29278",
"sh29279",
"sh29280",
"sh29281",
"sh29282",
"sh29283",
"sh29284",
"sh29285",
"sh29286",
"sh29287",
"sh29288",
"sh29289",
"sh29290",
"sh29291",
"sh29292",
"sh29293",
"sh29294",
"sh29295",
"sh29296",
"sh29297",
"sh29298",
"sh29299",
"sh29300",
"sh29301",
"sh29302",
"sh29303",
"sh29304",
"sh29329",
"sh29330",
"sh29331",
"sh29332",
"sh29333",
"sh29334",
"sh29335",
"sh29336",
"sh29337",
"sh29338",
"sh29339",
"sh29340",
"sh29350",
"sh29352",
"sh29353",
"sh29375",
"sh29378",
"sh29379",
"sh29380",
"sh29383",
"sh29384",
"sh29385",
"sh29400",
"sh29401",
"sh29404",
"sh29408",
"sh29409",
"sh29667",
"sh29668",
"sh29669",
"sh29670",
"sh29700",
"sh29721",
"sh29722",
"sh29723",
"sh29724",
"sh29725",
"sh29735",
"sh29736",
"sh29763",
"sh29802",
"sh29803",
"sh29812",
"sh29813",
"sh29814",
"sh29815",
"sh29816",
"sh29820",
"sh29821",
"sh29822",
"sh29823",
"sh29824",
"sh29826",
"sh29827",
"sh29828",
"sh29830",
"sh29831",
"sh29832",
"sh29833",
"sh29846",
"sh29871",
"sh29877",
"sh29883",
"sh29897"]
    }

console.log('params::',params) 

    //task: EXTRANET VT - Check the possibilities of adding admin login - https://app.asana.com/1/1200178813358971/project/1209114491925523/task/1210009551590540
    //By Jaison 2025-04-22 START 


    let currentPropertyFilterStatus = '';
    if(property_status_to_filter !== '' || filterPropertyStatus !== '') {

        if(property_status_to_filter !== '') {
            currentPropertyFilterStatus = property_status_to_filter
        }
        
        if(filterPropertyStatus !== '') {
            currentPropertyFilterStatus = filterPropertyStatus
        }

        params.status = currentPropertyFilterStatus;
    } else if(property_status_to_filter === '' && filterPropertyStatus === '') {
        delete params.status;
    }
  

    if(filterPropertyZipcode !== '') {       
        params.extranet_filter_zipcode = filterPropertyZipcode;
    } else if(filterPropertyZipcode==='') {
        delete params.extranet_filter_zipcode;
    }    

    if(filterRegionMappedUnmapped !== '') {       
        params.extranet_filterRegionMappedUnmapped = filterRegionMappedUnmapped;
    } else if(filterRegionMappedUnmapped==='') {
        delete params.extranet_filterRegionMappedUnmapped;
    }     
    //By Jaison 2025-04-22 END


    //By Jaison 2025 October 06 - START
    if(searchPropertyId !== '') {
        if(searchPropertyId.length === 24) {
            params.searchPropertyId = searchPropertyId;
        } else {
            //params.searchPropertyId = `sh${searchPropertyId}`;
            params.searchPropertyId = `sh${searchPropertyId.replace(/^sh/, '')}`;
        }
    } else { 
        delete params.searchPropertyId;
    }
    //By Jaison 2025 October 06 - END


    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    console.log('getting from /listings:',params)
    if (accountId.length > 0) {
 
        const shubSearch=constants.SHUB_URL+'/local/listings-ids';
        setIsLoading(true);
        userRequest.post(`${shubSearch}`, {ids:params.ids, status:'Declined', sortBy: 'data.prices.basePrice:-1',}).then(async response => {
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
                        text: "No Data Found"
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

 }, [refresh,isRefresh, filterPropertyStatus,updateStatusProcess, filterPropertyZipcode,filterRegionMappedUnmapped,searchPropertyId])

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
        name: 'Mapped Status',
        width: '140px'
    },      
    {
      
        name: 'Details',
        width: '250px'
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
    
//     <div className="page-container">
        
//         {/*<div className="page-header">Villa Tracker Extranet ({agentData.firstName})</div>*/}
// 		{/* <div className="page-header"><img src={menuIcon} style={{'width':'25px'}} className="cst-cursor" onClick={showOrHideSideBarMenu} />&nbsp;Villa Tracker Extranet : PMs - {agentData.firstName} (<span className="cst-cursor" onClick={signOut}>Sign Out</span>)</div> */}

//         <div className="page-header" style={{
//             marginLeft: showSideBarMenu ? '250px' : '0',
//             transition: 'margin-left 0.3s ease',
//             // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             background: 'linear-gradient(135deg, #104109 0%, #2d5a2b 100%)',
//             boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//             borderBottom: '1px solid rgba(255,255,255,0.1)'
//         }}>
//             <div className="container-fluid" style={{padding: '0px 50px'}}>
//                 <div className="row align-items-center py-3">
//                     {/* Left Section - Menu & Title */}
//                     <div className="col-lg-8 col-md-7 col-sm-8 col-6">
//                         <div className="d-flex align-items-center">
//                             <button 
//                                 className="btn btn-link p-0 me-3 text-white border-0"
//                                 onClick={showOrHideSideBarMenu}
//                                 style={{
//                                     background: 'none',
//                                     fontSize: '1.2rem',
//                                     transition: 'transform 0.2s ease'
//                                 }}
//                                 onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
//                                 onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
//                             >
//                                 <img 
//                                     src={menuIcon} 
//                                     alt="Menu" 
//                                     style={{
//                                         width: '28px',
//                                         height: '28px',
//                                         filter: 'brightness(0) invert(1)'
//                                     }} 
//                                 />
//                             </button>
                            
//                             <div className="header-title">
//                                 <h1 className="mb-0 text-white d-none d-md-block" style={{
//                                     fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
//                                     fontWeight: '600',
//                                     letterSpacing: '-0.5px'
//                                 }}>
//                                     <span className="d-none d-sm-inline">{APP_DISPLAY_NAME} : </span>
//                                     <span>PMs</span>
//                                     <span className="d-none d-md-inline"> - {agentData.firstName}</span>
//                                 </h1>
                                
//                                 {/* Mobile-only welcome message aligned with menu button */}
//                                 <div className="d-md-none d-flex align-items-center">
//                                     <span className="text-white" style={{
//                                         fontSize: '1.1rem',
//                                         fontWeight: '500',
//                                         lineHeight: '28px' // Matches menu button height for alignment
//                                     }}>
//                                         Welcome, {agentData.firstName}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Right Section - User Actions */}
//                     <div className="col-lg-4 col-md-5 col-sm-4 col-6">
//                         <div className="d-flex justify-content-end align-items-center">
//                             {/* User Info - Hidden on small screens */}
//                             <div className="d-none d-lg-flex align-items-center me-3">
//                                 <div className="user-avatar me-2" style={{
//                                     width: '35px',
//                                     height: '35px',
//                                     borderRadius: '50%',
//                                     background: 'rgba(255,255,255,0.2)',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     color: 'white',
//                                     fontWeight: 'bold',
//                                     fontSize: '14px'
//                                 }}>
//                                     {agentData.firstName.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div className="text-white">
//                                     <div style={{fontSize: '14px', fontWeight: '500'}}>
//                                         {agentData.firstName}
//                                     </div>
//                                     <div style={{fontSize: '12px', opacity: '0.8'}}>
//                                         {extranet_vt_logged_in_role === 'admin' ? 'Administrator' : 'Partner'}
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             {/* Sign Out Button */}
//                             <button
//                                 className="btn btn-outline-light btn-sm"
//                                 onClick={signOut}
//                                 style={{
//                                     borderRadius: '25px',
//                                     padding: '8px 20px',
//                                     fontSize: '14px',
//                                     fontWeight: '500',
//                                     border: '2px solid rgba(255,255,255,0.3)',
//                                     transition: 'all 0.3s ease',
//                                     backdropFilter: 'blur(10px)'
//                                 }}
//                                 onMouseOver={e => {
//                                     e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
//                                     e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
//                                 }}
//                                 onMouseOut={e => {
//                                     e.currentTarget.style.background = 'transparent';
//                                     e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
//                                 }}
//                             >
//                                 <span className=" d-sm-inline">Sign Out</span>
//                                 <span className="d-sm-none">
//                                     <i className="fas fa-sign-out-alt"></i>
//                                 </span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         {showSideBarMenu===true && <Sidebar
//             agency={agency}
//             agent={agent}
//             token={token}
//             screenSize={screenSize}
//             activeMenu={activeMenu}
//             handleToggleMenu={handleToggleMenu}
//             setActiveMenu={setActiveMenu}
//             showOrHideSideBarMenu={showOrHideSideBarMenu}
//         />
// }
//         <div className={showSideBarMenu ? `${"page-body"}` : "page-body-nomargin"} >
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
{extranet_vt_logged_in_role==='admin' &&                    
                    headerSearchRow()
}                    
                </div>

                <div className="listings-main">
                    <div className="listings-paging">Displaying  {ListingsPagingFrom}-{ListingsPagingTo} of {totalListings ? totalListings : "?"} Listings</div>



{/*extranet_vt_logged_in_role==='admin' &&
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
                        {partnerPropertiesUniqueZipcodes && partnerPropertiesUniqueZipcodes.map((item, index) => {
                            return <>
                                <option value={item}>{item}</option>
                            </>
                        })}            
                    </select>
                    </div>

                    <div className="col-sm-2">
                    <label style={{'color':'white'}}><strong>Filter by Mapped/unmapped Region</strong></label>
                    <select class="form-control" onChange={(e)=>filterByMappedUnmappedRegion(e)}>
                        <option value="">--All--</option>
                        <option value="Mapped">Mapped</option>
                        <option value="Unmapped">Unmapped</option>
                    </select>
                    </div>

                    </div>
*/}                    
            
{extranet_vt_logged_in_role==='admin' &&
    <section>
<div style={{'padding':'10px', 'display':'flex', 'align-items':'center', 'row-gap':'20px', 'position':'sticky'}}>
    <div class="col-3">
        <label><strong>Change Selected Property Status:</strong></label>
        <select class="form-control" onChange={ (e) => setPropStatus(e.target.value) }>
            <option value="">-Select Status--</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
        </select>

            {propStatus==='Declined' &&
            <section>
            <label><strong>Select Declining Reason:</strong></label>
            <select class="form-control" onChange={ (e) => setDecliningReason(e.target.value)  }>
                <option value="">-Select Reason--</option>
                <option value="Too cheap">Too cheap</option>
                <option value="With watermark/Picture information">With watermark/Picture information</option>
                <option value="Not feet quality">Not feet quality</option>
                <option value="Existing as SH partner">Existing as SH partner</option>
                <option value="Existing as SH partner">Existing as SH partner</option>
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

<hr />
<div class="row">
    <div class="col-3">
        <label><strong>Search by Property ID</strong></label>
        <input required type="text" placeholder="Search by Property ID" class="form-control" onChange={ (e) => setSearchPropertyId(e.target.value) }  />
    </div>
</div>
</section>
}            

                    {<Paging perPage={constants.PAGING_LISTING_SIZE} totalItems={totalListings} currentPage={pageNumber} onChangePage={onChangePage} />}
                    <div style={{ padding: '0 20px' }}>
                        <div class="table-responsive" style={{ overflow: "auto" }}>
                                <table class="table">
                                    <thead style={{ backgroundColor: "#f9f9f7" }} >

{extranet_vt_logged_in_role==='admin' &&                                        
<tr>
   <td><span onClick={checkUncheckAll}  className="cst-cursor">Check/Uncheck All</span></td> 
</tr>
}
                                        <tr>
                                            {columns?.map((iteam, index) => {
                                                return <>
                                                    {/*<th key={index} scope="col" className="p-4 " style={{ cursor: "pointer", width: iteam.width }}><h3>{iteam.name} <BsChevronDown /></h3></th>*/}
<th key={index} scope="col" className="p-4 " style={{ cursor: "pointer", width: iteam.width }}>{iteam.name} <BsChevronDown /></th>
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

//Custom Title & Desc
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
                                                        QOD={iteam.QOD}
                                                        customTitle={iteam.customTitle}
                                                        customDesc={iteam.customDesc}
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

export default ListingsRU_DECLINED_BUT_LISTED_ON_RU
