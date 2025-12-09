import { Card } from "./ui/card";


// 生成基于 mockChartData 的K线数据
type KLinePoint = { date: string; open: number; high: number; low: number; close: number; volume: number }
function generateKLineData(stockCode: string, period: string, basePrice: number): KLinePoint[] {
  // 使用股票代码作为种子来保证一致性
  const seed = stockCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (index: number) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };

  // 根据周期确定数据点数量和时间间隔
  const periodConfig = {
    daily: { count: 30, days: 1 },
    weekly: { count: 20, days: 7 },
    monthly: { count: 12, days: 30 },
    quarterly: { count: 8, days: 90 },
    yearly: { count: 5, days: 365 }
  };

  const config = periodConfig[period as keyof typeof periodConfig] || periodConfig.daily;
  const data: KLinePoint[] = [];
  
  for (let i = 0; i < config.count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (config.count - i) * config.days);
    
    // 基于基础价格生成随机波动
    const priceVariation = basePrice * 0.1; // 10% 波动范围
    const open = basePrice + (random(i * 4) - 0.5) * priceVariation;
    const changeRange = priceVariation * 0.3;
    const change1 = (random(i * 4 + 1) - 0.5) * changeRange;
    const change2 = (random(i * 4 + 2) - 0.5) * changeRange;
    const change3 = (random(i * 4 + 3) - 0.5) * changeRange;
    
    const close = open + change1;
    const high = Math.max(open, close) + Math.abs(change2);
    const low = Math.min(open, close) - Math.abs(change3);
    const volume = Math.floor((random(i * 5) * 40000000) + 5000000); // 500万-4500万成交量

    data.push({
      date: date.toISOString(),
      open: Math.max(0.01, open),
      high: Math.max(0.01, high),
      low: Math.max(0.01, low),
      close: Math.max(0.01, close),
      volume
    });
  }

  return data;
}

