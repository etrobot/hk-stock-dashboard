import { MarketIndex } from "../types/market"
import { MarketIndexItem } from "./market-index-item"

interface MarketIndicesProps {
  indices: MarketIndex[];
  showBackground?: boolean;
}

export function MarketIndices({ indices, showBackground = true }: MarketIndicesProps) {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {indices.map((index, i) => (
        <MarketIndexItem 
          key={i} 
          index={index} 
          showBackground={showBackground}
        />
      ))}
    </div>
  )
}
