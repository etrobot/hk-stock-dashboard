import { MarketIndices } from "../components/market-indices"
import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"
import { Button } from "../components/ui/button"
import { cnIndices, cnGainers, cnLosers, cnHotStocks, cnDividendStocks } from '../data/mock-data'
import React from "react"

interface CNStockPageProps {
  onStockClick?: (stock: any) => void;
}

export default function CNStockPage({ onStockClick }: CNStockPageProps) {
  return (
    <>
      <div className="flex items-center space-x-6">
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
          自选股
        </Button>
        <Button variant="ghost" className="text-foreground font-medium">
          沪深股市
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          板块
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          新股
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          资金流向
        </Button>
      </div>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <StockTables
              gainers={cnGainers}
              losers={cnLosers}
              hotStocks={cnHotStocks}
              dividendStocks={cnDividendStocks}
              onStockClick={onStockClick}
            />
          </div>
          <div className="w-80 flex-shrink-0">
            <SectorHeatmap />
          </div>
        </div>
      </div>
      <MarketIndices indices={cnIndices} />

    </>
  );
}