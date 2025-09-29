import { useState } from "react"
import { MarketIndices } from "./components/market-indices"
import { StockTables } from "./components/stock-tables"
import { SectorHeatmap } from "./components/sector-heatmap"
import { ConceptSectors } from "./components/concept-sectors"
import { Navigation } from "./components/navigation"
import { IndexInfoPanel } from "./components/index-info-panel"
import { Button } from "./components/ui/button"
import { useNavigate } from 'react-router-dom'
import CNStockPage from "./pages/CNStockPage"
import USStockPage from "./pages/USStockPage"
import CryptoPage from "./pages/CryptoPage"
import { DetailedStockTablePage } from "./pages/DetailedStockTablePage"
import { NewStockCenter } from "./components/new-stock-center"
import { hkIndices, hkGainers, hkLosers, hkHotStocks, hkDividendStocks, hkIndexDetail, cnIndexDetail, usIndexDetail, cryptoIndexDetail, hkSectors, cnSectors } from './data/mock-data'
import { useLanguage } from "./contexts/LanguageContext"

function App() {
  const [currentPage, setCurrentPage] = useState('hk')
  const [showDetailedTable, setShowDetailedTable] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<string>(t('tab.home'))

  const navigate = useNavigate()
  const handleStockClick = (stock: any, tableTitle?: string) => {
    const code = stock?.code || stock?.symbol || ''
    console.log('Stock clicked from table:', tableTitle, stock)
    navigate(`/stock/${encodeURIComponent(code)}`)
  }

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

  const getCurrentSectors = () => {
    return currentPage === 'cn' ? cnSectors : hkSectors;
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'cn':
        return <CNStockPage onStockClick={handleStockClick} />
      case 'us':
        return <USStockPage onStockClick={handleStockClick} />
      case 'crypto':
        return <CryptoPage onStockClick={handleStockClick} />
      case 'hk':
      case 'more':
      default:
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
                className={`${activeTab === t('tab.home') ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}
                onClick={() => handleTabChange(t('tab.home'))}
              >
                {t('tab.home')}
              </Button>
              <Button 
                variant="ghost" 
                className={`${activeTab === t('tab.concept_sectors') ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}
                onClick={() => handleTabChange(t('tab.concept_sectors'))}
              >
                {t('tab.concept_sectors')}
              </Button>
              <Button 
                variant="ghost" 
                className={`${activeTab === t('tab.new_stock_center') ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}
                onClick={() => handleTabChange(t('tab.new_stock_center'))}
              >
                {t('tab.new_stock_center')}
              </Button>
            </div>
            <div className="container mx-auto p-4 space-y-6">
            {activeTab === t('tab.home') && <MarketIndices indices={hkIndices} />}

              <div className="flex gap-6">
                {activeTab === t('tab.concept_sectors') ? (
                  <>
                    <ConceptSectors 
                      sectors={getCurrentSectors()}
                      selectedSector={selectedSector}
                      onSectorSelect={handleSectorSelect}
                    />
                    <div className="flex-1 min-w-0">
                      <DetailedStockTablePage 
                        onBack={() => setActiveTab(t('tab.home'))}
                      />
                    </div>
                  </>
                ) : activeTab === t('tab.new_stock_center') ? (
                  <div className="flex-1 min-w-0">
                    <NewStockCenter />
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <StockTables
                        gainers={hkGainers}
                        losers={hkLosers}
                        hotStocks={hkHotStocks}
                        dividendStocks={hkDividendStocks}
                        dividendTitle={t('table.dividend_stocks')}
                        onStockClick={handleStockClick}
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
        )
    }
  }

  return (
    <div className="flex max-w-full overflow-hidden">
      <main className="flex-1 min-h-screen min-w-0">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        {renderPageContent()}
      </main>
      <aside className="w-80 max-w-80 flex-shrink-0 border-l border-border bg-card/30 overflow-y-auto max-h-screen">
        <IndexInfoPanel indexDetail={
          currentPage === 'cn' ? cnIndexDetail :
          currentPage === 'us' ? usIndexDetail :
          currentPage === 'crypto' ? cryptoIndexDetail :
          hkIndexDetail
        } />
      </aside>
    </div>
  )
}

export default App
