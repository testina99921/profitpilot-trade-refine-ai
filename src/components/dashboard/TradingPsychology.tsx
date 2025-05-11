
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TradingPsychology: React.FC = () => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Trading Psychology</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Discipline</span>
            <span className="text-sm font-medium">82%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Patience</span>
            <span className="text-sm font-medium">67%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">FOMO Resistance</span>
            <span className="text-sm font-medium">54%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: '54%' }}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Risk Management</span>
            <span className="text-sm font-medium">78%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingPsychology;
