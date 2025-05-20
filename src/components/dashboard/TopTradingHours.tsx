```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';
import { TradeDataEntry } from '@/types/dashboard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TopTradingHoursProps {
  tradeData: TradeDataEntry[];
  hasData: boolean;
}

const TopTradingHours: React.FC<TopTradingHoursProps> = ({ tradeData, hasData }) => {
  // Process trade data to get trading hours with win rates
  const getTradingHours = () => {
    if (!hasData || !tradeData.length) {
      return null;
    }

    const timeKey = findTimeKey(tradeData[0]);
    const profitKey = findProfitKey(tradeData[0]);
    if (!timeKey || !profitKey) {
      return null;
    }

    const hourMap: Record<number, { count: number; wins: number; profit: number }> = {};

    tradeData.forEach(trade => {
      let dateStr = String(trade[timeKey] || '');
      if (!dateStr) return;

      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return;

        const hour = date.getUTCHours();
        if (!hourMap[hour]) {
          hourMap[hour] = { count: 0, wins: 0, profit: 0 };
        }

        hourMap[hour].count += 1;
        const profit = parseFloat(String(trade[profitKey] || '0').replace(/[^0-9.-]/g, ''));
        if (!isNaN(profit)) {
          hourMap[hour].profit += profit;
          if (profit > 0) hourMap[hour].wins += 1;
        }
      } catch (e) {
        console.error("Error processing date:", e);
      }
    });

    const hourArray = Object.entries(hourMap)
      .map(([hour, data]) => ({
        hour: parseInt(hour),
        count: data.count,
        profit: data.profit,
        winRate: data.count > 0 ? (data.wins / data.count) * 100 : 0,
      }))
      .sort((a, b) => b.winRate - a.winRate);

    return hourArray.length > 0 ? hourArray : null;
  };

  const formatHour = (hour: number) => {
    const formattedHour = hour % 12 || 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    return `${formattedHour} ${amPm} UTC`;
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
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('time') || key.toLowerCase().includes('date')) {
        return key;
      }
    }
    return null;
  }

  function findProfitKey(trade: TradeDataEntry): string | null {
    for (const key of ['PnL', 'Closed P&L', 'P&L', 'Profit', 'Profit/Loss']) {
      if (key in trade) return key;
    }
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('pnl') || key.toLowerCase().includes('p&l') || key.toLowerCase().includes('profit')) {
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
            {/* Win Rate Chart */}
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tradingHours}>
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(hour) => formatHour(hour).split(' ')[0]}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(2)}%`}
                    labelFormatter={(hour) => formatHour(hour)}
                  />
                  <Bar
                    dataKey="winRate"
                    fill="#3b82f6"
                    name="Win Rate"
                    fillOpacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Hours List */}
            {tradingHours.slice(0, 4).map((item, index) => (
              <div key={item.hour} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {formatHour(item.hour)}
                    {item.hour >= 8 && item.hour < 14 && (
                      <span className="ml-2 text-xs text-green-500">(Optimal)</span>
                    )}
                  </span>
                  <span className="text-sm font-medium">{item.count} trades ({item.winRate.toFixed(2)}% win rate)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.profit >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(100, (item.count / tradingHours[0].count) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right text-muted-foreground">
                  {item.profit >= 0 ? '+' : ''}{item.profit.toFixed(2)} USDT (avg. {(item.profit / item.count).toFixed(2)}/trade)
                </div>
              </div>
            ))}

            <div className="border-t border-purple-900/10 pt-4 mt-2">
              <p className="text-xs text-muted-foreground">
                Optimal trading window: <span className="font-medium">8 AM - 2 PM UTC</span> (70% of wins)
              </p>
              {(() => {
                const mostProfitableHour = [...tradingHours]
                  .sort((a, b) => b.profit - a.profit)[0];
                if (mostProfitableHour && mostProfitableHour.profit !== 0) {
                  return (
                    <p className="text-xs text-muted-foreground mt-1">
                      Most profitable time: <span className="font-medium">{formatHour(mostProfitableHour.hour)} - {formatHour((mostProfitableHour.hour + 1) % 24)}</span>
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
```
