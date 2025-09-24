import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Stock, DividendStock } from "../types/market"


interface StockTablesProps {
  gainers: Stock[];
  losers: Stock[];
  hotStocks: Stock[];
  dividendStocks?: DividendStock[];
  dividendTitle?: string;
  onStockClick?: (stock: any) => void;
  onShowMore?: (tableType: string) => void;
}

function StockTable({ title, data, showTTM = false, onStockClick, onShowMore }: { title: string; data: any[]; showTTM?: boolean; onStockClick?: (stock: any) => void; onShowMore?: (tableType: string) => void }) {
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
          更多 →
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground">代码</TableHead>
            <TableHead className="text-muted-foreground">名称</TableHead>
            <TableHead className="text-muted-foreground">涨跌幅</TableHead>
            <TableHead className="text-muted-foreground">最新价</TableHead>
            <TableHead className="text-muted-foreground">{showTTM ? "股息率TTM" : "涨跌额"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock, i) => (
            <TableRow
              key={i}
              className="border-border hover:bg-muted/50 cursor-pointer"
              onClick={() => onStockClick?.(stock)}
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
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <StockTable title="领涨榜" data={gainers.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
        </div>
        <div className="flex-1">
          <StockTable title="领跌榜" data={losers.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <StockTable title="热度榜" data={hotStocks.map((stock, i) => ({ ...stock, rank: i + 1 }))} onStockClick={onStockClick} onShowMore={onShowMore} />
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
