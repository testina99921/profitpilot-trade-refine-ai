
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentTrades: React.FC = () => {
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
              <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                <td className="py-3 px-2">BTC</td>
                <td className="py-3 px-2">$64,320</td>
                <td className="py-3 px-2">$67,845</td>
                <td className="py-3 px-2 text-green-500">+$1,762.50</td>
                <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
              </tr>
              <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                <td className="py-3 px-2">ETH</td>
                <td className="py-3 px-2">$3,412.65</td>
                <td className="py-3 px-2">$3,208.32</td>
                <td className="py-3 px-2 text-red-500">-$615.75</td>
                <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">Loss</span></td>
              </tr>
              <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                <td className="py-3 px-2">SOL</td>
                <td className="py-3 px-2">$134.14</td>
                <td className="py-3 px-2">$155.78</td>
                <td className="py-3 px-2 text-green-500">+$936.80</td>
                <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
              </tr>
              <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                <td className="py-3 px-2">BNB</td>
                <td className="py-3 px-2">$578.22</td>
                <td className="py-3 px-2">$605.67</td>
                <td className="py-3 px-2 text-green-500">+$472.50</td>
                <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTrades;
