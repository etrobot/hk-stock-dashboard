import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"
import { cryptoGainers as 加密货币涨幅榜, cryptoLosers as 加密货币跌幅榜, cryptoHotStocks as 加密货币热门币, cryptoDeFiStocks as 加密货币DeFi收益 } from '../data/mock-data'
import { DetailedStockTablePage } from "./DetailedStockTablePage"
import { useState } from "react"

interface CryptoPageProps {
  onStockClick?: (stock: any, tableTitle?: string) => void;
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
              gainers={加密货币涨幅榜}
              losers={加密货币跌幅榜}
              hotStocks={加密货币热门币}
              dividendStocks={加密货币DeFi收益}
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