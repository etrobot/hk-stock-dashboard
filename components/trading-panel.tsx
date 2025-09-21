'use client'

import React, { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  pe: string
}

interface TradingPanelProps {
  stockData: StockData
}

export function TradingPanel({ stockData }: TradingPanelProps) {
  const [orderType, setOrderType] = useState('limit')
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState(stockData.price.toString())
  const [positions] = useState([
    { symbol: 'AAPL', quantity: 100, avgPrice: 210.50, currentPrice: 212.41, pnl: 191 },
    { symbol: 'MSFT', quantity: 50, avgPrice: 415.20, currentPrice: 418.75, pnl: 177.5 },
    { symbol: 'GOOGL', quantity: 25, avgPrice: 2750.30, currentPrice: 2735.80, pnl: -362.5 }
  ])

  const handleSubmitOrder = () => {
    console.log('提交订单:', {
      symbol: stockData.symbol,
      side,
      orderType,
      quantity: parseFloat(quantity),
      price: parseFloat(price)
    })
    // 这里会调用实际的交易API
  }

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0
    const prc = parseFloat(price) || 0
    return (qty * prc).toFixed(2)
  }

  return (
    <div className="w-[274px] h-full bg-[#1A1D29] border-l border-gray-800">
      <Tabs defaultValue="trade" className="h-full">
        {/* 标签头部 */}
        <div className="flex items-center justify-center bg-[#11131B] py-2 border-b border-gray-800">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm font-medium border-b-2 border-[#FF5C00] pb-1">行情</span>
            </div>
            <span className="text-gray-400 text-sm cursor-pointer hover:text-white">分析</span>
            <span className="text-gray-400 text-sm cursor-pointer hover:text-white">资讯</span>
          </div>
        </div>

        <TabsList className="grid w-full grid-cols-2 bg-[#11131B] m-4 mb-0">
          <TabsTrigger value="trade" className="text-white data-[state=active]:bg-[#FF5C00]">
            买盘
          </TabsTrigger>
          <TabsTrigger value="positions" className="text-white data-[state=active]:bg-[#FF5C00]">
            卖盘
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trade" className="p-4 space-y-4">
          {/* 买卖盘比例 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">买盘</span>
              <span className="text-white text-sm font-medium">卖盘</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#16BA71]">10.00%</span>
              <span className="text-[#F44345]">90.00%</span>
            </div>
            <div className="flex">
              <div className="bg-[#16BA71]/20 h-4 flex-1 mr-1 rounded-l"></div>
              <div className="bg-[#F44345]/20 h-4 flex-[9] rounded-r"></div>
            </div>
            <div className="w-full bg-[#16BA71] h-1 rounded-full" style={{width: '10%'}}></div>
            <div className="w-full bg-[#F44345] h-1 rounded-full" style={{width: '90%'}}></div>
          </div>

          {/* 订单簿 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">深度摆盘</span>
              <div className="text-gray-400">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M0 3.5C0 3.22386 0.223858 3 0.5 3L9.5 3C9.77614 3 10 3.22386 10 3.5L10 3.5C10 3.77614 9.77614 4 9.5 4L0.5 4C0.223858 4 0 3.77614 0 3.5L0 3.5ZM0 0.5C0 0.223858 0.223858 0 0.5 0L9.5 0C9.77614 0 10 0.223858 10 0.5L10 0.5C10 0.776142 9.77614 1 9.5 1L0.5 1C0.223858 1 0 0.776142 0 0.5L0 0.5ZM0 6.5C0 6.22386 0.223858 6 0.5 6L9.5 6C9.77614 6 10 6.22386 10 6.5L10 6.5C10 6.77614 9.77614 7 9.5 7L0.5 7C0.223858 7 0 6.77614 0 6.5L0 6.5Z"/>
                </svg>
              </div>
            </div>

            {/* 深度摆盘数据 */}
            <div className="space-y-1">
              {[
                { price: '211.320', quantity: '25', side: 'buy' },
                { price: '211.310', quantity: '25', side: 'buy' },
                { price: '211.310', quantity: '17', side: 'buy' },
                { price: '211.310', quantity: '10', side: 'buy' },
                { price: '211.310', quantity: '10', side: 'buy' },
                { price: '211.390', quantity: '225', side: 'sell' },
                { price: '211.400', quantity: '225', side: 'sell' },
                { price: '211.430', quantity: '47', side: 'sell' },
                { price: '211.430', quantity: '17', side: 'sell' },
                { price: '211.430', quantity: '17', side: 'sell' },
              ].map((order, index) => (
                <div key={index} className={`grid grid-cols-3 text-xs p-1 ${
                  order.side === 'buy' ? 'bg-[#16BA71]/10' : 'bg-[#F44345]/10'
                }`}>
                  <span className="text-white">BLUE</span>
                  <span className="text-[#F44345] text-right">{order.price}</span>
                  <span className="text-white text-right">{order.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 60档盘口信息 */}
          <div className="text-white text-sm font-medium">
            60档盘口信息
          </div>
        </TabsContent>

        <TabsContent value="positions" className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">我的持仓</h3>

            <div className="space-y-3">
              {positions.map((position, index) => {
                const pnlPercent = ((position.currentPrice - position.avgPrice) / position.avgPrice * 100).toFixed(2)
                const isPositive = position.pnl >= 0

                return (
                  <Card key={index} className="bg-[#11131B] border-gray-600 p-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">{position.symbol}</span>
                        <span className={`text-sm font-medium ${isPositive ? 'text-[#16BA71]' : 'text-[#F44345]'}`}>
                          {isPositive ? '+' : ''}${position.pnl.toFixed(2)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">持仓:</div>
                          <div className="text-white">{position.quantity}股</div>
                        </div>
                        <div>
                          <div className="text-gray-400">成本:</div>
                          <div className="text-white">${position.avgPrice}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">现价:</div>
                          <div className="text-white">${position.currentPrice}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">收益率:</div>
                          <div className={`${isPositive ? 'text-[#16BA71]' : 'text-[#F44345]'}`}>
                            {isPositive ? '+' : ''}{pnlPercent}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* 持仓汇总 */}
            <Card className="bg-[#11131B] border-gray-600 p-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white font-semibold">
                  <span>总持仓市值:</span>
                  <span>$74,291.50</span>
                </div>
                <div className="flex justify-between text-[#16BA71]">
                  <span>总盈亏:</span>
                  <span>+$6.00 (+0.01%)</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}