import { Card } from "./ui/card";

// Enhanced K-line chart component with axes
function MiniKLineChart({ data, period }: { data: any[], period: string }) {
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

interface StockGridItemProps {
  stock: any;
  selectedPeriod: string;
  onClick?: () => void;
}

export function StockGridItem({ stock, selectedPeriod, onClick }: StockGridItemProps) {
  const isPositive = stock.percentage.startsWith('+');
  const klineData = stock.klineData?.[selectedPeriod] || [];
  
  return (
    <Card className="p-4 bg-card border-border hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground text-sm truncate">{stock.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{stock.code}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-semibold text-foreground">{stock.price}</p>
            <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stock.percentage}
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