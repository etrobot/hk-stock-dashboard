'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Heart, TrendingUp, RefreshCwIcon, X, Trash2, ArrowLeft } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { StockGridItem } from './stock-grid-item'
import { TradeTickPanel } from './trade-tick-panel'
import { CapitalFlowChart } from './CapitalFlowChart'
import { TradingForm } from './shared/TradingForm'
import { TradingTabs } from './shared/TradingTabs'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from './theme-provider'
import { type StockData, mockStockData } from '../data/mockStockData'
import { type IndexDetail } from '../types/market'
import { mockDetailedStocks } from '../data/mock-detailed-stocks'
import { useLayout, type LayoutConfig, DEFAULT_INITIAL_ORDER, MODULE_DEFS } from '../contexts/LayoutContext'

// Transform StockData to IndexDetail format (same as original TradePage)
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

export default function TradeDashboardDemo({ showAside, onToggleAside, initialLayoutId, onBack }: {
  showAside: boolean
  onToggleAside: () => void
  initialLayoutId?: string | null
  onBack?: () => void
}) {
  const { t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [selectedAccount, setSelectedAccount] = useState('孖展账户12345678')
  const [stockCode, setStockCode] = useState('00005')
  const [orderType, setOrderType] = useState('order_type.enhanced_limit')
  const [price, setPrice] = useState('2')
  const [quantity, setQuantity] = useState('2')
  const [market, setMarket] = useState('全部')
  const [currency, setCurrency] = useState('USD')
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState('HKD')
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const [showManagePanel, setShowManagePanel] = useState(false)

  // Layout management (shared catalog lives in LayoutContext)
  const {
    layouts,
    displayedLayouts,
    activeLayoutId,
    setActiveLayoutId,
    addLayout,
    updateLayout,
    deleteLayout,
  } = useLayout()

  // Is there an active custom (non-default) layout that can be overwritten?
  const activeCustomLayout = activeLayoutId
    ? layouts.find(l => l.id === activeLayoutId)
    : undefined

  const [showActiveBadge, setShowActiveBadge] = useState(false)
  const badgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLayoutListPanel, setShowLayoutListPanel] = useState(false)
  const [layoutNameInput, setLayoutNameInput] = useState('')

  // Dirty tracking: compare current state vs last-loaded config
  const [order, setOrder] = useState<string[]>(DEFAULT_INITIAL_ORDER)
  const lastLoadedRef = useRef<{ order: string[]; hiddenIds: string[]; showAside: boolean }>({
    order: [...DEFAULT_INITIAL_ORDER],
    hiddenIds: [],
    showAside: true,
  })

  // Pending switch target (when user needs to confirm unsaved changes before switching)
  const [pendingSwitchTarget, setPendingSwitchTarget] = useState<LayoutConfig | null>(null)
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false)

  const isDirty = useMemo(() => {
    const last = lastLoadedRef.current
    const orderSame = JSON.stringify(order) === JSON.stringify(last.order)
    const hiddenSame = JSON.stringify([...hiddenIds].sort()) === JSON.stringify([...last.hiddenIds].sort())
    const asideSame = showAside === last.showAside
    return !orderSame || !hiddenSame || !asideSame
  }, [order, hiddenIds, showAside])

  // Clear previous active badge display timer and start a new 3s one
  const bumpActiveBadge = () => {
    setShowActiveBadge(true)
    if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current)
    badgeTimerRef.current = setTimeout(() => {
      setShowActiveBadge(false)
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current)
    }
  }, [])

  const formatSavedAt = (date: Date) => {
    const y = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const mi = String(date.getMinutes()).padStart(2, '0')
    const ss = String(date.getSeconds()).padStart(2, '0')
    return `${y}/${mm}/${dd}-${hh}:${mi}:${ss}`
  }

  const applyLayout = (layout: LayoutConfig) => {
    setOrder([...layout.order])
    setHiddenIds(new Set(layout.hiddenIds))
    if (showAside !== layout.showAside) {
      onToggleAside()
    }
    setActiveLayoutId(layout.id)
    lastLoadedRef.current = {
      order: [...layout.order],
      hiddenIds: [...layout.hiddenIds],
      showAside: layout.showAside,
    }
    bumpActiveBadge()
  }

  // 从缩略图选择页进入时，按传入的布局 id 加载布局
  useEffect(() => {
    if (!initialLayoutId) return
    const target = displayedLayouts.find(l => l.id === initialLayoutId)
    if (target) applyLayout(target)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLayoutId])

  // Mark the just-saved state as clean and run any pending layout switch
  const finalizeSave = (savedLayoutId: string | null) => {
    setActiveLayoutId(savedLayoutId)
    lastLoadedRef.current = {
      order: [...order],
      hiddenIds: Array.from(hiddenIds),
      showAside,
    }
    bumpActiveBadge()
    setShowSaveDialog(false)
    setLayoutNameInput('')

    // If there's a pending switch, execute it after saving
    if (pendingSwitchTarget) {
      const target = pendingSwitchTarget
      setPendingSwitchTarget(null)
      // Use setTimeout to ensure state updates are flushed
      setTimeout(() => applyLayout(target), 0)
    }
  }

  // 另存为：始终新建一份自定义布局
  const handleSaveAs = () => {
    const base = layoutNameInput.trim()
    if (!base) return
    const now = new Date()
    const newLayout: LayoutConfig = {
      id: `ly_${Date.now()}`,
      name: base,
      savedAt: formatSavedAt(now),
      order: [...order],
      hiddenIds: Array.from(hiddenIds),
      showAside,
    }
    addLayout(newLayout)
    finalizeSave(newLayout.id)
  }

  // 保存：若当前是自定义布局则覆盖，否则等同于另存为
  const handleSaveLayout = () => {
    if (activeCustomLayout) {
      const now = new Date()
      updateLayout(activeCustomLayout.id, {
        savedAt: formatSavedAt(now),
        order: [...order],
        hiddenIds: Array.from(hiddenIds),
        showAside,
      })
      finalizeSave(activeCustomLayout.id)
      return
    }
    handleSaveAs()
  }

  const handleSwitchLayout = (layout: LayoutConfig) => {
    if (isDirty) {
      setPendingSwitchTarget(layout)
      setShowSwitchConfirm(true)
      setShowLayoutListPanel(false)
    } else {
      applyLayout(layout)
      setShowLayoutListPanel(false)
    }
  }

  const handleDiscardAndSwitch = () => {
    setShowSwitchConfirm(false)
    if (pendingSwitchTarget) {
      applyLayout(pendingSwitchTarget)
      setPendingSwitchTarget(null)
    }
    setShowLayoutListPanel(false)
  }

  const handleSaveBeforeSwitch = () => {
    setShowSwitchConfirm(false)
    setShowSaveDialog(true)
  }

  const handleDeleteLayout = (id: string) => {
    deleteLayout(id)
  }


  const stockData = mockStockData
  const indexDetail = transformStockToIndex(stockData)
  const selectedStock = mockDetailedStocks.find(s => s.symbol === indexDetail.code) || mockDetailedStocks[0]
  const basePrice = parseFloat(selectedStock.last.replace(/,/g, '')) || 100

  const adjustPrice = (delta: number) => {
    const cur = parseFloat(price)
    setPrice((isNaN(cur) ? 0 : cur + delta).toFixed(3))
  }
  const adjustQuantity = (delta: number) => {
    const cur = parseInt(quantity, 10)
    setQuantity(String(Math.max(0, isNaN(cur) ? 0 : cur + delta)))
  }

  const accountData = {
    balance: '0.00',
    cashAvailable: '0',
    positionSellable: '0',
    maxBuyable: '0',
  }

  const holdings = [
    {
      code: '00005', name: '汇丰控股', holdingQty: '2', availableQty: '2',
      currentPrice: '98.450', avgCost: '62.15', marketValue: '196.90',
      unrealizedPnlRatio: '+58.33%', totalPnl: '+72.60', unrealizedPnl: '+72.60',
      realizedPnl: '0.00', todayPnl: '+2.80', positionRatio: '49.93%',
    },
  ]
  const todayOrders = [
    {
      code: stockCode, name: '汇丰控股', orderTime: '2023-10-01 09:00',
      orderPrice: '98.45', avgPrice: '98.45', orderQuantity: '1',
      filledQuantity: '0', direction: 'buy' as const, status: 'pending' as const,
    },
  ]
  const todayTransactions = [
    {
      code: stockCode, name: '汇丰控股', executionTime: '2023-10-01 09:05',
      executionQuantity: '1', direction: 'buy' as const, executionAmount: '98.45',
    },
  ]

  const stockLabel = `${indexDetail.name} (${indexDetail.code})`
  const newsItems = [
    { title: `${stockLabel} 计划明年上半年推出新品及系列升级`, source: '首页 AASTOCKS', time: '2小时前' },
    { title: `${stockLabel} 获机构关注，分析师上调目标价`, source: 'DoNews', time: '45分钟前' },
    { title: `${stockLabel} 发布季度业绩，营收同比变化引关注`, source: 'DoNews', time: '45分钟前' },
    { title: `${stockLabel} 供应链动态：核心零部件厂商加码投入`, source: 'DoNews', time: '45分钟前' },
    { title: `${stockLabel} 新产品传闻再起，市场预期升温`, source: 'DoNews', time: '45分钟前' },
    { title: `${stockLabel} 海外市场拓展进展，关注后续落地`, source: 'DoNews', time: '45分钟前' },
  ]

  // ---- drag & drop reorder helpers --------------------------------------
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = 'move'
    setDraggedId(id)
  }
  const handleDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault()
    if (!draggedId || draggedId === overId) return
    setOrder((prev) => {
      const from = prev.indexOf(draggedId)
      const to = prev.indexOf(overId)
      if (from < 0 || to < 0 || from === to) return prev
      const next = [...prev]
      next.splice(from, 1)
      next.splice(to, 0, draggedId)
      return next
    })
  }
  const handleDrop = () => setDraggedId(null)

  const toggleHidden = (id: string) => {
    setHiddenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // 组件管理弹窗：按三列分类展示（自选放在行情资讯列）
  const componentGroups: { title: string; ids: string[] }[] = [
    { title: '行情资讯', ids: ['kline', 'fundflow', 'news', 'analysis'] },
    { title: '交易盘口', ids: ['orderbook', 'levels', 'ticks', 'form'] },
    { title: '持仓信息', ids: ['assets', 'cash', 'withdraw', 'assetPanel'] },
  ]

  // ---- orderBookSection (copied from MarketContent) ----------------------
  const orderBookSection = (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-foreground">{t('order_book.title')}</h3>
        <div className="w-6 h-6 bg-muted rounded text-xs flex items-center justify-center text-muted-foreground">10</div>
      </div>
      <div className="flex items-center gap-2 mb-3 text-xs">
        <span className="text-red-500">45.79%</span>
        <div className="flex-1 h-2 bg-muted rounded overflow-hidden">
          <div className="h-full flex">
            <div className="bg-red-500 w-[45.79%]"></div>
            <div className="bg-green-500 flex-1"></div>
          </div>
        </div>
        <span className="text-green-500">54.21%</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className={`flex items-center gap-2 py-1 text-xs ${i === 0 ? 'bg-red-50 dark:bg-red-950/20' : ''}`}>
              <div className="w-4 h-4 bg-red-500 rounded text-white flex items-center justify-center text-[10px]">{i + 1}</div>
              <span className="text-red-500 flex-1">188.600</span>
              <span className="text-muted-foreground">8.7K(12)</span>
            </div>
          ))}
        </div>
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className={`flex items-center gap-2 py-1 text-xs ${i === 0 ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
              <div className="w-4 h-4 bg-green-500 rounded text-white flex items-center justify-center text-[10px]">{i + 1}</div>
              <span className="text-red-500 flex-1">188.600</span>
              <span className="text-muted-foreground">8.7K(12)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ---- capitalFlowSection (copied from MarketContent) --------------------
  const capitalFlowSection = (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-foreground">{t('capital_flow.title')}</h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{t('capital_flow.unit')}</span>
          <button className="text-muted-foreground hover:text-foreground">{t('capital_flow.history')}</button>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        <div className="bg-muted rounded-full px-4 py-1">
          <button className="bg-background rounded-full px-3 py-1 text-xs text-foreground shadow-sm">{t('capital_flow.5d')}</button>
        </div>
        <button className="px-3 py-1 text-xs text-muted-foreground">{t('capital_flow.20d')}</button>
        <button className="px-3 py-1 text-xs text-muted-foreground">{t('capital_flow.60d')}</button>
      </div>
      <div className="text-xs text-muted-foreground mb-3">{t('capital_flow.net_inflow')}</div>
      <div className="h-48 bg-muted/50 mb-3 flex items-center justify-center p-4">
        <CapitalFlowChart
          totalInflow={18163.34}
          totalOutflow={23749.76}
          netOutflow={1.72}
          data={[
            { category: '特大', inflow: 6053.98, outflow: 2636.57, inflowPercentage: 4.11, outflowPercentage: 1.79 },
            { category: '大单', inflow: 13044.97, outflow: 15528.90, inflowPercentage: 8.85, outflowPercentage: 10.54 },
            { category: '中单', inflow: 16597.67, outflow: 17585.03, inflowPercentage: 11.26, outflowPercentage: 11.93 },
            { category: '小单', inflow: 28577.26, outflow: 47366.29, inflowPercentage: 19.39, outflowPercentage: 32.14 },
          ]}
        />
      </div>
      <div className="flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500"></div>
          <span className="text-muted-foreground">{t('capital_flow.net_inflow_legend')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500"></div>
          <span className="text-muted-foreground">{t('capital_flow.net_outflow_legend')}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-muted-foreground">{t('capital_flow.close_price_legend')}</span>
        </div>
      </div>
    </div>
  )

  type BlockDef = { id: string; title: string; span: number; rowSpan?: number; content: React.ReactNode }

  const blocks: Record<string, BlockDef> = {
    // 1. 盘口 - IndexInfoPanel stock detail section with "按实际api数据开发" mask
    orderbook: {
      id: 'orderbook', title: '盘口', span: 3,
      content: (
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">{indexDetail.code}</span>
              <span className="font-medium">{indexDetail.name}</span>
            </div>
            <Heart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="bg-red-600 px-1 rounded">{indexDetail.market}</span>
            <span>{indexDetail.status}</span>
            <span className="bg-blue-600 px-1 rounded text-xs">L2</span>
            <span className="bg-orange-600 px-1 rounded text-xs">文</span>
          </div>
          <div className="space-y-4 relative">
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${indexDetail.isPositive ? 'text-chart-1' : 'text-chart-2'}`}>
                {indexDetail.value}
              </span>
              <TrendingUp className={`w-4 h-4 ${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`} />
              <span className={`text-xs ${indexDetail.isPositive ? 'text-chart-1' : 'text-chart-2'}`}>
                {indexDetail.change} {indexDetail.percentage}
              </span>
            </div>
            {/* Data mask overlay - "按实际api数据开发" */}
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
              <div className="text-center text-white">
                <p className="text-sm font-medium">按实际api数据开发</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('index_panel.high')}</span>
                  <span>{indexDetail.high}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('index_panel.open')}</span>
                  <span>{indexDetail.open}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('index_panel.volume')}</span>
                  <span>{indexDetail.volume}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('index_panel.low')}</span>
                  <span>{indexDetail.low}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('index_panel.close')}</span>
                  <span>{indexDetail.close}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('index_panel.avg_price')}</span>
                  <span>{indexDetail.avgPrice}</span>
                </div>
              </div>
            </div>
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{indexDetail.market}{t('index_panel.related')}</span>
                <div className="flex items-center gap-2">
                  <span>{indexDetail.value}</span>
                  <span className={`${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {indexDetail.change} {indexDetail.percentage}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{t('index_panel.futures')}</span>
                <div className="flex items-center gap-2">
                  <span>{indexDetail.value}</span>
                  <span className={`${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {indexDetail.change} {indexDetail.percentage}
                  </span>
                  <span className="text-blue-400">{t('index_panel.premium')} 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // 2. K线 - StockGridItem (same as MarketContent klineSection)
    kline: {
      id: 'kline', title: 'K线', span: 6,
      content: (
        <StockGridItem
          stock={{
            name: selectedStock.name,
            code: selectedStock.symbol,
            price: selectedStock.last,
            percentage: selectedStock.changeRate
          }}
          selectedPeriod="daily"
          wide
        />
      ),
    },
    // 3. 档位 - orderBookSection from MarketContent
    levels: {
      id: 'levels', title: '档位', span: 3,
      content: orderBookSection,
    },
    // 4. 成交明细 - TradeTickPanel
    ticks: {
      id: 'ticks', title: '成交明细', span: 3,
      content: (
        <TradeTickPanel basePrice={basePrice} className="h-[400px]" />
      ),
    },
    // 5. 资金流向 - capitalFlowSection from MarketContent
    fundflow: {
      id: 'fundflow', title: '资金流向', span: 3,
      content: capitalFlowSection,
    },
    // 6. 资讯 - news content from IndexInfoPanel
    news: {
      id: 'news', title: '资讯', span: 3,
      content: (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs px-3 py-1 h-auto">
              {t('index_panel.news_subtab')}
            </Button>
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-xs px-3 py-1 h-auto bg-transparent">
              {t('index_panel.announcement_subtab')}
            </Button>
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-400 hover:text-xs px-3 py-1 h-auto bg-transparent">
              {t('index_panel.rating_subtab')}
            </Button>
          </div>
          {newsItems.map((item, index) => (
            <div key={index} className="space-y-2 pb-3 border-b border-slate-800 last:border-b-0">
              <p className="text-sm leading-relaxed hover:text-blue-400 cursor-pointer">{item.title}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-orange-400">{item.source}</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    // 7. 分析 - analysis iframe from IndexInfoPanel
    analysis: {
      id: 'analysis', title: '分析', span: 3,
      content: (
        <div className="w-full h-[400px]">
          <iframe
            src={`http://testdv.tfisec.cn/tradestock/analysis?theme=${resolvedTheme === 'dark' ? 'dark' : 'white'}&stock_code=${indexDetail.code}&set_code=13`}
            className="w-full h-full border-0"
            title={t('index_panel.stock_analysis_title')}
          />
        </div>
      ),
    },
    // 8. 资产 - assets card from AssetCashCards
    assets: {
      id: 'assets', title: '资产', span: 3,
      content: (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2 items-center">
              <h3 className="text-card-foreground font-medium mb-2">{t('securities.assets')}</h3>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="bg-input text-foreground text-xs h-5 px-2 w-auto border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="HKD" className="text-xs">HKD</SelectItem>
                  <SelectItem value="USD" className="text-xs">USD</SelectItem>
                  <SelectItem value="CNY" className="text-xs">CNY</SelectItem>
                </SelectContent>
              </Select>
              <RefreshCwIcon />
            </div>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('securities.item')}</TableHead>
                  <TableHead>{t('securities.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>{t('securities.market_value')}</TableCell><TableCell>268.65</TableCell></TableRow>
                <TableRow><TableCell>{t('securities.available_funds')}</TableCell><TableCell>312.63</TableCell></TableRow>
                <TableRow><TableCell>{t('securities.in_transit_assets')}</TableCell><TableCell>2.51</TableCell></TableRow>
                <TableRow><TableCell>{t('securities.frozen_funds')}</TableCell><TableCell>0.69</TableCell></TableRow>
              </TableBody>
            </Table>
            <div className="text-center text-sm text-gray-300 mt-2">{t('securities.risk_level')} | {t('securities.safe')}</div>
          </CardContent>
        </Card>
      ),
    },
    // 9. 现金明细 - cashDetails card from AssetCashCards
    cash: {
      id: 'cash', title: '现金明细', span: 3,
      content: (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('securities.cash_details')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('securities.currency_type')}</TableHead>
                  <TableHead>{t('securities.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>HKD</TableCell><TableCell>-183.31</TableCell></TableRow>
                <TableRow><TableCell>USD</TableCell><TableCell>0.00</TableCell></TableRow>
                <TableRow><TableCell>CNH</TableCell><TableCell>0.00</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ),
    },
    // 10. 现金可提 - withdrawableCash card from AssetCashCards
    withdraw: {
      id: 'withdraw', title: '现金可提', span: 3,
      content: (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('securities.withdrawable_cash')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('securities.currency_type')}</TableHead>
                  <TableHead>{t('securities.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>HKD</TableCell><TableCell>0.00</TableCell></TableRow>
                <TableRow><TableCell>USD</TableCell><TableCell>0.00</TableCell></TableRow>
                <TableRow><TableCell>CNH</TableCell><TableCell>0.00</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ),
    },
    // 11. 下单面板 - TradingForm
    form: {
      id: 'form', title: '下单面板', span: 3, rowSpan: 2,
      content: (
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
          nameBelowCode="汇丰控股"
        />
      ),
    },
    // 12. 资产面板 - TradingTabs (持仓/订单/历史 3 tabs, span x2 = 6)
    assetPanel: {
      id: 'assetPanel', title: '资产面板', span: 6,
      content: (
        <div className="-m-4">
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
      ),
    },
  }

  return (
    <div className="h-full flex flex-col min-w-0 bg-background text-foreground">
      {/* account selector bar */}
      <div className="p-3 border-b flex items-center justify-between flex-shrink-0 relative">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onBack}
              title="返回选择页"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
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
          {activeLayoutId && showActiveBadge && (
            <span className="text-xs text-[#FF5C00] px-2 py-0.5 border border-[#FF5C00]/40 rounded transition-opacity duration-300">
              {displayedLayouts.find(l => l.id === activeLayoutId)?.name}
            </span>
          )}
        </div>
        {/* 右上角操作区（已隐藏：拖动提示 / 组件管理 / 布局管理 / 保存布局）
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden md:inline">拖动块标题即可自由拖拽排列</span>
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs gap-1"
            onClick={() => setShowManagePanel(v => !v)}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            组件管理
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs gap-1"
            onClick={() => {
              setShowLayoutListPanel(v => !v)
              setShowManagePanel(false)
            }}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            布局管理
          </Button>
          <Button
            size="sm"
            className={`h-6 px-2 text-xs gap-1 transition-colors ${
              isDirty
                ? 'bg-[#FF5C00] hover:bg-[#e54f00] text-white'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            disabled={!isDirty}
            onClick={() => {
              setShowSaveDialog(true)
              setLayoutNameInput('')
            }}
          >
            <Save className="w-3.5 h-3.5" />
            保存布局
          </Button>
        </div>
        */}

        {/* component management dialog */}
        <Dialog open={showManagePanel} onOpenChange={setShowManagePanel}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>组件管理</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 max-h-[56vh] overflow-y-auto pr-1">
              {componentGroups.map((group, gi) => (
                <div key={group.title}>
                  <div className="text-xs font-semibold text-muted-foreground mb-2">{group.title}</div>
                  <div className="space-y-2">
                    {gi === 0 && (
                      <div
                        onClick={onToggleAside}
                        className={`border rounded-md p-3 cursor-pointer transition-colors ${
                          showAside ? 'border-[#FF5C00]/60 bg-accent/40' : 'border-border bg-card opacity-50'
                        }`}
                      >
                        <div className="w-full h-9 rounded bg-muted/40 flex items-center justify-center mb-2">
                          <div className="w-2/3 h-2/3 rounded-sm border border-[#FF5C00]/50" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">自选</span>
                          <span className={`text-[10px] ${showAside ? 'text-[#FF5C00]' : 'text-muted-foreground'}`}>
                            {showAside ? '已显示' : '已隐藏'}
                          </span>
                        </div>
                      </div>
                    )}
                    {group.ids.map(id => {
                      const def = MODULE_DEFS[id]
                      if (!def) return null
                      const isHidden = hiddenIds.has(id)
                      return (
                        <div
                          key={id}
                          onClick={() => toggleHidden(id)}
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            !isHidden ? 'border-[#FF5C00]/60 bg-accent/40' : 'border-border bg-card opacity-50'
                          }`}
                        >
                          <div className="w-full h-9 rounded bg-muted/40 flex items-center justify-center mb-2">
                            <div
                              className="rounded-sm border border-[#FF5C00]/50"
                              style={{
                                width: `${(def.span / 12) * 100}%`,
                                height: `${((def.rowSpan ?? 1) / 3) * 100}%`,
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">{def.title}</span>
                            <span className={`text-[10px] ${!isHidden ? 'text-[#FF5C00]' : 'text-muted-foreground'}`}>
                              {!isHidden ? '已显示' : '已隐藏'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* layout management list panel */}
        {showLayoutListPanel && (
          <div className="absolute top-full right-24 mt-1 z-50 w-72 bg-popover border border-border rounded-md shadow-lg p-2">
            <div className="text-xs font-medium text-foreground mb-2 px-1 flex items-center justify-between">
              <span>布局列表</span>
              <span className="text-muted-foreground">共 {displayedLayouts.length} 个</span>
            </div>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {displayedLayouts.map(layout => {
                const isActive = layout.id === activeLayoutId
                const isDefault = layout.isDefault
                return (
                  <div
                    key={layout.id}
                    className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded border cursor-pointer transition-colors ${
                      isActive ? 'border-[#FF5C00] bg-[#FF5C00]/5' : 'border-transparent hover:bg-accent'
                    } ${isDefault ? 'bg-muted/30' : ''}`}
                    onClick={() => handleSwitchLayout(layout)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        {isDefault && (
                          <span className="text-[10px] text-[#FF5C00] border border-[#FF5C00]/40 rounded px-1 py-0">默认</span>
                        )}
                        <div className={`text-xs truncate ${isActive ? 'text-[#FF5C00] font-medium' : 'text-foreground'}`}>
                          {layout.name}
                        </div>
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">{layout.savedAt}</div>
                    </div>
                    {isDefault ? (
                      <span className="text-[10px] text-muted-foreground/60 px-1">不可删除</span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteLayout(layout.id)
                        }}
                        className="text-muted-foreground hover:text-red-500 p-1 rounded hover:bg-red-50 flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* save layout dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>保存布局</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="layoutName">布局名称</Label>
              <Input
                id="layoutName"
                value={layoutNameInput}
                onChange={(e) => setLayoutNameInput(e.target.value)}
                placeholder={activeCustomLayout ? `另存为新布局时填写名称（当前：${activeCustomLayout.name}）` : '例如：日常看盘'}
                className="mt-1"
              />
              <div className="text-xs text-muted-foreground mt-2">
                {activeCustomLayout ? (
                  <>保存将覆盖当前自定义布局「{activeCustomLayout.name}」；如需保留原布局请使用「另存为」。</>
                ) : (
                  <>保存时会新建一份自定义布局，并自动记录保存时间，格式：yyyy/mm/dd-hh:mm:ss</>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>取消</Button>
            <Button
              variant="outline"
              onClick={handleSaveAs}
              disabled={!layoutNameInput.trim()}
            >
              另存为
            </Button>
            <Button
              className="bg-[#FF5C00] hover:bg-[#e54f00]"
              onClick={handleSaveLayout}
              disabled={!activeCustomLayout && !layoutNameInput.trim()}
            >
              {activeCustomLayout ? '覆盖保存' : '确定'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* switch confirmation dialog */}
      <Dialog open={showSwitchConfirm} onOpenChange={setShowSwitchConfirm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>当前布局未保存</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground py-2">
            当前布局已修改但未保存，是否保存？
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDiscardAndSwitch}
            >
              永久丢弃
            </Button>
            <Button
              className="flex-1 bg-[#FF5C00] hover:bg-[#e54f00]"
              onClick={handleSaveBeforeSwitch}
            >
              保存当前布局
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* draggable dashboard - horizontal scroll, 3 rows like a financial terminal */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div
          className="inline-grid gap-px h-full"
          style={{
            gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
            gridAutoFlow: 'column dense',
            gridAutoColumns: '108px',
          }}
        >
          {order.filter(id => !hiddenIds.has(id)).map((id) => {
            const block = blocks[id]
            if (!block) return null
            return (
              <div
                key={id}
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                onDragOver={(e) => handleDragOver(e, id)}
                onDrop={handleDrop}
                onDragEnd={() => setDraggedId(null)}
                style={{ gridColumn: `span ${block.span}`, gridRow: block.rowSpan ? `span ${block.rowSpan}` : undefined }}
                className={`relative ${draggedId === id ? 'opacity-50' : ''}`}
              >
                <div className="border border-border bg-card overflow-hidden h-full flex flex-col">
                  <button
                    onClick={() => toggleHidden(id)}
                    className="absolute top-1 right-1 z-10 w-4 h-4 flex items-center justify-center rounded-sm bg-muted/60 hover:bg-accent text-muted-foreground hover:text-foreground"
                    title={block.title}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                  <div className="p-4 flex-1 min-h-0 overflow-y-auto">
                    {block.content}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}