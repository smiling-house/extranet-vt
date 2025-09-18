import Papa from 'papaparse';

// CSV Templates for different types
export const CSV_TEMPLATES = {
  HO: {
    name: 'House Owner (HO)',
    headers: [
      'SH_Destination',
      'SH_Region', 
      'Partner Contact Card',
    //   'Count',
      'Signed Agreement',
      'Last Pricing Done',
      'Property Link',
      'iCal',
      'SH Link'
    ],
    sampleData: [{
      'SH_Destination': 'Paris',
      'SH_Region': 'Ile-de-France',
      'Partner Contact Card': 'John Doe Properties',
    //   'Count': '3',
      'Signed Agreement': 'Yes',
      'Last Pricing Done': '15/01/2024',
      'Property Link': 'https://example.com/property1',
      'iCal': 'https://calendar.example.com/ical1',
      'SH Link': 'https://sh.example.com/listing1'
    }]
  },
  PM: {
    name: 'Property Manager (PM)',
    headers: [
      'SH_Destination',
      'SH_Region',
      'Partner Contact Card', 
      'Signed Agreement',
      'Last Pricing Done',
      'Property Link',
      'iCal',
      'SH Link'
    ],
    sampleData: [{
      'SH_Destination': 'London',
      'SH_Region': 'Greater London',
      'Partner Contact Card': 'jane.smith@example.com',
      'Signed Agreement': 'No',
      'Last Pricing Done': '20-01-2024',
      'Property Link': 'https://example.com/property2',
      'iCal': 'https://calendar.example.com/ical2',
      'SH Link': 'https://sh.example.com/listing2'
    }]
  }
};

