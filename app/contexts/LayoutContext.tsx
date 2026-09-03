'use client'

import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'

export type LayoutConfig = {
  id: string
  name: string
  savedAt: string
  order: string[]
  hiddenIds: string[]
  showAside: boolean
  isDefault?: boolean
}

// 模块元数据（用于绘制缩略图矩形），span/rowSpan 与交易页面网格一致
export type ModuleDef = {
  id: string
  title: string
  span: number
  rowSpan?: number
}

export const MODULE_DEFS: Record<string, ModuleDef> = {
  aside: { id: 'aside', title: '自选', span: 3 },
  orderbook: { id: 'orderbook', title: '盘口', span: 3 },
  kline: { id: 'kline', title: 'K线', span: 6 },
  levels: { id: 'levels', title: '档位', span: 3 },
  ticks: { id: 'ticks', title: '成交明细', span: 3 },
  fundflow: { id: 'fundflow', title: '资金流向', span: 3 },
  news: { id: 'news', title: '资讯', span: 3 },
  analysis: { id: 'analysis', title: '分析', span: 3 },
  assets: { id: 'assets', title: '资产', span: 3 },
  cash: { id: 'cash', title: '现金明细', span: 3 },
  withdraw: { id: 'withdraw', title: '现金可提', span: 3 },
  form: { id: 'form', title: '下单面板', span: 3, rowSpan: 2 },
  assetPanel: { id: 'assetPanel', title: '资产面板', span: 6 },
}

export const ALL_MODULE_IDS = Object.keys(MODULE_DEFS)

export const DEFAULT_LAYOUT_ID = 'default_layout'
export const DEFAULT_INITIAL_ORDER = [
  'aside', 'orderbook', 'kline', 'levels',
  'ticks', 'fundflow', 'news', 'analysis',
  'assets', 'cash', 'withdraw', 'form',
  'assetPanel',
]

export const defaultLayout: LayoutConfig = {
  id: DEFAULT_LAYOUT_ID,
  name: '默认布局',
  savedAt: '-',
  order: DEFAULT_INITIAL_ORDER,
  hiddenIds: [],
  showAside: true,
  isDefault: true,
}

type LayoutContextValue = {
  layouts: LayoutConfig[]
  displayedLayouts: LayoutConfig[]
  activeLayoutId: string | null
  setActiveLayoutId: (id: string | null) => void
  addLayout: (layout: LayoutConfig) => void
  updateLayout: (id: string, patch: Partial<LayoutConfig>) => void
  deleteLayout: (id: string) => void
}

const LayoutContext = createContext<LayoutContextValue | null>(null)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layouts, setLayouts] = useState<LayoutConfig[]>([])
  const [activeLayoutId, setActiveLayoutId] = useState<string | null>(null)

  const displayedLayouts = useMemo(
    () => [defaultLayout, ...layouts],
    [layouts]
  )

  const addLayout = (layout: LayoutConfig) => {
    setLayouts(prev => [...prev, layout])
  }

  const updateLayout = (id: string, patch: Partial<LayoutConfig>) => {
    setLayouts(prev => prev.map(l => (l.id === id ? { ...l, ...patch } : l)))
  }

  const deleteLayout = (id: string) => {
    if (id === DEFAULT_LAYOUT_ID) return
    setLayouts(prev => prev.filter(l => l.id !== id))
    setActiveLayoutId(prev => (prev === id ? null : prev))
  }

  return (
    <LayoutContext.Provider
      value={{
        layouts,
        displayedLayouts,
        activeLayoutId,
        setActiveLayoutId,
        addLayout,
        updateLayout,
        deleteLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) throw new Error('useLayout must be used within LayoutProvider')
  return ctx
}