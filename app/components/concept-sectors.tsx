import { SectorData } from "../types/market"

interface ConceptSectorsProps {
  sectors: SectorData[]
  selectedSector: string | null
  onSectorSelect: (sectorName: string) => void
}

export function ConceptSectors({ sectors, selectedSector, onSectorSelect }: ConceptSectorsProps) {
  return (
    <div className="w-64 flex-shrink-0">
        <div className="space-y-2">
          {sectors.map((sector, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedSector === sector.name
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-muted/30 hover:bg-muted/50 border border-transparent"
              }`}
              onClick={() => onSectorSelect(sector.name)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{sector.name}</span>
                <span
                  className={`text-xs font-semibold ${
                    sector.isPositive ? "text-chart-1" : "text-chart-2"
                  }`}
                >
                  {sector.percentage}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {sector.isPositive ? "+" : ""}{sector.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {sector.isPositive ? "↑" : "↓"}
                </span>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}