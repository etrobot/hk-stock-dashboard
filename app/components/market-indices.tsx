import { ArrowDown } from "lucide-react"
import { MarketIndex } from "../types/market"

interface MarketIndicesProps {
  indices: MarketIndex[];
}

export function MarketIndices({ indices }: MarketIndicesProps) {
  return (
    <div className="flex space-x-6 bg-[#11131B] py-2 px-4">
      {indices.map((index, i) => (
        <div key={i} className="flex items-center space-x-2 min-w-[200px]">
          <span className="text-white text-xs font-medium">{index.name}</span>
          <span className={`text-xs font-mono ${index.isPositive ? "text-[#F44345]" : "text-[#16BA71]"}`}>
            {index.value}
          </span>
          <span className={`text-xs font-mono ${index.isPositive ? "text-[#F44345]" : "text-[#16BA71]"}`}>
            {index.change}
          </span>
          <span className={`text-xs font-mono ${index.isPositive ? "text-[#F44345]" : "text-[#16BA71]"}`}>
            {index.percentage}%
          </span>
          <div className="w-[7px] h-[10px] flex items-center justify-center">
            <ArrowDown className={index.isPositive ? "w-[7px] h-[10px] text-[#F44345] rotate-180" : "w-[7px] h-[10px] text-[#16BA71]"} />
          </div>
          <span className="text-white text-xs">
            {index.name === '恒生指数' ? '2258亿' : index.name === '国企指数' ? '669亿' : '669亿'}
          </span>
        </div>
      ))}
    </div>
  )
}
