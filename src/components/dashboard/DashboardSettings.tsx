
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { getAvailableDateRanges } from '@/utils/dashboardUtils';
import { useNavigate } from 'react-router-dom';
import { UserPlan } from '@/types/dashboard';
import { toast } from '@/components/ui/use-toast';

interface DashboardSettingsProps {
  userPlan: UserPlan;
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({ userPlan }) => {
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    // Navigate to pricing with current plan in query params
    navigate(`/pricing?from=${userPlan}`);
    toast({
      title: "Plan upgrade",
      description: "Viewing available upgrade options",
    });
  };
  
  return (
    <Card className="mb-6 bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Dashboard Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Date Range</label>
            <select className="w-full mt-1 p-2 rounded bg-background border border-purple-900/30">
              {getAvailableDateRanges(userPlan).map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            {userPlan !== "elite" && (
              <p className="mt-1 text-xs text-purple-300">
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-xs text-purple-400"
                  onClick={handleUpgrade}
                >
                  Upgrade your plan
                </Button> for more historical data
              </p>
            )}
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Chart Type</label>
            <select className="w-full mt-1 p-2 rounded bg-background border border-purple-900/30">
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="candlestick">Candlestick</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardSettings;
