'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

type IntradayPoint = {
  time: string
  price: number
  avgPrice: number
  volume: number
}

function getTradingMinutes(): number[] {
  const minutes: number[] = []
  for (let m = 9 * 60 + 30; m < 12 * 60; m++) minutes.push(m)
  for (let m = 13 * 60; m <= 16 * 60; m++) minutes.push(m)
  return minutes
}

function generateIntradayData(stockCode: string, date: Date, basePrice: number): IntradayPoint[] {
  const seed =
    stockCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) +
    date.getFullYear() * 10000 +
    (date.getMonth() + 1) * 100 +
    date.getDate()

  const random = (index: number) => {
    const x = Math.sin(seed + index) * 10000
    return x - Math.floor(x)
  }

  const tradingMinutes = getTradingMinutes()
  const prevClose = basePrice * (0.985 + random(999) * 0.03)
  let price = prevClose * (1 + (random(0) - 0.5) * 0.01)
  let totalVolume = 0
  let totalAmount = 0

  return tradingMinutes.map((minute, i) => {
    const change = (random(i + 1) - 0.5) * basePrice * 0.003
    price = Math.max(0.01, price + change)
    const volume = Math.floor(random(i + 100) * 80000) + 2000
    totalVolume += volume
    totalAmount += price * volume

    const h = Math.floor(minute / 60)
    const min = minute % 60

    return {
      time: `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
      price,
      avgPrice: totalAmount / totalVolume,
      volume,
    }
  })
}

function formatDateLabel(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function IntradayChart({ data, prevClose }: { data: IntradayPoint[]; prevClose: number }) {
  const width = 640
  const height = 280
  const paddingLeft = 48
  const paddingRight = 12
  const paddingTop = 16
  const paddingBottom = 28
  const volumeHeight = 56

  const chartWidth = width - paddingLeft - paddingRight
  const priceChartHeight = height - paddingTop - paddingBottom - volumeHeight

  const prices = data.map((d) => d.price)
  const minPrice = Math.min(prevClose, ...prices) * 0.998
  const maxPrice = Math.max(prevClose, ...prices) * 1.002
  const priceRange = maxPrice - minPrice || 1

  const maxVolume = Math.max(...data.map((d) => d.volume), 1)
  const xStep = chartWidth / Math.max(data.length - 1, 1)

  const getPriceY = (price: number) =>
    paddingTop + ((maxPrice - price) / priceRange) * priceChartHeight

  const getVolumeY = (volume: number) =>
    paddingTop + priceChartHeight + volumeHeight - (volume / maxVolume) * (volumeHeight - 8)

  const pricePath = data
    .map((d, i) => `${paddingLeft + i * xStep},${getPriceY(d.price)}`)
    .join(' ')

  const avgPath = data
    .map((d, i) => `${paddingLeft + i * xStep},${getPriceY(d.avgPrice)}`)
    .join(' ')

  const prevCloseY = getPriceY(prevClose)

  const yLabels = Array.from({ length: 5 }, (_, i) => {
    const price = maxPrice - (i * priceRange) / 4
    return { price: price.toFixed(2), y: getPriceY(price) }
  })

  const xLabels = [
    { label: '09:30', x: paddingLeft },
    { label: '11:00', x: paddingLeft + chartWidth * 0.35 },
    { label: '13:00', x: paddingLeft + chartWidth * 0.55 },
    { label: '16:00', x: paddingLeft + chartWidth },
  ]

  return (
    <div className="w-full rounded border border-border bg-background">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <rect
          x={paddingLeft}
          y={paddingTop}
          width={chartWidth}
          height={priceChartHeight}
          fill="currentColor"
          fillOpacity="0.02"
        />

        {yLabels.map((label, i) => (
          <g key={i}>
            <line
              x1={paddingLeft}
              y1={label.y}
              x2={paddingLeft + chartWidth}
              y2={label.y}
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeDasharray="3,3"
            />
            <text
              x={paddingLeft - 6}
              y={label.y + 3}
              textAnchor="end"
              fontSize="9"
              fill="currentColor"
              fillOpacity="0.55"
            >
              {label.price}
            </text>
          </g>
        ))}

        <line
          x1={paddingLeft}
          y1={prevCloseY}
          x2={paddingLeft + chartWidth}
          y2={prevCloseY}
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="4,3"
        />

        {data.map((d, i) => {
          const x = paddingLeft + i * xStep
          const barHeight = paddingTop + priceChartHeight + volumeHeight - getVolumeY(d.volume)
          return (
            <rect
              key={d.time}
              x={x - Math.max(0.5, xStep / 3)}
              y={getVolumeY(d.volume)}
              width={Math.max(1, xStep / 1.5)}
              height={barHeight}
              fill={d.price >= prevClose ? '#ef4444' : '#22c55e'}
              fillOpacity="0.55"
            />
          )
        })}

        <polyline points={avgPath} fill="none" stroke="#f59e0b" strokeWidth="1.2" />
        <polyline points={pricePath} fill="none" stroke="#3b82f6" strokeWidth="1.5" />

        {xLabels.map((label) => (
          <text
            key={label.label}
            x={label.x}
            y={height - 8}
            textAnchor="middle"
            fontSize="9"
            fill="currentColor"
            fillOpacity="0.55"
          >
            {label.label}
          </text>
        ))}
      </svg>

      <div className="flex items-center justify-center gap-4 pb-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 bg-blue-500" />
          现价
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 bg-amber-500" />
          均价
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-0.5 bg-slate-400 border-dashed" />
          昨收 {prevClose.toFixed(3)}
        </span>
      </div>
    </div>
  )
}

interface IntradayChartDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stockCode: string
  stockName: string
  basePrice: number
}

export function IntradayChartDialog({
  open,
  onOpenChange,
  stockCode,
  stockName,
  basePrice,
}: IntradayChartDialogProps) {
  const [dateOffset, setDateOffset] = useState(0)

  useEffect(() => {
    if (!open) {
      setDateOffset(0)
    }
  }, [open])

  const selectedDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + dateOffset)
    return date
  }, [dateOffset])

  const intradayData = useMemo(
    () => generateIntradayData(stockCode, selectedDate, basePrice),
    [stockCode, selectedDate, basePrice]
  )

  const prevClose = useMemo(() => {
    const seed =
      stockCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) +
      selectedDate.getFullYear() * 10000 +
      (selectedDate.getMonth() + 1) * 100 +
      selectedDate.getDate()
    const random = Math.sin(seed + 999) * 10000
    const r = random - Math.floor(random)
    return basePrice * (0.985 + r * 0.03)
  }, [stockCode, selectedDate, basePrice])

  const lastPoint = intradayData[intradayData.length - 1]
  const change = lastPoint ? lastPoint.price - prevClose : 0
  const changePct = prevClose ? (change / prevClose) * 100 : 0
  const isUp = change >= 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>
            {stockName} ({stockCode}) 分时图
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => setDateOffset((d) => d - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            上一日
          </Button>
          <span className="text-sm font-medium">{formatDateLabel(selectedDate)}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateOffset((d) => d + 1)}
            disabled={dateOffset >= 0}
          >
            下一日
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-baseline gap-3 text-sm">
          <span className="font-mono text-lg font-semibold">{lastPoint?.price.toFixed(3) ?? '--'}</span>
          <span className={`font-mono ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? '+' : ''}
            {change.toFixed(3)} ({isUp ? '+' : ''}
            {changePct.toFixed(2)}%)
          </span>
        </div>

        <IntradayChart data={intradayData} prevClose={prevClose} />
      </DialogContent>
    </Dialog>
  )
}
