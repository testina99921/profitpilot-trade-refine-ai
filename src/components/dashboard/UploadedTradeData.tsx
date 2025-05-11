
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeDataEntry } from '@/types/dashboard';

interface UploadedTradeDataProps {
  tradeData: TradeDataEntry[];
  hasUploadedData: boolean;
}

const UploadedTradeData: React.FC<UploadedTradeDataProps> = ({ tradeData, hasUploadedData }) => {
  if (!hasUploadedData) {
    return null;
  }

  return (
    <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Your Uploaded Trading Data</CardTitle>
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
                      <td key={cellIndex} className="py-3 px-2">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {tradeData.length > 5 && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Showing 5 of {tradeData.length} entries
              </p>
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
