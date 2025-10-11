import { useState } from 'react'
import { ChevronDown, Info, Lock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { OrderTable } from '../components/shared/OrderTable'
import { TransactionTable } from '../components/shared/TransactionTable'
import { useTradingLock } from '../contexts/TradingLockContext'

export default function TradePage() {
  const [selectedAccount, setSelectedAccount] = useState('孖展账户12345678')
  const [stockCode, setStockCode] = useState('00005')
  const [orderType, setOrderType] = useState('限价单')
  const [price, setPrice] = useState('2')
  const [quantity, setQuantity] = useState('2')
  const [market, setMarket] = useState('全部')
  const [currency, setCurrency] = useState('USD')
  const { isTradeUnlocked, showUnlockDialog } = useTradingLock()

  const adjustPrice = (delta: number) => {
    const cur = parseFloat(price)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    setPrice(next.toFixed(3))
  }

  const adjustQuantity = (delta: number) => {
    const cur = parseInt(quantity, 10)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    setQuantity(String(next))
  }

  const accountData = {
    balance: '0.00',
    cashAvailable: '0',
    positionSellable: '0',
    maxBuyable: '0'
  }

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
    <div className="h-full bg-background text-foreground relative">
      <div className="p-3 border-b">
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
      </div>

      <div className="p-3">
        <Tabs defaultValue="trade">
          <TabsList className="bg-transparent p-0 border-b border-border rounded-none h-auto">
            <TabsTrigger value="trade" className="rounded-none border-0 h-auto px-3 py-2 text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
              交易
            </TabsTrigger>
          </TabsList>
          <TabsContent value="trade" className="mt-3">
            <div className="flex gap-6">
              <div className="space-y-4 w-[320px] flex-shrink-0">
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

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 text-xs h-6 rounded-xl bg-[#F44345] hover:bg-[#d63b3d] text-white">
                    买入
                  </Button>
                  <Button className="flex-1 text-xs h-6 rounded-xl bg-[#16BA71] hover:bg-[#10975c] text-white">
                    卖出
                  </Button>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-4">
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

                <div className="space-y-2 min-w-0">
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
                      <div className="overflow-x-auto">
                        <div className="w-max">
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
        </Tabs>
      </div>

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
  )
}
