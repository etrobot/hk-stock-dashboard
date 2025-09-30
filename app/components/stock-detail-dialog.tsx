'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface StockDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function StockDetailDialog({ isOpen, onClose, className }: StockDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<'hk' | 'us'>('hk')
  const dialogRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
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

  const hkFeatures = [
    { name: '行情功能', basic: 'Level 1基础行情', advanced: 'Level 2基础行情' },
    { name: '行情数据', basic: '至少延迟15分钟', advanced: '实时行情' },
    { name: '挂单盘口', basic: '1档', advanced: '10档深度盘口' },
    { name: '经纪商列队', basic: '无', advanced: '有' },
    { name: '逐笔成交明细', basic: '最新4笔', advanced: '全部' }
  ]

  const usFeatures = [
    { name: '行情功能', basic: 'Level 0基础行情', advanced: 'Level 1高级行情' },
    { name: '行情数据', basic: '至少延迟15分钟', advanced: '实时行情' },
    { name: '挂单盘口', basic: '无', advanced: '全美最佳买卖1档' },
    { name: '逐笔成交明细', basic: '无', advanced: '有' }
  ]

  const currentFeatures = activeTab === 'hk' ? hkFeatures : usFeatures

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div 
        ref={dialogRef}
        className={cn(
          "bg-[#F4F5F6] rounded-lg shadow-lg max-w-md w-full mx-4 pointer-events-auto",
          className
        )}
      >
        {/* Header with tabs */}
        <div className="bg-white rounded-t-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('hk')}
                className={cn(
                  "text-sm font-medium pb-2 border-b-2 transition-colors",
                  activeTab === 'hk' 
                    ? "text-[#1E1F2D] border-[#FF5C00]" 
                    : "text-[#676770] border-transparent hover:text-[#1E1F2D]"
                )}
              >
                港股Lv2
              </button>
              <button
                onClick={() => setActiveTab('us')}
                className={cn(
                  "text-sm font-medium pb-2 border-b-2 transition-colors",
                  activeTab === 'us' 
                    ? "text-[#1E1F2D] border-[#FF5C00]" 
                    : "text-[#676770] border-transparent hover:text-[#1E1F2D]"
                )}
              >
                美股Lv1
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Stock card */}
          <div className="mb-4">
            {activeTab === 'hk' ? (
              <div className="relative overflow-hidden rounded-lg">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">HK</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">高级行情</h4>
                      <p className="text-xs text-white/80">港股Level-2</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-lg">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">US</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">高级行情</h4>
                      <p className="text-xs text-white/80">美股 Level-1</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features comparison table */}
          <div className="bg-white rounded-lg border border-[#E6DCD5] overflow-hidden mb-4">
            <div className="bg-[#F4F5F6] px-4 py-2 text-center">
              <h3 className="text-sm font-semibold text-[#1E1F2D]">高级行情介绍</h3>
            </div>
            
            <div className="divide-y divide-[#E6DCD5]">
              {/* Header row */}
              <div className="grid grid-cols-3 bg-[rgba(145,156,173,0.1)]">
                <div className="p-2 text-xs text-[#1E1F2D] font-medium">行情功能</div>
                <div className="p-2 text-xs text-[#1E1F2D] font-medium border-l border-[#E6DCD5]">
                  {activeTab === 'hk' ? 'Level 1基础行情' : 'Level 0基础行情'}
                </div>
                <div className="p-2 text-xs text-[#1E1F2D] font-medium border-l border-[#E6DCD5] bg-[rgba(146,91,253,0.1)]">
                  {activeTab === 'hk' ? 'Level 2基础行情' : 'Level 1高级行情'}
                </div>
              </div>

              {/* Feature rows */}
              {currentFeatures.map((feature, index) => (
                <div key={index} className="grid grid-cols-3">
                  <div className="p-2 text-xs text-[#1E1F2D]">{feature.name}</div>
                  <div className="p-2 text-xs text-[#1E1F2D] border-l border-[#E6DCD5]">{feature.basic}</div>
                  <div className="p-2 text-xs text-[#1E1F2D] border-l border-[#E6DCD5] bg-[rgba(146,91,253,0.1)]">
                    {feature.advanced}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase button */}
          <button className="w-full bg-[#FF5C00] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#FF5C00]/90 transition-colors">
            立即购买
          </button>

          {/* Tips section */}
          <div className="mt-4 text-xs text-[#8A8B96] space-y-2">
            {activeTab === 'hk' ? (
              <>
                <p className="font-medium">*港股Lv2温馨提示：</p>
                <p>1、港股Lv2行情分为中国内地版(不包括香港、澳门和台湾)和全球版，系统将根据您当前所在地区自动匹配推荐。</p>
                <p>2、根据港交所规定，若您购买的为中国内地版港股Lv2行情，您在中国内地以外的地区使用app，将自动切换为Lv1基础行情。</p>
              </>
            ) : (
              <>
                <p className="font-medium">*美股Lv1温馨提示：</p>
                <p>1、天风国际支持非专业投资者(Non-Professional Subscriber)和专业投资者(Professional Subscriber)申请和使用美股Lv1高级行情。请参阅<span className="text-[#FF5C00]">美股非专业投资者协议</span>以确保本人满足其中一类投资者之定义。</p>
                <p>2、系统将根据您的投资者身份，自动匹配推荐美股Lv1高级行情的不同版本。</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}