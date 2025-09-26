import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Heart, TrendingUp } from "lucide-react"
import { IndexDetail } from "../types/market"
import { MarketContent } from "./market-content"
import { useState } from "react"
import { useTheme } from "./theme-provider"

interface IndexInfoPanelProps {
  indexDetail: IndexDetail;
}

export function IndexInfoPanel({ indexDetail }: IndexInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<'market' | 'analysis' | 'news'>('market')
  const { resolvedTheme } = useTheme()
  
  const newsItems = [
    {
      title: "苹果(AAPL.US)句报计划明年上半年推出廉价版iPhone、iPad平板及Mac电脑升级",
      source: "首页 AASTOCKS",
      time: "2小时前",
    },
    {
      title: "苹果(AAPL.US)句报计划明年上半年推出廉价版iPhone、iPad平板及Mac电脑升级",
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: "苹果(AAPL.US)句报计划明年上半年推出廉价版iPhone、iPad平板及Mac电脑升级",
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: "苹果(AAPL.US)句报计划明年上半年推出廉价版iPhone、iPad平板及Mac电脑升级",
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: "苹果(AAPL.US)句报计划明年上半年推出廉价版iPhone、iPad平板及Mac电脑升级",
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: "苹果(AAPL.US)句报计划明年上半年推出廉价版iPhone、iPad平板及Mac电脑升级",
      source: "DoNews",
      time: "45分钟前",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Index Detail Card */}
      <Card>
        <CardHeader className="pb-3">
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
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {indexDetail.value}
            </span>
            <TrendingUp className={`w-4 h-4 ${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-sm ${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {indexDetail.change} {indexDetail.percentage}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">最高</span>
                <span className="">{indexDetail.high}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">今开</span>
                <span className="">{indexDetail.open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">成交额</span>
                <span className="">{indexDetail.volume}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">最低</span>
                <span className="">{indexDetail.low}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">昨收</span>
                <span className="">{indexDetail.close}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">平均价</span>
                <span className="">{indexDetail.avgPrice}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{indexDetail.market}相关</span>
              <div className="flex items-center gap-2">
                <span className="">{indexDetail.value}</span>
                <span className={`${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {indexDetail.change} {indexDetail.percentage}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">期货</span>
              <div className="flex items-center gap-2">
                <span className="">{indexDetail.value}</span>
                <span className={`${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {indexDetail.change} {indexDetail.percentage}
                </span>
                <span className="text-blue-400">高水 5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 text-sm">
            <button 
              className={`pb-1 ${activeTab === 'market' ? 'border-b-2 border-orange-500' : 'text-slate-400 hover:border-b-2 border-transparent hover:border-orange-500'}`}
              onClick={() => setActiveTab('market')}
            >
              行情
            </button>
            <button 
              className={`pb-1 ${activeTab === 'analysis' ? 'border-b-2 border-orange-500' : 'text-slate-400 hover:border-b-2 border-transparent hover:border-orange-500'}`}
              onClick={() => setActiveTab('analysis')}
            >
              分析
            </button>
            <button 
              className={`pb-1 ${activeTab === 'news' ? 'border-b-2 border-orange-500' : 'text-slate-400 hover:border-b-2 border-transparent hover:border-orange-500'}`}
              onClick={() => setActiveTab('news')}
            >
              资讯
            </button>
          </div>
          
          {/* News sub-tabs - only show when news tab is active */}
          {activeTab === 'news' && (
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs px-3 py-1 h-auto">
                新闻
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-400 hover:text-xs px-3 py-1 h-auto bg-transparent"
              >
                公告
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-400 hover:text-xs px-3 py-1 h-auto bg-transparent"
              >
                评级
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className={`${activeTab === 'analysis' ? 'p-0' : ''} max-h-96 overflow-y-auto`}>
          {/* Market Tab Content */}
          {activeTab === 'market' && (
            <MarketContent indexCode={indexDetail.code} />
          )}
          
          {/* Analysis Tab Content */}
          {activeTab === 'analysis' && (
            <div className="w-full h-96">
              <iframe
                src={`http://testdv.tfisec.cn/tradestock/analysis?theme=${resolvedTheme === 'dark' ? 'dark' : 'white'}&stock_code=${indexDetail.code}&set_code=13`}
                className="w-full h-full border-0"
                title="股票分析"
              />
            </div>
          )}
          
          {/* News Tab Content */}
          {activeTab === 'news' && (
            <div className="space-y-4">
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
