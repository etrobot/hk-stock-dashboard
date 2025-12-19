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
  { name: "比亚迪", code: "002594", price: "234.56", change: "+10.45", percentage: "+4.66%", isPositive: true },
  { name: "腾讯控股", code: "000700", price: "378.60", change: "+16.80", percentage: "+4.64%", isPositive: true },
  { name: "阿里巴巴", code: "009988", price: "89.15", change: "+3.95", percentage: "+4.63%", isPositive: true },
  { name: "美团", code: "003690", price: "156.80", change: "+6.90", percentage: "+4.60%", isPositive: true },
  { name: "小米集团", code: "001810", price: "18.92", change: "+0.83", percentage: "+4.58%", isPositive: true },
  { name: "京东集团", code: "009618", price: "145.67", change: "+6.34", percentage: "+4.55%", isPositive: true }
];

export const cnLosers: Stock[] = [
  { name: "万科A", code: "000002", price: "12.34", change: "-0.89", percentage: "-6.72%", isPositive: false },
  { name: "保利地产", code: "600048", price: "8.90", change: "-0.56", percentage: "-5.92%", isPositive: false },
  { name: "华夏幸福", code: "600340", price: "5.67", change: "-0.34", percentage: "-5.66%", isPositive: false },
  { name: "融创中国", code: "01918", price: "3.45", change: "-0.23", percentage: "-6.25%", isPositive: false },
  { name: "恒大集团", code: "03333", price: "1.23", change: "-0.12", percentage: "-8.89%", isPositive: false },
  { name: "中国石化", code: "600028", price: "4.56", change: "-0.38", percentage: "-7.69%", isPositive: false },
  { name: "中信证券", code: "600030", price: "25.78", change: "-1.89", percentage: "-6.83%", isPositive: false },
  { name: "平安银行", code: "000001", price: "13.45", change: "-0.92", percentage: "-6.40%", isPositive: false },
  { name: "中国人寿", code: "601628", price: "28.90", change: "-1.84", percentage: "-5.98%", isPositive: false },
  { name: "格力电器", code: "000651", price: "35.67", change: "-2.23", percentage: "-5.88%", isPositive: false }
];

export const cnHotStocks: Stock[] = [
  { name: "宁德时代", code: "300750", price: "456.78", change: "+23.45", percentage: "+5.41%", isPositive: true },
  { name: "隆基绿能", code: "601012", price: "23.45", change: "+1.12", percentage: "+5.02%", isPositive: true },
  { name: "药明康德", code: "603259", price: "67.89", change: "+3.21", percentage: "+4.96%", isPositive: true },
  { name: "迈瑞医疗", code: "300760", price: "289.12", change: "+13.45", percentage: "+4.88%", isPositive: true },
  { name: "海康威视", code: "002415", price: "34.56", change: "+1.56", percentage: "+4.73%", isPositive: true },
  { name: "东方财富", code: "300059", price: "18.90", change: "+0.85", percentage: "+4.71%", isPositive: true },
  { name: "三一重工", code: "600031", price: "16.78", change: "+0.75", percentage: "+4.68%", isPositive: true },
  { name: "立讯精密", code: "002475", price: "32.45", change: "+1.43", percentage: "+4.61%", isPositive: true },
  { name: "恒瑞医药", code: "600276", price: "45.89", change: "+2.01", percentage: "+4.58%", isPositive: true },
  { name: "顺丰控股", code: "002352", price: "67.23", change: "+2.94", percentage: "+4.57%", isPositive: true }
];

