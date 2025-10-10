'use client'

import { useState } from 'react'
import { X, ChevronDown, Info, Lock } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Badge } from './ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { OrderTable } from './shared/OrderTable'
import { TransactionTable } from './shared/TransactionTable'
import { useTradingLock } from '../contexts/TradingLockContext'

interface TradingPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TradingPopup({ open, onOpenChange }: TradingPopupProps) {
  const [selectedAccount, setSelectedAccount] = useState('孖展账户12345678')
  const [stockCode, setStockCode] = useState('00005')
  const [orderType, setOrderType] = useState('限价单')
  const [price, setPrice] = useState('2')
  const [quantity, setQuantity] = useState('2')
  const [market, setMarket] = useState('全部')
  const [currency, setCurrency] = useState('USD')
  
  // 条件单相关状态
  const [conditionalQuantity, setConditionalQuantity] = useState('1000')
  const [priceConditionType, setPriceConditionType] = useState('股价条件')
  const [priceLevel, setPriceLevel] = useState('卖五')
  
  // 使用全局交易解锁状态
  const { isTradeUnlocked, showUnlockDialog } = useTradingLock()

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

  // 条件单价格和数量调整

  const adjustConditionalQuantity = (delta: number) => {
    const cur = parseInt(conditionalQuantity, 10)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    setConditionalQuantity(String(next))
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

  // Mock orders data
  const todayOrders = [
    {
      name: '汇丰控股',
      orderTime: '2023-10-01 09:00',
      orderPrice: '98.45',
      avgPrice: '98.45',
      orderQuantity: '1',
      filledQuantity: '0',
      direction: 'buy' as const,
      status: 'pending' as const
    }
  ]

  // Mock transactions data
  const todayTransactions = [
    {
      name: '汇丰控股',
      executionTime: '2023-10-01 09:05',
      executionQuantity: '1',
      direction: 'buy' as const,
      executionAmount: '98.45'
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:!max-w-[84rem] max-h-[90vh] overflow-y-auto p-0 bg-background">
        <div className="p-3 relative">
          {/* Header */}
          <DialogHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="bg-input text-xs h-6 px-2 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="孖展账户12345678" className="text-xs">孖展账户12345678</SelectItem>
                    <SelectItem value="现金账户888888" className="text-xs">现金账户888888</SelectItem>
                    <SelectItem value="VA账户12345678" className="text-xs">VA账户12345678</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogHeader>

{/* Top-level tabs: 交易 | 条件单 */}
<Tabs defaultValue="trade">
  <TabsList className="bg-transparent p-0 border-b border-border rounded-none h-auto">
    <TabsTrigger value="trade" className="rounded-none border-0 h-auto px-3 py-2 text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
      交易
    </TabsTrigger>
    {/* <TabsTrigger value="conditional" className="rounded-none border-0 h-auto px-3 py-2 text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
      条件单
    </TabsTrigger> */}
  </TabsList>
  <TabsContent value="trade" className="mt-3">

          <div className="grid grid-cols-3 gap-6">
            {/* Left Panel - Trading Form */}
            <div className="space-y-4">
              {/* Stock Code */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">代码</label>
                <div className="relative">
                  <Input 
                    value={stockCode}
                    onChange={(e) => setStockCode(e.target.value)}
                    className="text-xs h-6 px-3 bg-input"
                  />
                </div>
                <div className="text-xs text-muted-foreground">汇丰控股</div>
              </div>

              {/* Order Type */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <label className="text-xs text-muted-foreground">订单类型</label>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </div>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger className="bg-input text-xs h-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="限价单" className="text-xs">限价单</SelectItem>
                    <SelectItem value="市价单" className="text-xs">市价单</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">价格</label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustPrice(-0.010)}>-</Button>
                  <div className="relative flex-1">
                    <Input 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      inputMode="decimal"
                      className="text-xs h-6 px-3 bg-input"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustPrice(0.010)}>+</Button>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">数量</label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustQuantity(-1)}>-</Button>
                  <div className="relative flex-1">
                    <Input 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      inputMode="numeric"
                      className="text-xs h-6 px-3 bg-input"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustQuantity(1)}>+</Button>
                </div>
              </div>

              {/* Account Balance Info */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">金额</span>
                  <span className="text-xs text-foreground">{accountData.balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">现金可买</span>
                  <span className="text-xs text-[#16BA71]">{accountData.cashAvailable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">持仓可卖</span>
                  <span className="text-xs text-[#F44345]">{accountData.positionSellable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">最大可买</span>
                  <span className="text-xs text-foreground">{accountData.maxBuyable}</span>
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
                <Select value={market} onValueChange={setMarket}>
                  <SelectTrigger className="bg-input text-xs h-5 px-2">
                    <SelectValue placeholder="全部市场" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="全部" className="text-xs">全部</SelectItem>
                    <SelectItem value="港股" className="text-xs">港股</SelectItem>
                    <SelectItem value="美股" className="text-xs">美股</SelectItem>
                    <SelectItem value="沪深" className="text-xs">沪深</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-input text-xs h-5 px-2">
                    <SelectValue placeholder="全部币种" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="USD" className="text-xs">USD</SelectItem>
                    <SelectItem value="HKD" className="text-xs">HKD</SelectItem>
                    <SelectItem value="CNY" className="text-xs">CNY</SelectItem>
                    <SelectItem value="USDT" className="text-xs">USDT</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="输入代码/名称"
                  className="text-xs h-5 px-3 flex-1 bg-input"
                />
              </div>

              {/* Market Summary */}
              <div className="flex gap-8 text-xs">
                <div>
                  <span className="text-foreground">市值(HKD)</span>
                  <ChevronDown className="w-3 h-3 inline ml-1 text-muted-foreground" />
                  <span className="ml-2 text-foreground">250.60</span>
                </div>
                <div>
                  <span className="text-foreground">今日盈亏</span>
                  <span className="ml-2 text-[#16BA71]">+4.85</span>
                </div>
                <div>
                  <span className="text-foreground">持仓收益</span>
                  <span className="ml-2 text-[#16BA71]">+54.70</span>
                </div>
              </div>

              {/* Holdings and Orders Tables */}
              <div className="space-y-2">
                {/* Tab Navigation */}
                <Tabs defaultValue="holdings" className="w-full">
                  <TabsList className="bg-transparent p-0 border-b border-border rounded-none h-auto">
                    <TabsTrigger value="holdings" className="rounded-none border-0 h-auto px-3 py-2 text-xs text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
                      持仓
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="rounded-none border-0 h-auto px-3 py-2 text-xs text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
                      订单(0)
                    </TabsTrigger>
                    <TabsTrigger value="history" className="rounded-none border-0 h-auto px-3 py-2 text-xs text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
                      历史
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="holdings" className="mt-2">
                    {/* Scrollable Holdings List */}
                    <div className="overflow-x-auto">
                      <div className="w-max">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground pb-1 whitespace-nowrap min-w-max">
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
                            <div className="text-foreground">{holding.code}</div>
                            <div className="text-foreground">{holding.name}</div>
                            <div className="text-right text-foreground">{holding.holdingQty}</div>
                            <div className="text-right text-foreground">{holding.availableQty}</div>
                            <div className="text-right text-foreground">{holding.currentPrice}</div>
                            <div className="text-right text-foreground">{holding.avgCost}</div>
                            <div className="text-right text-foreground">{holding.marketValue}</div>
                            <div className="text-right text-[#16BA71]">{holding.unrealizedPnlRatio}</div>
                            <div className="text-right text-[#16BA71]">{holding.totalPnl}</div>
                            <div className="text-right text-[#16BA71]">{holding.todayPnl}</div>
                            <div className="text-right text-foreground">{holding.positionRatio}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="orders" className="mt-2">
                    <div className="overflow-x-auto">
                      <OrderTable orders={todayOrders} className="text-xs" />
                    </div>
                  </TabsContent>
                  <TabsContent value="history" className="mt-2">
                    <div className="overflow-x-auto">
                      <TransactionTable transactions={todayTransactions} className="text-xs" />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="conditional" className="mt-3">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Panel - 条件单设置 */}
            <div className="space-y-4">
              {/* 买入/卖出选择 */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FF5C00] rounded"></div>
                  <span className="text-xs text-foreground">买入</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">卖出</span>
                </div>
              </div>

              {/* 股票选择 */}
              <div className="bg-input rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    <span className="text-xs text-foreground">小米集团-W</span>
                    <span className="text-xs text-foreground">00005</span>
                  </div>
                  <X className="w-2 h-2 text-muted-foreground" />
                </div>
                
                <div className="text-xs">
                  <span className="text-[#F44345]">250.60</span>
                  <span className="text-[#F44345] ml-2">0.800</span>
                  <span className="text-[#F44345] ml-2">3.08%</span>
                </div>
              </div>

              {/* 触发条件 */}
              <div className="space-y-3">
                <h3 className="text-xs text-foreground font-medium">触发条件</h3>
                
                {/* 图表区域 */}
                <div className="bg-input rounded p-3 h-24 relative">
                  <div className="absolute top-2 left-2 text-xs text-muted-foreground">价格</div>
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">时间</div>
                  <div className="absolute top-1/2 right-2 text-xs text-muted-foreground">触发价</div>
                  
                  {/* 简化的图表线条 */}
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-muted-foreground opacity-20"></div>
                  <div className="absolute bottom-4 left-4 w-px h-16 bg-muted-foreground opacity-20"></div>
                  
                  {/* 触发点 */}
                  <div className="absolute bottom-6 right-8 w-1 h-1 bg-[#FF5C00] rounded-full"></div>
                  <div className="absolute bottom-6 right-12 px-1 py-0.5 bg-[#FF5C00] rounded text-xs text-white">触发</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">股价条件</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground rotate-90" />
                </div>
                <div className="bg-input rounded p-3 flex items-center gap-2">
                  <Select value={priceConditionType} onValueChange={setPriceConditionType}>
                    <SelectTrigger className="bg-input text-xs h-6 px-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="股价条件" className="text-xs">股价条件</SelectItem>
                      <SelectItem value="日涨幅条件" className="text-xs">日涨幅条件</SelectItem>
                      <SelectItem value="回落卖出" className="text-xs">回落卖出</SelectItem>
                      <SelectItem value="止盈止损" className="text-xs">止盈止损</SelectItem>
                      <SelectItem value="按时卖出" className="text-xs">按时卖出</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priceLevel} onValueChange={setPriceLevel}>
                    <SelectTrigger className="bg-input text-xs h-6 px-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="卖五" className="text-xs">卖五</SelectItem>
                      <SelectItem value="卖四" className="text-xs">卖四</SelectItem>
                      <SelectItem value="卖三" className="text-xs">卖三</SelectItem>
                      <SelectItem value="卖二" className="text-xs">卖二</SelectItem>
                      <SelectItem value="卖一" className="text-xs">卖一</SelectItem>
                      <SelectItem value="买一" className="text-xs">买一</SelectItem>
                      <SelectItem value="买二" className="text-xs">买二</SelectItem>
                      <SelectItem value="买三" className="text-xs">买三</SelectItem>
                      <SelectItem value="买四" className="text-xs">买四</SelectItem>
                      <SelectItem value="买五" className="text-xs">买五</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 委托价格 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">委托价格</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground rotate-90" />
                </div>
                
                <div className="bg-input rounded p-3 flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent" onClick={() => adjustConditionalQuantity(-100)}>-</Button>
                  <div className="flex-1">
                    <Input 
                      value={conditionalQuantity}
                      onChange={(e) => setConditionalQuantity(e.target.value)}
                      placeholder="买入数量"
                      inputMode="numeric"
                      className="bg-transparent border-0 text-xs h-6 px-2 text-center"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent" onClick={() => adjustConditionalQuantity(100)}>+</Button>
                </div>
              </div>

              {/* 参考可买 */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground">参考可买{conditionalQuantity}股</span>
                <span className="text-xs text-[#FF5C00]">编辑仓位</span>
              </div>

              {/* 仓位选择 */}
              <div className="flex gap-2">
                <Button className="flex-1 text-xs h-6 bg-[#FF5C00] hover:bg-[#e54f00] text-white border border-[#FF5C00]">
                  全仓
                </Button>
                <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-muted-foreground border-border">
                  1/2
                </Button>
                <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-muted-foreground border-border">
                  1/4
                </Button>
                <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-muted-foreground border-border">
                  1/8
                </Button>
              </div>

              {/* 底部按钮 */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-[#FF5C00] border-[#FF5C00]">
                  添加提醒
                </Button>
                <Button className="flex-1 text-xs h-6 bg-[#FF5C00] hover:bg-[#e54f00] text-white">
                  提交条件单
                </Button>
              </div>
            </div>

            {/* Right Panel - 条件单列表 */}
            <div className="col-span-2 space-y-4">
              {/* 状态选择 */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground">监控中</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">已触发</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">失效</span>
                </div>
              </div>

              {/* 条件单列表 */}
              <div className="space-y-3">
                {/* 条件单1: 触发价格 */}
                <div className="bg-input rounded p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">腾讯控股</span>
                    <span className="text-xs text-foreground">00700</span>
                    <Badge className="bg-[#16BA71] text-white text-xs px-2 py-0.5">卖</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-foreground">股价条件：</span>
                      <span className="text-foreground">触发价格199.99</span>
                    </div>
                    <div className="text-foreground">买5价*1000股</div>
                    <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
                  </div>
                  
                  <div className="flex justify-end">
                    <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
                  </div>
                </div>

                {/* 条件单2: 触发买入条件 */}
                <div className="bg-input rounded p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">腾讯控股</span>
                    <span className="text-xs text-foreground">00700</span>
                    <Badge className="bg-[#16BA71] text-white text-xs px-2 py-0.5">卖</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-foreground">触发买入条件：</span>
                      <span className="text-foreground">触发跌幅</span>
                    </div>
                    <div>
                      <span className="text-foreground">触发幅度</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[#16BA71]">-5%</span>
                      <span className="text-[#F44345]">+2%</span>
                    </div>
                    <div className="text-foreground">买5价*1000股</div>
                    <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
                  </div>
                  
                  <div className="flex justify-end">
                    <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
                  </div>
                </div>

                {/* 条件单3: 止盈止损 */}
                <div className="bg-input rounded p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">腾讯控股</span>
                    <span className="text-xs text-foreground">00700</span>
                    <Badge className="bg-[#16BA71] text-white text-xs px-2 py-0.5">卖</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-foreground">止盈止损条件：</span>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-foreground">止盈价格</span>
                        <span className="text-foreground ml-2">12.22</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-foreground">止损价格</span>
                        <span className="text-foreground ml-2">10.90</span>
                      </div>
                    </div>
                    <div className="text-foreground">买5价*1000股</div>
                    <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
                  </div>
                  
                  <div className="flex justify-end">
                    <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
                  </div>
                </div>

                {/* 条件单4: 回落卖出条件 */}
                <div className="bg-input rounded p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">腾讯控股</span>
                    <span className="text-xs text-foreground">00700</span>
                    <Badge className="bg-[#F44345] text-white text-xs px-2 py-0.5">买</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-foreground">回落卖出条件：</span>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-foreground">触发跌幅</span>
                        <span className="text-[#16BA71] ml-2">-5%</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-foreground">触发幅度</span>
                        <span className="text-[#F44345] ml-2">+2%</span>
                      </div>
                    </div>
                    <div className="text-foreground">买5价*1000股</div>
                    <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
                  </div>
                  
                  <div className="flex justify-end">
                    <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
        
        {!isTradeUnlocked && (
          <div className="absolute inset-0 bg-background/70 z-50 flex items-center justify-center">
            <Button
              className="rounded-full w-16 h-16 p-0 bg-[#FF5C00] hover:bg-[#e54f00]"
              onClick={() => showUnlockDialog()}
            >
              <Lock className="w-7 h-7 text-white" />
            </Button>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  )
}