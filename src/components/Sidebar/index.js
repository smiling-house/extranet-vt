import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as userActions from "../../store/redux/User/actions";
import Logo from "../../components/Icons/Logo/Logo";
import Logo2 from "../../components/Icons/Logo/shub-logo.png";
import searchIcon from "../../assets/icons/menu/search.png";
import mapIcon from "../../assets/icons/menu/map.png";
import customersIcon from "../../assets/icons/menu/customers.png";
import reservationsIcon from "../../assets/icons/menu/reservations.png";
import reportsIcon from "../../assets/icons/menu/reports.png";
import profileIcon from "../../assets/icons/menu/profile.png";
import getInTouchIcon from "../../assets/icons/menu/get-in-touch.png";
import faqIcon from "../../assets/icons/menu/faq.png";
import adminIcon from "../../assets/icons/menu/admin.png";
import { AiOutlineMenu } from "react-icons/ai";
import { getStorageValue } from "../../Util/general";
import "./sidebar.scss";
import {
  PATH_LOGIN,
  PATH_ADMIN,
  PATH_LISTINGS,
  PATH_TASKS,
  PATH_PARTNERS,
  PATH_EPARTNERS,
  PATH_RESERVE,
  PATH_COLLECTIONS,
  PATH_WISH_LIST,
  PATH_FAVORITES,
  PATH_HOT_DESTINATIONS,
  PATH_SHUB,
  PATH_HOME,
  PATH_SEARCH,
  PATH_MAP,
  PATH_RESERVATIONS,
  PATH_SIGNOUT
} from "../../Util/constants";

const Sidebar = ({ activeMenu, setActiveMenu, handleToggleMenu }) => {
  const [hoverItem, setHoverItem] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  const location = useLocation();
  const screenSize = localStorage.getItem("screenSize");
  const agent = localStorage.getItem("agent")?JSON.parse(localStorage.getItem("agent")):null;
  const exPartner = (localStorage.getItem("exPartner")&&localStorage.getItem("exPartner")!=='undefined')?JSON.parse(localStorage.getItem("exPartner")):null;
  const partnerLogin=getStorageValue('partnerLogin')
  const admin=(agent?.role==='admin'&&!partnerLogin)
  const signOut = () => {
    localStorage.clear();
    dispatch(userActions.signOut());
    history.push(PATH_LOGIN);
  };

  const renderItem = (text, path, icon) => {
    const doPress = () => {
      console.log(screenSize);
      if (screenSize < 800) {
        handleToggleMenu(false);
      }
      if (path === PATH_SIGNOUT) {
        signOut();
      } else if (path === PATH_MAP) {
        console.log("map pressed");
      } else {
        history.push(path);
      }
    };
    //if (activeMenu) {
      return (
        <div
          className="sidebar-item"
          onClick={() => doPress()}
          onMouseOver={() => setHoverItem(text)}
          onMouseOut={() => setHoverItem(null)}
        >
          <div style={{ width: "45px" }}>
            <img
              src={icon}
              className="sidebar-icon"
              style={{
                opacity:
                  hoverItem === text || location.pathname === path ? 1 : 0,
              }}
            />
          </div>
          {text}
        </div>
      );
  };

  return (
    <div
      className={
        activeMenu ? `${"sidebar-container"}` : `${"sidebar-container"}`
      }
    >
      {/* {!activeMenu && (
        <div onClick={handleToggleMenu} className="h-100">
          <a href="javascript:void" className="p-2 rounded text-white ">
            <AiOutlineMenu color="#000" size={30} />
          </a>
        </div>
      )} */}
      {/* {activeMenu && ( */}
      (
        <div
          className="sidebar-logo-container"
          onClick={() => history.push(PATH_HOME)}
        >
          <div style={{ width: "180px", cursor: "pointer" }}>
          <img
              src={Logo2} 
              />
          </div>
        </div>
      )
      {renderItem("Guesty PMs", PATH_PARTNERS, adminIcon) }
      {admin&&renderItem("External Partners", PATH_EPARTNERS, adminIcon) }
      {admin&&renderItem("Listings", PATH_LISTINGS, customersIcon)}
      {admin&&renderItem("Tasks", PATH_TASKS, customersIcon)}
      {admin&&renderItem("VT Reservations", PATH_RESERVATIONS, reservationsIcon)}
      {admin&&renderItem("listing Search", PATH_SHUB, adminIcon) }
      {admin&&renderItem("General Search", PATH_SEARCH, searchIcon)}
      {admin&&renderItem("Interactive Map", PATH_MAP, mapIcon)}
      {admin&&renderItem("Hot Destinations", PATH_HOT_DESTINATIONS, adminIcon)}
      {renderItem("Sign Out", PATH_SIGNOUT, adminIcon)}
    </div>
  );
};

export default Sidebar;
