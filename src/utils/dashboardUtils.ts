
import { UserPlan } from "../types/dashboard";

// Get available date ranges based on plan
export const getAvailableDateRanges = (userPlan: UserPlan) => {
  switch(userPlan) {
    case "elite":
      return [
        { value: "7d", label: "Last 7 days" },
        { value: "30d", label: "Last 30 days" },
        { value: "90d", label: "Last 90 days" },
        { value: "180d", label: "Last 180 days" },
        { value: "1y", label: "Last year" },
        { value: "all", label: "All time" }
      ];
    case "advanced":
      return [
        { value: "7d", label: "Last 7 days" },
        { value: "30d", label: "Last 30 days" },
        { value: "90d", label: "Last 90 days" }
      ];
    case "pro":
      return [
        { value: "7d", label: "Last 7 days" },
        { value: "30d", label: "Last 30 days" }
      ];
    case "free":
    default:
      return [
        { value: "7d", label: "Last 7 days" }
      ];
  }
};

// Function to check if feature is available in current plan
export const isFeatureAvailable = (feature: string, userPlan: UserPlan): boolean => {
  if (feature === "risk-patterns") {
    return userPlan === "pro" || userPlan === "advanced" || userPlan === "elite";
  }
  else if (feature === "risk-mapping") {
    return userPlan === "advanced" || userPlan === "elite";
  }
  else if (feature === "real-time-alerts") {
    return userPlan === "elite";
  }
  return true;
};

// Enhanced CSV parser with better handling of exchange data formats
export const parseCSV = (text: string) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) return [];
  
  // Identify delimiter (comma or tab)
  const delimiter = lines[0].includes(',') ? ',' : '\t';
  const headers = lines[0].split(delimiter).map(header => header.trim());
  
  console.log("CSV Headers detected:", headers);
  
  // Process the data rows
  const parsedData = lines.slice(1)
    .map(line => {
      const values = line.split(delimiter);
      const entry: Record<string, string> = {}; // Define entry as a Record<string, string> to allow any string keys
      
      headers.forEach((header, index) => {
        if (index < values.length) {
          entry[header.trim()] = values[index]?.trim() || '';
        }
      });
      
      return entry;
    })
    .filter(entry => {
      // Filter out empty entries or header repeats
      const hasContent = Object.values(entry).some(val => val !== '');
      const isNotHeader = Object.keys(entry).some(key => 
        key !== 'Symbol Type' && 
        key !== 'Exit Price' && 
        key !== 'Contract' &&
        key !== 'Direction' &&
        key !== 'Quantity'
      );
      return hasContent && isNotHeader;
    });
  
  // Clean up and standardize column names
  return parsedData.map(entry => {
    const processedEntry: Record<string, string> = {...entry};
    
    // Handle Contract/Symbol field
    if ('Contract' in processedEntry && !('Symbol' in processedEntry)) {
      processedEntry['Symbol'] = processedEntry['Contract'];
    } else if ('Symbol' in processedEntry && !('Contract' in processedEntry)) {
      processedEntry['Contract'] = processedEntry['Symbol'];
    }
    
    // Handle Direction/Side field
    if ('Direction' in processedEntry && !('Side' in processedEntry)) {
      processedEntry['Side'] = processedEntry['Direction'];
    } else if ('Side' in processedEntry && !('Direction' in processedEntry)) {
      processedEntry['Direction'] = processedEntry['Side'];
    }
    
    // Handle Quantity/Size field
    if ('Quantity' in processedEntry && !('Size' in processedEntry)) {
      processedEntry['Size'] = processedEntry['Quantity'];
    } else if ('Size' in processedEntry && !('Quantity' in processedEntry)) {
      processedEntry['Quantity'] = processedEntry['Size'];
    }
    
    // Clean up symbol format if it contains commas
    if (processedEntry['Symbol'] && processedEntry['Symbol'].includes(',')) {
      const parts = processedEntry['Symbol'].split(',');
      processedEntry['Symbol'] = parts[0]; // Keep only the ticker part
      
      // If we have side information in the symbol field, extract it
      if (parts.length > 1 && !processedEntry['Side']) {
        processedEntry['Side'] = parts[1];
      }
    }
    
    return processedEntry;
  });
};

// Function to extract clean symbol from potentially complex format
export const extractCleanSymbol = (symbolText: string): string => {
  if (!symbolText) return 'Unknown';
  
  // Remove common suffixes and prefixes
  let cleaned = symbolText.trim();
  
  // If it contains comma, take first part (e.g., "BTCUSDT,sell" -> "BTCUSDT")
  if (cleaned.includes(',')) {
    cleaned = cleaned.split(',')[0];
  }
  
  // Extract the base symbol from pairs like BTCUSDT -> BTC
  const commonPairs = ['USDT', 'USD', 'BTC', 'ETH', 'BUSD', 'USDC'];
  for (const pair of commonPairs) {
    if (cleaned.endsWith(pair)) {
      cleaned = cleaned.slice(0, -pair.length);
      break;
    }
  }
  
  // Make it more readable for UI display
  if (cleaned === 'AR') return 'AR';
  
  return cleaned || 'Unknown';
};

// Function to extract numeric values safely from various formats
export const extractNumericValue = (value: any): number => {
  if (value === undefined || value === null) return NaN;
  
  // If already a number
  if (typeof value === 'number') return value;
  
  const stringValue = String(value).trim();
  
  // Remove common currency symbols and thousand separators
  const cleanedValue = stringValue
    .replace(/[$£€,]/g, '')
    .replace(/^\+/, ''); // Remove leading + sign
  
  // Check if it's a negative value with parentheses like (123.45)
  if (/^\(.*\)$/.test(cleanedValue)) {
    return -parseFloat(cleanedValue.replace(/[()]/g, ''));
  }
  
  return parseFloat(cleanedValue);
};
