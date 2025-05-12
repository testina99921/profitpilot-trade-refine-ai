
// Define the user plan type as a proper union type
export type UserPlan = "free" | "pro" | "advanced" | "elite";

export interface TradeDataEntry {
  [key: string]: string;
}

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  highlight?: boolean;
}

// Add interface for trades from Supabase
export interface Trade {
  id: string;
  user_id: string;
  symbol: string;
  entry_price: number;
  exit_price?: number;
  quantity: number;
  trade_date: string;
  status: string;
  profit_loss?: number;
  notes?: string;
  trade_type: string;
  created_at: string;
}

// Add interface for user profiles from Supabase
export interface UserProfile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  trading_style?: string;
  created_at: string;
  updated_at: string;
}

// Add interface for user settings from Supabase
export interface UserSettings {
  id: string;
  user_id: string;
  user_plan: UserPlan;
  theme?: string;
  currency?: string;
  notification_preferences?: any;
  created_at: string;
  updated_at: string;
}
