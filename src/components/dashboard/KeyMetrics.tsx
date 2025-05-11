
import React from 'react';
import { BarChart3, DollarSign, TrendingDown, TrendingUp, Users } from 'lucide-react';
import MetricCard from './MetricCard';

interface KeyMetricsProps {
  tradingStyle: string;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ tradingStyle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <MetricCard 
        title="Win Rate" 
        value="58.7%" 
        change="+4.3%" 
        isPositive={true}
        icon={<TrendingUp />}
      />
      <MetricCard 
        title="Total Profit" 
        value="$12,837" 
        change="+18.2%" 
        isPositive={true}
        icon={<DollarSign />}
      />
      <MetricCard 
        title="Risk/Reward" 
        value="1:2.3" 
        change="+0.4" 
        isPositive={true}
        icon={<BarChart3 />}
      />
      <MetricCard 
        title="Avg. Drawdown" 
        value="4.2%" 
        change="-1.1%" 
        isPositive={true}
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
