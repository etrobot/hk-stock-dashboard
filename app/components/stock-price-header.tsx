'use client'

import { type StockData } from '../data/mockStockData'

interface StockPriceHeaderProps {
  stockData: StockData
}

export function StockPriceHeader({ stockData }: StockPriceHeaderProps) {
  const isPositive = stockData.change >= 0
  const changeColor = isPositive ? 'text-[#16BA71]' : 'text-[#F44345]'

  return (
    <div className="space-y-4">
      {/* 股票标题和切换标签 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-medium">{stockData.symbol}</h1>
            <span className="text-sm">{stockData.name}</span>
            <span className="text-sm">{stockData.price.toFixed(3)}</span>
            <span className={`text-sm ${changeColor}`}>
              {isPositive ? '+' : ''}{stockData.change.toFixed(3)}
            </span>
            <span className={`text-sm ${changeColor}`}>
              {isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* 图表/期权/ETF等标签 */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium bg-transparent border-b-2 border-[#FF5C00] pb-1">图表</span>
        </div>
        <span className="text-gray-400 text-sm cursor-pointer hover:text-white">期权</span>
        <div className="flex items-center space-x-1">
          <span className="text-gray-400 text-sm cursor-pointer hover:text-white">ETF</span>
          <div className="w-1 h-1 bg-[#F44345] rounded-full"></div>
        </div>
        <span className="text-gray-400 text-sm cursor-pointer hover:text-white">财务</span>
        <span className="text-gray-400 text-sm cursor-pointer hover:text-white">预测</span>
        <span className="text-gray-400 text-sm cursor-pointer hover:text-white">公司行动</span>
        <span className="text-gray-400 text-sm cursor-pointer hover:text-white">股东</span>
        <span className="text-gray-400 text-sm cursor-pointer hover:text-white">简况</span>
      </div>

      {/* 时间范围选择器 */}
      <div className="flex items-center space-x-4 text-sm">
        <span className="text-gray-400 cursor-pointer hover:text-white">分时</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">5日</span>
        <div className="bg-transparent border border-white rounded px-2 py-1">
          <span className="text-white">日K</span>
        </div>
        <span className="text-gray-400 cursor-pointer hover:text-white">周K</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">月K</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">季K</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">年K</span>
        {/* More time range options */}
        <span className="text-gray-400 cursor-pointer hover:text-white">1分</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">3分</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">5分</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">10分</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">15分</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">30分</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">1小时</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">2小时</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">3小时</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">4小时</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">1月</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">3月</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">今年</span>
        <span className="text-gray-400 cursor-pointer hover:text-white">1年</span>
      </div>
    </div>
  )
}