export const cnDividendStocks: DividendStock[] = [
  { name: "中国石化", code: "600028", price: "4.56", change: "+0.12", percentage: "+2.70%", isPositive: true, dividend: "8.9%" },
  { name: "中国石油", code: "601857", price: "5.67", change: "+0.23", percentage: "+4.23%", isPositive: true, dividend: "7.8%" },
  { name: "农业银行", code: "601288", price: "3.45", change: "+0.08", percentage: "+2.38%", isPositive: true, dividend: "6.5%" },
  { name: "工商银行", code: "601398", price: "4.89", change: "+0.15", percentage: "+3.16%", isPositive: true, dividend: "6.2%" },
  { name: "建设银行", code: "601939", price: "6.12", change: "+0.19", percentage: "+3.20%", isPositive: true, dividend: "5.8%" },
  { name: "中国银行", code: "601988", price: "3.78", change: "+0.09", percentage: "+2.44%", isPositive: true, dividend: "5.5%" },
  { name: "交通银行", code: "601328", price: "5.23", change: "+0.11", percentage: "+2.15%", isPositive: true, dividend: "5.2%" },
  { name: "招商银行", code: "600036", price: "38.90", change: "+0.75", percentage: "+1.96%", isPositive: true, dividend: "4.8%" },
  { name: "中国神华", code: "601088", price: "28.45", change: "+0.56", percentage: "+2.01%", isPositive: true, dividend: "4.5%" },
  { name: "华夏银行", code: "600015", price: "7.89", change: "+0.15", percentage: "+1.94%", isPositive: true, dividend: "4.2%" }
];

export const cnSectors: MarketIndex[] = [
  { name: "新能源", value: "6,234.56", change: "+3.2%", percentage: "3.2", isPositive: true },
  { name: "半导体", value: "5,789.12", change: "+2.8%", percentage: "2.8", isPositive: true },
  { name: "医药", value: "4,567.89", change: "+1.5%", percentage: "1.5", isPositive: true },
  { name: "银行", value: "3,234.56", change: "-0.8%", percentage: "0.8", isPositive: false },
  { name: "地产", value: "2,987.45", change: "-2.1%", percentage: "2.1", isPositive: false },
  { name: "钢铁", value: "2,456.78", change: "-3.5%", percentage: "3.5", isPositive: false }
];

export const hkGainers: Stock[] = [
  { name: "新矿资源", code: "01231", price: "0.510", change: "+0.245", percentage: "+88.89%", isPositive: true },
  { name: "奥星生命科学", code: "06118", price: "1.400", change: "+0.379", percentage: "+37.25%", isPositive: true },
  { name: "惠陶集团", code: "08238", price: "0.410", change: "+0.090", percentage: "+28.13%", isPositive: true },
  { name: "亚洲果业", code: "00073", price: "2.140", change: "+0.469", percentage: "+28.14%", isPositive: true },
  { name: "恒生银行-R", code: "80011", price: "138.000", change: "+29.11", percentage: "+26.72%", isPositive: true },
  { name: "恒生银行", code: "00011", price: "150.400", change: "+31.47", percentage: "+26.39%", isPositive: true },
  { name: "欧化", code: "01711", price: "0.231", change: "+0.047", percentage: "+25.54%", isPositive: true },
  { name: "东方大学城", code: "08067", price: "0.370", change: "+0.075", percentage: "+25.42%", isPositive: true },
  { name: "金粤控股", code: "00070", price: "0.080", change: "+0.016", percentage: "+25.00%", isPositive: true },
  { name: "金马能源", code: "06885", price: "1.560", change: "+0.281", percentage: "+21.88%", isPositive: true }
];

export const hkLosers: Stock[] = [
  { name: "中国恒大", code: "03333", price: "0.285", change: "-0.025", percentage: "-8.06%", isPositive: false },
  { name: "融创中国", code: "01918", price: "1.82", change: "-0.14", percentage: "-7.14%", isPositive: false },
  { name: "碧桂园", code: "02007", price: "0.95", change: "-0.07", percentage: "-6.86%", isPositive: false },
  { name: "中国金茂", code: "00817", price: "0.68", change: "-0.05", percentage: "-6.85%", isPositive: false },
  { name: "世茂集团", code: "00813", price: "1.23", change: "-0.08", percentage: "-6.11%", isPositive: false },
  { name: "富力地产", code: "02777", price: "2.45", change: "-0.16", percentage: "-6.13%", isPositive: false },
  { name: "佳兆业集团", code: "01638", price: "0.42", change: "-0.03", percentage: "-6.67%", isPositive: false },
  { name: "雅居乐集团", code: "03383", price: "3.14", change: "-0.21", percentage: "-6.26%", isPositive: false },
  { name: "龙湖集团", code: "00960", price: "15.68", change: "-1.02", percentage: "-6.11%", isPositive: false },
  { name: "旭辉控股", code: "00884", price: "1.89", change: "-0.12", percentage: "-5.97%", isPositive: false }
];

