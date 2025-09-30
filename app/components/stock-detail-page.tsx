'use client'

import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { StockPriceHeader } from './stock-price-header'
import { StockChart } from './stock-chart'
import { IndexInfoPanel } from './index-info-panel'
import { type StockData, mockStockData } from '../data/mockStockData'
import { type IndexDetail } from '../types/market'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { hkHotStocks } from '../data/mock-data'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { List, Grid3X3, ChevronDown, Plus, Settings, GripVertical } from 'lucide-react'
import { StockGridItem } from './stock-grid-item'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from 'sonner'

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


export function StockDetailPage({ titleOverride }: { titleOverride?: string }) {
  const params = useParams()
  const location = useLocation()
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
  const { t } = useLanguage()

  // Check if we're on the watchlist route
  const isWatchlistRoute = location.pathname === '/watchlist'

  // Get title from URL search params if available
  const searchParams = new URLSearchParams(location.search)
  const titleFromUrl = searchParams.get('title')

  // Sync symbol from route params if present
  useEffect(() => {
    const symbolParam = (params as any)?.symbol as string | undefined
    if (symbolParam) {
      setStockData(prev => ({ ...prev, symbol: symbolParam }))
    }
  }, [params])


  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prev => ({
        ...mockStockData,
        ...prev,
        price: Number((prev.price + (Math.random() - 0.5) * 0.1).toFixed(3)),
        change: Number((prev.price + (Math.random() - 0.5) * 0.1 - prev.previousClose).toFixed(3)),
        changePercent: Number((((prev.price + (Math.random() - 0.5) * 0.1 - prev.previousClose) / prev.previousClose) * 100).toFixed(2))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()
  const rankingTitle = titleOverride ?? titleFromUrl ?? t('stock_detail.ranking')

  // Handle sidebar item click based on route
  const handleSidebarItemClick = (stockCode: string) => {
    if (isWatchlistRoute) {
      // In watchlist route, only update the stock data without changing route
      setStockData(prev => ({ ...prev, symbol: stockCode }))
    } else {
      // In other routes, navigate to the stock detail page
      navigate(`/stock/${encodeURIComponent(stockCode)}`)
    }
  }

  // Handle grid sidebar item click - switch to list view and navigate
  const handleGridSidebarItemClick = (stockCode: string) => {
    setSidebarViewMode('list')
    if (isWatchlistRoute) {
      // In watchlist route, only update the stock data without changing route
      setStockData(prev => ({ ...prev, symbol: stockCode }))
    } else {
      // In other routes, navigate to the stock detail page
      navigate(`/stock/${encodeURIComponent(stockCode)}`)
    }
  }

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      setCustomGroups(prev => [...prev, newGroupName.trim()])
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

  const handleRemoveStockFromGroup = (stockCode: string) => {
    setGroupStocks(prev => ({
      ...prev,
      [selectedGroup]: prev[selectedGroup]?.filter(stock => stock.code !== stockCode) || []
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
      
      // Remove the dragged item
      currentStocks.splice(dragIndex, 1)
      // Insert at new position
      currentStocks.splice(dropIndex, 0, draggedStock)
      
      return {
        ...prev,
        [selectedGroup]: currentStocks
      }
    })
  }

  const filterOptions = [
    '全部',
    '港股', 
    '美股',
    '加密货币',
    ...customGroups
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Left Ranking Sidebar */}
      <aside className={`${sidebarViewMode === 'grid' ? 'flex-1' : 'w-[260px]'} border-r border-border flex-shrink-0 flex flex-col`}>
        <div className="p-3 border-b border-border">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-sm font-medium text-foreground">{rankingTitle}</span>
              {isWatchlistRoute && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 justify-between text-xs">
                      {selectedFilter}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    {filterOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setSelectedFilter(option)}
                        className="text-xs"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Plus className="w-3 h-3 mr-2" />
                          创建分组
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </Dialog>
                    <Dialog open={isManageGroupOpen} onOpenChange={setIsManageGroupOpen}>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Settings className="w-3 h-3 mr-2" />
                          管理分组
                        </DropdownMenuItem>
                      </DialogTrigger>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={sidebarViewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSidebarViewMode('list')}
                className="h-6 w-6 p-0"
              >
                <List className="w-3 h-3" />
              </Button>
              <Button
                variant={sidebarViewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSidebarViewMode('grid')}
                className="h-6 w-6 p-0"
              >
                <Grid3X3 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {sidebarViewMode === 'list' ? (
            <div className="p-3">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">{t('stock_detail.name_code')}</TableHead>
                    <TableHead className="text-muted-foreground">{t('stock_detail.latest_price')}</TableHead>
                    <TableHead className="text-muted-foreground">{t('stock_detail.change_percent')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hkHotStocks.slice(0, 20).map((s, idx) => (
                    <TableRow
                      key={`${s.code}-${idx}`}
                      className="border-border hover:bg-muted/20 cursor-pointer"
                      onClick={() => handleSidebarItemClick(s.code)}
                    >
                      <TableCell className="text-sm whitespace-nowrap">
                        <div className="flex flex-col leading-tight">
                          <span className="text-foreground">{s.name}</span>
                          <span className="text-xs text-muted-foreground">{s.code}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-mono text-foreground">{s.price}</TableCell>
                      <TableCell className={`text-sm font-mono ${s.percentage?.startsWith('+') ? 'text-green-500' : s.percentage?.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'}`}>{s.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-3 h-full flex flex-col">
              {/* Period Selector */}
              <div className="flex-shrink-0 mb-3 pb-3 border-b border-border">
                <div className="flex gap-1 flex-wrap">
                  {[
                    { key: 'daily', label: '日' },
                    { key: 'weekly', label: '周' },
                    { key: 'monthly', label: '月' },
                    { key: 'quarterly', label: '季' },
                    { key: 'yearly', label: '年' }
                  ].map((period) => (
                    <Button
                      key={period.key}
                      variant={selectedPeriod === period.key ? 'default' : 'ghost'}
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setSelectedPeriod(period.key)}
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Grid Layout */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {hkHotStocks.slice(0, 20).map((s, idx) => (
                    <StockGridItem
                      key={`${s.code}-${idx}`}
                      stock={s}
                      selectedPeriod={selectedPeriod}
                      onClick={() => handleGridSidebarItemClick(s.code)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area - Only show in list mode */}
      {sidebarViewMode === 'list' && (
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
          </div>
        </div>
      )}

      {/* Right Info Panel - Always visible */}
      <div className="w-[360px] border-l border-border bg-background p-4 flex-shrink-0">
        <IndexInfoPanel indexDetail={transformStockToIndex(stockData)} />
      </div>

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
    </div>
  )
}