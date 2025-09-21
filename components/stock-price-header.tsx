'use client'

import React from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { type StockData } from '../mockStockData'

interface StockPriceHeaderProps {
  stockData: StockData
}

export function StockPriceHeader({ stockData }: StockPriceHeaderProps) {
  const isPositive = stockData.change >= 0
  const changeColor = isPositive ? 'text-[#16BA71]' : 'text-[#F44345]'
  const bgColor = isPositive ? 'bg-[#16BA71]/10' : 'bg-[#F44345]/10'

  return (
    <div className="space-y-4">
      {/* 股票标题和切换标签 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-white text-sm font-medium">{stockData.symbol}</h1>
            <span className="text-white text-sm">{stockData.name}</span>
            <span className="text-white text-sm">{stockData.price.toFixed(3)}</span>
            <span className={`text-sm ${changeColor}`}>
              {isPositive ? '+' : ''}{stockData.change.toFixed(3)}
            </span>
            <span className={`text-sm ${changeColor}`}>
              {isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* 主要股票信息卡片 */}
      <Card className="bg-[#1A1D29] border-gray-800 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* 股票基本信息 */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-medium text-white">
                    {stockData.symbol}
                  </h1>
                  <span className="text-white text-sm">{stockData.name}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-2.5 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">$</span>
                    </div>
                    <Badge variant="outline" className="border-[#874EFE] bg-[#874EFE]/20 text-[#874EFE] text-[7px] px-1">
                      L2
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-[#16BA71]">
                  {stockData.price.toFixed(3)}
                </span>
                <div className={`flex items-center space-x-2 ${changeColor}`}>
                  <span className="text-lg font-semibold">
                    {isPositive ? '+' : ''}{stockData.change.toFixed(3)}
                  </span>
                  <span className="text-lg font-semibold">
                    {isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%
                  </span>
                  <div className="w-[10px] h-[14px] flex items-center justify-center">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" className={`${changeColor} ${isPositive ? 'rotate-180' : ''}`}>
                      <path d="M6.89886 0L3.10114 0L3.10114 8.10997L0 8.10997L5 14.2857L10 8.10997L6.89886 8.10997L6.89886 0Z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
                <span>07/11</span>
                <span>16:00:00</span>
                <span>(美东)</span>
              </div>
            </div>

            {/* 收盘价标签 */}
            <div className="mb-4">
              <span className="text-gray-400 text-sm">收盘价</span>
            </div>
          </div>

          {/* 股票统计信息 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <div className="text-sm text-gray-400 text-right">最高</div>
              <div className="text-sm font-semibold text-[#16BA71] text-right">{stockData.high.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">最低</div>
              <div className="text-sm font-semibold text-[#F44345] text-right">{stockData.low.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">今开</div>
              <div className="text-sm font-semibold text-[#F44345] text-right">{stockData.open.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">昨收</div>
              <div className="text-sm font-semibold text-gray-300 text-right">{stockData.previousClose.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">成交量</div>
              <div className="text-sm font-semibold text-white text-right">{stockData.volume}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">成交额</div>
              <div className="text-sm font-semibold text-white text-right">{stockData.turnover}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 图表/期权/ETF等标签 */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-medium bg-transparent border-b-2 border-[#FF5C00] pb-1">图表</span>
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

      {/* 盘后和夜盘信息 */}
      <div className="space-y-2">
        {stockData.afterHours && (
          <Card className="bg-[#272F3A] border-gray-700 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">盘后</span>
              <div className="flex items-center space-x-4">
                <span className="text-[#16BA71]">{stockData.afterHours.price.toFixed(3)}</span>
                <span className="text-[#16BA71]">{stockData.afterHours.change.toFixed(3)}</span>
                <span className="text-[#16BA71]">{stockData.afterHours.changePercent.toFixed(2)}%</span>
                <span className="text-gray-400">{stockData.afterHours.time}</span>
              </div>
            </div>
          </Card>
        )}

        {stockData.preMarket && (
          <Card className="bg-[#272F3A] border-gray-700 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">夜盘</span>
              <div className="flex items-center space-x-4">
                <span className="text-[#F44345]">{stockData.preMarket.price.toFixed(3)}</span>
                <span className="text-[#F44345]">{stockData.preMarket.change.toFixed(3)}</span>
                <span className="text-[#F44345]">{stockData.preMarket.changePercent.toFixed(2)}%</span>
                <span className="text-gray-400">{stockData.preMarket.time}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}