// Enhanced K-line chart component with axes
function MiniKLineChart({ data, period }: { data: KLinePoint[], period: string }) {
  const width = 280;
  const height = 140; // Increased to accommodate axes
  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 25;
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[140px] bg-muted rounded flex items-center justify-center text-muted-foreground">
        No data
      </div>
    );
  }
  
  const prices = data.map(d => [d.open, d.high, d.low, d.close]).flat();
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const xStep = chartWidth / Math.max(data.length - 1, 1);
  
  const getY = (price: number) => paddingTop + ((maxPrice - price) / priceRange) * chartHeight;
  const getX = (index: number) => paddingLeft + index * xStep;
  
  // Format date based on period
  const formatDate = (dateStr: string, period: string) => {
    const date = new Date(dateStr);
    switch (period) {
      case 'daily':
        return `${date.getMonth() + 1}/${date.getDate()}`;
      case 'weekly':
        return `${date.getMonth() + 1}/${date.getDate()}`;
      case 'monthly':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'quarterly':
        return `${date.getFullYear()}Q${Math.floor(date.getMonth() / 3) + 1}`;
      case 'yearly':
        return `${date.getFullYear()}`;
      default:
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  };
  
  // Generate Y-axis labels
  const yAxisLabels = [];
  for (let i = 0; i <= 4; i++) {
    const price = maxPrice - (i * priceRange / 4);
    yAxisLabels.push({
      price: price.toFixed(2),
      y: paddingTop + (i * chartHeight / 4)
    });
  }
  
  // Generate X-axis labels (show every few points to avoid crowding)
  const xAxisLabels = [];
  const step = Math.max(1, Math.floor(data.length / 4));
  for (let i = 0; i < data.length; i += step) {
    if (data[i] && data[i].date) {
      xAxisLabels.push({
        label: formatDate(data[i].date, period),
        x: getX(i)
      });
    }
  }
  
  const pathData = data.map((d, i) => {
    const x = getX(i);
    const openY = getY(d.open);
    const closeY = getY(d.close);
    const highY = getY(d.high);
    const lowY = getY(d.low);
    
    return { x, openY, closeY, highY, lowY, isUp: d.close >= d.open };
  });
  
  return (
    <div className="w-full h-[140px] bg-background rounded border text-foreground">
      <svg width="100%" height="140" viewBox={`0 0 ${width} ${height}`}>
        {/* Chart background */}
        <rect 
          x={paddingLeft} 
          y={paddingTop} 
          width={chartWidth} 
          height={chartHeight}
          fill="currentColor"
          fillOpacity="0.02"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        
        {/* Horizontal grid lines */}
        {yAxisLabels.map((label, i) => (
          <g key={i}>
            <line
              x1={paddingLeft}
              y1={label.y}
              x2={paddingLeft + chartWidth}
              y2={label.y}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <text
              x={paddingLeft - 5}
              y={label.y + 3}
              textAnchor="end"
              fontSize="8"
              fill="currentColor"
              fillOpacity="0.6"
            >
              {label.price}
            </text>
          </g>
        ))}
        
        {/* Vertical grid lines */}
        {xAxisLabels.map((label, i) => (
          <g key={i}>
            <line
              x1={label.x}
              y1={paddingTop}
              x2={label.x}
              y2={paddingTop + chartHeight}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <text
              x={label.x}
              y={height - 5}
              textAnchor="middle"
              fontSize="7"
              fill="currentColor"
              fillOpacity="0.6"
            >
              {label.label}
            </text>
          </g>
        ))}
        
        {/* Candlestick data */}
        {pathData.map((d, i) => (
          <g key={i}>
            {/* High-Low line */}
            <line
              x1={d.x}
              y1={d.highY}
              x2={d.x}
              y2={d.lowY}
              stroke={d.isUp ? "#22c55e" : "#ef4444"}
              strokeWidth="1"
            />
            {/* Open-Close candlestick */}
            <rect
              x={d.x - Math.max(1, xStep / 4)}
              y={Math.min(d.openY, d.closeY)}
              width={Math.max(2, xStep / 2)}
              height={Math.abs(d.closeY - d.openY) || 1}
              fill={d.isUp ? "#22c55e" : "#ef4444"}
              stroke={d.isUp ? "#16a34a" : "#dc2626"}
              strokeWidth="0.5"
            />
          </g>
        ))}
        
        {/* Trend line */}
        <polyline
          points={pathData.map(d => `${d.x},${d.closeY}`).join(' ')}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.6"
        />
        
        {/* Axes */}
        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={paddingTop + chartHeight}
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <line
          x1={paddingLeft}
          y1={paddingTop + chartHeight}
          x2={paddingLeft + chartWidth}
          y2={paddingTop + chartHeight}
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

type StockSummary = {
  code?: string
  name?: string
  price?: string
  percentage?: string
  klineData?: Record<string, KLinePoint[]>
}
interface StockGridItemProps {
  stock: StockSummary
  selectedPeriod: string
  onClick?: () => void
}

export function StockGridItem({ stock, selectedPeriod, onClick }: StockGridItemProps) {
  const isPositive = stock.percentage?.startsWith('+') ?? false;
  let klineData = stock.klineData?.[selectedPeriod] || [];
  
  // 如果没有数据，使用生成的数据
  if (!klineData || klineData.length === 0) {
    const basePrice = parseFloat(stock.price?.replace(/,/g, '') || '') || 100;
    klineData = generateKLineData(stock.code || '', selectedPeriod, basePrice);
  }
  
  return (
    <Card className="p-4 bg-card border-border hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground text-sm truncate">{stock.name || '--'}</h3>
            <p className="text-xs text-muted-foreground font-mono">{stock.code || '--'}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-semibold text-foreground">{stock.price || '--'}</p>
            <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stock.percentage || '--'}
            </p>
          </div>
        </div>
        
        {/* K-line Chart */}
        <div className="relative">
          <MiniKLineChart 
            data={klineData}
            period={selectedPeriod}
          />
        </div>
      </div>
    </Card>
  );
}