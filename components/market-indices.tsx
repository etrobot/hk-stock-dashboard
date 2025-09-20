import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const indices = [
  {
    name: "恒生指数",
    value: "24406.09",
    change: "+377.72",
    percentage: "+1.57%",
    isPositive: true,
  },
  {
    name: "恒生科技指数",
    value: "5301.16",
    change: "+84.56",
    percentage: "+1.62%",
    isPositive: true,
  },
  {
    name: "恒生国企指数",
    value: "24411",
    change: "+388",
    percentage: "+1.62%",
    isPositive: true,
  },
  {
    name: "国企指数",
    value: "8800.21",
    change: "+131.95",
    percentage: "+1.52%",
    isPositive: true,
  },
]

export function MarketIndices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {indices.map((index, i) => (
        <Card key={i} className="p-4 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-muted-foreground">{index.name}</h3>
            <TrendingUp className="h-4 w-4 text-chart-1" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{index.value}</div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${index.isPositive ? "text-chart-1" : "text-chart-2"}`}>{index.change}</span>
              <span className={`text-sm ${index.isPositive ? "text-chart-1" : "text-chart-2"}`}>
                {index.percentage}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
