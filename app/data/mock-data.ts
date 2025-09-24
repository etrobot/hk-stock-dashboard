import { MarketIndex, Stock, DividendStock, SectorData, IndexDetail } from "../types/market";

export const hkIndices: MarketIndex[] = [
  {
    name: "恒生指数",
    value: "28,436.81",
    change: "+234.56",
    percentage: "+0.83%",
    isPositive: true,
  },
  {
    name: "恒生科技指数",
    value: "6,789.45", 
    change: "+67.89",
    percentage: "+1.01%",
    isPositive: true,
  },
  {
    name: "恒生国企指数",
    value: "10,234.67",
    change: "+123.45",
    percentage: "+1.22%",
    isPositive: true,
  },
  {
    name: "国企指数",
    value: "3,456.78",
    change: "+45.67",
    percentage: "+1.34%",
    isPositive: true,
  },
];

export const cnIndices: MarketIndex[] = [
  {
    name: "上证指数",
    value: "3,568.17",
    change: "+23.45",
    percentage: "+0.66%",
    isPositive: true,
  },
  {
    name: "深证成指",
    value: "14,567.89",
    change: "-45.67",
    percentage: "-0.31%",
    isPositive: false,
  },
  {
    name: "创业板指",
    value: "3,234.56",
    change: "+12.34",
    percentage: "+0.38%",
    isPositive: true,
  },
  {
    name: "沪深300",
    value: "5,123.45",
    change: "-23.45",
    percentage: "-0.46%",
    isPositive: false,
  },
];

export const cnGainers: Stock[] = [
  { name: "贵州茅台", code: "600519", price: "1,678.90", change: "+89.12", percentage: "+5.61%", isPositive: true },
  { name: "中国平安", code: "601318", price: "45.67", change: "+2.34", percentage: "+5.40%", isPositive: true },
  { name: "招商银行", code: "600036", price: "38.90", change: "+1.89", percentage: "+5.10%", isPositive: true },
  { name: "五粮液", code: "000858", price: "156.78", change: "+7.23", percentage: "+4.84%", isPositive: true },
  { name: "比亚迪", code: "002594", price: "234.56", change: "+10.45", percentage: "+4.66%", isPositive: true }
];

export const cnLosers: Stock[] = [
  { name: "万科A", code: "000002", price: "12.34", change: "-0.89", percentage: "-6.72%", isPositive: false },
  { name: "保利地产", code: "600048", price: "8.90", change: "-0.56", percentage: "-5.92%", isPositive: false },
  { name: "华夏幸福", code: "600340", price: "5.67", change: "-0.34", percentage: "-5.66%", isPositive: false },
  { name: "融创中国", code: "01918", price: "3.45", change: "-0.23", percentage: "-6.25%", isPositive: false },
  { name: "恒大集团", code: "03333", price: "1.23", change: "-0.12", percentage: "-8.89%", isPositive: false }
];

export const cnHotStocks: Stock[] = [
  { name: "宁德时代", code: "300750", price: "456.78", change: "+23.45", percentage: "+5.41%", isPositive: true },
  { name: "隆基绿能", code: "601012", price: "23.45", change: "+1.12", percentage: "+5.02%", isPositive: true },
  { name: "药明康德", code: "603259", price: "67.89", change: "+3.21", percentage: "+4.96%", isPositive: true },
  { name: "迈瑞医疗", code: "300760", price: "289.12", change: "+13.45", percentage: "+4.88%", isPositive: true },
  { name: "海康威视", code: "002415", price: "34.56", change: "+1.56", percentage: "+4.73%", isPositive: true }
];

export const cnDividendStocks: DividendStock[] = [
  { name: "中国石化", code: "600028", price: "4.56", change: "+0.12", percentage: "+2.70%", isPositive: true, dividend: "8.9%" },
  { name: "中国石油", code: "601857", price: "5.67", change: "+0.23", percentage: "+4.23%", isPositive: true, dividend: "7.8%" },
  { name: "农业银行", code: "601288", price: "3.45", change: "+0.08", percentage: "+2.38%", isPositive: true, dividend: "6.5%" },
  { name: "工商银行", code: "601398", price: "4.89", change: "+0.15", percentage: "+3.16%", isPositive: true, dividend: "6.2%" },
  { name: "建设银行", code: "601939", price: "6.12", change: "+0.19", percentage: "+3.20%", isPositive: true, dividend: "5.8%" }
];

