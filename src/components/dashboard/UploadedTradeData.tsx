import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeDataEntry, UserPlan } from '@/types/dashboard';
import { ArrowUpRight } from 'lucide-react';
import { extractCleanSymbol, extractNumericValue } from '@/utils/dashboardUtils';

interface UploadedTradeDataProps {
  tradeData: TradeDataEntry[];
  hasUploadedData: boolean;
  totalTrades?: number;
  displayedTrades?: number;
  userPlan?: UserPlan;
}

const UploadedTradeData: React.FC<UploadedTradeDataProps> = ({ 
  tradeData, 
  hasUploadedData,
  totalTrades,
  displayedTrades,
  userPlan
}) => {
  if (!hasUploadedData) {
    return null;
  }

  // If no data was uploaded or processed successfully
  if (tradeData.length === 0) {
    return (
      <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Your Uploaded Trading Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No data available. Please upload a valid CSV file with trading data.
          </div>
        </CardContent>
      </Card>
    );
  }

  console.log("Trade data in UploadedTradeData:", tradeData);
  
  // Process the columns to display
  const allKeys = Object.keys(tradeData[0] || {});
  
  // Choose the most important columns to display if there are too many
  const getDisplayColumns = () => {
    // Prioritize standard column names and the original columns from the CSV
    const priorityKeys = [
      'Symbol', 'Side', 'Size', 'EntryPrice', 'ExitPrice', 'PnL', 'TradeTime', 'Type',
      'Contracts', 'Closing Direction', 'Qty', 'Entry Price', 'Exit Price', 'Closed P&L', 
      'Exit Type', 'Trade Time(UTC+0)', 'Create Time', 'Symbol Type'
    ];
    
    // Filter to only include keys that actually exist in the data
    const availablePriorityKeys = priorityKeys.filter(key => allKeys.includes(key));
    
    // If we have 6 or fewer columns, show all of them
    if (allKeys.length <= 6) return allKeys;
    
    // Otherwise, pick the most important ones first, then fill with others
    let selectedKeys = [];
    
    // First add any priority keys that exist
    for (const key of availablePriorityKeys) {
      if (selectedKeys.length < 6) {
        selectedKeys.push(key);
      }
    }
    
    // If we still need more keys to get to 6, add others
    if (selectedKeys.length < 6) {
      for (const key of allKeys) {
        if (!selectedKeys.includes(key) && selectedKeys.length < 6) {
          selectedKeys.push(key);
        }
      }
    }
    
    return selectedKeys;
  };
  
  const displayColumns = getDisplayColumns();
  console.log("Display columns:", displayColumns);

  // Function to format cell value based on column name
  const formatCellValue = (key: string, value: string) => {
    if (!value) return '';
    
    // Special handling for Symbol or Contract column
    if (key === 'Symbol' || key === 'Contracts') {
      return value;
    }
    
    // Handle BUY/SELL direction
    if (key === 'Side' || key === 'Direction' || key === 'Closing Direction') {
      const direction = value.toLowerCase();
      if (direction === 'buy') {
        return <span className="text-green-500">BUY</span>;
      } else if (direction === 'sell') {
        return <span className="text-red-500">SELL</span>;
      }
      return value;
    }
    
    // Handle price columns
    if (key.toLowerCase().includes('price') || 
        key === 'PnL' || 
        key === 'Closed P&L' || 
        key.toLowerCase().includes('p&l')) {
      // Format as currency if it's a number
      const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
      if (!isNaN(num)) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2
        }).format(num);
      }
    }
    
    // Handle date columns
    if (key.toLowerCase().includes('time') || 
        key.toLowerCase().includes('date') || 
        key === 'TradeTime' || 
        key === 'Trade Time(UTC+0)' || 
        key === 'Create Time') {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).format(date);
        }
      } catch (e) {
        // If date parsing fails, return the original value
      }
    }
    
    return String(value || '');
  };

  return (
    <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Your Uploaded Trading Data</CardTitle>
        {totalTrades && displayedTrades && userPlan && (
          <div className="text-xs text-muted-foreground">
            Showing {displayedTrades} of {totalTrades} trades 
            {totalTrades > displayedTrades && (
              <span className="ml-1 text-purple-400">
                ({userPlan} plan limit)
              </span>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {tradeData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/20">
                  {displayColumns.map((header, index) => (
                    <th key={index} className="text-left py-3 px-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tradeData.slice(0, 5).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-purple-900/10 hover:bg-purple-900/5">
                    {displayColumns.map((key, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-2">
                        {formatCellValue(key, String(row[key] || ''))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {tradeData.length > 5 && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-center text-sm text-muted-foreground">
                  Showing 5 of {tradeData.length} entries
                </p>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  View all <ArrowUpRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No data available. Please upload a valid CSV file.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadedTradeData;
