
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  BarChart3, 
  Clock, 
  DollarSign, 
  LineChart, 
  PieChart, 
  Settings, 
  TrendingDown, 
  TrendingUp, 
  Users 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Trading Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your trading performance overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="neo-button flex items-center gap-2">
              <Clock size={16} /> Last 30 Days
            </button>
            <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Win Rate" 
            value="58.7%" 
            change="+4.3%" 
            isPositive={true}
            icon={<TrendingUp />}
          />
          <MetricCard 
            title="Total Profit" 
            value="$12,837" 
            change="+18.2%" 
            isPositive={true}
            icon={<DollarSign />}
          />
          <MetricCard 
            title="Risk/Reward" 
            value="1:2.3" 
            change="+0.4" 
            isPositive={true}
            icon={<BarChart3 />}
          />
          <MetricCard 
            title="Avg. Drawdown" 
            value="4.2%" 
            change="-1.1%" 
            isPositive={true}
            icon={<TrendingDown />}
          />
        </div>
        
        {/* Charts row */}
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
        
        {/* Analysis section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-purple-900/20">
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
                      <td className="py-3 px-2">AAPL</td>
                      <td className="py-3 px-2">$178.32</td>
                      <td className="py-3 px-2">$184.78</td>
                      <td className="py-3 px-2 text-green-500">+$642.50</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
                    </tr>
                    <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                      <td className="py-3 px-2">MSFT</td>
                      <td className="py-3 px-2">$412.65</td>
                      <td className="py-3 px-2">$408.32</td>
                      <td className="py-3 px-2 text-red-500">-$215.75</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">Loss</span></td>
                    </tr>
                    <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                      <td className="py-3 px-2">NVDA</td>
                      <td className="py-3 px-2">$892.14</td>
                      <td className="py-3 px-2">$924.78</td>
                      <td className="py-3 px-2 text-green-500">+$1,236.80</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
                    </tr>
                    <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                      <td className="py-3 px-2">META</td>
                      <td className="py-3 px-2">$478.22</td>
                      <td className="py-3 px-2">$485.67</td>
                      <td className="py-3 px-2 text-green-500">+$372.50</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm font-medium mb-1">Pattern Detected</p>
                  <p className="text-xs text-muted-foreground">You tend to exit profitable trades too early. Consider setting wider take-profit levels.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium mb-1">Opportunity</p>
                  <p className="text-xs text-muted-foreground">Your win rate for tech stocks is 72%. Consider focusing more on this sector.</p>
                </div>
                
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm font-medium mb-1">Risk Alert</p>
                  <p className="text-xs text-muted-foreground">Your position sizing on losing trades is 40% larger than on winning trades.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Bottom section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  );
};

// Metric card component
const MetricCard = ({ title, value, change, isPositive, icon }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <p className="text-sm text-muted-foreground">{title}</p>
          <span className="p-2 rounded-full bg-purple-500/10">
            {icon}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
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

export default Dashboard;
