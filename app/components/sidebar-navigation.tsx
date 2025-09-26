'use client'

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Star, BarChart3, User, Compass, SlidersHorizontal, MessageSquare, Users } from 'lucide-react'
import { DropdownMenu } from './dropdown-menu-component'
import { MessagePopup } from './message-popup'

interface NavigationItem {
  label: string
  icon: React.ReactNode
  to: string
}

const mainNavigationItems: NavigationItem[] = [
  { label: '自选', to: '/watchlist', icon: (<Star className="w-4 h-4" />) },
  { label: '市场', to: '/market', icon: (<BarChart3 className="w-4 h-4" />) },
  { label: '账户', to: '/account', icon: (<User className="w-4 h-4" />) },
  // { label: '期权', to: '/options', icon: (<BadgeDollarSign className="w-4 h-4" />) },
  { label: '发现', to: '/discovery', icon: (<Compass className="w-4 h-4" />) },
]

const bottomNavigationItems: NavigationItem[] = [
  { label: '消息', to: '/messages', icon: (<MessageSquare className="w-4 h-4" />) },
  { label: '社区', to: '/community', icon: (<Users className="w-4 h-4" />) },
]

interface SidebarNavigationProps {
  className?: string
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false)
  const [isCommunityPopupOpen, setIsCommunityPopupOpen] = useState(false)

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
        />
      </div>

      {/* Main Navigation items */}
      <div className="flex-1 py-4">
        <div className="space-y-2">
          {mainNavigationItems.map((item) => (
            <div key={item.to} className="px-2">
              <NavLink
                to={item.to}
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
      {isCommunityPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="rounded-lg border w-[90vw] h-[90vh] max-w-6xl max-h-[800px] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">社区</h3>
              <button
                onClick={() => setIsCommunityPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1">
              <iframe
                src="https://tfi.tfisec.cn/communityPC"
                className="w-full h-full border-0"
                title="社区"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
