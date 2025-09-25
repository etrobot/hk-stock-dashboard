'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Dialog, DialogContent } from './ui/dialog'

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [loginMode, setLoginMode] = useState<'form' | 'qr'>('form')
  const [formData, setFormData] = useState({
    phone: '',
    verificationCode: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt:', formData)
    onClose()
  }

  const handleGetVerificationCode = () => {
    console.log('Get verification code for:', formData.phone)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="w-[900px] h-[454px] max-w-none p-0 bg-white rounded-[12.8px]"
        showCloseButton={false}
      >
        <div className="flex h-full">
          {/* Left Side - Brand */}
          <div className="w-[360px] h-full bg-[#000102] flex flex-col items-center justify-center relative rounded-l-[12.8px]">
            {/* Logo */}
            <div className="mb-8">
              <div className="text-[#D6BC96] text-center">
                <div className="text-2xl font-semibold mb-2">天风证券</div>
                <div className="text-sm opacity-60">TIANFENG SECURITIES</div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
              <div className="w-[6px] h-[6px] rounded-full border border-[#72737A] flex items-center justify-center">
                <span className="text-[4px] text-[#72737A]">C</span>
              </div>
              <span className="text-[6px] text-[#72737A]">2025 TIANFENG.</span>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-[360px] flex-1 p-[53px_0_0_53px] bg-white relative rounded-r-[12.8px]">
            {/* QR Code Corner */}
            <button 
              onClick={() => setLoginMode(loginMode === 'form' ? 'qr' : 'form')}
              className="absolute top-0 right-0 w-[50px] h-[50px] bg-[#F6F7F9] rounded-tr-[12.8px] hover:bg-gray-200 transition-colors"
            >
              <div className="w-full h-full flex items-center justify-center">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
                  <path d="M0 0L10.9873 0L10.9873 10.9873L0 10.9873L0 0ZM14.8328 0L14.8328 5.49363L12.6354 5.49363L12.6354 0L14.8328 0ZM16.4809 0L27.4682 0L27.4682 10.9873L16.4809 10.9873L16.4809 0ZM2.19745 2.19745L2.19745 8.78981L8.78981 8.78981L8.78981 2.19745L2.19745 2.19745ZM18.6783 2.19745L18.6783 8.78981L25.2707 8.78981L25.2707 2.19745L18.6783 2.19745ZM3.84554 3.84554L7.14172 3.84554L7.14172 7.14172L3.84554 7.14172L3.84554 3.84554ZM20.3264 3.84554L23.6226 3.84554L23.6226 7.14172L20.3264 7.14172L20.3264 3.84554ZM12.6354 14.8328L8.78981 14.8328L8.78981 12.6354L12.6354 12.6354L12.6354 8.78981L14.8328 8.78981L14.8328 18.6783L12.6354 18.6783L12.6354 14.8328ZM0 12.6354L5.49363 12.6354L5.49363 14.8328L0 14.8328L0 12.6354ZM21.9745 12.6354L27.4682 12.6354L27.4682 14.8328L21.9745 14.8328L21.9745 12.6354ZM0 27.4682L0 16.4809L10.9873 16.4809L10.9873 27.4682L0 27.4682ZM18.6783 18.6783L18.6783 23.6226L16.4809 23.6226L16.4809 16.4809L23.6226 16.4809L23.6226 18.6783L18.6783 18.6783ZM25.2707 25.2707L25.2707 16.4809L27.4682 16.4809L27.4682 27.4682L16.4809 27.4682L16.4809 25.2707L25.2707 25.2707ZM2.19745 18.6783L2.19745 25.2707L8.78981 25.2707L8.78981 18.6783L2.19745 18.6783ZM7.14172 20.3264L7.14172 23.6226L3.84554 23.6226L3.84554 20.3264L7.14172 20.3264ZM14.8328 21.9745L14.8328 27.4682L12.6354 27.4682L12.6354 21.9745L14.8328 21.9745Z" fill="#919CAD"/>
                </svg>
              </div>
            </button>

            {/* Content */}
            <div className="w-[225px]">
              {loginMode === 'form' ? (
                <>
                  {/* Title */}
                  <h2 className="text-[20px] font-semibold text-[#1E1F2D] mb-[58px]">验证码登录/注册</h2>

              <form onSubmit={handleSubmit} className="space-y-[43px]">
                {/* Phone Input */}
                <div className="relative">
                  <div className="h-[35px] border-b border-[rgba(145,156,173,0.2)] flex items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-[#1E1F2D]">+86</span>
                      <ChevronDown className="w-[7px] h-[4px] text-[#919CAD]" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 ml-[29px] bg-transparent text-[11px] text-[#1E1F2D] placeholder-[#8A8B96] focus:outline-none"
                      placeholder="请输入手机号"
                      required
                    />
                  </div>
                </div>

                {/* Verification Code Input */}
                <div className="relative">
                  <div className="h-[35px] border-b border-[rgba(145,156,173,0.2)] flex items-center">
                    <span className="whitespace-nowrap text-[11px] text-[#1E1F2D]">验证码</span>
                    <input
                      type="text"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleInputChange}
                      className="flex-1 ml-[15px] bg-transparent text-[11px] text-[#1E1F2D] placeholder-[#8A8B96] focus:outline-none"
                      placeholder="请输入验证码"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleGetVerificationCode}
                      className="whitespace-nowrap text-[11px] text-[#FF5C00] hover:opacity-80 transition-opacity"
                    >
                      获取验证码
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-[8px]">
                  <button
                    type="submit"
                    className="w-full h-[32px] bg-[#FF5C00] text-white text-[11px] rounded-[15.75px] hover:opacity-70 transition-opacity disabled:opacity-50"
                    disabled={!formData.phone || !formData.verificationCode}
                  >
                    登录/注册
                  </button>
                                  {/* Help Link */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-[10px] text-[#FF5C00] hover:opacity-80 transition-opacity"
                  >
                    旧手机号无法使用？
                  </button>
                </div>
                </div>


              </form>
                                            {/* WeChat QR Code */}
                                            <div className='w-full'>
                                            <div className="mx-auto w-[26px] h-[26px] rounded-full bg-[rgba(145,156,173,0.2)] flex items-center justify-center">
                <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
                  <path d="M10.83 4.03324C11.014 4.03324 11.195 4.04756 11.377 4.06802C10.887 1.73379 8.448 0 5.663 0C2.55 0 0 2.16954 0 4.92622C0 6.51681 0.848 7.82304 2.266 8.83774L1.7 10.5797L3.68 9.56502C4.388 9.7072 4.956 9.85449 5.663 9.85449C5.841 9.85449 6.017 9.84631 6.191 9.83301C6.081 9.44534 6.016 9.04028 6.016 8.61782C6.017 6.0872 8.141 4.03324 10.83 4.03324ZM2.97 3.18629C2.97 3.62 3.398 3.9105 3.823 3.9105C4.248 3.9105 4.53 3.62 4.53 3.18629C4.53 2.74952 4.248 2.46311 3.823 2.46311C3.398 2.46311 2.97 2.75054 2.97 3.18629ZM8.495 3.18629C8.495 2.75054 8.214 2.46311 7.786 2.46311C7.362 2.46311 6.937 2.74952 6.937 3.18629C6.937 3.62 7.363 3.9105 7.786 3.9105C8.214 3.9105 8.495 3.62 8.495 3.18629ZM16 8.54827C16 6.23245 13.734 4.34522 11.189 4.34522C8.494 4.34522 6.373 6.23347 6.373 8.54827C6.373 10.8702 8.495 12.7513 11.189 12.7513C11.753 12.7513 12.322 12.6071 12.888 12.4618L14.441 13.3333L14.015 11.8849C15.152 11.0114 16 9.85449 16 8.54827ZM9.061 7.24409C9.061 7.53663 9.346 7.82304 9.627 7.82304C10.057 7.82304 10.336 7.53663 10.336 7.24409C10.336 6.95563 10.057 6.66513 9.627 6.66513C9.346 6.66513 9.061 6.95563 9.061 7.24409ZM12.179 7.24409C12.179 7.53663 12.463 7.82304 12.742 7.82304C13.168 7.82304 13.451 7.53663 13.451 7.24409C13.451 6.95563 13.168 6.66513 12.742 6.66513C12.462 6.66513 12.179 6.95563 12.179 7.24409Z" fill="#00C15E"/>
                </svg>
              </div>
              </div>
                </>
              ) : (
                <>
                  {/* QR Code Login */}
                  <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-[20px] font-semibold text-[#1E1F2D] mb-[30px]">扫码登录</h2>
                    
                    {/* QR Code */}
                    <div className="w-[160px] h-[160px] bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-[20px]">
                      <div className="w-[140px] h-[140px] bg-gray-100 rounded flex items-center justify-center">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                          <rect width="80" height="80" fill="#f0f0f0"/>
                          <path d="M10 10h15v15H10V10zm20 0h5v5h-5v-5zm10 0h15v15H40V10zM10 30h5v5h-5v-5zm10 0h5v5h-5v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5zM10 40h15v15H10V40zm20 0h5v5h-5v-5zm10 0h15v15H40V40zM10 60h5v5h-5v-5zm10 0h5v5h-5v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5z" fill="#333"/>
                        </svg>
                      </div>
                    </div>
                    
                    <p className="text-[12px] text-[#72737A] text-center mb-[10px]">
                      使用天风证券APP扫码登录
                    </p>
                    
                    <button
                      onClick={() => setLoginMode('form')}
                      className="text-[10px] text-[#FF5C00] hover:opacity-80 transition-opacity"
                    >
                      使用手机号登录
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

      </DialogContent>

    </Dialog>
  )
}