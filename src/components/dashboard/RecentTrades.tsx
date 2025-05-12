
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeDataEntry } from '@/types/dashboard';

interface RecentTradesProps {
  tradeData: TradeDataEntry[];
  hasData: boolean;
}

const RecentTrades: React.FC<RecentTradesProps> = ({ tradeData, hasData }) => {
  // Function to extract recent trades from trade data
  const getRecentTrades = () => {
    if (!hasData || !tradeData.length) {
      // Return demo data if no real data exists
      return [
        { symbol: 'BTC', entry: '$64,320', exit: '$67,845', pnl: '+$1,762.50', status: 'Win' },
        { symbol: 'ETH', entry: '$3,412.65', exit: '$3,208.32', pnl: '-$615.75', status: 'Loss' },
        { symbol: 'SOL', entry: '$134.14', exit: '$155.78', pnl: '+$936.80', status: 'Win' },
        { symbol: 'BNB', entry: '$578.22', exit: '$605.67', pnl: '+$472.50', status: 'Win' },
      ];
    }

    // Try to identify relevant columns
    const symbolKey = Object.keys(tradeData[0]).find(key => 
      key.toLowerCase().includes('symbol') || 
      key.toLowerCase().includes('ticker') || 
      key.toLowerCase().includes('asset')
    );
    
    const entryKey = Object.keys(tradeData[0]).find(key => 
      key.toLowerCase().includes('entry') || key.toLowerCase().includes('open')
    );
    
    const exitKey = Object.keys(tradeData[0]).find(key => 
      key.toLowerCase().includes('exit') || key.toLowerCase().includes('close')
    );
    
    const pnlKey = Object.keys(tradeData[0]).find(key => 
      key.toLowerCase().includes('pnl') || 
      key.toLowerCase().includes('p&l') || 
      key.toLowerCase().includes('profit')
    );

    // Convert and format recent trades
    return tradeData.slice(0, 4).map(trade => {
      const pnl = pnlKey ? parseFloat(String(trade[pnlKey] || '0')) : 0;
      const formattedPnl = pnl.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      return {
        symbol: symbolKey ? trade[symbolKey] : 'Unknown',
        entry: entryKey ? `$${parseFloat(String(trade[entryKey])).toLocaleString()}` : 'N/A',
        exit: exitKey ? `$${parseFloat(String(trade[exitKey])).toLocaleString()}` : 'N/A',
        pnl: pnl >= 0 ? `+${formattedPnl}` : formattedPnl,
        status: pnl >= 0 ? 'Win' : 'Loss'
      };
    });
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
                  <td className={`py-3 px-2 ${trade.status === 'Win' ? 'text-green-500' : 'text-red-500'}`}>{trade.pnl}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full ${trade.status === 'Win' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'} text-xs`}>
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
