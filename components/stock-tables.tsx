import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const gainersData = [
  { rank: 1, code: "00243", name: "品质国际", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 2, code: "01375", name: "中州证券", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 3, code: "00381", name: "权识国际", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 4, code: "00476", name: "科特动力控股", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 5, code: "00721", name: "中国金融国际", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 6, code: "01456", name: "国联民生", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 7, code: "03329", name: "交通国际", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 8, code: "01141", name: "民银资本", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 9, code: "00619", name: "南华金融", change: "+94.87%", price: "0.380", volume: "-0.185" },
  { rank: 10, code: "02286", name: "威兴发展", change: "+94.87%", price: "0.380", volume: "-0.185" },
]

const losersData = [
  { rank: 1, code: "00243", name: "品质国际", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 2, code: "01375", name: "中州证券", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 3, code: "00381", name: "权识国际", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 4, code: "00476", name: "科特动力控股", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 5, code: "00721", name: "中国金融国际", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 6, code: "01456", name: "国联民生", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 7, code: "03329", name: "交通国际", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 8, code: "01141", name: "民银资本", change: "0.00%", price: "0.380", volume: "-0.185" },
  { rank: 9, code: "00619", name: "南华金融", change: "-94.87%", price: "0.380", volume: "-0.185" },
  { rank: 10, code: "02286", name: "威兴发展", change: "-94.87%", price: "0.380", volume: "-0.185" },
]

const activeData = [
  { rank: 1, code: "00243", name: "品质国际", change: "+94.87%", price: "0.380", ttm: "154.490%" },
  { rank: 2, code: "01375", name: "中州证券", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 3, code: "00381", name: "权识国际", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 4, code: "00476", name: "科特动力控股", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 5, code: "00721", name: "中国金融国际", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 6, code: "01456", name: "国联民生", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 7, code: "03329", name: "交通国际", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 8, code: "01141", name: "民银资本", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 9, code: "00619", name: "南华金融", change: "94.87%", price: "0.380", ttm: "+0.18%" },
  { rank: 10, code: "02286", name: "威兴发展", change: "94.87%", price: "0.380", ttm: "+0.18%" },
]

function StockTable({ title, data, showTTM = false }: { title: string; data: any[]; showTTM?: boolean }) {
  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          更多 →
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground">序号</TableHead>
            <TableHead className="text-muted-foreground">代码</TableHead>
            <TableHead className="text-muted-foreground">名称</TableHead>
            <TableHead className="text-muted-foreground">涨跌幅</TableHead>
            <TableHead className="text-muted-foreground">最新价</TableHead>
            <TableHead className="text-muted-foreground">{showTTM ? "股息率TTM" : "涨跌额"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock, i) => (
            <TableRow key={i} className="border-border hover:bg-muted/50">
              <TableCell className="text-muted-foreground">{stock.rank}</TableCell>
              <TableCell className="text-foreground font-mono">{stock.code}</TableCell>
              <TableCell className="text-foreground">{stock.name}</TableCell>
              <TableCell
                className={`font-semibold ${
                  stock.change.startsWith("+")
                    ? "text-chart-1"
                    : stock.change.startsWith("-")
                      ? "text-chart-2"
                      : "text-muted-foreground"
                }`}
              >
                {stock.change}
              </TableCell>
              <TableCell className="text-foreground font-mono">{stock.price}</TableCell>
              <TableCell
                className={`${
                  showTTM
                    ? "text-foreground"
                    : (stock.volume || stock.ttm)?.startsWith("+")
                      ? "text-chart-1"
                      : "text-chart-2"
                }`}
              >
                {showTTM ? stock.ttm : stock.volume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export function StockTables() {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <StockTable title="领涨榜" data={gainersData} />
        </div>
        <div className="flex-1">
          <StockTable title="领跌榜" data={losersData} />
        </div>
      </div>

      <div className="flex">
        <div className="flex-1">
          <StockTable title="热度榜" data={activeData} showTTM={true} />
        </div>
      </div>
    </div>
  )
}
