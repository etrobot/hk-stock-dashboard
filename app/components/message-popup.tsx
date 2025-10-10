'use client'

import React, { useRef, useEffect, useState } from 'react'
import { X, Megaphone, Users, TrendingUp, Gift, Video, Newspaper, ChevronLeft } from 'lucide-react'
import { cn } from '../lib/utils'

interface MessageItem {
  id: string
  category: string
  title: string
  content: string
  timestamp: string
  unreadCount?: number
  icon: React.ReactNode
  iconColor: string
}

interface DetailedMessage {
  id: string
  title: string
  content: string
  date: string
  fullContent?: string
}

interface MessagePopupProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

const messageData: MessageItem[] = [
  {
    id: '1',
    category: '平台公告',
    title: '平台公告',
    content: '美股交易市场将于2021年4月6日至....',
    timestamp: '星期一',
    unreadCount: 99,
    icon: <Megaphone className="w-5 h-5" />,
    iconColor: '#FF6B35'
  },
  {
    id: '2',
    category: '社区消息',
    title: '社区消息',
    content: '哔哩哔哩的融资额度增加已经增加…',
    timestamp: '今天 9:54',
    unreadCount: 9,
    icon: <Users className="w-5 h-5" />,
    iconColor: '#4ECDC4'
  },
  {
    id: '3',
    category: '新股速递',
    title: '新股速递',
    content: '哔哩哔哩的融资额度增加已经增加…',
    timestamp: '今天 9:54',
    icon: <TrendingUp className="w-5 h-5" />,
    iconColor: '#45B7D1'
  },
  {
    id: '4',
    category: '最新活动',
    title: '最新活动',
    content: '哔哩哔哩的融资额度增加已经增加…',
    timestamp: '今天 9:54',
    icon: <Gift className="w-5 h-5" />,
    iconColor: '#F7DC6F'
  },
  {
    id: '5',
    category: '直播提醒',
    title: '直播提醒',
    content: '哔哩哔哩的融资额度增加已经增加…',
    timestamp: '今天 9:54',
    icon: <Video className="w-5 h-5" />,
    iconColor: '#BB8FCE'
  },
  {
    id: '6',
    category: '今日快讯',
    title: '今日快讯',
    content: '哔哩哔哩的融资额度增加已经增加…',
    timestamp: '今天 9:54',
    icon: <Newspaper className="w-5 h-5" />,
    iconColor: '#85C1E9'
  }
]

// 模拟的二级页面数据
const detailedMessages: { [key: string]: DetailedMessage[] } = {
  '平台公告': [
    {
      id: '1',
      title: 'eDDA授權提醒',
      content: '您提交的eDDA授權申請被駁回，點擊重新提交申請>>',
      date: '2025-9-15'
    },
    {
      id: '2',
      title: '资金划拨通知',
      content: '尊敬的客户，您划拨HKD20,000.00到VA账户已完成，请查看账户',
      date: '2025-9-4'
    },
    {
      id: '3',
      title: '加密资产账户已开通',
      content: '尊敬的客户，您的加密资产账户已开通，下一步可以划拨资金进行',
      date: '2025-9-4'
    },
    {
      id: '4',
      title: '存/提币通知',
      content: '尊敬的客户，您已成功存入100USTD，请查看账户资产',
      date: '2025-8-22'
    },
    {
      id: '5',
      title: '存/提币通知',
      content: '尊敬的客户，您已成功提取100USTD，请查看账户资产',
      date: '2025-8-22'
    }
  ],
  '社区消息': [
    {
      id: '1',
      title: '社区活动通知',
      content: '本周末将举行社区投资分享会，欢迎参与讨论',
      date: '2025-9-10'
    }
  ],
  '新股速递': [
    {
      id: '1',
      title: '新股上市提醒',
      content: '本周将有3只新股上市，请关注投资机会',
      date: '2025-9-12'
    }
  ],
  '最新活动': [
    {
      id: '1',
      title: '开户优惠活动',
      content: '新用户开户即享手续费减免优惠',
      date: '2025-9-8'
    }
  ],
  '直播提醒': [
    {
      id: '1',
      title: '投资策略直播',
      content: '今晚8点专家分析市场趋势',
      date: '2025-9-14'
    }
  ],
  '今日快讯': [
    {
      id: '1',
      title: '市场快讯',
      content: '美股盘前指数上涨，关注科技股表现',
      date: '2025-9-15'
    }
  ]
}

