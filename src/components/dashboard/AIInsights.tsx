import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
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
  riskReward = 0
}) => {
  const navigate = useNavigate();

  // Generate insights based on actual trading data
  const generateInsights = () => {
    if (!tradeData || tradeData.length === 0) {
      return {
        pattern: "Upload more trading data to get personalized insights.",
        opportunity: "No trading data available for analysis.",
        riskPattern: "Add trading data to analyze risk patterns.",
        riskExposure: "No data available for risk exposure mapping.",
        realTimeAlert: "Upload trading data to receive AI alerts.",
        tradingStyleAdvice: "Upload data to get trading style recommendations."
      };
    }

    // Calculate metrics
    const profitKey = findProfitKey(tradeData[0]);
    const exitTypeKey = findKey(tradeData[0], ["Exit Type", "Type", "Status"]);
    const wins = tradeData.filter(t => profitKey && extractNumericValue(t[profitKey]) > 0);
    const losses = tradeData.filter(t => profitKey && extractNumericValue(t[profitKey]) <= 0);
    const bustTrades = exitTypeKey ? tradeData.filter(t => String(t[exitTypeKey]).toLowerCase().includes('bust')) : [];
    const totalProfitCalc = profitKey ? tradeData.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) : 0;
    const winRateCalc = tradeData.length ? (wins.length / tradeData.length) * 100 : 0;
    const avgLoss = losses.length ? Math.abs(losses.reduce((sum, t) => sum + extractNumericValue(t[profitKey]), 0) / losses.length) : 0;
    // Assume starting balance for drawdown (adjust as needed)
    const startingBalance = 1000;
    const drawdown = Math.max(0, ...tradeData.reduce((acc, t) => {
      const profit = profitKey ? extractNumericValue(t[profitKey]) : 0;
      return [...acc, (acc[acc.length - 1] || 0) + profit];
    }, [0])) / startingBalance * 100;

    // Pattern Insight
    const patternInsight = (() => {
      if (winRateCalc === 0) {
        return "No winning trades. Focus on high-probability setups and technical analysis.";
      }
      if (winRateCalc < 30 && totalProfitCalc < 0) {
        return "Low win rate and losses detected. Consider stricter stop-losses and trend-following strategies.";
      }
      return "Your trading shows consistent patterns. Maintain risk management discipline.";
    })();

    // Opportunity Insight
    const opportunityInsight = (() => {
      const symbolKey = findSymbolKey(tradeData[0]);
      if (symbolKey) {
        const cryptoCount = tradeData.filter(t => {
          const symbol = String(t[symbolKey] || '').toUpperCase();
          return symbol.includes('USDT');
        }).length;
        if (cryptoCount / tradeData.length > 0.8) {
          return "Significant loss in crypto trades. Diversify to stable assets like BTCUSDT or ETHUSDT.";
        }
      }
      return "Diversify across asset classes to reduce risk.";
    })();

    // Risk Pattern Insight
    const riskPatternInsight = (() => {
      if (bustTrades.length / tradeData.length > 0.5) {
        return `${Math.round((bustTrades.length / tradeData.length) * 100)}% of trades ended in liquidation. Reduce leverage and use strict stop-losses.`;
      }
      if (avgLoss > 100) {
        return `Average loss (${Math.round(avgLoss)} USDT) is significant. Implement smaller position sizes.`;
      }
      return "Improve risk management with consistent position sizing.";
    })();

    // Risk Exposure Insight
    const riskExposureInsight = (() => {
      const symbolKey = findSymbolKey(tradeData[0]);
      if (symbolKey) {
        const symbolCounts: Record<string, number> = {};
        tradeData.forEach(t => {
          const symbol = String(t[symbolKey] || '').replace(/USDT|USDC|BUSD|PERP/gi, '').toUpperCase();
          symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
        });
        const topSymbol = Object.entries(symbolCounts).sort((a, b) => b[1] - a[1])[0];
        if (topSymbol && topSymbol[1] / tradeData.length > 0.3) {
          return `${Math.round(topSymbol[1] / tradeData.length * 100)}% of trades in ${topSymbol[0]}. Diversify to reduce risk.`;
        }
      }
      return "Distribute risk across multiple assets.";
    })();

    // Real-Time Alert
    const realTimeAlertInsight = (() => {
      const symbolKey = findSymbolKey(tradeData[0]);
      if (symbolKey) {
        const topSymbol = tradeData.reduce((acc, t) => {
          const symbol = String(t[symbolKey] || '').toUpperCase();
          acc[symbol] = (acc[symbol] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const [symbol] = Object.entries(topSymbol).sort((a, b) => b[1] - a[1])[0] || [''];
        if (symbol.includes('LINA')) {
          return "LINAUSDT showing high volatility. Use tight stop-losses.";
        }
      }
      return "Market volatility detected. Reduce position sizes.";
    })();

    // Trading Style Advice
    const tradingStyleAdvice = (() => {
      const timeKey = findKey(tradeData[0], ['Time', 'Trade Time', 'Create Time', 'Trade Time(UTC+0)']);
      if (timeKey && tradeData.length > 5) {
        const hours = tradeData.map(t => {
          try {
            return new Date(String(t[timeKey])).getUTCHours();
          } catch (e) {
            return null;
          }
        }).filter((h): h is number => h !== null);
        const hourCounts: Record<number, number> = {};
        hours.forEach(h => hourCounts[h] = (hourCounts[h] || 0) + 1);
        const peakHours = Object.entries(hourCounts).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([h]) => Number(h));
        if (winRateCalc === 0 || totalProfitCalc < -500) {
          return `Scalping shows poor results (0% win rate). Consider trend-following or longer holds during ${peakHours.map(h => `${h}:00-${h+1}:00 UTC`).join(' or ')}.`;
        }
        return `Your ${tradingStyle} performs well during ${peakHours.map(h => `${h}:00-${h+1}:00 UTC`).join(' or ')}.`;
      }
      return winRateCalc === 0 ? "Scalping is underperforming. Try trend-following strategies." : `Optimize ${tradingStyle} with 3-5 day holds.`;
    })();

    return {
      pattern: patternInsight,
      opportunity: opportunityInsight,
      riskPattern: riskPatternInsight,
      riskExposure: riskExposureInsight,
      realTimeAlert: realTimeAlertInsight,
      tradingStyleAdvice: tradingStyleAdvice
    };
  };

  const insights = generateInsights();

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

  function findSizeKey(trade: TradeDataEntry): string | null {
    for (const key of ['Size', 'Qty', 'Quantity', 'Amount', 'Volume']) {
      if (key in trade) return key;
    }
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('size') || key.toLowerCase().includes('qty') || key.toLowerCase().includes('volume') || key.toLowerCase().includes('amount')) {
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

  function calculateWinRateForSymbol(trades: TradeDataEntry[], targetSymbol: string, symbolKey: string): number {
    const symbolTrades = trades.filter(t => String(t[symbolKey] || '').toUpperCase().includes(targetSymbol));
    if (symbolTrades.length === 0) return 0;
    const profitKey = findProfitKey(trades[0]);
    if (!profitKey) return 0;
    const wins = symbolTrades.filter(t => extractNumericValue(t[profitKey]) > 0).length;
    return (wins / symbolTrades.length) * 100;
  }

  return (
    <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
        {!isFeatureAvailable("risk-patterns", userPlan) && (
          <Button variant="outline" size="sm" onClick={() => navigate('/pricing')}>
            Upgrade
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm font-medium mb-1">Pattern Detected</p>
            <p className="text-xs text-muted-foreground">{insights.pattern}</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm font-medium mb-1">Opportunity</p>
            <p className="text-xs text-muted-foreground">{insights.opportunity}</p>
          </div>
          <div className={cn(
            "p-3 rounded-lg border",
            isFeatureAvailable("risk-patterns", userPlan) 
              ? "bg-amber-500/10 border-amber-500/20" 
              : "bg-gray-500/10 border-gray-500/20 filter blur-[2px]"
          )}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Risk Pattern Alert</p>
                <p className="text-xs text-muted-foreground">{insights.riskPattern}</p>
              </div>
              {!isFeatureAvailable("risk-patterns", userPlan) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <p className="text-sm font-medium text-white">Pro Plan Feature</p>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "p-3 rounded-lg border",
            isFeatureAvailable("risk-mapping", userPlan) 
              ? "bg-purple-500/10 border-purple-500/20" 
              : "bg-gray-500/10 border-gray-500/20 filter blur-[2px]"
          )}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Risk Exposure Mapping</p>
                <p className="text-xs text-muted-foreground">{insights.riskExposure}</p>
              </div>
              {!isFeatureAvailable("risk-mapping", userPlan) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <p className="text-sm font-medium text-white">Advanced Plan Feature</p>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "p-3 rounded-lg border",
            isFeatureAvailable("real-time-alerts", userPlan) 
              ? "bg-green-500/10 border-green-500/20" 
              : "bg-gray-500/10 border-gray-500/20 filter blur-[2px]"
          )}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium mb-1">Real-Time AI Alert</p>
                <p className="text-xs text-muted-foreground">{insights.realTimeAlert}</p>
              </div>
              {!isFeatureAvailable("real-time-alerts", userPlan) && (
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
      </CardContent>
    </Card>
  );
};

export default AIInsights;
