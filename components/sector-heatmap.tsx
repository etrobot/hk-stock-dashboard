import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

interface TreeNode {
  name: string;
  id: string;
  value: number[];
  children?: TreeNode[];
}

// Mock sector data with market cap, previous value, and change percentage
const mockSectorData: TreeNode[] = [
  {
    name: "金融服务",
    id: "financial",
    value: [45000, 44200, 1.81, 0], // [current_value, previous_value, change_percent, visual_value]
    children: [
      { name: "银行", id: "bank", value: [25000, 24800, 0.81, 0] },
      { name: "保险", id: "insurance", value: [12000, 11750, 2.13, 0] },
      { name: "证券及经纪", id: "securities", value: [8000, 7380, 8.40, 0] }
    ]
  },
  {
    name: "科技",
    id: "technology", 
    value: [38000, 37100, 2.43, 0],
    children: [
      { name: "数码解决方案服务", id: "digital", value: [15000, 14800, 1.35, 0] },
      { name: "互联网软件及服务", id: "internet", value: [13000, 12940, 0.46, 0] },
      { name: "电讯设备", id: "telecom_equipment", value: [6000, 5900, 1.69, 0] },
      { name: "电讯服务", id: "telecom_service", value: [4000, 3970, 0.76, 0] }
    ]
  },
  {
    name: "消费",
    id: "consumer",
    value: [32000, 31200, 2.56, 0],
    children: [
      { name: "线上零售商", id: "ecommerce", value: [12000, 11660, 2.92, 0] },
      { name: "汽车", id: "auto", value: [8000, 7900, 1.27, 0] },
      { name: "餐饮", id: "food", value: [5000, 4790, 4.38, 0] },
      { name: "服装", id: "clothing", value: [4000, 4150, -3.61, 0] },
      { name: "家庭电器", id: "appliances", value: [3000, 2935, 2.21, 0] }
    ]
  },
  {
    name: "医疗健康",
    id: "healthcare",
    value: [18000, 17640, 2.04, 0],
    children: [
      { name: "药品", id: "pharma", value: [10000, 9800, 2.04, 0] },
      { name: "生物技术", id: "biotech", value: [8000, 7770, 2.96, 0] }
    ]
  },
  {
    name: "能源材料",
    id: "energy",
    value: [15000, 15180, -1.19, 0],
    children: [
      { name: "综合性石油及天然气企业", id: "oil_gas", value: [8000, 8060, -0.74, 0] },
      { name: "能源储存装置", id: "energy_storage", value: [4000, 4020, -0.50, 0] },
      { name: "地产发展商", id: "real_estate", value: [3000, 2975, 0.84, 0] }
    ]
  },
  {
    name: "物流运输",
    id: "logistics",
    value: [8000, 8070, -0.87, 0],
    children: [
      { name: "航空货运及物流", id: "air_logistics", value: [8000, 8070, -0.87, 0] }
    ]
  }
]

export function SectorHeatmap() {
  const [chartData, setChartData] = useState<TreeNode[]>([])

  useEffect(() => {
    // Process data similar to the original example
    const processedData = JSON.parse(JSON.stringify(mockSectorData))
    convertData(processedData)
    setChartData(processedData)
  }, [])

  function convertData(originList: TreeNode[]) {
    let min = Infinity
    let max = -Infinity

    // Find min and max change percentages
    function findMinMax(nodes: TreeNode[]) {
      for (const node of nodes) {
        if (node.value[2] != null) {
          min = Math.min(min, node.value[2])
          max = Math.max(max, node.value[2])
        }
        if (node.children) {
          findMinMax(node.children)
        }
      }
    }

    findMinMax(originList)

    // Convert data and assign visual values
    function processNodes(nodes: TreeNode[]) {
      for (const node of nodes) {
        const changePercent = node.value[2]
        
        if (changePercent != null) {
          // Map change percentage to visual scale
          if (changePercent > 0) {
            node.value[3] = Math.min(100, (changePercent / max) * 100)
          } else if (changePercent < 0) {
            node.value[3] = Math.max(-100, (changePercent / Math.abs(min)) * -100)
          } else {
            node.value[3] = 0
          }
        }

        if (node.children) {
          processNodes(node.children)
        }
      }
    }

    processNodes(originList)
  }

  const option = {
    title: {
      left: 'center',
      text: '港股板块热力图',
      subtext: '涨幅 > 0: 绿色; 跌幅 < 0: 红色; 无变化 = 0: 灰色',
      textStyle: {
        color: 'var(--foreground)',
        fontSize: 16
      },
      subtextStyle: {
        color: 'var(--muted-foreground)',
        fontSize: 12
      }
    },
    tooltip: {
      backgroundColor: 'var(--popover)',
      borderColor: 'var(--border)',
      textStyle: {
        color: 'var(--popover-foreground)'
      },
      formatter: function (info: any) {
        const value = info.value
        const marketCap = value[0] ? `${(value[0] / 1000).toFixed(1)}B` : '-'
        const prevValue = value[1] ? `${(value[1] / 1000).toFixed(1)}B` : '-'
        const change = value[2] != null ? `${value[2] > 0 ? '+' : ''}${value[2].toFixed(2)}%` : '-'

        return [
          `<div style="font-weight: bold; margin-bottom: 4px;">${info.name}</div>`,
          `市值: ${marketCap}<br/>`,
          `前值: ${prevValue}<br/>`,
          `涨跌幅: <span style="color: ${value[2] > 0 ? '#10b981' : value[2] < 0 ? '#ef4444' : '#6b7280'}">${change}</span>`
        ].join('')
      }
    },
    series: [
      {
        name: '港股板块',
        type: 'treemap',
        top: 60,
        label: {
          show: true,
          formatter: '{b}',
          color: 'var(--foreground)',
          fontSize: 12
        },
        itemStyle: {
          borderColor: 'var(--border)',
          borderWidth: 1
        },
        visualMin: -100,
        visualMax: 100,
        visualDimension: 3,
        levels: [
          {
            itemStyle: {
              borderWidth: 2,
              borderColor: 'var(--border)',
              gapWidth: 2
            }
          },
          {
            colorMappingBy: 'value',
            itemStyle: {
              gapWidth: 1,
              borderWidth: 1
            },
            visualMin: -100,
            visualMax: 100,
            color: [
              '#ef4444', // Red for negative
              '#6b7280', // Gray for neutral  
              '#10b981'  // Green for positive
            ]
          }
        ],
        data: chartData
      }
    ]
  }

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

        <div className="h-96">
          <ReactECharts 
            option={option}
            style={{ height: '100%', width: '100%' }}
            theme="dark"
          />
        </div>
      </Card>
    </div>
  )
}
