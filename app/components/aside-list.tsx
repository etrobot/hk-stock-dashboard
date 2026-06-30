'use client'

import { useState, useMemo, type DragEvent, type ReactNode } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { hkHotStocks } from '../data/mock-data'
import { Stock } from '../types/market'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { List, Grid3X3, ChevronDown, ChevronUp, Plus, Settings, Zap, Star, Trash2, GripVertical } from 'lucide-react'
import { StockGridItem } from './stock-grid-item'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu'
import { toast } from '@/hooks/use-toast'
import { useTradingPopup } from '../contexts/TradingPopupContext'

export function AsideList({
  rankingTitle,
  isWatchlistRoute,
  sidebarViewMode,
  onSidebarViewModeChange,
  selectedPeriod,
  onSelectedPeriodChange,
  selectedFilter,
  onSelectedFilterChange,
  isCreateGroupOpen,
  setIsCreateGroupOpen,
  isManageGroupOpen,
  setIsManageGroupOpen,
  customGroups,
  onListItemClick,
  onGridItemClick,
  hideViewToggle = false,
}: {
  rankingTitle: string
  isWatchlistRoute: boolean
  sidebarViewMode: 'list' | 'grid'
  onSidebarViewModeChange: (mode: 'list' | 'grid') => void
  selectedPeriod: string
  onSelectedPeriodChange: (period: string) => void
  selectedFilter: string
  onSelectedFilterChange: (filter: string) => void
  isCreateGroupOpen: boolean
  setIsCreateGroupOpen: (open: boolean) => void
  isManageGroupOpen: boolean
  setIsManageGroupOpen: (open: boolean) => void
  customGroups: string[]
  onListItemClick: (code: string) => void
  onGridItemClick: (code: string) => void
  hideViewToggle?: boolean
}) {
  const { t } = useLanguage()
  const { openTradingPopup } = useTradingPopup()

  type SortField = 'price' | 'percentage'
  type SortDirection = 'asc' | 'desc'

  const [stocks, setStocks] = useState<Stock[]>(() => hkHotStocks.slice(0, 20))
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const parsePrice = (price: string) => parseFloat(price.replace(/,/g, ''))
  const parsePercentage = (percentage: string) => parseFloat(percentage.replace(/[%+]/g, ''))

  const sortStocks = (list: Stock[], field: SortField, direction: SortDirection) => {
    return [...list].sort((a, b) => {
      const aVal = field === 'price' ? parsePrice(a.price) : parsePercentage(a.percentage)
      const bVal = field === 'price' ? parsePrice(b.price) : parsePercentage(b.percentage)
      return direction === 'asc' ? aVal - bVal : bVal - aVal
    })
  }

  const displayedStocks = useMemo(() => {
    if (!isWatchlistRoute) return hkHotStocks.slice(0, 20)
    if (!sortField) return stocks
    return sortStocks(stocks, sortField, sortDirection)
  }, [isWatchlistRoute, stocks, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const handleDragStart = (e: DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (dragIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    const currentList = sortField
      ? sortStocks(stocks, sortField, sortDirection)
      : [...stocks]
    const [draggedStock] = currentList.splice(dragIndex, 1)
    currentList.splice(dropIndex, 0, draggedStock)
    setStocks(currentList)
    setSortField(null)
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const SortableHeader = ({ field, children }: { field: SortField; children: ReactNode }) => (
    <TableHead
      className="text-muted-foreground cursor-pointer hover:text-foreground select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-0.5">
        {children}
        {sortField === field && (
          sortDirection === 'asc'
            ? <ChevronUp className="w-3 h-3" />
            : <ChevronDown className="w-3 h-3" />
        )}
      </div>
    </TableHead>
  )
  
  const filterOptions = [
    '全部',
    '港股',
    '美股',
    ...customGroups,
  ]

  const renderFilterLabel = (value: string) => {
    if (value === '全部') return t('market.all')
    if (value === '港股') return t('market.hk')
    if (value === '美股') return t('market.us')
    return value
  }

  const showAddToast = (name: string) => {
    toast({
      title: `${name} 已经添加`,
    })
  }

  const showRemoveToast = (name: string) => {
    toast({
      title: `${name} 已经删除`,
    })
  }

  const handleManageGroups = () => {
    setIsManageGroupOpen(true)
  }

  const handleQuickTrade = (code: string, name: string) => {
    openTradingPopup({
      stockCode: code,
      stockName: name,
    })
  }

  return (
    <aside className={`${sidebarViewMode === 'grid' ? 'flex-1' : 'w-[260px]'} border-r border-border flex-shrink-0 flex flex-col`}>
      <div className="p-3 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-sm font-medium text-foreground">{rankingTitle}</span>
            {isWatchlistRoute && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 justify-between text-xs">
                    {renderFilterLabel(selectedFilter)}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-40">
                  {filterOptions.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => onSelectedFilterChange(option)}
                      className="text-xs"
                    >
                      {renderFilterLabel(option)}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Plus className="w-3 h-3 mr-2" />
                        {t('aside.create_group')}
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </Dialog>
                  <Dialog open={isManageGroupOpen} onOpenChange={setIsManageGroupOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Settings className="w-3 h-3 mr-2" />
                        {t('aside.manage_group')}
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {!hideViewToggle && (
            <div className="flex items-center gap-1">
            <Button
              variant={sidebarViewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSidebarViewModeChange('list')}
              className="h-6 w-6 p-0"
            >
              <List className="w-3 h-3" />
            </Button>
            <Button
              variant={sidebarViewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSidebarViewModeChange('grid')}
              className="h-6 w-6 p-0"
            >
              <Grid3X3 className="w-3 h-3" />
            </Button>
          </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {sidebarViewMode === 'list' ? (
          <div className="p-3">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">{t('stock_detail.name_code')}</TableHead>
                  {isWatchlistRoute ? (
                    <>
                      <SortableHeader field="price">{t('stock_detail.latest_price')}</SortableHeader>
                      <SortableHeader field="percentage">{t('stock_detail.change_percent')}</SortableHeader>
                    </>
                  ) : (
                    <>
                      <TableHead className="text-muted-foreground">{t('stock_detail.latest_price')}</TableHead>
                      <TableHead className="text-muted-foreground">{t('stock_detail.change_percent')}</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedStocks.map((s, idx) => (
                  <ContextMenu key={s.code}>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        className={`border-border hover:bg-muted/20 cursor-pointer ${
                          isWatchlistRoute ? 'cursor-move' : ''
                        } ${draggedIndex === idx ? 'opacity-50' : ''}`}
                        draggable={isWatchlistRoute}
                        onDragStart={isWatchlistRoute ? (e) => handleDragStart(e, idx) : undefined}
                        onDragOver={isWatchlistRoute ? handleDragOver : undefined}
                        onDrop={isWatchlistRoute ? (e) => handleDrop(e, idx) : undefined}
                        onDragEnd={isWatchlistRoute ? handleDragEnd : undefined}
                        onClick={() => onListItemClick(s.code)}
                      >
                        <TableCell className="text-sm whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {isWatchlistRoute && (
                              <GripVertical className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            )}
                            <div className="flex flex-col leading-tight">
                              <span className="text-foreground">{s.name}</span>
                              <span className="text-xs text-muted-foreground">{s.code}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-mono text-foreground">{s.price}</TableCell>
                        <TableCell className={`text-sm font-mono ${s.percentage?.startsWith('+') ? 'text-green-500' : s.percentage?.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'}`}>{s.percentage}</TableCell>
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-44">
                      <ContextMenuItem
                        onSelect={(event) => {
                          event.preventDefault()
                          handleQuickTrade(s.code, s.name)
                        }}
                        className="text-xs"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        快捷交易
                      </ContextMenuItem>
                      {!isWatchlistRoute && (
                        <ContextMenuItem
                          onSelect={(event) => {
                            event.preventDefault()
                            showAddToast(s.name)
                          }}
                          className="text-xs"
                        >
                          <Star className="w-3.5 h-3.5" />
                          加入自选
                        </ContextMenuItem>
                      )}
                      <ContextMenuItem
                        onSelect={(event) => {
                          event.preventDefault()
                          handleManageGroups()
                        }}
                        className="text-xs"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        分组管理
                      </ContextMenuItem>
                       {isWatchlistRoute && (<ContextMenuItem
                        onSelect={(event) => {
                          event.preventDefault()
                          showRemoveToast(s.name)
                        }}
                        className="text-xs"
                        variant="destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        删除自选
                      </ContextMenuItem>)}
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-3 h-full flex flex-col">
            <div className="flex-shrink-0 mb-3 pb-3 border-b border-border">
              <div className="flex gap-1 flex-wrap">
                {[
                  { key: 'daily', label: t('period.daily') },
                  { key: 'weekly', label: t('period.weekly') },
                  { key: 'monthly', label: t('period.monthly') },
                  { key: 'quarterly', label: t('period.quarterly') },
                  { key: 'yearly', label: t('period.yearly') },
                ].map((period) => (
                  <Button
                    key={period.key}
                    variant={selectedPeriod === period.key ? 'default' : 'ghost'}
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => onSelectedPeriodChange(period.key)}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {hkHotStocks.slice(0, 20).map((s, idx) => (
                  <ContextMenu key={`${s.code}-${idx}`}>
                    <ContextMenuTrigger asChild>
                      <div>
                        <StockGridItem
                          stock={s}
                          selectedPeriod={selectedPeriod}
                          onClick={() => onGridItemClick(s.code)}
                        />
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-44">
                      <ContextMenuItem
                        onSelect={(event) => {
                          event.preventDefault()
                          handleQuickTrade(s.code, s.name)
                        }}
                        className="text-xs"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        快捷交易
                      </ContextMenuItem>
                      {!isWatchlistRoute && (
                        <ContextMenuItem
                          onSelect={(event) => {
                            event.preventDefault()
                            showAddToast(s.name)
                          }}
                          className="text-xs"
                        >
                          <Star className="w-3.5 h-3.5" />
                          加入自选
                        </ContextMenuItem>
                      )}
                      <ContextMenuItem
                        onSelect={(event) => {
                          event.preventDefault()
                          showRemoveToast(s.name)
                        }}
                        className="text-xs"
                        variant="destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        删除自选
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
