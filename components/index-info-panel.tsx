import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp } from "lucide-react"

export function IndexInfoPanel() {
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
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">800000</span>
              <span className="text-white font-medium">恒生指数</span>
            </div>
            <Heart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="bg-red-600 text-white px-1 rounded">沪</span>
            <span>交易中 07/11 10:17:52</span>
            <span className="bg-blue-600 text-white px-1 rounded text-xs">L2</span>
            <span className="bg-orange-600 text-white px-1 rounded text-xs">文</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-400">24406.09</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">+247.28 +1.02%</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">最高</span>
                <span className="text-white">24419.53</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">今开</span>
                <span className="text-white">24033.12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">成交额</span>
                <span className="text-white">884.33亿</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">最低</span>
                <span className="text-white">24419.53</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">昨收</span>
                <span className="text-white">24033.12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">平均价</span>
                <span className="text-white">24226.33</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">美股</span>
              <div className="flex items-center gap-2">
                <span className="text-white">24419.53</span>
                <span className="text-green-400">+247.28 +1.02%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">期货</span>
              <div className="flex items-center gap-2">
                <span className="text-white">24411</span>
                <span className="text-green-400">+388 +1.62%</span>
                <span className="text-blue-400">高水 5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Section */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 text-sm">
            <button className="text-slate-400 hover:text-white border-b-2 border-transparent hover:border-orange-500 pb-1">
              行情
            </button>
            <button className="text-slate-400 hover:text-white border-b-2 border-transparent hover:border-orange-500 pb-1">
              分析
            </button>
            <button className="text-slate-400 hover:text-white border-b-2 border-transparent hover:border-orange-500 pb-1">
              评论
            </button>
            <button className="text-white border-b-2 border-orange-500 pb-1">资讯</button>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1 h-auto">
              新闻
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-400 hover:text-white text-xs px-3 py-1 h-auto bg-transparent"
            >
              公告
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-400 hover:text-white text-xs px-3 py-1 h-auto bg-transparent"
            >
              评级
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {newsItems.map((item, index) => (
            <div key={index} className="space-y-2 pb-3 border-b border-slate-800 last:border-b-0">
              <p className="text-sm text-white leading-relaxed hover:text-blue-400 cursor-pointer">{item.title}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-orange-400">{item.source}</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
