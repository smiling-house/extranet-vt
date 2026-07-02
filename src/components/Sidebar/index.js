import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as userActions from "../../store/redux/User/actions";
import Logo from "../../components/Icons/Logo/Logo";
import Logo2 from "../../components/Icons/Logo/shub-logo.png";
import brandLogo from "../../assets/logos/vt-extranet-logo.svg";
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
import { FiUsers, FiUserCheck, FiCalendar, FiMap, FiSearch, FiSettings, FiExternalLink, FiCopy, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { MdDashboard, MdBusiness, MdLocationOn, MdVerifiedUser } from "react-icons/md";
import { getStorageValue } from "../../Util/general";
import "./sidebar.scss";
import {
  PATH_LOGIN,
  PATH_ADMIN,
  PATH_LISTINGS,
  PATH_TASKS,
  PATH_PARTNERS,
  PATH_PARTNERS_BP,
  PATH_PARTNERS_RU,
  PATH_PARTNERS_BART,
  PATH_PARTNERS_INVENIO,
  PATH_PARTNERS_BOOKINGPAL,
  PATH_EPARTNERS,
  PATH_RESERVE,
  PATH_COLLECTIONS,
  PATH_WISH_LIST,
  PATH_FAVORITES,
  PATH_HOT_DESTINATIONS,
  PATH_SHUB,
  PATH_HOME,
  PATH_DASHBOARD,
  PATH_SEARCH,
  PATH_MAP,
  PATH_RESERVATIONS,
  PATH_SIGNOUT,
  PATH_EPS_EPARTNERS_RESERVATIONS,
  PATH_EPS_EPARTNER_RESERVATIONS_PROPERTIES,
  APP_DISPLAY_NAME,
  PATH_VERIFY_COMPARE_NEW_PMS,
  PATH_ZIPS_REGIONS_MAPPING,
  PATH_DUPLICATED_LISTINGS,
  PATH_PARTNERS_SH,
  PATH_PARTNERS_VT,
  PATH_PARTNERS_GUESTY_DH,
  PATH_PARTNERS_RU_DH,
  PATH_PARTNERS_HOSTAWAY,
  PATH_SEARCH_LISTINGS,
  PATH_PROPERTIES_NEEDS_ATTENTION,
  PATH_AGODA_LISTINGS,
  PATH_AGODA_SYNC,
  PATH_AGODA_ACCOUNT
} from "../../Util/constants";

// -----------------------------------------------------------------------
// Initial-letter badge for partner menu items. Instead of every entry using
// the same MdBusiness building glyph, each PM cohort gets a coloured letter
// so a glance is enough to distinguish them in the collapsed sidebar rail.
// -----------------------------------------------------------------------
const InitialBadge = ({ letters, tint }) => (
  <span className={`sidebar-initial-badge tint-${tint}`}>{letters}</span>
);

const Sidebar = ({ activeMenu, setActiveMenu, handleToggleMenu, showOrHideSideBarMenu }) => {
  const [hoverItem, setHoverItem] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("sidebarCollapsed") === "1");

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-w", collapsed ? "72px" : "250px");
    localStorage.setItem("sidebarCollapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  const toggleCollapsed = () => setCollapsed((c) => !c);
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
      // Standalone dashboard entry at the very top — the admin landing page.
      // Rendered as a single-item group so it takes one row in the sidebar
      // instead of collapsing under a header.
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <MdDashboard size={20} />,
        standalone: true,
        items: [
          { text: "Dashboard", path: PATH_DASHBOARD, icon: <MdDashboard size={18} /> },
        ]
      },
      {
        id: 'partners',
        title: 'Partner Management',
        icon: <FiUsers size={20} />,
        items: [
          // New RU/DH source-partitioned pages — primary going forward.
          { text: "Guesty PMs", path: PATH_PARTNERS_GUESTY_DH, icon: <InitialBadge letters="G" tint="green" /> },
          { text: "RU PMs", path: PATH_PARTNERS_RU_DH, icon: <InitialBadge letters="R" tint="cyan" /> },
          // Modern-era channel-specific pages.
          { text: "Hostaway PMs", path: PATH_PARTNERS_HOSTAWAY, icon: <InitialBadge letters="H" tint="purple" /> },
          { text: "BART PMs", path: PATH_PARTNERS_BART, icon: <InitialBadge letters="B" tint="amber" /> },
          { text: "INVENIO PMs", path: PATH_PARTNERS_INVENIO, icon: <InitialBadge letters="I" tint="indigo" /> },
          { text: "BP PMs", path: PATH_PARTNERS_BOOKINGPAL, icon: <InitialBadge letters="P" tint="pink" /> },
          // Legacy pages — grey badges signal their status.
          { text: "Guesty SH PMs (Legacy)", path: PATH_PARTNERS_SH, icon: <InitialBadge letters="GS" tint="legacy" /> },
          { text: "Guesty VT PMs (Legacy)", path: PATH_PARTNERS_VT, icon: <InitialBadge letters="GV" tint="legacy" /> },
          { text: "BP PMs (SH) (Legacy)", path: PATH_PARTNERS_BP, icon: <InitialBadge letters="PS" tint="legacy" /> },
          { text: "RU PMs (SH) (Legacy)", path: PATH_PARTNERS_RU, icon: <InitialBadge letters="RS" tint="legacy" /> },
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
          { text: "Duplicated Listings", path: PATH_DUPLICATED_LISTINGS, icon: <FiCopy size={18} /> },
          { text: "Tasks", path: PATH_TASKS, icon: <FiSettings size={18} /> },
          { text: "VT Reservations", path: PATH_RESERVATIONS, icon: <FiCalendar size={18} /> },
          { text: "Verify New PMs", path: PATH_VERIFY_COMPARE_NEW_PMS, icon: <MdVerifiedUser size={18} /> },
          { text: "Mapping unmapped listings - Zipcodes & Regions", path: PATH_ZIPS_REGIONS_MAPPING, icon: <MdVerifiedUser size={18} /> },
        ]
      },
      {
        id: 'search',
        title: 'Search & Discovery',
        icon: <FiSearch size={20} />,
        items: [
          /*{ text: "Listing Search", path: PATH_SHUB, icon: <FiSearch size={18} /> }, */
          /* { text: "General Search", path: PATH_SEARCH, icon: <FiSearch size={18} /> }, */
          { text: "Search Listings", path: PATH_SEARCH_LISTINGS, icon: <FiSearch size={18} /> },
          { text: "Interactive Map", path: PATH_MAP, icon: <FiMap size={18} /> },
          { text: "Hot Destinations", path: PATH_HOT_DESTINATIONS, icon: <MdLocationOn size={18} /> },
          { text: "Properties Needs Attention", path: PATH_PROPERTIES_NEEDS_ATTENTION, icon: <MdLocationOn size={18} /> },
        ]
      },
      {
        id: 'channels',
        title: 'Channels / Distribution',
        icon: <FiExternalLink size={20} />,
        items: [
          { text: "Agoda — Properties", path: PATH_AGODA_LISTINGS, icon: <MdBusiness size={18} /> },
          { text: "Agoda — Sync Status", path: PATH_AGODA_SYNC, icon: <FiSettings size={18} /> },
          { text: "Agoda — Account", path: PATH_AGODA_ACCOUNT, icon: <MdVerifiedUser size={18} /> },
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
        data-tooltip={group.title}
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
        data-tooltip={text}
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
    <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img className="sidebar-logo-img" src={brandLogo} alt="Villa Tracker Extranet" />
        </div>

        <button
          className="sidebar-collapse-btn"
          onClick={toggleCollapsed}
          title={collapsed ? 'Expand menu' : 'Collapse menu'}
        >
          {collapsed ? <FiChevronsRight size={18} /> : <FiChevronsLeft size={18} />}
        </button>

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
          <div key={group.id} className={`sidebar-group ${group.standalone ? 'sidebar-group--standalone' : ''}`}>
            {/*
              Standalone groups (single-item groups like Dashboard) skip the
              collapsible header and render the item at the top level. Keeps
              one-off entries from taking two rows in the rail.
            */}
            {!group.standalone && renderGroupHeader(group)}
            {group.standalone
              ? group.items.map((item) => renderItem(item.text, item.path, item.icon, false))
              : renderGroupItems(group)}
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