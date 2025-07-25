import React, { useEffect, useState } from "react"
import { BsFilter } from "react-icons/bs";
import constants from "../../../Util/constants";
import axios from "axios"
import './EPSFilter.scss';
import EPSFilterListComponent from "./EPSFilterListComponent";
import EPSFilterNumberComponent from "./EPSFilterNumberComponent";

const EPSFilter = (props) => {
    const { getFilteredListings } = props;
    const [searchbytag, setSearchbytag] = useState("Title");
    const [searchbytagvalue, setSearchbytagvalue] = useState("");
    const [filterbyval, setFilterbyval] = useState([]);
    const [filterbyvaldata, setFilterbyvaldata] = useState([]);
    const [tags, setTags] = useState([]);
    const [amneties, setAmneties] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [filteredDataList, setFilteredDataList] = useState([])
    const [searchFilteredListData, setSearchFilteredListData] = useState([])

     let checktimeout = '';
     const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g'
     const userRequest = axios.create({
        headers: {
            Authorization: `Bearer ${token2}`
        }
    })

    const getAllTags = async () => {
        const shubTags=constants.SHUB_URL+'/local/tags';
        userRequest.get(shubTags).then((response) => {
            if(response.status === 200) {
                setTags(response.data?.data[0]?.allTags || [])
            }
        })
    }
    const getAllAmneties = async () => {
        const shubTags=constants.SHUB_URL+'/local/amenities';
        userRequest.get(shubTags).then((response) => {
            if(response.status === 200) {
                
                setAmneties(response.data?.data[0]?.allAmenities || [])
                // console.log(amneties)
            }
        })
    }
    useEffect(() => {
        getAllTags()
        getAllAmneties()
    }, [])

    const handlefilterbyval = (val) => {
        let newfilterbyval = JSON.parse(JSON.stringify(filterbyval));
        let newfilterbyvaldata = JSON.parse(JSON.stringify(filterbyvaldata));
        let newSearchTerm = JSON.parse(JSON.stringify(searchTerm));
        let newfilteredDataList = JSON.parse(JSON.stringify(filteredDataList));
        let newsearchFilteredListData = JSON.parse(JSON.stringify(searchFilteredListData));
        const index = newfilterbyval.indexOf(val);
        let filtDtLst;
        
        if(index === -1) {
            newfilterbyval.push(val)
            newSearchTerm.push('');
            switch(val) {
                case 'country':
                    newfilterbyvaldata.push({
                        field: val,
                        operator: "$in",
                        value:[]
                    })
                    filtDtLst = JSON.parse(localStorage.getItem('countries')) || []
                    break;
                case 'city':
                    newfilterbyvaldata.push({
                        field: val,
                        operator: "$in",
                        value:[]
                    })
                    filtDtLst = JSON.parse(localStorage.getItem('cities')) || []
                    break;
                case 'region':
                    newfilterbyvaldata.push({
                        field: val,
                        operator: "$in",
                        value:[]
                    })
                    filtDtLst = JSON.parse(localStorage.getItem('regions')) || []
                    break;
                case 'tags':
                    newfilterbyvaldata.push({
                        field: val,
                        operator: "$in",
                        value:[]
                    })
                    filtDtLst = tags
                    break;
                case 'amenities':
                    newfilterbyvaldata.push({
                        field: val,
                        operator: "$in",
                        value:[]
                    })
                    filtDtLst = amneties;
                    break;
                default:
                    newfilterbyvaldata.push({
                        field: val,
                        operator: "$lte",
                        value:['0']
                    })
                    filtDtLst = []
                    break;
            }
            newfilteredDataList.push(filtDtLst);
            newsearchFilteredListData.push(filtDtLst)
            console.log(newfilterbyval, newfilterbyvaldata, newSearchTerm, newfilteredDataList, newsearchFilteredListData)
            setFilterbyval(newfilterbyval)
            setFilterbyvaldata(newfilterbyvaldata)
            props.setFilterValData(newfilterbyvaldata)
            setSearchTerm(newSearchTerm)
            setFilteredDataList(newfilteredDataList);
            setSearchFilteredListData(newsearchFilteredListData)
        } else {
            newfilterbyval.splice(index, 1);
            newfilterbyvaldata.splice(index, 1);
            newSearchTerm.splice(index, 1);
            newfilteredDataList.splice(index, 1);
            newsearchFilteredListData.splice(index, 1);
            console.log(newfilterbyval, newfilterbyvaldata, newSearchTerm, newfilteredDataList, newsearchFilteredListData)
            setFilterbyval(newfilterbyval);
            setFilterbyvaldata(newfilterbyvaldata);
            props.setFilterValData(newfilterbyvaldata)
            setSearchTerm(newSearchTerm);
            setFilteredDataList(newfilteredDataList);
            setSearchFilteredListData(newsearchFilteredListData)
        }
       
    }

    const handleFilterSearch = (e, filterIndex) => {
               
        const value = e.target.value;
        const newSearchTerm = JSON.parse(JSON.stringify(searchTerm));
        let newsearchFilteredListData = JSON.parse(JSON.stringify(searchFilteredListData));
        newSearchTerm[filterIndex] = e.target.value
        setSearchTerm(newSearchTerm);
        newsearchFilteredListData[filterIndex] = filteredDataList[filterIndex].filter(data => data.toLowerCase().includes(value.toLowerCase()))
        setSearchFilteredListData(newsearchFilteredListData)
        
       
    };

    const handlefilterbyvaldataChange = (e, val, filterIndex) => {
        e.preventDefault();
        e.stopPropagation();
        let newfilterbyvaldata = JSON.parse(JSON.stringify(filterbyvaldata));
        let newfilteredDataList = JSON.parse(JSON.stringify(filteredDataList));
        let newsearchFilteredListData = JSON.parse(JSON.stringify(searchFilteredListData));
        if(!newfilterbyvaldata[filterIndex].value.includes(val)) {
            newfilterbyvaldata[filterIndex].value.push(val)
            newfilteredDataList[filterIndex] = newfilteredDataList[filterIndex].filter(v => v !== val)
            newsearchFilteredListData[filterIndex] = newsearchFilteredListData[filterIndex].filter(v => v !== val)
        } else {
            newfilterbyvaldata[filterIndex].value = newfilterbyvaldata[filterIndex].value.filter(v => v !== val);
            newfilteredDataList[filterIndex].push(val);
            newfilteredDataList[filterIndex] = newfilteredDataList[filterIndex].sort((a, b) => a.localeCompare(b));
            newsearchFilteredListData[filterIndex].push(val);
            newsearchFilteredListData[filterIndex] = newsearchFilteredListData[filterIndex].sort((a, b) => a.localeCompare(b));
        }
        setFilterbyvaldata(newfilterbyvaldata);
        props.setFilterValData(newfilterbyvaldata)
        setFilteredDataList(newfilteredDataList);
        setSearchFilteredListData(newsearchFilteredListData)
        // console.log(filterbyval, filterbyvaldata, searchTerm, filteredDataList, searchFilteredListData)
        search(newfilterbyvaldata);
    }

    const handleFilterOperatorChange = (e, val, filterIndex) => {
        // e.preventDefault();
        e.stopPropagation();
        let newfilterbyvaldata = JSON.parse(JSON.stringify(filterbyvaldata));
        newfilterbyvaldata[filterIndex].operator = val;
        setFilterbyvaldata(newfilterbyvaldata);
        props.setFilterValData(newfilterbyvaldata)
        // console.log(filterbyval, filterbyvaldata, searchTerm, filteredDataList, searchFilteredListData)
        search(newfilterbyvaldata);
    }
    
    const handlefilterNumberValueChange = (e, filterIndex) => {
        // e.preventDefault();
        e.stopPropagation();
        let newfilterbyvaldata = JSON.parse(JSON.stringify(filterbyvaldata));
        newfilterbyvaldata[filterIndex].value[0] = !isNaN(parseInt(e.target.value))? parseInt(e.target.value) : '';
        setFilterbyvaldata(newfilterbyvaldata);
        props.setFilterValData(newfilterbyvaldata)
        // console.log(filterbyval, filterbyvaldata, searchTerm, filteredDataList, searchFilteredListData)
        search(newfilterbyvaldata);
    }

    const search = (data) => {
        getFilteredListings(data, searchbytag, searchbytagvalue)
    }
    const searchtagvalue = (data) => {
        clearTimeout(checktimeout)
        checktimeout = setTimeout(() => {
            getFilteredListings(filterbyvaldata, searchbytag, data)
        }, 1500)
        
    }

    return (
        <div className="col-12">
            <div class="form-row align-items-center">
                <div class="col-auto">
                    
                    <div class="input-group">
                        <span style={{ fontSize: "20px", padding: "5px 3px" }}>
                                
                            <div class="btn-group dropleft">
                                <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: "18px", borderColor:"transparent", backgroundColor: "transparent",  }}>
                                    <BsFilter style={{marginTop: "-2px"}} /> Filters
                                </button>
                                <div class="dropdown-menu">
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('country')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('country')} 
                                                onChange={() => handlefilterbyval('country')} 
                                            />
                                            { 'Country' }
                                        </label>
                                    </div>
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('city')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('city')} 
                                                onChange={() => handlefilterbyval('city')} 
                                            />
                                            { 'City' }
                                        </label>
                                    </div>
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('region')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('region')} 
                                                onChange={() => handlefilterbyval('region')} 
                                            />
                                            { 'Region' }
                                        </label>
                                    </div>
                                    <div class="dropdown-divider"></div>
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('tags')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('tags')} 
                                                onChange={() => handlefilterbyval('tags')} 
                                            />
                                            { 'Tags' }
                                        </label>
                                    </div>
                                    <div class="dropdown-divider"></div>
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('amenities')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('amenities')} 
                                                onChange={() => handlefilterbyval('amenities')} 
                                            />
                                            { 'Amenities' }
                                        </label>
                                    </div>
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('bedrooms')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('bedrooms')} 
                                                onChange={() => handlefilterbyval('bedrooms')} 
                                            />
                                            { 'Bedrooms' }
                                        </label>
                                    </div>
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('bathrooms')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('bathrooms')} 
                                                onChange={() => handlefilterbyval('bathrooms')} 
                                            />
                                            { 'Bathrooms' }
                                        </label>
                                    </div>
                                    <div class="dropdown-divider"></div>
                                    <div class="dropdown-item fs-20p " onClick={() => handlefilterbyval('accommodates')}>
                                        <label className="d-flex align-items-center">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input me-2" 
                                                checked={filterbyval.includes('accommodates')} 
                                                onChange={() => handlefilterbyval('accommodates')} 
                                            />
                                            { 'Accomodates' }
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </span>
                        <div class="input-group-prepend">
                            <div class="input-group-text" style={{fontSize: '23px'}}>
                            <div class="btn-group dropright">
                                <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: "18px", borderColor:"transparent", backgroundColor: "transparent",  }}>
                                    { searchbytag }
                                </button>
                                <div class="dropdown-menu">
                                    <div className="dropdown-item fs-20p" onClick={() => {setSearchbytag('Nickname'); setSearchbytagvalue(""); props.setSearchTag('Nickname');}}>Nickname</div>
                                    <div className="dropdown-item fs-20p" onClick={() => {setSearchbytag('Title'); setSearchbytagvalue(""); props.setSearchTag('Title')}}>Title</div>
                                    <div className="dropdown-item fs-20p" onClick={() => {setSearchbytag('Address'); setSearchbytagvalue(""); props.setSearchTag('Address')}}>Address</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search" style={{height: 'unset'}} value={searchbytagvalue} onChange={(e) => {setSearchbytagvalue(e.target.value); props.setSearchTagValue(e.target.value); searchtagvalue(e.target.value);}} />
                        
                    </div>
                    
                </div>
                <div className="col-12">
                    {
                        filterbyval.map((filter, indx) => (
                            <div key={indx} className="btn-group m-2" style={{border: "1px solid", paddingRight: "5px"}}>
                                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: "18px", borderColor:"transparent", backgroundColor: "transparent",  }}>
                                    { filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase() }
                                </button>
                                
                                {
                                    filter === 'bedrooms' || filter === 'bathrooms' || filter === 'accommodates'  ? (
                                        <EPSFilterNumberComponent
                                            filterbyvaldata = {filterbyvaldata}
                                            indx = {indx}
                                            handleFilterOperatorChange = {handleFilterOperatorChange}
                                            handlefilterNumberValueChange = {handlefilterNumberValueChange}
                                        />
                                    ) : (
                                        <EPSFilterListComponent
                                            searchTerm = {searchTerm}
                                            filterbyvaldata = {filterbyvaldata}
                                            searchFilteredListData = {searchFilteredListData}
                                            indx = {indx}
                                            handleFilterSearch = {handleFilterSearch}
                                            handlefilterbyvaldataChange = {handlefilterbyvaldataChange}
                                        />
                                    )
                                }
                                <span style={{ marginLeft: "1px", fontWeight: "bold", cursor: "pointer", marginTop: "2px", fontSize: "20px" }} onClick={(e) => handlefilterbyval(filter)}>×</span>
                            </div>  
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EPSFilter;