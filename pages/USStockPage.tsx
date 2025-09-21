import { MarketIndices } from "../components/market-indices"
import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"
import { Button } from "../components/ui/button"
import { usIndices, usGainers, usLosers, usHotStocks, usDividendStocks } from '../data/mock-data'

export default function USStockPage() {
  return (
    <>
      <div className="flex items-center space-x-6">
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
          我的自选
        </Button>
        <Button variant="ghost" className="text-foreground font-medium">
          美股市场
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          板块
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          IPO
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          财报日历
        </Button>
      </div>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex gap-4">
          <MarketIndices indices={usIndices} />
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <StockTables 
              gainers={usGainers}
              losers={usLosers}
              hotStocks={usHotStocks}
              dividendStocks={usDividendStocks}
            />
          </div>
          <div className="w-80 flex-shrink-0">
            <SectorHeatmap />
          </div>
        </div>
      </div>
    </>
  );
}