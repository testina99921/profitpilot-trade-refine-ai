
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';

const CommunityBenchmark: React.FC = () => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Community Benchmark</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-8 border-b border-purple-900/10 pb-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-purple-400" />
            <div>
              <p className="text-sm font-medium">Trader Rank</p>
              <p className="text-xs text-muted-foreground">Based on performance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-purple-400">Top 12%</p>
            <p className="text-xs text-muted-foreground">Of all traders</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Win Rate</span>
              <span className="font-medium">58.7% <span className="text-green-500 text-xs">(+8.2%)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '63%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground">50.5%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Risk/Reward</span>
              <span className="font-medium">1:2.3 <span className="text-green-500 text-xs">(+0.6)</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground">1:1.7</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityBenchmark;
