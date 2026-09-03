'use client'

import { useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'
import { useLayout, MODULE_DEFS, type LayoutConfig } from '../contexts/LayoutContext'
import TradePage from './TradePage'

type FilterTab = 'all' | 'system' | 'custom'

function LayoutThumbnail({ layout, onClick }: { layout: LayoutConfig; onClick?: () => void }) {
  const visibleOrder = layout.order.filter(id => !layout.hiddenIds.includes(id))

  return (
    <div
      onClick={onClick}
      className="border border-border rounded-lg p-4 bg-card hover:border-[#FF5C00] transition-colors w-full sm:w-[280px] cursor-pointer"
    >
      {/* 矩形缩略图：按交易页面 3 行网格等比缩小，用矩形表示各模块 */}
      <div className="w-full h-28 overflow-hidden rounded-md bg-background p-1.5">
        <div
          className="grid gap-px h-full"
          style={{
            gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
            gridAutoFlow: 'column dense',
            gridAutoColumns: '8px',
          }}
        >
          {visibleOrder.map(id => {
            const def = MODULE_DEFS[id]
            if (!def) return null
            return (
              <div
                key={id}
                title={def.title}
                className="bg-muted rounded-[2px] border border-border/60"
                style={{
                  gridColumn: `span ${def.span}`,
                  gridRow: def.rowSpan ? `span ${def.rowSpan}` : undefined,
                }}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-foreground truncate">{layout.name}</span>
        </div>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 ${
            layout.isDefault
              ? 'text-[#FF5C00] border-[#FF5C00]/40'
              : 'text-muted-foreground border-border'
          }`}
        >
          {layout.isDefault ? '系统默认' : '用户自定义'}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mt-1 truncate">
        {layout.isDefault ? '系统内置布局' : `保存于 ${layout.savedAt}`}
      </div>
    </div>
  )
}

export default function LayoutThumbnailPage() {
  const { displayedLayouts } = useLayout()
  const [filter, setFilter] = useState<FilterTab>('all')
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null)

  // 点击缩略图后在自定义页面内加载该布局（不跳转交易页）
  if (selectedLayoutId) {
    return (
      <TradePage
        key={selectedLayoutId}
        initialLayoutId={selectedLayoutId}
        onBack={() => setSelectedLayoutId(null)}
        showLayoutControls
        hideStaticAside
      />
    )
  }

  const filtered = displayedLayouts.filter(layout => {
    if (filter === 'all') return true
    if (filter === 'system') return !!layout.isDefault
    return !layout.isDefault
  })

  return (
    <div className="h-full bg-background text-foreground flex flex-col">
      {/* 顶部标题 + 筛选 tab */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <LayoutGrid className="w-4 h-4 text-[#FF5C00]" />
          <h2 className="text-base font-semibold">自定义布局</h2>
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)} className="items-center">
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="system">系统默认</TabsTrigger>
            <TabsTrigger value="custom">用户自定义</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 缩略图网格 */}
      <div className="flex-1 overflow-y-auto p-4">
        {filtered.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            暂无布局
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {filtered.map(layout => (
              <LayoutThumbnail
                key={layout.id}
                layout={layout}
                onClick={() => setSelectedLayoutId(layout.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}