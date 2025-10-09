import { Button } from "./ui/button"
import { Stock, DividendStock } from "../types/market"
import { useLanguage } from "../contexts/LanguageContext"

interface StockTablesProps {
  gainers: Stock[]
  losers: Stock[]
  hotStocks: Stock[]
  dividendStocks?: DividendStock[]
  dividendTitle?: string
  onStockClick?: (stock: any, tableTitle?: string) => void
  onShowMore?: (tableType: string) => void
}

function StockTable({ title, data, showTTM = false, onStockClick, onShowMore }: { title: string; data: any[]; showTTM?: boolean; onStockClick?: (stock: any, tableTitle?: string) => void; onShowMore?: (tableType: string) => void }) {
  const { t } = useLanguage()
  const rows = data.slice(0, 10)

  return (
    <div className="p-3 border border-border rounded-md bg-card/30">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] leading-4 font-medium text-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-6 px-2 text-[10px]"
          onClick={() => onShowMore?.(title)}
        >
          {t('table.show_more')} →
        </Button>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-5 text-[10px] text-muted-foreground border-b border-border py-1">
          <div className="px-1">{t('table.code')}</div>
          <div className="px-1">{t('table.name')}</div>
          <div className="px-1">{t('table.change_percent')}</div>
          <div className="px-1">{t('table.latest_price')}</div>
          <div className="px-1">{showTTM ? t('table.dividend_yield_ttm') : t('table.change_amount')}</div>
        </div>
        <div className="max-h-[280px] overflow-hidden">
          {rows.map((stock, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center text-[10px] text-foreground border-b border-border hover:bg-muted/50 cursor-pointer"
              onClick={() => onStockClick?.(stock, title)}
            >
              <div className="px-1 py-1 font-mono">{stock.code}</div>
              <div className="px-1 py-1 truncate">{stock.name}</div>
              <div className={`px-1 py-1 font-semibold ${stock.percentage?.startsWith('+') ? 'text-chart-1' : stock.percentage?.startsWith('-') ? 'text-chart-2' : 'text-muted-foreground'}`}>{stock.percentage}</div>
              <div className="px-1 py-1 font-mono">{stock.price}</div>
              <div className={`px-1 py-1 ${showTTM ? 'text-foreground' : stock.change?.startsWith('+') ? 'text-chart-1' : 'text-chart-2'}`}>{showTTM ? stock.ttm : stock.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function StockTables({ gainers, losers, hotStocks, dividendStocks, dividendTitle = "高股息", onStockClick, onShowMore }: StockTablesProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1">
          <StockTable title={t('table.gainers')} data={gainers.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
        </div>
        <div className="flex-1">
          <StockTable title={t('table.losers')} data={losers.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <StockTable title={t('table.hot_stocks')} data={hotStocks.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
        </div>
        {dividendStocks && (
          <div className="flex-1">
            <StockTable title={dividendTitle} data={dividendStocks.map((stock, i) => ({ ...stock, rank: i + 1, ttm: stock.dividend }))} showTTM={true} onStockClick={onStockClick} onShowMore={onShowMore} />
          </div>
        )}
      </div>
    </div>
  )
}
