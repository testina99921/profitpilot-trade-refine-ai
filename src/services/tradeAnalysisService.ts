
import { TradeDataEntry } from "@/types/dashboard";

// Calculate win rate from trade data
export const calculateWinRate = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  console.log("Calculating win rate from:", tradeData);
  
  // Find the profit/loss column
  const profitKey = findProfitLossKey(tradeData[0]);
  if (!profitKey) {
    console.log("No profit/loss column found for win rate calculation");
    return 0;
  }
  
  console.log(`Using ${profitKey} column for win rate calculation`);
  
  const wins = tradeData.filter(trade => {
    const profitValue = parseFloat(String(trade[profitKey] || '0'));
    return profitValue > 0;
  }).length;
  
  const winRate = (wins / tradeData.length) * 100;
  console.log(`Win rate calculated: ${winRate}% (${wins}/${tradeData.length})`);
  
  return winRate;
};

// Calculate total profit
export const calculateTotalProfit = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  console.log("Calculating total profit from:", tradeData);
  
  // Find the profit/loss column
  const profitKey = findProfitLossKey(tradeData[0]);
  if (!profitKey) {
    console.log("No profit/loss column found for profit calculation");
    return 0;
  }
  
  console.log(`Using ${profitKey} column for total profit calculation`);
  
  const totalProfit = tradeData.reduce((total, trade) => {
    const profitValue = parseFloat(String(trade[profitKey] || '0'));
    return total + (isNaN(profitValue) ? 0 : profitValue);
  }, 0);
  
  console.log(`Total profit calculated: ${totalProfit}`);
  
  return totalProfit;
};

// Calculate risk-reward ratio
export const calculateRiskReward = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  console.log("Calculating risk-reward from:", tradeData);
  
  // Find the profit/loss column
  const profitKey = findProfitLossKey(tradeData[0]);
  if (!profitKey) {
    console.log("No profit/loss column found for risk-reward calculation");
    return 0;
  }
  
  const winningTrades = tradeData.filter(trade => {
    const profitValue = parseFloat(String(trade[profitKey] || '0'));
    return profitValue > 0;
  });
  
  const losingTrades = tradeData.filter(trade => {
    const profitValue = parseFloat(String(trade[profitKey] || '0'));
    return profitValue < 0;
  });
  
  if (!winningTrades.length || !losingTrades.length) {
    console.log("Not enough winning or losing trades for risk-reward calculation");
    return 0;
  }
  
  const avgWin = winningTrades.reduce((sum, trade) => {
    const profitValue = parseFloat(String(trade[profitKey] || '0'));
    return sum + Math.abs(isNaN(profitValue) ? 0 : profitValue);
  }, 0) / winningTrades.length;
  
  const avgLoss = losingTrades.reduce((sum, trade) => {
    const profitValue = parseFloat(String(trade[profitKey] || '0'));
    return sum + Math.abs(isNaN(profitValue) ? 0 : profitValue);
  }, 0) / losingTrades.length;
  
  const riskReward = avgLoss ? avgWin / avgLoss : 0;
  console.log(`Risk-reward calculated: ${riskReward} (avgWin: ${avgWin}, avgLoss: ${avgLoss})`);
  
  return riskReward;
};

// Calculate average drawdown
export const calculateAvgDrawdown = (tradeData: TradeDataEntry[]): number => {
  // For simplicity, we'll estimate drawdown as the average of losing trades as percentage
  if (!tradeData.length) return 0;
  
  console.log("Calculating average drawdown from:", tradeData);
  
  // Find the profit/loss column
  const profitKey = findProfitLossKey(tradeData[0]);
  if (!profitKey) {
    console.log("No profit/loss column found for drawdown calculation");
    return 0;
  }
  
  const losingTrades = tradeData.filter(trade => {
    const profitValue = parseFloat(String(trade[profitKey] || '0'));
    return profitValue < 0;
  });
  
  if (!losingTrades.length) {
    console.log("No losing trades found for drawdown calculation");
    return 0;
  }
  
  // Find entry price and size columns if available
  const entryKey = findEntryKey(tradeData[0]);
  const sizeKey = findSizeKey(tradeData[0]);
  
  let drawdownSum = 0;
  let validTradesCount = 0;
  
  for (const trade of losingTrades) {
    const loss = Math.abs(parseFloat(String(trade[profitKey] || '0')));
    if (isNaN(loss)) continue;
    
    // Try to calculate as percentage if we have entry and size info
    if (entryKey && sizeKey) {
      const entry = parseFloat(String(trade[entryKey] || '0'));
      const size = parseFloat(String(trade[sizeKey] || '0'));
      
      if (!isNaN(entry) && !isNaN(size) && entry > 0 && size > 0) {
        const position = entry * size;
        const drawdownPct = (loss / position) * 100;
        drawdownSum += drawdownPct;
        validTradesCount++;
        continue;
      }
    }
    
    // If we can't calculate percentage, use a default approximation
    // Assuming average drawdown is around 2-5% of account
    drawdownSum += (loss / 1000) * 100; // rough estimate
    validTradesCount++;
  }
  
  const avgDrawdown = validTradesCount > 0 ? drawdownSum / validTradesCount : 0;
  console.log(`Average drawdown calculated: ${avgDrawdown}%`);
  
  return avgDrawdown;
};

