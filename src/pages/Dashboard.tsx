import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { UserPlan, TradeDataEntry } from '@/types/dashboard';
import { parseCSV } from '@/utils/dashboardUtils';
import { 
  calculateWinRate, 
  calculateTotalProfit, 
  calculateRiskReward, 
  calculateAvgDrawdown,
  determineTradingStyle
} from '@/services/tradeAnalysisService';

// Import all dashboard components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
import KeyMetrics from '@/components/dashboard/KeyMetrics';
import PerformanceCharts from '@/components/dashboard/PerformanceCharts';
import TradingPsychology from '@/components/dashboard/TradingPsychology';
import TopTradingHours from '@/components/dashboard/TopTradingHours';
import CommunityBenchmark from '@/components/dashboard/CommunityBenchmark';
import UploadedTradeData from '@/components/dashboard/UploadedTradeData';
import RecentTrades from '@/components/dashboard/RecentTrades';
import AIInsights from '@/components/dashboard/AIInsights';

// Mock user plan - in a real app, this would come from authentication
const userPlan: UserPlan = "free"; // Options: "free", "pro", "advanced", "elite"

// Define trade limits per plan
const TRADE_LIMITS: Record<UserPlan, number> = {
  "free": 7,  // Updated from 5 to 7 as specified
  "pro": 200,
  "advanced": 1000,
  "elite": 3000
};

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [tradeData, setTradeData] = useState<TradeDataEntry[]>([]);
  const [hasUploadedData, setHasUploadedData] = useState(false);
  const [rawTradeData, setRawTradeData] = useState<TradeDataEntry[]>([]);
  
  // Metrics state
  const [winRate, setWinRate] = useState({ value: 58.7, change: 4.3 });
  const [totalProfit, setTotalProfit] = useState({ value: 12837, change: 18.2 });
  const [riskReward, setRiskReward] = useState({ value: 2.3, change: 0.4 });
  const [avgDrawdown, setAvgDrawdown] = useState({ value: 4.2, change: -1.1 });
  const [tradingStyle, setTradingStyle] = useState("Swing Trader");
  
  // Limit trades based on user plan
  useEffect(() => {
    if (rawTradeData.length > 0) {
      const tradeLimit = TRADE_LIMITS[userPlan];
      const limitedTrades = rawTradeData.slice(0, tradeLimit);
      setTradeData(limitedTrades);
      
      if (rawTradeData.length > tradeLimit) {
        toast({
          title: "Trade limit reached",
          description: `Your ${userPlan} plan allows ${tradeLimit} trades. Upgrade to view more.`,
          variant: "default",
        });
      }
    }
  }, [rawTradeData, userPlan]);

  // Update metrics when trade data changes
  useEffect(() => {
    if (tradeData.length > 0) {
      console.log("Analyzing trade data:", tradeData);
      console.log("Sample trade:", tradeData[0]);
      
      const calculatedWinRate = calculateWinRate(tradeData);
      const calculatedProfit = calculateTotalProfit(tradeData);
      const calculatedRiskReward = calculateRiskReward(tradeData);
      const calculatedAvgDrawdown = calculateAvgDrawdown(tradeData);
      const detectedTradingStyle = determineTradingStyle(tradeData);
      
      console.log("Calculated metrics:", {
        winRate: calculatedWinRate,
        profit: calculatedProfit,
        riskReward: calculatedRiskReward,
        avgDrawdown: calculatedAvgDrawdown
      });
      
      setWinRate({ 
        value: parseFloat(calculatedWinRate.toFixed(1)), 
        // For comparison to previous period in a real app
        change: parseFloat((Math.random() * 10 - 5).toFixed(1)) 
      });
      
      setTotalProfit({ 
        value: Math.abs(calculatedProfit), 
        change: parseFloat((Math.random() * 20).toFixed(1))
      });
      
      setRiskReward({ 
        value: parseFloat(calculatedRiskReward.toFixed(1)), 
        change: parseFloat((Math.random() * 1).toFixed(1))
      });
      
      setAvgDrawdown({ 
        value: parseFloat(calculatedAvgDrawdown.toFixed(1)), 
        change: parseFloat((Math.random() * 2 - 1).toFixed(1))
      });
      
      setTradingStyle(detectedTradingStyle);
      
      console.log("Updated metrics based on uploaded data:", {
        winRate: calculatedWinRate,
        profit: calculatedProfit,
        riskReward: calculatedRiskReward,
        avgDrawdown: calculatedAvgDrawdown,
        tradingStyle: detectedTradingStyle
      });
    }
  }, [tradeData]);
  
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }
    
    // Process the CSV file
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target?.result as string;
      const parsedData = parseCSV(csvData);
      
      console.log("Parsed CSV data:", parsedData);
      if (parsedData.length === 0) {
        toast({
          title: "Empty or invalid CSV",
          description: "No valid trade data found in the CSV file",
          variant: "destructive"
        });
        return;
      }
      
      // Store the complete dataset
      setRawTradeData(parsedData);
      setHasUploadedData(true);
      
      // Apply plan limits at upload time
      const tradeLimit = TRADE_LIMITS[userPlan];
      
      if (parsedData.length > tradeLimit) {
        toast({
          title: `Trade limit reached`,
          description: `Your ${userPlan} plan allows viewing ${tradeLimit} out of ${parsedData.length} trades. Upgrade to view more.`,
          variant: "default",
        });
      }
      
      toast({
        title: "File uploaded successfully",
        description: `Processing ${Math.min(tradeLimit, parsedData.length)} trades for analysis`,
      });
    };
    
    reader.readAsText(file);
    
    // Reset the file input
    e.target.value = '';
  };

  // Calculate total trades and capped status for UI
  const totalTrades = rawTradeData.length;
  const displayedTrades = tradeData.length;
  const isCapped = totalTrades > displayedTrades;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Dashboard Header */}
        <DashboardHeader 
          settingsOpen={settingsOpen}
          toggleSettings={toggleSettings}
          handleFileUpload={handleFileUpload}
          userPlan={userPlan}
        />
        
        {/* Dashboard Settings */}
        {settingsOpen && (
          <DashboardSettings userPlan={userPlan} />
        )}
        
        {/* Display plan limits info if data is capped */}
        {isCapped && hasUploadedData && (
          <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Note:</span> Your {userPlan} plan allows viewing {displayedTrades} out of {totalTrades} uploaded trades. 
              <button className="ml-2 text-purple-400 hover:text-purple-300 underline" 
                onClick={() => setShowUpgradeModal(true)}>
                Upgrade your plan
              </button> to analyze more trades.
            </p>
          </div>
        )}
        
        {/* Key metrics */}
        <KeyMetrics 
          tradingStyle={tradingStyle} 
          winRate={`${winRate.value}%`} 
          winRateChange={`${winRate.change}%`}
          totalProfit={`$${totalProfit.value.toLocaleString()}`} 
          totalProfitChange={`${totalProfit.change}%`}
          riskReward={`1:${riskReward.value}`} 
          riskRewardChange={`${riskReward.change}`}
          avgDrawdown={`${avgDrawdown.value}%`} 
          avgDrawdownChange={`${avgDrawdown.change}%`}
        />
        
        {/* Charts row */}
        <PerformanceCharts tradeData={tradeData} hasData={hasUploadedData} />
        
        {/* Analysis section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TradingPsychology />
          <TopTradingHours />
          <CommunityBenchmark winRate={winRate.value} riskReward={riskReward.value} />
        </div>

        {/* Display uploaded CSV data */}
        <UploadedTradeData 
          tradeData={tradeData}
          hasUploadedData={hasUploadedData}
          totalTrades={totalTrades}
          displayedTrades={displayedTrades}
          userPlan={userPlan}
        />
        
        {/* Recent Trades section */}
        <RecentTrades tradeData={tradeData} hasData={hasUploadedData} />

        {/* AI Insights */}
        <AIInsights userPlan={userPlan} tradingStyle={tradingStyle} />
      </div>
    </div>
  );
};

export default Dashboard;
