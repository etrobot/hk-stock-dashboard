import { useState } from 'react'
import { Lock, Plus, GripVertical } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useTradingLock } from '../contexts/TradingLockContext'
import { AsideList } from '../components/aside-list'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { toast } from 'sonner'
import { hkHotStocks } from '../data/mock-data'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { useLanguage } from '../contexts/LanguageContext'
import TradeDashboardDemo from '../components/TradeDashboardDemo'

export default function TradePage({ initialLayoutId, onBack, showLayoutControls, hideStaticAside }: {
  initialLayoutId?: string | null
  onBack?: () => void
  showLayoutControls?: boolean
  hideStaticAside?: boolean
}) {
  const { t } = useLanguage()
  const { isTradeUnlocked, showUnlockDialog } = useTradingLock()

  // AsideList state
  const [showAside, setShowAside] = useState(true)
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

  const handleSidebarItemClick = (_stockCode: string) => {
    // demo: stock selection handled within dashboard
  }

  const handleGridSidebarItemClick = (_stockCode: string) => {
    setSidebarViewMode('list')
  }

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      setCustomGroups(prev => [...prev, newGroupName.trim()])
      setGroupStocks(prev => ({ ...prev, [newGroupName.trim()]: [] }))
      setSelectedGroup(newGroupName.trim())
      setNewGroupName('')
      setIsCreateGroupOpen(false)
      setIsManageGroupOpen(true)
    }
  }

  const handleDeleteGroup = (groupName: string) => {
    setCustomGroups(prev => prev.filter(g => g !== groupName))
    setGroupStocks(prev => {
      const next = { ...prev }
      delete next[groupName]
      return next
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
      return { ...prev, [selectedGroup]: currentStocks }
    })
  }

  const asideElement = (
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
  )

  return (
    <div className="h-full bg-background text-foreground relative flex no-scrollbar">
      {/* Left AsideList - fixed, not draggable, can be hidden via panel management (trade page) */}
      {!hideStaticAside && showAside && asideElement}

      {/* Draggable trading dashboard demo - horizontal scroll */}
      <div className="flex-1 min-w-0 relative">
        <TradeDashboardDemo
          showAside={showAside}
          onToggleAside={() => setShowAside(v => !v)}
          initialLayoutId={initialLayoutId}
          onBack={onBack}
          showLayoutControls={showLayoutControls}
          asideEl={hideStaticAside ? asideElement : undefined}
        />

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