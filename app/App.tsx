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
import FundsPage from "./pages/FundsPage"
import { DetailedStockTablePage } from "./pages/DetailedStockTablePage"
import { NewStockCenter } from "./components/new-stock-center"
import { hkIndices, hkGainers, hkLosers, hkHotStocks, hkDividendStocks, hkIndexDetail, cnIndexDetail, usIndexDetail, cryptoIndexDetail, hkSectors, cnSectors } from './data/mock-data'
import { MarketIndex, IndexDetail } from './types/market'
import { useLanguage } from "./contexts/LanguageContext"

function App() {
  const [currentPage, setCurrentPage] = useState('hk')
  const [showDetailedTable, setShowDetailedTable] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [selectedIndexDetail, setSelectedIndexDetail] = useState<IndexDetail | null>(null)
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<string>(t('tab.home'))

  const navigate = useNavigate()
  type ClickableStock = { code?: string; symbol?: string }
  const handleStockClick = (stock: ClickableStock, tableTitle?: string) => {
    const code = stock?.code || stock?.symbol || ''
    console.log('Stock clicked from table:', tableTitle, stock)
    const url = `/stock/${encodeURIComponent(code)}`
    if (tableTitle) {
      navigate(`${url}?title=${encodeURIComponent(tableTitle)}`)
    } else {
      navigate(url)
    }
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

  const convertMarketIndexToIndexDetail = (index: MarketIndex): IndexDetail => {
    // Generate mock data for missing fields
    const baseValue = parseFloat(index.value.replace(/,/g, ''));
    const changeValue = parseFloat(index.change.replace(/[+,-]/g, ''));

    
    return {
      code: getIndexCode(index.name),
      name: index.name,
      value: index.value,
      change: index.change,
      percentage: index.percentage,
      isPositive: index.isPositive,
      high: (baseValue + changeValue * 1.5).toLocaleString(),
      low: (baseValue - changeValue * 1.2).toLocaleString(),
      open: (baseValue - changeValue * 0.5).toLocaleString(), 
      close: (baseValue - changeValue).toLocaleString(),
      volume: `${Math.floor(Math.random() * 900 + 100)}亿`,
      avgPrice: (baseValue + changeValue * 0.3).toLocaleString(),
      market: currentPage === 'hk' ? '港股' : currentPage === 'cn' ? 'A股' : 'US股',
      status: `交易中 ${new Date().toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })} ${new Date().toLocaleTimeString('zh-CN', { hour12: false })}`
    };
  };

  const getIndexCode = (name: string): string => {
    const codeMap: { [key: string]: string } = {
      '恒生指数': '800000',
      '恒生科技指数': '800700',
      '恒生国企指数': '800100',
      '国企指数': '800200',
      '上证指数': '000001',
      '深证成指': '399001',
      '创业板指': '399006',
    };
    return codeMap[name] || '000000';
  };

  const handleIndexClick = (index: MarketIndex) => {
    const indexDetail = convertMarketIndexToIndexDetail(index);
    setSelectedIndexDetail(indexDetail);
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
      case 'funds':
        return <FundsPage />
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
            <div className="container mx-auto p-3 space-y-3">
            {activeTab === t('tab.home') && <MarketIndices indices={hkIndices} onIndexClick={handleIndexClick} />}

              <div className="flex gap-4">
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
                    <div className="w-72 flex-shrink-0">
                      <SectorHeatmap currentMarket={currentPage} />
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
        {currentPage === 'funds' ? (
          <div className="h-full p-4">
            <div className="h-full rounded-md border bg-background">
              <iframe
                src="http://tfi.ifund.mobi:84/app?securityCode=850006"
                className="w-full h-full rounded-md"
                title="Fund Details"
                frameBorder="0"
              />
            </div>
          </div>
        ) : (
          <IndexInfoPanel indexDetail={
            selectedIndexDetail || (
              currentPage === 'cn' ? cnIndexDetail :
              currentPage === 'us' ? usIndexDetail :
              currentPage === 'crypto' ? cryptoIndexDetail :
              hkIndexDetail
            )
          } />
        )}
      </aside>
    </div>
  )
}

export default App
