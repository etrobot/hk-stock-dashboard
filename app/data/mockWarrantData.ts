// Mock data for 轮证 (衍生权证 + 牛熊证) list
export type WarrantType = '认购' | '认沽' | '牛证' | '熊证'

export interface Warrant {
  code: string
  name: string
  type: WarrantType
  latestPrice: number
  change: number
  changePercent: number
  volume: string
  turnover: string
  effectiveLeverage: number // 有效杠杆
  leverageRatio: number // 杠杆比率(倍)
  callPrice?: number // 收回价 (牛熊证)
  strikePrice: number // 行使价
  upperPrice?: number // 上限价
  lowerPrice?: number // 下限价
  lastTradingDay: string // 最后交易日
  streetRatio: number // 街货比(%)
  streetVolume: string // 街货量
  status: string // 状态
  premium: number // 溢价(%)
  sensitivity: number // 敏感度
  priceDistanceCall: number // 正股价距收回价(%)
  breakeven: number // 打和点
  amplitude: number // 振幅(%)
  delta: number // 对冲值
  expiryDate: string // 到期日
  listingDate: string // 上市日期
  bidPrice: number // 买入价
  askPrice: number // 卖出价
  bidVolume: string // 买量
  askVolumeType: string // 卖量类型
  impliedVolatility: number // 引申波幅(%)
  inOut: string // 价内/价外
  conversionPrice: number // 换股价
  conversionRatio: number // 换股比率
  lotSize: number // 每手
  issuer: string // 发行人
  issuanceVolume: string // 发行量
  expiryMonths: number // 距到期月数(用于筛选)
}

// 每只轮证的锚定标的（underlying）代码
export const warrantUnderlying: Record<string, string> = {
  '26622': '0388', // 港交所
  '25897': '0700', // 腾讯
  '60087': 'HSI', // 恒指
  '60892': 'HSI',
  '27231': '9988', // 阿里
  '61555': '0700',
  '62089': '0388',
  '27840': '1299', // 友邦
  '62833': '2020', // 安踏
  '63412': 'HSI',
  '28056': '1211', // 比亚迪
  '64005': '3690', // 美团
  '28342': '1093', // 石药
  '64678': '0700',
  '28650': '1810', // 小米
  '65330': 'HSI',
}

