'use client'

import React, { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import ReactECharts from 'echarts-for-react'

interface StockChartProps {
  symbol: string
}

// 生成模拟K线数据
const generateKLineData = (days: number) => {
  const data = []
  const basePrice = 211.14
  let currentPrice = basePrice
  
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - days + i)
    
    const open = currentPrice
    const change = (Math.random() - 0.5) * 4
    const high = open + Math.abs(change) + Math.random() * 2
    const low = open - Math.abs(change) - Math.random() * 2
    const close = open + change
    
    data.push([
      date.toISOString().split('T')[0],
      open.toFixed(2),
      close.toFixed(2),
      low.toFixed(2),
      high.toFixed(2)
    ])
    
    currentPrice = close
  }
  
  return data
}

export function StockChart({ symbol }: StockChartProps) {
  const [timeframe, setTimeframe] = useState('日线')
  const [chartData, setChartData] = useState(generateKLineData(60))

  const getChartOption = () => ({
    backgroundColor: 'transparent',
    grid: {
      left: '60',
      right: '60',
      top: '60',
      bottom: '60',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item[0]),
      axisLine: {
        lineStyle: { color: '#4B5563' }
      },
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLine: {
        lineStyle: { color: '#4B5563' }
      },
      splitLine: {
        lineStyle: { color: '#374151', type: 'dashed' }
      },
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        formatter: '${value}'
      }
    },
    series: [
      {
        type: 'candlestick',
        data: chartData.map(item => [
          parseFloat(item[1]), // open
          parseFloat(item[2]), // close
          parseFloat(item[3]), // low
          parseFloat(item[4])  // high
        ]),
        itemStyle: {
          color: '#16BA71',      // 阳线颜色
          color0: '#F44345',     // 阴线颜色
          borderColor: '#16BA71', // 阳线边框
          borderColor0: '#F44345' // 阴线边框
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: '#1F2937',
      borderColor: '#4B5563',
      textStyle: {
        color: '#F9FAFB'
      },
      formatter: function(params: any) {
        const data = params[0]
        const ohlc = data.data
        return `
          日期: ${data.name}<br/>
          开盘: $${ohlc[0].toFixed(2)}<br/>
          收盘: $${ohlc[1].toFixed(2)}<br/>
          最低: $${ohlc[2].toFixed(2)}<br/>
          最高: $${ohlc[3].toFixed(2)}
        `
      }
    }
  })

  const timeframes = ['1分', '5分', '15分', '30分', '60分', '日线', '周线', '月线']

  useEffect(() => {
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
    
    setChartData(generateKLineData(dataPoints[timeframe as keyof typeof dataPoints] || 60))
  }, [timeframe])

  return (
    <Card className="bg-[#1A1D29] border-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{symbol} K线图</h2>
        
        {/* 时间框架选择器 */}
        <div className="flex space-x-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeframe === tf
                  ? 'bg-[#FF5C00] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px]">
        <ReactECharts
          option={getChartOption()}
          style={{ height: '100%', width: '100%' }}
          theme="dark"
        />
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