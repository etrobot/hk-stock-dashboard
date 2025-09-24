'use client'

import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'

interface AboutUsPageProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function AboutUsPage({ isOpen, onClose, className }: AboutUsPageProps) {
  if (!isOpen) return null

  return (
    <div 
      className={cn(
        "absolute left-8 top-0 w-[167px] h-[291px] bg-[#222632] rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.6)] z-50",
        className
      )}
    >
      {/* Header */}
      <div className="relative h-[27px] bg-[#222632] rounded-t-lg border-b border-[rgba(75,82,105,0.2)]">
        <button
          onClick={onClose}
          className="absolute left-[13px] top-[10px] w-[6px] h-[6px] transform rotate-180"
        >
          <ChevronRight className="w-full h-full text-[#DBDBE0]" />
        </button>
        <div className="absolute left-1/2 top-[8px] transform -translate-x-1/2 text-[#DBDBE0] text-[8px] font-medium">
          关于我们
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* App Info */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="text-white text-lg font-bold">HK</div>
          </div>
          <div className="text-[#DBDBE0] text-[10px] font-medium">港股仪表盘</div>
          <div className="text-[#8A8B96] text-[8px] font-normal">V1.0.1</div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="text-[#DBDBE0] text-[8px] font-normal leading-relaxed">
            港股仪表盘是一款专业的港股行情分析工具，为投资者提供实时行情数据、技术分析图表和投资决策支持。
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="text-[#DBDBE0] text-[8px] font-medium">主要功能</div>
          <div className="space-y-1 text-[#8A8B96] text-[7px] font-normal">
            <div>• 实时港股行情数据</div>
            <div>• 专业技术分析图表</div>
            <div>• 个股详细信息查询</div>
            <div>• 自选股管理</div>
            <div>• 多种主题模式</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="text-[#DBDBE0] text-[8px] font-medium">联系我们</div>
          <div className="space-y-1 text-[#8A8B96] text-[7px] font-normal">
            <div>邮箱: support@hkdashboard.com</div>
            <div>官网: www.hkdashboard.com</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-2 border-t border-[rgba(75,82,105,0.2)]">
          <div className="text-[#8A8B96] text-[6px] font-normal text-center">
            © 2024 港股仪表盘. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}