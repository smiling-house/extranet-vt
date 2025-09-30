import React, { useEffect, useState } from "react";
//import { useLocation, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../Partners/Admin.scss";
import Layout from "../../components/Layout";
import constants from "../../Util/constants";
import axios from "axios";
import LoadingBox from "../../components/LoadingBox";
import { BsChevronDown } from "react-icons/bs"


const ZipcodesRegionsMappingCountry = (props) => {

    const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props

    const [unmappedProps, setUnmappedProps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                    { params: {} },
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
                                                <h5 className="cst-cursor" >{item.xdata.region}</h5>
                                            </td>                                                                                        
                                            
                                        </tr>
                                        ))}  

                                        
                                    </tbody>
                                </table>
                        </div>
                    </div>
{/* Table ends */}



                </div>  

             

        </Layout>
    )

}
export default ZipcodesRegionsMappingCountry;