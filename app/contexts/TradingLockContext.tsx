'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Dialog, DialogContent, DialogHeader } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

interface TradingLockContextType {
  isTradeUnlocked: boolean
  showUnlockDialog: (onSuccess?: () => void) => void
  lockTrading: () => void
}

const TradingLockContext = createContext<TradingLockContextType | undefined>(undefined)

export function TradingLockProvider({ children }: { children: ReactNode }) {
  const [isTradeUnlocked, setIsTradeUnlocked] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null)

  const showUnlockDialog = (onSuccess?: () => void) => {
    if (!isTradeUnlocked) {
      setShowPasswordDialog(true)
      setOnSuccessCallback(onSuccess || null)
    }
  }

  const lockTrading = () => {
    setIsTradeUnlocked(false)
  }

  const handlePasswordSubmit = () => {
    if (password === '123456') { // 简单的密码验证，实际应用中应该更安全
      setIsTradeUnlocked(true)
      setShowPasswordDialog(false)
      setPassword('')
      setPasswordError('')
      
      // 执行成功回调
      if (onSuccessCallback) {
        onSuccessCallback()
        setOnSuccessCallback(null)
      }
    } else {
      setPasswordError('密码错误，请重新输入')
      setPassword('')
    }
  }

  const handleCancel = () => {
    setShowPasswordDialog(false)
    setPassword('')
    setPasswordError('')
    setOnSuccessCallback(null)
  }

  return (
    <TradingLockContext.Provider value={{
      isTradeUnlocked,
      showUnlockDialog,
      lockTrading
    }}>
      {children}

      {/* 全局密码输入对话框 */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[400px] p-6">
          <DialogHeader>
            <h2 className="text-lg font-semibold text-center">输入交易密码</h2>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="请输入6位交易密码"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError('')
                }}
                maxLength={6}
                className="text-center text-lg tracking-widest"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && password.length === 6) {
                    handlePasswordSubmit()
                  }
                }}
              />
              {passwordError && (
                <p className="text-sm text-red-500 text-center">{passwordError}</p>
              )}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleCancel}
              >
                取消
              </Button>
              <Button 
                className="flex-1 bg-[#FF5C00] hover:bg-[#e54f00]"
                onClick={handlePasswordSubmit}
                disabled={password.length !== 6}
              >
                确认
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TradingLockContext.Provider>
  )
}

export function useTradingLock() {
  const context = useContext(TradingLockContext)
  if (context === undefined) {
    throw new Error('useTradingLock must be used within a TradingLockProvider')
  }
  return context
}