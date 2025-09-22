import { useState } from "react"
import { MarketIndices } from "./components/market-indices"
import { StockTables } from "./components/stock-tables"
import { SectorHeatmap } from "./components/sector-heatmap"
import { Navigation } from "./components/navigation"
import { IndexInfoPanel } from "./components/index-info-panel"
import { Button } from "./components/ui/button"
import { useNavigate } from 'react-router-dom'
import CNStockPage from "./pages/CNStockPage"
import USStockPage from "./pages/USStockPage"
import CryptoPage from "./pages/CryptoPage"
import { hkIndices, hkGainers, hkLosers, hkHotStocks, hkIndexDetail, cnIndexDetail, usIndexDetail, cryptoIndexDetail } from './data/mock-data'
import React from "react"

function App() {
  const [currentPage, setCurrentPage] = useState('hk')

  const navigate = useNavigate()
  const handleStockClick = (stock: any) => {
    const code = stock?.code || stock?.symbol || ''
    navigate(`/stock/${encodeURIComponent(code)}`)
  }

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
              <div className="flex gap-6">
                <div className="flex-1 min-w-0">
                  <StockTables
                    gainers={hkGainers}
                    losers={hkLosers}
                    hotStocks={hkHotStocks}
                    onStockClick={handleStockClick}
                  />
                </div>
                <div className="w-80 flex-shrink-0">
                  <SectorHeatmap />
                </div>
              </div>
            </div>
            <MarketIndices indices={hkIndices} />
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
