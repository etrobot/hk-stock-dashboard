'use client'

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Star, BarChart3, User, Compass, SlidersHorizontal } from 'lucide-react'
import { DropdownMenu } from './dropdown-menu-component'

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

  return (
    <div className={cn("border-r border-gray-700 flex flex-col", className)}>
      {/* Logo/Avatar section */}
      <div className="p-2 border-b border-gray-700 relative">
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
