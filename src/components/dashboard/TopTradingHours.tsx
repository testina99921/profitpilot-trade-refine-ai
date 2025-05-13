
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';
import { TradeDataEntry } from '@/types/dashboard';

interface TopTradingHoursProps {
  tradeData: TradeDataEntry[];
  hasData: boolean;
}

const TopTradingHours: React.FC<TopTradingHoursProps> = ({ tradeData, hasData }) => {
  // Process trade data to get trading hours
  const getTradingHours = () => {
    if (!hasData || !tradeData.length) {
      return null;
    }

    // Find time keys in the data
    const timeKey = findTimeKey(tradeData[0]);
    if (!timeKey) {
      return null;
    }

    // Map of hour -> count and profit
    const hourMap: Record<number, { count: number, profit: number }> = {};
    
    // Process all trades
    tradeData.forEach(trade => {
      let dateStr = String(trade[timeKey] || '');
      if (!dateStr) return;
      
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return;
        
        const hour = date.getUTCHours();
        
        if (!hourMap[hour]) {
          hourMap[hour] = { count: 0, profit: 0 };
        }
        
        hourMap[hour].count += 1;
        
        // Try to get profit if available
        const profitKey = findProfitKey(trade);
        if (profitKey) {
          const profit = parseFloat(String(trade[profitKey] || '0').replace(/[^0-9.-]/g, ''));
          if (!isNaN(profit)) {
            hourMap[hour].profit += profit;
          }
        }
      } catch (e) {
        console.error("Error processing date:", e);
      }
    });
    
    // Convert to array and sort by count
    const hourArray = Object.entries(hourMap)
      .map(([hour, data]) => ({
        hour: parseInt(hour),
        count: data.count,
        profit: data.profit,
      }))
      .sort((a, b) => b.count - a.count);
    
    return hourArray.length > 0 ? hourArray : null;
  };
  
  const formatHour = (hour: number) => {
    const formattedHour = hour % 12 || 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    return `${formattedHour} ${amPm}`;
  };
  
  const tradingHours = getTradingHours();
  
  // Helper functions
  function findTimeKey(trade: TradeDataEntry): string | null {
    for (const key of [
      'Time', 'Trade Time', 'Create Time', 'Trade Time(UTC+0)', 
      'Date', 'Trade Date', 'Entry Date', 'Timestamp'
    ]) {
      if (key in trade) return key;
    }
    
    // Try to find by partial match
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('time') || 
          key.toLowerCase().includes('date')) {
        return key;
      }
    }
    
    return null;
  }
  
  function findProfitKey(trade: TradeDataEntry): string | null {
    for (const key of ['PnL', 'Closed P&L', 'P&L', 'Profit', 'Profit/Loss']) {
      if (key in trade) return key;
    }
    
    // Try to find by partial match
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('pnl') || 
          key.toLowerCase().includes('p&l') || 
          key.toLowerCase().includes('profit')) {
        return key;
      }
    }
    
    return null;
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top Trading Hours</CardTitle>
      </CardHeader>
      <CardContent>
        {tradingHours && tradingHours.length > 0 ? (
          <div className="space-y-6">
            {tradingHours.slice(0, 4).map((item, index) => (
              <div key={item.hour} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{formatHour(item.hour)} UTC</span>
                  <span className="text-sm font-medium">{item.count} trades</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.profit >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${Math.min(100, (item.count / tradingHours[0].count) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right text-muted-foreground">
                  {item.profit >= 0 ? '+' : ''}{item.profit.toFixed(2)} (avg. {(item.profit / item.count).toFixed(2)}/trade)
                </div>
              </div>
            ))}
            
            <div className="border-t border-purple-900/10 pt-4 mt-2">
              <p className="text-xs text-muted-foreground">
                Your most active trading time: <span className="font-medium">{formatHour(tradingHours[0].hour)} - {formatHour((tradingHours[0].hour + 1) % 24)} UTC</span>
              </p>
              
              {/* Find the most profitable hour */}
              {(() => {
                const mostProfitableHour = [...tradingHours]
                  .sort((a, b) => b.profit - a.profit)[0];
                
                if (mostProfitableHour && mostProfitableHour.profit !== 0) {
                  return (
                    <p className="text-xs text-muted-foreground mt-1">
                      Most profitable time: <span className="font-medium">{formatHour(mostProfitableHour.hour)} - {formatHour((mostProfitableHour.hour + 1) % 24)} UTC</span>
                    </p>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        ) : (
          <div className="h-[240px] flex items-center justify-center">
            <BarChart3 size={48} className="text-muted-foreground opacity-50" />
            <p className="ml-4 text-muted-foreground">Upload CSV data to see your trading hours</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopTradingHours;
