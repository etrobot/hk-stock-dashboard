'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { useTradingLock } from '../contexts/TradingLockContext'
import { ConditionalOrdersPanel } from './ConditionalOrdersPanel'
import { useLanguage } from '../contexts/LanguageContext'
import { TradingForm } from './shared/TradingForm'
import { TradingTabs } from './shared/TradingTabs'

interface TradingPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TradingPopup({ open, onOpenChange }: TradingPopupProps) {
  const { t } = useLanguage()
  const [selectedAccount, setSelectedAccount] = useState('孖展账户12345678')
  const [stockCode, setStockCode] = useState('00005')
  const [orderType, setOrderType] = useState('order_type.enhanced_limit')
  const [price, setPrice] = useState('2')
  const [quantity, setQuantity] = useState('2')
  const [market, setMarket] = useState('全部')
  const [currency, setCurrency] = useState('USD')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmDirection, setConfirmDirection] = useState<'buy' | 'sell' | null>(null)
  const { isTradeUnlocked, showUnlockDialog } = useTradingLock()

  const adjustPrice = (delta: number) => {
    const cur = parseFloat(price)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    setPrice(next.toFixed(3))
  }

  const adjustQuantity = (delta: number) => {
    const cur = parseInt(quantity, 10)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    setQuantity(String(next))
  }

  const accountData = {
    balance: '0.00',
    cashAvailable: '0',
    positionSellable: '0',
    maxBuyable: '0',
    shortSellable: '-'
  }

  const holdings = [
    {
      code: '00005',
      name: '汇丰控股',
      holdingQty: '2',
      availableQty: '2',
      currentPrice: '98.450',
      avgCost: '62.15',
      marketValue: '196.90',
      unrealizedPnlRatio: '+58.33%',
      totalPnl: '+72.60',
      unrealizedPnl: '+72.60',
      realizedPnl: '0.00',
      todayPnl: '+2.80',
      positionRatio: '49.93%'
    }
  ]

  const todayOrders = [
    {
      code: stockCode,
      name: '汇丰控股',
      orderTime: '2023-10-01 09:00',
      orderPrice: '98.45',
      avgPrice: '98.45',
      orderQuantity: '1',
      filledQuantity: '0',
      direction: 'buy' as const,
      status: 'pending' as const
    }
  ]

  const todayTransactions = [
    {
      code: stockCode,
      name: '汇丰控股',
      executionTime: '2023-10-01 09:05',
      executionQuantity: '1',
      direction: 'buy' as const,
      executionAmount: '98.45'
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:!max-w-[84rem] max-h-[90vh] overflow-y-auto p-0 bg-background">
        <div className="p-3 relative">
          <DialogHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="bg-input text-xs h-6 px-2 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="孖展账户12345678" className="text-xs">孖展账户12345678</SelectItem>
                    <SelectItem value="现金账户888888" className="text-xs">现金账户888888</SelectItem>
                    <SelectItem value="VA账户12345678" className="text-xs">VA账户12345678</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogHeader>

<Tabs defaultValue="trade">
  <TabsList className="bg-transparent p-0 border-b border-border rounded-none h-auto">
    <TabsTrigger value="trade" className="rounded-none border-0 h-auto px-3 py-2 text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
      {t('tab.trade')}
    </TabsTrigger>
  </TabsList>
  <TabsContent value="trade" className="mt-3">

          <div className="grid grid-cols-3 gap-6">
            <TradingForm
              stockCode={stockCode}
              setStockCode={setStockCode}
              orderType={orderType}
              setOrderType={setOrderType}
              price={price}
              setPrice={setPrice}
              quantity={quantity}
              setQuantity={setQuantity}
              adjustPrice={adjustPrice}
              adjustQuantity={adjustQuantity}
              accountData={accountData}
              onBuy={() => { setConfirmDirection('buy'); setConfirmOpen(true) }}
              onSell={() => { setConfirmDirection('sell'); setConfirmOpen(true) }}
              nameBelowCode={'汇丰控股'}
            />
            <div className="col-span-2">
              <TradingTabs
                stockCode={stockCode}
                holdings={holdings}
                todayOrders={todayOrders}
                todayTransactions={todayTransactions}
                market={market}
                setMarket={setMarket}
                currency={currency}
                setCurrency={setCurrency}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="conditional" className="mt-3">
          <ConditionalOrdersPanel />
        </TabsContent>
      </Tabs>
        
        {!isTradeUnlocked && (
          <div className="absolute inset-0 bg-background/70 z-50 flex items-center justify-center">
            <Button
              className="rounded-full w-16 h-16 p-0 bg-[#FF5C00] hover:bg-[#e54f00]"
              onClick={() => showUnlockDialog()}
            >
              <Lock className="w-7 h-7 text-white" />
            </Button>
          </div>
        )}

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="sm:max-w-md p-4">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-foreground">{t('confirm.account_type')}</span>
                <span className="text-foreground">{selectedAccount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{t('confirm.direction')}</span>
                <span className="text-foreground">{confirmDirection === 'buy' ? t('orders.buy') : t('orders.sell')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{t('confirm.code')}</span>
                <span className="text-foreground">腾讯控股(00700.HK)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{t('confirm.order_type')}</span>
                <span className="text-foreground">{t(orderType)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{t('confirm.price')}</span>
                <span className="text-foreground">828383港元</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{t('confirm.quantity')}</span>
                <span className="text-foreground">1000股</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{t('confirm.amount')}</span>
                <span className="text-foreground">4,323.88港元</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 h-7" onClick={() => setConfirmOpen(false)}>{t('common.cancel')}</Button>
                <Button className="flex-1 h-7 bg-[#FF5C00] hover:bg-[#e54f00] text-white" onClick={() => setConfirmOpen(false)}>
                  {confirmDirection === 'buy' ? t('confirm.confirm_buy') : t('confirm.confirm_sell')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  )
}
