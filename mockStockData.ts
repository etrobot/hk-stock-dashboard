export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  previousClose: number
  open: number
  high: number
  low: number
  volume: number
  turnover: number
  marketCap: number
  peRatio?: number
  dividendYield?: number
  tradingStatus: string
}

export interface MarketIndex {
  name: string
  value: number
  change: number
  percentage: number
  isPositive: boolean
}

// Mock stock data
export const mockStockData: StockData = {
  symbol: '00001',
  name: '长和',
  price: 45.85,
  change: 0.65,
  changePercent: 1.44,
  previousClose: 45.20,
  open: 45.30,
  high: 46.10,
  low: 45.25,
  volume: 12345678,
  turnover: 567890000,
  marketCap: 175000000000,
  peRatio: 12.3,
  dividendYield: 3.5,
  tradingStatus: '交易中'
}

// Mock market indices
export const mockMarketIndices: any[] = [
  {
    name: '恒生指数',
    value: 18000,
    change: -1.2,
    changePercent: -1.2,
    isPositive: false
  },
  {
    name: '国企指数',
    value: 12000,
    change: 0.5,
    changePercent: 0.5,
    isPositive: true
  }
]