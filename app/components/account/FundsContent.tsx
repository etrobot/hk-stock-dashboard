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
  TrendingUp,
  FileText,
  Gift
} from 'lucide-react';
import { useState } from 'react';
import { TradingPopup } from '../trading-popup';
import { useLanguage } from '../../contexts/LanguageContext';
import { OrderTable } from '../shared/OrderTable';
import { TransactionTable } from '../shared/TransactionTable';

export const FundsContent = () => {
  const { t } = useLanguage();
  const [isTradingPopupOpen, setIsTradingPopupOpen] = useState(false);

  const handleTradeClick = () => {
    setIsTradingPopupOpen(true);
  };

  // Mock data for fund orders and transactions
  const todayOrders = [
    {
      name: '易方达蓝筹精选混合',
      orderTime: '2023-10-01 09:00',
      orderPrice: '1.2850',
      avgPrice: '1.2850',
      orderQuantity: '1000',
      filledQuantity: '0',
      direction: 'buy' as const,
      status: 'pending' as const
    }
  ];

  const todayTransactions = [
    {
      name: '南方中证500ETF',
      executionTime: '2023-10-01 09:05',
      executionQuantity: '500',
      direction: 'buy' as const,
      executionAmount: '642.50'
    }
  ];

  const historicalOrders = [
    {
      name: '华夏沪深300ETF',
      orderTime: '2023-09-30 14:30',
      orderPrice: '4.1560',
      avgPrice: '4.1560',
      orderQuantity: '500',
      filledQuantity: '500',
      direction: 'buy' as const,
      status: 'filled' as const
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-foreground">{t('account.funds_position')}</h2>

      {/* First row: Three tables side by side */}
      <div className="grid grid-cols-3 gap-4">
        {/* Assets Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('funds.assets')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('funds.item')}</TableHead>
                  <TableHead>{t('funds.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t('funds.total_market_value')}</TableCell>
                  <TableCell>15,428.65</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('funds.available_funds')}</TableCell>
                  <TableCell>2,312.63</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('funds.pending_orders')}</TableCell>
                  <TableCell>1,285.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('funds.frozen_funds')}</TableCell>
                  <TableCell>0.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="text-center text-sm text-gray-300 mt-2">
              {t('funds.risk_level')} | {t('funds.moderate')}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('funds.performance_summary')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('funds.period')}</TableHead>
                  <TableHead>{t('funds.return_rate')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t('funds.today_return')}</TableCell>
                  <TableCell className="text-green-600">+2.35%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('funds.total_return')}</TableCell>
                  <TableCell className="text-green-600">+18.42%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('funds.profit_loss')}</TableCell>
                  <TableCell className="text-green-600">+2,394.28</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Fund Allocation Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-card-foreground font-medium mb-2">{t('funds.allocation')}</h3>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('funds.fund_type')}</TableHead>
                  <TableHead>{t('funds.proportion')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{t('funds.equity_funds')}</TableCell>
                  <TableCell>65.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('funds.bond_funds')}</TableCell>
                  <TableCell>22.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('funds.money_market')}</TableCell>
                  <TableCell>12.0%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Second row: Function icons */}
      <div className="flex gap-2">
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><Upload className="w-4 h-4" />{t('actions.fund_purchase')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><Download className="w-4 h-4" />{t('actions.fund_redemption')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><ArrowLeftRight className="w-4 h-4" />{t('actions.fund_conversion')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><ArrowRightLeft className="w-4 h-4" />{t('actions.fixed_investment')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><RefreshCw className="w-4 h-4" />{t('actions.fund_transfer')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><TrendingUp className="w-4 h-4" />{t('actions.fund_rankings')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><FileText className="w-4 h-4" />{t('actions.fund_statements')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1"><Gift className="w-4 h-4" />{t('actions.fund_rewards')}</Button>
      </div>

      {/* Third row: Tabs with tables */}
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="holdings" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="holdings">{t('tabs.fund_holdings')}</TabsTrigger>
              <TabsTrigger value="today-orders">{t('tabs.today_orders')}</TabsTrigger>
              <TabsTrigger value="today-transactions">{t('tabs.today_transactions')}</TabsTrigger>
              <TabsTrigger value="historical-orders">{t('tabs.historical_orders')}</TabsTrigger>
              <TabsTrigger value="fund-flow">{t('tabs.fund_flow')}</TabsTrigger>
            </TabsList>

            {/* Fund Holdings Tab */}
            <TabsContent value="holdings" className="mt-4 border-none p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('fund_holdings.operation')}</TableHead>
                    <TableHead>{t('fund_holdings.fund_code')}</TableHead>
                    <TableHead>{t('fund_holdings.fund_name')}</TableHead>
                    <TableHead>{t('fund_holdings.shares')}</TableHead>
                    <TableHead>{t('fund_holdings.nav')}</TableHead>
                    <TableHead>{t('fund_holdings.cost_nav')}</TableHead>
                    <TableHead>{t('fund_holdings.market_value')}</TableHead>
                    <TableHead>{t('fund_holdings.profit_loss_ratio')}</TableHead>
                    <TableHead>{t('fund_holdings.profit_loss_amount')}</TableHead>
                    <TableHead>{t('fund_holdings.today_profit_loss')}</TableHead>
                    <TableHead>{t('fund_holdings.position_ratio')}</TableHead>
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
                    <TableCell>110022</TableCell>
                    <TableCell>易方达蓝筹精选混合</TableCell>
                    <TableCell>5,000</TableCell>
                    <TableCell>1.2850</TableCell>
                    <TableCell>1.0540</TableCell>
                    <TableCell>6,425.00</TableCell>
                    <TableCell className="text-green-600">+21.90%</TableCell>
                    <TableCell className="text-green-600">+1,155.00</TableCell>
                    <TableCell className="text-green-600">+128.50</TableCell>
                    <TableCell>41.6%</TableCell>
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
                    <TableCell>510300</TableCell>
                    <TableCell>华夏沪深300ETF</TableCell>
                    <TableCell>2,000</TableCell>
                    <TableCell>4.2180</TableCell>
                    <TableCell>4.1560</TableCell>
                    <TableCell>8,436.00</TableCell>
                    <TableCell className="text-green-600">+1.49%</TableCell>
                    <TableCell className="text-green-600">+124.00</TableCell>
                    <TableCell className="text-green-600">+84.32</TableCell>
                    <TableCell>54.7%</TableCell>
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
                    <TableCell>003816</TableCell>
                    <TableCell>中欧先进制造股票A</TableCell>
                    <TableCell>400</TableCell>
                    <TableCell>1.4230</TableCell>
                    <TableCell>1.6250</TableCell>
                    <TableCell>569.20</TableCell>
                    <TableCell className="text-red-600">-12.43%</TableCell>
                    <TableCell className="text-red-600">-80.80</TableCell>
                    <TableCell className="text-red-600">-8.52</TableCell>
                    <TableCell>3.7%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Today's Orders Tab */}
            <TabsContent value="today-orders" className="mt-4 border-none p-0">
              <OrderTable orders={todayOrders} />
            </TabsContent>

            {/* Today's Transactions Tab */}
            <TabsContent value="today-transactions" className="mt-4 border-none p-0">
              <TransactionTable transactions={todayTransactions} />
            </TabsContent>

            {/* Historical Orders Tab */}
            <TabsContent value="historical-orders" className="mt-4 border-none p-0">
              <OrderTable orders={historicalOrders} />
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
                    <TableCell>{t('fund_flow.fund_purchase')}</TableCell>
                    <TableCell>+1,285.00</TableCell>
                    <TableCell>2,312.63</TableCell>
                    <TableCell>CNY</TableCell>
                    <TableCell>{t('fund_flow.fund_subscription')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-09-30</TableCell>
                    <TableCell>{t('fund_flow.fund_redemption')}</TableCell>
                    <TableCell>-2,078.00</TableCell>
                    <TableCell>1,027.63</TableCell>
                    <TableCell>CNY</TableCell>
                    <TableCell>{t('fund_flow.partial_redemption')}</TableCell>
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