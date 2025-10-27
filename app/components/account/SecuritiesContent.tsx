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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as DateCalendar } from '../ui/calendar';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { OrderTable } from '../shared/OrderTable';
import { TransactionTable } from '../shared/TransactionTable';

export const SecuritiesContent = ({ isMasked }: { isMasked?: boolean }) => {
  const { t } = useLanguage();
  const [isTradingPopupOpen, setIsTradingPopupOpen] = useState(false);
  // Date filters
  const [histOrdersFrom, setHistOrdersFrom] = useState<Date | undefined>();
  const [histOrdersTo, setHistOrdersTo] = useState<Date | undefined>();
  const [histTxFrom, setHistTxFrom] = useState<Date | undefined>();
  const [histTxTo, setHistTxTo] = useState<Date | undefined>();
  const [fundFlowFrom, setFundFlowFrom] = useState<Date | undefined>();
  const [fundFlowTo, setFundFlowTo] = useState<Date | undefined>();

  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [iframeTitle, setIframeTitle] = useState('');

  const handleTradeClick = () => {
    setIsTradingPopupOpen(true);
  };

  // Get current theme (you may need to adjust this based on your theme implementation)
  const getCurrentTheme = () => {
    // Check if dark mode is enabled - adjust based on your theme provider
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? 'dark' : 'light';
  };

  const openIframe = (url: string, title: string) => {
    const theme = getCurrentTheme();
    const urlWithTheme = url.replace('{theme}', theme);
    setIframeUrl(urlWithTheme);
    setIframeTitle(title);
    setIsIframeOpen(true);
  };

  const handleDepositFunds = () => {
    openIframe('https://testdv.tfisec.cn/eddaweb/deposit?theme={theme}', t('actions.deposit_funds'));
  };

  const handleWithdrawFunds = () => {
    openIframe('https://tfi.tfisec.cn/eddaweb/withdrawal?theme={theme}', t('actions.withdraw_funds'));
  };

  const handleCurrencyExchange = () => {
    openIframe('https://testdv.tfisec.cn/eddaweb/fundAllocation?theme={theme}', t('actions.currency_exchange'));
  };

  const handleTransferToStocks = () => {
    openIframe('https://testdv.tfisec.cn/businessweb/transferStock/home?theme={theme}', t('actions.transfer_to_stocks'));
  };

  const handleFundTransfer = () => {
    openIframe('https://testdv.tfisec.cn/eddaweb/fundAllocation?theme={theme}', t('actions.fund_transfer'));
  };

  const handleIpoSubscription = () => {
    openIframe('http://testdv.tfisec.cn/nic/home?entry=true&theme={theme}&active=1', t('actions.ipo_subscription'));
  };

  const handleMyStatements = () => {
    openIframe('https://testdv.guokinghk.com/tradestock/profitLoss?theme={theme}', t('actions.my_statements'));
  };

  const handleVouchers = () => {
    openIframe('http://testdv.tfisec.cn/equityweb/myCoupon?theme={theme}', t('actions.vouchers'));
  };

  // Mock data for orders and transactions
  const todayOrders = [
    {
      name: '汇丰控股',
      orderTime: '2023-10-01 09:00',
      orderPrice: '108.00',
      avgPrice: '108.00',
      orderQuantity: '1',
      filledQuantity: '0',
      direction: 'buy' as const,
      status: 'pending' as const
    }
  ];

  const todayTransactions = [
    {
      code: '00005',
      name: '汇丰控股',
      executionTime: '2023-10-01 09:05',
      executionPrice: '108.00',
      executionQuantity: '1',
      direction: 'buy' as const,
      executionAmount: '108.00'
    }
  ];

  const historicalOrders = [
    {
      name: '中国平安',
      orderTime: '2023-09-30 14:30',
      orderPrice: '71.60',
      avgPrice: '71.60',
      orderQuantity: '1',
      filledQuantity: '1',
      direction: 'buy' as const,
      status: 'filled' as const
    }
  ];

  const historicalTransactions = [
    {
      code: '02318',
      name: '中国平安',
      executionTime: '2023-09-29 10:15',
      executionPrice: '71.60',
      executionQuantity: '2',
      direction: 'sell' as const,
      executionAmount: '143.20'
    }
  ];

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
                  <TableCell>{isMasked ? '****' : '268.65'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('securities.available_funds')}</TableCell>
                  <TableCell>{isMasked ? '****' : '312.63'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('securities.in_transit_assets')}</TableCell>
                  <TableCell>{isMasked ? '****' : '2.51'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{t('securities.frozen_funds')}</TableCell>
                  <TableCell>{isMasked ? '****' : '0.69'}</TableCell>
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
                  <TableCell>{isMasked ? '****' : '-183.31'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HKD</TableCell>
                  <TableCell>{isMasked ? '****' : '-183.31'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USD</TableCell>
                  <TableCell>{isMasked ? '****' : '0.00'}</TableCell>
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
                  <TableCell>{isMasked ? '****' : '0.00'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USD</TableCell>
                  <TableCell>{isMasked ? '****' : '0.00'}</TableCell>
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
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleDepositFunds}><Upload className="w-4 h-4" />{t('actions.deposit_funds')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleWithdrawFunds}><Download className="w-4 h-4" />{t('actions.withdraw_funds')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleCurrencyExchange}><ArrowLeftRight className="w-4 h-4" />{t('actions.currency_exchange')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleTransferToStocks}><ArrowRightLeft className="w-4 h-4" />{t('actions.transfer_to_stocks')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleFundTransfer}><RefreshCw className="w-4 h-4" />{t('actions.fund_transfer')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleIpoSubscription}><Ticket className="w-4 h-4" />{t('actions.ipo_subscription')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleMyStatements}><FileText className="w-4 h-4" />{t('actions.my_statements')}</Button>
          <Button variant="ghost" className="text-sm h-auto py-2 gap-1" onClick={handleVouchers}><Gift className="w-4 h-4" />{t('actions.vouchers')}</Button>
      </div>

      {/* Third row: Tabs with tables */}
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="holdings" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="holdings">{t('tabs.holdings')}</TabsTrigger>
              <TabsTrigger value="today-orders">{t('tabs.today_orders')}</TabsTrigger>
              <TabsTrigger value="today-transactions">{t('tabs.today_transactions')}</TabsTrigger>
              <TabsTrigger value="historical-orders">{t('tabs.historical_orders')}</TabsTrigger>
              <TabsTrigger value="historical-transactions">{t('tabs.historical_transactions')}</TabsTrigger>
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
                    <TableCell>{isMasked ? '****' : '108.000'}</TableCell>
                    <TableCell>{isMasked ? '****' : '62.15'}</TableCell>
                    <TableCell>{isMasked ? '****' : '216.00'}</TableCell>
                    <TableCell>{isMasked ? '****' : '+73.77%'}</TableCell>
                    <TableCell>{isMasked ? '****' : '+91.70'}</TableCell>
                    <TableCell>{isMasked ? '****' : '-1.20'}</TableCell>
                    <TableCell>{isMasked ? '****' : '52.37%'}</TableCell>
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
                    <TableCell>{isMasked ? '****' : '52.450'}</TableCell>
                    <TableCell>{isMasked ? '****' : '71.60'}</TableCell>
                    <TableCell>{isMasked ? '****' : '52.45'}</TableCell>
                    <TableCell>{isMasked ? '****' : '-26.75%'}</TableCell>
                    <TableCell>{isMasked ? '****' : '-19.15'}</TableCell>
                    <TableCell>{isMasked ? '****' : '+0.15'}</TableCell>
                    <TableCell>{isMasked ? '****' : '12.72%'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Today's Orders Tab */}
            <TabsContent value="today-orders" className="mt-4 border-none p-0">
              <OrderTable orders={todayOrders} timeFormat="HH:mm:ss" onModify={() => setIsTradingPopupOpen(true)} />
            </TabsContent>

            {/* Today's Transactions Tab */}
            <TabsContent value="today-transactions" className="mt-4 border-none p-0">
              <TransactionTable transactions={todayTransactions} timeColumn="time" />
            </TabsContent>

            {/* Historical Orders Tab */}
            <TabsContent value="historical-orders" className="mt-4 border-none p-0">
              <div className="flex items-center gap-2 mb-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {histOrdersFrom ? `${histOrdersFrom.getFullYear()}-${String(histOrdersFrom.getMonth()+1).padStart(2,'0')}-${String(histOrdersFrom.getDate()).padStart(2,'0')}` : t('filters.start_date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateCalendar mode="single" selected={histOrdersFrom} onSelect={setHistOrdersFrom} />
                  </PopoverContent>
                </Popover>
                <span className="text-xs">-</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {histOrdersTo ? `${histOrdersTo.getFullYear()}-${String(histOrdersTo.getMonth()+1).padStart(2,'0')}-${String(histOrdersTo.getDate()).padStart(2,'0')}` : t('filters.end_date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateCalendar mode="single" selected={histOrdersTo} onSelect={setHistOrdersTo} />
                  </PopoverContent>
                </Popover>
              </div>
              <OrderTable orders={historicalOrders} />
            </TabsContent>

            {/* Historical Transactions Tab */}
            <TabsContent value="historical-transactions" className="mt-4 border-none p-0">
              <div className="flex items-center gap-2 mb-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {histTxFrom ? `${histTxFrom.getFullYear()}-${String(histTxFrom.getMonth()+1).padStart(2,'0')}-${String(histTxFrom.getDate()).padStart(2,'0')}` : t('filters.start_date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateCalendar mode="single" selected={histTxFrom} onSelect={setHistTxFrom} />
                  </PopoverContent>
                </Popover>
                <span className="text-xs">-</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {histTxTo ? `${histTxTo.getFullYear()}-${String(histTxTo.getMonth()+1).padStart(2,'0')}-${String(histTxTo.getDate()).padStart(2,'0')}` : t('filters.end_date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateCalendar mode="single" selected={histTxTo} onSelect={setHistTxTo} />
                  </PopoverContent>
                </Popover>
              </div>
              <TransactionTable transactions={historicalTransactions} timeColumn="datetime" />
            </TabsContent>

            {/* Fund Flow Tab */}
            <TabsContent value="fund-flow" className="mt-4 border-none p-0">
              <div className="flex items-center gap-2 mb-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {fundFlowFrom ? `${fundFlowFrom.getFullYear()}-${String(fundFlowFrom.getMonth()+1).padStart(2,'0')}-${String(fundFlowFrom.getDate()).padStart(2,'0')}` : t('filters.start_date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateCalendar mode="single" selected={fundFlowFrom} onSelect={setFundFlowFrom} />
                  </PopoverContent>
                </Popover>
                <span className="text-xs">-</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 px-2 text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {fundFlowTo ? `${fundFlowTo.getFullYear()}-${String(fundFlowTo.getMonth()+1).padStart(2,'0')}-${String(fundFlowTo.getDate()).padStart(2,'0')}` : t('filters.end_date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateCalendar mode="single" selected={fundFlowTo} onSelect={setFundFlowTo} />
                  </PopoverContent>
                </Popover>
              </div>
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

      {/* Iframe Dialog */}
      <Dialog open={isIframeOpen} onOpenChange={setIsIframeOpen}>
        <DialogContent className="max-w-5xl w-full h-[80vh] p-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle>{iframeTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 p-4 pt-0">
            {iframeUrl && (
              <iframe
                src={iframeUrl}
                className="w-full h-full border-0 rounded-md"
                title={iframeTitle}
                allow="payment; microphone; camera; encrypted-media; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};