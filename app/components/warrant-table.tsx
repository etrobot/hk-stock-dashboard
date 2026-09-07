'use client'

import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockWarrantData, warrantUnderlying, type Warrant, type WarrantType } from '../data/mockWarrantData'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Checkbox } from './ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const TYPES: WarrantType[] = ['认购', '认沽', '牛证', '熊证']

const ISSUERS = ['全部发行人', '摩通', '法兴', '法巴', '汇丰', '瑞银', '中银', '高盛', '麦格理', '花旗', '海通']

const EXPIRIES = [
  { value: 'all', label: '全部到期日' },
  { value: '3', label: '3个月以内' },
  { value: '6', label: '3-6个月' },
  { value: '12', label: '6-12个月' },
  { value: '24', label: '12个月以上' },
]

// Frozen columns (序号/代码/名称) + scrollable columns
const FROZEN_COLUMNS = ['序号', '代码', '名称']
const SCROLL_COLUMNS: { key: keyof Warrant; label: string }[] = [
  { key: 'latestPrice', label: '最新价' },
  { key: 'change', label: '涨跌额' },
  { key: 'changePercent', label: '涨跌幅' },
  { key: 'volume', label: '成交量' },
  { key: 'turnover', label: '成交额' },
  { key: 'effectiveLeverage', label: '有效杠杆' },
  { key: 'leverageRatio', label: '杠杆比率(倍)' },
  { key: 'callPrice', label: '收回价' },
  { key: 'strikePrice', label: '行使价' },
  { key: 'upperPrice', label: '上限价' },
  { key: 'lowerPrice', label: '下限价' },
  { key: 'lastTradingDay', label: '最后交易日' },
  { key: 'streetRatio', label: '街货比' },
  { key: 'streetVolume', label: '街货量' },
  { key: 'status', label: '状态' },
  { key: 'premium', label: '溢价' },
  { key: 'sensitivity', label: '敏感度' },
  { key: 'priceDistanceCall', label: '正股价距收回价' },
  { key: 'breakeven', label: '打和点' },
  { key: 'amplitude', label: '振幅' },
  { key: 'delta', label: '对冲值' },
  { key: 'expiryDate', label: '到期日' },
  { key: 'listingDate', label: '上市日期' },
  { key: 'bidPrice', label: '买入价' },
  { key: 'askPrice', label: '卖出价' },
  { key: 'bidVolume', label: '买量' },
  { key: 'askVolumeType', label: '卖量类型' },
  { key: 'impliedVolatility', label: '引申波幅' },
  { key: 'inOut', label: '价内/价外' },
  { key: 'conversionPrice', label: '换股价' },
  { key: 'conversionRatio', label: '换股比率' },
  { key: 'lotSize', label: '每手' },
  { key: 'issuer', label: '发行人' },
  { key: 'issuanceVolume', label: '发行量' },
]

