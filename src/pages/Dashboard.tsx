
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

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [tradeData, setTradeData] = useState<TradeDataEntry[]>([]);
  const [hasUploadedData, setHasUploadedData] = useState(false);
  
  // Metrics state
  const [winRate, setWinRate] = useState({ value: 58.7, change: 4.3 });
  const [totalProfit, setTotalProfit] = useState({ value: 12837, change: 18.2 });
  const [riskReward, setRiskReward] = useState({ value: 2.3, change: 0.4 });
  const [avgDrawdown, setAvgDrawdown] = useState({ value: 4.2, change: -1.1 });
  const [tradingStyle, setTradingStyle] = useState("Swing Trader");
  
  // Update metrics when trade data changes
  useEffect(() => {
    if (tradeData.length > 0) {
      const calculatedWinRate = calculateWinRate(tradeData);
      const calculatedProfit = calculateTotalProfit(tradeData);
      const calculatedRiskReward = calculateRiskReward(tradeData);
      const calculatedAvgDrawdown = calculateAvgDrawdown(tradeData);
      const detectedTradingStyle = determineTradingStyle(tradeData);
      
      setWinRate({ 
        value: parseFloat(calculatedWinRate.toFixed(1)), 
        // Mocking change for now - in a real app this would compare to previous period
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
    
    if (file.type !== "text/csv") {
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
      setTradeData(parsedData);
      setHasUploadedData(true);
      
      toast({
        title: "File uploaded successfully",
        description: "Your trade data is now being analyzed",
      });
    };
    
    reader.readAsText(file);
    
    // Reset the file input
    e.target.value = '';
  };

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
        
        {/* Analysis section - Reordered as requested */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TradingPsychology />
          <TopTradingHours />
          <CommunityBenchmark winRate={winRate.value} riskReward={riskReward.value} />
        </div>

        {/* Point 7: Display uploaded CSV data */}
        <UploadedTradeData 
          tradeData={tradeData}
          hasUploadedData={hasUploadedData}
        />
        
        {/* Recent Trades section - Moved to bottom */}
        <RecentTrades tradeData={tradeData} hasData={hasUploadedData} />

        {/* AI Insights */}
        <AIInsights userPlan={userPlan} tradingStyle={tradingStyle} />
      </div>
    </div>
  );
};

export default Dashboard;
