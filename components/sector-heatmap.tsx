import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sectorData = [
  { name: "银行", change: "+0.93%", size: "large", isPositive: true },
  { name: "数码解决方案服务", change: "+1.42%", size: "large", isPositive: true },
  { name: "线上零售商", change: "+2.92%", size: "medium", isPositive: true },
  { name: "保险", change: "+2.26%", size: "medium", isPositive: true },
  { name: "电讯服务", change: "+0.73%", size: "medium", isPositive: true },
  { name: "地产发展商", change: "+0.85%", size: "small", isPositive: true },
  { name: "能源储存装置", change: "-0.58%", size: "small", isPositive: false },
  { name: "药品", change: "+1.98%", size: "small", isPositive: true },
  { name: "汽车生产商", change: "+0.54%", size: "medium", isPositive: true },
  { name: "生物技术", change: "+2.99%", size: "small", isPositive: true },
  { name: "互联网软件及服务", change: "+0.46%", size: "small", isPositive: true },
  { name: "家庭电器", change: "+2.22%", size: "small", isPositive: true },
  { name: "其他金融", change: "+1.35%", size: "small", isPositive: true },
  { name: "电讯设备", change: "+1.68%", size: "small", isPositive: true },
  { name: "服装", change: "-3.68%", size: "small", isPositive: false },
  { name: "汽车", change: "+1.26%", size: "medium", isPositive: true },
  { name: "证券及经纪", change: "+8.36%", size: "small", isPositive: true },
  { name: "餐饮", change: "+4.35%", size: "small", isPositive: true },
  { name: "航空货运及物流", change: "-0.82%", size: "small", isPositive: false },
  { name: "综合性石油及天然气企业", change: "-0.73%", size: "small", isPositive: false },
]

export function SectorHeatmap() {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-foreground">热力图</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-foreground bg-primary/20">
                行业
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                个股
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            更多 →
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {sectorData.map((sector, i) => {
            const sizeClass =
              sector.size === "large"
                ? "col-span-2 h-20"
                : sector.size === "medium"
                  ? "col-span-1 h-16"
                  : "col-span-1 h-12"
            const bgColor = sector.isPositive ? "bg-chart-1/20 border-chart-1/30" : "bg-chart-2/20 border-chart-2/30"
            const textColor = sector.isPositive ? "text-chart-1" : "text-chart-2"

            return (
              <div
                key={i}
                className={`${sizeClass} ${bgColor} border rounded-lg p-3 flex flex-col justify-center items-center text-center hover:opacity-80 transition-opacity cursor-pointer`}
              >
                <div className="text-sm font-medium text-foreground text-balance leading-tight">{sector.name}</div>
                <div className={`text-sm font-semibold ${textColor} mt-1`}>{sector.change}</div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