export const cnSectors: SectorData[] = [
  { name: "新能源", change: "+3.2%", percentage: "+3.2%", isPositive: true },
  { name: "半导体", change: "+2.8%", percentage: "+2.8%", isPositive: true },
  { name: "医药", change: "+1.5%", percentage: "+1.5%", isPositive: true },
  { name: "银行", change: "-0.8%", percentage: "-0.8%", isPositive: false },
  { name: "地产", change: "-2.1%", percentage: "-2.1%", isPositive: false },
  { name: "钢铁", change: "-3.5%", percentage: "-3.5%", isPositive: false }
];

export const hkGainers: Stock[] = [
  { name: "腾讯控股", code: "00700", price: "378.60", change: "+12.40", percentage: "+3.39%", isPositive: true },
  { name: "阿里巴巴", code: "09988", price: "89.15", change: "+2.85", percentage: "+3.30%", isPositive: true },
  { name: "美团", code: "03690", price: "156.80", change: "+4.60", percentage: "+3.02%", isPositive: true },
  { name: "小米集团", code: "01810", price: "18.92", change: "+0.52", percentage: "+2.83%", isPositive: true },
  { name: "比亚迪股份", code: "01211", price: "245.20", change: "+6.40", percentage: "+2.68%", isPositive: true }
];

export const hkLosers: Stock[] = [
  { name: "中国恒大", code: "03333", price: "0.285", change: "-0.025", percentage: "-8.06%", isPositive: false },
  { name: "融创中国", code: "01918", price: "1.82", change: "-0.14", percentage: "-7.14%", isPositive: false },
  { name: "碧桂园", code: "02007", price: "0.95", change: "-0.07", percentage: "-6.86%", isPositive: false },
  { name: "中国金茂", code: "00817", price: "0.68", change: "-0.05", percentage: "-6.85%", isPositive: false },
  { name: "世茂集团", code: "00813", price: "1.23", change: "-0.08", percentage: "-6.11%", isPositive: false }
];

export const hkHotStocks: Stock[] = [
  { name: "汇丰控股", code: "00005", price: "62.45", change: "+1.25", percentage: "+2.04%", isPositive: true },
  { name: "中国移动", code: "00941", price: "78.90", change: "+1.50", percentage: "+1.94%", isPositive: true },
  { name: "建设银行", code: "00939", price: "5.89", change: "+0.11", percentage: "+1.90%", isPositive: true },
  { name: "工商银行", code: "01398", price: "4.56", change: "+0.08", percentage: "+1.79%", isPositive: true },
  { name: "中国平安", code: "02318", price: "45.30", change: "+0.80", percentage: "+1.80%", isPositive: true }
];

export const usIndices: MarketIndex[] = [
  {
    name: "道琼斯指数",
    value: "35,819.56",
    change: "+152.68",
    percentage: "+0.43%",
    isPositive: true,
  },
  {
    name: "纳斯达克指数",
    value: "15,498.39",
    change: "+23.78",
    percentage: "+0.15%",
    isPositive: true,
  },
  {
    name: "标普500指数",
    value: "4,701.46",
    change: "+8.96",
    percentage: "+0.19%",
    isPositive: true,
  },
  {
    name: "罗素2000指数",
    value: "2,245.31",
    change: "-12.45",
    percentage: "-0.55%",
    isPositive: false,
  },
];

