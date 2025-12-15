'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { hkHotStocks } from '../data/mock-data'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { List, Grid3X3, ChevronDown, Plus, Settings, Zap, Star, Trash2 } from 'lucide-react'
import { StockGridItem } from './stock-grid-item'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu'

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
                  <TableHead className="text-muted-foreground">{t('stock_detail.latest_price')}</TableHead>
                  <TableHead className="text-muted-foreground">{t('stock_detail.change_percent')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hkHotStocks.slice(0, 20).map((s, idx) => (
                  <ContextMenu key={`${s.code}-${idx}`}>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        className="border-border hover:bg-muted/20 cursor-pointer"
                        onClick={() => onListItemClick(s.code)}
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
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-44">
                      <ContextMenuItem onSelect={(event) => event.preventDefault()} className="text-xs">
                        <Zap className="w-3.5 h-3.5" />
                        快捷交易
                      </ContextMenuItem>
                      {!isWatchlistRoute && (
                        <ContextMenuItem onSelect={(event) => event.preventDefault()} className="text-xs">
                          <Star className="w-3.5 h-3.5" />
                          加入自选
                        </ContextMenuItem>
                      )}
                      {isWatchlistRoute && (<ContextMenuItem
                        onSelect={(event) => event.preventDefault()}
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
                      <ContextMenuItem onSelect={(event) => event.preventDefault()} className="text-xs">
                        <Zap className="w-3.5 h-3.5" />
                        快捷交易
                      </ContextMenuItem>
                      {!isWatchlistRoute && (
                        <ContextMenuItem onSelect={(event) => event.preventDefault()} className="text-xs">
                          <Star className="w-3.5 h-3.5" />
                          加入自选
                        </ContextMenuItem>
                      )}
                      <ContextMenuItem
                        onSelect={(event) => event.preventDefault()}
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
