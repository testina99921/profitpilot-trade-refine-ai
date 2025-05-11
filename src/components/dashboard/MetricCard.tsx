
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MetricCardProps } from '@/types/dashboard';

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon, highlight = false }) => {
  return (
    <Card className={cn(
      "bg-card/50 backdrop-blur-sm", 
      highlight ? "border-purple-500/50" : "border-purple-900/20"
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <p className="text-sm text-muted-foreground">{title}</p>
          <span className={cn(
            "p-2 rounded-full", 
            highlight ? "bg-purple-500/20" : "bg-purple-500/10"
          )}>
            {icon}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className={cn(
            "text-2xl font-bold",
            highlight && "text-purple-400"
          )}>
            {value}
          </p>
          <span className={cn(
            "text-xs font-medium flex items-center",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
