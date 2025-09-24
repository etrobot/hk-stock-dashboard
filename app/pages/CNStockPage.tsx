import { MarketIndices } from "../components/market-indices"
import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"

import { cnIndices, cnGainers, cnLosers, cnHotStocks, cnDividendStocks } from '../data/mock-data'
import { DetailedStockTablePage } from "./DetailedStockTablePage"
import { useState } from "react"

interface CNStockPageProps {
  onStockClick?: (stock: any) => void;
}

export default function CNStockPage({ onStockClick }: CNStockPageProps) {
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
      <div className="container mx-auto p-4 space-y-6">
      <MarketIndices indices={cnIndices} />

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <StockTables
              gainers={cnGainers}
              losers={cnLosers}
              hotStocks={cnHotStocks}
              dividendStocks={cnDividendStocks}
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