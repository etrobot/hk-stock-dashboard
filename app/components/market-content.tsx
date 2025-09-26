interface MarketContentProps {
  indexCode?: string;
}

export function MarketContent({ }: MarketContentProps) {
  return (
    <div className="bg-background">
      {/* 资金流向趋势 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-foreground">资金流向趋势</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>单位：元</span>
            <button className="text-muted-foreground hover:text-foreground">历史数据</button>
          </div>
        </div>
        
        {/* 时间段选择 */}
        <div className="flex items-center gap-1 mb-3">
          <div className="bg-muted rounded-full px-4 py-1">
            <button className="bg-background rounded-full px-3 py-1 text-xs text-foreground shadow-sm">5日</button>
          </div>
          <button className="px-3 py-1 text-xs text-muted-foreground">20日</button>
          <button className="px-3 py-1 text-xs text-muted-foreground">60日</button>
        </div>
        
        <div className="text-xs text-muted-foreground mb-3">5日净流入：9.99亿</div>
        
        {/* 图表区域 */}
        <div className="h-48 bg-muted/50 border border-border mb-3 flex items-center justify-center">
          <div className="text-muted-foreground text-xs">资金流向图表</div>
        </div>
        
        {/* 图例 */}
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500"></div>
            <span className="text-muted-foreground">净流入</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500"></div>
            <span className="text-muted-foreground">净流出</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            <span className="text-muted-foreground">收盘价</span>
          </div>
        </div>
      </div>

      {/* 资金成交统计 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-foreground">资金成交统计</h3>
          <span className="text-xs text-muted-foreground">单位：万元</span>
        </div>
        <div className="text-xs text-muted-foreground mb-3">更新：2021/06/07 10:17</div>
        
        {/* 饼图和净流出 */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-conic from-red-400 via-orange-400 to-green-400 flex items-center justify-center">
            <div className="w-20 h-20 bg-background rounded-full flex flex-col items-center justify-center">
              <div className="text-xs text-muted-foreground">净流出</div>
              <div className="text-sm font-semibold text-green-500">1.72</div>
            </div>
          </div>
        </div>
        
        {/* 流入流出统计 */}
        <div className="flex items-center justify-center gap-8 text-xs mb-4">
          <div>
            <span className="text-muted-foreground">流入：</span>
            <span className="text-red-500">64273.88</span>
          </div>
          <div>
            <span className="text-muted-foreground">流出：</span>
            <span className="text-green-500">83116.79</span>
          </div>
        </div>

        {/* 分类统计 */}
        <div className="space-y-2">
          {[
            { name: "特大", inflow: "6053.98", outflow: "2636.57", inflowWidth: "4.11%", outflowWidth: "1.79%" },
            { name: "大单", inflow: "13044.97", outflow: "15528.90", inflowWidth: "8.85%", outflowWidth: "10.54%" },
            { name: "中单", inflow: "16597.67", outflow: "17585.03", inflowWidth: "11.26%", outflowWidth: "11.93%" },
            { name: "小单", inflow: "28577.26", outflow: "47366.29", inflowWidth: "19.39%", outflowWidth: "32.14%" }
          ].map((item, index) => (
            <div key={index} className="flex items-center text-xs">
              <div className="w-16 text-right text-red-500">{item.inflow}</div>
              <div className="flex-1 mx-2 flex items-center">
                <div className="flex-1 h-4 bg-muted relative">
                  <div className="h-full bg-red-500" style={{ width: item.inflowWidth }}></div>
                </div>
                <div className="w-8 text-center text-muted-foreground">{item.name}</div>
                <div className="flex-1 h-4 bg-muted relative">
                  <div className="h-full bg-green-500" style={{ width: item.outflowWidth }}></div>
                </div>
              </div>
              <div className="w-16 text-green-500">{item.outflow}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 买卖盘十档 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-foreground">买卖盘十档</h3>
          <div className="w-6 h-6 bg-muted rounded text-xs flex items-center justify-center text-muted-foreground">10</div>
        </div>
        
        {/* 买卖比例 */}
        <div className="flex items-center gap-2 mb-3 text-xs">
          <span className="text-red-500">45.79%</span>
          <div className="flex-1 h-2 bg-muted rounded overflow-hidden">
            <div className="h-full flex">
              <div className="bg-red-500 w-[45.79%]"></div>
              <div className="bg-green-500 flex-1"></div>
            </div>
          </div>
          <span className="text-green-500">54.21%</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 买盘 */}
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={`flex items-center gap-2 py-1 text-xs ${i === 0 ? 'bg-red-50 dark:bg-red-950/20' : ''}`}>
                <div className="w-4 h-4 bg-red-500 rounded text-white flex items-center justify-center text-[10px]">
                  {i + 1}
                </div>
                <span className="text-red-500 flex-1">188.600</span>
                <span className="text-muted-foreground">8.7K(12)</span>
              </div>
            ))}
          </div>
          
          {/* 卖盘 */}
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={`flex items-center gap-2 py-1 text-xs ${i === 0 ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                <div className="w-4 h-4 bg-green-500 rounded text-white flex items-center justify-center text-[10px]">
                  {i + 1}
                </div>
                <span className="text-red-500 flex-1">188.600</span>
                <span className="text-muted-foreground">8.7K(12)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 买卖盘经纪 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-foreground">买卖盘经纪</h3>
          <div className="w-6 h-6 bg-muted rounded text-xs flex items-center justify-center text-muted-foreground">10</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 买盘经纪 */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">买盘经纪</h4>
            {[
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "花期银行" },
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "瑞银" },
              { code: "9045", name: "瑞银" }
            ].map((broker, index) => (
              <div key={index} className={`flex items-center gap-2 py-1 text-xs ${index === 0 ? 'bg-red-50 dark:bg-red-950/20' : ''}`}>
                <div className="w-4 h-4 bg-red-500 rounded text-white flex items-center justify-center text-[10px]">
                  {index + 1}
                </div>
                <span className="text-muted-foreground">{broker.code}</span>
                <span className="text-foreground">{broker.name}</span>
              </div>
            ))}
          </div>
          
          {/* 卖盘经纪 */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">卖盘经纪</h4>
            {[
              { code: "3288", name: "美林" },
              { code: "3288", name: "巴克莱亚洲" },
              { code: "3288", name: "巴克莱亚洲" },
              { code: "3288", name: "高盛" },
              { code: "3288", name: "摩根士丹利" },
              { code: "3288", name: "美林" },
              { code: "3288", name: "美林" },
              { code: "3288", name: "美林" },
              { code: "3288", name: "美林" },
              { code: "3288", name: "美林" }
            ].map((broker, index) => (
              <div key={index} className={`flex items-center gap-2 py-1 text-xs ${index === 0 ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                <div className="w-4 h-4 bg-green-500 rounded text-white flex items-center justify-center text-[10px]">
                  {index + 1}
                </div>
                <span className="text-muted-foreground">{broker.code}</span>
                <span className="text-foreground">{broker.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}