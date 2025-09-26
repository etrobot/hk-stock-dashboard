'use client'

import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { StockPriceHeader } from './stock-price-header'
import { StockChart } from './stock-chart'
import { IndexInfoPanel } from './index-info-panel'
import { type StockData, mockStockData } from '../data/mockStockData'
import { type IndexDetail } from '../types/market'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { hkHotStocks } from '../data/mock-data'
import { useNavigate } from 'react-router-dom'

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
    status: '交易中'
  }
}

export function StockDetailPage({ titleOverride }: { titleOverride?: string }) {
  const params = useParams()
  const location = useLocation()
  const [stockData, setStockData] = useState<StockData>(mockStockData)

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
  const rankingTitle = titleOverride ?? titleFromUrl ?? '股票排行'

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
      <aside className="w-[260px] border-r border-border flex-shrink-0">
        <div className="p-3 border-b border-border text-sm font-medium text-foreground">{rankingTitle}</div>
        <div className="p-3">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">名称代码</TableHead>
                <TableHead className="text-muted-foreground">最新价</TableHead>
                <TableHead className="text-muted-foreground">涨跌幅</TableHead>
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
      </aside>

      {/* Main Content Area */}
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

          {/* Right Info Panel */}
          <div className="w-[360px] border-l border-border bg-background p-4">
            <IndexInfoPanel indexDetail={transformStockToIndex(stockData)} />
          </div>
        </div>
      </div>
    </div>
  )
}