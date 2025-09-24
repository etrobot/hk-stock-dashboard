'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { ChevronRight, FileText, Gift, TrendingUp, CreditCard, Settings, LogOut } from 'lucide-react'
import { SettingsDetailPage } from './settings-detail-page'

interface MenuItem {
  label: string
  hasArrow: boolean
  icon: React.ReactNode
  isActive?: boolean
}

interface DropdownMenuProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

const menuItems: MenuItem[] = [
  { label: '业务办理', hasArrow: true, icon: <FileText className="w-3 h-3" /> },
  { label: '积分中心', hasArrow: true, icon: <Gift className="w-3 h-3" /> },
  { label: '我的行情', hasArrow: true, isActive: true, icon: <TrendingUp className="w-3 h-3" /> },
  { label: '我的卡券', hasArrow: true, icon: <CreditCard className="w-3 h-3" /> },
  { label: '设置', hasArrow: false, icon: <Settings className="w-3 h-3" /> },
  { label: '退出登陆', hasArrow: false, icon: <LogOut className="w-3 h-3" /> },
]

export function DropdownMenu({ isOpen, onClose, className }: DropdownMenuProps) {
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showSettingsDetail, setShowSettingsDetail] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.label === '业务办理') {
      onClose()
      navigate('/discovery')
    } else if (item.label === '设置') {
      setShowSettingsDetail(true)
    }
    // Add other navigation logic here as needed
  }

  const handleSettingsClose = () => {
    setShowSettingsDetail(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Settings Detail Page */}
      <SettingsDetailPage 
        isOpen={showSettingsDetail} 
        onClose={handleSettingsClose}
        className={className}
      />
      
      {/* Main Dropdown Menu - Only show when settings is not open */}
      {!showSettingsDetail && (
        <div 
          ref={dropdownRef}
          className={cn(
            "absolute left-8 top-0 w-[250px] bg-[#222632] rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.6)] z-50",
            className
          )}
        >
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
            <div className="text-white text-[15px] font-normal">Absjkdsdkjs</div>
            <div className="text-[#72737A] text-[12px] font-normal">77676733</div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="flex justify-between mt-2 text-center">
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">动态</div>
          </div>
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">关注</div>
          </div>
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">粉丝</div>
          </div>
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">收藏</div>
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
              "w-full px-8 py-3 text-left text-[12px] font-normal text-[#DBDBE0] hover:bg-[#222632] flex items-center justify-between transition-colors",
              item.isActive && "bg-[#222632]"
            )}
          >
            <div className="flex items-center space-x-3">
              {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
              <span>{item.label}</span>
            </div>
            {item.hasArrow && (
              <ChevronRight className="w-3 h-3 text-[#DBDBE0]" />
            )}
          </button>
        ))}
      </div>
        </div>
      )}
    </>
  )
}