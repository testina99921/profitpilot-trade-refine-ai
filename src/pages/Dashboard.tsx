
import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { UserPlan, TradeDataEntry } from '@/types/dashboard';
import { parseCSV } from '@/utils/dashboardUtils';

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
  
  // Trading style is determined based on analysis of user's trading data
  const tradingStyle = "Swing Trader";
  
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
        description: "Your trade data is now displayed on the dashboard",
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
        <KeyMetrics tradingStyle={tradingStyle} />
        
        {/* Charts row */}
        <PerformanceCharts />
        
        {/* Analysis section - Reordered as requested */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TradingPsychology />
          <TopTradingHours />
          <CommunityBenchmark />
        </div>

        {/* Point 7: Display uploaded CSV data */}
        <UploadedTradeData 
          tradeData={tradeData}
          hasUploadedData={hasUploadedData}
        />
        
        {/* Recent Trades section - Moved to bottom */}
        <RecentTrades />

        {/* AI Insights */}
        <AIInsights userPlan={userPlan} tradingStyle={tradingStyle} />
      </div>
    </div>
  );
};

export default Dashboard;
