import React, { useEffect, useState } from "react";
//import { useLocation, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../Partners/Admin.scss";

import Layout from "../../components/Layout";
import constants from "../../Util/constants";
import axios from "axios";
import LoadingBox from "../../components/LoadingBox";
import { BsChevronDown } from "react-icons/bs"

import Popup from "../../components/Popup/index.js";
import Button from "../../components/Buttons/Button/Button"
import swal from "sweetalert"

import PopupAI from "../../components/PopupAI/index.js";


const ZipcodesRegionsMappingCountry = (props) => {

    const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props

    const [unmappedProps, setUnmappedProps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedListing, setSelectedListing] = useState(null);
    const [selectedZipsData, setSelectedZipsData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [propertyRegion, setPropertyRegion] = useState('unmapped');

   const [selectedPropertyAddress, setSelectedPropertyAddress] = useState(null); 
   const [selectedPropertyId, setSelectedPropertyId] = useState(null); 
   const [selectedPropertyTitle, setSelectedPropertyTitle] = useState(null); 

    const agentData = JSON.parse( localStorage.getItem('agent') );

const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');
    const [filterPropertyStatus, setFilterPropertyStatus] = useState('');
    const filterByPropertyStatus = (event) => {
        console.log(event.target.value)
        setFilterPropertyStatus(event.target.value);      
    }
    //const history = useHistory();
    //const location = useLocation();   

const [selectedListingAI, setSelectedListingAI] = useState(null); 
const [aiRegionSuggestions, setAiRegionSuggestions] = useState([]); 
const[selectedAIRegion, setSelectedAIRegion] = useState(''); 

    const { country } = useParams();
 

    const userRequest = axios.create({
        baseURL: constants.SHUB_URL,
        headers: {
            Authorization: constants.SHUB_TOKEN,
        },
    });

        const fetchZipcodesWithUnmappedRegionsCountry = async () => {
            try {

                setIsLoading(true);
                const response = await userRequest.post(`local/zipcodes-with-unmapped-regions-details-country/${country}`,
                    { status: filterPropertyStatus  },
                );

                if(response.data.success === true) {
                    setUnmappedProps(response.data.unmappedProps);
                    setIsLoading(false);
                }

            } catch (error) {
                console.error('Error fetching properties with unmapped regions:', error);
            }
        };

    useEffect(() => {                
        fetchZipcodesWithUnmappedRegionsCountry();                
    }, [filterPropertyStatus]); 


const showPopUp = async(listingData) => {

    let response = await userRequest.post(`local/get-zips-data-for-country-zipcode`,
                    { country, zip:listingData.data.address.zipcode },
                );

if(listingData?.data?.address?.full) {
    setSelectedPropertyAddress(listingData.data.address.full);
}   

setSelectedPropertyId(listingData.id);
setSelectedPropertyTitle(listingData?.data?.title);

    setSelectedZipsData(response.data.zipsData)
    setSelectedListing(listingData);
}   


const showPopUpAI = async(listingData) => {
    setAiRegionSuggestions( [] ); //Re-initializing
    setSelectedAIRegion( '' ); //Re-initializing
    

    const zipcode_to_search = listingData.data.address.zipcode;

    const res = await userRequest.post(constants.SHUB_URL+'/local/get-touristic-destination-suggestions-open-ai', {country, zipcode:zipcode_to_search} );

    const resData = res?.data;
console.log('resData:::', resData) 
    if(resData?.success && resData.success===true) {
        if(resData?.destinations) {

            //resData.destinations
           if( resData.destinations !== '' &&  /Sorry/i.test(resData.destinations) === false ) {
                const regionsArray = resData.destinations.split(",").map(p => p.trim());

                setAiRegionSuggestions( regionsArray )
           }

        }
    }
  
/*
    let response = await userRequest.post(`local/get-zips-data-for-country-zipcode`,
                    { country, zip:listingData.data.address.zipcode },
                );
*/                

if(listingData?.data?.address?.full) {
    setSelectedPropertyAddress(listingData.data.address.full);
}   

setSelectedPropertyId(listingData.id);
setSelectedPropertyTitle(listingData?.data?.title);

    //setSelectedZipsData(response.data.zipsData) 
    
    setSelectedListingAI(listingData);
}    


const handleRegionSelection = (region) => {

    if(region !== '') {
        setSelectedRegion(region)
        setPropertyRegion(region)
    } else {
        setSelectedRegion(null)
        setPropertyRegion('unmapped')        
    }
}


const handleRegionSelectionAI = (region) => {

    if(region !== '') {
        setSelectedAIRegion(region)
    } else {
        setSelectedAIRegion(null)
    }
}


  const onCloseResStatus = () => {
    setSelectedListing(null)
  }
  const onCloseResStatusAI = () => {
    setSelectedListingAI(null)
  }

const updateSingleProperty = async(listingData, allFlag='') => {
    
    console.log(listingData.id);
    console.log(propertyRegion);
    console.log(allFlag);

    //if(propertyRegion === '' || propertyRegion === 'unmapped') {
    if(propertyRegion === '' || /unmapp/i.test(propertyRegion)) {
        swal({
            show: true,
            icon: 'error',
            title: 'Enter a valid region!',
            text: ''
        });
            
        return false;
    }

    //Call update API here. If success execute the lines below

    let response = await userRequest.post(`local/update-region-for-properties-country-zipcode`,
                    { country, zip:listingData.data.address.zipcode, region:propertyRegion, id:listingData.id, allFlag },
                );    
    
    if(response.data.success===true) {
        setSelectedListing(null);

        swal({
            show: true,
            icon: 'success',
            title: 'Success!',
            text: response.data.message
        });        

        fetchZipcodesWithUnmappedRegionsCountry();        
    } else {
        swal({
            show: true,
            icon: 'error',
            title: 'Error!',
            text: response.data.message
        });            
    }

}



const addRegionDatatoZips = async(listingData) => {
    /*
    console.log('listingData.data.address.country:::', listingData.data.address.country)
    console.log('listingData.xdata.country:::', listingData.xdata.country)
    console.log('listingData.data.address.zipcode:::', listingData.data.address.zipcode)
    console.log('selectedAIRegion:::', selectedAIRegion)
    */

    let response = await userRequest.post(`local/add-ai-suggested-region-to-zips-for-country-and-zipcode`,
                    { country:listingData.data.address.country, zip:listingData.data.address.zipcode, region:selectedAIRegion },
                );    
    
    if(response.data.success===true) {
        setSelectedListing(null);

        swal({
            show: true,
            icon: 'success',
            title: 'Success!',
            text: response.data.message
        });        

        //fetchZipcodesWithUnmappedRegionsCountry();        
    } else {
        swal({
            show: true,
            icon: 'error',
            title: 'Error!',
            text: response.data.message
        });            
    }    
    
}


const columns = [

    {
        id: 'Sl_No',
        name: 'Sl No:',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },   
    {
        id: 'country',
        name: 'Country',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },
    {
        id: 'property_id',
        name: 'Property ID',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },   
    {
        id: 'property_title',
        name: 'Title',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },
    {
        id: 'status',
        name: 'Status',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },    
    {
        id: 'zip',
        name: 'Zipcode',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },    
    {
        id: 'region_manual',
        name: 'Region Mapping (Manual)',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },   
    {
        id: 'region_ai',
        name: ' ',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },      
]

    return(
        <Layout 
        pageTitle="Mapping Zipcodes & Regions" 
        agency={agency} 
        agent={agent} 
        token={token} 
        screenSize={screenSize} 
        activeMenu={activeMenu} 
        handleToggleMenu={handleToggleMenu} 
        setActiveMenu={setActiveMenu} 
        >
                <div className="container-fluid px-3 py-3">
                    <LoadingBox visible={isLoading} />
 
                        <div class="row">
                            <div class="col-12">
                                <h1>Zipcodes & Regions Mapping - {country} (Total: {unmappedProps.length})</h1>
                                <p>Mapping zipcodes to regions</p>
                            </div>
                        </div>


{extranet_vt_logged_in_role==='admin' &&
                    <div className="listings-search-container row">
                    <div className="col-sm-2">
                        <label style={{'color':'black'}}><strong>Filter by Status</strong></label>
                        <select class="form-control" onChange={(e)=>filterByPropertyStatus(e)}>
                            <option value="">--All--</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Declined">Declined</option>
                        </select>                        
                    </div>
                    </div>
}                                            

{/* Table starts */}

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
                                                                                

                                        {Object.entries(unmappedProps).map(([key, item], index) => (
                                        <tr key={index}>
                                            <td>
                                                <h5>{index+1}</h5>
                                            </td>

                                            <td>
                                                <h5 className="cst-cursor" >{item.xdata.country}</h5>
                                            </td>

                                            <td>
                                                <h5 className="cst-cursor" ><a href={`https://login.villatracker.com/property/${item.id}`} target="_blank">{item.id}</a></h5>
                                            </td>

                                            <td>
                                                <h5 className="cst-cursor" >{item.data.title}</h5>
                                            </td>



                                            <td>
                                                <h5 className="cst-cursor" >{item.xdata.status}</h5>
                                            </td>

                                            <td>
                                                <h5 className="cst-cursor" >{item.data.address.zipcode}</h5>
                                            </td>     
                                            


                                            <td>
                                                <h5 className="cst-cursor" onClick={()=>showPopUp(item)} >{item.xdata.region}</h5>
                                            </td>                                                                                        
                                            <td>
                                                <h5 className="cst-cursor" onClick={()=>showPopUpAI(item)} style={{color:'blue'}}>Add AI Suggested Regions</h5>
                                            </td>

                                        </tr>
                                        ))}  

                                        
                                    </tbody>
                                </table>
                        </div>
                    </div>
{/* Table ends */}




    {
        selectedListing && (
            <Popup>
                <div className="approve-agent-container">
                    <div className="approve-agent-header">
                        <div className="approve-agent-title">Zipcode & Region Mapping:</div>
                        <div className="approve-agent-sub-header">
                            <div>Main Agent : <b>{agentData.firstName}</b></div>
                            <div className="approve-agent-sub-header-separator" />
                            <div>Agency: <b>{agentData.agencyName}</b></div>
                        </div>
                    </div>

                    <div className="approve-agent-main">
                        <div class="row">
                            <div class="col-6"><h3>Property Id: </h3></div>
                            <div class="col-6"><h3>{selectedPropertyId}</h3></div>
                        </div>
                        <div class="row">
                            <div class="col-6"><h3>Property Title: </h3></div>
                            <div class="col-6"><h3>{selectedPropertyTitle}</h3></div>
                        </div>     
<div class="row">&nbsp;</div>
                        <div class="row">
                            <div class="col-6"><h3>Address: </h3></div>
                            <div class="col-6"><h3>{selectedPropertyAddress}</h3></div>
                        </div>   
<div class="row">&nbsp;</div>
                        <div class="row">
                            <div class="col-6"><h3>Country: </h3></div>
                            <div class="col-6"><h3>{selectedListing.data.address.country}</h3></div>
                        </div>
                        <div class="row">
                            <div class="col-6"><h3>Zipcode: </h3></div>
                            <div class="col-6"><h3>{selectedListing.data.address.zipcode}</h3></div>
                        </div>

                        <div class="row">
                            <div class="col-6"><h5>Choose from available regions</h5></div>
                            <div class="col-6">
                                <select className="form-control" onChange={(e) => handleRegionSelection(e.target.value)}>
                                    <option value="">--Select--</option>
                                    {selectedZipsData.map((item, index) => (
                                        <option key={index} value={item.region}>{item.region}</option>
                                    ))}
                                </select>
                            </div>
                        </div>                       

                        <div class="row">
                            <div class="col-6"><h5>Enter region (If new):</h5></div>
                            <div class="col-6"><input type="text" className="form-control" value={propertyRegion} onChange={(e) => setPropertyRegion(e.target.value)} /></div>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <input type="button" class="btn btn-primary" value={`Update only the current property's region with "${propertyRegion}"`} onClick={()=>updateSingleProperty(selectedListing)} disabled={!propertyRegion || /unmapp/i.test(propertyRegion) } />
                            </div>                           
                        </div>   
                
                        <div class="row">&nbsp;</div>

                        <div class="row">
                            <div class="col-6">
                                <input type="button" class="btn btn-danger" value={`Update all properties's region under ${country} & zipcode ${selectedListing.data.address.zipcode} with "${propertyRegion}"`} onClick={()=>updateSingleProperty(selectedListing, 'all')} disabled={!propertyRegion || /unmapp/i.test(propertyRegion)}  />
                            </div>                             
                        </div>                     

                    </div>

                    <div className="approve-agent-footer">
                        <Button
                            style={{ fontSize: '18px', marginRight: '30px',color:'black', 'background-color': 'grey', padding:'10px' }}
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




    {
        selectedListingAI && (
            <PopupAI>
                <div className="approve-agent-container">
                    <div className="approve-agent-header">
                        <div className="approve-agent-title"><h1>AI - Zipcode & Region Mapping:</h1></div>
                        <div className="approve-agent-sub-header">
                            <div>Main Agent : <b>{agentData.firstName}</b></div>
                            <div className="approve-agent-sub-header-separator" />
                            <div>Agency: <b>{agentData.agencyName}</b></div>
                        </div>
                    </div>

                    <div className="approve-agent-main">
                        <div class="row">
                            <div class="col-6"><h5>Property Id: </h5></div>
                            <div class="col-6"><h5>{selectedPropertyId}</h5></div>
                        </div>
                        <div class="row">
                            <div class="col-6"><h5>Property Title: </h5></div>
                            <div class="col-6"><h5>{selectedPropertyTitle}</h5></div>
                        </div>     
<div class="row">&nbsp;</div>
                        <div class="row">
                            <div class="col-6"><h3>Address: </h3></div>
                            <div class="col-6"><h3>{selectedPropertyAddress}</h3></div>
                        </div>   
<div class="row">&nbsp;</div>
                        <div class="row">
                            <div class="col-6"><h3>Country: </h3></div>
                            <div class="col-6"><h3 style={{'background-color':'grey'}}>{selectedListingAI.data.address.country}</h3></div>
                        </div>
                        <div class="row">
                            <div class="col-6"><h3>Zipcode: </h3></div>
                            <div class="col-6"><h3 style={{'background-color':'grey'}}>{selectedListingAI.data.address.zipcode}</h3></div>
                        </div>                        

                        <div class="row">
                            <div class="col-6"><h3 style={{color:'blue'}}>Choose from AI suggested regions</h3></div>
                            <div class="col-6">
                                <select className="form-control" onChange={(e) => handleRegionSelectionAI(e.target.value)}>
                                    <option value="">--Select--</option>
                                    {aiRegionSuggestions.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>                       

<div class="row">&nbsp;</div>

                        <div class="row">
                            <div class="col-6"><h3 style={{color:'blue'}}>Enter region manually (If any):</h3></div>
                            <div class="col-6"><input type="text" className="form-control" value={selectedAIRegion} onChange={(e) => setSelectedAIRegion(e.target.value)} /></div>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <input type="button" class="btn btn-success" value={`Accept and save the selected region to ZIPS collection`} onClick={()=>addRegionDatatoZips(selectedListingAI)} disabled={!selectedAIRegion || /unmapp/i.test(selectedAIRegion || selectedAIRegion==='') } />
                            </div> 

                                <div class="col-6">&nbsp;</div>
                        </div>                                            

                    </div>

                    <div className="approve-agent-footer">
                        <Button
                            style={{ fontSize: '18px', marginRight: '30px', color:'black', 'background-color': 'grey', padding:'10px' }}
                            variant="link"
                            text="CLOSE"
                            onClick={onCloseResStatusAI}
                        />
                        {/* <Button
                            style={{ fontSize: '18px' }}
                            text="Confirm"
                            onClick={() => onSubmitResStatus(selectedReservations)}
                        /> */}
                    </div>
                </div>
            </PopupAI>
        )
    }


                </div>  

             

        </Layout>
    )

}
export default ZipcodesRegionsMappingCountry;