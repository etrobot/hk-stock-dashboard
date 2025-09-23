import { useState } from 'react'
import { Menu, ArrowDown } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  pe: string
}

interface TradingPanelProps {
  stockData: StockData
}

export function TradingPanel({ stockData }: TradingPanelProps) {
  const [orderType, setOrderType] = useState('limit')
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState(stockData.price.toString())
  const [positions] = useState([
    { symbol: 'AAPL', quantity: 100, avgPrice: 210.50, currentPrice: 212.41, pnl: 191 },
    { symbol: 'MSFT', quantity: 50, avgPrice: 415.20, currentPrice: 418.75, pnl: 177.5 },
    { symbol: 'GOOGL', quantity: 25, avgPrice: 2750.30, currentPrice: 2735.80, pnl: -362.5 }
  ])

  const handleSubmitOrder = () => {
    console.log('提交订单:', {
      symbol: stockData.symbol,
      side,
      orderType,
      quantity: parseFloat(quantity),
      price: parseFloat(price)
    })
    // 这里会调用实际的交易API
  }

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0
    const prc = parseFloat(price) || 0
    return (qty * prc).toFixed(2)
  }

  const isPositive = stockData.change >= 0;
  const changeColor = isPositive ? 'text-[#16BA71]' : 'text-[#F44345]';

  return (
    <div className="w-[274px] h-full border-l border-gray-800 overflow-y-auto">
      {/* 主要股票信息卡片 */}
      <Card className="border-gray-800 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* 股票基本信息 */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-medium text-white">
                    {stockData.symbol}
                  </h1>
                  <span className="text-sm">{stockData.name}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-2.5 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] font-bold">$</span>
                    </div>
                    <Badge variant="outline" className="border-[#874EFE] bg-[#874EFE]/20 text-[#874EFE] text-[7px] px-1">
                      L2
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-[#16BA71]">
                  {stockData.price.toFixed(3)}
                </span>
                <div className={`flex items-center space-x-2 ${changeColor}`}>
                  <span className="text-lg font-semibold">
                    {isPositive ? '+' : ''}{stockData.change.toFixed(3)}
                  </span>
                  <span className="text-lg font-semibold">
                    {isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%
                  </span>
                  <div className="w-[10px] h-[14px] flex items-center justify-center">
                    <ArrowDown className={`w-[10px] h-[14px] ${changeColor} ${isPositive ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
                <span>07/11</span>
                <span>16:00:00</span>
                <span>(美东)</span>
              </div>
            </div>

            {/* 收盘价标签 */}
            <div className="mb-4">
              <span className="text-gray-400 text-sm">收盘价</span>
            </div>
          </div>

          {/* 股票统计信息 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <div className="text-sm text-gray-400 text-right">最高</div>
              <div className="text-sm font-semibold text-[#16BA71] text-right">{stockData.high.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">最低</div>
              <div className="text-sm font-semibold text-[#F44345] text-right">{stockData.low.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">今开</div>
              <div className="text-sm font-semibold text-[#F44345] text-right">{stockData.open.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">昨收</div>
              <div className="text-sm font-semibold text-gray-300 text-right">{stockData.previousClose.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">成交量</div>
              <div className="text-sm font-semibold text-right">{stockData.volume}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 text-right">成交额</div>
              <div className="text-sm font-semibold text-right">{stockData.turnover}</div>
            </div>
          </div>
        </div>
      </Card>
      <Tabs defaultValue="trade" className="h-[calc(100%-300px)]">
        {/* 标签头部 */}
        <div className="flex items-center justify-center py-2 border-b border-gray-800">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium border-b-2 border-[#FF5C00] pb-1">行情</span>
            </div>
            <span className="text-gray-400 text-sm cursor-pointer hover:text-white">分析</span>
            <span className="text-gray-400 text-sm cursor-pointer hover:text-white">资讯</span>
          </div>
        </div>

        <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
          <TabsTrigger value="trade" className="data-[state=active]:bg-[#FF5C00]">
            买盘
          </TabsTrigger>
          <TabsTrigger value="positions" className="data-[state=active]:bg-[#FF5C00]">
            卖盘
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trade" className="p-4 space-y-4">
          {/* 买卖盘比例 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">买盘</span>
              <span className="text-sm font-medium">卖盘</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#16BA71]">10.00%</span>
              <span className="text-[#F44345]">90.00%</span>
            </div>
            <div className="flex">
              <div className="bg-[#16BA71]/20 h-4 flex-1 mr-1 rounded-l"></div>
              <div className="bg-[#F44345]/20 h-4 flex-[9] rounded-r"></div>
            </div>
            <div className="w-full bg-[#16BA71] h-1 rounded-full" style={{width: '10%'}}></div>
            <div className="w-full bg-[#F44345] h-1 rounded-full" style={{width: '90%'}}></div>
          </div>

          {/* 订单簿 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">深度摆盘</span>
              <div className="text-gray-400">
                <Menu size={10} />
              </div>
            </div>

            {/* 深度摆盘数据 */}
            <div className="space-y-1">
              {[
                { price: '211.320', quantity: '25', side: 'buy' },
                { price: '211.310', quantity: '25', side: 'buy' },
                { price: '211.310', quantity: '17', side: 'buy' },
                { price: '211.310', quantity: '10', side: 'buy' },
                { price: '211.310', quantity: '10', side: 'buy' },
                { price: '211.390', quantity: '225', side: 'sell' },
                { price: '211.400', quantity: '225', side: 'sell' },
                { price: '211.430', quantity: '47', side: 'sell' },
                { price: '211.430', quantity: '17', side: 'sell' },
                { price: '211.430', quantity: '17', side: 'sell' },
              ].map((order, index) => (
                <div key={index} className={`grid grid-cols-3 text-xs p-1 ${
                  order.side === 'buy' ? 'bg-[#16BA71]/10' : 'bg-[#F44345]/10'
                }`}>
                  <span className="text-white">BLUE</span>
                  <span className="text-[#F44345] text-right">{order.price}</span>
                  <span className="text-right">{order.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 60档盘口信息 */}
          <div className="text-sm font-medium">
            60档盘口信息
          </div>
        </TabsContent>

        <TabsContent value="positions" className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">我的持仓</h3>

            <div className="space-y-3">
              {positions.map((position, index) => {
                const pnlPercent = ((position.currentPrice - position.avgPrice) / position.avgPrice * 100).toFixed(2)
                const isPositive = position.pnl >= 0

                return (
                  <Card key={index} className="bg-[#11131B] border-gray-600 p-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">{position.symbol}</span>
                        <span className={`text-sm font-medium ${isPositive ? 'text-[#16BA71]' : 'text-[#F44345]'}`}>
                          {isPositive ? '+' : ''}${position.pnl.toFixed(2)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">持仓:</div>
                          <div className="text-white">{position.quantity}股</div>
                        </div>
                        <div>
                          <div className="text-gray-400">成本:</div>
                          <div className="text-white">${position.avgPrice}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">现价:</div>
                          <div className="text-white">${position.currentPrice}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">收益率:</div>
                          <div className={`${isPositive ? 'text-[#16BA71]' : 'text-[#F44345]'}`}>
                            {isPositive ? '+' : ''}{pnlPercent}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* 持仓汇总 */}
            <Card className="bg-[#11131B] border-gray-600 p-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between font-semibold">
                  <span>总持仓市值:</span>
                  <span>$74,291.50</span>
                </div>
                <div className="flex justify-between text-[#16BA71]">
                  <span>总盈亏:</span>
                  <span>+$6.00 (+0.01%)</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}