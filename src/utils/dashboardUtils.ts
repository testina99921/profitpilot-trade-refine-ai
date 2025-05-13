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
  console.log("Parsing CSV data:", text.substring(0, 200) + "...");
  
  // Remove any UTF-8 BOM and split by newlines
  const cleanText = text.replace(/^\uFEFF/, '');
  const lines = cleanText.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) return [];
  
  // Skip any non-header rows at the beginning (like UID: 8155223)
  let startIndex = 0;
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    if (lines[i].includes('Contracts') && 
        lines[i].includes('Direction') && 
        lines[i].includes('Price')) {
      startIndex = i;
      break;
    } else if (lines[i].includes('UID:')) {
      // Skip this line but don't set it as the header row
      continue;
    }
  }
  
  // Identify delimiter (tab, comma, or multiple spaces)
  let delimiter = '\t';
  const firstLine = lines[startIndex];
  if (firstLine.includes(',') && !firstLine.includes('\t')) {
    delimiter = ',';
  } else if (!firstLine.includes('\t') && /\s{2,}/.test(firstLine)) {
    // If no tabs but has multiple consecutive spaces, split by multiple spaces
    const headers = firstLine.trim().split(/\s{2,}/).map(h => h.trim());
    
    // Process the data rows with space delimiter
    const parsedData = lines.slice(startIndex + 1)
      .map(line => {
        // Split by position based on headers
        const entry: Record<string, string> = {};
        let currentPos = 0;
        
        headers.forEach(header => {
          const nextHeaderPos = line.indexOf('  ', currentPos);
          if (nextHeaderPos === -1) {
            entry[header] = line.substring(currentPos).trim();
          } else {
            entry[header] = line.substring(currentPos, nextHeaderPos).trim();
            currentPos = nextHeaderPos + 2;
          }
        });
        
        return entry;
      });
    
    // Map column names and process the data
    return processTradeData(parsedData);
  }
  
  // Use the detected delimiter to split headers
  const headers = lines[startIndex].split(delimiter).map(header => header.trim());
  console.log("CSV Headers detected:", headers);
  
  // Process the data rows
  const parsedData = lines.slice(startIndex + 1)
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
        key.toLowerCase() === 'contracts' && 
        Object.values(entry).some(val => val.toLowerCase() === 'contracts')
      );
      return hasContent && isNotHeader;
    });
  
  // Map column names and process the data
  return processTradeData(parsedData);
};

// Process and standardize the trade data
const processTradeData = (rawData: Record<string, string>[]) => {
  console.log("Processing trade data, first entry:", rawData[0]);
  
  return rawData.map(entry => {
    const processedEntry: Record<string, string> = {...entry};
    
    // Standard column name mapping for consistency
    const columnMappings: Record<string, string[]> = {
      'Symbol': ['Contract', 'Contracts', 'Symbol', 'Ticker', 'Pair'],
      'Side': ['Direction', 'Closing Direction', 'Side', 'Buy/Sell', 'Trade Direction'],
      'Size': ['Qty', 'Quantity', 'Size', 'Amount', 'Volume'],
      'EntryPrice': ['Entry Price', 'EntryPrice', 'Open', 'Open Price'],
      'ExitPrice': ['Exit Price', 'ExitPrice', 'Close', 'Close Price'],
      'PnL': ['Closed P&L', 'P&L', 'PnL', 'Profit/Loss', 'Realized PnL'],
      'TradeTime': ['Trade Time(UTC+0)', 'Trade Time', 'Time', 'Date', 'Create Time'],
      'Type': ['Exit Type', 'Type', 'Order Type', 'Symbol Type']
    };
    
    // Apply the mappings - for each standard field, look for any matching column
    Object.entries(columnMappings).forEach(([standardKey, possibleKeys]) => {
      // Find the first matching key in the entry
      const matchingKey = possibleKeys.find(key => key in processedEntry);
      if (matchingKey) {
        processedEntry[standardKey] = processedEntry[matchingKey];
      }
    });
    
    // Ensure Symbol is available (extremely important for later calculations)
    if (!('Symbol' in processedEntry) && 'Contracts' in processedEntry) {
      processedEntry['Symbol'] = processedEntry['Contracts'];
    }
    
    // Ensure Side is properly mapped
    if ('Closing Direction' in processedEntry && !('Side' in processedEntry)) {
      processedEntry['Side'] = processedEntry['Closing Direction'];
    }
    
    // Properly format PnL value
    if ('PnL' in processedEntry || 'Closed P&L' in processedEntry) {
      const pnlKey = 'PnL' in processedEntry ? 'PnL' : 'Closed P&L';
      const pnlValue = parseFloat(processedEntry[pnlKey].replace(/[^\d.-]/g, ''));
      if (!isNaN(pnlValue)) {
        processedEntry['PnL'] = pnlValue.toString();
      }
    }
    
    console.log("Processed trade entry:", processedEntry);
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
