import { useState } from "react"
import { MarketIndices } from "./components/market-indices"
import { StockTables } from "./components/stock-tables"
import { SectorHeatmap } from "./components/sector-heatmap"
import { Navigation } from "./components/navigation"
import { IndexInfoPanel } from "./components/index-info-panel"
import { ThemeProvider } from "./components/theme-provider"
import { StockDetailPage } from "./components/stock-detail-page"
import { Button } from "./components/ui/button"
import CNStockPage from "./pages/CNStockPage"
import USStockPage from "./pages/USStockPage"
import CryptoPage from "./pages/CryptoPage"
import { hkIndices, hkGainers, hkLosers, hkHotStocks, hkIndexDetail, cnIndexDetail, usIndexDetail, cryptoIndexDetail } from './data/mock-data'

function App() {
  const [currentPage, setCurrentPage] = useState('hk')

  const renderPageContent = () => {
    switch (currentPage) {
      case 'cn':
        return <CNStockPage />
      case 'us':
        return <USStockPage />
      case 'crypto':
        return <CryptoPage />
      case 'hk':
      case 'more':
      default:
        return (
          <>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                首页
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                概念板块
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                新股中心
              </Button>
            </div>
            <div className="container mx-auto p-4 space-y-6">
              <div className="flex gap-4">
                <MarketIndices indices={hkIndices} />
              </div>

              <div className="flex gap-6">
                <div className="flex-1 min-w-0">
                  <StockTables
                    gainers={hkGainers}
                    losers={hkLosers}
                    hotStocks={hkHotStocks}
                  />
                </div>
                <div className="w-80 flex-shrink-0">
                  <SectorHeatmap />
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground dark">
        {currentPage === 'stock-detail' ? (
          // 股票详情页全屏显示
          <StockDetailPage />
        ) : (
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
        )}
      </div>
    </ThemeProvider>
  )
}

export default App