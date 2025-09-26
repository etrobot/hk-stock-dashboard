'use client'

interface CapitalFlowData {
  category: string
  inflow: number
  outflow: number
  inflowPercentage: number
  outflowPercentage: number
}

interface CapitalFlowChartProps {
  totalInflow: number
  totalOutflow: number
  netOutflow: number
  data: CapitalFlowData[]
}

export function CapitalFlowChart({ 
  totalInflow, 
  totalOutflow, 
  netOutflow,
  data 
}: CapitalFlowChartProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center space-y-3 text-white">
      {/* Inflow/Outflow Summary */}
      <div className="flex items-center justify-center gap-8 text-xs">
        <div>
          <span className="text-gray-400">流入：</span>
          <span className="text-green-500 font-mono text-sm">
            {totalInflow.toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-gray-400">流出：</span>
          <span className="text-red-500 font-mono text-sm">
            {totalOutflow.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Central Pie Chart */}
      <div className="flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-red-400 via-orange-400 to-green-400 flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400">净流出</div>
              <div className="text-sm font-bold text-green-500">
                {netOutflow.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Category Bar Charts */}
      <div className="space-y-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-xs">
            <div className="w-12 text-right text-red-400 font-mono">
              {item.inflow.toFixed(0)}
            </div>
            <div className="flex-1 mx-2 flex items-center">
              <div className="flex-1 h-2 bg-gray-700 relative">
                <div 
                  className="h-full bg-red-500"
                  style={{ width: `${item.inflowPercentage}%` }}
                />
              </div>
              <div className="w-8 text-center text-gray-400 text-xs">
                {item.category}
              </div>
              <div className="flex-1 h-2 bg-gray-700 relative">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${item.outflowPercentage}%` }}
                />
              </div>
            </div>
            <div className="w-12 text-green-400 font-mono">
              {item.outflow.toFixed(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}