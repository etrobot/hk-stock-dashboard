export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  percentage: string;
  isPositive: boolean;
}

export interface Stock {
  name: string;
  code: string;
  price: string;
  change: string;
  percentage: string;
  isPositive: boolean;
}

export interface DividendStock extends Stock {
  dividend: string;
}

export interface StockTable {
  title: string;
  stocks: Stock[] | DividendStock[];
}

export interface SectorData {
  name: string;
  change: string;
  percentage: string;
  isPositive: boolean;
}

export interface IndexDetail {
  code: string;
  name: string;
  value: string;
  change: string;
  percentage: string;
  isPositive: boolean;
  high: string;
  low: string;
  open: string;
  close: string;
  volume: string;
  avgPrice: string;
  market: string;
  status: string;
}