export const mockWarrantData: Warrant[] = [
  {
    code: '26622', name: '港交摩通四八购A', type: '认购', latestPrice: 0.123, change: 0.012, changePercent: 10.81,
    volume: '1.24亿', turnover: '1523万', effectiveLeverage: 8.2, leverageRatio: 15.3,
    strikePrice: 320.00, lastTradingDay: '2026-08-22', streetRatio: 18.5, streetVolume: '1850万',
    status: '交易中', premium: 12.5, sensitivity: 0.31, priceDistanceCall: 8.4, breakeven: 332.30,
    amplitude: 22.4, delta: 0.54, expiryDate: '2026-08-28', listingDate: '2026-02-10',
    bidPrice: 0.122, askPrice: 0.124, bidVolume: '600万', askVolumeType: '委托',
    impliedVolatility: 38.2, inOut: '价外', conversionPrice: 320.00, conversionRatio: 100,
    lotSize: 5000, issuer: '摩通', issuanceVolume: '1.00亿', expiryMonths: 2
  },
  {
    code: '25897', name: '腾讯瑞银四八沽A', type: '认沽', latestPrice: 0.045, change: -0.004, changePercent: -8.16,
    volume: '9800万', turnover: '441万', effectiveLeverage: 6.8, leverageRatio: 11.2,
    strikePrice: 240.00, lastTradingDay: '2026-08-20', streetRatio: 35.2, streetVolume: '3520万',
    status: '交易中', premium: -5.3, sensitivity: 0.22, priceDistanceCall: 12.1, breakeven: 235.50,
    amplitude: 18.6, delta: -0.42, expiryDate: '2026-08-26', listingDate: '2026-02-03',
    bidPrice: 0.044, askPrice: 0.046, bidVolume: '300万', askVolumeType: '委托',
    impliedVolatility: 45.6, inOut: '价内', conversionPrice: 240.00, conversionRatio: 100,
    lotSize: 5000, issuer: '瑞银', issuanceVolume: '1.00亿', expiryMonths: 2
  },
  {
    code: '60087', name: '恒指法兴四八牛C', type: '牛证', latestPrice: 0.118, change: 0.006, changePercent: 5.36,
    volume: '2.01亿', turnover: '2370万', effectiveLeverage: 5.5, leverageRatio: 20.1,
    callPrice: 23800, strikePrice: 23300, lastTradingDay: '2026-08-30', streetRatio: 8.9, streetVolume: '890万',
    status: '交易中', premium: 1.2, sensitivity: 0.18, priceDistanceCall: 4.2, breakeven: 24020.00,
    amplitude: 12.8, delta: 0.95, expiryDate: '2026-08-31', listingDate: '2026-02-18',
    bidPrice: 0.117, askPrice: 0.119, bidVolume: '800万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 10000, conversionRatio: 10000,
    lotSize: 10000, issuer: '法兴', issuanceVolume: '1.00亿', expiryMonths: 3
  },
  {
    code: '60892', name: '恒指摩通四八熊E', type: '熊证', latestPrice: 0.021, change: 0.001, changePercent: 5.00,
    volume: '3.55亿', turnover: '746万', effectiveLeverage: 9.8, leverageRatio: 34.5,
    callPrice: 24750, strikePrice: 25250, lastTradingDay: '2026-08-29', streetRatio: 42.3, streetVolume: '4230万',
    status: '交易中', premium: -2.1, sensitivity: 0.09, priceDistanceCall: 3.6, breakeven: 25450.00,
    amplitude: 28.9, delta: -0.98, expiryDate: '2026-08-30', listingDate: '2026-02-25',
    bidPrice: 0.020, askPrice: 0.022, bidVolume: '1500万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 10000, conversionRatio: 10000,
    lotSize: 10000, issuer: '摩通', issuanceVolume: '1.00亿', expiryMonths: 3
  },
  {
    code: '27231', name: '阿里法巴四九购A', type: '认购', latestPrice: 0.086, change: 0.009, changePercent: 11.69,
    volume: '6800万', turnover: '585万', effectiveLeverage: 7.1, leverageRatio: 13.8,
    strikePrice: 95.00, lastTradingDay: '2026-09-12', streetRatio: 22.7, streetVolume: '2270万',
    status: '交易中', premium: 14.8, sensitivity: 0.35, priceDistanceCall: 10.2, breakeven: 103.60,
    amplitude: 25.1, delta: 0.48, expiryDate: '2026-09-18', listingDate: '2026-03-02',
    bidPrice: 0.085, askPrice: 0.087, bidVolume: '400万', askVolumeType: '委托',
    impliedVolatility: 41.5, inOut: '价外', conversionPrice: 95.00, conversionRatio: 100,
    lotSize: 5000, issuer: '法巴', issuanceVolume: '1.50亿', expiryMonths: 4
  },
  {
    code: '61555', name: '腾讯中银四九牛A', type: '牛证', latestPrice: 0.052, change: 0.002, changePercent: 4.00,
    volume: '1.80亿', turnover: '936万', effectiveLeverage: 6.2, leverageRatio: 24.8,
    callPrice: 240, strikePrice: 235, lastTradingDay: '2026-09-30', streetRatio: 15.4, streetVolume: '1540万',
    status: '交易中', premium: 0.8, sensitivity: 0.16, priceDistanceCall: 2.1, breakeven: 270.00,
    amplitude: 15.6, delta: 0.96, expiryDate: '2026-09-30', listingDate: '2026-03-15',
    bidPrice: 0.051, askPrice: 0.053, bidVolume: '900万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 100, conversionRatio: 100,
    lotSize: 10000, issuer: '中银', issuanceVolume: '2.00亿', expiryMonths: 4
  },
  {
    code: '62089', name: '港交高盛四九熊A', type: '熊证', latestPrice: 0.033, change: -0.003, changePercent: -8.33,
    volume: '2.47亿', turnover: '815万', effectiveLeverage: 11.4, leverageRatio: 29.6,
    callPrice: 335, strikePrice: 342, lastTradingDay: '2026-09-26', streetRatio: 28.1, streetVolume: '2810万',
    status: '交易中', premium: -3.4, sensitivity: 0.08, priceDistanceCall: 4.5, breakeven: 344.80,
    amplitude: 31.2, delta: -0.97, expiryDate: '2026-09-28', listingDate: '2026-03-21',
    bidPrice: 0.032, askPrice: 0.034, bidVolume: '1100万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 100, conversionRatio: 100,
    lotSize: 10000, issuer: '高盛', issuanceVolume: '1.20亿', expiryMonths: 5
  },
  {
    code: '27840', name: '友邦汇丰五十购A', type: '认购', latestPrice: 0.141, change: 0.010, changePercent: 7.63,
    volume: '5420万', turnover: '764万', effectiveLeverage: 5.8, leverageRatio: 10.4,
    strikePrice: 78.00, lastTradingDay: '2026-10-23', streetRatio: 11.3, streetVolume: '1130万',
    status: '交易中', premium: 9.6, sensitivity: 0.27, priceDistanceCall: 6.8, breakeven: 85.50,
    amplitude: 19.7, delta: 0.41, expiryDate: '2026-10-30', listingDate: '2026-04-26',
    bidPrice: 0.140, askPrice: 0.142, bidVolume: '350万', askVolumeType: '委托',
    impliedVolatility: 33.8, inOut: '价外', conversionPrice: 78.00, conversionRatio: 100,
    lotSize: 5000, issuer: '汇丰', issuanceVolume: '8000万', expiryMonths: 6
  },
  {
    code: '62833', name: '安踏摩通四乙牛A', type: '牛证', latestPrice: 0.062, change: 0.004, changePercent: 6.90,
    volume: '1.63亿', turnover: '1011万', effectiveLeverage: 7.7, leverageRatio: 21.3,
    callPrice: 75, strikePrice: 71, lastTradingDay: '2026-12-30', streetRatio: 9.6, streetVolume: '960万',
    status: '交易中', premium: 3.1, sensitivity: 0.12, priceDistanceCall: 5.6, breakeven: 88.00,
    amplitude: 20.4, delta: 0.94, expiryDate: '2026-12-31', listingDate: '2026-06-18',
    bidPrice: 0.061, askPrice: 0.063, bidVolume: '600万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 100, conversionRatio: 100,
    lotSize: 10000, issuer: '摩通', issuanceVolume: '1.50亿', expiryMonths: 10
  },
  {
    code: '63412', name: '恒指法巴二十五熊A', type: '熊证', latestPrice: 0.018, change: 0.000, changePercent: 0.00,
    volume: '4.02亿', turnover: '724万', effectiveLeverage: 15.2, leverageRatio: 42.1,
    callPrice: 25200, strikePrice: 25700, lastTradingDay: '2026-12-24', streetRatio: 51.7, streetVolume: '5170万',
    status: '交易中', premium: -4.8, sensitivity: 0.06, priceDistanceCall: 5.4, breakeven: 25900.00,
    amplitude: 36.5, delta: -0.99, expiryDate: '2026-12-30', listingDate: '2026-06-30',
    bidPrice: 0.017, askPrice: 0.019, bidVolume: '2000万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 10000, conversionRatio: 10000,
    lotSize: 10000, issuer: '法巴', issuanceVolume: '2.00亿', expiryMonths: 11
  },
  {
    code: '28056', name: '比亚迪麦格理财一购A', type: '认购', latestPrice: 0.198, change: 0.021, changePercent: 11.86,
    volume: '4320万', turnover: '855万', effectiveLeverage: 4.9, leverageRatio: 8.6,
    strikePrice: 260.00, lastTradingDay: '2027-01-15', streetRatio: 6.2, streetVolume: '620万',
    status: '交易中', premium: 7.4, sensitivity: 0.19, priceDistanceCall: 4.9, breakeven: 279.80,
    amplitude: 17.3, delta: 0.33, expiryDate: '2027-01-22', listingDate: '2026-07-20',
    bidPrice: 0.197, askPrice: 0.199, bidVolume: '280万', askVolumeType: '委托',
    impliedVolatility: 29.4, inOut: '价内', conversionPrice: 260.00, conversionRatio: 100,
    lotSize: 2500, issuer: '麦格理', issuanceVolume: '6000万', expiryMonths: 14
  },
  {
    code: '64005', name: '美团摩通二六牛A', type: '牛证', latestPrice: 0.186, change: 0.015, changePercent: 8.77,
    volume: '1.12亿', turnover: '2083万', effectiveLeverage: 4.2, leverageRatio: 12.6,
    callPrice: 120, strikePrice: 115, lastTradingDay: '2027-02-26', streetRatio: 7.4, streetVolume: '740万',
    status: '交易中', premium: 4.5, sensitivity: 0.10, priceDistanceCall: 3.2, breakeven: 141.00,
    amplitude: 22.8, delta: 0.92, expiryDate: '2027-02-28', listingDate: '2026-08-12',
    bidPrice: 0.185, askPrice: 0.187, bidVolume: '500万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 100, conversionRatio: 100,
    lotSize: 10000, issuer: '摩通', issuanceVolume: '1.80亿', expiryMonths: 15
  },
  {
    code: '28342', name: '石药瑞银二六购A', type: '认购', latestPrice: 0.074, change: 0.008, changePercent: 12.12,
    volume: '3210万', turnover: '238万', effectiveLeverage: 6.4, leverageRatio: 11.9,
    strikePrice: 8.50, lastTradingDay: '2027-03-05', streetRatio: 19.8, streetVolume: '1980万',
    status: '交易中', premium: 16.2, sensitivity: 0.30, priceDistanceCall: 11.4, breakeven: 9.24,
    amplitude: 26.7, delta: 0.45, expiryDate: '2027-03-12', listingDate: '2026-08-28',
    bidPrice: 0.073, askPrice: 0.075, bidVolume: '320万', askVolumeType: '委托',
    impliedVolatility: 40.1, inOut: '价外', conversionPrice: 8.50, conversionRatio: 10,
    lotSize: 5000, issuer: '瑞银', issuanceVolume: '9000万', expiryMonths: 17
  },
  {
    code: '64678', name: '腾讯海通三一熊B', type: '熊证', latestPrice: 0.026, change: -0.002, changePercent: -7.14,
    volume: '2.86亿', turnover: '744万', effectiveLeverage: 13.6, leverageRatio: 38.7,
    callPrice: 385, strikePrice: 392, lastTradingDay: '2027-01-15', streetRatio: 33.6, streetVolume: '3360万',
    status: '交易中', premium: -5.9, sensitivity: 0.05, priceDistanceCall: 6.6, breakeven: 395.00,
    amplitude: 33.1, delta: -0.98, expiryDate: '2027-01-20', listingDate: '2026-07-15',
    bidPrice: 0.025, askPrice: 0.027, bidVolume: '1300万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 100, conversionRatio: 100,
    lotSize: 10000, issuer: '海通', issuanceVolume: '1.20亿', expiryMonths: 13
  },
  {
    code: '28650', name: '小米花旗三三购B', type: '认购', latestPrice: 0.112, change: 0.011, changePercent: 10.89,
    volume: '5680万', turnover: '636万', effectiveLeverage: 5.2, leverageRatio: 9.4,
    strikePrice: 23.00, lastTradingDay: '2027-03-30', streetRatio: 25.3, streetVolume: '2530万',
    status: '交易中', premium: 13.9, sensitivity: 0.24, priceDistanceCall: 9.8, breakeven: 25.40,
    amplitude: 22.2, delta: 0.39, expiryDate: '2027-04-01', listingDate: '2026-09-01',
    bidPrice: 0.111, askPrice: 0.113, bidVolume: '380万', askVolumeType: '委托',
    impliedVolatility: 35.7, inOut: '价外', conversionPrice: 23.50, conversionRatio: 10,
    lotSize: 5000, issuer: '花旗', issuanceVolume: '1.00亿', expiryMonths: 19
  },
  {
    code: '65330', name: '恒指瑞银三六熊C', type: '熊证', latestPrice: 0.015, change: 0.001, changePercent: 7.14,
    volume: '3.21亿', turnover: '482万', effectiveLeverage: 18.4, leverageRatio: 46.8,
    callPrice: 26000, strikePrice: 26500, lastTradingDay: '2027-06-28', streetRatio: 60.2, streetVolume: '6020万',
    status: '交易中', premium: -6.4, sensitivity: 0.04, priceDistanceCall: 8.8, breakeven: 26700.00,
    amplitude: 39.4, delta: -0.99, expiryDate: '2027-06-30', listingDate: '2026-12-03',
    bidPrice: 0.014, askPrice: 0.016, bidVolume: '2500万', askVolumeType: '委托',
    impliedVolatility: 0, inOut: '价内', conversionPrice: 10000, conversionRatio: 10000,
    lotSize: 10000, issuer: '瑞银', issuanceVolume: '2.50亿', expiryMonths: 22
  },
]