// Download CSV template
export const downloadCSVTemplate = (type = 'HO') => {
  const template = CSV_TEMPLATES[type];
  const csvContent = Papa.unparse({
    fields: template.headers,
    data: template.sampleData
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${type}_template_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Parse CSV file
export const parseCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(results.errors);
        } else {
          resolve(results.data);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// Normalize date format - accepts dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd
const normalizeDateFormat = (dateString) => {
  if (!dateString || dateString.trim() === '') return '';
  
  const trimmed = dateString.trim();
  
  // Handle dd/mm/yyyy or dd-mm-yyyy format
  const ddmmyyyyRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/;
  const ddmmMatch = trimmed.match(ddmmyyyyRegex);
  
  if (ddmmMatch) {
    const [, day, month, year] = ddmmMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  // Handle yyyy-mm-dd format (already normalized)
  const yyyymmddRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (yyyymmddRegex.test(trimmed)) {
    return trimmed;
  }
  
  return trimmed; // Return as is if format not recognized
};

// Validate CSV data based on type
export const validateCSVData = (data, type) => {
  const errors = [];
  const template = CSV_TEMPLATES[type];
  const requiredFields = ['SH_Destination', 'SH_Region', 'Partner Contact Card'];
  
  // Check if file has correct headers
  if (data.length > 0) {
    const fileHeaders = Object.keys(data[0]);
    const missingHeaders = template.headers.filter(header => !fileHeaders.includes(header));
    
    if (missingHeaders.length > 0) {
      errors.push(`Missing required columns: ${missingHeaders.join(', ')}`);
      return errors; // Return early if headers are missing
    }
    
    // Check for extra headers that shouldn't be there
    const extraHeaders = fileHeaders.filter(header => !template.headers.includes(header));
    if (extraHeaders.length > 0) {
      errors.push(`Unexpected columns found: ${extraHeaders.join(', ')}. Please use only the template columns.`);
    }
  }
  
  // Validate required fields
//   data.forEach((row, index) => {
//     requiredFields.forEach(field => {
//       if (!row[field] || row[field].trim() === '') {
//         errors.push(`Row ${index + 2}: Missing required field "${field}"`); // +2 because header is row 1
//       }
//     });
    
//     // Validate Count field for HO type (should be a positive number)
//     if (type === 'HO' && row['Count']) {
//       const count = parseInt(row['Count']);
//       if (isNaN(count) || count < 1) {
//         errors.push(`Row ${index + 2}: Count must be a positive number`);
//       }
//     }
    
//     // Validate Date format (flexible validation)
//     if (row['Last Pricing Done'] && row['Last Pricing Done'].trim() !== '') {
//       const normalizedDate = normalizeDateFormat(row['Last Pricing Done']);
//       const validDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      
//       if (!validDateRegex.test(normalizedDate)) {
//         errors.push(`Row ${index + 2}: Last Pricing Done must be in DD/MM/YYYY, DD-MM-YYYY, or YYYY-MM-DD format`);
//       } else {
//         // Check if it's a valid date
//         const date = new Date(normalizedDate);
//         if (isNaN(date.getTime())) {
//           errors.push(`Row ${index + 2}: Last Pricing Done contains an invalid date`);
//         }
//       }
//     }
//   });
  
  return errors;
};

// Extract partner information from contact card (simplified)
export const extractPartnerInfo = (contactCard) => {
  if (!contactCard) return { name: '', identifier: '' };
  
  const trimmed = contactCard.trim();
  
  // Check if it looks like an email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) {
    return { 
      name: trimmed.split('@')[0], // Use part before @ as name
      identifier: trimmed.toLowerCase() // Use full email as identifier
    };
  }
  
  // Otherwise treat as name
  return { 
    name: trimmed,
    identifier: trimmed.toLowerCase().replace(/\s+/g, '_') // Create identifier from name
  };
};

// Compare two CSV datasets
export const compareCSVData = (oldData, newData, type) => {
  const comparison = {
    added: [],
    removed: [],
    counts: {},
    summary: {
      oldTotal: oldData.length,
      newTotal: newData.length,
      difference: newData.length - oldData.length
    }
  };
  
  // Extract all partners from old data
  const oldPartners = new Set();
  const oldPartnersData = new Map();
  
  oldData.forEach(row => {
    const partnerInfo = extractPartnerInfo(row['Partner Contact Card']);
    const partnerKey = partnerInfo.identifier;
    
    oldPartners.add(partnerKey);
    
    // Store partner data for reference
    if (!oldPartnersData.has(partnerKey)) {
      oldPartnersData.set(partnerKey, {
        partnerInfo,
        listings: []
      });
    }
    oldPartnersData.get(partnerKey).listings.push({
      ...row,
      'Last Pricing Done': normalizeDateFormat(row['Last Pricing Done'])
    });
  });
  
  // Extract all partners from new data and count their listings
  const newPartners = new Set();
  const newPartnersData = new Map();
  
  newData.forEach(row => {
    const partnerInfo = extractPartnerInfo(row['Partner Contact Card']);
    const partnerKey = partnerInfo.identifier;
    
    newPartners.add(partnerKey);
    
    // Store partner data and count listings
    if (!newPartnersData.has(partnerKey)) {
      newPartnersData.set(partnerKey, {
        partnerInfo,
        listings: []
      });
    }
    newPartnersData.get(partnerKey).listings.push({
      ...row,
      'Last Pricing Done': normalizeDateFormat(row['Last Pricing Done'])
    });
  });
  
  // Create counts from new data (number of listings per partner)
  newPartnersData.forEach((partnerData, partnerKey) => {
    comparison.counts[partnerKey] = {
      partnerInfo: partnerData.partnerInfo,
      count: partnerData.listings.length,
      properties: partnerData.listings
    };
  });
  
  // Find added partners (partners that exist in new data but not in old data)
  newPartners.forEach(partnerKey => {
    if (!oldPartners.has(partnerKey)) {
      const partnerData = newPartnersData.get(partnerKey);
      // Add all listings of this new partner to added array
      partnerData.listings.forEach(listing => {
        comparison.added.push({
          ...listing,
          partnerInfo: partnerData.partnerInfo,
          key: partnerKey
        });
      });
    }
  });
  
  // Find removed partners (partners that exist in old data but not in new data)
  oldPartners.forEach(partnerKey => {
    if (!newPartners.has(partnerKey)) {
      const partnerData = oldPartnersData.get(partnerKey);
      // Add all listings of this removed partner to removed array
      partnerData.listings.forEach(listing => {
        comparison.removed.push({
          ...listing,
          partnerInfo: partnerData.partnerInfo,
          key: partnerKey
        });
      });
    }
  });
  
  return comparison;
};

// Export comparison results as CSV
export const exportComparisonAsCSV = (comparison, type) => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Export added partners (all listings from new partners)
  if (comparison.added.length > 0) {
    const addedData = comparison.added.map(listing => {
      const exportRow = { ...listing };
      delete exportRow.partnerInfo;
      delete exportRow.key;
      exportRow.Status = 'NEW_PARTNER';
      return exportRow;
    });
    
    const addedCSV = Papa.unparse({
      fields: CSV_TEMPLATES[type].headers.concat(['Status']),
      data: addedData
    });
    
    downloadBlob(addedCSV, `${type}_new_partners_listings_${timestamp}.csv`);
  }
  
  // Export removed partners (all listings from removed partners)
  if (comparison.removed.length > 0) {
    const removedData = comparison.removed.map(listing => {
      const exportRow = { ...listing };
      delete exportRow.partnerInfo;
      delete exportRow.key;
      exportRow.Status = 'REMOVED_PARTNER';
      return exportRow;
    });
    
    const removedCSV = Papa.unparse({
      fields: CSV_TEMPLATES[type].headers.concat(['Status']),
      data: removedData
    });
    
    downloadBlob(removedCSV, `${type}_removed_partners_listings_${timestamp}.csv`);
  }
  
  // Export partner listing counts (from new data only)
  const countsData = Object.values(comparison.counts)
    .sort((a, b) => b.count - a.count)
    .map(partner => ({
      'Partner Name': partner.partnerInfo.name,
      'Partner Contact Card': partner.properties[0]['Partner Contact Card'],
      'Listing Count': partner.count,
      'Destinations': [...new Set(partner.properties.map(p => p['SH_Destination']))].join('; '),
      'Regions': [...new Set(partner.properties.map(p => p['SH_Region']))].join('; '),
      'Sample Property Link': partner.properties[0]['Property Link'] || 'N/A',
      'Last Pricing Done': partner.properties[0]['Last Pricing Done'] || 'N/A'
    }));
  
  const countsCSV = Papa.unparse({
    fields: ['Partner Name', 'Partner Contact Card', 'Listing Count', 'Destinations', 'Regions', 'Sample Property Link', 'Last Pricing Done'],
    data: countsData
  });
  
  downloadBlob(countsCSV, `${type}_partner_listing_counts_${timestamp}.csv`);
  
  // Export summary report
  const addedPartners = new Set(comparison.added.map(listing => listing.partnerInfo.identifier));
  const removedPartners = new Set(comparison.removed.map(listing => listing.partnerInfo.identifier));
  
  const summaryData = [{
    'Report Type': `${type} Partner Comparison Summary`,
    'Previous Total Listings': comparison.summary.oldTotal,
    'Current Total Listings': comparison.summary.newTotal,
    'Listings Difference': comparison.summary.difference,
    'Current Total Partners': Object.keys(comparison.counts).length,
    'New Partners Added': addedPartners.size,
    'Partners Removed': removedPartners.size,
    'New Partner Listings': comparison.added.length,
    'Removed Partner Listings': comparison.removed.length,
    'Generated Date': new Date().toLocaleDateString()
  }];
  
  const summaryCSV = Papa.unparse({
    fields: ['Report Type', 'Previous Total Listings', 'Current Total Listings', 'Listings Difference', 
             'Current Total Partners', 'New Partners Added', 'Partners Removed',
             'New Partner Listings', 'Removed Partner Listings', 'Generated Date'],
    data: summaryData
  });
  
  downloadBlob(summaryCSV, `${type}_comparison_summary_${timestamp}.csv`);
};

// Helper function to download blob
const downloadBlob = (content, filename) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};