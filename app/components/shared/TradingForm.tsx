"use client"

import { Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useLanguage } from '../../contexts/LanguageContext'

interface AccountData {
  balance: string
  cashAvailable: string
  positionSellable: string
  maxBuyable: string
}

interface TradingFormProps {
  stockCode: string
  setStockCode: (v: string) => void
  orderType: string
  setOrderType: (v: string) => void
  price: string
  setPrice: (v: string) => void
  quantity: string
  setQuantity: (v: string) => void
  adjustPrice: (delta: number) => void
  adjustQuantity: (delta: number) => void
  accountData: AccountData
  onBuy?: () => void
  onSell?: () => void
  nameBelowCode?: string
}

export function TradingForm({
  stockCode,
  setStockCode,
  orderType,
  setOrderType,
  price,
  setPrice,
  quantity,
  setQuantity,
  adjustPrice,
  adjustQuantity,
  accountData,
  onBuy,
  onSell,
  nameBelowCode,
}: TradingFormProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs text-foreground">{t('trade.code')}</label>
        <div className="relative">
          <Input 
            value={stockCode}
            onChange={(e) => setStockCode(e.target.value)}
            className="text-xs h-6 px-3 bg-input"
          />
        </div>
        {nameBelowCode ? (
          <div className="text-xs text-muted-foreground">{nameBelowCode}</div>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <label className="text-xs text-muted-foreground">{t('orders.order_type')}</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3 h-3 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-3">
              <div className="space-y-2 text-xs">
                <div>
                  <div className="font-semibold text-foreground">{t('order_type.at_auction')}</div>
                  <div className="text-muted-foreground">{t('order_type_desc.at_auction')}</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t('order_type.at_auction_limit')}</div>
                  <div className="text-muted-foreground">{t('order_type_desc.at_auction_limit')}</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t('order_type.limit')}</div>
                  <div className="text-muted-foreground">{t('order_type_desc.limit')}</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t('order_type.enhanced_limit')}</div>
                  <div className="text-muted-foreground">{t('order_type_desc.enhanced_limit')}</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{t('order_type.special_limit')}</div>
                  <div className="text-muted-foreground">{t('order_type_desc.special_limit')}</div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <Select value={orderType} onValueChange={setOrderType}>
          <SelectTrigger className="bg-input text-xs h-6">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="order_type.enhanced_limit" className="text-xs">{t('order_type.enhanced_limit')}</SelectItem>
            <SelectItem value="order_type.at_auction" className="text-xs">{t('order_type.at_auction')}</SelectItem>
            <SelectItem value="order_type.at_auction_limit" className="text-xs">{t('order_type.at_auction_limit')}</SelectItem>
            <SelectItem value="order_type.limit" className="text-xs">{t('order_type.limit')}</SelectItem>
            <SelectItem value="order_type.special_limit" className="text-xs">{t('order_type.special_limit')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-foreground">{t('trade.price')}</label>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustPrice(-0.010)}>-</Button>
          <div className="relative flex-1">
            <Input 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
              className="text-xs h-6 px-3 bg-input"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustPrice(0.010)}>+</Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-foreground">{t('trade.quantity')}</label>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustQuantity(-1)}>-</Button>
          <div className="relative flex-1">
            <Input 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputMode="numeric"
              className="text-xs h-6 px-3 bg-input"
            />
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 bg-input hover:bg-accent" onClick={() => adjustQuantity(1)}>+</Button>
        </div>
        <div className="mt-2">
          <div className="grid grid-cols-5 gap-2 text-xs whitespace-nowrap">
            <div className="text-muted-foreground">{t('trade.settings')}</div>
            <div className="text-right text-muted-foreground">{t('trade.full_position')}</div>
            <div className="text-right text-muted-foreground">{t('trade.fraction.half')}</div>
            <div className="text-right text-muted-foreground">{t('trade.fraction.quarter')}</div>
            <div className="text-right text-muted-foreground">{t('trade.fraction.eighth')}</div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-xs mt-1">
            <div className="text-foreground">{t('trade.max_buyable')}</div>
            <div className="text-right text-foreground">0</div>
            <div className="text-right text-foreground">0</div>
            <div className="text-right text-foreground">0</div>
            <div className="text-right text-foreground">0</div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-xs mt-1">
            <div className="text-foreground">{t('trade.max_sellable')}</div>
            <div className="text-right text-foreground">0</div>
            <div className="text-right text-foreground">0</div>
            <div className="text-right text-foreground">0</div>
            <div className="text-right text-foreground">0</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">{t('trade.amount')}</span>
          <span className="text-xs text-foreground">{accountData.balance}</span>
        </div>
        <div 
          className="flex justify-between cursor-pointer hover:bg-accent/40 rounded px-2"
          onClick={() => setQuantity(accountData.cashAvailable)}
        >
          <span className="text-xs text-muted-foreground">{t('trade.cash_buyable')}</span>
          <span className="text-xs text-[#16BA71]">{accountData.cashAvailable}</span>
        </div>
        <div 
          className="flex justify-between cursor-pointer hover:bg-accent/40 rounded px-2"
          onClick={() => setQuantity(accountData.positionSellable)}
        >
          <span className="text-xs text-muted-foreground">{t('trade.max_sellable')}</span>
          <span className="text-xs text-[#F44345]">{accountData.positionSellable}</span>
        </div>
        <div 
          className="flex justify-between cursor-pointer hover:bg-accent/40 rounded px-2"
          onClick={() => setQuantity(accountData.maxBuyable)}
        >
          <span className="text-xs text-muted-foreground">{t('trade.max_buyable')}</span>
          <span className="text-xs text-foreground">{accountData.maxBuyable}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">{t('trade.available_funds')}</span>
          <span className="text-xs text-foreground">{accountData.maxBuyable}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">{t('trade.available_units')}</span>
          <span className="text-xs text-foreground">{accountData.maxBuyable}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button className="flex-1 text-xs h-6 rounded-xl bg-[#F44345] hover:bg-[#d63b3d] text-white" onClick={onBuy}>
          {t('trade.buy')}
        </Button>
        <Button className="flex-1 text-xs h-6 rounded-xl bg-[#16BA71] hover:bg-[#10975c] text-white" onClick={onSell}>
          {t('trade.sell')}
        </Button>
      </div>
    </div>
  )
}
