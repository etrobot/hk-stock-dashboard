import { SectorData, MarketIndex } from "../types/market"
import { MarketIndexItem } from "./market-index-item"

interface ConceptSectorsProps {
  sectors: SectorData[]
  selectedSector: string | null
  onSectorSelect: (sectorName: string) => void
}

// 将 SectorData 转换为 MarketIndex 格式
function convertSectorToMarketIndex(sector: SectorData): MarketIndex {
  return {
    name: sector.name,
    value: sector.percentage, // 使用百分比作为主要值显示
    change: sector.change,
    percentage: sector.percentage.replace('%', ''), // 移除百分号，因为MarketIndexItem会自动添加
    isPositive: sector.isPositive
  }
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
                index={convertSectorToMarketIndex(sector)}
                showBackground={false}
                className="hover:bg-muted/30"
              />
            </div>
          ))}
        </div>
    </div>
  )
}