'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { ChevronRight, FileText, Gift, TrendingUp, CreditCard, Settings, LogOut } from 'lucide-react'
import { SettingsDetailPage } from './settings-detail-page'
import { LoginDialog } from './login-dialog'
import { useLanguage } from '../contexts/LanguageContext'

interface MenuItem {
  labelKey: string
  hasArrow: boolean
  icon: React.ReactNode
  isActive?: boolean
}

interface DropdownMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenStockDetail?: () => void
  onOpenCommunityPopup?: () => void
  className?: string
}

export function DropdownMenu({ isOpen, onClose, onOpenStockDetail, onOpenCommunityPopup, className }: DropdownMenuProps) {
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showSettingsDetail, setShowSettingsDetail] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showMyQuotesDetail, setShowMyQuotesDetail] = useState(false)
  const { t } = useLanguage()

  const handleClose = useCallback(() => {
    // 重置所有内部状态
    setShowSettingsDetail(false)
    setShowLoginDialog(false)
    setShowMyQuotesDetail(false)
    onClose()
  }, [onClose])

  const menuItems: MenuItem[] = [
    { labelKey: 'dropdown.business', hasArrow: true, icon: <FileText className="w-3 h-3" /> },
    { labelKey: 'dropdown.points', hasArrow: true, icon: <Gift className="w-3 h-3" /> },
    { labelKey: 'dropdown.my_quotes', hasArrow: true, isActive: true, icon: <TrendingUp className="w-3 h-3" /> },
    { labelKey: 'dropdown.my_cards', hasArrow: true, icon: <CreditCard className="w-3 h-3" /> },
    { labelKey: 'dropdown.settings', hasArrow: false, icon: <Settings className="w-3 h-3" /> },
    { labelKey: 'dropdown.logout', hasArrow: false, icon: <LogOut className="w-3 h-3" /> },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Don't close if any dialog is open
      if (showLoginDialog || showSettingsDetail || showMyQuotesDetail) {
        return
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, handleClose, showLoginDialog, showSettingsDetail, showMyQuotesDetail])

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.labelKey === 'dropdown.business') {
      handleClose()
      navigate('/discovery')
    } else if (item.labelKey === 'dropdown.points') {
      handleClose()
      navigate('/discovery')
    } else if (item.labelKey === 'dropdown.my_cards') {
      handleClose()
      navigate('/discovery')
    } else if (item.labelKey === 'dropdown.settings') {
      setShowSettingsDetail(true)
    } else if (item.labelKey === 'dropdown.my_quotes') {
      setShowMyQuotesDetail(true)
    } else if (item.labelKey === 'dropdown.logout') {
      setShowLoginDialog(true)
    }
    // Add other navigation logic here as needed
  }

  const handleSettingsClose = () => {
    setShowSettingsDetail(false)
  }

  const handleMyQuotesClose = () => {
    setShowMyQuotesDetail(false)
  }

  const handleLoginClose = () => {
    setShowLoginDialog(false)
    handleClose()
  }


  if (!isOpen) return null

  return (
    <>
      {/* Login Dialog - Always render when needed */}
      <LoginDialog 
        isOpen={showLoginDialog}
        onClose={handleLoginClose}
      />
      
      {/* Settings Detail Page */}
      <SettingsDetailPage 
        isOpen={showSettingsDetail} 
        onClose={handleSettingsClose}
        className={className}
      />


      {/* My Quotes Detail Page */}
      {showMyQuotesDetail && (
        <div 
          className={cn(
            "absolute left-8 top-0 w-[250px] h-[436px] bg-[#222632] rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.6)] z-50",
            className
          )}
        >
          {/* Header */}
          <div className="relative h-[40px] bg-[#222632] rounded-t-lg border-b border-[rgba(75,82,105,0.2)]">
            <button
              onClick={handleMyQuotesClose}
              className="absolute left-[20px] top-[15px] w-[9px] h-[9px] transform rotate-180"
            >
              <ChevronRight className="w-full h-full text-[#DBDBE0]" />
            </button>
            <div className="absolute left-1/2 top-[12px] transform -translate-x-1/2 text-[#DBDBE0] text-[12px] font-medium">
              {t('dropdown.my_quotes')}
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Hong Kong Stocks Card */}
            <div
              onClick={() => {
                onOpenStockDetail?.()
                handleClose()
              }}
              className="block cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg border border-gray-600 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">HK</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs">港股Lv2高级行情</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span className="text-xs text-yellow-200">已开通</span>
                        <span className="text-xs text-yellow-200">剩余180天</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/80">
                    查看历史订单 →
                  </div>
                </div>
              </div>
            </div>

            {/* US Stocks Card */}
            <div
              onClick={() => {
                onOpenStockDetail?.()
                handleClose()
              }}
              className="block cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg border border-gray-600 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">US</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs">美股Lv1高级行情</h4>
                      <div className="mt-1">
                        <span className="text-xs text-yellow-200">开通即享全美最佳买卖1档</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/80">
                    查看历史订单 →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Dropdown Menu - Only show when settings and my quotes are not open */}
      {!showSettingsDetail && !showMyQuotesDetail && (
        <div 
          ref={dropdownRef}
          className={cn(
            "absolute left-8 top-8 w-[250px] bg-[#222632] rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.6)] z-50",
            className
          )}
        >
      {/* User Profile Section */}
      <div className="p-2.5 border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-[30px] h-[30px] rounded-full bg-[#D8D8D8] border border-gray-500 flex items-center justify-center overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4")'
              }}
            />
          </div>
          <div className="flex-1">
            <div className="text-white text-[15px] font-normal">Absjkdsdkjs</div>
            <div className="text-[#72737A] text-[12px] font-normal">77676733</div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div 
          className="flex justify-between mt-2 text-center cursor-pointer hover:bg-[#2A2F3A] rounded p-1 transition-colors"
          onClick={() => {
            onOpenCommunityPopup?.()
            handleClose()
          }}
        >
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">{t('dropdown.updates')}</div>
          </div>
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">{t('dropdown.following')}</div>
          </div>
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">{t('dropdown.followers')}</div>
          </div>
          <div className="flex-1">
            <div className="text-white text-[12px] font-normal">0</div>
            <div className="text-[#72737A] text-[12px] font-normal">{t('dropdown.favorites')}</div>
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
              <span>{t(item.labelKey)}</span>
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