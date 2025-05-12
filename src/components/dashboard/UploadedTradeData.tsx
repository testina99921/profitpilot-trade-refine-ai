
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeDataEntry, UserPlan } from '@/types/dashboard';
import { ArrowUpRight } from 'lucide-react';

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
                  {Object.keys(tradeData[0]).map((header, index) => (
                    <th key={index} className="text-left py-3 px-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tradeData.slice(0, 5).map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-purple-900/10 hover:bg-purple-900/5">
                    {Object.values(row).map((value: any, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-2">{String(value)}</td>
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
