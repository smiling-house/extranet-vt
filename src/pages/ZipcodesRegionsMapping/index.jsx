import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import "../Partners/Admin.scss";
import Layout from "../../components/Layout";
import constants from "../../Util/constants";
import { PATH_ZIPS_REGIONS_MAPPING_COUNTRY } from '../../Util/constants';
import axios from "axios";
import LoadingBox from "../../components/LoadingBox";
import { BsChevronDown } from "react-icons/bs"


const ZipcodesRegionsMapping = (props) => {

    const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props

    const [zipcodesWithUnmappedRegionsCountries, setZipcodesWithUnmappedRegionsCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [unmappedTotal, setUnmappedTotal] = useState(0);

    const history = useHistory();
    const location = useLocation();    

	const userRequest = axios.create({
		baseURL: constants.SHUB_URL,
		headers: {
			Authorization: constants.SHUB_TOKEN,
		},
	});


        const fetchZipcodesWithUnmappedRegionsCountries = async () => {
            try {

                setIsLoading(true); 
                const response = await userRequest.post(`local/zipcodes-with-unmapped-regions-countries`,
                    { params: {} },
                );

                if(response.data.success === true) {
                    

const data = response.data.countsByCountry;

const dataWithTotals = data.map(item => {
  const totalCount =
    item.approvedCount +
    item.declinedCount +
    item.pendingCount;

  return {
    ...item,
    totalCount
  };
});

console.log('dataWithTotals:::', dataWithTotals)
setZipcodesWithUnmappedRegionsCountries(dataWithTotals);

      
const grandTotal = dataWithTotals.reduce(
  (sum, item) => sum + item.totalCount,
  0
);

setUnmappedTotal(grandTotal)

                    setIsLoading(false);
                }

            } catch (error) {
                console.error('Error fetching properties with unmapped regions:', error);
            }
        };


    useEffect(() => {                
        fetchZipcodesWithUnmappedRegionsCountries();        
    }, []); 


const GoToCountryPage = async(country) => {
    history.push( `${PATH_ZIPS_REGIONS_MAPPING_COUNTRY}/${country}`);
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
        id: 'unmapped_count',
        name: 'Unmapped count',
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
                                <h2>Zipcodes & Regions Mapping (Total: {unmappedTotal})</h2>
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

                                        {zipcodesWithUnmappedRegionsCountries.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <h5>{index+1}</h5>
                                            </td>

                                            <td> 
                                                <h5 className="cst-cursor" onClick={() => GoToCountryPage(item.country)}>{item.country}</h5>
                                            </td>

                                            <td>
                                                <h5 className="cst-cursor" onClick={() => GoToCountryPage(item.country)}>{item.totalCount}</h5>
                                                <h6>(Approved: {item.approvedCount}, Declined: {item.declinedCount}, Pending: {item.pendingCount})</h6>
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
export default ZipcodesRegionsMapping;