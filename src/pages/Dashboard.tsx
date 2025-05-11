
import React, { useState } from 'react';
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
  Users,
  ArrowLeft,
  Upload,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Define the user plan type to avoid type comparison issues
type UserPlan = "free" | "pro" | "advanced" | "elite";

// Mock user plan - in a real app, this would come from authentication
const userPlan: UserPlan = "free"; // Options: "free", "pro", "advanced", "elite"

const Dashboard = () => {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Trading style is determined based on analysis of user's trading data
  const tradingStyle = "Swing Trader";
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== "text/csv") {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would process the CSV file
    toast({
      title: "File uploaded",
      description: "Your trade data is being analyzed"
    });
    
    // Reset the file input
    e.target.value = '';
  };
  
  // Get available date ranges based on plan
  const getAvailableDateRanges = () => {
    switch(userPlan) {
      case "elite":
        return [
          { value: "7d", label: "Last 7 days" },
          { value: "30d", label: "Last 30 days" },
          { value: "90d", label: "Last 90 days" },
          { value: "180d", label: "Last 180 days" },
          { value: "1y", label: "Last year" },
          { value: "all", label: "All time" }
        ];
      case "advanced":
        return [
          { value: "7d", label: "Last 7 days" },
          { value: "30d", label: "Last 30 days" },
          { value: "90d", label: "Last 90 days" }
        ];
      case "pro":
        return [
          { value: "7d", label: "Last 7 days" },
          { value: "30d", label: "Last 30 days" }
        ];
      default: // free
        return [
          { value: "7d", label: "Last 7 days" }
        ];
    }
  };

  // Function to show upgrade modal
  const showUpgrade = () => {
    setShowUpgradeModal(true);
  };

  // Function to check if feature is available in current plan
  const isFeatureAvailable = (feature: string): boolean => {
    const proPlans: UserPlan[] = ["pro", "advanced", "elite"];
    const advancedPlans: UserPlan[] = ["advanced", "elite"];
    
    switch(feature) {
      case "risk-patterns":
        return proPlans.includes(userPlan);
      case "risk-mapping":
        return advancedPlans.includes(userPlan);
      case "real-time-alerts":
        return userPlan === "elite";
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBackClick}
              className="rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Trading Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your trading performance overview.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* File upload button */}
            <div className="relative">
              <input
                type="file"
                id="csv-upload"
                accept=".csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
              />
              <Button variant="outline" className="flex items-center gap-2">
                <Upload size={16} /> Upload CSV
              </Button>
            </div>
            <button className="neo-button flex items-center gap-2">
              <Clock size={16} /> {getAvailableDateRanges().find(r => r.value === "7d").label}
            </button>
            <button 
              className={cn(
                "p-2 rounded-lg transition-colors",
                settingsOpen 
                  ? "bg-purple-600/30 text-purple-300" 
                  : "bg-muted hover:bg-muted/80"
              )}
              onClick={toggleSettings}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {settingsOpen && (
          <Card className="mb-6 bg-card/50 backdrop-blur-sm border-purple-900/20">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Dashboard Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Date Range</label>
                  <select className="w-full mt-1 p-2 rounded bg-background border border-purple-900/30">
                    {getAvailableDateRanges().map((range) => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                  {userPlan !== "elite" && (
                    <p className="mt-1 text-xs text-purple-300">
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-xs text-purple-400"
                        onClick={() => navigate('/pricing')}
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
        )}
        
        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
          <MetricCard 
            title="Trading Style" 
            value={tradingStyle} 
            change="Best Match" 
            isPositive={true}
            icon={<Users />}
            highlight={true}
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
                      <td className="py-3 px-2">BTC</td>
                      <td className="py-3 px-2">$64,320</td>
                      <td className="py-3 px-2">$67,845</td>
                      <td className="py-3 px-2 text-green-500">+$1,762.50</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
                    </tr>
                    <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                      <td className="py-3 px-2">ETH</td>
                      <td className="py-3 px-2">$3,412.65</td>
                      <td className="py-3 px-2">$3,208.32</td>
                      <td className="py-3 px-2 text-red-500">-$615.75</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">Loss</span></td>
                    </tr>
                    <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                      <td className="py-3 px-2">SOL</td>
                      <td className="py-3 px-2">$134.14</td>
                      <td className="py-3 px-2">$155.78</td>
                      <td className="py-3 px-2 text-green-500">+$936.80</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
                    </tr>
                    <tr className="border-b border-purple-900/10 hover:bg-purple-900/5">
                      <td className="py-3 px-2">BNB</td>
                      <td className="py-3 px-2">$578.22</td>
                      <td className="py-3 px-2">$605.67</td>
                      <td className="py-3 px-2 text-green-500">+$472.50</td>
                      <td className="py-3 px-2"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs">Win</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
              {!isFeatureAvailable("risk-patterns") && (
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
                  isFeatureAvailable("risk-patterns") 
                    ? "bg-amber-500/10 border-amber-500/20" 
                    : "bg-gray-500/10 border-gray-500/20 filter blur-[2px]"
                )}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium mb-1">Risk Pattern Alert</p>
                      <p className="text-xs text-muted-foreground">Your position sizing on losing trades is 40% larger than on winning trades.</p>
                    </div>
                    {!isFeatureAvailable("risk-patterns") && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <p className="text-sm font-medium text-white">Pro Plan Feature</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Risk Mapping - Advanced plan+ feature */}
                <div className={cn(
                  "p-3 rounded-lg border",
                  isFeatureAvailable("risk-mapping") 
                    ? "bg-purple-500/10 border-purple-500/20" 
                    : "bg-gray-500/10 border-gray-500/20 filter blur-[2px]"
                )}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium mb-1">Risk Exposure Mapping</p>
                      <p className="text-xs text-muted-foreground">Your risk is concentrated in BTC. Consider diversifying with ETH and SOL trades.</p>
                    </div>
                    {!isFeatureAvailable("risk-mapping") && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <p className="text-sm font-medium text-white">Advanced Plan Feature</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Real-Time Alerts - Elite plan feature */}
                <div className={cn(
                  "p-3 rounded-lg border",
                  isFeatureAvailable("real-time-alerts") 
                    ? "bg-green-500/10 border-green-500/20" 
                    : "bg-gray-500/10 border-gray-500/20 filter blur-[2px]"
                )}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium mb-1">Real-Time AI Alert</p>
                      <p className="text-xs text-muted-foreground">BTC showing strong support at $63,500. Watch for potential reversal pattern.</p>
                    </div>
                    {!isFeatureAvailable("real-time-alerts") && (
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
const MetricCard = ({ title, value, change, isPositive, icon, highlight = false }) => {
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

export default Dashboard;
