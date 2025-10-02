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

const ZipcodesRegionsMappingCountry = (props) => {

    const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props

    const [unmappedProps, setUnmappedProps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedListing, setSelectedListing] = useState(null);
    const [selectedZipsData, setSelectedZipsData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [propertyRegion, setPropertyRegion] = useState('unmapped');

    const agentData = JSON.parse( localStorage.getItem('agent') );
    //const history = useHistory();
    //const location = useLocation();   


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
                    {  },
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
    }, []); 


const showPopUp = async(listingData) => {

    let response = await userRequest.post(`local/get-zips-data-for-country-zipcode`,
                    { country, zip:listingData.data.address.zipcode },
                );

    setSelectedZipsData(response.data.zipsData)

    setSelectedListing(listingData);
    //console.log('listingData::', listingData)
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

  const onCloseResStatus = () => {
    setSelectedListing(null)
  }


const updateSingleProperty = async(listingData) => {
    
    console.log(listingData);
    console.log(propertyRegion);

    if(propertyRegion === '' || propertyRegion === 'unmapped') {
        swal({
            show: true,
            icon: 'error',
            title: 'Enter a valid region!',
            text: ''
        });
            
        return false;
    }
}
const updateMultipleProperties = async(listingData) => {
    
    console.log(listingData);
    console.log(propertyRegion);

    if(propertyRegion === '' || propertyRegion === 'unmapped') {
        swal({
            show: true,
            icon: 'error',
            title: 'Enter a valid region!',
            text: ''
        });
            
        return false;
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
        id: 'zip',
        name: 'Zipcode',
        headerStyle: { paddingLeft: '50px', backgroundColor: '#F5F5F2' },
        width: '1fr'
    },
    {
        id: 'region',
        name: 'Region',
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
                                <h1>Zipcodes & Regions Mapping - {country}</h1>
                                <p>Mapping zipcodes to regions</p>
                            </div>
                        </div>






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
                                                <h5 className="cst-cursor" >{item.data.address.zipcode}</h5>
                                            </td>     
                                            


                                            <td>
                                                <h5 className="cst-cursor" onClick={()=>showPopUp(item)} >{item.xdata.region}</h5>
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
                            <div class="col-6"><h1>Country: {country}</h1></div>
                            <div class="col-6"><h1>Zipcode: {selectedListing.data.address.zipcode}</h1></div>
                        </div>

                        <div class="row">
                            <div class="col-6"><h5>Available Regions</h5></div>
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
                            <div class="col-6"><label>Property Region:</label></div>
                            <div class="col-6"><input type="text" className="form-control" value={propertyRegion} onChange={(e) => setPropertyRegion(e.target.value)} /></div>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <input type="button" class="btn btn-primary" value="Update this property" onClick={()=>updateSingleProperty(selectedListing)} />
                            </div>
                            <div class="col-6">
                                <input type="button" class="btn btn-danger" value="Update all properties" onClick={()=>updateMultipleProperties(selectedListing)} />
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




                </div>  

             

        </Layout>
    )

}
export default ZipcodesRegionsMappingCountry;