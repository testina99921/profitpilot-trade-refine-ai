
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeDataEntry } from '@/types/dashboard';

interface RecentTradesProps {
  tradeData: TradeDataEntry[];
  hasData: boolean;
}

interface FormattedTrade {
  symbol: string;
  entry: string;
  exit: string;
  pnl: string;
  status: 'Win' | 'Loss';
}

const RecentTrades: React.FC<RecentTradesProps> = ({ tradeData, hasData }) => {
  // Function to extract recent trades from trade data
  const getRecentTrades = (): FormattedTrade[] => {
    if (!hasData || !tradeData.length) {
      // Return demo data if no real data exists
      return [
        { symbol: 'BTC', entry: '$64,320', exit: '$67,845', pnl: '+$1,762.50', status: 'Win' },
        { symbol: 'ETH', entry: '$3,412.65', exit: '$3,208.32', pnl: '-$615.75', status: 'Loss' },
        { symbol: 'SOL', entry: '$134.14', exit: '$155.78', pnl: '+$936.80', status: 'Win' },
        { symbol: 'BNB', entry: '$578.22', exit: '$605.67', pnl: '+$472.50', status: 'Win' },
      ];
    }

    console.log("Processing recent trades from:", tradeData);

    // Try to identify relevant columns
    const symbolKey = findSymbolKey(tradeData[0]);
    const entryKey = findEntryKey(tradeData[0]);
    const exitKey = findExitKey(tradeData[0]);
    const pnlKey = findPnlKey(tradeData[0]);

    console.log(`Using keys: symbol=${symbolKey}, entry=${entryKey}, exit=${exitKey}, pnl=${pnlKey}`);

    // Convert and format recent trades
    return tradeData.slice(0, 4).map(trade => {
      // Get PNL value
      const pnlValue = pnlKey ? extractNumericValue(trade[pnlKey]) : 0;
      
      // If no direct PNL value and we have entry/exit prices, calculate it
      let calculatedPnl = pnlValue;
      if ((pnlValue === 0 || isNaN(pnlValue)) && entryKey && exitKey) {
        const entry = extractNumericValue(trade[entryKey]);
        const exit = extractNumericValue(trade[exitKey]);
        if (!isNaN(entry) && !isNaN(exit)) {
          calculatedPnl = exit - entry;
        }
      }
      
      // Format the PNL value
      const formattedPnl = formatCurrency(calculatedPnl);
      
      return {
        symbol: symbolKey ? extractSymbol(trade[symbolKey]) : 'Unknown',
        entry: entryKey ? formatCurrency(extractNumericValue(trade[entryKey])) : 'N/A',
        exit: exitKey ? formatCurrency(extractNumericValue(trade[exitKey])) : 'N/A',
        pnl: calculatedPnl >= 0 ? `+${formattedPnl}` : formattedPnl,
        status: calculatedPnl >= 0 ? 'Win' : 'Loss'
      };
    });
  };
  
  // Helper function to extract symbol from various formats
  const extractSymbol = (value: any): string => {
    if (!value) return 'Unknown';
    const str = String(value);
    
    // If contains USDT, BTC, or other common pairs
    if (/[A-Z0-9]{2,}(USDT|BTC|ETH|USD|BUSD)/.test(str)) {
      const match = str.match(/([A-Z0-9]{2,})(USDT|BTC|ETH|USD|BUSD)/);
      return match ? match[0] : str;
    }
    
    return str;
  };
  
  // Helper function to extract numeric value from string or number
  const extractNumericValue = (value: any): number => {
    if (value === undefined || value === null) return NaN;
    
    // If already a number
    if (typeof value === 'number') return value;
    
    const stringValue = String(value).trim();
    
    // Remove common currency symbols and thousand separators
    const cleanedValue = stringValue
      .replace(/[$£€,]/g, '')
      .replace(/^\+/, ''); // Remove leading + sign
    
    // Check if it's a negative value with parentheses like (123.45)
    if (/^\(.*\)$/.test(cleanedValue)) {
      return -parseFloat(cleanedValue.replace(/[()]/g, ''));
    }
    
    return parseFloat(cleanedValue);
  };
  
  // Helper function to format currency
  const formatCurrency = (value: number): string => {
    if (isNaN(value)) return 'N/A';
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Helper functions to find column keys
  const findSymbolKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'Symbol', 'Ticker', 'Instrument', 'Asset', 'Pair', 'Market',
      'Symbol Type', 'symbol', 'ticker', 'instrument', 'asset', 'pair'
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

    // Look for any key that might contain a cryptocurrency symbol
    for (const key of Object.keys(sampleTrade)) {
      const value = String(sampleTrade[key] || '');
      if (/[A-Z]{2,}(USDT|BTC|ETH|USD|BUSD)/.test(value)) {
        return key;
      }
    }
    
    return null;
  };
  
  const findEntryKey = (sampleTrade: TradeDataEntry): string | null => {
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
  };
  
  const findExitKey = (sampleTrade: TradeDataEntry): string | null => {
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
  };
  
  const findPnlKey = (sampleTrade: TradeDataEntry): string | null => {
    const possibleKeys = [
      'PnL', 'P&L', 'P/L', 'Profit', 'Profit/Loss', 'GainLoss', 'Gain/Loss',
      'Net', 'Net Profit', 'Result', 'Return', 'Outcome', 'profit', 'pnl',
      'Closed P&L', 'Closed PnL'
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
  };

  const recentTrades = getRecentTrades();

  return (
    <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-900/20">
                <th className="text-left py-3 px-2">Symbol</th>
                <th className="text-left py-3 px-2">Entry</th>
                <th className="text-left py-3 px-2">Exit</th>
                <th className="text-left py-3 px-2">P/L</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade, index) => (
                <tr key={index} className="border-b border-purple-900/10 hover:bg-purple-900/5">
                  <td className="py-3 px-2">{trade.symbol}</td>
                  <td className="py-3 px-2">{trade.entry}</td>
                  <td className="py-3 px-2">{trade.exit}</td>
                  <td className={`py-3 px-2 ${trade.status === 'Win' ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.pnl}
                  </td>
                  <td className="py-3 px-2">
                    <span 
                      className={`px-2 py-1 rounded-full ${
                        trade.status === 'Win' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      } text-xs`}
                    >
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTrades;
