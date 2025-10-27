import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useLanguage } from '../../contexts/LanguageContext'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'

interface Order {
  code?: string
  name: string
  orderTime: string
  orderPrice: string
  avgPrice: string
  orderQuantity: string
  filledQuantity: string
  direction: 'buy' | 'sell'
  status: 'pending' | 'filled' | 'cancelled' | 'partial'
}

interface OrderTableProps {
  orders: Order[]
  className?: string
  showOperation?: boolean
}

export function OrderTable({ orders, className, showOperation = true }: OrderTableProps) {
  const { t } = useLanguage()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const getDirectionText = (direction: 'buy' | 'sell') => {
    return direction === 'buy' ? t('orders.buy') : t('orders.sell')
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('orders.pending')
      case 'filled':
        return t('orders.filled')
      case 'cancelled':
        return t('orders.cancelled')
      case 'partial':
        return t('orders.partial')
      default:
        return status
    }
  }

  return (
    <>
      <Table className={className}>
        <TableHeader>
          <TableRow>
            <TableHead>{t('orders.code') || '代码'}</TableHead>
            <TableHead>{t('orders.name')}</TableHead>
            <TableHead>{t('orders.order_time')}</TableHead>
            <TableHead>{t('orders.order_price')}</TableHead>
            <TableHead>{t('orders.avg_price')}</TableHead>
            <TableHead>{t('orders.order_quantity')}</TableHead>
            <TableHead>{t('orders.filled_quantity')}</TableHead>
            <TableHead>{t('orders.direction')}</TableHead>
            <TableHead>{t('orders.status')}</TableHead>
            {showOperation && <TableHead>{t('holdings.operation')}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>{order.code ?? '-'}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.orderTime}</TableCell>
              <TableCell>{order.orderPrice}</TableCell>
              <TableCell>{order.avgPrice}</TableCell>
              <TableCell>{order.orderQuantity}</TableCell>
              <TableCell>{order.filledQuantity}</TableCell>
              <TableCell>{getDirectionText(order.direction)}</TableCell>
              <TableCell>{getStatusText(order.status)}</TableCell>
              {showOperation && (
                <TableCell>
                  {order.status === 'pending' && (
                    <Button variant="outline" className="h-6 text-xs" onClick={() => setConfirmOpen(true)}>
                      {t('orders.action_cancel')}
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md p-4">
          <div className="space-y-3 text-xs">
            <div className="text-sm font-medium text-foreground">{t('orders.cancel_confirm_title')}</div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('orders.cancel_name')}</span>
              <span className="text-foreground">腾讯股票</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('orders.cancel_code')}</span>
              <span className="text-foreground">00700.HK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('orders.cancel_direction')}</span>
              <span className="text-foreground">买入</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('orders.cancel_quantity')}</span>
              <span className="text-foreground">100股</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t('orders.cancel_price')}</span>
              <span className="text-foreground">828383港元</span>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1 h-7" onClick={() => setConfirmOpen(false)}>{t('common.cancel')}</Button>
              <Button className="flex-1 h-7 bg-[#FF5C00] hover:bg-[#e54f00] text-white" onClick={() => setConfirmOpen(false)}>{t('orders.cancel_submit')}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
