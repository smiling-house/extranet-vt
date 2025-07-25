import axios from "axios";
import TokenService from "./token.service";
import { baseURL, ShubAuth, ShubURL } from "../core";
import constants from "../Util/constants";
import { useEffect } from "react";

const userToken = localStorage.getItem("jToken")

// Shub calls: updateXdata, addNewPartner

const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g';
const userRequest = axios.create({
    headers: {
        Authorization: `Bearer ${token2}`
    }
})

const updateXdata = async (ID, xdataPayload) => {
    //585a39dbe43900100017e9e8
    // console.log("saved xdata for ID>>>>", ID,":",xdataPayload);
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/local/xdata/${ID}`,
        xdataPayload);
    return ShubResponse
};

const addNewPartner = async (payload) => {
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/services/guesty/channel/account`,
        payload);
    console.log("Shub response to add new partner:", ShubResponse)
    return ShubResponse
};

const updatePartner = async (accountId, payload, source) => {
    console.log("updateAPI:", accountId, payload, source)
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/update/` + accountId, payload, source);
    return ShubResponse
};

const updateEPartner = async (partnerId, payload) => {
    console.log("updateAPI:", partnerId, payload)
    //const ShubResponse = await userRequest.post(constants.SHUB_URL + `/update-external-partner/` + partnerId, payload);
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/eps/update-external-partner/` + partnerId, payload);
    return ShubResponse
};

const deletePartner = async (accountId, source) => {
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/delete/` + accountId, source);
    return ShubResponse
};

const deleteEPartner = async (partnerId) => {
    //const ShubResponse = await userRequest.post(constants.SHUB_URL + `/delete-external-partner/` + partnerId);
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/eps/delete-external-partner/` + partnerId);
    return ShubResponse
};

const uploadCSVPartner = async (partnerId,data) => {
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/eps/csv-external-partner/` + partnerId, data);
    return ShubResponse
};
const uploadSelectedListings = async (partnerId,data) => {
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/eps/upload-external-partner-listings/` + partnerId, data);
    return ShubResponse
};

const resyncPartner = async (accountId, source) => {
    const ShubResponse = await userRequest.post(constants.SHUB_URL + `/resync/` + accountId + '/' + source);
    return ShubResponse
};
const activatePartner = async (accountId, source) => {
    const ShubResponse = await userRequest.put(constants.SHUB_URL + `/products/all` , {accountId , source});
    return ShubResponse
};

const updateTravelAgency = (data, data1) => {
    const headersForImage = {
        "authorization": `Bearer ${userToken}`,
    }

    return axios.post(`${baseURL}/travel-agency/update-travel-agencies?agency_id=${data1}`, data, {
        headers: headersForImage
    }).then((response) => {
        return response.data;
    });
}

const updateAgentApi = (agent_id, data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/agent/update-agent?agent_id=${agent_id}`, data, {
        headers: headersForupdate
    }).then((response) => {
        localStorage.setItem("agent", JSON.stringify(response.data.doc));
        return response.data;
    });

};

const updateProfileApi = (agent_id, agency_id, data, AgencyPayload) => {
    if (agent_id) { updateAgentApi(agent_id, data) }
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/travel-agency/update-travel-agencies?agency_id=${agency_id}`, AgencyPayload, {
        headers: headersForupdate
    }).then((response) => {
        localStorage.setItem("travelAgency", JSON.stringify(response?.data?.data?.agencyDetails[0]));
        return response.data;
    });

};



const AddNewClientApi = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/client/create-client`, data, {
        headers: headersForupdate
    })
        .then((response) => {
            return response.data;
        });
};

const UpdateClientApi = (client_id, data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/client/update-client?client_id=${client_id}`, data, {
        headers: headersForupdate
    })
        .then((response) => {
            return response.data;
        });
};

const VerifyCodeApi = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/agent/verify-code`, data, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const ChnagePasswordApi = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/agent/change-password`, data, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const GetAgency = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.get(`${baseURL}/travel-agency/get-travel-agencies?agency_id=${data}`, {
        headers: headersForupdate
    })
        .then((response) => {
            return response.data;
        });
};

const GetProfile = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.get(`${baseURL}/agent/get-profile?agent_id=${data}`, {
        headers: headersForupdate
    })
        .then((response) => {
            return response.data;
        });
};

