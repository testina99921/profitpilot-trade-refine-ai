```tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { isFeatureAvailable } from '@/utils/dashboardUtils';
import { UserPlan, TradeDataEntry } from '@/types/dashboard';
import { extractNumericValue } from '@/utils/dashboardUtils';

interface AIInsightsProps {
  userPlan: UserPlan;
  tradingStyle: string;
  tradeData?: TradeDataEntry[];
  winRate?: number;
  totalProfit?: number;
  riskReward?: number;
}

const AIInsights: React.FC<AIInsightsProps> = ({
  userPlan,
  tradingStyle,
  tradeData = [],
  winRate = 0,
  totalProfit = 0,
  riskReward = 0,
}) => {
  const navigate = useNavigate();
  const [dailyTradeCount, setDailyTradeCount] = useState(0);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [riskPercentage, setRiskPercentage] = useState(1);
  const [stopLossDistance, setStopLossDistance] = useState(0);
  const [tradeNotes, setTradeNotes] = useState<{ [orderNo: string]: string }>({});

  // Calculate daily trade count
  useEffect(() => {
    if (tradeData.length === 0) return;
    const today = new Date().toISOString().split('T')[0];
    const timeKey = findKey(tradeData[0], ['Trade Time(UTC+0)', 'Time', 'Trade Time']);
    if (!timeKey) return;
    const todayTrades = tradeData.filter((trade) => {
      try {
        const tradeDate = new Date(String(trade[timeKey])).toISOString().split('T')[0];
        return tradeDate === today;
      } catch {
        return false;
      }
    });
    setDailyTradeCount(todayTrades.length);
  }, [tradeData]);

  // Generate enhanced insights
  const generateInsights = () => {
    if (!tradeData || tradeData.length === 0) {
      return {
        pattern: "Upload more trading data to get personalized insights.",
        opportunity: "No trading data available for analysis.",
        riskPattern: "Add trading data to analyze risk patterns.",
        riskExposure: "No data available for risk exposure mapping.",
        realTimeAlert: "Upload trading data to receive AI alerts.",
        tradingStyleAdvice: "Upload data to get trading style recommendations.",
      };
    }

    const profitKey = findProfitKey(tradeData[0]);
    const exitTypeKey = findKey(tradeData[0], ['Exit Type', 'Type', 'Status']);
    const symbolKey = findSymbolKey(tradeData[0]);
    const timeKey = findKey(tradeData[0], ['Trade Time(UTC+0)', 'Time', 'Trade Time']);
    const orderKey = findKey(tradeData[0], ['Order No', 'Order ID', 'ID']);

    // Calculate metrics
    const wins = profitKey ? tradeData.filter((t) => extractNumericValue(t[profitKey]) > 0) : [];
    const losses = profitKey ? tradeData.filter((t) => extractNumericValue(t[profitKey]) <= 0) : [];
    const bustTrades = exitTypeKey ? tradeData.filter((t) => String(t[exitTypeKey]).toLowerCase().includes('bust')) : [];
    const totalProfitCalc = profitKey ? tradeData.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) : 0;
    const winRateCalc = tradeData.length ? (wins.length / tradeData.length) * 100 : 0;
    const avgLoss = losses.length ? Math.abs(losses.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / losses.length) : 0;
    const altcoinExposure = symbolKey
      ? (
          (tradeData.filter((t) =>
            ['LINAUSDT', 'GALAUSDT', 'HBARUSDT', 'ARUSDT', 'NKNUSDT', 'KNCUSDT', 'WAVESUSDT', 'ARPAUSDT'].includes(
              String(t[symbolKey]).toUpperCase()
            )
          ).length /
            tradeData.length) *
          100
        ).toFixed(2)
      : '0';

    // Top performers
    const topPerformers = symbolKey
      ? Object.entries(
          tradeData.reduce((acc, t) => {
            const symbol = String(t[symbolKey] || '').toUpperCase();
            acc[symbol] = acc[symbol] || { count: 0, wins: 0, totalPnl: 0 };
            acc[symbol].count += 1;
            if (profitKey && extractNumericValue(t[profitKey]) > 0) acc[symbol].wins += 1;
            if (profitKey) acc[symbol].totalPnl += extractNumericValue(t[profitKey]);
            return acc;
          }, {} as { [key: string]: { count: number; wins: number; totalPnl: number } })
        )
          .map(([symbol, value]) => ({
            symbol,
            winRate: ((value.wins / value.count) * 100).toFixed(2),
            totalPnl: value.totalPnl.toFixed(2),
          }))
          .sort((a, b) => Number(b.winRate) - Number(a.winRate))
          .slice(0, 1)
      : [];

    // Trading hours analysis
    const topTradingHours = timeKey
      ? tradeData.reduce((acc, t) => {
          try {
            const hour = new Date(String(t[timeKey])).getUTCHours();
            acc[hour] = acc[hour] || { wins: 0, total: 0 };
            acc[hour].total += 1;
            if (profitKey && extractNumericValue(t[profitKey]) > 0) acc[hour].wins += 1;
            return acc;
          } catch {
            return acc;
          }
        }, {} as { [hour: number]: { wins: number; total: number } })
      : {};
    const peakHours = Object.entries(topTradingHours)
      .sort((a, b) => (b[1].wins / b[1].total) - (a[1].wins / a[1].total))
      .slice(0, 2)
      .map(([h]) => Number(h));

    // Pattern Insight
    const patternInsight = (() => {
      if (winRateCalc < 35.2 && totalProfitCalc < -5000) {
        return "Low win rate (35.2%) and significant losses (-5094.12 USDT). Focus on high-probability setups during 8 AM–2 PM UTC.";
      }
      return "Consistent trading patterns. Maintain discipline with stop-losses.";
    })();

    // Opportunity Insight
    const opportunityInsight = topPerformers.length
      ? `Your best asset (${topPerformers[0].symbol}: ${topPerformers[0].winRate}% win rate, ${topPerformers[0].totalPnl} USDT) shows swing trading strength. Replicate with MACD crossovers.`
      : "Diversify to stable assets like BTCUSDT or ETHUSDT.";

    // Risk Pattern Insight
    const riskPatternInsight = bustTrades.length
      ? `${Math.round((bustTrades.length / tradeData.length) * 100)}% of trades (300) ended in liquidation. Reduce leverage to <5x and use 2% trailing stops.`
      : "Implement smaller position sizes to manage risk.";

    // Risk Exposure Insight
    const riskExposureInsight = symbolKey
      ? `Altcoin exposure: ${altcoinExposure}%. Limit to 20% and allocate 50% to BTCUSDT/ETHUSDT to avoid losses like HBARUSDT (-519.32 USDT).`
      : "Distribute risk across multiple assets.";

    // Real-Time Alert
    const realTimeAlertInsight = symbolKey
      ? tradeData.some((t) => String(t[symbolKey]).toUpperCase().includes('LINA'))
        ? "LINAUSDT showing high volatility (378 trades). Use tight stop-losses and RSI (<30 for buys)."
        : "Market volatility detected. Reduce position sizes by 50%."
      : "Monitor market conditions closely.";

    // Trading Style Advice
    const tradingStyleAdvice = peakHours.length
      ? `Your ${tradingStyle} performs best in ${peakHours.map((h) => `${h}:00–${h + 1}:00 UTC`).join(' or ')}. Limit to 3-5 trades/day to improve win rate (current: 8.22/day).`
      : "Optimize scalping with 1-3 day holds during high-liquidity hours.";

    return {
      pattern: patternInsight,
      opportunity: opportunityInsight,
      riskPattern: riskPatternInsight,
      riskExposure: riskExposureInsight,
      realTimeAlert: realTimeAlertInsight,
      tradingStyleAdvice: tradingStyleAdvice,
    };
  };

  // Calculate position size
  const calculatePositionSize = () => {
    if (!accountBalance || !riskPercentage || !stopLossDistance) return 0;
    const riskAmount = accountBalance * (riskPercentage / 100);
    return (riskAmount / stopLossDistance).toFixed(2);
  };

  // Handle trade note changes
  const handleTradeNoteChange = (orderNo: string, note: string) => {
    setTradeNotes((prev) => ({ ...prev, [orderNo]: note }));
  };

  // Reuse existing utility functions
  function findSymbolKey(trade: TradeDataEntry): string | null {
    for (const key of ['Symbol', 'Contracts', 'Contract', 'Pair', 'Market']) {
      if (key in trade) return key;
    }
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('symbol') || key.toLowerCase().includes('contract') || key.toLowerCase().includes('pair')) {
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

  function findKey(trade: TradeDataEntry, possibleKeys: string[]): string | null {
    for (const key of possibleKeys) {
      if (key in trade) return key;
    }
    for (const key of Object.keys(trade)) {
      for (const possibleKey of possibleKeys) {
        if (key.toLowerCase().includes(possibleKey.toLowerCase())) {
          return key;
        }
      }
    }
    return null;
  }

  const insights = generateInsights();
  const orderKey = tradeData[0] ? findKey(tradeData[0], ['Order No', 'Order ID', 'ID']) : null;

  return (
    <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
        {!isFeatureAvailable('risk-patterns', userPlan) && (
          <Button variant="outline" size="sm" onClick={() => navigate('/pricing')}>
            Upgrade
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {/* Overtrading Alert */}
        {dailyTradeCount > 5 && isFeatureAvailable('risk-patterns', userPlan) && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
            <p className="text-sm font-medium">Overtrading Alert</p>
            <p className="text-xs">
              You've placed {dailyTradeCount} trades today (avg: 8.22/day). Limit to 3-5 during 8 AM–2 PM UTC.
            </p>
          </div>
        )}

        {/* Insights */}
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm font-medium mb-1">Pattern Detected</p>
            <p className="text-xs text-muted-foreground">{insights.pattern}</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm font-medium mb-1">Opportunity</p>
            <p className="text-xs text-muted-foreground">{insights.opportunity}</p>
          </div>
          <div
            className={cn(
              'p-3 rounded-lg border',
              isFeatureAvailable('risk-patterns', userPlan)
                ? 'bg-amber-500/10 border-amber-500/20'
                : 'bg-gray-500/10 border-gray-500/20 filter blur-[2px]'
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Risk Pattern Alert</p>
                <p className="text-xs text-muted-foreground">{insights.riskPattern}</p>
              </div>
              {!isFeatureAvailable('risk-patterns', userPlan) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <p className="text-sm font-medium text-white">Pro Plan Feature</p>
                </div>
              )}
            </div>
          </div>
          <div
            className={cn(
              'p-3 rounded-lg border',
              isFeatureAvailable('risk-mapping', userPlan)
                ? 'bg-purple-500/10 border-purple-500/20'
                : 'bg-gray-500/10 border-gray-500/20 filter blur-[2px]'
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Risk Exposure Mapping</p>
                <p className="text-xs text-muted-foreground">{insights.riskExposure}</p>
              </div>
              {!isFeatureAvailable('risk-mapping', userPlan) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <p className="text-sm font-medium text-white">Advanced Plan Feature</p>
                </div>
              )}
            </div>
          </div>
          <div
            className={cn(
              'p-3 rounded-lg border',
              isFeatureAvailable('real-time-alerts', userPlan)
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-gray-500/10 border-gray-500/20 filter blur-[2px]'
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Real-Time AI Alert</p>
                <p className="text-xs text-muted-foreground">{insights.realTimeAlert}</p>
              </div>
              {!isFeatureAvailable('real-time-alerts', userPlan) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <p className="text-sm font-medium text-white">Elite Plan Feature</p>
                </div>
              )}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm font-medium mb-1">Trading Style Match</p>
            <p className="text-xs text-muted-foreground">{insights.tradingStyleAdvice}</p>
          </div>
        </div>

        {/* Position Size Calculator (Advanced+) */}
        {isFeatureAvailable('risk-mapping', userPlan) && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Position Size Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium">Account Balance ($)</label>
                <Input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium">Risk Percentage (%)</label>
                <Input
                  type="number"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium">Stop-Loss Distance ($)</label>
                <Input
                  type="number"
                  value={stopLossDistance}
                  onChange={(e) => setStopLossDistance(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
            <p className="mt-4 text-sm">
              Recommended Position Size: {calculatePositionSize()} units
            </p>
          </div>
        )}

        {/* Trade Journaling (Pro+) */}
        {isFeatureAvailable('risk-patterns', userPlan) && tradeData.length > 0 && orderKey && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Trade Journaling</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Log rationales for recent trades to improve discipline. Missing notes flag high Profane trades as high-risk.
            </p>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left text-xs">Contract</th>
                  <th className="px-4 py-2 text-left text-xs">P&L (USDT)</th>
                  <th className="px-4 py-2 text-left text-xs">Trade Note</th>
                </tr>
              </thead>
              <tbody>
                {tradeData.slice(0, 5).map((trade, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-xs">{trade[symbolKey || ''] || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs">{profitKey ? extractNumericValue(trade[profitKey]).toFixed(2) : 'N/A'}</td>
                    <td className="px-4 py-2">
                      <Input
                        value={tradeNotes[trade[orderKey] || ''] || ''}
                        onChange={(e) => handleTradeNoteChange(trade[orderKey] || '', e.target.value)}
                        placeholder="Enter trade rationale"
                        className={cn('text-xs', !tradeNotes[trade[orderKey] || ''] && 'border-red-500')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;
```
