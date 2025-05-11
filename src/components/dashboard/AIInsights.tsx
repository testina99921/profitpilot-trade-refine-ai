
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { isFeatureAvailable } from '@/utils/dashboardUtils';
import { UserPlan } from '@/types/dashboard';

interface AIInsightsProps {
  userPlan: UserPlan;
  tradingStyle: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({ userPlan, tradingStyle }) => {
  const navigate = useNavigate();

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
            <p className="text-xs text-muted-foreground">You tend to exit profitable trades too early. Consider setting wider take-profit levels.</p>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm font-medium mb-1">Opportunity</p>
            <p className="text-xs text-muted-foreground">Your win rate for cryptocurrency trades is 72%. Consider focusing more on this sector.</p>
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
                <p className="text-xs text-muted-foreground">Your position sizing on losing trades is 40% larger than on winning trades.</p>
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
                <p className="text-xs text-muted-foreground">Your risk is concentrated in BTC. Consider diversifying with ETH and SOL trades.</p>
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
                <p className="text-xs text-muted-foreground">BTC showing strong support at $63,500. Watch for potential reversal pattern.</p>
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
            <p className="text-xs text-muted-foreground">Your data shows strong performance with <strong>{tradingStyle}</strong> strategies. Focus on 3-5 day holds for best results.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
