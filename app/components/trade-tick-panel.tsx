'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface TradeTick {
  id: string
  time: string
  price: string
  quantity: string
  isUp: boolean
}

function generateTicks(basePrice: number, count: number): TradeTick[] {
  const ticks: TradeTick[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const tickTime = new Date(now.getTime() - i * 3000)
    const priceOffset = (Math.random() - 0.5) * 0.08
    const price = Math.max(0.01, basePrice + priceOffset)
    const isUp = priceOffset >= 0
    const quantity = Math.floor(Math.random() * 8000) + 100

    ticks.push({
      id: `${tickTime.getTime()}-${i}`,
      time: tickTime.toLocaleTimeString('zh-CN', { hour12: false }),
      price: price.toFixed(3),
      quantity: quantity.toLocaleString(),
      isUp,
    })
  }

  return ticks
}

interface TradeTickPanelProps {
  basePrice: number
  className?: string
}

export function TradeTickPanel({ basePrice, className }: TradeTickPanelProps) {
  const { t } = useLanguage()
  const [ticks, setTicks] = useState<TradeTick[]>(() => generateTicks(basePrice, 30))

  useEffect(() => {
    setTicks(generateTicks(basePrice, 30))
  }, [basePrice])

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((prev) => {
        const now = new Date()
        const priceOffset = (Math.random() - 0.5) * 0.08
        const price = Math.max(0.01, basePrice + priceOffset)
        const newTick: TradeTick = {
          id: `${now.getTime()}`,
          time: now.toLocaleTimeString('zh-CN', { hour12: false }),
          price: price.toFixed(3),
          quantity: (Math.floor(Math.random() * 8000) + 100).toLocaleString(),
          isUp: priceOffset >= 0,
        }
        return [newTick, ...prev.slice(0, 29)]
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [basePrice])

  return (
    <div className={`flex flex-col ${className ?? 'h-full'}`}>
      <div className="px-3 py-3 border-b border-border flex-shrink-0">
        <h3 className="text-sm font-semibold text-foreground">成交明细</h3>
      </div>
      <div className="grid grid-cols-3 gap-1 px-3 py-2 text-[10px] text-muted-foreground border-b border-border flex-shrink-0">
        <span>{t('transactions.execution_time')}</span>
        <span className="text-right">{t('transactions.execution_price')}</span>
        <span className="text-right">{t('transactions.execution_quantity')}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {ticks.map((tick) => (
          <div
            key={tick.id}
            className="grid grid-cols-3 gap-1 px-3 py-1 text-[11px] font-mono hover:bg-muted/30"
          >
            <span className="text-muted-foreground">{tick.time}</span>
            <span className={`text-right ${tick.isUp ? 'text-green-500' : 'text-red-500'}`}>
              {tick.price}
            </span>
            <span className="text-right text-foreground">{tick.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
