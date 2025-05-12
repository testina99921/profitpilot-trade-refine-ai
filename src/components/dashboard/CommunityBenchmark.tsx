
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';

interface CommunityBenchmarkProps {
  winRate: number;
  riskReward: number;
}

const CommunityBenchmark: React.FC<CommunityBenchmarkProps> = ({ winRate, riskReward }) => {
  // Mock community averages
  const communityWinRate = 50.5;
  const communityRiskReward = 1.7;
  
  // Calculate differences
  const winRateDiff = winRate - communityWinRate;
  const riskRewardDiff = riskReward - communityRiskReward;
  
  // Calculate percentages for progress bars
  const winRatePercentage = Math.min(Math.max((winRate / 100) * 100, 0), 100);
  const riskRewardPercentage = Math.min(Math.max((riskReward / 3) * 100, 0), 100);

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
            <p className="text-xl font-bold text-purple-400">Top {Math.max(1, Math.floor(100 - (winRate * riskReward / 2)))}%</p>
            <p className="text-xs text-muted-foreground">Of all traders</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Win Rate</span>
              <span className="font-medium">{winRate.toFixed(1)}% 
                <span className={winRateDiff >= 0 ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                  ({winRateDiff >= 0 ? '+' : ''}{winRateDiff.toFixed(1)}%)
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${winRatePercentage}%` }}></div>
              </div>
              <span className="text-xs text-muted-foreground">{communityWinRate}%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Risk/Reward</span>
              <span className="font-medium">1:{riskReward.toFixed(1)} 
                <span className={riskRewardDiff >= 0 ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                  ({riskRewardDiff >= 0 ? '+' : ''}{riskRewardDiff.toFixed(1)})
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${riskRewardPercentage}%` }}></div>
              </div>
              <span className="text-xs text-muted-foreground">1:{communityRiskReward}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityBenchmark;
