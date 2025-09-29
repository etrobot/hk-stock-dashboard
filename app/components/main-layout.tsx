'use client'

import { SidebarNavigation } from './sidebar-navigation'
import { StockDetailPage } from './stock-detail-page'
import App from '../App'
import AccountPage from '../pages/AccountPage'
import { Button } from './ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import { Home, ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { toast } from '../hooks/use-toast'
import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/toaster'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { LanguageToggle } from './language-toggle'
import { TradingPopup } from './trading-popup'
import { useState } from 'react'
import DiscoveryPage from '../pages/DiscoveryPage'
import HeatmapPage from '../pages/HeatmapPage'
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext'

const PlaceholderPage = ({ title }: { title: string }) => {
  const { t } = useLanguage()
  return (
    <div className="flex-1 p-4 text-center text-foreground">
      <h2 className="text-xl mb-4">{title}</h2>
      <p className="text-muted-foreground">{t('page.developing')}</p>
    </div>
  )
}

function MainLayoutContent() {
  const navigate = useNavigate()
  const [tradingPopupOpen, setTradingPopupOpen] = useState(false)
  const { t } = useLanguage()

  const handleGoHome = () => {
    navigate('/market')
  }

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history) {
      window.history.back()
    }
  }

  const handleGoForward = () => {
    if (typeof window !== 'undefined' && window.history) {
      window.history.forward()
    }
  }

  const handleSearch = () => {
    toast({ title: t('toast.search.title'), description: t('toast.search.description') })
  }

  const handleQuickTrading = () => {
    setTradingPopupOpen(true)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 min-h-0">
          {/* 左侧导航 - 固定 */}
          <div className="flex-shrink-0 h-full">
            <SidebarNavigation />
          </div>

          {/* 主内容区域 */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* 天风国际PC客户端标题 - 固定 */}
            <div className="h-8 bg-card flex items-center justify-center border-b border-border relative flex-shrink-0">
              {/* 左侧图标按钮 */}
              <div className="absolute left-2 flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label={t('common.home')} onClick={handleGoHome}>
                      <Home className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t('common.home')}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label={t('common.previous_page')} onClick={handleGoBack}>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t('common.previous_page')}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label={t('common.next_page')} onClick={handleGoForward}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t('common.next_page')}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label={t('common.search')} onClick={handleSearch}>
                      <Search className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t('common.search')}</TooltipContent>
                </Tooltip>
              </div>

              <span className="text-foreground text-xs font-medium">{t('app.title')}</span>
              <div className="absolute right-4 flex items-center gap-2">
                {/* 语言切换 */}
                <LanguageToggle />
                {/* 主题切换 */}
                <ModeToggle />
                <button 
                  onClick={handleQuickTrading}
                  className="bg-[#FF5C00] px-3 py-1 rounded text-xs font-medium hover:bg-[#e54f00] transition-colors"
                >
                  {t('common.quick_trading')}
                </button>
              </div>
            </div>

            {/* 页面内容 - 可滚动 */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <Routes>
                <Route path="/" element={<Navigate to="/market" replace />} />
                <Route path="/watchlist" element={<StockDetailPage titleOverride={t('nav.watchlist')} />} />
                <Route path="/market" element={<div className="bg-background text-foreground"><App /></div>} />
                <Route path="/stock/:symbol" element={<StockDetailPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/options" element={<PlaceholderPage title={t('nav.options')} />} />
                <Route path="/discovery" element={<DiscoveryPage />} />
                <Route path="/heatmap" element={<HeatmapPage />} />
                <Route path="*" element={<PlaceholderPage title={t('page.not_found')} />} />
              </Routes>
            </div>
          </div>
        </div>
        <Toaster />
        <TradingPopup 
          open={tradingPopupOpen} 
          onOpenChange={setTradingPopupOpen} 
        />
      </div>
    </ThemeProvider>
  )
}

export function MainLayout() {
  return (
    <LanguageProvider>
      <MainLayoutContent />
    </LanguageProvider>
  )
}
