import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Stock, DividendStock } from "../types/market"
import { useLanguage } from "../contexts/LanguageContext"


interface StockTablesProps {
  gainers: Stock[];
  losers: Stock[];
  hotStocks: Stock[];
  dividendStocks?: DividendStock[];
  dividendTitle?: string;
  onStockClick?: (stock: any, tableTitle?: string) => void;
  onShowMore?: (tableType: string) => void;
}

function StockTable({ title, data, showTTM = false, onStockClick, onShowMore }: { title: string; data: any[]; showTTM?: boolean; onStockClick?: (stock: any, tableTitle?: string) => void; onShowMore?: (tableType: string) => void }) {
  const { t } = useLanguage()
  
  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => onShowMore?.(title)}
        >
          {t('table.show_more')} →
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground">{t('table.code')}</TableHead>
            <TableHead className="text-muted-foreground">{t('table.name')}</TableHead>
            <TableHead className="text-muted-foreground">{t('table.change_percent')}</TableHead>
            <TableHead className="text-muted-foreground">{t('table.latest_price')}</TableHead>
            <TableHead className="text-muted-foreground">{showTTM ? t('table.dividend_yield_ttm') : t('table.change_amount')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock, i) => (
            <TableRow
              key={i}
              className="border-border hover:bg-muted/50 cursor-pointer"
              onClick={() => onStockClick?.(stock, title)}
            >
              <TableCell className="text-foreground font-mono">{stock.code}</TableCell>
              <TableCell className="text-foreground">{stock.name}</TableCell>
              <TableCell
                className={`font-semibold ${
                  stock.percentage?.startsWith("+")
                    ? "text-chart-1"
                    : stock.percentage?.startsWith("-")
                      ? "text-chart-2"
                      : "text-muted-foreground"
                }`}
              >
                {stock.percentage}
              </TableCell>
              <TableCell className="text-foreground font-mono">{stock.price}</TableCell>
              <TableCell
                className={`${
                  showTTM
                    ? "text-foreground"
                    : stock.change?.startsWith("+")
                      ? "text-chart-1"
                      : "text-chart-2"
                }`}
              >
                {showTTM ? stock.ttm : stock.change}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export function StockTables({ gainers, losers, hotStocks, dividendStocks, dividendTitle = "高股息", onStockClick, onShowMore }: StockTablesProps) {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <StockTable title={t('table.gainers')} data={gainers.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
        </div>
        <div className="flex-1">
          <StockTable title={t('table.losers')} data={losers.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
        </div>
      </div>

      <div className="flex gap-6">
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
