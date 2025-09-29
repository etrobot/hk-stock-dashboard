export interface AccountOverview {
  accountNumber: string;
  accountType: string;
  totalAssets: {
    value: string;
    currency: string;
    change: string;
    percentage: string;
    isPositive: boolean;
  };
  cumulativeReturn: {
    value: string;
    currency: string;
    change: string;
    percentage: string;
    isPositive: boolean;
  };
  returnRate: {
    value: string;
    type: string;
    change: string;
    percentage: string;
    isPositive: boolean;
  };
}

export interface AssetBreakdown {
  category: string;
  percentage: string;
  color: string;
}

export interface CurrencyBreakdown {
  currency: string;
  percentage: string;
  color: string;
}

export interface PerformanceData {
  date: string;
  value: number;
  benchmark?: number;
}

export interface BenchmarkComparison {
  name: string;
  value: string;
  change: string;
  percentage: string;
  isPositive: boolean;
  color: string;
}

// Mock account data
export const accountOverview: AccountOverview = {
  accountNumber: "1612",
  accountType: "孖展账户",
  totalAssets: {
    value: "394.27",
    currency: "HKD",
    change: "+64.33",
    percentage: "+19.55%",
    isPositive: true
  },
  cumulativeReturn: {
    value: "+64.33",
    currency: "HKD",
    change: "+64.33",
    percentage: "+19.55%",
    isPositive: true
  },
  returnRate: {
    value: "+19.55%",
    type: "简单加权",
    change: "+19.55%",
    percentage: "+19.55%",
    isPositive: true
  }
};

export const assetBreakdown: AssetBreakdown[] = [
  { category: "现金", percentage: "-46.03%", color: "#2864FD" },
  { category: "股票", percentage: "63.54%", color: "#019BA8" },
  { category: "基金", percentage: "82.49%", color: "#01C583" }
];

export const currencyBreakdown: CurrencyBreakdown[] = [
  { currency: "美元", percentage: "-46.03%", color: "#2864FD" },
  { currency: "港元", percentage: "63.54%", color: "#019BA8" }
];

// Performance chart data (year to date)
export const performanceData: PerformanceData[] = [
  { date: "2025/01/01", value: 0, benchmark: 0 },
  { date: "2025/01/15", value: 2.5, benchmark: 1.2 },
  { date: "2025/02/01", value: 5.8, benchmark: 2.8 },
  { date: "2025/02/15", value: 8.2, benchmark: 4.1 },
  { date: "2025/03/01", value: 12.1, benchmark: 6.2 },
  { date: "2025/03/15", value: 15.8, benchmark: 8.9 },
  { date: "2025/04/01", value: 18.9, benchmark: 11.2 },
  { date: "2025/04/15", value: 22.3, benchmark: 13.8 },
  { date: "2025/05/01", value: 25.1, benchmark: 15.9 },
  { date: "2025/05/15", value: 28.7, benchmark: 18.2 },
  { date: "2025/06/01", value: 24.8, benchmark: 16.8 },
  { date: "2025/06/15", value: 21.2, benchmark: 14.5 },
  { date: "2025/07/01", value: 19.55, benchmark: 12.8 },
  { date: "2025/07/11", value: 19.55, benchmark: 12.8 }
];

export const benchmarkComparisons: BenchmarkComparison[] = [
  {
    name: "恒生指数",
    value: "+21.57%",
    change: "+21.57%",
    percentage: "+21.57%",
    isPositive: true,
    color: "#4770FF"
  },
  {
    name: "标普500",
    value: "+6.78%",
    change: "+6.78%",
    percentage: "+6.78%",
    isPositive: true,
    color: "#12BED9"
  },
  {
    name: "沪深300",
    value: "+2.83%",
    change: "+2.83%",
    percentage: "+2.83%",
    isPositive: true,
    color: "#90C355"
  },
  {
    name: "日经225",
    value: "-0.71%",
    change: "-0.71%",
    percentage: "-0.71%",
    isPositive: false,
    color: "#90C355"
  },
  {
    name: "海峡指数",
    value: "+8.19%",
    change: "+8.19%",
    percentage: "+8.19%",
    isPositive: true,
    color: "#7632EB"
  },
  {
    name: "纳斯达克指数",
    value: "+6.83%",
    change: "+6.83%",
    percentage: "+6.83%",
    isPositive: true,
    color: "#F897BE"
  }
];

// Time period options for the chart
export const timePeriods = [
  { label: "period.recent_1w", value: "1w" },
  { label: "period.recent_1m", value: "1m" },
  { label: "period.ytd", value: "ytd" },
  { label: "period.custom", value: "custom" }
];

// Chart view options
export const chartViews = [
  { label: "account.return_trend", value: "returns" },
  { label: "account.total_asset_trend", value: "total-asset" },
  { label: "account.earnings_calendar", value: "calendar" }
];