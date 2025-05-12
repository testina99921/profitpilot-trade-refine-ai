
import { TradeDataEntry } from "@/types/dashboard";

// Calculate win rate from trade data
export const calculateWinRate = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  const wins = tradeData.filter(trade => {
    // Check if the trade has a profit/loss field that indicates a win
    if ('PnL' in trade) return parseFloat(trade.PnL) > 0;
    if ('P&L' in trade) return parseFloat(trade['P&L']) > 0;
    if ('Profit/Loss' in trade) return parseFloat(trade['Profit/Loss']) > 0;
    // Try to calculate from entry and exit prices if available
    if ('Entry' in trade && 'Exit' in trade) {
      const entry = parseFloat(trade.Entry);
      const exit = parseFloat(trade.Exit);
      if (!isNaN(entry) && !isNaN(exit)) {
        return exit > entry;
      }
    }
    return false;
  }).length;
  
  return (wins / tradeData.length) * 100;
};

// Calculate total profit
export const calculateTotalProfit = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  return tradeData.reduce((total, trade) => {
    if ('PnL' in trade) return total + parseFloat(trade.PnL || '0');
    if ('P&L' in trade) return total + parseFloat(trade['P&L'] || '0');
    if ('Profit/Loss' in trade) return total + parseFloat(trade['Profit/Loss'] || '0');
    
    // Try to calculate from entry and exit prices if available
    if ('Entry' in trade && 'Exit' in trade && 'Size' in trade) {
      const entry = parseFloat(trade.Entry);
      const exit = parseFloat(trade.Exit);
      const size = parseFloat(trade.Size);
      if (!isNaN(entry) && !isNaN(exit) && !isNaN(size)) {
        return total + (exit - entry) * size;
      }
    }
    return total;
  }, 0);
};

// Calculate risk-reward ratio
export const calculateRiskReward = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  const winningTrades = tradeData.filter(trade => {
    if ('PnL' in trade) return parseFloat(trade.PnL) > 0;
    if ('P&L' in trade) return parseFloat(trade['P&L']) > 0;
    if ('Profit/Loss' in trade) return parseFloat(trade['Profit/Loss']) > 0;
    return false;
  });
  
  const losingTrades = tradeData.filter(trade => {
    if ('PnL' in trade) return parseFloat(trade.PnL) < 0;
    if ('P&L' in trade) return parseFloat(trade['P&L']) < 0;
    if ('Profit/Loss' in trade) return parseFloat(trade['Profit/Loss']) < 0;
    return false;
  });
  
  if (!winningTrades.length || !losingTrades.length) return 0;
  
  const avgWin = winningTrades.reduce((sum, trade) => {
    if ('PnL' in trade) return sum + Math.abs(parseFloat(trade.PnL));
    if ('P&L' in trade) return sum + Math.abs(parseFloat(trade['P&L']));
    if ('Profit/Loss' in trade) return sum + Math.abs(parseFloat(trade['Profit/Loss']));
    return sum;
  }, 0) / winningTrades.length;
  
  const avgLoss = losingTrades.reduce((sum, trade) => {
    if ('PnL' in trade) return sum + Math.abs(parseFloat(trade.PnL));
    if ('P&L' in trade) return sum + Math.abs(parseFloat(trade['P&L']));
    if ('Profit/Loss' in trade) return sum + Math.abs(parseFloat(trade['Profit/Loss']));
    return sum;
  }, 0) / losingTrades.length;
  
  return avgLoss ? avgWin / avgLoss : 0;
};

// Calculate average drawdown
export const calculateAvgDrawdown = (tradeData: TradeDataEntry[]): number => {
  // For simplicity, we'll estimate drawdown as the average of losing trades as percentage
  const losingTrades = tradeData.filter(trade => {
    if ('PnL' in trade) return parseFloat(trade.PnL) < 0;
    if ('P&L' in trade) return parseFloat(trade['P&L']) < 0;
    if ('Profit/Loss' in trade) return parseFloat(trade['Profit/Loss']) < 0;
    return false;
  });
  
  if (!losingTrades.length) return 0;
  
  return losingTrades.reduce((sum, trade) => {
    let loss = 0;
    if ('PnL' in trade) loss = Math.abs(parseFloat(trade.PnL));
    if ('P&L' in trade) loss = Math.abs(parseFloat(trade['P&L']));
    if ('Profit/Loss' in trade) loss = Math.abs(parseFloat(trade['Profit/Loss']));
    
    // Calculate size/capital if available to get percentage
    if ('Size' in trade && 'Entry' in trade) {
      const size = parseFloat(trade.Size);
      const entry = parseFloat(trade.Entry);
      if (!isNaN(size) && !isNaN(entry) && size * entry > 0) {
        return sum + (loss / (size * entry)) * 100;
      }
    }
    // Default to just accumulating loss amounts if we can't calculate percentage
    return sum + loss;
  }, 0) / losingTrades.length;
};

// Determine trading style based on trade data
export const determineTradingStyle = (tradeData: TradeDataEntry[]): string => {
  if (!tradeData.length) return "Undefined";
  
  // Look for time-based columns to determine trading style
  const hasTimeColumn = tradeData.some(trade => 
    'Duration' in trade || 'Time Held' in trade || 'Holding Period' in trade
  );
  
  if (hasTimeColumn) {
    // Calculate average holding time if possible
    const holdingTimes = tradeData
      .filter(trade => 'Duration' in trade || 'Time Held' in trade || 'Holding Period' in trade)
      .map(trade => {
        const duration = trade.Duration || trade['Time Held'] || trade['Holding Period'] || '';
        // Try to parse duration - this is simplified, actual CSV might use different formats
        if (duration.includes('d') || parseInt(duration) > 24) {
          return 'long';
        } else if (duration.includes('m') || parseInt(duration) < 1) {
          return 'scalp';
        } else {
          return 'day';
        }
      });
    
    // Count occurrences of each style
    const counts = holdingTimes.reduce((acc, style) => {
      acc[style] = (acc[style] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Find the most common style
    let maxCount = 0;
    let dominantStyle = 'Swing Trader';
    
    for (const [style, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        if (style === 'scalp') dominantStyle = 'Scalp Trader';
        else if (style === 'day') dominantStyle = 'Day Trader';
        else if (style === 'long') dominantStyle = 'Swing Trader';
      }
    }
    
    return dominantStyle;
  }
  
  // If no time information, check by number of trades
  if (tradeData.length > 20) {
    return "Day Trader";
  } else {
    return "Swing Trader";
  }
};
