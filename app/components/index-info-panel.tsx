
import { Button } from "./ui/button"
import { Heart, TrendingUp } from "lucide-react"
import { IndexDetail } from "../types/market"
import { MarketContent } from "./market-content"
import { useState } from "react"
import { useTheme } from "./theme-provider"
import { useLanguage } from "../contexts/LanguageContext"

interface IndexInfoPanelProps {
  indexDetail: IndexDetail;
}

export function IndexInfoPanel({ indexDetail }: IndexInfoPanelProps) {
  const [activeTab, setActiveTab] = useState<'market' | 'analysis' | 'news'>('market')
  const { resolvedTheme } = useTheme()
  const { t } = useLanguage()
  
  const stockLabel = `${indexDetail.name} (${indexDetail.code})`
  const newsItems = [
    {
      title: `${stockLabel} 计划明年上半年推出新品及系列升级`,
      source: "首页 AASTOCKS",
      time: "2小时前",
    },
    {
      title: `${stockLabel} 获机构关注，分析师上调目标价`,
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: `${stockLabel} 发布季度业绩，营收同比变化引关注`,
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: `${stockLabel} 供应链动态：核心零部件厂商加码投入`,
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: `${stockLabel} 新产品传闻再起，市场预期升温`,
      source: "DoNews",
      time: "45分钟前",
    },
    {
      title: `${stockLabel} 海外市场拓展进展，关注后续落地`,
      source: "DoNews",
      time: "45分钟前",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Index Detail */}
      <div className="space-y-4 p-4">
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
        
        <div className="space-y-4 relative">
          <div className="flex items-center gap-2">
            <span className={`text-xl font-bold ${indexDetail.isPositive ? 'text-chart-1' : 'text-chart-2'}`}>
              {indexDetail.value}
            </span>
            <TrendingUp className={`w-4 h-4 ${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-xs ${indexDetail.isPositive ? 'text-chart-1' : 'text-chart-2'}`}>
              {indexDetail.change} {indexDetail.percentage}
            </span>
          </div>

          {/* Data mask overlay */}
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
            <div className="text-center text-white">
              <p className="text-sm font-medium">按实际api数据开发</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">{t('index_panel.high')}</span>
                <span className="">{indexDetail.high}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('index_panel.open')}</span>
                <span className="">{indexDetail.open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('index_panel.volume')}</span>
                <span className="">{indexDetail.volume}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">{t('index_panel.low')}</span>
                <span className="">{indexDetail.low}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('index_panel.close')}</span>
                <span className="">{indexDetail.close}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t('index_panel.avg_price')}</span>
                <span className="">{indexDetail.avgPrice}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{indexDetail.market}{t('index_panel.related')}</span>
              <div className="flex items-center gap-2">
                <span className="">{indexDetail.value}</span>
                <span className={`${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {indexDetail.change} {indexDetail.percentage}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{t('index_panel.futures')}</span>
              <div className="flex items-center gap-2">
                <span className="">{indexDetail.value}</span>
                <span className={`${indexDetail.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {indexDetail.change} {indexDetail.percentage}
                </span>
                <span className="text-blue-400">{t('index_panel.premium')} 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-4 text-sm">
          <button 
            className={`pb-1 ${activeTab === 'market' ? 'border-b-2 border-orange-500' : 'text-slate-400 hover:border-b-2 border-transparent hover:border-orange-500'}`}
            onClick={() => setActiveTab('market')}
          >
            {t('index_panel.market_tab')}
          </button>
          <button 
            className={`pb-1 ${activeTab === 'analysis' ? 'border-b-2 border-orange-500' : 'text-slate-400 hover:border-b-2 border-transparent hover:border-orange-500'}`}
            onClick={() => setActiveTab('analysis')}
          >
            {t('index_panel.analysis_tab')}
          </button>
          <button 
            className={`pb-1 ${activeTab === 'news' ? 'border-b-2 border-orange-500' : 'text-slate-400 hover:border-b-2 border-transparent hover:border-orange-500'}`}
            onClick={() => setActiveTab('news')}
          >
            {t('index_panel.news_tab')}
          </button>
        </div>
        
        {/* News sub-tabs - only show when news tab is active */}
        {activeTab === 'news' && (
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs px-3 py-1 h-auto">
              {t('index_panel.news_subtab')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-400 hover:text-xs px-3 py-1 h-auto bg-transparent"
            >
              {t('index_panel.announcement_subtab')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-400 hover:text-xs px-3 py-1 h-auto bg-transparent"
            >
              {t('index_panel.rating_subtab')}
            </Button>
          </div>
        )}
        
        <div className={`${activeTab === 'analysis' ? 'p-0' : ''} max-h-96 overflow-y-auto`}>
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
                title={t('index_panel.stock_analysis_title')}
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
        </div>
      </div>
    </div>
  )
}