export const hkHotStocks: Stock[] = [
  { name: "汇丰控股", code: "00005", price: "62.45", change: "+1.25", percentage: "+2.04%", isPositive: true },
  { name: "中国移动", code: "00941", price: "78.90", change: "+1.50", percentage: "+1.94%", isPositive: true },
  { name: "建设银行", code: "00939", price: "5.89", change: "+0.11", percentage: "+1.90%", isPositive: true },
  { name: "工商银行", code: "01398", price: "4.56", change: "+0.08", percentage: "+1.79%", isPositive: true },
  { name: "中国平安", code: "02318", price: "45.30", change: "+0.80", percentage: "+1.80%", isPositive: true },
  { name: "腾讯控股", code: "00700", price: "378.60", change: "+6.40", percentage: "+1.72%", isPositive: true },
  { name: "阿里巴巴", code: "09988", price: "89.15", change: "+1.45", percentage: "+1.65%", isPositive: true },
  { name: "美团", code: "03690", price: "156.80", change: "+2.50", percentage: "+1.62%", isPositive: true },
  { name: "小米集团", code: "01810", price: "18.92", change: "+0.30", percentage: "+1.61%", isPositive: true },
  { name: "中国石油", code: "00857", price: "3.45", change: "+0.05", percentage: "+1.47%", isPositive: true }
];

export const hkDividendStocks: DividendStock[] = [
  { name: "茂盛控股", code: "00022", price: "0.138", change: "-0.005", percentage: "-3.50%", isPositive: false, dividend: "174.640%" },
  { name: "海王英特龙", code: "08329", price: "0.148", change: "-0.004", percentage: "-2.63%", isPositive: false, dividend: "106.080%" },
  { name: "怡园酒业", code: "08146", price: "0.118", change: "-0.009", percentage: "-7.09%", isPositive: false, dividend: "102.540%" },
  { name: "华晨中国", code: "01114", price: "3.98", change: "+0.11", percentage: "+2.84%", isPositive: true, dividend: "45.230%" },
  { name: "亿都(国际)", code: "00259", price: "4.73", change: "-0.26", percentage: "-5.21%", isPositive: false, dividend: "39.110%" },
  { name: "中国电信", code: "00728", price: "3.12", change: "+0.08", percentage: "+2.63%", isPositive: true, dividend: "18.750%" },
  { name: "中国石化", code: "00386", price: "4.23", change: "+0.05", percentage: "+1.20%", isPositive: true, dividend: "16.890%" },
  { name: "中国神华", code: "01088", price: "28.45", change: "+0.35", percentage: "+1.25%", isPositive: true, dividend: "15.230%" },
  { name: "中国银行", code: "03988", price: "3.56", change: "+0.04", percentage: "+1.14%", isPositive: true, dividend: "14.670%" },
  { name: "农业银行", code: "01288", price: "2.89", change: "+0.03", percentage: "+1.05%", isPositive: true, dividend: "13.540%" }
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
  { name: "Xenetic Bi...", code: "XBIO", price: "$10.360", change: "+$5.410", percentage: "+141.49%", isPositive: true },
  { name: "Nexalin Te...", code: "NXL", price: "$1.860", change: "+$0.923", percentage: "+98.25%", isPositive: true },
  { name: "AlphaTON ...", code: "ATON", price: "$10.910", change: "+$5.334", percentage: "+95.52%", isPositive: true },
  { name: "374Water", code: "SCWO", price: "$0.7000", change: "+$0.335", percentage: "+91.73%", isPositive: true },
  { name: "Acurx Phar...", code: "ACXP", price: "$8.100", change: "+$3.818", percentage: "+88.81%", isPositive: true },
  { name: "大自然药业", code: "UPC", price: "$9.460", change: "+$4.290", percentage: "+82.98%", isPositive: true },
  { name: "Adaptimm...", code: "ADAP", price: "$0.2105", change: "+$0.0719", percentage: "+51.88%", isPositive: true },
  { name: "XtI生物制药", code: "XTLB", price: "$2.050", change: "+$0.650", percentage: "+46.43%", isPositive: true },
  { name: "TNL Media...", code: "TNMG", price: "$0.4800", change: "+$0.1500", percentage: "+45.50%", isPositive: true },
  { name: "GT Biophar...", code: "GTBP", price: "$1.080", change: "+$0.328", percentage: "+43.67%", isPositive: true }
];

