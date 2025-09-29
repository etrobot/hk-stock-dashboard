import { upcomingStocks, listedNewStocks } from '../data/mock-data'
import { useLanguage } from '../contexts/LanguageContext'

export const NewStockCenter = () => {
  const { t } = useLanguage()
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">{t('new_stock.upcoming')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 px-3 whitespace-nowrap">{t('new_stock.serial_number')}</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">{t('table.code')}</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">{t('table.name')}</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">{t('new_stock.ipo_price')}</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">{t('new_stock.lot_size')}</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">{t('new_stock.min_subscription')}</th>
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
        <h2 className="text-xl font-semibold mb-4">{t('new_stock.listed')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 px-3 whitespace-nowrap">{t('new_stock.serial_number')}</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">{t('table.code')}</th>
                <th className="text-left py-2 px-3 whitespace-nowrap">{t('table.name')}</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">{t('new_stock.latest_price')}</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">{t('new_stock.first_day_change')}</th>
                <th className="text-right py-2 px-3 whitespace-nowrap">{t('new_stock.dark_market_change')}</th>
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