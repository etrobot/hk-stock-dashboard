import { MarketIndex } from "../types/market"

interface MarketIndicesProps {
  indices: MarketIndex[];
}

// 简化的趋势图组件
function TrendChart({ isPositive }: { isPositive: boolean }) {
  return (
    <div className="relative w-[50px] h-[35px] overflow-hidden">
      <svg width="50" height="35" viewBox="0 0 50 35" className="absolute inset-0">
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(22, 186, 113, 0.2)" />
            <stop offset="100%" stopColor="rgba(244, 67, 69, 0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 27L2 23C3 22 5 22 5 23C6 25 8 25 9 24L10 21C10 21 10 20 11 20L12 19C13 18 15 18 15 19C16 20 18 20 19 19L19 18C20 17 22 17 23 19L23 18C24 20 26 21 27 19L28 18C28 17 29 17 29 16L30 14C30 12 32 12 33 13C33 14 34 15 35 14L36 13C37 12 39 12 39 13C40 15 43 15 43 13L44 11C44 10 44 10 44 10L46 7C46 6 47 7 48 8C48 9 49 9 49 8L50 0V35H0V28C0 28 0 27 0 27"
          fill="url(#trendGradient)"
        />
        <path
          d="M2 25L-0.5 35H0.5L3 25C3 24 4 24 4 25C4 25 6 25 7 25C8 26 10 26 10 25L11 22C11 21 12 21 12 20L13 19C13 19 14 19 14 19C14 19 15 19 15 19C16 20 17 20 18 19L18 19C19 18 21 18 22 19L22 19C23 20 25 20 27 19L28 18C28 17 28 17 29 17L30 14C30 12 31 12 32 13C33 14 34 14 35 13L35 14C36 13 37 13 38 13C39 12 40 12 41 13C42 15 43 15 43 13L44 11C44 10 44 10 46 7C46 7 47 7 47 7C47 8 48 8 48 8L49 0L50 0V35H0V25"
          fill="#16BA71"
        />
      </svg>
    </div>
  )
}

export function MarketIndices({ indices }: MarketIndicesProps) {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {indices.map((index, i) => (
        <div 
          key={i} 
          className="relative rounded-[4px] shadow-sm min-w-[250px] h-16 flex-shrink-0 overflow-hidden"
          style={{ 
            backgroundColor: index.isPositive ? 'rgba(22, 186, 113, 0.16)' : 'rgba(244, 67, 69, 0.16)'
          }}
        >
          {/* 内容区域 */}
          <div className="relative z-10 p-2 h-full">
            <div className="flex justify-between items-start h-full">
              {/* 左侧文字信息 */}
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-[9px] leading-[13px] text-white font-normal">
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
                <TrendChart isPositive={index.isPositive} />
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
      ))}
    </div>
  )
}
