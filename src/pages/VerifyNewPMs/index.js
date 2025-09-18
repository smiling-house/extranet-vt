import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

// Import components
import LoadingBox from "../../components/LoadingBox";
import Layout from "../../components/Layout";
import CSVUpload from "./CSVUpload";

// Import constants and utilities
import {
  PATH_VERIFY_COMPARE_NEW_PMS,
  APP_DISPLAY_NAME
} from "../../Util/constants";
import { MdVerifiedUser } from "react-icons/md";

// Import styles
import "./VerifyNewPMs.scss";

const VerifyNewPMs = (props) => {
  const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonHistory, setComparisonHistory] = useState([]);

  // Get user data
  const agentData = agent ? JSON.parse(agent) : null;
  const extranet_vt_logged_in_role = localStorage.getItem('extranet-vt-logged-in-role');

  // Handle comparison completion
  const handleComparisonComplete = (type, comparison) => {
    const timestamp = new Date().toISOString();
    const newComparison = {
      id: `${type}_${timestamp}`,
      type,
      timestamp,
      comparison
    };
    
    setComparisonHistory(prev => [newComparison, ...prev]);
    
    // You can also send this to your backend for storage
    console.log(`${type} Comparison completed:`, comparison);
  };

  // Redirect if not admin
  if (extranet_vt_logged_in_role !== 'admin') {
    return (
      <Layout
        pageTitle="Verify & Compare PMs"
        agency={agency}
        agent={agent}
        token={token}
        screenSize={screenSize}
        activeMenu={activeMenu}
        handleToggleMenu={handleToggleMenu}
        setActiveMenu={setActiveMenu}
      >
        <div className="verify-pms-container">
          <div className="access-denied">
            <h3>Access Denied</h3>
            <p>You don't have permission to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      pageTitle="Verify & Compare PMs"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="verify-pms-container">
        <LoadingBox visible={isLoading} />
        
        {/* CSV Comparison Section */}
        <div className="csv-comparison-section">
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-12">
                <div className="page-intro">
                  <div className="intro-header">
                    <MdVerifiedUser size={32} className="intro-icon" />
                    <div>
                      <h2>Partner Data Comparison Tool</h2>
                      <p className=" mb-0">
                        Upload and compare House Owner (HO) and Property Manager (PM) CSV files to track changes, 
                        additions, removals, and property counts between different time periods.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <CSVUpload onComparisonComplete={handleComparisonComplete} />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison History */}
        {comparisonHistory.length > 0 && (
          <div className="comparison-history-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="history-card">
                    <h5>Recent Comparisons</h5>
                    <div className="history-list">
                      {comparisonHistory.slice(0, 5).map((item) => (
                        <div key={item.id} className="history-item">
                          <div className="history-info">
                            <strong>{item.type} Comparison</strong>
                            <small>{new Date(item.timestamp).toLocaleString()}</small>
                          </div>
                          <div className="history-stats">
                            <span className="stat">
                              +{item.comparison.added.length} Added
                            </span>
                            <span className="stat">
                              -{item.comparison.removed.length} Removed
                            </span>
                            <span className="stat">
                              {Object.keys(item.comparison.counts).length} Total Partners
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VerifyNewPMs;