export const usLosers: Stock[] = [
  { name: "Centro El...", code: "CENN", price: "$0.2657", change: "-$0.3486", percentage: "-56.98%", isPositive: false },
  { name: "Zeta Netw...", code: "ZNB", price: "$1.900", change: "-$1.501", percentage: "-44.12%", isPositive: false },
  { name: "Envoy Med...", code: "COCH", price: "$0.9301", change: "-$0.6599", percentage: "-41.50%", isPositive: false },
  { name: "Galecto", code: "GLTO", price: "$10.650", change: "-$7.272", percentage: "-40.57%", isPositive: false },
  { name: "C3is", code: "CISS", price: "$2.580", change: "-$1.490", percentage: "-36.61%", isPositive: false },
  { name: "一品威客", code: "EPWK", price: "$0.0753", change: "-$0.0347", percentage: "-31.55%", isPositive: false },
  { name: "Turn Thera...", code: "TTRX", price: "$7.000", change: "-$3.000", percentage: "-30.00%", isPositive: false },
  { name: "一盈证券", code: "GSIW", price: "$0.1614", change: "-$0.0686", percentage: "-29.83%", isPositive: false },
  { name: "Phoenix As...", code: "PHOE", price: "$13.320", change: "-$3.480", percentage: "-20.71%", isPositive: false },
  { name: "Femasys", code: "FEMY", price: "$0.5971", change: "-$0.1500", percentage: "-20.09%", isPositive: false }
];

export const usHotStocks: Stock[] = [
  { name: "Xenetic Bi...", code: "XBIO", price: "$10.360", change: "+$5.410", percentage: "+141.49%", isPositive: true },
  { name: "Nexalin Te...", code: "NXL", price: "$1.860", change: "+$0.923", percentage: "+98.25%", isPositive: true },
  { name: "AlphaTON ...", code: "ATON", price: "$10.910", change: "+$5.334", percentage: "+95.52%", isPositive: true },
  { name: "374Water", code: "SCWO", price: "$0.7000", change: "+$0.335", percentage: "+91.73%", isPositive: true },
  { name: "Acurx Phar...", code: "ACXP", price: "$8.100", change: "+$3.818", percentage: "+88.81%", isPositive: true },
  { name: "大自然药业", code: "UPC", price: "$9.460", change: "+$4.290", percentage: "+82.98%", isPositive: true },
  { name: "Adaptimm...", code: "ADAP", price: "$0.2105", change: "+$0.0719", percentage: "+51.88%", isPositive: true },
  { name: "XtI生物制药", code: "XTLB", price: "$2.050", change: "+$0.650", percentage: "+46.43%", isPositive: true },
  { name: "TNL Media...", code: "TNMG", price: "$0.4800", change: "+$0.1500", percentage: "+45.50%", isPositive: true },
  { name: "GT Biophar...", code: "GTBP", price: "$1.080", change: "+$0.328", percentage: "+43.67%", isPositive: true }
];

export const usDividendStocks: DividendStock[] = [
  { name: "茂盛控股", code: "00022", price: "$10.130", change: "+$0.237", percentage: "+2.38%", isPositive: true, dividend: "186.820%" },
  { name: "怡园酒业", code: "08146", price: "$0.117", change: "+$0.001", percentage: "+0.86%", isPositive: true, dividend: "103.420%" },
  { name: "海王英特龙", code: "08329", price: "$0.156", change: "$0.000", percentage: "0.00%", isPositive: true, dividend: "100.640%" },
  { name: "华晨中国", code: "01114", price: "$4.168", change: "-$0.070", percentage: "-1.65%", isPositive: false, dividend: "43.170%" },
  { name: "万宝盛华", code: "02180", price: "$5.420", change: "+$0.070", percentage: "+1.31%", isPositive: true, dividend: "35.240%" },
  { name: "亿都(国际...", code: "00259", price: "$5.360", change: "-$0.110", percentage: "-2.01%", isPositive: false, dividend: "34.510%" },
  { name: "平安好医生", code: "01833", price: "$17.600", change: "-$0.221", percentage: "-1.24%", isPositive: false, dividend: "28.540%" },
  { name: "承达集团", code: "01568", price: "$0.750", change: "+$0.020", percentage: "+2.74%", isPositive: true, dividend: "26.670%" },
  { name: "K W NELS...", code: "08411", price: "$0.077", change: "$0.000", percentage: "0.00%", isPositive: true, dividend: "25.970%" },
  { name: "润华服务", code: "02455", price: "$0.710", change: "-$0.010", percentage: "-1.39%", isPositive: false, dividend: "25.350%" }
];

