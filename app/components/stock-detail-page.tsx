'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { StockPriceHeader } from './stock-price-header'
import { StockChart } from './stock-chart'
import { TradingPanel } from './trading-panel'
import { MarketIndices } from './market-indices'
import { mockStockData, mockMarketIndices, type StockData } from '../data/mockStockData'
import type { MarketIndex } from '../types/market'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { hkHotStocks } from '../data/mock-data'
import { useNavigate } from 'react-router-dom'

export function StockDetailPage({ titleOverride }: { titleOverride?: string }) {
  const params = useParams()
  const [stockData, setStockData] = useState<StockData>(mockStockData)

  // Sync symbol from route params if present
  useEffect(() => {
    const symbolParam = (params as any)?.symbol as string | undefined
    if (symbolParam) {
      setStockData(prev => ({ ...prev, symbol: symbolParam }))
    }
  }, [params])

  // Convert mock data to match MarketIndex interface
  const [marketIndices] = useState<MarketIndex[]>(
    mockMarketIndices.map(index => ({
      name: index.name,
      value: index.value,
      change: index.change,
      percentage: index.changePercent,
      isPositive: index.isPositive
    }))
  )

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prev => {
        const randomChange = (Math.random() - 0.5) * 0.1
        const newPrice = prev.price + randomChange
        const newChange = newPrice - prev.previousClose
        const newChangePercent = (newChange / prev.previousClose) * 100

        return {
          ...prev,
          price: Number(newPrice.toFixed(3)),
          change: Number(newChange.toFixed(3)),
          changePercent: Number(newChangePercent.toFixed(2))
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()
  const rankingTitle = titleOverride ?? `${stockData?.symbol || ''} 榜`

  return (
    <div className="flex h-screen bg-[#11131B]">
      {/* Left Ranking Sidebar */}
      <aside className="w-[260px] border-r border-gray-800 flex-shrink-0">
        <div className="p-3 border-b border-gray-800 text-sm font-medium">{rankingTitle}</div>
        <div className="p-3">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">名称代码</TableHead>
                <TableHead className="text-gray-400">最新价</TableHead>
                <TableHead className="text-gray-400">涨跌幅</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hkHotStocks.slice(0, 20).map((s, idx) => (
                <TableRow
                  key={`${s.code}-${idx}`}
                  className="border-gray-800 hover:bg-white/5 cursor-pointer"
                  onClick={() => navigate(`/stock/${encodeURIComponent(s.code)}`)}
                >
                  <TableCell className="text-sm whitespace-nowrap">
                    <div className="flex flex-col leading-tight">
                      <span>{s.name}</span>
                      <span className="text-xs text-gray-400">{s.code}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-mono text-white">{s.price}</TableCell>
                  <TableCell className={`text-sm font-mono ${s.percentage?.startsWith('+') ? 'text-[#16BA71]' : s.percentage?.startsWith('-') ? 'text-[#F44345]' : 'text-gray-300'}`}>{s.percentage}</TableCell>
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

          {/* Right Trading Panel */}
          <div className="w-[274px] border-l border-gray-800 bg-[#11131B]">
            <TradingPanel stockData={stockData} />
          </div>
        </div>
      </div>
    </div>
  )
}