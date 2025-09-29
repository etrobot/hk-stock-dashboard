'use client'

import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { StockPriceHeader } from './stock-price-header'
import { StockChart } from './stock-chart'
import { IndexInfoPanel } from './index-info-panel'
import { type StockData, mockStockData } from '../data/mockStockData'
import { type IndexDetail } from '../types/market'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { hkHotStocks } from '../data/mock-data'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { List, Grid3X3 } from 'lucide-react'
import { StockGridItem } from './stock-grid-item'

// Transform StockData to IndexDetail format
function transformStockToIndex(stockData: StockData): IndexDetail {
  return {
    code: stockData.symbol,
    name: stockData.name,
    value: stockData.price.toString(),
    change: stockData.change > 0 ? `+${stockData.change.toFixed(3)}` : stockData.change.toFixed(3),
    percentage: stockData.changePercent > 0 ? `+${stockData.changePercent.toFixed(2)}%` : `${stockData.changePercent.toFixed(2)}%`,
    isPositive: stockData.change >= 0,
    high: stockData.high.toString(),
    low: stockData.low.toString(),
    open: stockData.open.toString(),
    close: stockData.previousClose.toString(),
    volume: stockData.turnover,
    avgPrice: ((stockData.high + stockData.low) / 2).toFixed(3),
    market: stockData.market,
    status: 'stock_detail.status_trading'
  }
}


export function StockDetailPage({ titleOverride }: { titleOverride?: string }) {
  const params = useParams()
  const location = useLocation()
  const [stockData, setStockData] = useState<StockData>(mockStockData)
  const [sidebarViewMode, setSidebarViewMode] = useState<'list' | 'grid'>('list')
  const [selectedPeriod, setSelectedPeriod] = useState('daily')
  const { t } = useLanguage()

  // Check if we're on the watchlist route
  const isWatchlistRoute = location.pathname === '/watchlist'

  // Get title from URL search params if available
  const searchParams = new URLSearchParams(location.search)
  const titleFromUrl = searchParams.get('title')

  // Sync symbol from route params if present
  useEffect(() => {
    const symbolParam = (params as any)?.symbol as string | undefined
    if (symbolParam) {
      setStockData(prev => ({ ...prev, symbol: symbolParam }))
    }
  }, [params])


  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prev => ({
        ...mockStockData,
        ...prev,
        price: Number((prev.price + (Math.random() - 0.5) * 0.1).toFixed(3)),
        change: Number((prev.price + (Math.random() - 0.5) * 0.1 - prev.previousClose).toFixed(3)),
        changePercent: Number((((prev.price + (Math.random() - 0.5) * 0.1 - prev.previousClose) / prev.previousClose) * 100).toFixed(2))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()
  const rankingTitle = titleOverride ?? titleFromUrl ?? t('stock_detail.ranking')

  // Handle sidebar item click based on route
  const handleSidebarItemClick = (stockCode: string) => {
    if (isWatchlistRoute) {
      // In watchlist route, only update the stock data without changing route
      setStockData(prev => ({ ...prev, symbol: stockCode }))
    } else {
      // In other routes, navigate to the stock detail page
      navigate(`/stock/${encodeURIComponent(stockCode)}`)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Ranking Sidebar */}
      <aside className={`${sidebarViewMode === 'grid' ? 'flex-1' : 'w-[260px]'} border-r border-border flex-shrink-0 flex flex-col`}>
        <div className="p-3 border-b border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">{rankingTitle}</span>
            <div className="flex items-center gap-1">
              <Button
                variant={sidebarViewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSidebarViewMode('list')}
                className="h-6 w-6 p-0"
              >
                <List className="w-3 h-3" />
              </Button>
              <Button
                variant={sidebarViewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSidebarViewMode('grid')}
                className="h-6 w-6 p-0"
              >
                <Grid3X3 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {sidebarViewMode === 'list' ? (
            <div className="p-3">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">{t('stock_detail.name_code')}</TableHead>
                    <TableHead className="text-muted-foreground">{t('stock_detail.latest_price')}</TableHead>
                    <TableHead className="text-muted-foreground">{t('stock_detail.change_percent')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hkHotStocks.slice(0, 20).map((s, idx) => (
                    <TableRow
                      key={`${s.code}-${idx}`}
                      className="border-border hover:bg-muted/20 cursor-pointer"
                      onClick={() => handleSidebarItemClick(s.code)}
                    >
                      <TableCell className="text-sm whitespace-nowrap">
                        <div className="flex flex-col leading-tight">
                          <span className="text-foreground">{s.name}</span>
                          <span className="text-xs text-muted-foreground">{s.code}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-mono text-foreground">{s.price}</TableCell>
                      <TableCell className={`text-sm font-mono ${s.percentage?.startsWith('+') ? 'text-green-500' : s.percentage?.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'}`}>{s.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-3 h-full flex flex-col">
              {/* Period Selector */}
              <div className="flex-shrink-0 mb-3 pb-3 border-b border-border">
                <div className="flex gap-1 flex-wrap">
                  {[
                    { key: 'daily', label: '日' },
                    { key: 'weekly', label: '周' },
                    { key: 'monthly', label: '月' },
                    { key: 'quarterly', label: '季' },
                    { key: 'yearly', label: '年' }
                  ].map((period) => (
                    <Button
                      key={period.key}
                      variant={selectedPeriod === period.key ? 'default' : 'ghost'}
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setSelectedPeriod(period.key)}
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Grid Layout */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {hkHotStocks.slice(0, 20).map((s, idx) => (
                    <StockGridItem
                      key={`${s.code}-${idx}`}
                      stock={s}
                      selectedPeriod={selectedPeriod}
                      onClick={() => handleSidebarItemClick(s.code)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area - Only show in list mode */}
      {sidebarViewMode === 'list' && (
        <div className="flex-1 flex flex-col">
          {/* Main Content */}
          <div className="flex flex-1">
            {/* Content Area */}
            <div className="flex-1 flex flex-col p-4">
              {/* Stock Price Header */}
              <div className="mb-4">
                <StockPriceHeader stockData={stockData} />
              </div>

              {/* Chart Area */}
              <div className="mb-4">
                <StockChart symbol={stockData.symbol} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Info Panel - Always visible */}
      <div className="w-[360px] border-l border-border bg-background p-4 flex-shrink-0">
        <IndexInfoPanel indexDetail={transformStockToIndex(stockData)} />
      </div>
    </div>
  )
}