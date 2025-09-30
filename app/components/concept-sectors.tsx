import { MarketIndex } from "../types/market"
import { MarketIndexItem } from "./market-index-item"
import { mockChartData } from "../data/mockStockData"

interface ConceptSectorsProps {
  sectors: MarketIndex[]
  selectedSector: string | null
  onSectorSelect: (sectorName: string) => void
}

// 生成基于 mockChartData 的趋势数据
function generateSectorTrendData(sectorName: string, isPositive: boolean): number[] {
  // 使用 sector 名称作为种子来保证一致性
  const seed = sectorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  const data: number[] = [];
  let currentValue = 50 + (random(seed) - 0.5) * 20;
  
  for (let i = 0; i < 12; i++) {
    const changeRange = isPositive ? [-1.5, 3] : [-3, 1.5];
    const change = (random(seed + i) * (changeRange[1] - changeRange[0])) + changeRange[0];
    currentValue = Math.max(10, Math.min(90, currentValue + change));
    data.push(currentValue);
  }
  
  return data;
}

export function ConceptSectors({ sectors, selectedSector, onSectorSelect }: ConceptSectorsProps) {
  return (
    <div className="w-64 flex-shrink-0">
        <div className="space-y-2">
          {sectors.map((sector, i) => (
            <div
              key={i}
              className={`cursor-pointer transition-all rounded-lg ${
                selectedSector === sector.name
                  ? "ring-2 ring-primary/50"
                  : "hover:ring-1 hover:ring-muted-foreground/20"
              }`}
              onClick={() => onSectorSelect(sector.name)}
            >
              <MarketIndexItem 
                index={sector}
                showBackground={false}
                className="hover:bg-muted/30"
                customChartData={generateSectorTrendData(sector.name, sector.isPositive)}
              />
            </div>
          ))}
        </div>
    </div>
  )
}