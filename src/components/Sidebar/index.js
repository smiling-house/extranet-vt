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
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { FiUsers, FiUserCheck, FiCalendar, FiMap, FiSearch, FiSettings, FiExternalLink } from "react-icons/fi";
import { MdDashboard, MdBusiness, MdLocationOn, MdVerifiedUser } from "react-icons/md";
import { getStorageValue } from "../../Util/general";
import "./sidebar.scss";
import {
  PATH_LOGIN,
  PATH_ADMIN,
  PATH_ADMIN_LOGIN,
  PATH_LISTINGS,
  PATH_TASKS,
  PATH_PARTNERS,
  PATH_PARTNERS_BP,
  PATH_PARTNERS_RU,
  PATH_PARTNERS_BART,
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
  PATH_SIGNOUT,
  PATH_EPS_EPARTNERS_RESERVATIONS,
  PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES,
  APP_DISPLAY_NAME,
  PATH_VERIFY_COMPARE_NEW_PMS
} from "../../Util/constants";

const Sidebar = ({ activeMenu, setActiveMenu, handleToggleMenu, showOrHideSideBarMenu }) => {
  const [hoverItem, setHoverItem] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  const location = useLocation();
  const screenSize = localStorage.getItem("screenSize");
  const agent = localStorage.getItem("agent") ? JSON.parse(localStorage.getItem("agent")) : null;
  const exPartner = (localStorage.getItem("exPartner") && localStorage.getItem("exPartner") !== 'undefined') ? JSON.parse(localStorage.getItem("exPartner")) : null;
  const partnerLogin = getStorageValue('partnerLogin');
  const admin = (agent?.role === 'admin' && !partnerLogin);
  const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');

  const signOut = () => {
    localStorage.clear();
    dispatch(userActions.signOut());
    history.push(PATH_LOGIN);
  };

  const menuGroups = {
    admin: [
      {
        id: 'partners',
        title: 'Partner Management',
        icon: <FiUsers size={20} />,
        items: [
          { text: "Guesty PMs", path: PATH_PARTNERS, icon: <MdBusiness size={18} /> },
          { text: "BP PMs", path: PATH_PARTNERS_BP, icon: <MdBusiness size={18} /> },
          { text: "RU PMs", path: PATH_PARTNERS_RU, icon: <MdBusiness size={18} /> },
          { text: "BART PMs", path: PATH_PARTNERS_BART, icon: <MdBusiness size={18} /> },
        ]
      },
      {
        id: 'operations',
        title: 'Operations',
        icon: <MdDashboard size={20} />,
        items: [
          { text: "External Partners", path: PATH_EPARTNERS, icon: <FiExternalLink size={18} /> },
          { text: "EPS Reservations", path: PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES, icon: <FiCalendar size={18} /> },
          { text: "Listings", path: PATH_LISTINGS, icon: <FiUsers size={18} /> },
          { text: "Tasks", path: PATH_TASKS, icon: <FiSettings size={18} /> },
          { text: "VT Reservations", path: PATH_RESERVATIONS, icon: <FiCalendar size={18} /> },
          { text: "Verify New PMs", path: PATH_VERIFY_COMPARE_NEW_PMS, icon: <MdVerifiedUser size={18} /> },
        ]
      },
      {
        id: 'search',
        title: 'Search & Discovery',
        icon: <FiSearch size={20} />,
        items: [
          { text: "Listing Search", path: PATH_SHUB, icon: <FiSearch size={18} /> },
          { text: "General Search", path: PATH_SEARCH, icon: <FiSearch size={18} /> },
          { text: "Interactive Map", path: PATH_MAP, icon: <FiMap size={18} /> },
          { text: "Hot Destinations", path: PATH_HOT_DESTINATIONS, icon: <MdLocationOn size={18} /> },
        ]
      }
    ],
    partner: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <AiOutlineHome size={20} />,
        items: [
          { text: "Partner Home", path: PATH_PARTNERS, icon: <AiOutlineHome size={18} /> }
        ]
      }
    ]
  };

  const renderGroupHeader = (group) => {
    const isExpanded = expandedGroup === group.id;
    const hasActiveItem = group.items.some(item => location.pathname === item.path);
    
    return (
      <div
        key={group.id}
        className={`sidebar-group-header ${isExpanded || hasActiveItem ? 'active' : ''}`}
        onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
      >
        <div className="sidebar-group-icon">
          {group.icon}
        </div>
        <span className="sidebar-group-title">{group.title}</span>
        <div className={`sidebar-group-arrow ${isExpanded ? 'expanded' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M4 5l2 2 2-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    );
  };

  const renderGroupItems = (group) => {
    const isExpanded = expandedGroup === group.id;
    const hasActiveItem = group.items.some(item => location.pathname === item.path);
    
    return (
      <div className={`sidebar-group-items ${isExpanded || hasActiveItem ? 'expanded' : ''}`}>
        {group.items.map((item) => renderItem(item.text, item.path, item.icon, true))}
      </div>
    );
  };

  const renderItem = (text, path, icon, isSubItem = false) => {
    const isActive = location.pathname === path;
    const isHovered = hoverItem === text;
    
    const doPress = () => {
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

    return (
      <div
        key={text}
        className={`sidebar-item ${isActive ? 'active' : ''} ${isSubItem ? 'sub-item' : ''} ${isHovered ? 'hovered' : ''}`}
        onClick={doPress}
        onMouseEnter={() => setHoverItem(text)}
        onMouseLeave={() => setHoverItem(null)}
      >
        <div className="sidebar-item-icon">
          {icon}
        </div>
        <span className="sidebar-item-text">{text}</span>
        {isActive && <div className="sidebar-item-indicator" />}
      </div>
    );
  };

  const currentRole = extranet_vt_logged_in_role;
  const currentMenuGroups = currentRole === 'admin' ? menuGroups.admin : menuGroups.partner;

  return (
    <div className="sidebar-container">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#104109"/>
              <path d="M8 12h16v8H8z" fill="white"/>
              <circle cx="12" cy="16" r="2" fill="#104109"/>
              <circle cx="20" cy="16" r="2" fill="#104109"/>
            </svg>
          </div>
          <div className="sidebar-logo-text">
            <h3>{APP_DISPLAY_NAME}</h3>
            <small>{currentRole === 'admin' ? 'Administrator' : 'Partner'} Portal</small>
          </div>
        </div>

        {screenSize < 800 && (
          <button 
            className="sidebar-close-btn"
            onClick={showOrHideSideBarMenu}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="sidebar-user-info">
        <div className="sidebar-user-avatar">
          <span>{agent?.firstName?.charAt(0)?.toUpperCase() || 'U'}</span>
        </div>
        <div className="sidebar-user-details">
          <div className="sidebar-user-name">{agent?.firstName || 'User'}</div>
          <div className="sidebar-user-role">{currentRole === 'admin' ? 'Administrator' : 'Partner'}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {currentMenuGroups.map((group) => (
          <div key={group.id} className="sidebar-group">
            {renderGroupHeader(group)}
            {renderGroupItems(group)}
          </div>
        ))}
        
        {/* Sign Out - Always visible */}
        <div className="sidebar-signout">
          {renderItem("Sign Out", PATH_SIGNOUT, <AiOutlineLogout size={18} />)}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;