
import React from 'react';
import { BarChart3, DollarSign, TrendingDown, TrendingUp, Users } from 'lucide-react';
import MetricCard from './MetricCard';
import { TradeDataEntry } from '@/types/dashboard';
import { extractNumericValue } from '@/utils/dashboardUtils';

interface KeyMetricsProps {
  tradeData?: TradeDataEntry[];
  tradingStyle: string;
  winRate?: string;
  winRateChange?: string;
  totalProfit?: string;
  totalProfitChange?: string;
  riskReward?: string;
  riskRewardChange?: string;
  avgDrawdown?: string;
  avgDrawdownChange?: string;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({
  tradeData = [],
  tradingStyle,
  winRate: propWinRate = '0%',
  winRateChange = '0%',
  totalProfit: propTotalProfit = '0 USDT',
  totalProfitChange = '0%',
  riskReward: propRiskReward = 'Undefined',
  riskRewardChange = '0',
  avgDrawdown: propAvgDrawdown = '0%',
  avgDrawdownChange = '0%',
}) => {
  const calculateMetrics = () => {
    console.log('KeyMetrics: tradeData received:', tradeData);

    // Check if tradeData is empty or undefined
    if (!tradeData || !tradeData.length) {
      console.log('KeyMetrics: No trade data, using prop defaults');
      return {
        winRate: propWinRate,
        winRateChange,
        totalProfit: propTotalProfit,
        totalProfitChange,
        riskReward: propRiskReward,
        riskRewardChange,
        avgDrawdown: propAvgDrawdown,
        avgDrawdownChange,
      };
    }

    // Now we can safely access tradeData[0]
    // Search for profit key, prioritizing 'Closed P&L'
    const profitKey = Object.keys(tradeData[0]).find(k => 
      k === 'Closed P&L' || 
      k === 'Closed PnL' || 
      k.toLowerCase().includes('pnl') || 
      k.toLowerCase().includes('profit')
    );
    
    if (!profitKey) {
      console.log('KeyMetrics: Profit key not found. Available keys:', Object.keys(tradeData[0]));
      return {
        winRate: propWinRate,
        winRateChange,
        totalProfit: propTotalProfit,
        totalProfitChange,
        riskReward: propRiskReward,
        riskRewardChange,
        avgDrawdown: propAvgDrawdown,
        avgDrawdownChange,
      };
    }

    console.log('KeyMetrics: Using profit key:', profitKey);
    console.log('KeyMetrics: Sample P&L value:', tradeData[0][profitKey]);

    const wins = tradeData.filter(t => {
      const value = extractNumericValue(t[profitKey]);
      console.log(`Trade P&L: ${t[profitKey]} -> Parsed: ${value}`);
      return value > 0;
    });
    const losses = tradeData.filter(t => extractNumericValue(t[profitKey]) <= 0);
    const winRate = tradeData.length ? (wins.length / tradeData.length) * 100 : 0;
    const totalProfit = tradeData.reduce((sum, t) => {
      const value = extractNumericValue(t[profitKey]);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    // Check if losses.length is 0 to avoid division by zero
    const riskReward = (wins.length && losses.length) ? 
      `1:${(Math.abs(losses.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / losses.length) / 
            (wins.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / wins.length)).toFixed(2)}` : 
      'Undefined';
      
    const startingBalance = 1000; // Adjust if known
    const cumulativePnl = tradeData.reduce((acc, t) => {
      const profit = extractNumericValue(t[profitKey]);
      return [...acc, (acc[acc.length - 1] || 0) + profit];
    }, [0]);
    const drawdown = startingBalance ? (Math.abs(Math.min(...cumulativePnl)) / startingBalance * 100) : 0;

    const winRateChangeCalc = '0%';
    const totalProfitChangeCalc = '0%';
    const riskRewardChangeCalc = '0';
    const avgDrawdownChangeCalc = '0%';

    console.log('KeyMetrics: Calculated:', { winRate, totalProfit, riskReward, drawdown });

    return {
      winRate: `${winRate.toFixed(2)}%`,
      winRateChange: winRateChangeCalc,
      totalProfit: `${totalProfit < 0 ? '-' : ''}$${Math.abs(totalProfit).toFixed(2)}`,
      totalProfitChange: totalProfitChangeCalc,
      riskReward,
      riskRewardChange: riskRewardChangeCalc,
      avgDrawdown: `${drawdown.toFixed(2)}%`,
      avgDrawdownChange: avgDrawdownChangeCalc,
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

  const isWinRatePositive = !winRateChange.startsWith('-');
  const isTotalProfitPositive = !totalProfitChange.startsWith('-');
  const isRiskRewardPositive = !riskRewardChange.startsWith('-');
  const isAvgDrawdownPositive = avgDrawdownChange.startsWith('-');

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
