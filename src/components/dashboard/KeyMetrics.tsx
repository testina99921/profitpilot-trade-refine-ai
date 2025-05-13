import React from 'react';
import { BarChart3, DollarSign, TrendingDown, TrendingUp, Users } from 'lucide-react';
import MetricCard from './MetricCard';
import { TradeDataEntry } from '@/types/dashboard';
import { extractNumericValue } from '@/utils/dashboardUtils';

interface KeyMetricsProps {
  tradeData: TradeDataEntry[];
  tradingStyle: string;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ tradeData, tradingStyle }) => {
  // Calculate metrics from tradeData
  const calculateMetrics = () => {
    const profitKey = tradeData[0] ? Object.keys(tradeData[0]).find(k => k.toLowerCase().includes('pnl') || k.toLowerCase().includes('profit')) : null;
    if (!profitKey || !tradeData.length) {
      return {
        winRate: '0%',
        winRateChange: '0%',
        totalProfit: '0 USDT',
        totalProfitChange: '0 USDT',
        riskReward: 'Undefined',
        riskRewardChange: '0',
        avgDrawdown: '0%',
        avgDrawdownChange: '0%',
      };
    }

    const wins = tradeData.filter(t => extractNumericValue(t[profitKey]) > 0);
    const losses = tradeData.filter(t => extractNumericValue(t[profitKey]) <= 0);
    const winRate = (wins.length / tradeData.length) * 100;
    const totalProfit = tradeData.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0);
    const riskReward = wins.length ? (Math.abs(losses.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / losses.length) / (wins.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / wins.length)).toFixed(2) : 'Undefined';
    const startingBalance = 1000; // Adjust based on actual balance
    const drawdown = Math.max(0, ...tradeData.reduce((acc, t) => {
      const profit = extractNumericValue(t[profitKey]);
      return [...acc, (acc[acc.length - 1] || 0) + profit];
    }, [0])) / startingBalance * 100;

    // Placeholder changes (simulate period-over-period, adjust if data available)
    const winRateChange = '0%'; // No previous period data
    const totalProfitChange = '0 USDT';
    const riskRewardChange = '0';
    const avgDrawdownChange = '0%';

    return {
      winRate: `${winRate.toFixed(2)}%`,
      winRateChange,
      totalProfit: `${totalProfit.toFixed(2)} USDT`,
      totalProfitChange,
      riskReward,
      riskRewardChange,
      avgDrawdown: `${drawdown.toFixed(2)}%`,
      avgDrawdownChange,
    };
  };

  const {
    winRate,
    winRateChange,
    totalProfit,
    totalProfitChange,
    riskReward,
    riskRewardChange,
    avgDrawdown,
    avgDrawdownChange,
  } = calculateMetrics();

  // Determine if changes are positive
  const isWinRatePositive = !winRateChange.startsWith('-');
  const isTotalProfitPositive = !totalProfitChange.startsWith('-');
  const isRiskRewardPositive = !riskRewardChange.startsWith('-');
  const isAvgDrawdownPositive = avgDrawdownChange.startsWith('-'); // Negative drawdown change is good

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <MetricCard 
        title="Win Rate" 
        value={winRate} 
        change={winRateChange} 
        isPositive={isWinRatePositive}
        icon={<TrendingUp />}
      />
      <MetricCard 
        title="Total Profit" 
        value={totalProfit} 
        change={totalProfitChange} 
        isPositive={isTotalProfitPositive}
        icon={<DollarSign />}
      />
      <MetricCard 
        title="Risk/Reward" 
        value={riskReward} 
        change={riskRewardChange} 
        isPositive={isRiskRewardPositive}
        icon={<BarChart3 />}
      />
      <MetricCard 
        title="Avg. Drawdown" 
        value={avgDrawdown} 
        change={avgDrawdownChange} 
        isPositive={isAvgDrawdownPositive}
        icon={<TrendingDown />}
      />
      <MetricCard 
        title="Trading Style" 
        value={tradingStyle} 
        change="Best Match" 
        isPositive={true}
        icon={<Users />}
        highlight={true}
      />
    </div>
  );
};

export default KeyMetrics;
