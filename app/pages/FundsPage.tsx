import { useLanguage } from "../contexts/LanguageContext"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"

// 基金数据类型
interface FundData {
  serialNumber: number;
  isin: string;
  name: string;
  period1m: string;
  period3m: string;
  period6m: string;
  period1y: string;
  period3y: string;
  periodYtd: string;
  periodSinceInception: string;
  sharpeRatio: string;
  minPurchase: string;
  currency: string;
  annualManagementFee: string;
}

// 基金数据
const fundsData: FundData[] = [
  {
    serialNumber: 1,
    isin: "IE00BYVJR809",
    name: "木星黄金白银基金",
    period1m: "+14.64%",
    period3m: "+40.86%",
    period6m: "+95.42%",
    period1y: "+109.36%",
    period3y: "+202.99%",
    periodYtd: "+129.68%",
    periodSinceInception: "+290.98%",
    sharpeRatio: "1.376",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 2,
    isin: "LU0788108826",
    name: "贝莱德世界黄金基金",
    period1m: "+16.13%",
    period3m: "+44.35%",
    period6m: "+76.19%",
    period1y: "+96.56%",
    period3y: "+203.23%",
    periodYtd: "+120.72%",
    periodSinceInception: "+59.80%",
    sharpeRatio: "1.462",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.75%"
  },
  {
    serialNumber: 3,
    isin: "HK0001012720",
    name: "华夏比特币ETF(非...",
    period1m: "+9.09%",
    period3m: "+11.81%",
    period6m: "+51.97%",
    period1y: "+92.63%",
    period3y: "-",
    periodYtd: "+29.70%",
    periodSinceInception: "+87.11%",
    sharpeRatio: "-",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "0.99%"
  },
  {
    serialNumber: 4,
    isin: "HK0001012753",
    name: "华夏以太币ETF(非...",
    period1m: "+3.28%",
    period3m: "+73.76%",
    period6m: "+181.09%",
    period1y: "+80.19%",
    period3y: "-",
    periodYtd: "+31.01%",
    periodSinceInception: "+40.97%",
    sharpeRatio: "-",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "0.99%"
  },
  {
    serialNumber: 5,
    isin: "LU2279858448",
    name: "Fullgoal中国中小...",
    period1m: "+5.03%",
    period3m: "+26.47%",
    period6m: "+53.55%",
    period1y: "+78.14%",
    period3y: "+84.68%",
    periodYtd: "+88.15%",
    periodSinceInception: "+16.33%",
    sharpeRatio: "0.788",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.80%"
  },
  {
    serialNumber: 6,
    isin: "LU1171460220",
    name: "Fullgoal中国中小...",
    period1m: "+5.24%",
    period3m: "+27.61%",
    period6m: "+53.52%",
    period1y: "+77.86%",
    period3y: "+86.35%",
    periodYtd: "+87.87%",
    periodSinceInception: "+224.21%",
    sharpeRatio: "0.800",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.80%"
  },
  {
    serialNumber: 7,
    isin: "HK0000955192",
    name: "睿远中国股票基金",
    period1m: "+0.13%",
    period3m: "+13.46%",
    period6m: "+60.29%",
    period1y: "+67.21%",
    period3y: "-",
    periodYtd: "+66.50%",
    periodSinceInception: "+136.10%",
    sharpeRatio: "1.989",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 8,
    isin: "HK0000955218",
    name: "睿远中国股票基金",
    period1m: "+0.34%",
    period3m: "+14.42%",
    period6m: "+60.05%",
    period1y: "+67.04%",
    period3y: "-",
    periodYtd: "+66.11%",
    periodSinceInception: "+137.20%",
    sharpeRatio: "1.996",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 9,
    isin: "LU1887442140",
    name: "景顺环球消费趋势...",
    period1m: "+13.24%",
    period3m: "+25.52%",
    period6m: "+76.44%",
    period1y: "+59.82%",
    period3y: "+104.51%",
    periodYtd: "+40.71%",
    periodSinceInception: "+93.06%",
    sharpeRatio: "0.921",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 10,
    isin: "HK0000165453",
    name: "华夏精选大中华科...",
    period1m: "+7.50%",
    period3m: "+30.42%",
    period6m: "+68.67%",
    period1y: "+55.97%",
    period3y: "+116.07%",
    periodYtd: "+79.82%",
    periodSinceInception: "+88.14%",
    sharpeRatio: "0.747",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.75%"
  },
  {
    serialNumber: 11,
    isin: "HK0000252152",
    name: "易方达(香港)中国...",
    period1m: "+3.22%",
    period3m: "+20.00%",
    period6m: "+33.37%",
    period1y: "+43.07%",
    period3y: "+21.30%",
    periodYtd: "+45.68%",
    periodSinceInception: "+52.91%",
    sharpeRatio: "0.152",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.80%"
  },
  {
    serialNumber: 12,
    isin: "HK0000500386",
    name: "易方达(香港)中国...",
    period1m: "+3.41%",
    period3m: "+20.99%",
    period6m: "+33.27%",
    period1y: "+42.74%",
    period3y: "+22.40%",
    periodYtd: "+45.32%",
    periodSinceInception: "+35.11%",
    sharpeRatio: "0.167",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.80%"
  },
  {
    serialNumber: 13,
    isin: "LU1791807156",
    name: "贝莱德世界金融基金",
    period1m: "+1.62%",
    period3m: "+2.63%",
    period6m: "+39.33%",
    period1y: "+39.03%",
    period3y: "+132.12%",
    periodYtd: "+28.37%",
    periodSinceInception: "+127.57%",
    sharpeRatio: "1.328",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 14,
    isin: "HK0000130705",
    name: "汇添富中港策略基金",
    period1m: "+10.86%",
    period3m: "+22.63%",
    period6m: "+62.13%",
    period1y: "+38.89%",
    period3y: "+40.11%",
    periodYtd: "+49.92%",
    periodSinceInception: "+147.66%",
    sharpeRatio: "0.251",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.25%"
  },
  {
    serialNumber: 15,
    isin: "HK0000316452",
    name: "汇添富中港策略基金",
    period1m: "+11.00%",
    period3m: "+23.67%",
    period6m: "+61.80%",
    period1y: "+38.75%",
    period3y: "+41.33%",
    periodYtd: "+49.61%",
    periodSinceInception: "+150.30%",
    sharpeRatio: "0.262",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.25%"
  },
  {
    serialNumber: 16,
    isin: "LU1894109211",
    name: "摩根基金-美国科技...",
    period1m: "+5.97%",
    period3m: "+9.88%",
    period6m: "+48.75%",
    period1y: "+33.83%",
    period3y: "+139.86%",
    periodYtd: "+22.71%",
    periodSinceInception: "+286.90%",
    sharpeRatio: "1.146",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 17,
    isin: "LU0082616367",
    name: "摩根基金-美国科技...",
    period1m: "+6.15%",
    period3m: "+10.86%",
    period6m: "+48.59%",
    period1y: "+33.81%",
    period3y: "+142.46%",
    periodYtd: "+21.40%",
    periodSinceInception: "+81.10%",
    sharpeRatio: "1.165",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 18,
    isin: "LU1861215975",
    name: "贝莱德新世代科技...",
    period1m: "+4.44%",
    period3m: "+16.65%",
    period6m: "+57.44%",
    period1y: "+31.45%",
    period3y: "+81.78%",
    periodYtd: "+19.44%",
    periodSinceInception: "+144.50%",
    sharpeRatio: "0.746",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 19,
    isin: "LU0997587083",
    name: "富达基金-日本价值...",
    period1m: "+3.55%",
    period3m: "+16.31%",
    period6m: "+43.34%",
    period1y: "+31.39%",
    period3y: "+112.24%",
    periodYtd: "+30.12%",
    periodSinceInception: "+302.20%",
    sharpeRatio: "1.341",
    minPurchase: "-",
    currency: "美元",
    annualManagementFee: "1.50%"
  },
  {
    serialNumber: 20,
    isin: "HK0000320223",
    name: "泰康开泰中国新机...",
    period1m: "+9.57%",
    period3m: "+30.44%",
    period6m: "+33.02%",
    period1y: "+29.86%",
    period3y: "+57.58%",
    periodYtd: "+48.91%",
    periodSinceInception: "+85.63%",
    sharpeRatio: "0.444",
    minPurchase: "-",
    currency: "港元",
    annualManagementFee: "1.75%"
  }
];