function formatValue(key: keyof Warrant, v: Warrant[keyof Warrant] | undefined): string {
  if (v === undefined || v === null) return '—'
  if (typeof v === 'number') {
    // 涨跌幅/街货比/溢价/敏感度/振幅/对冲值/引申波幅/正股价距收回价 → 显示百分号
    if (['changePercent', 'streetRatio', 'premium', 'sensitivity', 'amplitude', 'delta', 'impliedVolatility', 'priceDistanceCall'].includes(key as string)) {
      return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`
    }
    if (key === 'effectiveLeverage' || key === 'leverageRatio') return v.toFixed(1)
    return v.toString()
  }
  return String(v)
}

export function WarrantTable({ underlying }: { underlying?: string }) {
  const navigate = useNavigate()
  const params = useParams()
  const activeWarrantCode = (params as { code?: string })?.code
  const [checkedTypes, setCheckedTypes] = useState<Record<WarrantType, boolean>>({
    认购: true,
    认沽: true,
    牛证: true,
    熊证: true,
  })
  const [issuer, setIssuer] = useState('全部发行人')
  const [expiry, setExpiry] = useState('all')

  const filtered = useMemo(() => {
    return mockWarrantData.filter((w) => {
      if (!checkedTypes[w.type]) return false
      if (issuer !== '全部发行人' && w.issuer !== issuer) return false
      if (expiry === '3' && w.expiryMonths > 3) return false
      if (expiry === '6' && (w.expiryMonths <= 3 || w.expiryMonths > 6)) return false
      if (expiry === '12' && (w.expiryMonths <= 6 || w.expiryMonths > 12)) return false
      if (expiry === '24' && w.expiryMonths <= 12) return false
      // 在轮证详情页只显示同锚定标的的轮证
      if (underlying && warrantUnderlying[w.code] !== underlying) return false
      return true
    })
  }, [checkedTypes, issuer, expiry, underlying])

  const toggleType = (type: WarrantType, checked: boolean) => {
    setCheckedTypes((prev) => ({ ...prev, [type]: checked }))
  }

  const typeLabelColor = (w: Warrant) => {
    switch (w.type) {
      case '认购':
        return 'text-[#16BA71]'
      case '认沽':
        return 'text-[#F44345]'
      case '牛证':
        return 'text-[#16BA71]'
      case '熊证':
        return 'text-[#F44345]'
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* 筛选区 */}
      <div className="flex items-center gap-4 text-xs text-foreground flex-wrap">
        <div className="flex items-center gap-3">
          {TYPES.map((type) => (
            <label key={type} className="flex items-center gap-1 cursor-pointer">
              <Checkbox
                checked={checkedTypes[type]}
                onCheckedChange={(c) => toggleType(type, !!c)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        <Select value={issuer} onValueChange={setIssuer}>
          <SelectTrigger className="bg-input h-7 text-xs px-2">
            <SelectValue placeholder="发行人" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {ISSUERS.map((i) => (
              <SelectItem key={i} value={i} className="text-xs">
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={expiry} onValueChange={setExpiry}>
          <SelectTrigger className="bg-input h-7 text-xs px-2">
            <SelectValue placeholder="到期日" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {EXPIRIES.map((e) => (
              <SelectItem key={e.value} value={e.value} className="text-xs">
                {e.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 表格 */}
      <div className="border border-border rounded-md overflow-hidden">
        <div className="show-scrollbar w-full">
          <Table className="text-xs">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {FROZEN_COLUMNS.map((c, idx) => (
                  <TableHead
                    key={c}
                    className={`bg-muted/60 text-foreground font-medium sticky z-10 ${idx === 2 ? '' : 'bg-muted/60'}`}
                    style={{
                      minWidth: idx < 2 ? 56 : 64,
                      left: idx === 0 ? 0 : idx === 1 ? 56 : 112,
                      boxShadow: idx === 2 ? 'inset -1px 0 0 var(--border)' : undefined,
                      position: 'sticky',
                    }}
                  >
                    {c}
                  </TableHead>
                ))}
                {SCROLL_COLUMNS.map((c) => (
                  <TableHead key={c.key} className="bg-muted/60 text-foreground font-medium text-center min-w-[72px]">
                    {c.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((w, i) => {
                const isActive = w.code === activeWarrantCode
                return (
                <TableRow
                  key={w.code}
                  className={`hover:bg-muted/30 cursor-default ${isActive ? 'bg-muted/40' : ''}`}
                  onDoubleClick={() => navigate(`/warrant/${w.code}`)}
                >
                  {[
                    <TableCell key="seq" className="sticky left-0 z-[5] bg-background min-w-[56px] text-center text-muted-foreground">
                      {i + 1}
                    </TableCell>,
                    <TableCell key="code" className="sticky z-[5] bg-background min-w-[56px] text-center font-mono" style={{ left: 56 }}>
                      {w.code}
                    </TableCell>,
                    <TableCell key="name" className={`sticky z-[5] bg-background min-w-[120px] ${typeLabelColor(w)}`} style={{ left: 112, boxShadow: 'inset -1px 0 0 var(--border)' }}>
                      {w.name}
                    </TableCell>,
                  ]}
                  {SCROLL_COLUMNS.map((c) => (
                    <TableCell key={c.key} className="text-center min-w-[72px]">
                      {formatValue(c.key, w[c.key])}
                    </TableCell>
                  ))}
                </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={FROZEN_COLUMNS.length + SCROLL_COLUMNS.length} className="text-center text-muted-foreground py-8">
                    暂无符合条件的轮证
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}