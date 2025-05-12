
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, PieChart, Line, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsType } from 'recharts';
import { TradeDataEntry } from '@/types/dashboard';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PerformanceChartsProps {
  tradeData: TradeDataEntry[];
  hasData: boolean;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ tradeData, hasData }) => {
  // Function to prepare data for performance chart
  const preparePerformanceData = () => {
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

    // Try to identify date and profit columns
    const dateKey = Object.keys(tradeData[0]).find(key => 
      key.toLowerCase().includes('date') || key.toLowerCase().includes('time')
    ) || 'Date';

    const profitKey = Object.keys(tradeData[0]).find(key => 
      key.toLowerCase().includes('pnl') || 
      key.toLowerCase().includes('p&l') || 
      key.toLowerCase().includes('profit')
    ) || 'PnL';

    // Group by month and sum profits
    const performanceByMonth = tradeData.reduce((acc, trade) => {
      let date;
      try {
        // Try to parse the date
        date = new Date(trade[dateKey]);
        if (isNaN(date.getTime())) {
          // If parsing fails, try a different format
          const parts = trade[dateKey].split(/[/.-]/);
          date = new Date(parts[2], parts[1] - 1, parts[0]);
        }
      } catch (e) {
        // If date parsing fails completely, use a counter instead
        return acc;
      }

      const month = date.toLocaleString('default', { month: 'short' });
      const profit = parseFloat(trade[profitKey] || '0');

      if (!acc[month]) {
        acc[month] = { date: month, profit: 0 };
      }
      acc[month].profit += isNaN(profit) ? 0 : profit;
      return acc;
    }, {});

    return Object.values(performanceByMonth);
  };

  // Function to prepare data for trade distribution
  const prepareDistributionData = () => {
    if (!hasData || !tradeData.length) {
      // Return demo data if no real data exists
      return [
        { name: 'Winning', value: 65 },
        { name: 'Losing', value: 35 },
      ];
    }

    // Try to identify profit/loss column
    const profitKey = Object.keys(tradeData[0]).find(key => 
      key.toLowerCase().includes('pnl') || 
      key.toLowerCase().includes('p&l') || 
      key.toLowerCase().includes('profit')
    ) || 'PnL';

    // Count winning vs losing trades
    const winning = tradeData.filter(trade => parseFloat(trade[profitKey] || '0') > 0).length;
    const losing = tradeData.filter(trade => parseFloat(trade[profitKey] || '0') <= 0).length;

    return [
      { name: 'Winning', value: winning },
      { name: 'Losing', value: losing },
    ];
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
          {hasData && tradeData.length > 0 ? (
            <div className="h-80">
              <ChartContainer className="h-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <PieChart size={48} className="text-muted-foreground opacity-50" />
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
          {hasData && tradeData.length > 0 ? (
            <div className="h-80">
              <ChartContainer className="h-full" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center flex-col">
              <PieChart size={48} className="text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">Upload CSV data to see your trade distribution</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