const ForgotPasswordApi = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/agent/forget-password`, data, {
        headers: headersForupdate
    })
        .then((response) => {
            return response.data;
        });
};

const GetReservation = (data) => {
    console.log(userToken, "userToken")
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.get(`${baseURL}/reservation/get-reservations`, {
        params: data,
        headers: headersForupdate,
    }).then((response) => {
        return response.data;
    });
};

const GetClientCstApi = (name, email) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.get(`${baseURL}/client/get-clients?limit=20&search=${name}&email=${email}
    `, {
        headers: headersForupdate,
    }).then((response) => {
        return response.data;
    });
};

const GetSingleClientApi = (agentId, agencyId, clientId) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.get(`${baseURL}/client/get-client?agent_id=${agentId}&agency_id=${agencyId}&client_id=${clientId}
    `, {
        headers: headersForupdate,
    }).then((response) => {
        return response.data;
    });
};

const GetWishListLog = () => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.get(`${baseURL}/wishlist/get-wishlists`, {
        headers: headersForupdate
    })
        .then((response) => {
            return response.data;
        });
};

const AgentSignup = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/agent/signup`, data, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const DestinationsOptions = () => {
    console.log("loading Destinations from SHUB...")
    const headersForupdate = {
        "authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c`,
    }
    return axios.get(`https://api.villatracker.com/local/destinations`, {
        headers: headersForupdate
    })
        .then((response) => {
            const regions = response?.data.data[0]?.allRegions
            const countries = response?.data.data[0]?.allCountries
            const cities = response?.data.data[0]?.allCities
            const destinations = response?.data.data[0]?.destinations
            console.log('loaded destinations:',destinations)
            localStorage.setItem('destinations', JSON.stringify(destinations))
            localStorage.setItem('regions', JSON.stringify(regions))
            localStorage.setItem('countries', JSON.stringify(countries))
            localStorage.setItem('cities', JSON.stringify(cities))
            return response.data;
        })

};

const getHotDesinationsApi = () => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.get(`${baseURL}/hotdestination/get-hotdestinations`, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const approveAgent = (data, agent_id) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/agent/approve-agent?agent_id=${agent_id}`, data, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};


const travelAgencyApproval = (data, agency_id) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/travel-agency/approve?agency_id=${agency_id}`, data, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const trianglLuxuryApiPerId = (id) => {
    const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g';
    const headersForupdate = {
        Authorization: `Bearer ${token2}`
    }
    console.log(`getting listings https://api.villatracker.com/local/listings/${id}`)
    return axios.get(`https://api.villatracker.com/local/listings/${id}`, {
        headers: headersForupdate
    }).then((response) => {
        console.log("Res API:", response.data)
        return response.data;
    });
};

const trianglLuxuryApi = (params) => {
    const token2 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImF0aSI6ImI5MTliYmJiLTA1ZWItNDlmOC05MjlhLWM0MTJlYzY3NWI2YyIsImlzc3VlZCI6IjE2NzUzNzA2NDMzNzMiLCJleHAiOjIyOTczMzM3MjcsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6IjExODQzYjg2LWIyYzUtNGMwNS1hYWZlLTcxZTI4NGIyNjNlOCIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.Mqmx7onIVz_EVAunhwqBAhAmlsGXMQ18hh_EV_61KQIpaGXlrgXgx1hOOdNWLFriG3Un6jfS7H7vwMAYmBT6-8yl9L7VB7Cpxva49XozuSJazQ42UDDlTOsnWAmatzmFna-Uzjc8MDfVQbR8AwMiFq_Jb9ViaJ4XBkj2KhEKs1g';
    const headersForupdate = {
        Authorization: `Bearer ${token2}`
    }
    console.log(params)
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    console.log(`getting listings https://api.villatracker.com/local/listings?${queryString}`)
    return axios.get(`https://api.villatracker.com/local/listings?${queryString}`, {
        //    return axios.get(constants.SHUB_URL_LOCAL + `/local/listings?${data}`, {
        headers: headersForupdate
    }).then((response) => {
        console.log("Res API:", response.data)
        return response.data;
    });
};

const sendEmailApi = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/email/send-email`, data, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const hotdestinationAddLikeApi = (id) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.patch(`${baseURL}/hotdestination/add-one-like?id=${id}`, {}, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const hotdestinationRemoveLikeApi = (id) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.delete(`${baseURL}/hotdestination/remove-one-like?id=${id}`, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};


const AddSubAgentApi = (data) => {
    const headersForupdate = {
        "authorization": `Bearer ${userToken}`,
    }
    return axios.post(`${baseURL}/agent/add-sub-agent`, data, {
        headers: headersForupdate
    }).then((response) => {
        return response.data;
    });
};

const AuthService = {
    updateXdata,
    addNewPartner,
    updatePartner,
    updateEPartner,
    deletePartner,
    deleteEPartner,
    resyncPartner,
    activatePartner,
    hotdestinationAddLikeApi,
    hotdestinationRemoveLikeApi,
    sendEmailApi,
    GetWishListLog,
    AgentSignup,
    GetReservation,
    updateProfileApi,
    AddNewClientApi,
    GetProfile,
    DestinationsOptions,
    updateTravelAgency,
    GetClientCstApi,
    GetSingleClientApi,
    getHotDesinationsApi,
    approveAgent,
    UpdateClientApi,
    VerifyCodeApi,
    ChnagePasswordApi,
    ForgotPasswordApi,
    travelAgencyApproval,
    trianglLuxuryApi,
    AddSubAgentApi,
    trianglLuxuryApiPerId,
    uploadSelectedListings
};

export default AuthService;

