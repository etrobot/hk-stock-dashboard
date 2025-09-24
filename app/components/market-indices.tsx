import { MarketIndex } from "../types/market"

interface MarketIndicesProps {
  indices: MarketIndex[];
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