export const hkSectors: MarketIndex[] = [
  { name: "科技", value: "15,234.56", change: "+2.8%", percentage: "2.8", isPositive: true },
  { name: "金融", value: "12,456.78", change: "+1.2%", percentage: "1.2", isPositive: true },
  { name: "地产", value: "8,789.12", change: "-0.5%", percentage: "0.5", isPositive: false },
  { name: "能源", value: "9,876.54", change: "+3.1%", percentage: "3.1", isPositive: true },
  { name: "医药", value: "11,234.89", change: "+1.8%", percentage: "1.8", isPositive: true },
  { name: "消费", value: "10,567.23", change: "-1.2%", percentage: "1.2", isPositive: false }
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

export interface NewStock {
  code: string;
  name: string;
  market: string;
  subscriptionMultiple: string;
  lotteryRate: string;
  listingDate: string;
}

export interface ListedNewStock {
  code: string;
  name: string;
  latestPrice: string;
  firstDayChange: string;
  cumulativeChange: string;
  listingDate: string;
}

export const upcomingStocks: NewStock[] = [
  { code: "44078", name: "政府银债二...", market: "港股", subscriptionMultiple: "15.2x", lotteryRate: "85%", listingDate: "2024-01-15" },
  { code: "02259", name: "紫金黄金国...", market: "港股", subscriptionMultiple: "23.8x", lotteryRate: "65%", listingDate: "2024-01-20" },
  { code: "02583", name: "西普尼", market: "港股", subscriptionMultiple: "18.5x", lotteryRate: "72%", listingDate: "2024-01-25" },
  { code: "02889", name: "博泰车联", market: "港股", subscriptionMultiple: "31.2x", lotteryRate: "48%", listingDate: "2024-02-01" },
  { code: "09973", name: "奇瑞汽车", market: "港股", subscriptionMultiple: "45.6x", lotteryRate: "35%", listingDate: "2024-02-05" }
];

export const listedNewStocks: ListedNewStock[] = [
  { code: "06090", name: "不同集团", latestPrice: "99.000", firstDayChange: "+43.96%", cumulativeChange: "+65.23%", listingDate: "2023-12-15" },
  { code: "02595", name: "劲方医药-B", latestPrice: "40.640", firstDayChange: "+106.47%", cumulativeChange: "+142.89%", listingDate: "2023-12-10" },
  { code: "02656", name: "健康160", latestPrice: "28.500", firstDayChange: "+137.34%", cumulativeChange: "+178.45%", listingDate: "2023-12-05" },
  { code: "02525", name: "禾赛-W", latestPrice: "232.800", firstDayChange: "+9.96%", cumulativeChange: "+25.67%", listingDate: "2023-11-28" },
  { code: "09477", name: "平安东西精选-U", latestPrice: "2.076", firstDayChange: "0.00%", cumulativeChange: "+5.23%", listingDate: "2023-11-20" },
  { code: "09406", name: "平安科技精选-U", latestPrice: "2.216", firstDayChange: "0.00%", cumulativeChange: "+8.91%", listingDate: "2023-11-15" },
  { code: "03477", name: "平安东西精选", latestPrice: "16.140", firstDayChange: "0.00%", cumulativeChange: "+12.45%", listingDate: "2023-11-10" },
  { code: "03406", name: "平安科技精选", latestPrice: "17.230", firstDayChange: "0.00%", cumulativeChange: "+15.78%", listingDate: "2023-11-05" },
  { code: "02543", name: "大行科工", latestPrice: "59.550", firstDayChange: "+14.95%", cumulativeChange: "+38.92%", listingDate: "2023-10-28" },
  { code: "02580", name: "奥克斯电气", latestPrice: "16.200", firstDayChange: "-5.40%", cumulativeChange: "+8.67%", listingDate: "2023-10-20" }
];