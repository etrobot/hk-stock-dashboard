'use client'

import React from 'react'
import { SidebarNavigation } from './sidebar-navigation'
import { StockDetailPage } from './stock-detail-page'
import App from '../App'
import { Button } from './ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import { History, Home, ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { toast } from '../hooks/use-toast'
import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/toaster'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex-1 p-4 text-center text-foreground">
    <h2 className="text-xl mb-4">{title}</h2>
    <p className="text-muted-foreground">该页面正在开发中...</p>
  </div>
)

export function MainLayout() {
  const navigate = useNavigate()

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

  const handleHistory = () => {
    toast({ title: '历史', description: '历史功能开发中…' })
  }

  const handleSearch = () => {
    toast({ title: '搜索', description: '搜索功能开发中…' })
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          {/* 左侧导航 */}
          <SidebarNavigation />

          {/* 主内容区域 */}
          <div className="flex-1 flex flex-col">
            {/* 天风国际PC客户端标题 */}
            <div className="h-8 bg-card flex items-center justify-center border-b border-border relative">
              {/* 左侧图标按钮 */}
              <div className="absolute left-2 flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="历史" onClick={handleHistory}>
                      <History className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>历史</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="首页" onClick={handleGoHome}>
                      <Home className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>首页</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="前一页" onClick={handleGoBack}>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>前一页</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="后一页" onClick={handleGoForward}>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>后一页</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="搜索" onClick={handleSearch}>
                      <Search className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>搜索</TooltipContent>
                </Tooltip>
              </div>

              <span className="text-foreground text-xs font-medium">天风国际PC客户端</span>
              <div className="absolute right-4">
                <button className="bg-[#FF5C00] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[#e54f00] transition-colors">
                  快捷交易
                </button>
              </div>
            </div>

            {/* 页面内容 */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Navigate to="/market" replace />} />
                <Route path="/watchlist" element={<StockDetailPage titleOverride="自选" />} />
                <Route path="/market" element={<div className="h-full bg-background text-foreground"><App /></div>} />
                <Route path="/stock/:symbol" element={<StockDetailPage />} />
                <Route path="/account" element={<PlaceholderPage title="账户" />} />
                <Route path="/options" element={<PlaceholderPage title="期权" />} />
                <Route path="/discovery" element={<PlaceholderPage title="发现" />} />
                <Route path="*" element={<PlaceholderPage title="页面未找到" />} />
              </Routes>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
