import { Card } from "./ui/card"
import { TrendingUp } from "lucide-react"
import { MarketIndex } from "../market"

interface MarketIndicesProps {
  indices: MarketIndex[];
}

export function MarketIndices({ indices }: MarketIndicesProps) {
  return (
    <div className="flex space-x-6 bg-[#11131B] py-2 px-4">
      {indices.map((index, i) => (
        <div key={i} className="flex items-center space-x-2 min-w-[200px]">
          <span className="text-white text-xs font-medium">{index.name}</span>
          <span className={`text-xs font-mono ${index.isPositive ? "text-[#16BA71]" : "text-[#16BA71]"}`}>
            {index.value}
          </span>
          <span className={`text-xs font-mono ${index.isPositive ? "text-[#16BA71]" : "text-[#16BA71]"}`}>
            {index.change}
          </span>
          <span className={`text-xs font-mono ${index.isPositive ? "text-[#16BA71]" : "text-[#16BA71]"}`}>
            {index.percentage}%
          </span>
          <div className="w-[7px] h-[10px] flex items-center justify-center">
            <svg width="7" height="10" viewBox="0 0 7 10" fill="currentColor" className={index.isPositive ? "text-[#16BA71] rotate-180" : "text-[#16BA71]"}>
              <path d="M4.8292 0L2.1708 0L2.1708 5.67698L0 5.67698L3.5 10L7 5.67698L4.8292 5.67698L4.8292 0Z"/>
            </svg>
          </div>
          <span className="text-white text-xs">
            {index.name === '恒生指数' ? '2258亿' : index.name === '国企指数' ? '669亿' : '669亿'}
          </span>
        </div>
      ))}
    </div>
  )
}
