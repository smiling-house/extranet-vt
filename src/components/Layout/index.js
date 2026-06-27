import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Topbar from '../Topbar/index.js';
import Sidebar from '../Sidebar';
import './layout.scss';

const Layout = ({ 
  children, 
  pageTitle = 'Dashboard',
  agency,
  agent,
  token,
  screenSize,
  activeMenu,
  handleToggleMenu,
  setActiveMenu
}) => {
  // Persist open/closed so the nav "sticks" across page navigation — each page
  // re-mounts Layout, so previously the local-only state reset to closed.
  const [showSideBarMenu, setShowSideBarMenu] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    if (saved !== null) return saved === '1';
    const w = Number(localStorage.getItem('screenSize')) || (typeof window !== 'undefined' ? window.innerWidth : 1024);
    return w >= 800;
  });

  const agentData = agent ? JSON.parse(agent) : null;
  const extranet_vt_logged_in_role = agentData?.role === 'admin' ? 'admin' : 'partner';

  const showOrHideSideBarMenu = () => {
    setShowSideBarMenu(prev => {
      localStorage.setItem('sidebarOpen', prev ? '0' : '1');
      return !prev;
    });
  };

  return (
    <div className="layout-container">
      <Topbar
        showSideBarMenu={showSideBarMenu}
        showOrHideSideBarMenu={showOrHideSideBarMenu}
        agentData={agentData}
        pageTitle={pageTitle}
        extranet_vt_logged_in_role={extranet_vt_logged_in_role}
      />
      
      {showSideBarMenu && (
        <>
          <div className="sidebar-backdrop" onClick={showOrHideSideBarMenu} />
          <Sidebar
            agency={agency}
            agent={agent}
            token={token}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            showOrHideSideBarMenu={showOrHideSideBarMenu}
          />
        </>
      )}
      
      <div className={`layout-content ${showSideBarMenu ? 'with-sidebar' : 'without-sidebar'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;