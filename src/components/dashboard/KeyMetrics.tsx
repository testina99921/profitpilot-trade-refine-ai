
import React from 'react';
import { BarChart3, DollarSign, TrendingDown, TrendingUp, Users } from 'lucide-react';
import MetricCard from './MetricCard';

interface KeyMetricsProps {
  tradingStyle: string;
  winRate: string;
  winRateChange: string;
  totalProfit: string;
  totalProfitChange: string;
  riskReward: string;
  riskRewardChange: string;
  avgDrawdown: string;
  avgDrawdownChange: string;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({
  tradingStyle,
  winRate,
  winRateChange,
  totalProfit,
  totalProfitChange,
  riskReward,
  riskRewardChange,
  avgDrawdown,
  avgDrawdownChange
}) => {
  // Determine if changes are positive
  const isWinRatePositive = !winRateChange.startsWith('-');
  const isTotalProfitPositive = !totalProfitChange.startsWith('-');
  const isRiskRewardPositive = !riskRewardChange.startsWith('-');
  const isAvgDrawdownPositive = avgDrawdownChange.startsWith('-'); // For drawdown, negative change is good

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
