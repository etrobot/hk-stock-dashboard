'use client'

import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface OrderBookEntry {
  price: number
  volume: number
  total: number
}

interface OrderBookData {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}

export function OrderBook() {
  const [orderBook, setOrderBook] = useState<OrderBookData>({
    bids: [],
    asks: []
  })

  // 生成模拟订单簿数据
  const generateOrderBook = (): OrderBookData => {
    const basePrice = 212.41
    const bids: OrderBookEntry[] = []
    const asks: OrderBookEntry[] = []
    
    // 生成买单（价格从高到低）
    for (let i = 0; i < 10; i++) {
      const price = basePrice - (i + 1) * 0.01
      const volume = Math.floor(Math.random() * 10000) + 1000
      const total = i === 0 ? volume : bids[i-1].total + volume
      bids.push({ price, volume, total })
    }
    
    // 生成卖单（价格从低到高）
    for (let i = 0; i < 10; i++) {
      const price = basePrice + (i + 1) * 0.01
      const volume = Math.floor(Math.random() * 10000) + 1000
      const total = i === 0 ? volume : asks[i-1].total + volume
      asks.push({ price, volume, total })
    }
    
    return { bids, asks }
  }

  useEffect(() => {
    // 初始化订单簿
    setOrderBook(generateOrderBook())
    
    // 定期更新订单簿
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook())
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <Card className="bg-card border-border">
      <Tabs defaultValue="orderbook" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="orderbook" className="data-[state=active]:bg-[#FF5C00]">
            订单簿
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-[#FF5C00]">
            最新成交
          </TabsTrigger>
          <TabsTrigger value="depth" className="data-[state=active]:bg-[#FF5C00]">
            市场深度
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook" className="p-4">
          <div className="space-y-4">
            {/* 表头 */}
            <div className="grid grid-cols-3 text-sm text-muted-foreground border-b border-border pb-2">
              <div>价格(USD)</div>
              <div className="text-right">数量</div>
              <div className="text-right">累计</div>
            </div>

            {/* 卖单 */}
            <div className="space-y-1">
              {orderBook.asks.slice().reverse().map((ask, index) => (
                <div key={`ask-${index}`} className="grid grid-cols-3 text-sm hover:bg-muted/20 py-1">
                  <div className="text-red-500 font-mono">
                    {ask.price.toFixed(2)}
                  </div>
                  <div className="text-right font-mono text-foreground">
                    {formatNumber(ask.volume)}
                  </div>
                  <div className="text-right text-muted-foreground font-mono">
                    {formatNumber(ask.total)}
                  </div>
                </div>
              ))}
            </div>

            {/* 最新价格分隔线 */}
            <div className="flex items-center justify-center py-2 border-y border-border">
              <span className="text-lg font-bold text-green-500">
                $212.41 ↗
              </span>
            </div>

            {/* 买单 */}
            <div className="space-y-1">
              {orderBook.bids.map((bid, index) => (
                <div key={`bid-${index}`} className="grid grid-cols-3 text-sm hover:bg-muted/20 py-1">
                  <div className="text-green-500 font-mono">
                    {bid.price.toFixed(2)}
                  </div>
                  <div className="text-right font-mono text-foreground">
                    {formatNumber(bid.volume)}
                  </div>
                  <div className="text-right text-muted-foreground font-mono">
                    {formatNumber(bid.total)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-3 text-sm text-muted-foreground border-b border-border pb-2">
              <div>时间</div>
              <div className="text-right">价格(USD)</div>
              <div className="text-right">数量</div>
            </div>
            
            {/* 最新成交记录 */}
            {Array.from({ length: 15 }, (_, i) => {
              const time = new Date()
              time.setSeconds(time.getSeconds() - i * 3)
              const price = 212.41 + (Math.random() - 0.5) * 0.1
              const volume = Math.floor(Math.random() * 1000) + 100
              const isPositive = Math.random() > 0.5
              
              return (
                <div key={i} className="grid grid-cols-3 text-sm hover:bg-muted/20 py-1">
                  <div className="text-muted-foreground font-mono">
                    {time.toLocaleTimeString()}
                  </div>
                  <div className={`text-right font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {price.toFixed(2)}
                  </div>
                  <div className="text-right font-mono text-foreground">
                    {formatNumber(volume)}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="depth" className="p-4">
          <div className="text-center text-muted-foreground py-8">
            市场深度图表
            <br />
            <span className="text-sm">开发中...</span>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}