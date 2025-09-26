import { MarketIndices } from "../components/market-indices"
import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"
import { ConceptSectors } from "../components/concept-sectors"
import { Button } from "../components/ui/button"
import { usIndices, usGainers, usLosers, usHotStocks, usDividendStocks, usSectors } from '../data/mock-data'
import { DetailedStockTablePage } from "./DetailedStockTablePage"
import { useState } from "react"

interface USStockPageProps {
  onStockClick?: (stock: any, tableTitle?: string) => void;
}

export default function USStockPage({ onStockClick }: USStockPageProps) {
  const [showDetailedTable, setShowDetailedTable] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('首页');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const handleShowMore = (tableType: string) => {
    setShowDetailedTable(tableType);
  };

  const handleBackToMain = () => {
    setShowDetailedTable(null);
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleSectorSelect = (sectorName: string) => {
    setSelectedSector(selectedSector === sectorName ? null : sectorName);
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
      <div className="flex items-center space-x-6 ml-6">
        <Button 
          variant="ghost" 
          className={`${activeTab === '首页' ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}
          onClick={() => handleTabChange('首页')}
        >
          首页
        </Button>
        <Button 
          variant="ghost" 
          className={`${activeTab === '概念板块' ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}
          onClick={() => handleTabChange('概念板块')}
        >
          概念板块
        </Button>
      </div>
      <div className="container mx-auto p-4 space-y-6">
      {activeTab !== '概念板块' && <MarketIndices indices={usIndices} />}

        <div className="flex gap-6">
          {activeTab === '概念板块' ? (
            <>
              <ConceptSectors 
                sectors={usSectors}
                selectedSector={selectedSector}
                onSectorSelect={handleSectorSelect}
              />
              <div className="flex-1 min-w-0">
                <DetailedStockTablePage 
                  onBack={() => setActiveTab('首页')}
                />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}