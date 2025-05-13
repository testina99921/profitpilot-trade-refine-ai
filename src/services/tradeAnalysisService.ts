
import { TradeDataEntry } from "@/types/dashboard";
import { extractNumericValue } from "@/utils/dashboardUtils";

// Calculate win rate from trade data
export const calculateWinRate = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  console.log("Calculating win rate from:", tradeData);
  
  // Find the profit/loss column - try all possible naming conventions
  const profitKey = findProfitLossKey(tradeData[0]);
  if (!profitKey) {
    console.log("No profit/loss column found, trying to derive from entry/exit prices");
    
    // Try to calculate from entry/exit prices
    const entryKey = findEntryKey(tradeData[0]);
    const exitKey = findExitKey(tradeData[0]);
    
    if (entryKey && exitKey) {
      const wins = tradeData.filter(trade => {
        const entry = extractNumericValue(trade[entryKey]);
        const exit = extractNumericValue(trade[exitKey]);
        
        // Consider side/direction for profit calculation
        const sideKey = findSideKey(trade);
        const side = sideKey ? String(trade[sideKey]).toLowerCase() : null;
        
        if (side === 'buy') {
          return exit > entry; // For buy, profit when exit > entry
        } else if (side === 'sell') {
          return exit < entry; // For sell, profit when exit < entry
        }
        
        // If side is not found, default comparison
        return !isNaN(entry) && !isNaN(exit) && exit > entry;
      }).length;
      
      const winRate = (wins / tradeData.length) * 100;
      console.log(`Win rate calculated from prices: ${winRate}% (${wins}/${tradeData.length})`);
      return winRate;
    }
    
    // If we can't find entry/exit either, try to use side and P&L
    const sideKey = findSideKey(tradeData[0]);
    const statusKey = findStatusKey(tradeData[0]);
    
    if ((sideKey || statusKey)) {
      let wins = 0;
      
      tradeData.forEach(trade => {
        const side = sideKey ? String(trade[sideKey] || '').toLowerCase() : '';
        const status = statusKey ? String(trade[statusKey] || '').toLowerCase() : '';
        
        // Check various conditions that might indicate a winning trade
        if ((side.includes('buy') && !status.includes('bust')) ||
            (side.includes('long') && !status.includes('bust')) ||
            (status.includes('win')) ||
            (status.includes('profit'))) {
          wins++;
        }
      });
      
      const winRate = (wins / tradeData.length) * 100;
      console.log(`Win rate calculated from side/status: ${winRate}% (${wins}/${tradeData.length})`);
      return winRate;
    }
    
    return 0;
  }
  
  console.log(`Using ${profitKey} column for win rate calculation`);
  
  const wins = tradeData.filter(trade => {
    const profitValue = extractNumericValue(trade[profitKey]);
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
    console.log("No profit/loss column found for profit calculation, trying entry/exit");
    
    // Try to calculate from entry/exit prices
    const entryKey = findEntryKey(tradeData[0]);
    const exitKey = findExitKey(tradeData[0]);
    const sizeKey = findSizeKey(tradeData[0]);
    
    if (entryKey && exitKey) {
      let totalProfit = 0;
      
      tradeData.forEach(trade => {
        const entry = extractNumericValue(trade[entryKey]);
        const exit = extractNumericValue(trade[exitKey]);
        const size = sizeKey ? extractNumericValue(trade[sizeKey]) : 1;
        
        // Consider side/direction for profit calculation
        const sideKey = findSideKey(trade);
        const side = sideKey ? String(trade[sideKey]).toLowerCase() : null;
        
        if (!isNaN(entry) && !isNaN(exit)) {
          let tradeProfit;
          
          if (side === 'buy') {
            tradeProfit = (exit - entry) * (isNaN(size) ? 1 : size);
          } else if (side === 'sell') {
            tradeProfit = (entry - exit) * (isNaN(size) ? 1 : size);
          } else {
            tradeProfit = (exit - entry) * (isNaN(size) ? 1 : size);
          }
          
          totalProfit += tradeProfit;
        }
      });
      
      console.log(`Total profit calculated from prices: ${totalProfit}`);
      return totalProfit;
    }
    
    return 0;
  }
  
  console.log(`Using ${profitKey} column for total profit calculation`);
  
  const totalProfit = tradeData.reduce((total, trade) => {
    const profitValue = extractNumericValue(trade[profitKey]);
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
  
  // Find entry and exit price columns
  const entryKey = findEntryKey(tradeData[0]);
  const exitKey = findExitKey(tradeData[0]);
  
  if (!entryKey || !exitKey) {
    console.log("Could not find entry or exit price columns for risk-reward calculation");
    
    const winningTrades = tradeData.filter(trade => {
      const profitValue = extractNumericValue(trade[profitKey]);
      return profitValue > 0;
    });
    
    const losingTrades = tradeData.filter(trade => {
      const profitValue = extractNumericValue(trade[profitKey]);
      return profitValue < 0;
    });
    
    if (!winningTrades.length || !losingTrades.length) {
      console.log("Not enough winning or losing trades for risk-reward calculation");
      return 0;
    }
    
    const avgWin = winningTrades.reduce((sum, trade) => {
      const profitValue = extractNumericValue(trade[profitKey]);
      return sum + Math.abs(isNaN(profitValue) ? 0 : profitValue);
    }, 0) / winningTrades.length;
    
    const avgLoss = losingTrades.reduce((sum, trade) => {
      const profitValue = extractNumericValue(trade[profitKey]);
      return sum + Math.abs(isNaN(profitValue) ? 0 : profitValue);
    }, 0) / losingTrades.length;
    
    const riskReward = avgLoss ? avgWin / avgLoss : 0;
    console.log(`Risk-reward calculated: ${riskReward} (avgWin: ${avgWin}, avgLoss: ${avgLoss})`);
    
    return riskReward;
  }
  
  // Calculate using entry and exit prices
  console.log(`Using ${entryKey} and ${exitKey} columns for risk-reward calculation`);
  
  const tradesWithData = tradeData.filter(trade => {
    const entry = extractNumericValue(trade[entryKey]);
    const exit = extractNumericValue(trade[exitKey]);
    return !isNaN(entry) && !isNaN(exit);
  });
  
  if (tradesWithData.length === 0) {
    return 0;
  }

  // Filter trades by side to accurately calculate wins & losses
  const winningTrades = [];
  const losingTrades = [];
  
  for (const trade of tradesWithData) {
    const entry = extractNumericValue(trade[entryKey]);
    const exit = extractNumericValue(trade[exitKey]);
    const sideKey = findSideKey(trade);
    const side = sideKey ? String(trade[sideKey]).toLowerCase() : null;
    const pnl = extractNumericValue(trade[profitKey]);
    
    if (pnl > 0 || 
        (side === 'buy' && exit > entry) || 
        (side === 'sell' && exit < entry)) {
      winningTrades.push(trade);
    } else {
      losingTrades.push(trade);
    }
  }
  
  if (!winningTrades.length || !losingTrades.length) {
    console.log("Not enough winning or losing trades after side adjustment");
    return 0;
  }
  
  const avgWin = winningTrades.reduce((sum, trade) => {
    const pnl = extractNumericValue(trade[profitKey]);
    if (!isNaN(pnl)) return sum + Math.abs(pnl);
    
    const entry = extractNumericValue(trade[entryKey]);
    const exit = extractNumericValue(trade[exitKey]);
    const sideKey = findSideKey(trade);
    const side = sideKey ? String(trade[sideKey]).toLowerCase() : null;
    
    if (side === 'buy') {
      return sum + Math.abs(exit - entry);
    } else if (side === 'sell') {
      return sum + Math.abs(entry - exit);
    }
    return sum + Math.abs(exit - entry);
  }, 0) / winningTrades.length;
  
  const avgLoss = losingTrades.reduce((sum, trade) => {
    const pnl = extractNumericValue(trade[profitKey]);
    if (!isNaN(pnl)) return sum + Math.abs(pnl);
    
    const entry = extractNumericValue(trade[entryKey]);
    const exit = extractNumericValue(trade[exitKey]);
    const sideKey = findSideKey(trade);
    const side = sideKey ? String(trade[sideKey]).toLowerCase() : null;
    
    if (side === 'buy') {
      return sum + Math.abs(entry - exit);
    } else if (side === 'sell') {
      return sum + Math.abs(exit - entry);
    }
    return sum + Math.abs(entry - exit);
  }, 0) / losingTrades.length;
  
  const riskReward = avgLoss ? avgWin / avgLoss : 0;
  console.log(`Risk-reward calculated: ${riskReward} (avgWin: ${avgWin}, avgLoss: ${avgLoss})`);
  
  return riskReward;
};

// Calculate average drawdown
export const calculateAvgDrawdown = (tradeData: TradeDataEntry[]): number => {
  if (!tradeData.length) return 0;
  
  console.log("Calculating average drawdown from:", tradeData);
  
  // Find the profit/loss column
  const profitKey = findProfitLossKey(tradeData[0]);
  if (!profitKey) {
    console.log("No profit/loss column found for drawdown calculation");
    return 0;
  }
  
  const losingTrades = tradeData.filter(trade => {
    const profitValue = extractNumericValue(trade[profitKey]);
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
  let totalTradeValue = 0;
  
  for (const trade of losingTrades) {
    const loss = Math.abs(extractNumericValue(trade[profitKey]));
    if (isNaN(loss)) continue;
    
    // Try to calculate as percentage if we have entry and size info
    if (entryKey && sizeKey) {
      const entry = extractNumericValue(trade[entryKey]);
      const size = extractNumericValue(trade[sizeKey]);
      
      if (!isNaN(entry) && !isNaN(size) && entry > 0 && size > 0) {
        const position = entry * size;
        const drawdownPct = (loss / position) * 100;
        totalTradeValue += position;
        drawdownSum += loss;
        validTradesCount++;
        continue;
      }
    }
    
    // Add to drawdown sum without percentage calculation
    drawdownSum += loss;
    validTradesCount++;
  }
  
  // Calculate average drawdown as percentage of total position
  let avgDrawdown;
  if (totalTradeValue > 0) {
    avgDrawdown = (drawdownSum / totalTradeValue) * 100;
  } else {
    // If we couldn't calculate percentage accurately, approximate
    const totalTrades = tradeData.length;
    const lossPercentage = losingTrades.length / totalTrades;
    
    // Use the average loss as a percentage (typical drawdowns are 5-15%)
    avgDrawdown = lossPercentage * 10;
  }
  
  // Cap at reasonable values
  avgDrawdown = Math.min(Math.max(avgDrawdown, 1), 20);
  
  console.log(`Average drawdown calculated: ${avgDrawdown}%`);
  
  return avgDrawdown;
};

// Determine trading style based on trade data
export const determineTradingStyle = (tradeData: TradeDataEntry[]): string => {
  if (!tradeData.length) return "Undefined";
  
  console.log("Determining trading style from:", tradeData);

  // Check if we have a column that indicates the market type (spot, futures, etc)
  const typeKey = findKey(tradeData[0], [
    'Market Type', 'Type', 'Symbol Type', 'Product', 'market', 'type', 'product'
  ]);
  
  let isFutures = false;
  let isSpot = false;
  let isLeverage = false;
  
  // Check the Symbol column for indicators of market type
  const symbolKey = findKey(tradeData[0], ['Symbol', 'Contract', 'Contracts', 'Pair', 'Market', 'symbol', 'pair', 'market']);
  if (symbolKey) {
    // Check if any symbol contains indicators of futures/perpetual trading
    isFutures = tradeData.some(trade => {
      const symbol = String(trade[symbolKey] || '').toLowerCase();
      return symbol.includes('perp') || 
             symbol.includes('usdt') ||
             symbol.includes('busd') || 
             symbol.includes('usdc');
    });
  }
  
  // Check if Symbol Type column explicitly states futures
  if (typeKey && tradeData.some(trade => {
    const type = String(trade[typeKey] || '').toLowerCase();
    return type.includes('perpetual') || 
           type.includes('futures') || 
           type.includes('usdt perpetual');
  })) {
    isFutures = true;
  }
  
  // Check status/type column for indicators
  const statusKey = findKey(tradeData[0], ['Status', 'Exit Type', 'Trade Type', 'status', 'type']);
  if (statusKey) {
    // Check for indicators in status
    isLeverage = tradeData.some(trade => {
      const status = String(trade[statusKey] || '').toLowerCase();
      return status.includes('bust') || 
             status.includes('liquidat') || 
             status.includes('leverage') ||
             status.includes('perpetual') ||
             status.includes('futures');
    });
  }
  
  // Define hasLeveragedTrades based on isLeverage or isFutures
  const hasLeveragedTrades = isLeverage || isFutures;
  
  // Look for time-based columns to determine trading style
  const durationKey = findDurationKey(tradeData[0]);
  const dateKey = findDateKey(tradeData[0]);
  const timeKey = findTimeKey(tradeData[0]);
  
  if (durationKey) {
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
    let dominantStyle = hasLeveragedTrades ? 'Futures Trader' : 'Swing Trader';
    
    for (const [style, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        if (style === 'scalp') dominantStyle = hasLeveragedTrades ? 'Scalp Futures Trader' : 'Scalp Trader';
        else if (style === 'day') dominantStyle = hasLeveragedTrades ? 'Day Futures Trader' : 'Day Trader';
        else if (style === 'long') dominantStyle = hasLeveragedTrades ? 'Position Trader' : 'Swing Trader';
      }
    }
    
    console.log(`Trading style determined by duration: ${dominantStyle}`);
    return dominantStyle;
  }
  
  // If no duration column, try to infer from trade frequency
  if (dateKey || timeKey) {
    const keyToUse = dateKey || timeKey;
    console.log(`Using ${keyToUse} column to infer trading style from frequency`);
    
    try {
      // Get all dates
      const dates = tradeData
        .map(trade => {
          try {
            return new Date(String(trade[keyToUse]));
          } catch (e) {
            return null;
          }
        })
        .filter((date): date is Date => date !== null && !isNaN(date.getTime()));
      
      // If we have valid dates
      if (dates.length > 0) {
        // Sort dates
        dates.sort((a, b) => a.getTime() - b.getTime());
        
        // Calculate date range and average trades per day
        const dateRange = (dates[dates.length - 1].getTime() - dates[0].getTime()) / (1000 * 3600 * 24);
        const tradesPerDay = tradeData.length / (dateRange || 1);
        
        console.log(`Trades per day: ${tradesPerDay} over ${dateRange} days`);
        
        if (tradesPerDay > 5) {
          return hasLeveragedTrades ? 'Scalp Futures Trader' : 'Scalp Trader';
        }
        if (tradesPerDay > 1) {
          return hasLeveragedTrades ? 'Day Futures Trader' : 'Day Trader';
        }
        return hasLeveragedTrades ? 'Position Trader' : 'Swing Trader';
      }
    } catch (e) {
      console.error("Error calculating trading style from dates:", e);
    }
  }
  
  // If all else fails, determine based on what we know
  if (hasLeveragedTrades) {
    if (tradeData.length > 20) {
      return "Day Futures Trader";
    } else {
      return "Position Futures Trader";
    }
  }
  
  // Default for spot trading
  if (tradeData.length > 20) {
    return "Day Trader";
  } else {
    return "Swing Trader";
  }
};

// Helper functions to find column keys
function findProfitLossKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'PnL', 'P&L', 'P/L', 'Profit', 'Profit/Loss', 'GainLoss', 'Gain/Loss',
    'Net', 'Net Profit', 'Result', 'Return', 'Outcome', 'profit', 'pnl',
    'Closed P&L', 'Closed PnL', 'Realized PnL'
  ]);
}

function findEntryKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Entry', 'Entry Price', 'Open', 'Open Price', 'Buy', 'Buy Price',
    'entry', 'entryprice', 'open', 'openprice', 'EntryPrice'
  ]);
}

function findExitKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Exit', 'Exit Price', 'Close', 'Close Price', 'Sell', 'Sell Price',
    'exit', 'exitprice', 'close', 'closeprice', 'ExitPrice'
  ]);
}

function findSizeKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Size', 'Quantity', 'Amount', 'Volume', 'Shares', 'Contracts', 'Qty',
    'size', 'qty', 'quantity', 'amount', 'volume', 'position'
  ]);
}

function findSideKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Side', 'Direction', 'Buy/Sell', 'Long/Short', 'Order Side', 'Closing Direction',
    'side', 'direction', 'buysell', 'longshort'
  ]);
}

function findStatusKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Status', 'Trade Status', 'Result', 'Outcome', 'Exit Type',
    'status', 'result', 'tradestatus'
  ]);
}

function findDurationKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Duration', 'Time Held', 'Holding Period', 'Hold Time', 'Timeframe',
    'duration', 'held', 'period', 'hold', 'holdtime'
  ]);
}

function findDateKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Date', 'Trade Date', 'Entry Date', 'Open Date', 'Create Time',
    'date', 'tradedate', 'entrydate', 'opendate', 'Trade Time(UTC+0)'
  ], key => !key.toLowerCase().includes('time') || key === 'Create Time' || key === 'Trade Time(UTC+0)');
}

