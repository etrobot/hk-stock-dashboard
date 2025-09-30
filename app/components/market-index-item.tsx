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
  const width = 60;
  const height = 24;
  
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
    ? (index.isPositive ? 'rgba(22, 186, 113, 0.16)' : 'rgba(244, 67, 69, 0.16)')
    : 'transparent';

  return (
    <div 
      className={`relative rounded-[4px] shadow-sm min-w-[250px] h-16 flex-shrink-0 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      style={{ backgroundColor }}
      onClick={() => onClick?.(index)}
    >
      {/* 内容区域 */}
      <div className="relative z-10 p-2 h-full">
        <div className="flex justify-between items-start h-full">
          {/* 左侧文字信息 */}
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-[9px] leading-[13px] font-normal">
              {index.name}
            </h3>
            
            <div className="flex flex-col">
              <div 
                className="text-base leading-[23px] font-bold font-mono"
                style={{ color: index.isPositive ? '#16BA71' : '#F44345' }}
              >
                {index.value}
              </div>
              
              <div className="flex gap-1 text-[11px] leading-4 font-bold font-mono">
                <span style={{ color: index.isPositive ? '#16BA71' : '#F44345' }}>
                  {index.change}
                </span>
                <span style={{ color: index.isPositive ? '#16BA71' : '#F44345' }}>
                  {index.percentage}%
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
        className="absolute bottom-[24px] left-0 right-0 h-[0.5px] opacity-50"
        style={{ 
          backgroundImage: `repeating-linear-gradient(to right, #4B5269 0, #4B5269 0.735px, transparent 0.735px, transparent 2.206px)`
        }}
      />
    </div>
  );
}