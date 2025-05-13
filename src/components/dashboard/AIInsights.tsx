
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

    // Find common patterns
    const patternInsight = (() => {
      // Check if trader cuts profits too early (frequent small wins)
      if (winRate > 60 && totalProfit < 0) {
        return "You have a high win rate but negative total profit. You may be cutting profits too early and letting losses run too long.";
      }
      // Check if trader lets losers run (infrequent large losses)
      else if (winRate < 40 && riskReward < 1) {
        return "You tend to exit profitable trades too early. Consider setting wider take-profit levels.";
      }
      // Check if trader doesn't cut losses (many small wins, few big losses)
      else if (totalProfit < 0) {
        return "Your losing trades are significantly larger than your winning trades. Consider using stricter stop losses.";
      }
      return "Your trading shows consistent patterns. Focus on maintaining your risk management discipline.";
    })();

    // Find market opportunities
    const opportunityInsight = (() => {
      // Analyze by symbol
      const symbolKey = findSymbolKey(tradeData[0]);
      if (symbolKey) {
        const symbolPerformance: Record<string, {count: number, profit: number}> = {};
        
        // Calculate performance by symbol
        tradeData.forEach(trade => {
          const symbol = String(trade[symbolKey] || '').toUpperCase();
          const profitKey = findProfitKey(trade);
          const profit = profitKey ? extractNumericValue(trade[profitKey]) : 0;
          
          if (!symbolPerformance[symbol]) {
            symbolPerformance[symbol] = { count: 0, profit: 0 };
          }
          
          symbolPerformance[symbol].count++;
          symbolPerformance[symbol].profit += isNaN(profit) ? 0 : profit;
        });
        
        // Find best performing symbol
        let bestSymbol = '';
        let bestProfit = -Infinity;
        let bestCount = 0;
        
        for (const [symbol, data] of Object.entries(symbolPerformance)) {
          if (data.count >= 3 && data.profit > bestProfit) {
            bestProfit = data.profit;
            bestSymbol = symbol;
            bestCount = data.count;
          }
        }
        
        if (bestSymbol && bestProfit > 0) {
          const winRate = calculateWinRateForSymbol(tradeData, bestSymbol, symbolKey);
          return `Your win rate for ${bestSymbol} trades is ${winRate.toFixed(0)}%. Consider focusing more on this asset.`;
        } else {
          const cryptoCount = tradeData.filter(trade => {
            const symbol = String(trade[symbolKey] || '').toUpperCase();
            return symbol.includes('BTC') || 
                   symbol.includes('ETH') || 
                   symbol.includes('USDT') || 
                   symbol.includes('USDC');
          }).length;
          
          const cryptoPercentage = (cryptoCount / tradeData.length) * 100;
          
          if (cryptoPercentage > 50) {
            return "Your crypto trades account for the majority of your activity. Consider diversifying into other markets.";
          }
        }
      }
      return "Try to diversify your trading across different asset classes to find better opportunities.";
    })();

    // Analyze risk patterns
    const riskPatternInsight = (() => {
      const profitKey = findProfitKey(tradeData[0]);
      const sizeKey = findSizeKey(tradeData[0]);
      
      if (profitKey && sizeKey) {
        // Calculate average size for winning vs losing trades
        const winningTrades = tradeData.filter(t => {
          const profit = extractNumericValue(t[profitKey]);
          return !isNaN(profit) && profit > 0;
        });
        
        const losingTrades = tradeData.filter(t => {
          const profit = extractNumericValue(t[profitKey]);
          return !isNaN(profit) && profit < 0;
        });
        
        if (winningTrades.length > 0 && losingTrades.length > 0) {
          const avgWinSize = winningTrades.reduce((sum, t) => {
            const size = extractNumericValue(t[sizeKey]);
            return sum + (isNaN(size) ? 0 : size);
          }, 0) / winningTrades.length;
          
          const avgLossSize = losingTrades.reduce((sum, t) => {
            const size = extractNumericValue(t[sizeKey]);
            return sum + (isNaN(size) ? 0 : size);
          }, 0) / losingTrades.length;
          
          const sizeDiffPercent = Math.round((avgLossSize / avgWinSize - 1) * 100);
          
          if (sizeDiffPercent > 15) {
            return `Your position sizing on losing trades is ${sizeDiffPercent}% larger than on winning trades.`;
          }
        }
      }
      
      // Check if there are any bust trades
      const exitTypeKey = findKey(tradeData[0], ["Exit Type", "Type", "Status"]);
      if (exitTypeKey) {
        const bustTrades = tradeData.filter(t => 
          String(t[exitTypeKey]).toLowerCase().includes('bust')
        ).length;
        
        if (bustTrades > 0) {
          const bustPercent = Math.round((bustTrades / tradeData.length) * 100);
          return `${bustPercent}% of your trades ended in liquidation. Consider using wider stop losses.`;
        }
      }
      
      return "Your risk management could be improved. Try implementing a strict position sizing rule.";
    })();

    // Calculate risk exposure
    const riskExposureInsight = (() => {
      const symbolKey = findSymbolKey(tradeData[0]);
      if (symbolKey) {
        const symbolCounts: Record<string, number> = {};
        
        // Count trades by symbol
        tradeData.forEach(trade => {
          const rawSymbol = String(trade[symbolKey] || '');
          const symbol = rawSymbol.replace(/USDT|USDC|BUSD|PERP/gi, '').toUpperCase();
          
          if (!symbolCounts[symbol]) {
            symbolCounts[symbol] = 0;
          }
          
          symbolCounts[symbol]++;
        });
        
        // Find top 3 symbols by count
        const topSymbols = Object.entries(symbolCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([symbol]) => symbol);
        
        if (topSymbols.length > 0) {
          const concentration = Math.round((symbolCounts[topSymbols[0]] / tradeData.length) * 100);
          
          if (concentration > 30) {
            return `${concentration}% of your risk is concentrated in ${topSymbols[0]}. Consider diversifying with ${topSymbols.length > 1 ? topSymbols[1] : 'other assets'} and ${topSymbols.length > 2 ? topSymbols[2] : 'other markets'}.`;
          } 
          return `Your risk is well-distributed across ${Object.keys(symbolCounts).length} different assets.`;
        }
      }
      
      return "Analyze your risk exposure across different markets to optimize your portfolio.";
    })();

    // Real-time alert
    const realTimeAlertInsight = (() => {
      // Simulate a real-time alert based on most common symbols
      const symbolKey = findSymbolKey(tradeData[0]);
      if (symbolKey) {
        const symbols = tradeData.map(t => String(t[symbolKey] || '').toUpperCase());
        const btcCount = symbols.filter(s => s.includes('BTC')).length;
        const ethCount = symbols.filter(s => s.includes('ETH')).length;
        
        if (btcCount > ethCount && btcCount > 0) {
          return "BTC showing strong support at $63,500. Watch for potential reversal pattern.";
        } else if (ethCount > 0) {
          return "ETH approaching resistance at $3,100. Consider setting tight stop losses.";
        }
      }
      
      return "Market showing increased volatility. Consider reducing position sizes temporarily.";
    })();

    // Trading style advice
    const tradingStyleAdvice = (() => {
      const timeKey = findKey(tradeData[0], ['Time', 'Trade Time', 'Create Time', 'Trade Time(UTC+0)']);
      
      if (timeKey && tradeData.length > 5) {
        // Extract hours from trade times
        const hours = tradeData
          .map(t => {
            try {
              const date = new Date(String(t[timeKey]));
              return date.getUTCHours();
            } catch (e) {
              return null;
            }
          })
          .filter((h): h is number => h !== null);
        
        if (hours.length > 0) {
          // Count trades by hour
          const hourCounts: Record<number, number> = {};
          hours.forEach(hour => {
            if (!hourCounts[hour]) hourCounts[hour] = 0;
            hourCounts[hour]++;
          });
          
          // Find peak trading hours
          const peakHours = Object.entries(hourCounts)
            .sort((a, b) => Number(b[1]) - Number(a[1]))
            .slice(0, 2)
            .map(([hour]) => Number(hour));
          
          return `Your data shows strong performance with ${tradingStyle} strategies. Focus on trading during ${peakHours.map(h => `${h}:00-${h+1}:00 UTC`).join(' and ')} for best results.`;
        }
      }
      
      return `Your data shows strong performance with ${tradingStyle} strategies. Focus on 3-5 day holds for best results.`;
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

  // Function to find symbol key
  function findSymbolKey(trade: TradeDataEntry): string | null {
    for (const key of ['Symbol', 'Contracts', 'Contract', 'Pair', 'Market']) {
      if (key in trade) return key;
    }
    
    // Try to find by partial match
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('symbol') || 
          key.toLowerCase().includes('contract') || 
          key.toLowerCase().includes('pair')) {
        return key;
      }
    }
    
    return null;
  }
  
  // Function to find profit key
  function findProfitKey(trade: TradeDataEntry): string | null {
    for (const key of ['PnL', 'Closed P&L', 'P&L', 'Profit', 'Profit/Loss']) {
      if (key in trade) return key;
    }
    
    // Try to find by partial match
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('pnl') || 
          key.toLowerCase().includes('p&l') || 
          key.toLowerCase().includes('profit')) {
        return key;
      }
    }
    
    return null;
  }
  
  // Function to find size key
  function findSizeKey(trade: TradeDataEntry): string | null {
    for (const key of ['Size', 'Qty', 'Quantity', 'Amount', 'Volume']) {
      if (key in trade) return key;
    }
    
    // Try to find by partial match
    for (const key of Object.keys(trade)) {
      if (key.toLowerCase().includes('size') || 
          key.toLowerCase().includes('qty') || 
          key.toLowerCase().includes('volume') || 
          key.toLowerCase().includes('amount')) {
        return key;
      }
    }
    
    return null;
  }
  
  // Find generic key
  function findKey(trade: TradeDataEntry, possibleKeys: string[]): string | null {
    for (const key of possibleKeys) {
      if (key in trade) return key;
    }
    
    // Try to find by partial match
    for (const key of Object.keys(trade)) {
      for (const possibleKey of possibleKeys) {
        if (key.toLowerCase().includes(possibleKey.toLowerCase())) {
          return key;
        }
      }
    }
    
    return null;
  }
  
  // Calculate win rate for a specific symbol
  function calculateWinRateForSymbol(trades: TradeDataEntry[], targetSymbol: string, symbolKey: string): number {
    const symbolTrades = trades.filter(t => 
      String(t[symbolKey] || '').toUpperCase().includes(targetSymbol)
    );
    
    if (symbolTrades.length === 0) return 0;
    
    const profitKey = findProfitKey(trades[0]);
    if (!profitKey) return 0;
    
    const wins = symbolTrades.filter(t => {
      const profit = extractNumericValue(t[profitKey]);
      return !isNaN(profit) && profit > 0;
    }).length;
    
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
          
          {/* Risk Patterns - Pro plan+ feature */}
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

          {/* Risk Mapping - Advanced plan+ feature */}
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

          {/* Real-Time Alerts - Elite plan feature */}
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
