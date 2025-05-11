
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Settings, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserPlan } from '@/types/dashboard';
import { getAvailableDateRanges } from '@/utils/dashboardUtils';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  settingsOpen: boolean;
  toggleSettings: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userPlan: UserPlan;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  settingsOpen, 
  toggleSettings, 
  handleFileUpload,
  userPlan
}) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/');
  };

  return (
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
        {/* File upload button with glow effect */}
        <div className="relative">
          <input
            type="file"
            id="csv-upload"
            accept=".csv"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
          />
          <Button 
            variant="outline" 
            className="flex items-center gap-2 transition-all duration-200 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:border-purple-400"
          >
            <Upload size={16} /> Upload CSV
          </Button>
        </div>
        <button className="neo-button flex items-center gap-2">
          <Clock size={16} /> {getAvailableDateRanges(userPlan)[0].label}
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
  );
};

export default DashboardHeader;
