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

// Mock user plan
const userPlan: UserPlan = "free"; // Options: "free", "pro", "advanced", "elite"

// Define trade limits per plan
const TRADE_LIMITS: Record<UserPlan, number> = {
  "free": 7,
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
  
  // Metrics state (still needed for other components)
  const [winRate, setWinRate] = useState({ value: 0, change: 0 });
  const [totalProfit, setTotalProfit] = useState({ value: 0, change: 0 });
  const [riskReward, setRiskReward] = useState({ value: 0, change: 0 });
  const [avgDrawdown, setAvgDrawdown] = useState({ value: 0, change: 0 });
  const [tradingStyle, setTradingStyle] = useState("");
  
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

  // Update metrics for other components
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
      
      const prevWinRate = winRate.value;
      const prevTotalProfit = totalProfit.value;
      const prevRiskReward = riskReward.value;
      const prevAvgDrawdown = avgDrawdown.value;
      
      setWinRate({ 
        value: parseFloat(calculatedWinRate.toFixed(1)), 
        change: prevWinRate ? parseFloat((calculatedWinRate - prevWinRate).toFixed(1)) : 0
      });
      
      setTotalProfit({ 
        value: calculatedProfit, 
        change: prevTotalProfit ? parseFloat(((calculatedProfit - prevTotalProfit) / Math.abs(prevTotalProfit) * 100).toFixed(1)) : 0
      });
      
      setRiskReward({ 
        value: parseFloat(calculatedRiskReward.toFixed(1)), 
        change: prevRiskReward ? parseFloat((calculatedRiskReward - prevRiskReward).toFixed(1)) : 0
      });
      
      setAvgDrawdown({ 
        value: parseFloat(calculatedAvgDrawdown.toFixed(1)), 
        change: prevAvgDrawdown ? parseFloat((calculatedAvgDrawdown - prevAvgDrawdown).toFixed(1)) : 0
      });
      
      setTradingStyle(detectedTradingStyle);
      
      console.log("Updated metrics:", {
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
      
      setRawTradeData(parsedData);
      setHasUploadedData(true);
      
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
    e.target.value = '';
  };

  const totalTrades = rawTradeData.length;
  const displayedTrades = tradeData.length;
  const isCapped = totalTrades > displayedTrades;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-[1400px] mx-auto">
        <DashboardHeader 
          settingsOpen={settingsOpen}
          toggleSettings={toggleSettings}
          handleFileUpload={handleFileUpload}
          userPlan={userPlan}
        />
        
        {settingsOpen && (
          <DashboardSettings userPlan={userPlan} />
        )}
        
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
        
        <KeyMetrics 
          tradeData={tradeData} // Added
          tradingStyle={tradingStyle} 
          winRate={`${winRate.value}%`} // Fallback
          winRateChange={`${winRate.change}%`}
          totalProfit={`$${totalProfit.value.toLocaleString()}`} 
          totalProfitChange={`${totalProfit.change}%`}
          riskReward={`1:${riskReward.value}`} 
          riskRewardChange={`${riskReward.change}`}
          avgDrawdown={`${avgDrawdown.value}%`} 
          avgDrawdownChange={`${avgDrawdown.change}%`}
        />
        
        <PerformanceCharts tradeData={tradeData} hasData={hasUploadedData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TradingPsychology winRate={winRate.value} totalProfit={totalProfit.value} />
          <TopTradingHours tradeData={tradeData} hasData={hasUploadedData} />
          <CommunityBenchmark winRate={winRate.value} riskReward={riskReward.value} />
        </div>

        <UploadedTradeData 
          tradeData={tradeData}
          hasUploadedData={hasUploadedData}
          totalTrades={totalTrades}
          displayedTrades={displayedTrades}
          userPlan={userPlan}
        />
        
        <RecentTrades tradeData={tradeData} hasData={hasUploadedData} />

        <AIInsights 
          userPlan={userPlan} 
          tradingStyle={tradingStyle} 
          tradeData={tradeData}
          winRate={winRate.value}
          totalProfit={totalProfit.value}
          riskReward={riskReward.value}
        />
      </div>
    </div>
  );
};

export default Dashboard;
