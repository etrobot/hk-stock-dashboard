import { upcomingStocks, listedNewStocks } from '../data/mock-data'

export const NewStockCenter = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">待上市</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 px-3 whitespace-nowrap">序号</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">代码</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">名称</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">发行价</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">每手股数</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">最小申购金额</th>
              </tr>
            </thead>
            <tbody>
              {upcomingStocks.map((stock, index) => (
                <tr key={stock.code} className="border-b hover:bg-muted/50 text-xs">
                  <td className="py-2 px-3 whitespace-nowrap">{index + 1}</td>
                  <td className="py-2 px-3 font-medium whitespace-nowrap">{stock.code}</td>
                  <td className="py-2 px-3 whitespace-nowrap">{stock.name}</td>
                  <td className="py-2 px-3 text-right whitespace-nowrap">{stock.ipoPrice}</td>
                  <td className="py-2 px-3 text-right whitespace-nowrap">{stock.lotSize}</td>
                  <td className="py-2 px-3 text-right whitespace-nowrap">{stock.minSubscription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">已上市</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 px-3 whitespace-nowrap">序号</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">代码</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">名称</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">最新价</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">首日涨幅</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">暗盘涨跌额</th>
              </tr>
            </thead>
            <tbody>
              {listedNewStocks.map((stock, index) => {
                const isPositive = stock.firstDayChange.startsWith('+') || (stock.firstDayChange !== '0.00%' && !stock.firstDayChange.includes('-'))
                return (
                  <tr key={stock.code} className="border-b hover:bg-muted/50 text-xs">
                    <td className="py-2 px-3 whitespace-nowrap">{index + 1}</td>
                    <td className="py-2 px-3 font-medium whitespace-nowrap">{stock.code}</td>
                    <td className="py-2 px-3 whitespace-nowrap">{stock.name}</td>
                    <td className="py-2 px-3 text-right whitespace-nowrap">{stock.latestPrice}</td>
                    <td className={`py-2 px-3 text-right whitespace-nowrap ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.firstDayChange}
                    </td>
                    <td className={`py-2 px-3 text-right whitespace-nowrap ${stock.darkMarketChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.darkMarketChange}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}