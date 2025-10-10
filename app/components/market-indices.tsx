import { MarketIndex } from "../types/market"
import { MarketIndexItem } from "./market-index-item"

interface MarketIndicesProps {
  indices: MarketIndex[];
  showBackground?: boolean;
  onIndexClick?: (index: MarketIndex) => void;
}

export function MarketIndices({ indices, showBackground = true, onIndexClick }: MarketIndicesProps) {
  return (
    <>
      <div className="flex gap-4 px-3 py-2 overflow-x-auto bg-transparent w-full">
        {indices.map((index, i) => (
          <MarketIndexItem 
            key={i} 
            index={index} 
            showBackground={showBackground}
            onClick={onIndexClick}
          />
        ))}
      </div>
      
      <div className="fixed left-16 right-0 bottom-0 bg-card text-card-foreground text-xs px-4 py-2 overflow-x-auto whitespace-nowrap z-40 m-0 border-t border-border">
        <span className="text-green-600 dark:text-green-300">交易中：</span>
        <span className="mx-2">恒生指数 26643.88 <span className="text-green-600 dark:text-green-300">+21.00 +0.08%</span></span>
        <span className="mx-2">国企指数 9466.93 <span className="text-green-600 dark:text-green-300">+12.81 +0.14%</span></span>
        <span className="mx-2">恒生科技指数 6372.68 <span className="text-green-600 dark:text-green-300">+48.43 +0.77%</span></span>
      </div>
    </>
  )
}
