'use client'

import { useState } from 'react'

interface SidebarNavigationProps {
  currentPage?: string
}

export function SidebarNavigation({ currentPage = 'stock-detail' }: SidebarNavigationProps) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: 'watchlist', icon: '📊', label: '自选' },
    { id: 'market', icon: '📈', label: '市场' },
    { id: 'account', icon: '👤', label: '账户' },
    { id: 'options', icon: '$', label: '期权' },
    { id: 'discover', icon: '🔍', label: '发现' }
  ]

  return (
    <div className="w-[88px] h-full bg-[#272F3A] border-r border-gray-800 flex flex-col">
      {/* 用户头像 */}
      <div className="flex flex-col items-center py-4 border-b border-gray-700">
        <div className="w-6 h-6 rounded-full bg-gray-600 mb-2 overflow-hidden">
          <img
            src="/api/placeholder/24/24"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2.5 h-2.5 bg-gray-500 rounded cursor-pointer"
             onClick={() => setCollapsed(!collapsed)} />
      </div>

      {/* 导航菜单 */}
      <div className="flex-1 py-4">
        {menuItems.map(item => {
          const isActive = item.id === 'watchlist' // 默认选中自选

          return (
            <div
              key={item.id}
              className={`
                flex flex-col items-center px-2 py-3 mx-2 mb-2 rounded-lg cursor-pointer
                ${isActive
                  ? 'bg-[#1D212A] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
              `}
            >
              <div className="w-4 h-4 mb-1 flex items-center justify-center">
                {/* 图标占位符 */}
                <div className={`w-3.5 h-3.5 rounded ${
                  isActive ? 'bg-white' : 'bg-gray-500'
                }`} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}