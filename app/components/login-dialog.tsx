'use client'

import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Dialog, DialogContent } from './ui/dialog'
import { toast } from '@/hooks/use-toast'

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

type LoginMode = 'sms' | 'password' | 'qr'
type PasswordStep = 'setup' | 'login' | 'forgot-password'

interface SessionCredentials {
  phone: string
  password: string
}

const inputClassName =
  'flex-1 bg-transparent text-[11px] text-[#1E1F2D] placeholder-[#8A8B96] focus:outline-none'
const rowClassName = 'h-[35px] border-b border-[rgba(145,156,173,0.2)] flex items-center'
const linkClassName = 'text-[10px] text-[#FF5C00] hover:opacity-80 transition-opacity'
const submitClassName =
  'w-full h-[32px] bg-[#FF5C00] text-white text-[11px] rounded-[15.75px] hover:opacity-70 transition-opacity disabled:opacity-50'

function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return '密码6到14位，且包含数字和字母'
  }
  if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    return '密码6到14位，且包含数字和字母'
  }
  return null
}

function PhoneInput({
  value,
  onChange,
  className = 'ml-[29px]',
  readOnly = false,
}: {
  value: string
  onChange: (value: string) => void
  className?: string
  readOnly?: boolean
}) {
  return (
    <div className={rowClassName}>
      <div className="flex items-center space-x-2">
        <span className="text-[11px] text-[#1E1F2D]">+86</span>
        <ChevronDown className="w-[7px] h-[4px] text-[#919CAD]" />
      </div>
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClassName} ${className}`}
        placeholder="请输入手机号"
        readOnly={readOnly}
        required
      />
    </div>
  )
}

function VerificationCodeInput({
  value,
  onChange,
  onGetCode,
  phone,
}: {
  value: string
  onChange: (value: string) => void
  onGetCode: () => void
  phone: string
}) {
  return (
    <div className={rowClassName}>
      <span className="whitespace-nowrap text-[11px] text-[#1E1F2D]">验证码</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClassName} ml-[15px]`}
        placeholder="请输入验证码"
        required
      />
      <button
        type="button"
        onClick={onGetCode}
        disabled={!phone}
        className="whitespace-nowrap text-[11px] text-[#FF5C00] hover:opacity-80 transition-opacity disabled:opacity-40"
      >
        获取验证码
      </button>
    </div>
  )
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [loginMode, setLoginMode] = useState<LoginMode>('sms')
  const [passwordStep, setPasswordStep] = useState<PasswordStep>('setup')
  const [setupError, setSetupError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [forgotError, setForgotError] = useState('')
  const [setupSuccessHint, setSetupSuccessHint] = useState('')
  const [sessionCredentials, setSessionCredentials] = useState<SessionCredentials | null>(null)
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null)
  const [showPasswordLoginButton, setShowPasswordLoginButton] = useState(false)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)

  const [smsForm, setSmsForm] = useState({ phone: '', verificationCode: '' })
  const [passwordForm, setPasswordForm] = useState({ phone: '', password: '' })
  const [setupForm, setSetupForm] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [forgotForm, setForgotForm] = useState({
    newPassword: '',
    confirmPassword: '',
    phone: '',
    verificationCode: '',
  })

  useEffect(() => {
    localStorage.removeItem('hk-stock-demo-login')
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setSetupError('')
      setLoginError('')
      setForgotError('')
      setSetupSuccessHint('')
      setSmsForm({ phone: '', verificationCode: '' })
      setSetupForm({ newPassword: '', confirmPassword: '' })
      setForgotForm({ newPassword: '', confirmPassword: '', phone: '', verificationCode: '' })

      if (!onboardingCompleted) {
        setLoginMode('sms')
        setPasswordStep('setup')
        setVerifiedPhone(null)
        setSessionCredentials(null)
        setShowPasswordLoginButton(false)
        setPasswordForm({ phone: '', password: '' })
      } else {
        setPasswordForm((prev) => ({ ...prev, password: '' }))
      }
      return
    }

    if (onboardingCompleted && sessionCredentials) {
      setLoginMode('password')
      setPasswordStep('login')
      setPasswordForm({ phone: sessionCredentials.phone, password: '' })
      setShowPasswordLoginButton(true)
      console.log('[LoginDialog] 已完成 onboarding，默认密码登录')
    }
  }, [isOpen, onboardingCompleted, sessionCredentials])

  const handleGetVerificationCode = (phone: string, scene: string) => {
    console.log('[LoginDialog] 获取验证码:', { phone, scene })
    toast({
      title: '验证码已发送',
      description: `Demo 模式：任意验证码均可通过（手机号 ${phone}）`,
    })
  }

  const backToSmsLogin = () => {
    setLoginMode('sms')
    setPasswordStep('setup')
    setSetupError('')
    setForgotError('')
    setVerifiedPhone(null)
    console.log('[LoginDialog] 返回验证码登录')
  }

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[LoginDialog] 验证码登录成功，进入首次设置密码:', smsForm)

    setVerifiedPhone(smsForm.phone)
    setLoginMode('password')
    setPasswordStep('setup')
    setSetupError('')
    setSetupForm({ newPassword: '', confirmPassword: '' })

    toast({
      title: '验证码验证成功',
      description: '请设置您的登录密码',
    })
  }

  const enterPasswordLogin = () => {
    if (!sessionCredentials) {
      console.log('[LoginDialog] 尚未完成密码设置，无法密码登录')
      return
    }

    setLoginMode('password')
    setPasswordStep('login')
    setLoginError('')
    setSetupSuccessHint('')
    setPasswordForm({ phone: sessionCredentials.phone, password: '' })
    console.log('[LoginDialog] 进入密码登录:', { phone: sessionCredentials.phone })
  }

  const enterForgotPassword = () => {
    setPasswordStep('forgot-password')
    setForgotError('')
    setForgotForm({
      newPassword: '',
      confirmPassword: '',
      phone: sessionCredentials?.phone || passwordForm.phone || '',
      verificationCode: '',
    })
    console.log('[LoginDialog] 进入重置密码')
  }

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForgotError('')

    if (!forgotForm.phone || !forgotForm.verificationCode) {
      setForgotError('请填写手机号和验证码')
      return
    }

    const passwordError = validatePassword(forgotForm.newPassword)
    if (passwordError) {
      setForgotError(passwordError)
      console.log('[LoginDialog] 重置密码校验失败: 密码格式不符')
      return
    }

    if (forgotForm.newPassword !== forgotForm.confirmPassword) {
      setForgotError('两次输入的密码不一致')
      console.log('[LoginDialog] 重置密码校验失败: 密码不一致')
      return
    }

    const credentials = { phone: forgotForm.phone, password: forgotForm.newPassword }
    setSessionCredentials(credentials)
    setShowPasswordLoginButton(true)
    setOnboardingCompleted(true)

    console.log('[LoginDialog] 重置密码成功:', { phone: forgotForm.phone })

    setPasswordStep('login')
    setPasswordForm({ phone: forgotForm.phone, password: '' })
    setSetupSuccessHint('密码已重置，请使用新密码登录')
    setForgotForm({ newPassword: '', confirmPassword: '', phone: '', verificationCode: '' })

    toast({
      title: '密码重置成功',
      description: '请使用新密码登录',
    })
  }

  const handleSetupPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSetupError('')

    const phone = verifiedPhone
    if (!phone) {
      setSetupError('请先完成手机验证码登录')
      console.log('[LoginDialog] 设置密码失败: 未验证手机号')
      return
    }

    const passwordError = validatePassword(setupForm.newPassword)
    if (passwordError) {
      setSetupError(passwordError)
      console.log('[LoginDialog] 设置密码校验失败: 密码格式不符')
      return
    }

    if (setupForm.newPassword !== setupForm.confirmPassword) {
      setSetupError('两次输入的密码不一致')
      console.log('[LoginDialog] 设置密码校验失败: 密码不一致')
      return
    }

    const credentials = { phone, password: setupForm.newPassword }
    setSessionCredentials(credentials)

    console.log('[LoginDialog] 首次设置密码成功，进入密码登录:', { phone })

    setPasswordStep('login')
    setPasswordForm({ phone, password: '' })
    setSetupSuccessHint('密码设置成功，请使用密码登录')
    setSetupForm({ newPassword: '', confirmPassword: '' })

    toast({
      title: '密码设置成功',
      description: '请继续完成密码登录',
    })
  }

  const handlePasswordLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (
      !sessionCredentials ||
      sessionCredentials.phone !== passwordForm.phone ||
      sessionCredentials.password !== passwordForm.password
    ) {
      setLoginError('手机号或密码错误')
      console.log('[LoginDialog] 密码登录失败:', { phone: passwordForm.phone })
      return
    }

    console.log('[LoginDialog] 密码登录成功:', { phone: passwordForm.phone })
    setOnboardingCompleted(true)
    setShowPasswordLoginButton(true)

    toast({
      title: '登录成功',
      description: `欢迎回来，${passwordForm.phone}`,
    })
    onClose()
  }

  const renderSmsLogin = () => (
    <>
      <h2 className="text-[20px] font-semibold text-[#1E1F2D] mb-[58px]">验证码登录/注册</h2>

      <form onSubmit={handleSmsSubmit} className="space-y-[43px]">
        <PhoneInput
          value={smsForm.phone}
          onChange={(phone) => setSmsForm((prev) => ({ ...prev, phone }))}
        />

        <VerificationCodeInput
          value={smsForm.verificationCode}
          onChange={(verificationCode) => setSmsForm((prev) => ({ ...prev, verificationCode }))}
          phone={smsForm.phone}
          onGetCode={() => handleGetVerificationCode(smsForm.phone, 'sms_login')}
        />

        <div className="pt-[8px] space-y-3">
          <button
            type="submit"
            className={submitClassName}
            disabled={!smsForm.phone || !smsForm.verificationCode}
          >
            登录/注册
          </button>

          <div className={`flex items-center ${showPasswordLoginButton ? 'justify-between' : 'justify-end'}`}>
            {showPasswordLoginButton && (
              <button type="button" className={linkClassName} onClick={enterPasswordLogin}>
                密码登录
              </button>
            )}
            <button type="button" className={linkClassName}>
              旧手机号无法使用？
            </button>
          </div>
        </div>
      </form>
    </>
  )

  const renderSetupPassword = () => (
    <>
      <h2 className="text-[20px] font-semibold text-[#1E1F2D] mb-[30px]">首次登录设置密码</h2>
      <p className="text-[10px] text-[#72737A] mb-[24px] leading-relaxed">
        手机验证码已通过，请设置您的登录密码
      </p>

      <form onSubmit={handleSetupPasswordSubmit} className="space-y-[28px]">
        {verifiedPhone && (
          <PhoneInput value={verifiedPhone} onChange={() => {}} readOnly />
        )}

        <div className={rowClassName}>
          <span className="whitespace-nowrap text-[11px] text-[#1E1F2D]">新密码</span>
          <input
            type="password"
            value={setupForm.newPassword}
            onChange={(e) => setSetupForm((prev) => ({ ...prev, newPassword: e.target.value }))}
            className={`${inputClassName} ml-[15px]`}
            placeholder="至少6位，包含数字和字母"
            required
          />
        </div>

        <div className={rowClassName}>
          <span className="whitespace-nowrap text-[11px] text-[#1E1F2D]">确认密码</span>
          <input
            type="password"
            value={setupForm.confirmPassword}
            onChange={(e) => setSetupForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            className={`${inputClassName} ml-[15px]`}
            placeholder="请再次输入密码"
            required
          />
        </div>

        {setupError && <p className="text-[10px] text-red-500">{setupError}</p>}

        <div className="pt-[4px] space-y-3">
          <button
            type="submit"
            className={submitClassName}
            disabled={!setupForm.newPassword || !setupForm.confirmPassword}
          >
            完成设置
          </button>

          <div className="text-right">
            <button type="button" className={linkClassName} onClick={backToSmsLogin}>
              验证码登录
            </button>
          </div>
        </div>
      </form>
    </>
  )

  const renderPasswordLogin = () => (
    <>
      <h2 className="text-[20px] font-semibold text-[#1E1F2D] mb-[30px]">密码登录</h2>

      {setupSuccessHint && (
        <p className="text-[10px] text-[#00A854] mb-[24px] leading-relaxed">{setupSuccessHint}</p>
      )}

      <form onSubmit={handlePasswordLoginSubmit} className="space-y-[43px]">
        <PhoneInput
          value={passwordForm.phone}
          onChange={(phone) => setPasswordForm((prev) => ({ ...prev, phone }))}
        />

        <div className={rowClassName}>
          <span className="whitespace-nowrap text-[11px] text-[#1E1F2D]">密码</span>
          <input
            type="password"
            value={passwordForm.password}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, password: e.target.value }))}
            className={`${inputClassName} ml-[15px]`}
            placeholder="请输入登录密码"
            required
          />
        </div>

        {loginError && <p className="text-[10px] text-red-500">{loginError}</p>}

        <div className="pt-[8px] space-y-3">
          <button
            type="submit"
            className={submitClassName}
            disabled={!passwordForm.phone || !passwordForm.password}
          >
            登录
          </button>

          <div className="flex items-center justify-between">
            <button type="button" className={linkClassName} onClick={() => setLoginMode('sms')}>
              验证码登录
            </button>
            <button type="button" className={linkClassName} onClick={enterForgotPassword}>
              重置密码
            </button>
          </div>
        </div>
      </form>
    </>
  )

  const renderResetPassword = () => (
    <>
      <h2 className="text-[20px] font-semibold text-[#1E1F2D] mb-[24px]">重置密码</h2>
      <p className="text-[10px] text-[#72737A] mb-[20px] leading-relaxed">
        请先设置新密码，再验证手机号
      </p>

      <form onSubmit={handleResetPasswordSubmit} className="space-y-[22px]">
        <div className={rowClassName}>
          <span className="whitespace-nowrap text-[11px] text-[#1E1F2D]">新密码</span>
          <input
            type="password"
            value={forgotForm.newPassword}
            onChange={(e) => setForgotForm((prev) => ({ ...prev, newPassword: e.target.value }))}
            className={`${inputClassName} ml-[15px]`}
            placeholder="至少6位，包含数字和字母"
            required
          />
        </div>

        <div className={rowClassName}>
          <span className="whitespace-nowrap text-[11px] text-[#1E1F2D]">确认密码</span>
          <input
            type="password"
            value={forgotForm.confirmPassword}
            onChange={(e) => setForgotForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            className={`${inputClassName} ml-[15px]`}
            placeholder="请再次输入密码"
            required
          />
        </div>

        <PhoneInput
          value={forgotForm.phone}
          onChange={(phone) => setForgotForm((prev) => ({ ...prev, phone }))}
        />

        <VerificationCodeInput
          value={forgotForm.verificationCode}
          onChange={(verificationCode) => setForgotForm((prev) => ({ ...prev, verificationCode }))}
          phone={forgotForm.phone}
          onGetCode={() => handleGetVerificationCode(forgotForm.phone, 'reset_password')}
        />

        {forgotError && <p className="text-[10px] text-red-500">{forgotError}</p>}

        <div className="pt-[4px] space-y-3">
          <button
            type="submit"
            className={submitClassName}
            disabled={
              !forgotForm.phone ||
              !forgotForm.verificationCode ||
              !forgotForm.newPassword ||
              !forgotForm.confirmPassword
            }
          >
            完成重置
          </button>

          <div className="text-right">
            <button
              type="button"
              className={linkClassName}
              onClick={() => {
                setPasswordStep('login')
                setForgotError('')
              }}
            >
              返回密码登录
            </button>
          </div>
        </div>
      </form>
    </>
  )

  const renderPasswordMode = () => {
    switch (passwordStep) {
      case 'setup':
        return renderSetupPassword()
      case 'login':
        return renderPasswordLogin()
      case 'forgot-password':
        return renderResetPassword()
      default:
        return renderPasswordLogin()
    }
  }

  const renderQrLogin = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-[20px] font-semibold text-[#1E1F2D] mb-[30px]">扫码登录</h2>

      <div className="w-[160px] h-[160px] bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-[20px]">
        <div className="w-[140px] h-[140px] bg-gray-100 rounded flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" fill="#f0f0f0" />
            <path
              d="M10 10h15v15H10V10zm20 0h5v5h-5v-5zm10 0h15v15H40V10zM10 30h5v5h-5v-5zm10 0h5v5h-5v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5zM10 40h15v15H10V40zm20 0h5v5h-5v-5zm10 0h15v15H40V40zM10 60h5v5h-5v-5zm10 0h5v5h-5v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5z"
              fill="#333"
            />
          </svg>
        </div>
      </div>

      <p className="text-[12px] text-[#72737A] text-center mb-[10px]">使用天风证券APP扫码登录</p>

      <button onClick={() => setLoginMode('sms')} className={linkClassName}>
        使用手机号登录
      </button>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="w-[900px] h-[454px] max-w-none p-0 bg-white rounded-[12.8px]"
        showCloseButton={false}
      >
        <div className="flex h-full">
          <div className="w-[360px] h-full bg-[#000102] flex flex-col items-center justify-center relative rounded-l-[12.8px]">
            <div className="mb-8">
              <div className="text-[#D6BC96] text-center">
                <div className="text-2xl font-semibold mb-2">天风证券</div>
                <div className="text-sm opacity-60">TIANFENG SECURITIES</div>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
              <div className="w-[6px] h-[6px] rounded-full border border-[#72737A] flex items-center justify-center">
                <span className="text-[4px] text-[#72737A]">C</span>
              </div>
              <span className="text-[6px] text-[#72737A]">2025 TIANFENG.</span>
            </div>
          </div>

          <div className="w-[360px] flex-1 p-[53px_0_0_53px] bg-white relative rounded-r-[12.8px]">
            <div className="w-[225px]">
              {loginMode === 'sms' && renderSmsLogin()}
              {loginMode === 'password' && renderPasswordMode()}
              {loginMode === 'qr' && renderQrLogin()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