export function MessagePopup({ isOpen, onClose, className }: MessagePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)
  const [currentView, setCurrentView] = useState<'main' | 'detail'>('main')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setCurrentView('detail')
  }

  const handleBackClick = () => {
    setCurrentView('main')
    setSelectedCategory('')
  }

  // Reset view when popup closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('main')
      setSelectedCategory('')
    }
  }, [isOpen])

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div 
        ref={popupRef}
        className={cn(
          "w-[338px] h-[437px] bg-[#222632] rounded-[14px] shadow-[0px_6px_45px_0px_rgba(0,0,0,0.6)] pointer-events-auto",
          className
        )}
        style={{
          boxShadow: '0px 6px 45px 0px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Header */}
        <div className="relative h-[41px] bg-[#222632] rounded-t-[14px]">
          <div className="absolute inset-0 bg-[rgba(75,82,105,0.2)]" />
          <div className="relative flex items-center justify-between h-full px-5">
            {currentView === 'main' ? (
              <button
                onClick={onClose}
                className="w-[9px] h-[9px] flex items-center justify-center text-[#919CAD] hover:text-white transition-colors"
              >
                <X size={9} strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={handleBackClick}
                className="w-[12px] h-[12px] flex items-center justify-center text-[#919CAD] hover:text-white transition-colors"
              >
                <ChevronLeft size={12} strokeWidth={2} />
              </button>
            )}
            <h3 className="text-[#DBDBE0] text-[12px] font-medium leading-none">
              {currentView === 'main' ? 'TFI消息中心' : selectedCategory}
            </h3>
            {currentView === 'main' ? (
              <div className="w-[9px]" />
            ) : (
              <button
                onClick={onClose}
                className="w-[9px] h-[9px] flex items-center justify-center text-[#919CAD] hover:text-white transition-colors"
              >
                <X size={9} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="h-[396px] overflow-y-auto">
          {currentView === 'main' ? (
            /* Main Message List */
            messageData.map((message, index) => (
              <div key={message.id} className="relative">
                {/* Separator line */}
                {index > 0 && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[rgba(75,82,105,0.2)]" />
                )}
                
                {/* Message Item */}
                <div 
                  className="h-[63px] bg-[#222632] px-6 py-3 hover:bg-[#2A3040] transition-colors cursor-pointer"
                  onClick={() => handleCategoryClick(message.category)}
                >
                  <div className="flex items-center gap-3 h-full">
                    {/* Icon */}
                    <div className="flex-shrink-0" style={{ color: message.iconColor }}>
                      {message.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-[#DBDBE0] text-[14px] font-medium leading-none">
                          {message.title}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          {message.unreadCount && (
                            <div className="bg-[#F44345] rounded-[6px] px-1.5 py-1 min-w-[12px] h-[12px] flex items-center justify-center">
                              <span className="text-white text-[9px] font-medium leading-none">
                                {message.unreadCount > 99 ? '+99' : message.unreadCount}
                              </span>
                            </div>
                          )}
                          <span className="text-[#72737A] text-[11px] leading-none">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#72737A] text-[11px] leading-none truncate">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Detail Message List */
            detailedMessages[selectedCategory]?.map((detailMessage, index) => (
              <div key={detailMessage.id} className="relative">
                {/* Separator line */}
                {index > 0 && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[rgba(75,82,105,0.2)]" />
                )}
                
                {/* Detail Message Item */}
                <div className="min-h-[63px] bg-[#222632] px-6 py-3 hover:bg-[#2A3040] transition-colors cursor-pointer">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[#DBDBE0] text-[14px] font-medium leading-none">
                        {detailMessage.title}
                      </h4>
                      <span className="text-[#72737A] text-[11px] leading-none">
                        {detailMessage.date}
                      </span>
                    </div>
                    <p className="text-[#72737A] text-[11px] leading-[16px]">
                      {detailMessage.content}
                    </p>
                  </div>
                </div>
              </div>
            )) || (
              <div className="flex items-center justify-center h-full">
                <p className="text-[#72737A] text-[11px]">暂无消息</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}