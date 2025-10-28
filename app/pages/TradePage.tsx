import { useState } from 'react'
import { Lock, Plus, GripVertical } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { useTradingLock } from '../contexts/TradingLockContext'
import { TradingForm } from '../components/shared/TradingForm'
import { TradingTabs } from '../components/shared/TradingTabs'
import { AsideList } from '../components/aside-list'
import { IndexInfoPanel } from '../components/index-info-panel'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { toast } from 'sonner'
import { type StockData, mockStockData } from '../data/mockStockData'
import { hkHotStocks } from '../data/mock-data'
import { type IndexDetail } from '../types/market'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import UnifiedAssetCashCards from '../components/account/UnifiedAssetCashCards'
import { useLanguage } from '../contexts/LanguageContext'

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
  const { t } = useLanguage()
  const [selectedAccount, setSelectedAccount] = useState('孖展账户12345678')
  const [stockCode, setStockCode] = useState('00005')
  const [orderType, setOrderType] = useState('order_type.enhanced_limit')
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
        rankingTitle={t('nav.watchlist')}
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
                    {/* First row: Three tables side by side (reused component) */}
            <UnifiedAssetCashCards />


      <div className="p-3">
        <Tabs defaultValue="trade">
          <TabsList className="bg-transparent p-0 border-b border-border rounded-none h-auto">
            <TabsTrigger value="trade" className="rounded-none border-0 h-auto px-3 py-2 text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
            </TabsTrigger>
          </TabsList>
          <TabsContent value="trade" className="mt-3 min-w-0">
            <div className="flex gap-6 min-w-0">
              <div className="space-y-4 w-[320px] flex-shrink-0">
                <TradingForm
                  stockCode={stockCode}
                  setStockCode={setStockCode}
                  orderType={orderType}
                  setOrderType={setOrderType}
                  price={price}
                  setPrice={setPrice}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  adjustPrice={adjustPrice}
                  adjustQuantity={adjustQuantity}
                  accountData={accountData}
                  nameBelowCode={hkHotStocks.find(s => s.code === stockCode)?.name || stockData.name}
                />
              </div>

              <div className="flex-1 min-w-0">
                <TradingTabs
                  stockCode={stockCode}
                  holdings={holdings}
                  todayOrders={todayOrders}
                  todayTransactions={todayTransactions}
                  market={market}
                  setMarket={setMarket}
                  currency={currency}
                  setCurrency={setCurrency}
                  onHoldingSelect={(code, availableQty, currentPrice) => {
                    setStockCode(code)
                    setQuantity(availableQty)
                    setPrice(currentPrice)
                  }}
                />
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
            <DialogTitle>{t('groups.manage')}</DialogTitle>
          </DialogHeader>
         <div className="flex h-[500px]">
           {/* Left side - Group names */}
           <div className="w-1/3 border-r pr-4">
             <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">{t('groups.list')}</h3>
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
                {t('groups.create')}
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
              <h3 className="font-medium">{`${t('groups.stock_list')} - ${selectedGroup}`}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info(t('page.developing'))}
                className="h-7 px-2 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                {t('common.add')}
              </Button>
            </div>
            <div className="border rounded">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">{t('table.code')}</TableHead>
                    <TableHead>{t('table.name')}</TableHead>
                    <TableHead>{t('common.market')}</TableHead>
                    <TableHead className="w-16">{t('common.action')}</TableHead>
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
                       <TableCell className="text-sm">{t('market.hk')}</TableCell>
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
            {t('common.close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

     {/* Create Group Dialog */}
     <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
       <DialogContent className="sm:max-w-md">
         <DialogHeader>
          <DialogTitle>{t('groups.create')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName">{t('groups.name')}</Label>
            <Input
              id="groupName"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder={t('groups.input_name_placeholder')}
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
              {t('common.create')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
   </div>
 )
}