export const usGainers: Stock[] = [
  { name: "苹果公司", code: "AAPL", price: "$149.80", change: "+$4.25", percentage: "+2.92%", isPositive: true },
  { name: "微软", code: "MSFT", price: "$331.62", change: "+$8.47", percentage: "+2.62%", isPositive: true },
  { name: "特斯拉", code: "TSLA", price: "$1,088.47", change: "+$25.63", percentage: "+2.41%", isPositive: true },
  { name: "亚马逊", code: "AMZN", price: "$3,372.20", change: "+$67.85", percentage: "+2.05%", isPositive: true },
  { name: "谷歌", code: "GOOGL", price: "$2,891.84", change: "+$52.16", percentage: "+1.84%", isPositive: true }
];

export const usLosers: Stock[] = [
  { name: "Meta", code: "META", price: "$338.54", change: "-$12.67", percentage: "-3.61%", isPositive: false },
  { name: "奈飞", code: "NFLX", price: "$385.15", change: "-$13.28", percentage: "-3.33%", isPositive: false },
  { name: "英伟达", code: "NVDA", price: "$284.91", change: "-$9.45", percentage: "-3.21%", isPositive: false },
  { name: "AMD", code: "AMD", price: "$143.90", change: "-$4.52", percentage: "-3.05%", isPositive: false },
  { name: "Zoom", code: "ZM", price: "$189.39", change: "-$5.67", percentage: "-2.91%", isPositive: false }
];

export const usHotStocks: Stock[] = [
  { name: "GameStop", code: "GME", price: "$158.78", change: "+$15.23", percentage: "+10.61%", isPositive: true },
  { name: "AMC娱乐", code: "AMC", price: "$22.46", change: "+$2.18", percentage: "+10.74%", isPositive: true },
  { name: "Palantir", code: "PLTR", price: "$18.35", change: "+$1.67", percentage: "+10.01%", isPositive: true },
  { name: "Rivian", code: "RIVN", price: "$103.69", change: "+$8.92", percentage: "+9.42%", isPositive: true },
  { name: "Lucid Motors", code: "LCID", price: "$38.44", change: "+$3.12", percentage: "+8.84%", isPositive: true }
];

export const usDividendStocks: DividendStock[] = [
  { name: "可口可乐", code: "KO", price: "$56.23", change: "+$0.45", percentage: "+0.81%", isPositive: true, dividend: "3.1%" },
  { name: "强生", code: "JNJ", price: "$161.19", change: "+$1.23", percentage: "+0.77%", isPositive: true, dividend: "2.6%" },
  { name: "宝洁", code: "PG", price: "$156.39", change: "+$0.89", percentage: "+0.57%", isPositive: true, dividend: "2.4%" },
  { name: "埃克森美孚", code: "XOM", price: "$61.94", change: "+$1.45", percentage: "+2.40%", isPositive: true, dividend: "5.8%" },
  { name: "AT&T", code: "T", price: "$25.42", change: "+$0.18", percentage: "+0.71%", isPositive: true, dividend: "7.4%" }
];

export const hkSectors: SectorData[] = [
  { name: "科技", change: "+2.8%", percentage: "+2.8%", isPositive: true },
  { name: "金融", change: "+1.2%", percentage: "+1.2%", isPositive: true },
  { name: "地产", change: "-0.5%", percentage: "-0.5%", isPositive: false },
  { name: "能源", change: "+3.1%", percentage: "+3.1%", isPositive: true },
  { name: "医药", change: "+1.8%", percentage: "+1.8%", isPositive: true },
  { name: "消费", change: "-1.2%", percentage: "-1.2%", isPositive: false }
];

export const usSectors: SectorData[] = [
  { name: "科技", change: "+2.5%", percentage: "+2.5%", isPositive: true },
  { name: "金融", change: "+1.8%", percentage: "+1.8%", isPositive: true },
  { name: "医疗", change: "+0.9%", percentage: "+0.9%", isPositive: true },
  { name: "能源", change: "-0.7%", percentage: "-0.7%", isPositive: false },
  { name: "消费", change: "+1.2%", percentage: "+1.2%", isPositive: true },
  { name: "工业", change: "+0.5%", percentage: "+0.5%", isPositive: true }
];

