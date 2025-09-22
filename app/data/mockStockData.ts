// Mock data for Apple stock based on MasterGo design
export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  turnover: string
  high: number
  low: number
  open: number
  previousClose: number
  afterHours?: {
    price: number
    change: number
    changePercent: number
    time: string
  }
  preMarket?: {
    price: number
    change: number
    changePercent: number
    time: string
  }
  marketCap: string
  pe: string
  timeZone: string
  market: string
  currency: string
}

export interface OrderBookData {
  asks: Array<{
    price: number
    volume: number
    total: number
  }>
  bids: Array<{
    price: number
    volume: number
    total: number
  }>
  buyVolume: number
  sellVolume: number
  buyPercentage: number
  sellPercentage: number
}

export interface TradeData {
  time: string
  price: number
  volume: number
  type: 'buy' | 'sell' | 'neutral'
  cancelled?: boolean
}

export interface NewsItem {
  title: string
  time: string
  type: 'news' | 'report'
}

// Mock stock data based on AAPL from MasterGo design
export const mockStockData: StockData = {
  symbol: 'AAPL',
  name: '苹果',
  price: 212.410,
  change: 1.270,
  changePercent: 0.60,
  volume: '4444.36万',
  turnover: '94.33亿',
  high: 213.480,
  low: 210.030,
  open: 210.505,
  previousClose: 211.140,
  afterHours: {
    price: 212.500,
    change: 0.090,
    changePercent: 0.04,
    time: '20:01 (美东)'
  },
  preMarket: {
    price: 212.320,
    change: -1.090,
    changePercent: -0.51,
    time: '22:14 (美东)'
  },
  marketCap: '3.24万亿',
  pe: '28.5',
  timeZone: '美东',
  market: 'NASDAQ',
  currency: 'USD'
}

// Mock order book data
export const mockOrderBookData: OrderBookData = {
  asks: [
    { price: 211.430, volume: 17, total: 17 },
    { price: 211.400, volume: 47, total: 64 },
    { price: 211.390, volume: 225, total: 289 },
    { price: 211.320, volume: 25, total: 314 },
  ],
  bids: [
    { price: 211.310, volume: 10, total: 10 },
    { price: 211.310, volume: 10, total: 20 },
    { price: 211.310, volume: 10, total: 30 },
    { price: 211.310, volume: 10, total: 40 },
  ],
  buyVolume: 1000000,
  sellVolume: 9000000,
  buyPercentage: 10.00,
  sellPercentage: 90.00
}

// Mock trade data
export const mockTradeData: TradeData[] = [
  { time: '16:00:00', price: 212.410, volume: 396, type: 'sell' },
  { time: '16:00:00', price: 212.410, volume: 595, type: 'sell', cancelled: true },
  { time: '16:00:00', price: 212.410, volume: 139, type: 'sell' },
  { time: '16:00:00', price: 212.410, volume: 182, type: 'sell' },
  { time: '16:00:00', price: 212.410, volume: 557, type: 'sell' },
  { time: '16:00:00', price: 212.410, volume: 57, type: 'sell', cancelled: true },
  { time: '16:00:00', price: 212.410, volume: 9, type: 'sell', cancelled: true },
  { time: '16:00:00', price: 212.410, volume: 86, type: 'sell', cancelled: true },
]

// Mock news data
export const mockNewsData: NewsItem[] = [
  {
    title: '苹果(AAPL.US)据报计划明年上半年推出廉价版iPhone、iPa…',
    time: '2025/07/11',
    type: 'news'
  },
  {
    title: '2025/07/31 盘后发布财报',
    time: '2025/07/31',
    type: 'report'
  }
]

// Mock watchlist data
export const mockWatchlistData = {
  name: '我的自选',
  stocks: [
    {
      symbol: 'NVDA',
      name: '英伟达',
      price: 164.100,
      change: 0.75,
      changePercent: 0.75,
      previousClose: 163.210,
      changeColor: 'text-green-500'
    }
  ]
}

// Chart time periods
export const chartPeriods = [
  { label: '分时', value: 'realtime' },
  { label: '5日', value: '5d' },
  { label: '日K', value: '1d', active: true },
  { label: '周K', value: '1w' },
  { label: '月K', value: '1m' },
  { label: '季K', value: '3m' },
  { label: '年K', value: '1y' },
  { label: '1分', value: '1min' },
  { label: '3分', value: '3min' },
  { label: '5分', value: '5min' },
  { label: '10分', value: '10min' },
  { label: '15分', value: '15min' },
  { label: '30分', value: '30min' },
  { label: '1小时', value: '1h' },
  { label: '2小时', value: '2h' },
  { label: '3小时', value: '3h' },
  { label: '4小时', value: '4h' },
  { label: '1月', value: '1M' },
  { label: '3月', value: '3M' },
  { label: '今年', value: 'YTD' },
  { label: '1年', value: '1Y' }
]

// Mock chart data for candlestick chart
export const mockChartData = Array.from({ length: 60 }, (_, i) => {
  const basePrice = 210 + Math.random() * 10
  const open = basePrice + (Math.random() - 0.5) * 2
  const close = open + (Math.random() - 0.5) * 3
  const high = Math.max(open, close) + Math.random() * 2
  const low = Math.min(open, close) - Math.random() * 2
  const volume = Math.floor(Math.random() * 2000000) + 500000

  return {
    time: new Date(Date.now() - (60 - i) * 24 * 60 * 60 * 1000).toISOString(),
    open,
    high,
    low,
    close,
    volume
  }
})

// Mock market indices data
export const mockMarketIndices = [
  {
    name: '恒生指数',
    value: '23900.79',
    change: '-247.28',
    changePercent: '-1.02%',
    volume: '2258亿',
    isPositive: false
  },
  {
    name: '国企指数',
    value: '8599.27',
    change: '-109.39',
    changePercent: '-1.26%',
    volume: '669亿',
    isPositive: false
  },
  {
    name: '恒生科技指数',
    value: '8599.27',
    change: '-109.39',
    changePercent: '-1.26%',
    volume: '669亿',
    isPositive: false
  },
  {
    name: '恒指当月期货',
    value: '23888',
    change: '高水13',
    changePercent: '',
    volume: '',
    isPositive: true
  }
]