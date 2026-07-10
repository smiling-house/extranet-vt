import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../store/redux/User/actions";
import Auth from "./Auth/Auth";
import Qr from "./Auth/Qr";


import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage";
import SignupThanks from "./SignupThanks";
import { Link, Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import Profile from "./Profile/Profile";
import AgencyProfile from "./AgencyProfile/AgencyProfile";
import Listings from "./Listings2";

import DuplicatedListings from "./DuplicatedListings";

import Tasks from "./Tasks";
import Reservations from "./Reservations";
import Partners from "./Partners";
import PartnersBP from "./PartnersBP";
import PartnersRU from "./PartnersRU";
// Legacy channel-page components kept in the tree only so their source stays
// in-repo if we ever need to reference them; they're not wired to any active
// route below. The BART / INVENIO / BP paths render the V2 wrappers now.
// eslint-disable-next-line no-unused-vars
import PartnersBART from "./PartnersBART";
// eslint-disable-next-line no-unused-vars
import PartnersINVENIO from "./PartnersINVENIO";
// eslint-disable-next-line no-unused-vars
import PartnersBookingpal from "./PartnersBookingpal";
import PartnersBartV2 from "./PartnersBartV2";
import PartnersInvenioV2 from "./PartnersInvenioV2";
import PartnersBookingpalV2 from "./PartnersBookingpalV2";
import ListingsBookingpal from "./ListingsBookingpal";
import RequestToBookFlywire from "./RequestToBookFlywire";
import EPartners from "./EPartners";
// material ui
import Welcome from "./Welcome";
import Sidebar from "../components/Sidebar";
import SearchProperty from "./SearchProperty";
import ShubPanel from "./ShubPanel";
import Map from "./Map";
import Reports from "./Reports";
import Touch from "./Touch";
import Faq from "./Faq";
import HotDestinations from "./HotDestinations"; 
import Collections from "./Collections";
import WishList from "./WishList";
import Favorites from "./Favorites";
import Property from "./Property";
import PropertyEdit from "./PropertyEdit";
import PropertyReservePage from "./PropertyReserve";
import VerifyNewPMs from './VerifyNewPMs';
import Admin from "./Admin";

import AdminDashboard from "./AdminDashboard";
import AdminSettings from "./AdminSettings";
import PartnersSH from "./PartnersSH";
import PartnersVT from "./PartnersVT";
// Legacy Hostaway page kept for reference — the V2 redesign is what routes
// to PATH_PARTNERS_HOSTAWAY. eslint-disable so the unused import doesn't fail
// under CI-style strictness.
// eslint-disable-next-line no-unused-vars
import PartnersHostaway from "./PartnersHostaway";
import PartnersHostawayV2 from "./PartnersHostawayV2";
import PartnersGuestyDH from "./PartnersGuestyDH";
import PartnersRuDH from "./PartnersRuDH";
import SearchListings from "./SearchListings";

import PropertiesNeedsAttention from "./PropertiesNeedsAttention";

import {
  PATH_PARTNERS,
  PATH_PARTNERS_BP,
  PATH_PARTNERS_RU,
  PATH_EPARTNERS,
  PATH_ADMIN,
  PATH_LISTINGS,
  PATH_DUPLICATED_LISTINGS,
  PATH_TASKS,
  PATH_COLLECTIONS,
  PATH_FAQ,
  PATH_FAVORITES,
  PATH_FORGOT_PASSWORD,
  PATH_HOME,
  PATH_DASHBOARD,
  PATH_ADMIN_SETTINGS,
  PATH_HOT_DESTINATIONS,
  PATH_LOGIN,
  PATH_QR,
  PATH_MAP,
  PATH_PROFILE,
  PATH_PROPERTY,
  PATH_PROPERTY_EDIT,
  PATH_PROPERTY_X,
  PATH_RESERVE,
  PATH_REPORTS,
  PATH_RESERVATIONS,
  PATH_SEARCH,
  PATH_SHUB,
  PATH_SIGNUP_THANKS,
  PATH_WISH_LIST,
  PATH_INTOUCH,
  PATH_Welcome,
  PATH_SIGNUP,
  PATH_PROPERTY_ID,
  PATH_CLIENTS,
  PATH_LISTINGS_BP,
  PATH_LISTINGS_RU,
  PATH_EPS_LISTINGS,
  PATH_SELECT,
  PATH_EPS_EPARTNER_MANAGE,
  PATH_EPS_EPARTNERS_RESERVATIONS,
  PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES,
  PATH_AGODA_LISTINGS,
  PATH_AGODA_SYNC,
  PATH_AGODA_INQUIRIES,
  PATH_AGODA_BOOKING,
  PATH_AGODA_ACCOUNT,
  APP_DISPLAY_NAME,
  PATH_PARTNERS_BART,
  PATH_PARTNERS_INVENIO,
  PATH_PARTNERS_BOOKINGPAL,
  PATH_LISTINGS_BOOKINGPAL,
  PATH_RETURN_FLYWIRE,
  PATH_VERIFY_COMPARE_NEW_PMS,
  PATH_ZIPS_REGIONS_MAPPING,
  PATH_ZIPS_REGIONS_MAPPING_COUNTRY,
  PATH_LISTINGS_SH_RU_DECLINED_BUT_LISTED_ON_RU,
  PATH_LISTINGS_SH_BP_DECLINED_BUT_LISTED_ON_BP,
  PATH_PARTNERS_SH,
  PATH_PARTNERS_VT,
  PATH_PARTNERS_GUESTY_DH,
  PATH_PARTNERS_RU_DH,
  PATH_PARTNERS_HOSTAWAY,
  PATH_SEARCH_LISTINGS,
  PATH_PROPERTIES_NEEDS_ATTENTION
} from "../Util/constants";
import AuthService from "../services/auth.service";
import { baseURL } from "../core";
import axios from "axios";
import Signup from "./Signup/Signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyCodePage from "./ResetPasswordPage/VerifyCodePage";
import ResetChangePasswordPage from "./ResetPasswordPage/ResetChangePasswordPage";

import ListingsBP from "./ListingsBP";
import ListingsRU from "./ListingsRU";

import EListings from "./EListings";
import EPSSelect from "./EPSSelect";

import EPartnerManage from "./EPartnerManage";
import EPartnersReservations from "./EPartnersReservations";

import EPartnerReservationsProperties from "./EPartnerReservationsProperties";

import AgodaListings from "./AgodaListings";
import AgodaSync from "./AgodaSync";
import AgodaInquiries from "./AgodaInquiries";
import AgodaBooking from "./AgodaBooking";
import AgodaAccount from "./AgodaAccount";

import ZipcodesRegionsMapping from "./ZipcodesRegionsMapping";
import ZipcodesRegionsMappingCountry from "./ZipcodesRegionsMappingCountry";

import menuIcon from '../assets/icons8-menu-50.png';

import ListingsRU_DECLINED_BUT_LISTED_ON_RU from "./ListingsRU_DECLINED_BUT_LISTED_ON_RU"
import ListingsBP_DECLINED_BUT_LISTED_ON_BP from "./ListingsBP_DECLINED_BUT_LISTED_ON_BP"

const logintoken = localStorage.getItem('jToken');

export const drawerWidth = 240;
const changeFontColor = {
  color: "#44C8F5",
  fontWeight: "600",
};
const fontColor = { color: "#32516D" };

function MainPage(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [agent, setAgent] = useState(localStorage.getItem("agent"));
  const [agency, setAgency] = useState(localStorage.getItem("agency"));

  const user = useSelector((state) => state.user.user);
  const [profile, setProfile] = [];
  const [token, setToken] = useState(localStorage.getItem("jToken"));
  const [source, setSource] = useState(localStorage.getItem("channelSource"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const [partner, setPartner] = useState(localStorage.getItem("partner"));
  const [property, setProperty] = useState(localStorage.getItem("property"));

  //const [regions, setRegions] = useState(typeof localStorage.getItem('regions') !== 'undefined' && localStorage.getItem('regions')  ? JSON.parse(localStorage.getItem('regions')) : [])
  const [regions, setRegions] = useState(localStorage.getItem('regions') !== 'undefined' && localStorage.getItem('regions') !== null ? JSON.parse(localStorage.getItem('regions')) : [])
  const [destinations, setDestinations] = useState(localStorage.getItem('destinations')  !== 'undefined' && localStorage.getItem('destinations')  !== null ? JSON.parse(localStorage.getItem('destinations')) : [])
  const [cities, setCities] = useState(localStorage.getItem('cities')  !== 'undefined' && localStorage.getItem('cities')  !== null ? JSON.parse(localStorage.getItem('cities')) : [])
  const [countries, setCountries] = useState(localStorage.getItem('countries')  !== 'undefined' && localStorage.getItem('countries')  !== null ? JSON.parse(localStorage.getItem('countries')) : [])




const agentData = JSON.parse(agent);
//localStorage.removeItem('property_status_to_filter');

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



  const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
      token: `Bearer ${token}`,
    },
  });

  const getProfile = async () => {
    
    const agentId = localStorage.getItem("agent_id") ? parseInt(localStorage.getItem("agent_id")) : null;
    if (agentId) {
      const res = await userRequest.get(`/agent/get-profile`, {
        params: {
          agent_id: agentId
        },
      });
      localStorage.setItem("agent", JSON.stringify(res.data?.agent));
      const agent = res?.data?.agent;
      //console.log("read agent:", agent); //Commented by Jaison for security purpose
      const agencyID = parseInt(agent?.agency_id);
      console.log("TA=", agencyID);

      const TAres = await userRequest.get(`travel-agency/get-travel-agencies`, {
        params: {
          agency_id: agencyID,
        },
      });
      setAgency(TAres.data.agencies[0])
      console.log("read agency: ", agency)
      localStorage.setItem("travelAgency", JSON.stringify(agency));




const partnerAccountId = localStorage.getItem('partnerLogin');

if(partnerAccountId) {
  // Default to the Guesty PM home. AccountIds are not only 24-hex: G- twins
  // (26 chars), RU-/BP- and other shapes exist, and an unmatched id used to
  // leave GO_TO = '' — dumping the partner on an empty page right after a
  // successful login, which reads as "my password doesn't work".
  let GO_TO = PATH_PARTNERS;
  if( /sh-ru|^RU-/i.test(partnerAccountId) === true ) {
    GO_TO = PATH_PARTNERS_RU
  } else if (/sh-bp|^BP-/i.test(partnerAccountId) === true) {
    GO_TO = PATH_PARTNERS_BP
  }

  history.push(GO_TO);
} 

      //history.push(PATH_HOME); //Default - for admins
 
    } else {
      history.push(PATH_LOGIN);
    }
  }


  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    AuthService.DestinationsOptions().then((response) => {
      if (response) {
        console.log('succesfully read shub destinations!')
      }
    }).catch((e) => {
      console.log(e)
      console.log('COULD not read shub destinations!')
    })
  }, []);

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    if (screenSize < 800) {
      setActiveMenu(false);
      localStorage.setItem("screen", activeMenu);
      localStorage.setItem("screenSize", screenSize);
    } else {
      setActiveMenu(true);
      localStorage.setItem("screen", activeMenu);
      localStorage.setItem("screenSize", screenSize);
    }
  }, [screenSize]);

  const handleToggleMenu = () => {
    if (screenSize < 900) {
      setActiveMenu((preValue) => !preValue);
    } else { setActiveMenu(false) }
  };

  return (
    <>

      <Switch>
        <Route exact path={[PATH_LOGIN]}>
          <Auth stage="login" signup={false} setToken={setToken} />
        </Route>
        <Route exact path={[PATH_QR]}>
          <Qr />
        </Route>        
        <Route exact path={"/verifycode/:id"}>
          <VerifyCodePage />
        </Route>
        <Route exact path={"/resetpassword/:id"}>
          <ResetChangePasswordPage />
        </Route>
        <Route exact path={[PATH_FORGOT_PASSWORD]}>
          <ResetPasswordPage />
        </Route>

        <Route exact path={[PATH_SIGNUP_THANKS]}>
          <SignupThanks />
        </Route>
        <Route path={[PATH_Welcome]}>
          <Welcome signup={true} />
        </Route>
        <Route path={[PATH_SIGNUP]}>
          <Signup />
        </Route>
        <Route path={[PATH_LISTINGS]}>
          <Listings
            agent={agent}
            agency={agency}
          />
        </Route>
        <Route path={[PATH_DUPLICATED_LISTINGS]}>
          <DuplicatedListings
            token={token}
            agency={agency}
            agent={agent}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route path={[PATH_LISTINGS_BP]}>
          <ListingsBP
            agent={agent}
            agency={agency}
          />
        </Route>   
        <Route path={[PATH_LISTINGS_RU]}>
          <ListingsRU
            agent={agent}
            agency={agency}
          />
        </Route>              
        <Route path={[PATH_TASKS]}>
          <Tasks
            agent={agent}
            agency={agency}
          />
        </Route>
        <Route path={PATH_VERIFY_COMPARE_NEW_PMS}>
          <VerifyNewPMs 
            {...props} 
            token={token}
            agency={agency}
            agent={agent}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route path={[PATH_PROPERTY]}>
          <Property
            property={property}
            agent={agent}
            agency={agency}
          />
        </Route>
        <Route exact path={[PATH_SEARCH]}>
          <SearchProperty
            agency={agency}
            agent={agent}
            token={token} />
        </Route>
        <Route exact path={[PATH_SHUB]}>
          <ShubPanel
            token={token}
            agent={agent}
            agency={agency}
          />
        </Route>
        <Route exact path={[PATH_MAP]}>
          <Map
            token={token}
            agent={agent}
            agency={agency}
          />
        </Route>
        <Route exact path={[PATH_COLLECTIONS]}>
          <Collections
            signup={false}
            token={token}
            agent={agent}
            agency={agency}
          />
        </Route>
        <Route exact path={[PATH_HOT_DESTINATIONS]}>
          <HotDestinations
            token={token}
            agent={agent}
            agency={agency} />
        </Route>
        <Route exact path={[PATH_PROPERTIES_NEEDS_ATTENTION]}>
          <PropertiesNeedsAttention
            token={token}
            agent={agent}
            agency={agency} />
        </Route>        
        <Route exact path={[PATH_FAVORITES]}>
          <Favorites
            token={token}
            agent={agent}
            agency={agency} />
        </Route>
        <Route exact path={[PATH_RESERVATIONS]}>
          <Reservations
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_REPORTS]}>
          <Reports />
        </Route>
        <Route exact path={[PATH_PROFILE]}>
          <Profile
            agency={agency}
            agent={agent}
            token={token}
            setAgent={setAgent}
            setAgency={setAgency}
          />
        </Route>
        <Route exact path={[PATH_WISH_LIST]}>
          <WishList
            agency={agency}
            agent={agent}
            token={token}
          />
        </Route>
        <Route exact path={[PATH_INTOUCH]}>
          <Touch token={token}
            agent={agent}
            agency={agency}
          />
        </Route>
        <Route exact path={PATH_PROPERTY}>
          <Property
            agency={agency}
            agent={agent}
            token={token}
          />
        </Route>
        <Route exact path={[PATH_PROPERTY_EDIT]}>
          <PropertyEdit
            propertyId={propertyId}
            agency={agency}
            agent={agent}
            token={token}
          />
        </Route>
        <Route exact path={[PATH_FAQ]}>
          <Faq />
        </Route>
        <Route exact path={[PATH_ADMIN]}>
          <Admin
            agency={agency}
            agent={agent}
            token={token}
          />
        </Route>
        {/*
          Both /dashboard (canonical) and /home (legacy — Auth.jsx used to push
          admins here) render the AdminDashboard. Keep both so any surviving
          window.open('/home') / bookmark keeps working during the transition.
        */}
        <Route exact path={[PATH_DASHBOARD, PATH_HOME]}>
          <AdminDashboard
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_ADMIN_SETTINGS]}>
          <AdminSettings
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_RESERVE]}>
          <PropertyReservePage
            agency={agency}
            agent={agent}
            token={token}
          />
        </Route>
        <Route exact path={[PATH_PARTNERS]}>
          <Partners
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route> 

        <Route exact path={[PATH_PARTNERS_SH]}>
          <PartnersSH
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>        

        <Route exact path={[PATH_PARTNERS_VT]}>
          <PartnersVT
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>

        <Route exact path={[PATH_PARTNERS_HOSTAWAY]}>
          <PartnersHostawayV2
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>


        <Route exact path={[PATH_PARTNERS_BP]}>
          <PartnersBP
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_PARTNERS_RU]}>
          <PartnersRU
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_PARTNERS_GUESTY_DH]}>
          <PartnersGuestyDH
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_PARTNERS_RU_DH]}>
          <PartnersRuDH
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_PARTNERS_BART]}>
          <PartnersBartV2
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_PARTNERS_INVENIO]}>
          <PartnersInvenioV2
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_PARTNERS_BOOKINGPAL]}>
          <PartnersBookingpalV2
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_LISTINGS_BOOKINGPAL]}>
          <ListingsBookingpal
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route exact path={[PATH_RETURN_FLYWIRE]}>
          <RequestToBookFlywire />
        </Route>
        <Route exact path={[PATH_LISTINGS_SH_RU_DECLINED_BUT_LISTED_ON_RU]}>
          <ListingsRU_DECLINED_BUT_LISTED_ON_RU
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>  
        <Route exact path={[PATH_LISTINGS_SH_BP_DECLINED_BUT_LISTED_ON_BP]}>
          <ListingsBP_DECLINED_BUT_LISTED_ON_BP
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>                
        <Route exact path={[PATH_EPARTNERS]}>
          <EPartners
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            setScreenSize={setScreenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
          />
        </Route>
        <Route path={[PATH_EPS_LISTINGS]}>
          <EListings
            agent={agent}
            agency={agency}
            token={token}
          />
          </Route>
          <Route path={[PATH_SELECT]}>
            <EPSSelect
              agent={agent}
              agency={agency}
              token={token}
            />
          </Route> 
        <Route path={[PATH_EPS_EPARTNER_MANAGE]}>
          <EPartnerManage
            agent={agent}
            agency={agency}
            token={token}
          />
          </Route>
        <Route path={[PATH_AGODA_LISTINGS]}>
          <AgodaListings agent={agent} agency={agency} token={token} />
          </Route>
        <Route path={[PATH_AGODA_SYNC]}>
          <AgodaSync agent={agent} agency={agency} token={token} />
          </Route>
        <Route exact path={`${PATH_AGODA_BOOKING}/:bookingId`}>
          <AgodaBooking agent={agent} agency={agency} token={token} />
          </Route>
        <Route path={[PATH_AGODA_INQUIRIES]}>
          <AgodaInquiries agent={agent} agency={agency} token={token} />
          </Route>
        <Route path={[PATH_AGODA_ACCOUNT]}>
          <AgodaAccount agent={agent} agency={agency} token={token} />
          </Route>
        <Route path={[PATH_EPS_EPARTNERS_RESERVATIONS]}>
          <EPartnersReservations
            agent={agent}
            agency={agency}
            token={token}
          />
          </Route>     
        <Route path={[PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES]}>
          <EPartnerReservationsProperties
            agent={agent}
            agency={agency}
            token={token}
            handleToggleMenu={handleToggleMenu}
          />
          </Route>    
        <Route path={[PATH_ZIPS_REGIONS_MAPPING]}>
          <ZipcodesRegionsMapping
            agent={agent}
            agency={agency}
            token={token}
            handleToggleMenu={handleToggleMenu}
          />
        </Route>  
        <Route path={[`${PATH_ZIPS_REGIONS_MAPPING_COUNTRY}/:country`]}>
          <ZipcodesRegionsMappingCountry
            agent={agent}
            agency={agency}
            token={token}
            handleToggleMenu={handleToggleMenu}
          />
        </Route>
                                                
        <Route path={[PATH_SEARCH_LISTINGS]}>
          <SearchListings
            agent={agent}
            agency={agency}
            token={token}
            handleToggleMenu={handleToggleMenu}
          />
        </Route>
    
        <div className="page-container">
          <div className="page-header"><img src={menuIcon} style={{'width':'25px'}} className="cst-cursor" onClick={showOrHideSideBarMenu} />&nbsp;{APP_DISPLAY_NAME} - {agentData?.firstName} (<span className="cst-cursor" onClick={signOut}>Sign Out</span>)</div>
          <Sidebar
            agency={agency}
            agent={agent}
            token={token}
            setProfile={setProfile}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
          />
          
          <div className={activeMenu ? `${"page-body"}` : "page-body-sm"} onClick={() => screenSize < 768 && setActiveMenu((preValue) => false)} >
          </div>
           <div className={showSideBarMenu ? `${"page-body"}` : "page-body-nomargin"} >
          </div>
        </div>

      </Switch >
      <ToastContainer />
    </>
  );
}
export default MainPage;
