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
  
  return lines.slice(1)
    .map(line => {
      const values = line.split(delimiter);
      const entry = {};
      
      headers.forEach((header, index) => {
        if (index < values.length) {
          entry[header.trim()] = values[index]?.trim() || '';
        }
      });
      
      return entry;
    })
    .filter(entry => {
      // Filter out empty entries or header repeats
      return Object.values(entry).some(val => val !== '' && val !== 'Symbol Type' && val !== 'Exit Price');
    });
};
