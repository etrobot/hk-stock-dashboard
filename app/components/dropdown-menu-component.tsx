'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { ChevronRight, TrendingUp, Settings, LogOut } from 'lucide-react'
// import { FileText,CreditCard, HelpCircle } from 'lucide-react'
import { SettingsDetailPage } from './settings-detail-page'
import { LoginDialog } from './login-dialog'

import { useLanguage } from '../contexts/LanguageContext'
import { OrderHistoryDialog } from './order-history-dialog'

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
  shouldOpenMyQuotes?: boolean
  shouldOpenStockDetail?: boolean
}

export function DropdownMenu({ isOpen, onClose, onOpenStockDetail, onOpenCommunityPopup, className, shouldOpenMyQuotes, shouldOpenStockDetail }: DropdownMenuProps) {
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showSettingsDetail, setShowSettingsDetail] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const { t } = useLanguage()

  // 当 shouldOpenMyQuotes 为 true 时，自动打开 StockDetailDialog
  useEffect(() => {
    if ((shouldOpenMyQuotes || shouldOpenStockDetail) && isOpen) {
      onOpenStockDetail?.()
      // 重置所有内部状态
      setShowSettingsDetail(false)
      setShowLoginDialog(false)
      onClose()
    }
  }, [shouldOpenMyQuotes, shouldOpenStockDetail, isOpen, onOpenStockDetail, onClose])

  const handleClose = useCallback(() => {
    // 重置所有内部状态
    setShowSettingsDetail(false)
    setShowLoginDialog(false)
    onClose()
  }, [onClose])

  const menuItems: MenuItem[] = [
    // { labelKey: 'dropdown.business', hasArrow: true, icon: <FileText className="w-3 h-3" /> },
    { labelKey: 'dropdown.my_quotes', hasArrow: false, isActive: true, icon: <TrendingUp className="w-3 h-3" /> },
    // { labelKey: 'dropdown.my_cards', hasArrow: true, icon: <CreditCard className="w-3 h-3" /> },
    // { labelKey: 'dropdown.help_center', hasArrow: false, icon: <HelpCircle className="w-3 h-3" /> },
    { labelKey: 'dropdown.settings', hasArrow: false, icon: <Settings className="w-3 h-3" /> },
    { labelKey: 'dropdown.logout', hasArrow: false, icon: <LogOut className="w-3 h-3" /> },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Don't close if any dialog is open
      if (showLoginDialog || showSettingsDetail) {
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
  }, [isOpen, handleClose, showLoginDialog, showSettingsDetail])

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
    } else if (item.labelKey === 'dropdown.help_center') {
      handleClose()
      navigate('/doc')
    } else if (item.labelKey === 'dropdown.settings') {
      setShowSettingsDetail(true)
    } else if (item.labelKey === 'dropdown.my_quotes') {
      onOpenStockDetail?.()
      handleClose()
    } else if (item.labelKey === 'dropdown.logout') {
      setShowLoginDialog(true)
    }
    // Add other navigation logic here as needed
  }

  const handleSettingsClose = () => {
    setShowSettingsDetail(false)
  }

  const handleLoginClose = () => {
    setShowLoginDialog(false)
    handleClose()
  }

  const handleOrderHistoryClose = () => {
    setShowOrderHistory(false)
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



      <OrderHistoryDialog 
        isOpen={showOrderHistory}
        onClose={handleOrderHistoryClose}
      />


      {/* Main Dropdown Menu - Only show when settings is not open */}
      {!showSettingsDetail && (
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