import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useLanguage } from '../../contexts/LanguageContext';

interface Transaction {
  code?: string;
  name: string;
  executionTime: string;
  executionQuantity: string;
  direction: 'buy' | 'sell';
  executionAmount: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  className?: string;
}

export function TransactionTable({ transactions, className }: TransactionTableProps) {
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
          <TableHead>{t('transactions.execution_time')}</TableHead>
          <TableHead>{t('transactions.execution_quantity')}</TableHead>
          <TableHead>{t('orders.direction')}</TableHead>
          <TableHead>{t('transactions.execution_amount')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{transaction.code ?? '-'}</TableCell>
            <TableCell>{transaction.name}</TableCell>
            <TableCell>{transaction.executionTime}</TableCell>
            <TableCell>{transaction.executionQuantity}</TableCell>
            <TableCell>{getDirectionText(transaction.direction)}</TableCell>
            <TableCell>{transaction.executionAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}