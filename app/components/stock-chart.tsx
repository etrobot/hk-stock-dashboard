'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from './ui/card'
import { init, dispose } from 'klinecharts'

interface StockChartProps {
  symbol: string
}

// 生成模拟K线数据 - KlineChart格式
const generateKLineData = (days: number) => {
  const data = []
  const basePrice = 211.14
  let currentPrice = basePrice
  
  for (let i = 0; i < days; i++) {
    const timestamp = Date.now() - (days - i) * 24 * 60 * 60 * 1000
    
    const open = currentPrice
    const change = (Math.random() - 0.5) * 4
    const high = open + Math.abs(change) + Math.random() * 2
    const low = open - Math.abs(change) - Math.random() * 2
    const close = open + change
    const volume = Math.floor(Math.random() * 100000) + 10000
    
    data.push({
      timestamp,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    })
    
    currentPrice = close
  }
  
  return data
}

export function StockChart({ symbol }: StockChartProps) {
  const [timeframe, setTimeframe] = useState('日线')

  const timeframes = ['1分', '5分', '15分', '30分', '60分', '日线', '周线', '月线']

  useEffect(() => {
    const chart = init('kline-chart')
    
    if (chart) {
      // 根据时间框架生成不同的数据
      const dataPoints = {
        '1分': 240,
        '5分': 288,
        '15分': 96,
        '30分': 48,
        '60分': 24,
        '日线': 60,
        '周线': 52,
        '月线': 24
      }
      
      const chartData = generateKLineData(dataPoints[timeframe as keyof typeof dataPoints] || 60)
      
      // 直接添加数据到图表
      chart.applyNewData(chartData)
    }

    return () => {
      dispose('kline-chart')
    }
  }, [symbol, timeframe])

  return (
    <Card className="bg-[#1A1D29] border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{symbol} K线图</h2>
      </div>

      <div className="h-[400px]">
        <div id="kline-chart" style={{ width: '100%', height: '400px' }} />
      </div>

      {/* 图表工具栏 */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <div className="flex space-x-4 text-sm text-gray-400">
          <span>成交量: 2.34亿</span>
          <span>成交额: 495.8亿</span>
          <span>换手率: 1.45%</span>
        </div>
        <div className="flex space-x-2">
          <button className="text-sm text-gray-400 hover:text-white">
            技术指标
          </button>
          <button className="text-sm text-gray-400 hover:text-white">
            画线工具
          </button>
          <button className="text-sm text-gray-400 hover:text-white">
            全屏
          </button>
        </div>
      </div>
    </Card>
  )
}