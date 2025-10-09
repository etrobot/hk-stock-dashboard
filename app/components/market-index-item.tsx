import { MarketIndex } from "../types/market"

interface MarketIndexItemProps {
  index: MarketIndex;
  showBackground?: boolean;
  className?: string;
  onClick?: (index: MarketIndex) => void;
  customChartData?: number[];
}

// 生成模拟趋势数据的函数
function generateTrendData(isPositive: boolean): number[] {
  const baseValue = 50;
  const data: number[] = [];
  let currentValue = baseValue;
  
  for (let i = 0; i < 12; i++) {
    // 根据正负趋势调整随机变化
    const changeRange = isPositive ? [-2, 4] : [-4, 2];
    const change = Math.random() * (changeRange[1] - changeRange[0]) + changeRange[0];
    currentValue = Math.max(10, Math.min(90, currentValue + change));
    data.push(currentValue);
  }
  
  return data;
}

// 趋势图组件
function TrendChart({ isPositive, customData }: { isPositive: boolean; customData?: number[] }) {
  const data = customData || generateTrendData(isPositive);
  const width = 50;
  const height = 20;
  
  // 计算路径点
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  const color = isPositive ? '#16BA71' : '#F44345';
  
  return (
    <svg width={width} height={height} className="opacity-80">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 添加一些圆点来增强视觉效果 */}
      {data.slice(-3).map((value, index) => {
        const realIndex = data.length - 3 + index;
        const x = (realIndex / (data.length - 1)) * width;
        const y = height - ((value - minValue) / range) * height;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="1"
            fill={color}
            opacity={0.6}
          />
        );
      })}
    </svg>
  );
}

export function MarketIndexItem({ 
  index, 
  showBackground = true, 
  className = "",
  onClick,
  customChartData
}: MarketIndexItemProps) {
  const backgroundColor = showBackground 
    ? (index.isPositive ? 'color-mix(in oklab, var(--chart-1), transparent 84%)' : 'color-mix(in oklab, var(--chart-2), transparent 84%)')
    : 'transparent';

  return (
    <div 
      className={`relative rounded-[4px] shadow-sm flex-1 h-14 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      style={{ backgroundColor }}
      onClick={() => onClick?.(index)}
    >
      {/* 内容区域 */}
      <div className="relative z-10 p-1.5 h-full">
        <div className="flex justify-between items-start h-full">
          {/* 左侧文字信息 */}
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-[8px] leading-[12px] font-normal">
              {index.name}
            </h3>
            
            <div className="flex flex-col">
              <div 
                className="text-[13px] leading-[18px] font-bold font-mono"
                style={{ color: `var(${index.isPositive ? '--chart-1' : '--chart-2'})` }}
              >
                {index.value}
              </div>
              
              <div className="flex gap-1 text-[9px] leading-3 font-bold font-mono">
                <span style={{ color: `var(${index.isPositive ? '--chart-1' : '--chart-2'})` }}>
                  {index.change}
                </span>
                <span style={{ color: `var(${index.isPositive ? '--chart-1' : '--chart-2'})` }}>
                  {index.percentage}
                </span>
              </div>
            </div>
          </div>
          
          {/* 右侧趋势图 */}
          <div className="flex items-center h-full">
            <TrendChart isPositive={index.isPositive} customData={customChartData} />
          </div>
        </div>
      </div>
      
      {/* 底部虚线 */}
      <div 
        className="absolute bottom-[20px] left-0 right-0 h-px opacity-40"
        style={{ backgroundColor: 'var(--border)' }}
      />
    </div>
  );
}