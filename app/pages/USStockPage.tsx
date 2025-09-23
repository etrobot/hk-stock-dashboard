import { MarketIndices } from "../components/market-indices"
import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"
import { Button } from "../components/ui/button"
import { usIndices, usGainers, usLosers, usHotStocks, usDividendStocks } from '../data/mock-data'
import { DetailedStockTablePage } from "./DetailedStockTablePage"
import React, { useState } from "react"

interface USStockPageProps {
  onStockClick?: (stock: any) => void;
}

export default function USStockPage({ onStockClick }: USStockPageProps) {
  const [showDetailedTable, setShowDetailedTable] = useState<string | null>(null);

  const handleShowMore = (tableType: string) => {
    setShowDetailedTable(tableType);
  };

  const handleBackToMain = () => {
    setShowDetailedTable(null);
  };

  if (showDetailedTable) {
    return (
      <DetailedStockTablePage 
        title={showDetailedTable} 
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <>
      <div className="flex items-center space-x-6">
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
          首页
        </Button>
        <Button variant="ghost" className="text-foreground font-medium">
          概念板块
        </Button>
      </div>
      <div className="container mx-auto p-4 space-y-6">
      <MarketIndices indices={usIndices} />

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <StockTables
              gainers={usGainers}
              losers={usLosers}
              hotStocks={usHotStocks}
              dividendStocks={usDividendStocks}
              onStockClick={onStockClick}
              onShowMore={handleShowMore}
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