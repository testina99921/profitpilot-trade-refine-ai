
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';

const TopTradingHours: React.FC = () => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top Trading Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] flex items-center justify-center">
          <BarChart3 size={48} className="text-muted-foreground opacity-50" />
          <p className="ml-4 text-muted-foreground">Trading hours chart would appear here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopTradingHours;