// Determine trading style based on trade data
export const determineTradingStyle = (tradeData: TradeDataEntry[]): string => {
  if (!tradeData.length) return "Undefined";
  
  console.log("Determining trading style from:", tradeData);
  
  // Look for time-based columns to determine trading style
  const durationKey = findDurationKey(tradeData[0]);
  const dateKey = findDateKey(tradeData[0]);
  
  if (durationKey) {
    console.log(`Using ${durationKey} column for trading style determination`);
    
    // Calculate trading style based on holding duration
    const holdingTimes = tradeData
      .filter(trade => trade[durationKey])
      .map(trade => {
        const duration = String(trade[durationKey] || '');
        if (duration.toLowerCase().includes('d') || parseInt(duration) > 24) {
          return 'long';
        } else if (duration.toLowerCase().includes('m') || 
                  duration.toLowerCase().includes('s') || 
                  parseInt(duration) < 1) {
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
    
    console.log(`Trading style determined by duration: ${dominantStyle}`);
    return dominantStyle;
  }
  
  // If no duration column, try to infer from trade frequency
  if (dateKey) {
    console.log(`Using ${dateKey} column to infer trading style from frequency`);
    
    try {
      // Get all dates
      const dates = tradeData
        .map(trade => new Date(String(trade[dateKey])))
        .filter(date => !isNaN(date.getTime()));
      
      // If we have valid dates
      if (dates.length > 0) {
        // Sort dates
        dates.sort((a, b) => a.getTime() - b.getTime());
        
        // Calculate date range and average trades per day
        const dateRange = (dates[dates.length - 1].getTime() - dates[0].getTime()) / (1000 * 3600 * 24);
        const tradesPerDay = tradeData.length / (dateRange || 1);
        
        console.log(`Trades per day: ${tradesPerDay} over ${dateRange} days`);
        
        if (tradesPerDay > 5) return "Scalp Trader";
        if (tradesPerDay > 1) return "Day Trader";
        return "Swing Trader";
      }
    } catch (e) {
      console.error("Error calculating trading style from dates:", e);
    }
  }
  
  // If all else fails, determine by trade count
  if (tradeData.length > 20) {
    return "Day Trader";
  } else {
    return "Swing Trader";
  }
};

// Helper functions to find column keys
function findProfitLossKey(sampleTrade: TradeDataEntry): string | null {
  const possibleKeys = [
    'PnL', 'P&L', 'P/L', 'Profit', 'Profit/Loss', 'GainLoss', 'Gain/Loss',
    'Net', 'Net Profit', 'Result', 'Return', 'Outcome', 'profit', 'pnl'
  ];
  
  // First try exact matches
  for (const key of possibleKeys) {
    if (key in sampleTrade) return key;
  }
  
  // Then try case-insensitive contains
  for (const key of Object.keys(sampleTrade)) {
    if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      return key;
    }
  }
  
  return null;
}

function findEntryKey(sampleTrade: TradeDataEntry): string | null {
  const possibleKeys = [
    'Entry', 'Entry Price', 'Open', 'Open Price', 'Buy', 'Buy Price',
    'entry', 'entryprice', 'open', 'openprice'
  ];
  
  // First try exact matches
  for (const key of possibleKeys) {
    if (key in sampleTrade) return key;
  }
  
  // Then try case-insensitive contains
  for (const key of Object.keys(sampleTrade)) {
    if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      return key;
    }
  }
  
  return null;
}

function findExitKey(sampleTrade: TradeDataEntry): string | null {
  const possibleKeys = [
    'Exit', 'Exit Price', 'Close', 'Close Price', 'Sell', 'Sell Price',
    'exit', 'exitprice', 'close', 'closeprice'
  ];
  
  // First try exact matches
  for (const key of possibleKeys) {
    if (key in sampleTrade) return key;
  }
  
  // Then try case-insensitive contains
  for (const key of Object.keys(sampleTrade)) {
    if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      return key;
    }
  }
  
  return null;
}

function findSizeKey(sampleTrade: TradeDataEntry): string | null {
  const possibleKeys = [
    'Size', 'Quantity', 'Amount', 'Volume', 'Shares', 'Contracts',
    'size', 'qty', 'quantity', 'amount', 'volume', 'position'
  ];
  
  // First try exact matches
  for (const key of possibleKeys) {
    if (key in sampleTrade) return key;
  }
  
  // Then try case-insensitive contains
  for (const key of Object.keys(sampleTrade)) {
    if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      return key;
    }
  }
  
  return null;
}

function findDurationKey(sampleTrade: TradeDataEntry): string | null {
  const possibleKeys = [
    'Duration', 'Time Held', 'Holding Period', 'Hold Time', 'Timeframe',
    'duration', 'held', 'period', 'hold', 'holdtime'
  ];
  
  // First try exact matches
  for (const key of possibleKeys) {
    if (key in sampleTrade) return key;
  }
  
  // Then try case-insensitive contains
  for (const key of Object.keys(sampleTrade)) {
    if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      return key;
    }
  }
  
  return null;
}

function findDateKey(sampleTrade: TradeDataEntry): string | null {
  const possibleKeys = [
    'Date', 'Trade Date', 'Entry Date', 'Open Date', 'Time', 'Timestamp',
    'date', 'tradedate', 'entrydate', 'opendate'
  ];
  
  // First try exact matches
  for (const key of possibleKeys) {
    if (key in sampleTrade) return key;
  }
  
  // Then try case-insensitive contains
  for (const key of Object.keys(sampleTrade)) {
    if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      return key;
    }
  }
  
  return null;
}