// 根据涨跌幅值判断颜色类名
const getChangeColor = (value: string) => {
  if (value === "-") return "text-muted-foreground";
  const numValue = parseFloat(value.replace("%", "").replace("+", ""));
  if (numValue > 0) return "text-green-600";
  if (numValue < 0) return "text-red-600";
  return "text-muted-foreground";
};

export default function FundsPage() {
  const { t } = useLanguage();

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="rounded-md border">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">{t('funds.serial_number')}</TableHead>
            <TableHead className="w-32">{t('funds.isin')}</TableHead>
            <TableHead className="min-w-48">{t('funds.name')}</TableHead>
            <TableHead className="w-20">{t('funds.period_1m')}</TableHead>
            <TableHead className="w-20">{t('funds.period_3m')}</TableHead>
            <TableHead className="w-20">{t('funds.period_6m')}</TableHead>
            <TableHead className="w-20">{t('funds.period_1y')}</TableHead>
            <TableHead className="w-20">{t('funds.period_3y')}</TableHead>
            <TableHead className="w-20">{t('funds.period_ytd')}</TableHead>
            <TableHead className="w-20">{t('funds.period_since_inception')}</TableHead>
            <TableHead className="w-20">{t('funds.sharpe_ratio')}</TableHead>
            <TableHead className="w-20">{t('funds.min_purchase')}</TableHead>
            <TableHead className="w-16">{t('funds.currency')}</TableHead>
            <TableHead className="w-24">{t('funds.annual_management_fee')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fundsData.map((fund) => (
            <TableRow key={fund.serialNumber} className="hover:bg-muted/50">
              <TableCell className="font-medium">{fund.serialNumber}</TableCell>
              <TableCell className="font-mono text-xs">{fund.isin}</TableCell>
              <TableCell className="font-medium">{fund.name}</TableCell>
              <TableCell className={`font-medium ${getChangeColor(fund.period1m)}`}>
                {fund.period1m}
              </TableCell>
              <TableCell className={`font-medium ${getChangeColor(fund.period3m)}`}>
                {fund.period3m}
              </TableCell>
              <TableCell className={`font-medium ${getChangeColor(fund.period6m)}`}>
                {fund.period6m}
              </TableCell>
              <TableCell className={`font-medium ${getChangeColor(fund.period1y)}`}>
                {fund.period1y}
              </TableCell>
              <TableCell className={`font-medium ${getChangeColor(fund.period3y)}`}>
                {fund.period3y}
              </TableCell>
              <TableCell className={`font-medium ${getChangeColor(fund.periodYtd)}`}>
                {fund.periodYtd}
              </TableCell>
              <TableCell className={`font-medium ${getChangeColor(fund.periodSinceInception)}`}>
                {fund.periodSinceInception}
              </TableCell>
              <TableCell className="text-muted-foreground">{fund.sharpeRatio}</TableCell>
              <TableCell className="text-muted-foreground">{fund.minPurchase}</TableCell>
              <TableCell>{fund.currency}</TableCell>
              <TableCell>{fund.annualManagementFee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
}