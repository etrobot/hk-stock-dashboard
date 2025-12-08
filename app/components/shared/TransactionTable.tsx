import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useLanguage } from '../../contexts/LanguageContext';

interface Transaction {
  code?: string;
  name: string;
  executionTime?: string;
  executionPrice?: string;
  executionQuantity: string;
  direction: 'buy' | 'sell';
  executionAmount: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  className?: string;
  timeColumn?: 'none' | 'time' | 'datetime';
  isMasked?: boolean;
}

export function TransactionTable({ transactions, className, timeColumn = 'none', isMasked }: TransactionTableProps) {
  const { t } = useLanguage();

  const getDirectionText = (direction: 'buy' | 'sell') => {
    return direction === 'buy' ? t('orders.buy') : t('orders.sell');
  };

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>{t('orders.code') || '代码'}</TableHead>
          <TableHead>{t('orders.name')}</TableHead>
          {timeColumn !== 'none' && (
            <TableHead>
              {timeColumn === 'datetime' ? (t('transactions.execution_datetime') || '成交时间') : (t('transactions.execution_time') || '时间')}
            </TableHead>
          )}
          <TableHead>{t('orders.direction')}</TableHead>
          <TableHead>{t('transactions.execution_price') || '成交价'}</TableHead>
          <TableHead>{t('transactions.execution_quantity')}</TableHead>
          <TableHead>{t('transactions.execution_amount')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => {
          const renderTime = () => {
            if (!transaction.executionTime) return '-';
            if (timeColumn === 'datetime') return transaction.executionTime;
            // time only: extract HH:mm[:ss]
            const parts = transaction.executionTime.split(/\s+/);
            const time = parts.length > 1 ? parts[1] : parts[0];
            const segs = time.split(':');
            if (segs.length === 1) return `${segs[0].padStart(2,'0')}:00:00`;
            if (segs.length === 2) return `${segs[0].padStart(2,'0')}:${segs[1].padStart(2,'0')}:00`;
            return `${segs[0].padStart(2,'0')}:${segs[1].padStart(2,'0')}:${segs[2].padStart(2,'0')}`;
          };
          return (
            <TableRow key={index}>
              <TableCell>{transaction.code ?? '-'}</TableCell>
              <TableCell>{transaction.name}</TableCell>
              {timeColumn !== 'none' && (
                <TableCell>{renderTime()}</TableCell>
              )}
              <TableCell>{getDirectionText(transaction.direction)}</TableCell>
              <TableCell>{isMasked ? '****' : (transaction.executionPrice ?? '-')}</TableCell>
              <TableCell>{isMasked ? '****' : transaction.executionQuantity}</TableCell>
              <TableCell>{isMasked ? '****' : transaction.executionAmount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}