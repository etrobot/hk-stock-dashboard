import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useLanguage } from '../../contexts/LanguageContext';

interface Order {
  name: string;
  orderTime: string;
  orderPrice: string;
  avgPrice: string;
  orderQuantity: string;
  filledQuantity: string;
  direction: 'buy' | 'sell';
  status: 'pending' | 'filled' | 'cancelled' | 'partial';
}

interface OrderTableProps {
  orders: Order[];
  className?: string;
}

export function OrderTable({ orders, className }: OrderTableProps) {
  const { t } = useLanguage();

  const getDirectionText = (direction: 'buy' | 'sell') => {
    return direction === 'buy' ? t('orders.buy') : t('orders.sell');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t('orders.pending');
      case 'filled':
        return t('orders.filled');
      case 'cancelled':
        return t('orders.cancelled');
      case 'partial':
        return t('orders.partial');
      default:
        return status;
    }
  };

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>{t('orders.name')}</TableHead>
          <TableHead>{t('orders.order_time')}</TableHead>
          <TableHead>{t('orders.order_price')}</TableHead>
          <TableHead>{t('orders.avg_price')}</TableHead>
          <TableHead>{t('orders.order_quantity')}</TableHead>
          <TableHead>{t('orders.filled_quantity')}</TableHead>
          <TableHead>{t('orders.direction')}</TableHead>
          <TableHead>{t('orders.status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={index}>
            <TableCell>{order.name}</TableCell>
            <TableCell>{order.orderTime}</TableCell>
            <TableCell>{order.orderPrice}</TableCell>
            <TableCell>{order.avgPrice}</TableCell>
            <TableCell>{order.orderQuantity}</TableCell>
            <TableCell>{order.filledQuantity}</TableCell>
            <TableCell>{getDirectionText(order.direction)}</TableCell>
            <TableCell>{getStatusText(order.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}