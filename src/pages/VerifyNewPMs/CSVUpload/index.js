import React, { useState, useRef } from 'react';
import { FiUpload, FiX, FiCheckCircle, FiAlertCircle, FiDownload, FiFile } from 'react-icons/fi';
import { MdCompareArrows, MdInfo } from 'react-icons/md';
import { parseCSVFile, validateCSVData, compareCSVData, exportComparisonAsCSV, downloadCSVTemplate } from '../../../Util/csvUtils';
import Button from '../../../components/Buttons/Button/Button';
import './CSVUpload.scss';

const CSVUpload = ({ onComparisonComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    HO: { old: null, new: null },
    PM: { old: null, new: null }
  });
  const [validationResults, setValidationResults] = useState({});
  const [comparisonResults, setComparisonResults] = useState({});
  const [comparisonLogs, setComparisonLogs] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('HO');
  
  const fileInputRefs = {
    HO_old: useRef(null),
    HO_new: useRef(null),
    PM_old: useRef(null),
    PM_new: useRef(null)
  };

  // Add log entry
  const addComparisonLog = (type, message, level = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setComparisonLogs(prev => ({
      ...prev,
      [type]: [
        ...(prev[type] || []),
        { timestamp, message, level }
      ]
    }));
  };

  // Clear logs for a type
  const clearComparisonLogs = (type) => {
    setComparisonLogs(prev => ({
      ...prev,
      [type]: []
    }));
  };

  const handleFileSelect = async (type, timeframe, event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    setIsProcessing(true);
    addComparisonLog(type, `Starting to process file: ${file.name}`, 'info');
    
    try {
      addComparisonLog(type, 'Parsing CSV file...', 'info');
      const data = await parseCSVFile(file);
      addComparisonLog(type, `Successfully parsed ${data.length} rows`, 'success');
      
      addComparisonLog(type, 'Validating CSV structure and data...', 'info');
      const errors = validateCSVData(data, type);
      
      if (errors.length > 0) {
        errors.forEach(error => {
          addComparisonLog(type, error, 'warning');
        });
      } else {
        addComparisonLog(type, 'File validation completed successfully', 'success');
      }
      
      const result = {
        file,
        data,
        status: errors.length > 0 ? (errors.some(err => err.includes('Missing required columns')) ? 'error' : 'warning') : 'success',
        errors,
        rowCount: data.length,
        type,
        timeframe
      };

      // Update uploaded files
      setUploadedFiles(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          [timeframe]: result
        }
      }));

      // Update validation results
      setValidationResults(prev => ({
        ...prev,
        [`${type}_${timeframe}`]: result
      }));

      // If both files for this type are uploaded and valid, perform comparison
      const updatedFiles = {
        ...uploadedFiles,
        [type]: {
          ...uploadedFiles[type],
          [timeframe]: result
        }
      };

      if (updatedFiles[type].old && updatedFiles[type].new && 
          updatedFiles[type].old.status !== 'error' && 
          updatedFiles[type].new.status !== 'error') {
        addComparisonLog(type, 'Both files ready - starting comparison...', 'info');
        performComparison(type, updatedFiles[type].old.data, updatedFiles[type].new.data);
      }

    } catch (error) {
      console.error('CSV parsing error:', error);
      const errorMessage = Array.isArray(error) ? error.map(e => e.message || e).join(', ') : (error.message || 'Failed to parse CSV file');
      addComparisonLog(type, `Error: ${errorMessage}`, 'error');
      
      const result = {
        file,
        status: 'error',
        errors: Array.isArray(error) ? error.map(e => e.message || e) : [error.message || 'Failed to parse CSV file'],
        type,
        timeframe
      };

      setUploadedFiles(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          [timeframe]: result
        }
      }));

      setValidationResults(prev => ({
        ...prev,
        [`${type}_${timeframe}`]: result
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const performComparison = (type, oldData, newData) => {
    try {
      addComparisonLog(type, 'Processing partner comparison...', 'info');
      addComparisonLog(type, `Comparing ${oldData.length} old entries with ${newData.length} new entries`, 'info');
      
      const comparison = compareCSVData(oldData, newData, type);
      
      addComparisonLog(type, `Found ${comparison.added.length} added partners`, 'success');
      addComparisonLog(type, `Found ${comparison.removed.length} removed partners`, 'success');
      addComparisonLog(type, `Total unique partners in new data: ${Object.keys(comparison.counts).length}`, 'success');
      addComparisonLog(type, 'Comparison completed successfully!', 'success');
      
      setComparisonResults(prev => ({
        ...prev,
        [type]: comparison
      }));

      if (onComparisonComplete) {
        onComparisonComplete(type, comparison);
      }
    } catch (error) {
      console.error('Comparison error:', error);
      addComparisonLog(type, `Comparison failed: ${error.message}`, 'error');
      alert('Error performing comparison. Please check your CSV data format.');
    }
  };

  const removeFile = (type, timeframe) => {
    const fileKey = `${type}_${timeframe}`;
    const removedFile = uploadedFiles[type][timeframe];
    
    if (removedFile) {
      addComparisonLog(type, `Removed file: ${removedFile.file.name}`, 'info');
    }
    
    setUploadedFiles(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [timeframe]: null
      }
    }));

    delete validationResults[`${type}_${timeframe}`];
    setValidationResults({...validationResults});

    // Clear comparison if exists
    if (comparisonResults[type]) {
      const newResults = {...comparisonResults};
      delete newResults[type];
      setComparisonResults(newResults);
      addComparisonLog(type, 'Comparison results cleared', 'info');
    }

    // Reset file input
    if (fileInputRefs[fileKey] && fileInputRefs[fileKey].current) {
      fileInputRefs[fileKey].current.value = '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FiCheckCircle className="text-success" />;
      case 'warning':
        return <FiAlertCircle className="text-warning" />;
      case 'error':
        return <FiAlertCircle className="text-danger" />;
      default:
        return null;
    }
  };

  const getStatusMessage = (result) => {
    if (result.status === 'success') {
      return 'File validated successfully!';
    } else if (result.status === 'warning') {
      return 'File uploaded with warnings - comparison can proceed';
    } else {
      return 'File has errors - please fix before proceeding';
    }
  };

  const getLogIcon = (level) => {
    switch (level) {
      case 'success':
        return <FiCheckCircle className="text-success" size={12} />;
      case 'warning':
        return <FiAlertCircle className="text-warning" size={12} />;
      case 'error':
        return <FiAlertCircle className="text-danger" size={12} />;
      default:
        return <MdInfo className="text-info" size={12} />;
    }
  };

  const renderFileStatus = (type, timeframe) => {
    const uploadedFile = uploadedFiles[type][timeframe];
    const label = timeframe === 'old' ? 'Previous' : 'Current';
    
    return (
      <div className="file-status-section">
        <div className="file-status-header">
          <h6>{label} {type} File</h6>
        </div>
        
        {uploadedFile ? (
          <div className="file-info-card">
            <div className="file-info-header">
              <FiFile className="file-icon" />
              <div className="file-details">
                <span className="file-name" title={uploadedFile.file.name}>
                  {uploadedFile.file.name}
                </span>
                <small className="file-size">
                  {(uploadedFile.file.size / 1024).toFixed(1)} KB • {uploadedFile.rowCount} rows
                </small>
              </div>
              <div className="file-status">
                {getStatusIcon(uploadedFile.status)}
              </div>
              <button 
                className="btn btn-sm btn-outline-danger remove-btn"
                onClick={() => removeFile(type, timeframe)}
                title="Remove file"
              >
                <FiX size={14} />
              </button>
            </div>
            
            <div className="file-status-message">
              <small className={`text-${uploadedFile.status === 'success' ? 'success' : uploadedFile.status === 'warning' ? 'warning' : 'danger'}`}>
                {getStatusMessage(uploadedFile)}
              </small>
            </div>
          </div>
        ) : (
          <div className="file-placeholder">
            <small className="text-muted">No file selected</small>
          </div>
        )}
      </div>
    );
  };

  const renderFileUpload = (type, timeframe, label) => {
    const fileKey = `${type}_${timeframe}`;
    const uploadedFile = uploadedFiles[type][timeframe];
    
    return (
      <div className="upload-section">
        <h6>{label}</h6>
        
        <input
          ref={fileInputRefs[fileKey]}
          type="file"
          accept=".csv"
          onChange={(e) => handleFileSelect(type, timeframe, e)}
          style={{ display: 'none' }}
        />
        
        <div 
          className="upload-zone"
          onClick={() => fileInputRefs[fileKey].current?.click()}
        >
          <FiUpload size={20} className="upload-icon" />
          <p className="upload-text">
            {uploadedFile ? 'Click to change file' : `Click to select ${label}`}
          </p>
          <small className="text-muted">CSV files only</small>
        </div>
        
        {uploadedFile && uploadedFile.errors && uploadedFile.errors.length > 0 && (
          <div className="validation-errors mt-2">
            <small className="text-danger">Issues found:</small>
            <ul className="error-list">
              {uploadedFile.errors.slice(0, 3).map((error, i) => (
                <li key={i}><small>{error}</small></li>
              ))}
              {uploadedFile.errors.length > 3 && (
                <li><small>... and {uploadedFile.errors.length - 3} more</small></li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderComparisonLogs = (type) => {
    const logs = comparisonLogs[type] || [];
    if (logs.length === 0) return null;

    return (
      <div className="comparison-logs">
        <div className="logs-header">
          <h6>Process Log</h6>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => clearComparisonLogs(type)}
          >
            Clear
          </button>
        </div>
        <div className="logs-container">
          {logs.map((log, index) => (
            <div key={index} className={`log-entry log-${log.level}`}>
              <span className="log-icon">{getLogIcon(log.level)}</span>
              <span className="log-timestamp">{log.timestamp}</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderComparison = (type) => {
    const comparison = comparisonResults[type];
    if (!comparison) return null;

    // Calculate unique partners for summary
    const addedPartners = new Set(comparison.added.map(listing => listing.partnerInfo.identifier));
    const removedPartners = new Set(comparison.removed.map(listing => listing.partnerInfo.identifier));

    return (
        <div className="comparison-results">
        <div className="comparison-header">
            <MdCompareArrows size={24} className="text-primary" />
            <h6>Comparison Results for {type}</h6>
        </div>
        
        <div className="comparison-summary">
            <div className="summary-cards">
            <div className="summary-card">
                <div className="card-value">{comparison.summary.oldTotal}</div>
                <div className="card-label">Previous Listings</div>
            </div>
            <div className="summary-card">
                <div className="card-value">{comparison.summary.newTotal}</div>
                <div className="card-label">Current Listings</div>
            </div>
            <div className="summary-card difference">
                <div className="card-value">
                {comparison.summary.difference >= 0 ? '+' : ''}{comparison.summary.difference}
                </div>
                <div className="card-label">Listings Difference</div>
            </div>
            <div className="summary-card">
                <div className="card-value">{Object.keys(comparison.counts).length}</div>
                <div className="card-label">Current Partners</div>
            </div>
            <div className="summary-card added">
                <div className="card-value">+{addedPartners.size}</div>
                <div className="card-label">New Partners</div>
            </div>
            <div className="summary-card removed">
                <div className="card-value">-{removedPartners.size}</div>
                <div className="card-label">Removed Partners</div>
            </div>
            </div>
        </div>

        <div className="comparison-details">
            <div className="row">
            <div className="col-md-6">
                <div className="detail-card added">
                <h6>New Partners ({addedPartners.size} partners, {comparison.added.length} listings)</h6>
                {comparison.added.length > 0 ? (
                    <div className="partner-list">
                    {/* Group by partner */}
                    {Array.from(addedPartners).slice(0, 5).map((partnerKey, index) => {
                        const partnerListings = comparison.added.filter(listing => listing.partnerInfo.identifier === partnerKey);
                        const firstListing = partnerListings[0];
                        
                        return (
                        <div key={index} className="partner-item">
                            <strong>{firstListing.partnerInfo.name}</strong><br/>
                            <small>{firstListing['Partner Contact Card']}</small><br/>
                            <small className="text-success">{partnerListings.length} listings</small><br/>
                            <small className="text-muted">
                            {[...new Set(partnerListings.map(l => l['SH_Destination']))].join(', ')}
                            </small>
                        </div>
                        );
                    })}
                    {addedPartners.size > 5 && (
                        <small className="text-muted">... and {addedPartners.size - 5} more new partners</small>
                    )}
                    </div>
                ) : (
                    <p className="text-muted">No new partners added</p>
                )}
                </div>
            </div>
            
            <div className="col-md-6">
                <div className="detail-card removed">
                <h6>Removed Partners ({removedPartners.size} partners, {comparison.removed.length} listings)</h6>
                {comparison.removed.length > 0 ? (
                    <div className="partner-list">
                    {/* Group by partner */}
                    {Array.from(removedPartners).slice(0, 5).map((partnerKey, index) => {
                        const partnerListings = comparison.removed.filter(listing => listing.partnerInfo.identifier === partnerKey);
                        const firstListing = partnerListings[0];
                        
                        return (
                        <div key={index} className="partner-item">
                            <strong>{firstListing.partnerInfo.name}</strong><br/>
                            <small>{firstListing['Partner Contact Card']}</small><br/>
                            <small className="text-danger">{partnerListings.length} listings</small><br/>
                            <small className="text-muted">
                            {[...new Set(partnerListings.map(l => l['SH_Destination']))].join(', ')}
                            </small>
                        </div>
                        );
                    })}
                    {removedPartners.size > 5 && (
                        <small className="text-muted">... and {removedPartners.size - 5} more removed partners</small>
                    )}
                    </div>
                ) : (
                    <p className="text-muted">No partners removed</p>
                )}
                </div>
            </div>
            </div>
            
            <div className="row mt-3">
            <div className="col-12">
                <div className="detail-card counts">
                <h6>Partner Listing Counts (Current Data)</h6>
                <div className="counts-list">
                    {Object.values(comparison.counts)
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 15)
                    .map((partner, index) => (
                        <div key={index} className="count-item">
                        <div className="partner-info">
                            <span className="partner-name">{partner.partnerInfo.name}</span>
                            <span className="partner-contact">{partner.properties[0]['Partner Contact Card']}</span>
                            <small className="destinations">
                            {[...new Set(partner.properties.map(p => p['SH_Destination']))].join(', ')}
                            </small>
                        </div>
                        <span className="count-badge">{partner.count} listings</span>
                        </div>
                    ))}
                </div>
                
                {Object.keys(comparison.counts).length > 15 && (
                    <div className="mt-2 text-center">
                    <small className="text-muted">
                        Showing top 15 of {Object.keys(comparison.counts).length} partners
                    </small>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>

        <div className="export-actions">
            <Button
            variant="outline-primary"
            text="Export All Results"
            onClick={() => exportComparisonAsCSV(comparison, type)}
            className="me-2"
            />
            <small className="text-muted">
            Exports: New/Removed partner listings, Partner counts, and Summary report
            </small>
        </div>
        </div>
    );
    };

  return (
    <div className="csv-comparison-container">
      {/* Template Downloads */}
      <div className="template-section">
        <h5>CSV Templates</h5>
        <div className="template-buttons">
          <Button
            variant="outline-primary"
            text="Download HO Template"
            icon={<FiDownload className="me-1" />}
            onClick={() => downloadCSVTemplate('HO')}
            className="me-2"
          />
          <Button
            variant="outline-secondary"
            text="Download PM Template"
            icon={<FiDownload className="me-1" />}
            onClick={() => downloadCSVTemplate('PM')}
          />
        </div>
        <small className="text-muted mt-2 d-block">
          <strong>Note:</strong> Partner Contact Card can be a name or email. 
          Last Pricing Done accepts DD/MM/YYYY, DD-MM-YYYY, or YYYY-MM-DD formats.
        </small>
      </div>

      {/* Tabs */}
      <div className="csv-tabs">
        <button 
          className={`tab-button ${activeTab === 'HO' ? 'active' : ''}`}
          onClick={() => setActiveTab('HO')}
        >
          House Owner (HO) Comparison
        </button>
        <button 
          className={`tab-button ${activeTab === 'PM' ? 'active' : ''}`}
          onClick={() => setActiveTab('PM')}
        >
          Property Manager (PM) Comparison
        </button>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner-border spinner-border-sm me-2" />
          Processing CSV file...
        </div>
      )}

      {/* Upload Sections */}
      <div className="tab-content">
        <div className={`tab-pane ${activeTab === 'HO' ? 'active' : ''}`}>
          {/* File Status Display */}
          <div className="file-status-grid">
            {renderFileStatus('HO', 'old')}
            {renderFileStatus('HO', 'new')}
          </div>
          
          {/* Upload Areas */}
          <div className="upload-grid">
            <div className="upload-column">
              {renderFileUpload('HO', 'old', 'Previous HO CSV (Older Date)')}
            </div>
            <div className="upload-column">
              {renderFileUpload('HO', 'new', 'Current HO CSV (Newer Date)')}
            </div>
          </div>
          
          {/* Comparison Logs */}
          {renderComparisonLogs('HO')}
          
          {/* Comparison Results */}
          {renderComparison('HO')}
        </div>
        
        <div className={`tab-pane ${activeTab === 'PM' ? 'active' : ''}`}>
          {/* File Status Display */}
          <div className="file-status-grid">
            {renderFileStatus('PM', 'old')}
            {renderFileStatus('PM', 'new')}
          </div>
          
          {/* Upload Areas */}
          <div className="upload-grid">
            <div className="upload-column">
              {renderFileUpload('PM', 'old', 'Previous PM CSV (Older Date)')}
            </div>
            <div className="upload-column">
              {renderFileUpload('PM', 'new', 'Current PM CSV (Newer Date)')}
            </div>
          </div>
          
          {/* Comparison Logs */}
          {renderComparisonLogs('PM')}
          
          {/* Comparison Results */}
          {renderComparison('PM')}
        </div>
      </div>
    </div>
  );
};

export default CSVUpload;