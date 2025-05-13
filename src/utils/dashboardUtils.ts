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
  // Split by newlines and filter out empty lines
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) return [];
  
  // Identify delimiter (comma or tab)
  const delimiter = lines[0].includes(',') ? ',' : '\t';
  
  // Handle headers - first row contains column names
  const headers = lines[0].split(delimiter).map(header => header.trim());
  
  console.log("CSV Headers detected:", headers);
  
  // Process the data rows
  const parsedData = lines.slice(1)
    .map(line => {
      const values = line.split(delimiter);
      const entry: Record<string, string> = {}; 
      
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
      const isNotHeader = !Object.keys(entry).some(key => 
        key.toLowerCase() === 'uid' || 
        key.toLowerCase() === 'contracts'
      );
      return hasContent && isNotHeader;
    });
  
  // Map column names for consistent access
  return parsedData.map(entry => {
    const processedEntry: Record<string, string> = {...entry};
    
    // Common mappings based on the CSV format shown in the image
    if ('Contract' in processedEntry && !('Symbol' in processedEntry)) {
      processedEntry['Symbol'] = processedEntry['Contract'];
    } else if ('Contracts' in processedEntry && !('Symbol' in processedEntry)) {
      processedEntry['Symbol'] = processedEntry['Contracts'];
    }
    
    if ('Direction' in processedEntry && !('Side' in processedEntry)) {
      processedEntry['Side'] = processedEntry['Direction'];
    } else if ('Closing Direction' in processedEntry && !('Side' in processedEntry)) {
      processedEntry['Side'] = processedEntry['Closing Direction'];
    }
    
    if ('Qty' in processedEntry && !('Size' in processedEntry)) {
      processedEntry['Size'] = processedEntry['Qty'];
      processedEntry['Quantity'] = processedEntry['Qty'];
    }
    
    if ('Closed P&L' in processedEntry && !('PnL' in processedEntry)) {
      processedEntry['PnL'] = processedEntry['Closed P&L'];
    }
    
    if ('Trade Time(UTC)' in processedEntry && !('Trade Time' in processedEntry)) {
      processedEntry['Trade Time'] = processedEntry['Trade Time(UTC)'];
    }
    
    console.log("Processed entry:", processedEntry);
    
    return processedEntry;
  });
};

// Function to extract clean symbol from potentially complex format
export const extractCleanSymbol = (symbolText: string): string => {
  if (!symbolText) return 'Unknown';
  
  // Remove common suffixes and prefixes
  let cleaned = symbolText.trim();
  
  // For crypto symbols like BTCUSDT, extract the base symbol
  const commonSuffixes = ['USDT', 'USD', 'BUSD', 'USDC', 'PERP'];
  
  for (const suffix of commonSuffixes) {
    if (cleaned.endsWith(suffix)) {
      cleaned = cleaned.slice(0, -suffix.length);
      break;
    }
  }
  
  // Handle special case for perpetual futures naming
  if (cleaned === 'AR' || cleaned === '1000PEPE') {
    return cleaned;
  }
  
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
