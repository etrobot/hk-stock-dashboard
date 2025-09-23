'use client'

import React, { useState } from 'react'
import { X, ChevronDown, Info } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Switch } from './ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'

interface TradingPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TradingPopup({ open, onOpenChange }: TradingPopupProps) {
  const [stockCode, setStockCode] = useState('00005')
  const [orderType, setOrderType] = useState('限价单')
  const [price, setPrice] = useState('2')
  const [quantity, setQuantity] = useState('2')
  const [preMarketEnabled, setPreMarketEnabled] = useState(false)
  const [market, setMarket] = useState('全部')
  const [currency, setCurrency] = useState('USD')

  // Helpers: adjust price and quantity via +/- buttons
  const adjustPrice = (delta: number) => {
    const cur = parseFloat(price)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    // keep 3 decimal places like 98.450
    setPrice(next.toFixed(3))
  }

  const adjustQuantity = (delta: number) => {
    const cur = parseInt(quantity, 10)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    setQuantity(String(next))
  }

  // Mock account data
  const accountData = {
    balance: '0.00',
    cashAvailable: '0',
    positionSellable: '0',
    maxBuyable: '0',
    shortSellable: '-'
  }

  // Mock holdings data
  const holdings = [
    {
      code: '00005',
      name: '汇丰控股',
      holdingQty: '2',
      availableQty: '2',
      currentPrice: '98.450',
      avgCost: '62.15',
      marketValue: '196.90',
      unrealizedPnlRatio: '+58.33%',
      totalPnl: '+72.60',
      unrealizedPnl: '+72.60',
      realizedPnl: '0.00',
      todayPnl: '+2.80',
      positionRatio: '49.93%'
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:!max-w-[84rem] max-h-[90vh] overflow-y-auto p-0 border-0 dark:bg-[#1D212A]">
        <div className="p-3">
          {/* Header */}
          <DialogHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="text-xs px-2 py-1">
                  保证金综合账户(1612)
                </Badge>
              </div>
            </div>
          </DialogHeader>

{/* Top-level tabs: 交易 | 条件单 */}
<Tabs defaultValue="trade">
  <TabsList className="bg-transparent p-0 border-b border-gray-600 rounded-none h-auto">
    <TabsTrigger value="trade" className="rounded-none border-0 h-auto px-3 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-white">
      交易
    </TabsTrigger>
    <TabsTrigger value="conditional" className="rounded-none border-0 h-auto px-3 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-white">
      条件单
    </TabsTrigger>
  </TabsList>
  <TabsContent value="trade" className="mt-3">

          <div className="grid grid-cols-3 gap-6">
            {/* Left Panel - Trading Form */}
            <div className="space-y-4">
              {/* Stock Code */}
              <div className="space-y-2">
                <label className="text-xs">代码</label>
                <div className="relative">
                  <Input 
                    value={stockCode}
                    onChange={(e) => setStockCode(e.target.value)}
                    className="border-0 text-xs h-6 px-3"
                  />
                </div>
                <div className="text-xs text-[#DBDBE0]">汇丰控股</div>
              </div>

              {/* Order Type */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <label className="text-xs text-[#DBDBE0]">订单类型</label>
                  <Info className="w-3 h-3 text-[#919CAD]" />
                </div>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger className="bg-[#1D212A] border-0 text-xs h-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1D212A] border-gray-600">
                    <SelectItem value="限价单" className="text-xs">限价单</SelectItem>
                    <SelectItem value="市价单" className="text-xs">市价单</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs">价格</label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-[#1D212A] hover:bg-[#2a2f3b]" onClick={() => adjustPrice(-0.010)}>-</Button>
                  <div className="relative flex-1">
                    <Input 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      inputMode="decimal"
                      className="bg-[#1D212A] border-0 text-xs h-6 px-3"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 rounded-full border border-[#919CAD] flex items-center justify-center">
                        <div className="w-1 h-1 bg-[#919CAD] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-[#1D212A] hover:bg-[#2a2f3b]" onClick={() => adjustPrice(0.010)}>+</Button>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-xs">数量</label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-[#1D212A] hover:bg-[#2a2f3b]" onClick={() => adjustQuantity(-1)}>-</Button>
                  <div className="relative flex-1">
                    <Input 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      inputMode="numeric"
                      className="bg-[#1D212A] border-0 text-xs h-6 px-3"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 text-[#919CAD] text-xs">%</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-[#1D212A] hover:bg-[#2a2f3b]" onClick={() => adjustQuantity(1)}>+</Button>
                </div>
              </div>

              {/* Pre-market Trading */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <label className="text-xs">盘前竞价</label>
                    <Info className="w-3 h-3 text-[#919CAD]" />
                  </div>
                  <Switch 
                    checked={preMarketEnabled}
                    onCheckedChange={setPreMarketEnabled}
                    className="data-[state=checked]:bg-[#FF5C00]"
                  />
                </div>
              </div>

              {/* Account Balance Info */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between">
                  <span className="text-xs">金额</span>
                  <span className="text-xs">{accountData.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">现金可买</span>
                  <span className="text-xs text-[#16BA71]">{accountData.cashAvailable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">持仓可卖</span>
                  <span className="text-xs text-[#F44345]">{accountData.positionSellable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">最大可买</span>
                  <span className="text-xs">{accountData.maxBuyable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">可卖空</span>
                  <span className="text-xs">{accountData.shortSellable}</span>
                </div>
              </div>

              {/* Buy/Sell Buttons */}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 text-xs h-6 rounded-xl bg-[#F44345] hover:bg-[#d63b3d] text-white">
                  买入
                </Button>
                <Button className="flex-1 text-xs h-6 rounded-xl bg-[#16BA71] hover:bg-[#10975c] text-white">
                  卖出
                </Button>
              </div>
            </div>

            {/* Right Panel - Market Filters */}
            <div className="col-span-2 space-y-4">
              {/* Filter Buttons */}
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="bg-[#1D212A] text-xs h-5 px-2">
                  证券
                </Button>
                <Select value={market} onValueChange={setMarket}>
                  <SelectTrigger className="bg-[#1D212A] border-0 text-xs h-5 px-2">
                    <SelectValue placeholder="全部市场" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1D212A] border-gray-600">
                    <SelectItem value="全部" className="text-xs">全部</SelectItem>
                    <SelectItem value="港股" className="text-xs">港股</SelectItem>
                    <SelectItem value="美股" className="text-xs">美股</SelectItem>
                    <SelectItem value="沪深" className="text-xs">沪深</SelectItem>
                    <SelectItem value="加密货币" className="text-xs">加密货币</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-[#1D212A] border-0 text-xs h-5 px-2">
                    <SelectValue placeholder="全部币种" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1D212A] border-gray-600">
                    <SelectItem value="USD" className="text-xs">USD</SelectItem>
                    <SelectItem value="HKD" className="text-xs">HKD</SelectItem>
                    <SelectItem value="CNY" className="text-xs">CNY</SelectItem>
                    <SelectItem value="USDT" className="text-xs">USDT</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="输入代码/名称"
                  className="border-0 text-xs h-5 px-3 flex-1"
                />
              </div>

              {/* Market Summary */}
              <div className="flex gap-8 text-xs">
                <div>
                  <span className="text-white">市值(HKD)</span>
                  <ChevronDown className="w-3 h-3 inline ml-1 text-[#8A8B96]" />
                  <span className="ml-2 text-white">250.60</span>
                </div>
                <div>
                  <span className="text-white">今日盈亏</span>
                  <span className="ml-2 text-[#16BA71]">+4.85</span>
                </div>
                <div>
                  <span className="text-white">持仓收益</span>
                  <span className="ml-2 text-[#16BA71]">+54.70</span>
                </div>
              </div>

              {/* Holdings Table */}
              <div className="space-y-2">
                {/* Tab Navigation */}
                <div className="flex gap-4 text-xs border-b border-gray-600 pb-2">
                  <div className="border-b-2 border-[#FF5C00] pb-1">持仓</div>
                  <div className="text-[#72737A]">订单(0)</div>
                  <div className="text-[#72737A]">历史</div>
                  <div className="ml-auto text-white">交易</div>
                  <div className="text-[#72737A]">条件单</div>
                </div>

                {/* Scrollable Holdings List */}
                <div className="overflow-x-auto">
                  <div className="w-max">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-2 text-xs text-[#72737A] pb-1 whitespace-nowrap min-w-max">
                      <div>操作</div>
                      <div>代码</div>
                      <div>名称</div>
                      <div className="text-right">持有数量</div>
                      <div className="text-right">可用数量</div>
                      <div className="text-right">现价</div>
                      <div className="text-right">平均成本价</div>
                      <div className="text-right">市值</div>
                      <div className="text-right">未实现盈亏比例</div>
                      <div className="text-right">总盈亏金额</div>
                      <div className="text-right">今日盈亏</div>
                      <div className="text-right">持仓占比</div>
                    </div>

                    {/* Holdings Data */}
                    {holdings.map((holding, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 text-xs whitespace-nowrap">
                        <div className="text-[#3B78F1]">交易</div>
                        <div>{holding.code}</div>
                        <div>{holding.name}</div>
                        <div className="text-right">{holding.holdingQty}</div>
                        <div className="text-right">{holding.availableQty}</div>
                        <div className="text-right">{holding.currentPrice}</div>
                        <div className="text-right">{holding.avgCost}</div>
                        <div className="text-right">{holding.marketValue}</div>
                        <div className="text-right text-[#16BA71]">{holding.unrealizedPnlRatio}</div>
                        <div className="text-right text-[#16BA71]">{holding.totalPnl}</div>
                        <div className="text-right text-[#16BA71]">{holding.todayPnl}</div>
                        <div className="text-right">{holding.positionRatio}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="conditional" className="mt-3 text-xs text-[#72737A]">
          {/* 条件单内容占位 */}
          <div className="p-4 text-center">暂无条件单内容</div>
        </TabsContent>
      </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}