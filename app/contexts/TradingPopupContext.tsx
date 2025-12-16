'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { TradingPopup } from '../components/trading-popup'

interface TradingPopupContextValue {
  openTradingPopup: (options?: { stockCode?: string; stockName?: string }) => void
  closeTradingPopup: () => void
}

const TradingPopupContext = createContext<TradingPopupContextValue | undefined>(
  undefined,
)

export function TradingPopupProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [presetStockCode, setPresetStockCode] = useState<string | undefined>()
  const [presetStockName, setPresetStockName] = useState<string | undefined>()

  const openTradingPopup = useCallback(
    (options?: { stockCode?: string; stockName?: string }) => {
      setPresetStockCode(options?.stockCode)
      setPresetStockName(options?.stockName)
      setOpen(true)
    },
    [],
  )

  const closeTradingPopup = useCallback(() => {
    setOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      openTradingPopup,
      closeTradingPopup,
    }),
    [openTradingPopup, closeTradingPopup],
  )

  return (
    <TradingPopupContext.Provider value={value}>
      {children}
      <TradingPopup
        open={open}
        onOpenChange={setOpen}
        initialStockCode={presetStockCode}
        initialStockName={presetStockName}
      />
    </TradingPopupContext.Provider>
  )
}

export function useTradingPopup() {
  const context = useContext(TradingPopupContext)
  if (!context) {
    throw new Error('useTradingPopup must be used within a TradingPopupProvider')
  }
  return context
}
