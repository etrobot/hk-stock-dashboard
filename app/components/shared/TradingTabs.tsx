"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { OrderTable } from './OrderTable'
import { TransactionTable } from './TransactionTable'
import { useLanguage } from '../../contexts/LanguageContext'

interface Holding {
  code: string
  name: string
  holdingQty: string
  availableQty: string
  currentPrice: string
  avgCost: string
  marketValue: string
  unrealizedPnlRatio: string
  totalPnl: string
  todayPnl: string
  positionRatio: string
}

interface OrderItem {
  code: string
  name: string
  orderTime: string
  orderPrice: string
  avgPrice: string
  orderQuantity: string
  filledQuantity: string
  direction: 'buy' | 'sell'
  status: 'pending' | 'filled' | 'cancelled' | 'partial'
}

interface TransactionItem {
  code: string
  name: string
  executionTime: string
  executionQuantity: string
  direction: 'buy' | 'sell'
  executionAmount: string
}

interface TradingTabsProps {
  onHoldingSelect?: (code: string, availableQty: string) => void;
  stockCode: string
  holdings: Holding[]
  todayOrders: OrderItem[]
  todayTransactions: TransactionItem[]
  market: string
  setMarket: (v: string) => void
  currency: string
  setCurrency: (v: string) => void
}

export function TradingTabs({
  stockCode,
  holdings,
  todayOrders,
  todayTransactions,
  market,
  setMarket,
  currency,
  setCurrency,
  onHoldingSelect,
}: TradingTabsProps) {
  const { t } = useLanguage()
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Select value={market} onValueChange={setMarket}>
          <SelectTrigger className="bg-input text-xs h-5 px-2">
            <SelectValue placeholder={t('filters.all_markets')} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="全部" className="text-xs">{t('market.all')}</SelectItem>
            <SelectItem value="港股" className="text-xs">{t('market.hk')}</SelectItem>
            <SelectItem value="美股" className="text-xs">{t('market.us')}</SelectItem>
            <SelectItem value="沪深" className="text-xs">{t('market.cn')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="bg-input text-xs h-5 px-2">
            <SelectValue placeholder={t('filters.all_currencies')} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="USD" className="text-xs">USD</SelectItem>
            <SelectItem value="HKD" className="text-xs">HKD</SelectItem>
            <SelectItem value="CNY" className="text-xs">CNY</SelectItem>
            <SelectItem value="USDT" className="text-xs">USDT</SelectItem>
          </SelectContent>
        </Select>
        <Input 
          placeholder={t('filters.search_placeholder')}
          className="text-xs h-5 px-3 flex-1 bg-input"
        />
      </div>

      <div className="space-y-2">
        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="bg-transparent p-0 border-b border-border rounded-none h-auto">
            <TabsTrigger value="holdings" className="rounded-none border-0 h-auto px-3 py-2 text-xs text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
              {t('tabs.holdings')}
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-none border-0 h-auto px-3 py-2 text-xs text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
              {`${t('tabs.orders')}(0)`}
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-none border-0 h-auto px-3 py-2 text-xs text-muted-foreground data-[state=active]:border-b-2 data-[state=active]:border-[#FF5C00] data-[state=active]:text-foreground">
              {t('tabs.history')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="holdings" className="mt-2">
            <div className="overflow-x-auto">
              <div className="w-max">
                <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground pb-1 whitespace-nowrap min-w-max">
                  <div>{t('holdings.operation')}</div>
                  <div>{t('holdings.code')}</div>
                  <div>{t('holdings.name')}</div>
                  <div className="text-right">{t('holdings.quantity')}</div>
                  <div className="text-right">{t('holdings.available_quantity')}</div>
                  <div className="text-right">{t('holdings.current_price')}</div>
                  <div className="text-right">{t('holdings.cost_price')}</div>
                  <div className="text-right">{t('holdings.market_value')}</div>
                  <div className="text-right">{t('holdings.profit_loss_ratio')}</div>
                  <div className="text-right">{t('holdings.profit_loss_amount')}</div>
                  <div className="text-right">{t('holdings.today_profit_loss')}</div>
                  <div className="text-right">{t('holdings.position_ratio')}</div>
                </div>
                {holdings.map((holding, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 text-xs whitespace-nowrap cursor-pointer hover:bg-accent/40 rounded" onClick={() => onHoldingSelect?.(holding.code, holding.availableQty)}>
                    <div className="text-[#3B78F1]">{t('actions.trade')}</div>
                    <div className="text-foreground">{holding.code}</div>
                    <div className="text-foreground">{holding.name}</div>
                    <div className="text-right text-foreground">{holding.holdingQty}</div>
                    <div className="text-right text-foreground">{holding.availableQty}</div>
                    <div className="text-right text-foreground">{holding.currentPrice}</div>
                    <div className="text-right text-foreground">{holding.avgCost}</div>
                    <div className="text-right text-foreground">{holding.marketValue}</div>
                    <div className="text-right text-[#16BA71]">{holding.unrealizedPnlRatio}</div>
                    <div className="text-right text-[#16BA71]">{holding.totalPnl}</div>
                    <div className="text-right text-[#16BA71]">{holding.todayPnl}</div>
                    <div className="text-right text-foreground">{holding.positionRatio}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="orders" className="mt-2">
            <div className="overflow-x-auto">
              <OrderTable orders={todayOrders} className="text-xs" />
            </div>
            <div className="mt-3 overflow-x-auto">
              <div className="w-max">
                <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground pb-1 whitespace-nowrap min-w-max">
                  <div>{t('orders.code_name')}</div>
                  <div>{t('orders.direction')}</div>
                  <div className="text-right">{t('transactions.execution_quantity')}</div>
                  <div className="text-right">{t('transactions.execution_price')}</div>
                  <div className="text-right">{t('transactions.execution_amount')}</div>
                </div>
                {todayTransactions.map((tx, idx) => {
                  const qty = parseFloat(tx.executionQuantity)
                  const amt = parseFloat(tx.executionAmount)
                  const price = isNaN(qty) || qty === 0 ? '-' : (amt / qty).toFixed(3)
                  return (
                    <div key={idx} className="grid grid-cols-5 gap-2 text-xs whitespace-nowrap rounded">
                      <div className="text-foreground">{`${stockCode} ${tx.name}`}</div>
                      <div className={tx.direction === 'buy' ? 'text-[#16BA71]' : 'text-[#F44345]'}>{tx.direction === 'buy' ? t('orders.buy') : t('orders.sell')}</div>
                      <div className="text-right text-foreground">{tx.executionQuantity}</div>
                      <div className="text-right text-foreground">{price}</div>
                      <div className="text-right text-foreground">{tx.executionAmount}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history" className="mt-2">
            <div className="overflow-x-auto">
              <OrderTable orders={todayOrders} className="text-xs" showOperation={false} />
            </div>
            <div className="mt-3 overflow-x-auto">
              <TransactionTable transactions={todayTransactions} className="text-xs" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
