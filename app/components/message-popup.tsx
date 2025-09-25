'use client'

import React, { useRef, useEffect } from 'react'
import { X, Megaphone, Users, TrendingUp, Gift, Video, Newspaper } from 'lucide-react'
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

export function MessagePopup({ isOpen, onClose, className }: MessagePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

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
            <button
              onClick={onClose}
              className="w-[9px] h-[9px] flex items-center justify-center text-[#919CAD] hover:text-white transition-colors"
            >
              <X size={9} strokeWidth={2} />
            </button>
            <h3 className="text-[#DBDBE0] text-[12px] font-medium leading-none">
              TFI消息中心
            </h3>
            <div className="w-[9px]" />
          </div>
        </div>

        {/* Message List */}
        <div className="h-[396px] overflow-y-auto">
          {messageData.map((message, index) => (
            <div key={message.id} className="relative">
              {/* Separator line */}
              {index > 0 && (
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[rgba(75,82,105,0.2)]" />
              )}
              
              {/* Message Item */}
              <div className="h-[63px] bg-[#222632] px-6 py-3 hover:bg-[#2A3040] transition-colors cursor-pointer">
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
          ))}
        </div>
      </div>
    </div>
  )
}