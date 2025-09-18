import React, { useState } from 'react';
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
  const [showSideBarMenu, setShowSideBarMenu] = useState(false);
  
  const agentData = agent ? JSON.parse(agent) : null;
  const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role') || 
    (agentData?.role === 'admin' ? 'admin' : 'partner');

  const showOrHideSideBarMenu = () => {
    setShowSideBarMenu(prev => !prev);
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
        <Sidebar
          agency={agency}
          agent={agent}
          token={token}
          screenSize={screenSize}
          activeMenu={activeMenu}
          handleToggleMenu={handleToggleMenu}
          showOrHideSideBarMenu={showOrHideSideBarMenu}
        />
      )}
      
      <div className={`layout-content ${showSideBarMenu ? 'with-sidebar' : 'without-sidebar'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;