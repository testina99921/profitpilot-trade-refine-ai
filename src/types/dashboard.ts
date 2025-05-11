
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
