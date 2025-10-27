import { useState } from 'react'
import { Info, Lock, Plus, GripVertical } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { OrderTable } from '../components/shared/OrderTable'
import { TransactionTable } from '../components/shared/TransactionTable'
import { useTradingLock } from '../contexts/TradingLockContext'
import { AsideList } from '../components/aside-list'
import { IndexInfoPanel } from '../components/index-info-panel'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { toast } from 'sonner'
import { type StockData, mockStockData } from '../data/mockStockData'
import { hkHotStocks } from '../data/mock-data'
import { type IndexDetail } from '../types/market'
import { Card, CardContent } from '../components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'

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

export default function TradePage() {
  const [selectedAccount, setSelectedAccount] = useState('孖展账户12345678')
  const [stockCode, setStockCode] = useState('00005')
  const [orderType, setOrderType] = useState('限价单')
  const [price, setPrice] = useState('2')
  const [quantity, setQuantity] = useState('2')
  const [market, setMarket] = useState('全部')
  const [currency, setCurrency] = useState('USD')
  const { isTradeUnlocked, showUnlockDialog } = useTradingLock()

  // State for AsideList component
  const [stockData, setStockData] = useState<StockData>(mockStockData)
  const [sidebarViewMode, setSidebarViewMode] = useState<'list' | 'grid'>('list')
  const [selectedPeriod, setSelectedPeriod] = useState('daily')
  const [selectedFilter, setSelectedFilter] = useState('全部')
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isManageGroupOpen, setIsManageGroupOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [customGroups, setCustomGroups] = useState<string[]>(['自定义分组1'])
  const [groupStocks, setGroupStocks] = useState<{[key: string]: typeof hkHotStocks}>({
    '自定义分组1': hkHotStocks.slice(0, 10)
  })
  const [selectedGroup, setSelectedGroup] = useState<string>('自定义分组1')

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
      code: stockCode,
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
      code: stockCode,
      name: '汇丰控股',
      executionTime: '2023-10-01 09:05',
      executionQuantity: '1',
      direction: 'buy' as const,
      executionAmount: '98.45'
    }
  ]

  // Handler functions for AsideList
  const handleSidebarItemClick = (stockCode: string) => {
    const found = hkHotStocks.find(s => s.code === stockCode)
    setStockData(prev => ({ ...prev, symbol: stockCode, name: found?.name || prev.name }))
    setStockCode(stockCode)
  }

  const handleGridSidebarItemClick = (stockCode: string) => {
    setSidebarViewMode('list')
    const found = hkHotStocks.find(s => s.code === stockCode)
    setStockData(prev => ({ ...prev, symbol: stockCode, name: found?.name || prev.name }))
    setStockCode(stockCode)
  }

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      setCustomGroups(prev => [...prev, newGroupName.trim()])
      setGroupStocks(prev => ({
        ...prev,
        [newGroupName.trim()]: []
      }))
      setSelectedGroup(newGroupName.trim())
      setNewGroupName('')
      setIsCreateGroupOpen(false)
      setIsManageGroupOpen(true)
    }
  }

  const handleDeleteGroup = (groupName: string) => {
    setCustomGroups(prev => prev.filter(g => g !== groupName))
    setGroupStocks(prev => {
      const newGroupStocks = { ...prev }
      delete newGroupStocks[groupName]
      return newGroupStocks
    })
    if (selectedGroup === groupName && customGroups.length > 1) {
      setSelectedGroup(customGroups.find(g => g !== groupName) || '')
    }
  }

  const handleRemoveStockFromGroup = (stockCodeToRemove: string) => {
    setGroupStocks(prev => ({
      ...prev,
      [selectedGroup]: prev[selectedGroup]?.filter(stock => stock.code !== stockCodeToRemove) || []
    }))
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))
    if (dragIndex === dropIndex) return
    setGroupStocks(prev => {
      const currentStocks = [...(prev[selectedGroup] || [])]
      const draggedStock = currentStocks[dragIndex]
      currentStocks.splice(dragIndex, 1)
      currentStocks.splice(dropIndex, 0, draggedStock)
      return {
        ...prev,
        [selectedGroup]: currentStocks
      }
    })
  }

  return (
    <div className="h-full bg-background text-foreground relative flex">
      {/* Left AsideList Column */}
      <AsideList
        rankingTitle="自选"
        isWatchlistRoute={true}
        sidebarViewMode={sidebarViewMode}
        onSidebarViewModeChange={setSidebarViewMode}
        selectedPeriod={selectedPeriod}
        onSelectedPeriodChange={setSelectedPeriod}
        selectedFilter={selectedFilter}
        onSelectedFilterChange={setSelectedFilter}
        isCreateGroupOpen={isCreateGroupOpen}
        setIsCreateGroupOpen={setIsCreateGroupOpen}
        isManageGroupOpen={isManageGroupOpen}
        setIsManageGroupOpen={setIsManageGroupOpen}
        customGroups={customGroups}
        onListItemClick={handleSidebarItemClick}
        onGridItemClick={handleGridSidebarItemClick}
        hideViewToggle={true}
      />
            {/* IndexInfoPanel Column */}
      <div className="w-[360px] border-l border-border bg-background flex-shrink-0">
        <IndexInfoPanel indexDetail={transformStockToIndex(stockData)} />
      </div>

      {/* Main Trading Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
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
                    {/* First row: Three tables side by side (copied from SecuritiesContent) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Assets Table */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-card-foreground font-medium mb-2">资产</h3>
                  <Table className="text-xs">
                    <TableBody>
                      <TableRow>
                        <TableCell>持仓市值</TableCell>
                        <TableCell>268.65</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>现金可取</TableCell>
                        <TableCell>312.63</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>资金在途</TableCell>
                        <TableCell>2.51</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>冻结资金</TableCell>
                        <TableCell>0.69</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="text-center text-sm text-gray-300 mt-2">
                    风险等级 | 安全
                  </div>
                </CardContent>
              </Card>

              {/* Cash Details Table */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-card-foreground font-medium mb-2">现金详情</h3>
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow>
                        <TableHead>币种类型</TableHead>
                        <TableHead>金额</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>总现金 · HKD</TableCell>
                        <TableCell>-183.31</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>HKD</TableCell>
                        <TableCell>-183.31</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>USD</TableCell>
                        <TableCell>0.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Withdrawable Cash Table */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-card-foreground font-medium mb-2">可取现金</h3>
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow>
                        <TableHead>币种类型</TableHead>
                        <TableHead>金额</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>HKD</TableCell>
                        <TableCell>0.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>USD</TableCell>
                        <TableCell>0.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CNH</TableCell>
                        <TableCell>0.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>


      <div className="p-3">
        <Tabs defaultValue="trade">
          <TabsList className="bg-transparent p-0 border-b border-border rounded-none h-auto">
            <TabsTrigger value="trade" className="rounded-none border-0 h-auto px-3 py-2 text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
            </TabsTrigger>
          </TabsList>
          <TabsContent value="trade" className="mt-3 min-w-0">
            <div className="flex gap-6 min-w-0">
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
                  <div className="text-xs text-muted-foreground">{hkHotStocks.find(s => s.code === stockCode)?.name || stockData.name}</div>
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
                      <div className="mt-3 overflow-x-auto">
                        <div className="w-max">
                          <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground pb-1 whitespace-nowrap min-w-max">
                            <div>代码名称</div>
                            <div>方向</div>
                            <div className="text-right">成交数量</div>
                            <div className="text-right">成交价格</div>
                            <div className="text-right">成交金额</div>
                          </div>
                          {todayTransactions.map((tx, idx) => {
                            const qty = parseFloat(tx.executionQuantity)
                            const amt = parseFloat(tx.executionAmount)
                            const price = isNaN(qty) || qty === 0 ? '-' : (amt / qty).toFixed(3)
                            return (
                              <div key={idx} className="grid grid-cols-5 gap-2 text-xs whitespace-nowrap rounded">
                                <div className="text-foreground">{`${stockCode} ${tx.name}`}</div>
                                <div className={tx.direction === 'buy' ? 'text-[#16BA71]' : 'text-[#F44345]'}>{tx.direction === 'buy' ? '买入' : '卖出'}</div>
                                <div className="text-right text-foreground">{tx.executionQuantity}</div>
                                <div className="text-right text-foreground">{price}</div>
                                <div className="text-right text-foreground">{tx.executionAmount}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="history" className="mt-2">
                      <div className="overflow-x-auto">
                        <OrderTable orders={todayOrders} className="text-xs" showOperation={false} />
                      </div>
                      <div className="mt-3 overflow-x-auto">
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

     {/* Manage Groups Dialog */}
     <Dialog open={isManageGroupOpen} onOpenChange={setIsManageGroupOpen}>
       <DialogContent className="sm:max-w-4xl max-h-[80vh]">
         <DialogHeader>
           <DialogTitle>管理分组</DialogTitle>
         </DialogHeader>
         <div className="flex h-[500px]">
           {/* Left side - Group names */}
           <div className="w-1/3 border-r pr-4">
             <div className="flex items-center justify-between mb-3">
               <h3 className="font-medium">分组列表</h3>
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => {
                   setIsManageGroupOpen(false)
                   setIsCreateGroupOpen(true)
                 }}
                 className="h-7 px-2 text-xs"
               >
                 <Plus className="w-3 h-3 mr-1" />
                 创建分组
               </Button>
             </div>
             <div className="space-y-2">
               {customGroups.map((group) => (
                 <div 
                   key={group} 
                   className={`flex items-center justify-between p-2 border rounded cursor-pointer ${
                     selectedGroup === group ? 'border-blue-200' : 'hover:bg-gray-100'
                   }`}
                   onClick={() => setSelectedGroup(group)}
                 >
                   <span className="text-sm">{group}</span>
                   <Button
                     variant="ghost"
                     size="sm"
                     onClick={(e) => {
                       e.stopPropagation()
                       handleDeleteGroup(group)
                     }}
                     className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                   >
                     ×
                   </Button>
                 </div>
               ))}
             </div>
           </div>
           
           {/* Right side - Stock list */}
           <div className="flex-1 pl-4">
             <div className="flex items-center justify-between mb-3">
               <h3 className="font-medium">股票列表 - {selectedGroup}</h3>
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => toast.info("功能开发中...")}
                 className="h-7 px-2 text-xs"
               >
                 <Plus className="w-3 h-3 mr-1" />
                 添加
               </Button>
             </div>
             <div className="border rounded">
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead className="w-20">代码</TableHead>
                     <TableHead>名称</TableHead>
                     <TableHead>市场</TableHead>
                     <TableHead className="w-16">操作</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {(groupStocks[selectedGroup] || []).map((stock, index) => (
                     <TableRow 
                       key={stock.code}
                       draggable
                       onDragStart={(e) => handleDragStart(e, index)}
                       onDragOver={handleDragOver}
                       onDrop={(e) => handleDrop(e, index)}
                       className="cursor-move hover:bg-muted/50"
                     >
                       <TableCell className="font-mono text-sm">
                         <div className="flex items-center gap-2">
                           <GripVertical className="w-3 h-3 text-muted-foreground" />
                           {stock.code}
                         </div>
                       </TableCell>
                       <TableCell className="text-sm">{stock.name}</TableCell>
                       <TableCell className="text-sm">港股</TableCell>
                       <TableCell>
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => handleRemoveStockFromGroup(stock.code)}
                           className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                         >
                           ×
                         </Button>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </div>
           </div>
         </div>
         <div className="flex justify-end">
           <Button onClick={() => setIsManageGroupOpen(false)}>
             关闭
           </Button>
         </div>
       </DialogContent>
     </Dialog>

     {/* Create Group Dialog */}
     <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
       <DialogContent className="sm:max-w-md">
         <DialogHeader>
           <DialogTitle>创建分组</DialogTitle>
         </DialogHeader>
         <div className="space-y-4">
           <div>
             <Label htmlFor="groupName">分组名称</Label>
             <Input
               id="groupName"
               value={newGroupName}
               onChange={(e) => setNewGroupName(e.target.value)}
               placeholder="输入分组名称"
               className="mt-1"
             />
           </div>
           <div className="flex justify-end gap-2">
             <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
               取消
             </Button>
             <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
               创建
             </Button>
           </div>
         </div>
       </DialogContent>
     </Dialog>
   </div>
 )
}
