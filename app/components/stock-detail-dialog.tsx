'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { X } from 'lucide-react'

interface StockDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

type Option = {
  id: string
  title: string
  subtitle: string
  price: number
  highlight?: boolean
}

export function StockDetailDialog({ isOpen, onClose, className }: StockDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<'hk' | 'us'>('hk')
  const [stage, setStage] = useState<'select' | 'pay' | 'success'>('select')
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose()
        setStage('select')
        setSelectedOption(null)
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

  const hkOptions: Option[] = [
    { id: 'cn-month', title: '大陆移动端——月卡', subtitle: '1个月', price: 35 },
    { id: 'cn-quarter', title: '大陆移动端——季卡', subtitle: '3个月（平均33港币/月）', price: 99 },
    { id: 'cn-year', title: '大陆移动端——年卡（超值）', subtitle: '12个月（平均30港币/月）', price: 360 },
    { id: 'global-month', title: '全球版——月卡', subtitle: '1个月（不限地区使用）', price: 265 }
  ]

  const usOptions: Option[] = [
    { id: 'np-month', title: '非专业投资者——月卡', subtitle: '1个月', price: 15 },
    { id: 'np-quarter', title: '非专业投资者——季卡', subtitle: '3个月（平均13港币/月）', price: 39 },
    { id: 'np-year', title: '非专业投资者——年卡（超值）', subtitle: '12个月（平均10港币/月）', price: 120 },
    { id: 'pro-month', title: '专业投资者', subtitle: '1个月', price: 299 }
  ]

  const options = activeTab === 'hk' ? hkOptions : usOptions
  const totalPrice = selectedOption?.price ?? 0

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        ref={dialogRef}
        className={cn(
          'bg-[#F4F5F6] rounded-lg shadow-lg max-w-md w-full mx-4 pointer-events-auto h-[600px] flex flex-col relative',
          className
        )}
      >
        <div className="bg-white rounded-t-lg shrink-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {stage === 'pay' && (
                <button
                  onClick={() => setStage('select')}
                  className="text-[#676770] hover:text-[#1E1F2D] transition-colors text-sm"
                >
                  返回
                </button>
              )}
              {stage === 'select' && (
                <div className="flex space-x-8">
                  <button
                    onClick={() => { setActiveTab('hk'); setStage('select'); setSelectedOption(null) }}
                    className={cn(
                      'text-sm font-medium pb-2 border-b-2 transition-colors',
                      activeTab === 'hk' ? 'text-[#1E1F2D] border-[#FF5C00]' : 'text-[#676770] border-transparent hover:text-[#1E1F2D]'
                    )}
                  >
                    港股Lv2
                  </button>
                  <button
                    onClick={() => { setActiveTab('us'); setStage('select'); setSelectedOption(null) }}
                    className={cn(
                      'text-sm font-medium pb-2 border-b-2 transition-colors',
                      activeTab === 'us' ? 'text-[#1E1F2D] border-[#FF5C00]' : 'text-[#676770] border-transparent hover:text-[#1E1F2D]'
                    )}
                  >
                    美股Lv1
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => { onClose(); setStage('select'); setSelectedOption(null) }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={cn('p-4 flex-1', confirmOpen ? 'overflow-hidden' : 'overflow-y-auto')}>
          {stage === 'select' && (
            <>
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

              <div className="bg-white rounded-lg border border-[#E6DCD5] overflow-hidden mb-4">
                <div className="bg-[#F4F5F6] px-4 py-2 text-center">
                  <h3 className="text-sm font-semibold text-[#1E1F2D]">高级行情介绍</h3>
                </div>
                <div className="divide-y divide-[#E6DCD5]">
                  <div className="grid grid-cols-3 bg-[rgba(145,156,173,0.1)]">
                    <div className="p-2 text-xs text-[#1E1F2D] font-medium">行情功能</div>
                    <div className="p-2 text-xs text-[#1E1F2D] font-medium border-l border-[#E6DCD5]">
                      {activeTab === 'hk' ? 'Level 1基础行情' : 'Level 0基础行情'}
                    </div>
                    <div className="p-2 text-xs text-[#1E1F2D] font-medium border-l border-[#E6DCD5] bg-[rgba(146,91,253,0.1)]">
                      {activeTab === 'hk' ? 'Level 2基础行情' : 'Level 1高级行情'}
                    </div>
                  </div>
                  {(activeTab === 'hk' ? [
                    { name: '行情功能', basic: 'Level 1基础行情', advanced: 'Level 2基础行情' },
                    { name: '行情数据', basic: '至少延迟15分钟', advanced: '实时行情' },
                    { name: '挂单盘口', basic: '1档', advanced: '10档深度盘口' },
                    { name: '经纪商列队', basic: '无', advanced: '有' },
                    { name: '逐笔成交明细', basic: '最新4笔', advanced: '全部' }
                  ] : [
                    { name: '行情功能', basic: 'Level 0基础行情', advanced: 'Level 1高级行情' },
                    { name: '行情数据', basic: '至少延迟15分钟', advanced: '实时行情' },
                    { name: '挂单盘口', basic: '无', advanced: '全美最佳买卖1档' },
                    { name: '逐笔成交明细', basic: '无', advanced: '有' }
                  ]).map((feature, index) => (
                    <div key={index} className="grid grid-cols-3">
                      <div className="p-2 text-xs text-[#1E1F2D]">{feature.name}</div>
                      <div className="p-2 text-xs text-[#1E1F2D] border-l border-[#E6DCD5]">{feature.basic}</div>
                      <div className="p-2 text-xs text-[#1E1F2D] border-l border-[#E6DCD5] bg-[rgba(146,91,253,0.1)]">{feature.advanced}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setStage('pay')} className="w-full bg-[#FF5C00] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#FF5C00]/90 transition-colors">
                立即购买
              </button>

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
            </>
          )}

          {stage === 'pay' && (
            <>
              <div className="bg-white rounded-lg border border-[#E6DCD5] overflow-hidden mb-3">
                <div className="px-4 py-2 grid grid-cols-2 text-[13px] text-[#8A8B96]">
                  <div className="flex space-x-2"><span>交易账号</span><span className="text-[#1E1F2D]">20301829</span></div>
                  <div className="flex justify-end space-x-2"><span>手机号</span><span className="text-[#1E1F2D]">153****2323</span></div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-[#E6DCD5] overflow-hidden mb-4">
                <div className="bg-[#F4F5F6] px-4 py-2">
                  <h3 className="text-sm font-semibold text-[#1E1F2D]">{activeTab === 'hk' ? '港股Lv2高级行情' : '美股Lv1高级行情'}</h3>
                </div>
                <div className="p-4 space-y-3">
                  {options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOption(opt)}
                      className={cn(
                        'w-full text-left border rounded px-3 py-2',
                        selectedOption?.id === opt.id
                          ? 'border-[#FF5C00] bg-[rgba(255,92,0,0.1)]'
                          : 'border-[rgba(145,156,173,0.2)] hover:border-[#C7BFB9]'
                      )}
                    >
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="text-[14px] text-[#1E1F2D]">{opt.title}</div>
                          <div className="mt-1 text-[12px] text-[#8A8B96]">{opt.subtitle}</div>
                        </div>
                        <div className="text-[#FF5C00] text-[16px] font-semibold">HK${opt.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-3">
                  <p className="text-[12px] text-[#8A8B96] text-center">高级行情购买后将与您的手机号和用户ID绑定。</p>
                </div>
              </div>

              <div className="text-center text-[12px] text-[#8A8B96] mb-2">
                确认支付则表示您已阅读并同意<span className="text-[#FF5C00]">《高级行情服务协议》</span>
              </div>

              <div className="sticky bottom-0 left-0 right-0 bg-[#F4F5F6]">
                <div className="bg-white shadow-[0_-2.5px_5px_rgba(18,28,47,0.05)] rounded-b-lg px-4 py-3 flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[12px] text-[#8A8B96]">总价：</span>
                    <span className="text-[#FF5C00] text-[16px] font-semibold">{totalPrice ? `HK${totalPrice.toFixed(2)}` : '-'}</span>
                  </div>
                  <button
                    disabled={!selectedOption}
                    onClick={() => setConfirmOpen(true)}
                    className={cn(
                      'min-w-[160px] h-10 rounded-full text-white text-sm',
                      !selectedOption ? 'bg-[#FF5C00]/60 cursor-not-allowed' : 'bg-[#FF5C00] hover:bg-[#FF5C00]/90'
                    )}
                  >
                    去支付
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === 'success' && (
            <>
              <div className="bg-white rounded-lg border border-[#E6DCD5] overflow-hidden mb-4">
                <div className="bg-[#F4F5F6] px-4 py-2">
                  <h3 className="text-sm font-semibold text-[#1E1F2D]">购买成功</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-[14px] text-[#1E1F2D]">您已成功订购{activeTab === 'hk' ? '港股Lv2高级行情' : '美股Lv1高级行情'}</div>
                  <div className="text-[13px] text-[#8A8B96]">订单信息</div>
                  <div className="space-y-2 text-[13px] text-[#1E1F2D]">
                    <div className="flex items-center justify-between"><span>订单编号</span><span>Blablabla-abcabc-001001-abcabc</span></div>
                    <div className="flex items-center justify-between"><span>交易账号</span><span>20301829</span></div>
                    <div className="flex items-center justify-between"><span>手机号</span><span>135****0888</span></div>
                    <div className="flex items-center justify-between"><span>到期时间</span><span>2019-11-08 23:59:59</span></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setStage('select')
                    setSelectedOption(null)
                  }}
                  className="text-[#FF5C00] text-sm"
                >
                  返回高级行情介绍
                </button>
              </div>
            </>
          )}
        </div>

        {confirmOpen && (
          <div className="absolute inset-0 z-30 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/20" onClick={() => setConfirmOpen(false)} />
            <div className="relative w-full bg-white rounded-t-2xl shadow-lg max-h-[70%] overflow-auto">
              <div className="p-4 border-b border-[#E6DCD5] text-center text-sm text-[#1E1F2D]">是否使用账户资金支付</div>
              <div className="p-4 space-y-2 text-[13px] text-[#8A8B96]">
                <div className="flex items-center justify-between">
                  <span>支付方式</span>
                  <span className="text-[#1E1F2D]">账户资金</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>应付金额</span>
                  <span className="text-[#FF5C00] font-semibold">{totalPrice ? `HK${totalPrice.toFixed(2)}` : '-'}</span>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <button className="h-10 rounded-full border border-[rgba(145,156,173,0.3)] text-[#1E1F2D] text-sm" onClick={() => setConfirmOpen(false)}>取消</button>
                <button
                  className="h-10 rounded-full bg-[#FF5C00] text-white text-sm hover:bg-[#FF5C00]/90"
                  onClick={() => {
                    setConfirmOpen(false)
                    setStage('success')
                  }}
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
