import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import {
  Download,
  Upload,
  ArrowLeftRight,
  ArrowRightLeft,
  RefreshCw,
  Ticket,
  FileText,
  Gift
} from 'lucide-react';
import { useState } from 'react';
import { TradingPopup } from '../trading-popup';
import { useLanguage } from '../../contexts/LanguageContext';

export const SecuritiesContent = () => {
  const { t } = useLanguage();
  const [isTradingPopupOpen, setIsTradingPopupOpen] = useState(false);

  const handleTradeClick = () => {
    setIsTradingPopupOpen(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-foreground">{t('account.securities_position')}</h2>

      {/* First row: Three tables side by side */}
      <div className="grid grid-cols-3 gap-4">
        {/* Assets Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('securities.assets')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('securities.item')}</TableHead>
                  <TableHead>{t('securities.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t('securities.market_value')}</TableCell>
                  <TableCell>268.65</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('securities.available_funds')}</TableCell>
                  <TableCell>312.63</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('securities.in_transit_assets')}</TableCell>
                  <TableCell>2.51</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('securities.frozen_funds')}</TableCell>
                  <TableCell>0.69</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="text-center text-sm text-gray-300 mt-2">
              {t('securities.risk_level')} | {t('securities.safe')}
            </div>
          </CardContent>
        </Card>

        {/* Cash Details Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('securities.cash_details')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('securities.currency_type')}</TableHead>
                  <TableHead>{t('securities.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t('securities.total_cash')} · HKD</TableCell>
                  <TableCell>-183.31</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HKD</TableCell>
                  <TableCell>-183.31</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USD</TableCell>
                  <TableCell>0.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Withdrawable Cash Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('securities.withdrawable_cash')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('securities.currency_type')}</TableHead>
                  <TableHead>{t('securities.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>HKD</TableCell>
                  <TableCell>0.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USD</TableCell>
                  <TableCell>0.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CNH</TableCell>
                  <TableCell>0.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Second row: Function icons */}
      <div className="flex gap-2">
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><Upload className="w-4 h-4" />{t('actions.deposit_funds')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><Download className="w-4 h-4" />{t('actions.withdraw_funds')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><ArrowLeftRight className="w-4 h-4" />{t('actions.currency_exchange')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><ArrowRightLeft className="w-4 h-4" />{t('actions.transfer_to_stocks')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><RefreshCw className="w-4 h-4" />{t('actions.fund_transfer')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><Ticket className="w-4 h-4" />{t('actions.ipo_subscription')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><FileText className="w-4 h-4" />{t('actions.my_statements')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><Gift className="w-4 h-4" />{t('actions.vouchers')}</Button>
      </div>

      {/* Third row: Tabs with tables */}
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="holdings" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="holdings">{t('tabs.holdings')}</TabsTrigger>
              <TabsTrigger value="today-orders">{t('tabs.today_orders')}</TabsTrigger>
              <TabsTrigger value="today-transactions">{t('tabs.today_transactions')}</TabsTrigger>
              <TabsTrigger value="historical-orders">{t('tabs.historical_orders')}</TabsTrigger>
              <TabsTrigger value="fund-flow">{t('tabs.fund_flow')}</TabsTrigger>
            </TabsList>

            {/* Holdings Tab */}
            <TabsContent value="holdings" className="mt-4 border-none p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('holdings.operation')}</TableHead>
                    <TableHead>{t('holdings.code')}</TableHead>
                    <TableHead>{t('holdings.name')}</TableHead>
                    <TableHead>{t('holdings.quantity')}</TableHead>
                    <TableHead>{t('holdings.available_quantity')}</TableHead>
                    <TableHead>{t('holdings.current_price')}</TableHead>
                    <TableHead>{t('holdings.cost_price')}</TableHead>
                    <TableHead>{t('holdings.market_value')}</TableHead>
                    <TableHead>{t('holdings.profit_loss_ratio')}</TableHead>
                    <TableHead>{t('holdings.profit_loss_amount')}</TableHead>
                    <TableHead>{t('holdings.today_profit_loss')}</TableHead>
                    <TableHead>{t('holdings.position_ratio')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        onClick={handleTradeClick}
                      >
                        {t('actions.trade')}
                      </Button>
                    </TableCell>
                    <TableCell>00005</TableCell>
                    <TableCell>汇丰控股</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>108.000</TableCell>
                    <TableCell>62.15</TableCell>
                    <TableCell>216.00</TableCell>
                    <TableCell>+73.77%</TableCell>
                    <TableCell>+91.70</TableCell>
                    <TableCell>-1.20</TableCell>
                    <TableCell>52.37%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        onClick={handleTradeClick}
                      >
                        {t('actions.trade')}
                      </Button>
                    </TableCell>
                    <TableCell>02318</TableCell>
                    <TableCell>中国平安</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>52.450</TableCell>
                    <TableCell>71.60</TableCell>
                    <TableCell>52.45</TableCell>
                    <TableCell>-26.75%</TableCell>
                    <TableCell>-19.15</TableCell>
                    <TableCell>+0.15</TableCell>
                    <TableCell>12.72%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Today's Orders Tab */}
            <TabsContent value="today-orders" className="mt-4 border-none p-0">
              <Table>
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
                  <TableRow>
                    <TableCell>汇丰控股</TableCell>
                    <TableCell>2023-10-01 09:00</TableCell>
                    <TableCell>108.00</TableCell>
                    <TableCell>108.00</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>{t('orders.buy')}</TableCell>
                    <TableCell>{t('orders.pending')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Today's Transactions Tab */}
            <TabsContent value="today-transactions" className="mt-4 border-none p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('orders.name')}</TableHead>
                    <TableHead>{t('transactions.execution_time')}</TableHead>
                    <TableHead>{t('transactions.execution_quantity')}</TableHead>
                    <TableHead>{t('orders.direction')}</TableHead>
                    <TableHead>{t('transactions.execution_amount')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>汇丰控股</TableCell>
                    <TableCell>2023-10-01 09:05</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>{t('orders.buy')}</TableCell>
                    <TableCell>108.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Historical Orders Tab */}
            <TabsContent value="historical-orders" className="mt-4 border-none p-0">
              <Table>
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
                  <TableRow>
                    <TableCell>中国平安</TableCell>
                    <TableCell>2023-09-30 14:30</TableCell>
                    <TableCell>71.60</TableCell>
                    <TableCell>71.60</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>{t('orders.buy')}</TableCell>
                    <TableCell>{t('orders.filled')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Fund Flow Tab */}
            <TabsContent value="fund-flow" className="mt-4 border-none p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('fund_flow.trade_date')}</TableHead>
                    <TableHead>{t('fund_flow.business_name')}</TableHead>
                    <TableHead>{t('fund_flow.amount')}</TableHead>
                    <TableHead>{t('fund_flow.remaining_amount')}</TableHead>
                    <TableHead>{t('fund_flow.currency')}</TableHead>
                    <TableHead>{t('fund_flow.remarks')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-10-01</TableCell>
                    <TableCell>{t('fund_flow.deposit')}</TableCell>
                    <TableCell>+100.00</TableCell>
                    <TableCell>312.63</TableCell>
                    <TableCell>HKD</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Trading Popup */}
      <TradingPopup 
        open={isTradingPopupOpen} 
        onOpenChange={setIsTradingPopupOpen} 
      />
    </div>
  );
};