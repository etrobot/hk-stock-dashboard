'use client'

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Star, BarChart3, User, Compass, SlidersHorizontal, MessageSquare, Users } from 'lucide-react'
import { DropdownMenu } from './dropdown-menu-component'
import { MessagePopup } from './message-popup'
import { StockDetailDialog } from './stock-detail-dialog'
import { CommunityPopup } from './community-popup'
import { useLanguage } from '../contexts/LanguageContext'
import { useTradingLock } from '../contexts/TradingLockContext'

interface NavigationItem {
  label: string
  icon: React.ReactNode
  to: string
}


interface SidebarNavigationProps {
  className?: string
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false)
  const [isCommunityPopupOpen, setIsCommunityPopupOpen] = useState(false)
  const [isStockDetailOpen, setIsStockDetailOpen] = useState(false)
  const { t } = useLanguage()
  const { isTradeUnlocked, showUnlockDialog } = useTradingLock()
  const navigate = useNavigate()

  const handleAccountClick = (e: React.MouseEvent) => {
    if (!isTradeUnlocked) {
      e.preventDefault()
      showUnlockDialog(() => {
        navigate('/account')
      })
    }
  }

  const mainNavigationItems: NavigationItem[] = [
    { label: t('nav.watchlist'), to: '/watchlist', icon: (<Star className="w-4 h-4" />) },
    { label: t('nav.market'), to: '/market', icon: (<BarChart3 className="w-4 h-4" />) },
    { label: t('nav.account'), to: '/account', icon: (<User className="w-4 h-4" />) },
    { label: t('nav.discovery'), to: '/discovery', icon: (<Compass className="w-4 h-4" />) },
  ]

  const bottomNavigationItems: NavigationItem[] = [
    { label: t('nav.messages'), to: '/messages', icon: (<MessageSquare className="w-4 h-4" />) },
    { label: t('nav.community'), to: '/community', icon: (<Users className="w-4 h-4" />) },
  ]

  return (
    <div className={cn("border-r flex flex-col h-full", className)}>
      {/* Logo/Avatar section */}
      <div className="p-2 border-b relative">
        <div className="flex items-center justify-between">
          <button 
            className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center hover:ring-2 hover:ring-gray-500 transition-all"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4")'
              }}
            />
          </button>
          <button className="text-[#DBDBE0] hover:text-white">
            <SlidersHorizontal size={10} />
          </button>
        </div>

        <DropdownMenu 
          isOpen={isDropdownOpen} 
          onClose={() => setIsDropdownOpen(false)}
          onOpenStockDetail={() => setIsStockDetailOpen(true)}
          onOpenCommunityPopup={() => setIsCommunityPopupOpen(true)}
        />
      </div>

      {/* Main Navigation items */}
      <div className="flex-1 py-4">
        <div className="space-y-2">
          {mainNavigationItems.map((item) => (
            <div key={item.to} className="px-2">
              <NavLink
                to={item.to}
                onClick={item.to === '/account' ? handleAccountClick : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center space-y-1 p-2 rounded-lg cursor-pointer transition-colors",
                    isActive ? "bg-[#454C56] text-white" : "text-[#9FA0A9] hover:hover:bg-[#454C56]/80",
                  )
                }
              >
                <div className="w-4 h-4">
                  {item.icon}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation items */}
      <div className="pb-4">
        <div className="space-y-2">
          {bottomNavigationItems.map((item) => (
            <div key={item.to} className="px-2">
              {item.to === '/messages' ? (
                <button
                  onClick={() => setIsMessagePopupOpen(true)}
                  className={cn(
                    "flex flex-col items-center space-y-1 p-2 rounded-lg cursor-pointer transition-colors w-full",
                    "text-[#9FA0A9] hover:bg-[#454C56]/50"
                  )}
                >
                  <div className="w-4 h-4 relative">
                    {item.icon}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ) : item.to === '/community' ? (
                <button
                  onClick={() => setIsCommunityPopupOpen(true)}
                  className={cn(
                    "flex flex-col items-center space-y-1 p-2 rounded-lg cursor-pointer transition-colors w-full",
                    "text-[#9FA0A9] hover:bg-[#454C56]/50"
                  )}
                >
                  <div className="w-4 h-4">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ) : (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-col items-center space-y-1 p-2 rounded-lg cursor-pointer transition-colors",
                      isActive ? "bg-[#454C56] text-white" : "text-[#9FA0A9] hover:hover:bg-[#454C56]/50",
                    )
                  }
                >
                  <div className="w-4 h-4">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Popup */}
      <MessagePopup 
        isOpen={isMessagePopupOpen}
        onClose={() => setIsMessagePopupOpen(false)}
      />

      {/* Community Popup */}
      <CommunityPopup 
        isOpen={isCommunityPopupOpen}
        onClose={() => setIsCommunityPopupOpen(false)}
      />

      {/* Stock Detail Dialog */}
      <StockDetailDialog 
        isOpen={isStockDetailOpen}
        onClose={() => setIsStockDetailOpen(false)}
      />

    </div>
  )
}