export const hkIndexDetail: IndexDetail = {
  code: "800000",
  name: "恒生指数",
  value: "28,436.81",
  change: "+234.56",
  percentage: "+0.83%",
  isPositive: true,
  high: "28,519.53",
  low: "28,133.12",
  open: "28,233.12",
  close: "28,202.25",
  volume: "884.33亿",
  avgPrice: "28,326.33",
  market: "港股",
  status: "交易中 07/11 10:17:52"
};

export const cnIndexDetail: IndexDetail = {
  code: "000001",
  name: "上证指数",
  value: "3,568.17",
  change: "+23.45",
  percentage: "+0.66%",
  isPositive: true,
  high: "3,589.42",
  low: "3,545.67",
  open: "3,556.78",
  close: "3,544.72",
  volume: "2,156.89亿",
  avgPrice: "3,567.45",
  market: "沪深",
  status: "交易中 07/11 14:30:25"
};

export const usIndexDetail: IndexDetail = {
  code: "DJI",
  name: "道琼斯指数",
  value: "35,819.56",
  change: "+152.68",
  percentage: "+0.43%",
  isPositive: true,
  high: "35,892.34",
  low: "35,687.12",
  open: "35,723.45",
  close: "35,666.88",
  volume: "$45.67B",
  avgPrice: "35,789.23",
  market: "美股",
  status: "交易中 EST 09:45:12"
};

export const cryptoIndices: MarketIndex[] = [
  {
    name: "比特币",
    value: "$43,256.78",
    change: "+$1,234.56",
    percentage: "+2.94%",
    isPositive: true,
  },
  {
    name: "以太坊",
    value: "$2,678.90",
    change: "+$89.45",
    percentage: "+3.46%",
    isPositive: true,
  },
  {
    name: "币安币",
    value: "$312.45",
    change: "-$8.67",
    percentage: "-2.70%",
    isPositive: false,
  },
  {
    name: "瑞波币",
    value: "$0.6234",
    change: "+$0.0234",
    percentage: "+3.90%",
    isPositive: true,
  },
];

export const cryptoGainers: Stock[] = [
  { name: "索拉纳", code: "SOL", price: "$89.45", change: "+$12.34", percentage: "+16.02%", isPositive: true },
  { name: "卡尔达诺", code: "ADA", price: "$0.4567", change: "+$0.0678", percentage: "+17.45%", isPositive: true },
  { name: "多边形", code: "MATIC", price: "$0.8901", change: "+$0.1234", percentage: "+16.12%", isPositive: true },
  { name: "链环", code: "LINK", price: "$14.56", change: "+$1.89", percentage: "+14.89%", isPositive: true },
  { name: "去中心化交易所", code: "UNI", price: "$6.78", change: "+$0.89", percentage: "+15.12%", isPositive: true }
];

export const cryptoLosers: Stock[] = [
  { name: "狗狗币", code: "DOGE", price: "$0.0789", change: "-$0.0123", percentage: "-13.45%", isPositive: false },
  { name: "柴犬币", code: "SHIB", price: "$0.000009", change: "-$0.000002", percentage: "-18.18%", isPositive: false },
  { name: "雪崩协议", code: "AVAX", price: "$18.45", change: "-$2.34", percentage: "-11.25%", isPositive: false },
  { name: "波卡", code: "DOT", price: "$5.67", change: "-$0.78", percentage: "-12.10%", isPositive: false },
  { name: "莱特币", code: "LTC", price: "$72.34", change: "-$8.90", percentage: "-10.95%", isPositive: false }
];

export const cryptoHotStocks: Stock[] = [
  { name: "比特币", code: "BTC", price: "$43,256.78", change: "+$1,234.56", percentage: "+2.94%", isPositive: true },
  { name: "以太坊", code: "ETH", price: "$2,678.90", change: "+$89.45", percentage: "+3.46%", isPositive: true },
  { name: "币安币", code: "BNB", price: "$312.45", change: "-$8.67", percentage: "-2.70%", isPositive: false },
  { name: "瑞波币", code: "XRP", price: "$0.6234", change: "+$0.0234", percentage: "+3.90%", isPositive: true },
  { name: "泰达币", code: "USDT", price: "$1.0001", change: "+$0.0001", percentage: "+0.01%", isPositive: true }
];

