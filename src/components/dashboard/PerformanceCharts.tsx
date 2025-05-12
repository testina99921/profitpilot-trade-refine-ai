
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import { TradeDataEntry } from '@/types/dashboard';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PerformanceChartsProps {
  tradeData: TradeDataEntry[];
  hasData: boolean;
}

// Define types for our chart data
interface PerformanceDataPoint {
  date: string;
  profit: number;
}

interface DistributionDataPoint {
  name: string;
  value: number;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ tradeData, hasData }) => {
  // Function to prepare data for performance chart
  const preparePerformanceData = (): PerformanceDataPoint[] => {
    if (!hasData || !tradeData.length) {
      // Return demo data if no real data exists
      return [
        { date: 'Jan', profit: 2400 },
        { date: 'Feb', profit: 1398 },
        { date: 'Mar', profit: 9800 },
        { date: 'Apr', profit: 3908 },
        { date: 'May', profit: 4800 },
        { date: 'Jun', profit: 3800 },
        { date: 'Jul', profit: 4300 },
      ];
    }

    console.log("Preparing performance data from:", tradeData);

    // Try to identify date and profit columns
    const dateKey = findDateKey(tradeData[0]);
    const timeKey = findTimeKey(tradeData[0]);
    const profitKey = findPnlKey(tradeData[0]);
    
    const keyToUse = dateKey || timeKey;

    console.log(`Using dateKey: ${keyToUse} and profitKey: ${profitKey}`);

    // If we can't find date or profit columns, return demo data
    if (!keyToUse || !profitKey) {
      console.log("Could not find date or profit columns, using demo data");
      return [
        { date: 'Jan', profit: 2400 },
        { date: 'Feb', profit: 1398 },
        { date: 'Mar', profit: 9800 },
      ];
    }

    // Group by month or day and sum profits
    const performanceByPeriod: Record<string, PerformanceDataPoint> = {};
    
    tradeData.forEach(trade => {
      let dateLabel = "Unknown";
      let date;

      try {
        // Get date string from trade
        const dateStr = String(trade[keyToUse] || '');
        
        // Try parsing as full date first
        date = new Date(dateStr);
        
        // If that fails, try other formats
        if (isNaN(date.getTime())) {
          if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            // Try YYYY-MM-DD format
            date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
          } else if (dateStr.includes('/')) {
            const parts = dateStr.split('/');
            // Try MM/DD/YYYY or DD/MM/YYYY format
            date = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
          }
        }
        
        // If we have a valid date, use it for the label
        if (!isNaN(date.getTime())) {
          // If the trades are from different years, include year in label
          if (tradeData.length > 10) {
            dateLabel = date.toLocaleString('default', { month: 'short' });
          } else {
            // For fewer trades, use day-level granularity
            dateLabel = date.toLocaleString('default', { month: 'short', day: 'numeric' });
          }
        } else {
          // Fall back to the raw value if we can't parse it
          dateLabel = dateStr.substring(0, 10);
        }
      } catch (e) {
        console.log("Failed to parse date:", trade[keyToUse]);
        dateLabel = String(trade[keyToUse]).substring(0, 10);
      }

      // Extract profit value
      const profit = extractNumericValue(trade[profitKey]);

      // Add to the group
      if (!performanceByPeriod[dateLabel]) {
        performanceByPeriod[dateLabel] = { date: dateLabel, profit: 0 };
      }
      
      performanceByPeriod[dateLabel].profit += isNaN(profit) ? 0 : profit;
    });

    // Convert to array and sort by date
    const result = Object.values(performanceByPeriod);
    
    // Sort by date if possible
    try {
      result.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
          return dateA.getTime() - dateB.getTime();
        }
        return a.date.localeCompare(b.date);
      });
    } catch (e) {
      console.log("Failed to sort by date:", e);
    }
    
    console.log("Processed performance data:", result);
    return result;
  };

  // Function to prepare data for trade distribution
  const prepareDistributionData = (): DistributionDataPoint[] => {
    if (!hasData || !tradeData.length) {
      // Return demo data if no real data exists
      return [
        { name: 'Winning', value: 65 },
        { name: 'Losing', value: 35 },
      ];
    }

    console.log("Preparing distribution data from:", tradeData);

    // Try to identify profit/loss column
    const profitKey = findPnlKey(tradeData[0]);
    const entryKey = findEntryKey(tradeData[0]);
    const exitKey = findExitKey(tradeData[0]);

    console.log(`Using profitKey: ${profitKey} for distribution`);

    // Count winning vs losing trades
    let winning = 0;
    let losing = 0;

    if (profitKey) {
      // If we have a profit/loss column, use it
      winning = tradeData.filter(trade => {
        const profitValue = extractNumericValue(trade[profitKey]);
        return profitValue > 0;
      }).length;
      
      losing = tradeData.filter(trade => {
        const profitValue = extractNumericValue(trade[profitKey]);
        return profitValue <= 0;
      }).length;
    } else if (entryKey && exitKey) {
      // If no profit column but we have entry and exit prices, calculate profit
      winning = tradeData.filter(trade => {
        const entry = extractNumericValue(trade[entryKey]);
        const exit = extractNumericValue(trade[exitKey]);
        return exit > entry;
      }).length;
      
      losing = tradeData.filter(trade => {
        const entry = extractNumericValue(trade[entryKey]);
        const exit = extractNumericValue(trade[exitKey]);
        return exit <= entry;
      }).length;
    }

    console.log(`Counted ${winning} winning trades and ${losing} losing trades`);

    if (winning === 0 && losing === 0) {
      // If we couldn't determine any winners or losers, use demo data
      return [
        { name: 'Winning', value: 65 },
        { name: 'Losing', value: 35 },
      ];
    }

    return [
      { name: 'Winning', value: winning },
      { name: 'Losing', value: losing },
    ];
  };
  
  // Helper functions to find column keys
  const findDateKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'Date', 'Trade Date', 'Entry Date', 'Open Date',
      'date', 'tradedate', 'entrydate', 'opendate', 'Create Time'
    ];
    
    // First try exact matches
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
    
    // Then try case-insensitive contains
    for (const key of Object.keys(sampleTrade)) {
      if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase())) && 
          !key.toLowerCase().includes('time')) {
        return key;
      }
    }
    
    return null;
  };
  
  const findTimeKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'Time', 'Timestamp', 'Trade Time', 'Entry Time', 'Trade Time(UTC)',
      'time', 'timestamp', 'tradetime', 'Create Time'
    ];
    
    // First try exact matches
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
    
    // Then try case-insensitive contains
    for (const key of Object.keys(sampleTrade)) {
      if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
        return key;
      }
    }
    
    return null;
  };
  
  const findPnlKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'PnL', 'P&L', 'P/L', 'Profit', 'Profit/Loss', 'GainLoss', 'Gain/Loss',
      'Net', 'Net Profit', 'Result', 'Return', 'Outcome', 'profit', 'pnl',
      'Closed P&L', 'Closed PnL'
    ];
    
    // First try exact matches
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
    
    // Then try case-insensitive contains
    for (const key of Object.keys(sampleTrade)) {
      if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
        return key;
      }
    }
    
    return null;
  };
  
  const findEntryKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'Entry', 'Entry Price', 'Open', 'Open Price', 'Buy', 'Buy Price',
      'entry', 'entryprice', 'open', 'openprice'
    ];
    
    // First try exact matches
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
    
    // Then try case-insensitive contains
    for (const key of Object.keys(sampleTrade)) {
      if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
        return key;
      }
    }
    
    return null;
  };
  
  const findExitKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'Exit', 'Exit Price', 'Close', 'Close Price', 'Sell', 'Sell Price',
      'exit', 'exitprice', 'close', 'closeprice'
    ];
    
    // First try exact matches
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
    
    // Then try case-insensitive contains
    for (const key of Object.keys(sampleTrade)) {
      if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
        return key;
      }
    }
    
    return null;
  };
  
  // Helper function to extract numeric value from string or number
  const extractNumericValue = (value: any): number => {
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

  const performanceData = preparePerformanceData();
  const distributionData = prepareDistributionData();
  const COLORS = ['#4ade80', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="col-span-2 bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {hasData && performanceData.length > 0 ? (
            <div className="h-80">
              <ChartContainer className="h-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <LineChartIcon className="text-muted-foreground opacity-50" />
              <p className="ml-4 text-muted-foreground">Upload CSV data to see your performance chart</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Trade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {hasData && distributionData.length > 0 && distributionData.some(d => d.value > 0) ? (
            <div className="h-80">
              <ChartContainer className="h-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center flex-col">
              <PieChartIcon className="text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">Upload CSV data to see your trade distribution</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