function findTimeKey(sampleTrade: TradeDataEntry): string | null {
  return findKey(sampleTrade, [
    'Time', 'Timestamp', 'Trade Time', 'Entry Time', 'Trade Time(UTC+0)', 'Create Time',
    'time', 'timestamp', 'tradetime'
  ]);
}

// Generic function to find keys based on a list of possible matches
function findKey(
  sampleTrade: TradeDataEntry, 
  possibleKeys: string[], 
  additionalCheck?: (key: string) => boolean
): string | null {
  // First try exact matches
  for (const key of possibleKeys) {
    if (key in sampleTrade && (!additionalCheck || additionalCheck(key))) {
      return key;
    }
  }
  
  // Then try standardized column names
  if ('Symbol' in sampleTrade && possibleKeys.includes('Contract')) return 'Symbol';
  if ('Side' in sampleTrade && possibleKeys.includes('Direction')) return 'Side';
  if ('PnL' in sampleTrade && possibleKeys.includes('Closed P&L')) return 'PnL';
  
  // Then try case-insensitive contains
  for (const key of Object.keys(sampleTrade)) {
    if (possibleKeys.some(k => key.toLowerCase().includes(k.toLowerCase())) && 
        (!additionalCheck || additionalCheck(key))) {
      return key;
    }
  }
  
  return null;
}
