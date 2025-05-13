
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TradingPsychologyProps {
  winRate?: number;
  totalProfit?: number;
}

const TradingPsychology: React.FC<TradingPsychologyProps> = ({ winRate = 0, totalProfit = 0 }) => {
  // Calculate psychological metrics based on trading data
  
  // 1. Discipline: Higher if win rate is good or consistent trades
  const disciplineScore = Math.min(100, Math.max(0, winRate + 20));
  
  // 2. Patience: Based on frequency of trading and win rate
  const patienceScore = Math.min(100, Math.max(0, winRate < 45 ? 45 : 65 + (winRate / 10)));
  
  // 3. FOMO Resistance: Lower when making big losses, higher with consistent profits
  const fomoScore = totalProfit > 0 ? 
    Math.min(100, Math.max(0, 50 + (winRate / 2))) : 
    Math.min(100, Math.max(0, 40 + (winRate / 3)));
    
  // 4. Risk Management: Based on profit and win rate relationship
  const riskScore = totalProfit > 0 ? 
    Math.min(100, Math.max(0, 60 + (winRate / 5))) : 
    Math.min(100, Math.max(0, 40 + (winRate / 5)));

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Trading Psychology</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Discipline</span>
            <span className="text-sm font-medium">{disciplineScore.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${disciplineScore}%` }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Patience</span>
            <span className="text-sm font-medium">{patienceScore.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${patienceScore}%` }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">FOMO Resistance</span>
            <span className="text-sm font-medium">{fomoScore.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${fomoScore}%` }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Risk Management</span>
            <span className="text-sm font-medium">{riskScore.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${riskScore}%` }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingPsychology;
