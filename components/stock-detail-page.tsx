'use client'

import { useState, useEffect } from 'react'
import { StockPriceHeader } from './stock-price-header'
import { StockChart } from './stock-chart'
import { OrderBook } from './order-book'
import { TradingPanel } from './trading-panel'
import { MarketIndices } from './market-indices'
import { mockStockData, mockMarketIndices, type StockData } from '../data/mockStockData'
import type { MarketIndex } from '../types/market'

// 左侧导航组件
function SidebarNavigation() {
  const navItems = [
    { id: 'watchlist', name: '自选', icon: '📊', active: true },
    { id: 'market', name: '市场', icon: '📈', active: false },
    { id: 'account', name: '账户', icon: '👤', active: false },
    { id: 'options', name: '期权', icon: '$', active: false },
    { id: 'discovery', name: '发现', icon: '🔍', active: false },
  ]

  return (
    <div className="w-[88px] h-screen bg-[#272F3A] flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#272F3A] text-xs font-bold">T</span>
        </div>
      </div>

      {/* 折叠按钮 */}
      <div className="flex items-center justify-end px-4 mb-4">
        <button className="text-[#DBDBE0] hover:text-white">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M0.329 0h7.309c.181 0 .329.147.329.329s-.148.329-.329.329H.329A.329.329 0 0 1 0 .329C0 .147.147 0 .329 0zM1.932 5.106V2.327L.138 3.583l1.794 1.523zm5.714-2.779H2.869a.329.329 0 0 0 0 .658h4.777a.329.329 0 0 0 0-.658zm0 2.121H2.869a.329.329 0 0 0 0 .658h4.777a.329.329 0 0 0 0-.658zm0 2.327H.337a.329.329 0 0 0 0 .658h7.309a.329.329 0 0 0 0-.658z"/>
          </svg>
        </button>
      </div>

      {/* 当前选中的导航项 - 自选 */}
      <div className="px-2 mb-4">
        <div className="bg-[#1D212A] rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-4 h-4 bg-transparent border border-[#DBDBE0] rounded flex items-center justify-center">
              <svg width="13" height="12" viewBox="0 0 13 12" fill="currentColor" className="text-[#DBDBE0]">
                <path d="M8.414 0H4.978C3.235 0 2.345.004 1.681.347A1.334 1.334 0 0 0 .347 1.681C.004 2.345 0 3.235 0 4.978v2.218c0 1.743.004 2.633.347 3.297.296.57.764 1.039 1.334 1.334.664.344 1.554.347 3.297.347h3.436c1.743 0 2.633-.003 3.297-.347a1.334 1.334 0 0 0 1.334-1.334c.344-.664.347-1.554.347-3.297V4.978c0-1.743-.003-2.633-.347-3.297A1.334 1.334 0 0 0 11.71.347C11.047.004 10.157 0 8.414 0zM6.763 9.672a.456.456 0 0 1-.913 0V3.432a.456.456 0 0 1 .913 0v6.24zM3.196 9.215a.456.456 0 0 0 .913 0V5.461a.456.456 0 0 0-.913 0v3.754zM9.418 9.215a.456.456 0 0 0 .913 0V7.017a.456.456 0 0 0-.913 0v2.198z"/>
              </svg>
            </div>
            <span className="text-white text-sm">自选</span>
          </div>
        </div>
      </div>

      {/* 其他导航项 */}
      <div className="flex-1 px-2 space-y-2">
        {navItems.slice(1).map((item) => (
          <div key={item.id} className="px-3 py-2 text-[#9FA0A9] hover:text-white cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <span className="text-xs">{item.icon}</span>
              </div>
              <span className="text-sm">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 顶部状态栏组件
function TopStatusBar() {
  return (
    <div className="h-5 bg-[#11131B] border-b border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4 text-xs text-white">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white text-[8px] font-medium">HK</span>
          </div>
          <span className="text-[10px]">收市竞价</span>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-xs text-[#919CAD]">
        <span className="text-[10px]">CN 07/09 16:04:36</span>
        <div className="w-2 h-2 border border-[#919CAD] rounded-full"></div>
      </div>
    </div>
  )
}

// 主页面组件
export function StockDetailPage() {
  const [stockData, setStockData] = useState<StockData>(mockStockData)

  // 将 mock 数据转换为符合 MarketIndex 接口的格式
  const [marketIndices] = useState<MarketIndex[]>(
    mockMarketIndices.map(index => ({
      name: index.name,
      value: index.value,
      change: index.change,
      percentage: index.changePercent,
      isPositive: index.isPositive
    }))
  )

  // 模拟实时价格更新
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

  return (
    <div className="min-h-screen bg-[#11131B] text-white">
      <div className="flex">
        {/* 左侧导航 */}
        <SidebarNavigation />

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 顶部状态栏 */}
          <TopStatusBar />

          {/* 天风国际PC客户端标题 */}
          <div className="h-8 bg-[#11131B] flex items-center justify-center border-b border-gray-800 relative">
            <span className="text-white text-xs font-medium">天风国际PC客户端</span>
            <div className="absolute right-4">
              <button className="bg-[#FF5C00] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[#e54f00] transition-colors">
                快捷交易
              </button>
            </div>
          </div>

          <div className="flex flex-1">
            {/* 中间内容 */}
            <div className="flex-1 p-4">
              {/* 市场指数 */}
              <div className="mb-4">
                <MarketIndices indices={marketIndices} />
              </div>

              {/* 股票价格头部 */}
              <div className="mb-4">
                <StockPriceHeader stockData={stockData} />
              </div>

              {/* K线图表 */}
              <div className="mb-4">
                <StockChart symbol={stockData.symbol} />
              </div>

              {/* 订单簿 */}
              <div>
                <OrderBook />
              </div>
            </div>

            {/* 右侧交易面板 */}
            <div className="w-[274px] border-l border-gray-800">
              <TradingPanel stockData={stockData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}