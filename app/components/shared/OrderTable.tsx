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
  timeFormat?: 'HH:mm:ss'
  onModify?: (order: Order) => void
}

function formatTimeString(input: string, timeFormat?: 'HH:mm:ss') {
  if (!timeFormat) return input;
  // Expecting formats like 'YYYY-MM-DD HH:mm' or 'YYYY-MM-DD HH:mm:ss' or just 'HH:mm'/'HH:mm:ss'
  const parts = input.trim().split(/\s+/);
  let time = parts.length > 1 ? parts[1] : parts[0];
  // Normalize to HH:mm:ss
  const segs = time.split(':');
  if (segs.length === 1) {
    // e.g., '09' -> '09:00:00'
    time = `${segs[0].padStart(2, '0')}:00:00`;
  } else if (segs.length === 2) {
    // e.g., '09:05' -> '09:05:00'
    time = `${segs[0].padStart(2, '0')}:${segs[1].padStart(2, '0')}:00`;
  } else if (segs.length >= 3) {
    time = `${segs[0].padStart(2, '0')}:${segs[1].padStart(2, '0')}:${segs[2].padStart(2, '0')}`;
  }
  return time;
}

export function OrderTable({ orders, className, showOperation = true, timeFormat, onModify }: OrderTableProps) {
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
              <TableCell>{formatTimeString(order.orderTime, timeFormat)}</TableCell>
              <TableCell>{order.orderPrice}</TableCell>
              <TableCell>{order.avgPrice}</TableCell>
              <TableCell>{order.orderQuantity}</TableCell>
              <TableCell>{order.filledQuantity}</TableCell>
              <TableCell>{getDirectionText(order.direction)}</TableCell>
              <TableCell>{getStatusText(order.status)}</TableCell>
              {showOperation && (
                <TableCell>
                  {order.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs" onClick={() => setConfirmOpen(true)}>
                        {t('orders.action_cancel')}
                      </Button>
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs" onClick={() => onModify?.(order)}>
                        {t('orders.action_modify') || '改单'}
                      </Button>
                    </div>
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
