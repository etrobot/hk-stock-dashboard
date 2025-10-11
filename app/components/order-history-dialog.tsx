'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'

interface OrderHistoryDialogProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function OrderHistoryDialog({ isOpen, onClose, className }: OrderHistoryDialogProps) {
  const [activeTab, setActiveTab] = useState<'hk' | 'us'>('hk')
  const dialogRef = useRef<HTMLDivElement>(null)

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

  const hkOrders = [
    {
      title: '12个月（订购成功）',
      period: '有效期:2023-11-09至2025-11-08',
      pay: '支付信息:2018-11-09 11:23 已支付 120元',
      id: '订单编号:Blablabla-abcabc-001001-ab3434'
    },
    {
      title: '6个月（已过期）',
      period: '有效期:2018-05-09至2019-11-08',
      pay: '支付信息:2018-11-09 11:23 已支付 60元',
      id: '订单编号:Blablabla-abcabc-001001-abcabc'
    }
  ]

  const usOrders = hkOrders

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        ref={dialogRef}
        className={cn(
          'bg-[#F4F5F6] rounded-lg shadow-lg max-w-md w-full mx-4 pointer-events-auto h-[600px] flex flex-col',
          className
        )}
      >
        <div className="bg-white rounded-t-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => { setActiveTab('hk') }}
                className={cn(
                  'text-sm font-medium pb-2 border-b-2 transition-colors',
                  activeTab === 'hk' ? 'text-[#1E1F2D] border-[#FF5C00]' : 'text-[#676770] border-transparent hover:text-[#1E1F2D]'
                )}
              >
                港股Lv2
              </button>
              <button
                onClick={() => { setActiveTab('us') }}
                className={cn(
                  'text-sm font-medium pb-2 border-b-2 transition-colors',
                  activeTab === 'us' ? 'text-[#1E1F2D] border-[#FF5C00]' : 'text-[#676770] border-transparent hover:text-[#1E1F2D]'
                )}
              >
                美股Lv1
              </button>
            </div>
            <button
              onClick={() => { onClose() }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="bg-white rounded-lg border border-[#E6DCD5] overflow-hidden mb-4">
            <div className="bg-[#F4F5F6] px-4 py-2">
              <h3 className="text-sm font-semibold text-[#1E1F2D]">历史订单</h3>
            </div>

            <div className="divide-y divide-[#E6DCD5]">
              {(activeTab === 'hk' ? hkOrders : usOrders).map((o, idx) => (
                <div key={idx} className="p-4 space-y-1">
                  <div className="text-[14px] text-[#1E1F2D] font-medium">{o.title}</div>
                  <div className="text-[12px] text-[#676770]">{o.period}</div>
                  <div className="text-[12px] text-[#676770]">{o.pay}</div>
                  <div className="text-[12px] text-[#676770]">{o.id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
