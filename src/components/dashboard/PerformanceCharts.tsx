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

    const timeKey = findTimeKey(tradeData[0]);
    const profitKey = findPnlKey(tradeData[0]);

    if (!timeKey || !profitKey) {
      console.log("Missing time or profit key, using demo data");
      return [
        { date: 'Jan', profit: 2400 },
        { date: 'Feb', profit: 1398 },
        { date: 'Mar', profit: 9800 },
      ];
    }

    const result = tradeData.map((trade, index) => {
      const dateStr = String(trade[timeKey] || '');
      let dateLabel = `Trade ${index + 1}`;
      try {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          dateLabel = date.toLocaleString('default', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
        }
      } catch (e) {
        console.log(`Failed to parse date: ${dateStr}`);
      }

      const profit = extractNumericValue(trade[profitKey]);
      return { date: dateLabel, profit: isNaN(profit) ? 0 : profit };
    });

    // Sort by trade time
    result.sort((a, b) => {
      const dateA = new Date(tradeData[result.indexOf(a)][timeKey] || '');
      const dateB = new Date(tradeData[result.indexOf(b)][timeKey] || '');
      return dateA.getTime() - dateB.getTime();
    });

    console.log("Processed performance data:", result);
    return result;
  };

  // Function to prepare data for trade distribution
  const prepareDistributionData = (): DistributionDataPoint[] => {
    if (!hasData || !tradeData.length) {
      return [
        { name: 'Winning', value: 65 },
        { name: 'Losing', value: 35 },
      ];
    }

    const profitKey = findPnlKey(tradeData[0]);
    if (!profitKey) {
      return [
        { name: 'Winning', value: 65 },
        { name: 'Losing', value: 35 },
      ];
    }

    const winning = tradeData.filter(trade => extractNumericValue(trade[profitKey]) > 0).length;
    const losing = tradeData.filter(trade => extractNumericValue(trade[profitKey]) <= 0).length;

    console.log(`Counted ${winning} winning trades and ${losing} losing trades`);

    return [
      { name: 'Winning', value: winning },
      { name: 'Losing', value: losing },
    ];
  };

  // Helper functions (unchanged)
  const findDateKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'Date', 'Trade Date', 'Entry Date', 'Open Date',
      'date', 'tradedate', 'entrydate', 'opendate', 'Create Time'
    ];
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
    for (const key of Object.keys(sampleTrade)) {
      if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase())) && !key.toLowerCase().includes('time')) {
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
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
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
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
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
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
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
    for (const key of possibleKeys) {
      if (key in sampleTrade) return key;
    }
    for (const key of Object.keys(sampleTrade)) {
      if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
        return key;
      }
    }
    return null;
  };

  const extractNumericValue = (value: any): number => {
    if (value === undefined || value === null) return NaN;
    if (typeof value === 'number') return value;
    const stringValue = String(value).trim();
    const cleanedValue = stringValue.replace(/[$£€,]/g, '').replace(/^\+/, '');
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
        <CardContent className="flex flex-col items-center">
          {hasData && distributionData.length > 0 && distributionData.some(d => d.value > 0) ? (
            <div className="h-80 flex flex-col items-center justify-center">
              <ChartContainer className="h-60 w-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ) : (
            <div className="h-80 flex flex-col items-center justify-center">
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
