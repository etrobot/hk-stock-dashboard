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

export interface DetailedStock {
  name: string;
  code: string;
  price: string;
  percentage: string;
  fiveMinPercentage: string;
  sixtyDayPercentage: string;
  ytdPercentage: string;
  change: string;
  listingDate: string;
  firstDayGain: string;
  cumulativeGain: string;
  volume: string;
  turnover: string;
  turnoverRate: string;
  pe: string;
  amplitude: string;
  marketCap: string;
  volumeRatio: string;
  bidAskRatio: string;
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