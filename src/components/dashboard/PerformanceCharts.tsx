import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeDataEntry } from '@/types/dashboard';
import { extractNumericValue } from '@/utils/dashboardUtils';

interface KeyMetricsProps {
  tradeData: TradeDataEntry[];
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ tradeData }) => {
  const calculateMetrics = () => {
    const profitKey = tradeData[0] ? Object.keys(tradeData[0]).find(k => k.toLowerCase().includes('pnl') || k.toLowerCase().includes('profit')) : null;
    if (!profitKey) return { winRate: 0, totalProfit: 0, riskReward: 'Undefined', drawdown: 0, portfolio: 0 };

    const wins = tradeData.filter(t => extractNumericValue(t[profitKey]) > 0);
    const losses = tradeData.filter(t => extractNumericValue(t[profitKey]) <= 0);
    const winRate = tradeData.length ? (wins.length / tradeData.length) * 100 : 0;
    const totalProfit = tradeData.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0);
    const riskReward = wins.length ? (Math.abs(losses.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / losses.length) / (wins.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / wins.length)).toFixed(2) : 'Undefined';
    const startingBalance = 1000; // Adjust as needed
    const drawdown = Math.max(0, ...tradeData.reduce((acc, t) => {
      const profit = extractNumericValue(t[profitKey]);
      return [...acc, (acc[acc.length - 1] || 0) + profit];
    }, [0])) / startingBalance * 100;
    const portfolio = totalProfit;

    return { winRate, totalProfit, riskReward, drawdown, portfolio };
  };

  const { winRate, totalProfit, riskReward, drawdown, portfolio } = calculateMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Win Rate</CardTitle></CardHeader>
        <CardContent><p className="text-lg font-bold">{winRate.toFixed(2)}%</p></CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Total Profit</CardTitle></CardHeader>
        <CardContent><p className="text-lg font-bold">{totalProfit.toFixed(2)} USDT</p></CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Risk/Reward</CardTitle></CardHeader>
        <CardContent><p className="text-lg font-bold">{riskReward}</p></CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Drawdown</CardTitle></CardHeader>
        <CardContent><p className="text-lg font-bold">{drawdown.toFixed(2)}%</p></CardContent>
      </Card>
    </div>
  );
};

export default KeyMetrics;
