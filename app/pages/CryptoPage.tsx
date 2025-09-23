import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"
import { cryptoGainers, cryptoLosers, cryptoHotStocks, cryptoDeFiStocks } from '../data/mock-data'
import { DetailedStockTablePage } from "./DetailedStockTablePage"
import React, { useState } from "react"

interface CryptoPageProps {
  onStockClick?: (stock: any) => void;
}

export default function CryptoPage({ onStockClick }: CryptoPageProps) {
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
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <StockTables
              gainers={cryptoGainers}
              losers={cryptoLosers}
              hotStocks={cryptoHotStocks}
              dividendStocks={cryptoDeFiStocks}
              dividendTitle="DeFi收益"
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