'use client'

import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Star, BarChart3, User, BadgeDollarSign, Compass, SlidersHorizontal, ChevronRight, FileText, Gift, TrendingUp, CreditCard, Settings, LogOut } from 'lucide-react'

interface NavigationItem {
  label: string
  icon: React.ReactNode
  to: string
}

const navigationItems: NavigationItem[] = [
  { label: '自选', to: '/watchlist', icon: (<Star className="w-4 h-4" />) },
  { label: '市场', to: '/market', icon: (<BarChart3 className="w-4 h-4" />) },
  { label: '账户', to: '/account', icon: (<User className="w-4 h-4" />) },
  // { label: '期权', to: '/options', icon: (<BadgeDollarSign className="w-4 h-4" />) },
  { label: '发现', to: '/discovery', icon: (<Compass className="w-4 h-4" />) },
]

interface SidebarNavigationProps {
  className?: string
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMenuItemClick = (item: any) => {
    if (item.label === '业务办理') {
      setIsDropdownOpen(false)
      navigate('/discovery')
    }
    // Add other navigation logic here as needed
  }

  const menuItems = [
    { label: '业务办理', hasArrow: true, icon: <FileText className="w-3 h-3" /> },
    { label: '积分中心', hasArrow: true, icon: <Gift className="w-3 h-3" /> },
    { label: '我的行情', hasArrow: true, isActive: true, icon: <TrendingUp className="w-3 h-3" /> },
    { label: '我的卡券', hasArrow: true, icon: <CreditCard className="w-3 h-3" /> },
    { label: '设置', hasArrow: false, icon: <Settings className="w-3 h-3" /> },
    { label: '退出登陆', hasArrow: false, icon: <LogOut className="w-3 h-3" /> },
  ]

  return (
    <div className={cn("border-r border-gray-700 flex flex-col", className)}>
      {/* Logo/Avatar section */}
      <div className="p-2 border-b border-gray-700 relative" ref={dropdownRef}>
        <div className="flex items-center justify-between">
          <button 
            className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center hover:ring-2 hover:ring-gray-500 transition-all"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://image-resource.mastergo.com/47299612875115/171703047671075/c0e35759dfa4625741d469d72017f9c0.png")'
              }}
            />
          </button>
          <button className="text-[#DBDBE0] hover:text-white">
            <SlidersHorizontal size={10} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute left-8 top-0 w-[167px] bg-[#222632] rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.6)] z-50">
            {/* User Profile Section */}
            <div className="p-2.5 border-b border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-[30px] h-[30px] rounded-full bg-[#D8D8D8] border border-gray-500 flex items-center justify-center overflow-hidden">
                  <div
                    className="w-[60px] h-[35px] bg-cover bg-center"
                    style={{
                      backgroundImage: 'url("https://image-resource.mastergo.com/47299612875115/171703047671075/c0e35759dfa4625741d469d72017f9c0.png")',
                      transform: 'translate(-21.82px, -4.69px)'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white text-[10px] font-normal">Absjkdsdkjs</div>
                  <div className="text-[#72737A] text-[8px] font-normal">77676733</div>
                </div>
              </div>
              
              {/* Stats Section */}
              <div className="flex justify-between mt-2 text-center">
                <div className="flex-1">
                  <div className="text-white text-[8px] font-normal">0</div>
                  <div className="text-[#72737A] text-[8px] font-normal">动态</div>
                </div>
                <div className="flex-1">
                  <div className="text-white text-[8px] font-normal">0</div>
                  <div className="text-[#72737A] text-[8px] font-normal">关注</div>
                </div>
                <div className="flex-1">
                  <div className="text-white text-[8px] font-normal">0</div>
                  <div className="text-[#72737A] text-[8px] font-normal">粉丝</div>
                </div>
                <div className="flex-1">
                  <div className="text-white text-[8px] font-normal">0</div>
                  <div className="text-[#72737A] text-[8px] font-normal">收藏</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item)}
                  className={cn(
                    "w-full px-8 py-2 text-left text-[8px] font-normal text-[#DBDBE0] hover:bg-[#222632] flex items-center justify-between transition-colors",
                    item.isActive && "bg-[#222632]"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.hasArrow && (
                    <ChevronRight className="w-1.5 h-1.5 text-[#DBDBE0]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation items */}
      <div className="flex-1 py-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <div key={item.to} className="px-2">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
