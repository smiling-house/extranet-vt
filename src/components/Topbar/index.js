import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as userActions from '../../store/redux/User/actions';
import { PATH_LOGIN, APP_DISPLAY_NAME } from '../../Util/constants';
import menuIcon from '../../assets/icons8-menu-50.png';
import './topbar.scss';

// Partner sessions run on a shared internal agent account; show the PARTNER'S
// name and role, never the internal agent identity.
const Topbar = ({ 
  showSideBarMenu, 
  showOrHideSideBarMenu, 
  agentData, 
  pageTitle = 'Dashboard',
  extranet_vt_logged_in_role = 'partner' 
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    localStorage.clear();
    dispatch(userActions.signOut());
    history.push(PATH_LOGIN);
  };


  const _loggedRole = localStorage.getItem('extranet-vt-logged-in-role');
  const _partnerName = localStorage.getItem('partnerName');
  const displayName = (_loggedRole === 'partner' && _partnerName) ? _partnerName : agentData?.firstName;
  const displayRole = _loggedRole === 'partner' ? 'Partner' : (extranet_vt_logged_in_role === 'admin' ? 'Administrator' : 'Partner');

  return (
    <div className="page-header" style={{
      marginLeft: showSideBarMenu ? 'var(--sidebar-w, 250px)' : '0',
      transition: 'margin-left 0.3s ease',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className="container-fluid" style={{padding: '0px 50px'}}>
        <div className="row align-items-center py-3">
          {/* Left Section - Menu & Title */}
          <div className="col-lg-8 col-md-7 col-sm-8 col-6" style={{ paddingLeft: 0 }}>
            <div className="d-flex align-items-center">
              {/*
                Hamburger visibility:
                  * mobile (< 768px): always show — sidebar is fully overlay.
                  * desktop (≥ 768px): only when the sidebar is CLOSED — when
                    it's open the sidebar has its own `«` collapse control, and
                    a second hamburger next to it is noise. When closed on
                    desktop the hamburger is the ONLY way to reopen it, so
                    keeping the old `d-md-none` (hide on desktop) left the user
                    stranded with no way back — hence adding the conditional.
              */}
              <button
                type="button"
                className={`topbar-burger${showSideBarMenu ? " topbar-burger--sidebar-open" : ""}`}
                aria-label={showSideBarMenu ? "Close menu" : "Open menu"}
                onClick={showOrHideSideBarMenu}
              >
                <span /><span /><span />
              </button>
              <div className="header-title">
                <h1 className="mb-0 text-white d-none d-md-block" style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                  fontWeight: '600',
                  letterSpacing: '-0.5px'
                }}>
                  <span>{APP_DISPLAY_NAME}</span>
                  {displayName ? <span className="d-none d-md-inline"> — {displayName}</span> : null}
                </h1>
                
                {/* Mobile-only welcome message aligned with menu button */}
                <div className="d-md-none d-flex align-items-center">
                  <span className="text-white" style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    lineHeight: '28px' // Matches menu button height for alignment
                  }}>
                    Welcome, {displayName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - User Actions */}
          <div className="col-lg-4 col-md-5 col-sm-4 col-6">
            <div className="d-flex justify-content-end align-items-center">
              {/* User Info - Hidden on small screens */}
              <div className="d-none d-lg-flex align-items-center me-3">
                <div className="user-avatar me-2" style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {displayName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="text-white">
                  <div style={{fontSize: '14px', fontWeight: '500'}}>
                    {displayName}
                  </div>
                  <div style={{fontSize: '12px', opacity: '0.8'}}>
                    {displayRole}
                  </div>
                </div>
              </div>
              
              {/* Sign Out Button */}
              <button
                className="btn btn-outline-light btn-sm"
                onClick={signOut}
                style={{
                  borderRadius: '25px',
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '2px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              >
                <span className="d-sm-inline">Sign Out</span>
                <span className="d-sm-none">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;