export const cryptoDeFiStocks: DividendStock[] = [
  { name: "复合协议", code: "COMP", price: "$56.78", change: "+$4.56", percentage: "+8.74%", isPositive: true, dividend: "5.2%" },
  { name: "Aave借贷", code: "AAVE", price: "$89.12", change: "+$6.78", percentage: "+8.24%", isPositive: true, dividend: "4.8%" },
  { name: "MakerDAO", code: "MKR", price: "$1,234.56", change: "+$89.12", percentage: "+7.78%", isPositive: true, dividend: "6.1%" },
  { name: "Yearn金融", code: "YFI", price: "$6,789.01", change: "+$456.78", percentage: "+7.22%", isPositive: true, dividend: "8.9%" },
  { name: "曲线DAO", code: "CRV", price: "$0.89", change: "+$0.06", percentage: "+7.23%", isPositive: true, dividend: "12.5%" }
];

export const cryptoIndexDetail: IndexDetail = {
  code: "BTC",
  name: "比特币",
  value: "$43,256.78",
  change: "+$1,234.56",
  percentage: "+2.94%",
  isPositive: true,
  high: "$44,123.45",
  low: "$42,567.89",
  open: "$42,890.12",
  close: "$42,022.22",
  volume: "$28.9B",
  avgPrice: "$43,089.45",
  market: "加密货币",
  status: "24小时交易 UTC 14:30:25"
};

export interface NewStock {
  code: string;
  name: string;
  ipoPrice: string;
  lotSize: number;
  minSubscription: string;
}

export interface ListedNewStock {
  code: string;
  name: string;
  latestPrice: string;
  firstDayChange: string;
  darkMarketChange: string;
}

export const upcomingStocks: NewStock[] = [
  { code: "44078", name: "政府银债二...", ipoPrice: "100HKD", lotSize: 100, minSubscription: "10000.00HKD" },
  { code: "02259", name: "紫金黄金国...", ipoPrice: "71.590HKD", lotSize: 100, minSubscription: "7231.19HKD" },
  { code: "02583", name: "西普尼", ipoPrice: "27.000~29.600HKD", lotSize: 100, minSubscription: "2989.85HKD" },
  { code: "02889", name: "博泰车联", ipoPrice: "102.230HKD", lotSize: 20, minSubscription: "2065.23HKD" },
  { code: "09973", name: "奇瑞汽车", ipoPrice: "27.750~30.750HKD", lotSize: 100, minSubscription: "3106.00HKD" }
];

export const listedNewStocks: ListedNewStock[] = [
  { code: "06090", name: "不同集团", latestPrice: "99.000", firstDayChange: "+43.96%", darkMarketChange: "+38.600" },
  { code: "02595", name: "劲方医药-B", latestPrice: "40.640", firstDayChange: "+106.47%", darkMarketChange: "+22.450" },
  { code: "02656", name: "健康160", latestPrice: "28.500", firstDayChange: "+137.34%", darkMarketChange: "+17.010" },
  { code: "02525", name: "禾赛-W", latestPrice: "232.800", firstDayChange: "+9.96%", darkMarketChange: "+15.400" },
  { code: "09477", name: "平安东西精选-U", latestPrice: "2.076", firstDayChange: "0.00%", darkMarketChange: "0.000" },
  { code: "09406", name: "平安科技精选-U", latestPrice: "2.216", firstDayChange: "0.00%", darkMarketChange: "0.000" },
  { code: "03477", name: "平安东西精选", latestPrice: "16.140", firstDayChange: "0.00%", darkMarketChange: "0.000" },
  { code: "03406", name: "平安科技精选", latestPrice: "17.230", firstDayChange: "0.00%", darkMarketChange: "0.000" },
  { code: "02543", name: "大行科工", latestPrice: "59.550", firstDayChange: "+14.95%", darkMarketChange: "+29.200" },
  { code: "02580", name: "奥克斯电气", latestPrice: "16.200", firstDayChange: "-5.40%", darkMarketChange: "-0.740" }
];