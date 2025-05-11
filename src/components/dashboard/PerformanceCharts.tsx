
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, PieChart } from 'lucide-react';

const PerformanceCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="col-span-2 bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <LineChart size={48} className="text-muted-foreground opacity-50" />
            <p className="ml-4 text-muted-foreground">Performance chart visualization would appear here</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Trade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center flex-col">
            <PieChart size={48} className="text-muted-foreground opacity-50 mb-4" />
            <p className="text-muted-foreground">Trade distribution chart would appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
