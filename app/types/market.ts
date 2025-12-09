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
  symbol: string;
  name: string;
  last: string;
  change: string;
  changeRate: string;
  volume: string;
  amount: string;
  perTtm: string;
  turnoverRate: string;
  amplitude: string;
  volumeRate: string;
  bidAskRate: string;
  totalMarketValue: string;
  yearChangeRate: string;
  week52High: string;
  week52Low: string;
  min5Change: string;
  min5ChangeRate: string;
  min5Volume: string;
  min5Amount: string;
  min5Amplitude: string;
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