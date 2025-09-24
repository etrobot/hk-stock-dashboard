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

export const SecuritiesContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-white">证券持仓</h2>

      {/* First row: Three tables side by side */}
      <div className="grid grid-cols-3 gap-4">
        {/* Assets Table */}
        <Card className="bg-[#1A1D28] border-[#2D303D]">
          <CardContent className="p-4">
            <h3 className="text-white font-medium mb-2">资产</h3>
            <Table className="text-xs text-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead>项目</TableHead>
                  <TableHead>金额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>证券市值</TableCell>
                  <TableCell>268.65</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>可用资金</TableCell>
                  <TableCell>312.63</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>在途资产</TableCell>
                  <TableCell>2.51</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>冻结资金</TableCell>
                  <TableCell>0.69</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="text-center text-sm text-gray-300 mt-2">
              风险水平 | 安全
            </div>
          </CardContent>
        </Card>

        {/* Cash Details Table */}
        <Card className="bg-[#1A1D28] border-[#2D303D]">
          <CardContent className="p-4">
            <h3 className="text-white font-medium mb-2">现金明细</h3>
            <Table className="text-xs text-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead>币种</TableHead>
                  <TableHead>金额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>现金总值 · HKD</TableCell>
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
        <Card className="bg-[#1A1D28] border-[#2D303D]">
          <CardContent className="p-4">
            <h3 className="text-white font-medium mb-2">现金可提</h3>
            <Table className="text-xs text-gray-300">
              <TableHeader>
                <TableRow>
                  <TableHead>币种</TableHead>
                  <TableHead>金额</TableHead>
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
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><Upload className="w-4 h-4" />存入资金</Button>
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><Download className="w-4 h-4" />提取资金</Button>
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><ArrowLeftRight className="w-4 h-4" />货币兑换</Button>
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><ArrowRightLeft className="w-4 h-4" />转入股票</Button>
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><RefreshCw className="w-4 h-4" />资金调拨</Button>
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><Ticket className="w-4 h-4" />新股认购</Button>
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><FileText className="w-4 h-4" />我的结单</Button>
          <Button variant="ghost" className="text-white text-sm h-auto py-2 gap-1"><Gift className="w-4 h-4" />卡券</Button>
      </div>

      {/* Third row: Tabs with tables */}
      <Card className="bg-[#1A1D28] border-[#2D303D]">
        <CardContent className="p-4">
          <Tabs defaultValue="holdings" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="holdings">持仓</TabsTrigger>
              <TabsTrigger value="today-orders">当日订单</TabsTrigger>
              <TabsTrigger value="today-transactions">当日成交</TabsTrigger>
              <TabsTrigger value="historical-orders">历史订单</TabsTrigger>
              <TabsTrigger value="fund-flow">资金流水</TabsTrigger>
            </TabsList>

            {/* Holdings Tab */}
            <TabsContent value="holdings" className="mt-4 border-none p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>操作</TableHead>
                    <TableHead>代码</TableHead>
                    <TableHead>名称</TableHead>
                    <TableHead>持有数量</TableHead>
                    <TableHead>可用数量</TableHead>
                    <TableHead>现价</TableHead>
                    <TableHead>摊薄成本价</TableHead>
                    <TableHead>市值</TableHead>
                    <TableHead>盈亏比例</TableHead>
                    <TableHead>盈亏金额</TableHead>
                    <TableHead>今日盈亏</TableHead>
                    <TableHead>持仓占比</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>交易</TableCell>
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
                    <TableCell>交易</TableCell>
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
                    <TableHead>名称</TableHead>
                    <TableHead>委托时间</TableHead>
                    <TableHead>委托价格</TableHead>
                    <TableHead>委托均价</TableHead>
                    <TableHead>委托数量</TableHead>
                    <TableHead>成交数量</TableHead>
                    <TableHead>交易方向</TableHead>
                    <TableHead>委托状态</TableHead>
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
                    <TableCell>买入</TableCell>
                    <TableCell>待成交</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Today's Transactions Tab */}
            <TabsContent value="today-transactions" className="mt-4 border-none p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名称</TableHead>
                    <TableHead>成交时间</TableHead>
                    <TableHead>成交数量</TableHead>
                    <TableHead>交易方向</TableHead>
                    <TableHead>成交金额</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>汇丰控股</TableCell>
                    <TableCell>2023-10-01 09:05</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>买入</TableCell>
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
                    <TableHead>名称</TableHead>
                    <TableHead>委托时间</TableHead>
                    <TableHead>委托价格</TableHead>
                    <TableHead>委托均价</TableHead>
                    <TableHead>委托数量</TableHead>
                    <TableHead>成交数量</TableHead>
                    <TableHead>交易方向</TableHead>
                    <TableHead>委托状态</TableHead>
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
                    <TableCell>买入</TableCell>
                    <TableCell>已成交</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            {/* Fund Flow Tab */}
            <TabsContent value="fund-flow" className="mt-4 border-none p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>交易日期</TableHead>
                    <TableHead>业务名称</TableHead>
                    <TableHead>发生金额</TableHead>
                    <TableHead>剩余金额</TableHead>
                    <TableHead>币种</TableHead>
                    <TableHead>备注</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-10-01</TableCell>
                    <TableCell>存入资金</TableCell>
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
    </div>
  );
};