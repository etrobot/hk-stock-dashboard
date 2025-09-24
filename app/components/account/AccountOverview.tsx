import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Info } from 'lucide-react';
import { 
  assetBreakdown, 
  currencyBreakdown, 
  benchmarkComparisons,
  timePeriods,
  chartViews
} from '../../data/account-mock-data';

interface AccountOverviewProps {
  selectedPeriod: string;
  selectedView: string;
  onPeriodChange: (period: string) => void;
  onViewChange: (view: string) => void;
}

export const AccountOverview = ({
  selectedPeriod,
  selectedView,
  onPeriodChange,
  onViewChange
}: AccountOverviewProps) => {
  return (
    <>
      {/* Chart Title */}
      <h2 className="text-sm font-medium text-white">全部账户</h2>
      
      {/* Asset Cards */}
      <div className='flex gap-2'>
        {/* Asset Breakdown */}
        <Card className="bg-[#1A1D28] border-[#2D303D] min-w-96">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">品类</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {/* Category and Percentage Labels */}
            <div className="flex justify-between text-xs text-[#72737A] mb-4">
              <span>品类</span>
              <span>比例</span>
            </div>
            
            {/* Progress Bar */}
            <div className="flex h-1.5 mb-4 rounded overflow-hidden">
              <div className="bg-[#0898A9] flex-[93]"></div>
              <div className="bg-[#01C583] flex-[121]"></div>
            </div>
            
            <div className="space-y-3">
              {assetBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-sm" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-white">{item.category}</span>
                  </div>
                  <span className="text-xs text-white">{item.percentage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Currency Breakdown */}
        <Card className="bg-[#1A1D28] border-[#2D303D] min-w-96">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white">币种</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {/* Category and Percentage Labels */}
            <div className="flex justify-between text-xs text-[#72737A] mb-4">
              <span>币种</span>
              <span>比例</span>
            </div>
            
            {/* Progress Bar */}
            <div className="flex h-1.5 mb-4 rounded overflow-hidden">
              <div className="bg-[#2864FD] flex-[176]"></div>
              <div className="bg-[#019BA8] flex-[38]"></div>
            </div>
            
            <div className="space-y-3">
              {currencyBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-sm" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-white">{item.currency}</span>
                  </div>
                  <span className="text-xs text-white">{item.percentage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> 
      </div>

      {/* Chart View Tabs */}
      <div className="flex items-center space-x-6">
        {chartViews.map((view) => (
          <button
            key={view.value}
            onClick={() => onViewChange(view.value)}
            className={`text-xs relative ${
              view.active || selectedView === view.value
                ? 'text-[#72737A] font-medium' 
                : 'text-[#72737A] hover:text-gray-300'
            }`}
          >
            {view.label}
            {(view.active || selectedView === view.value) && (
              <div className="absolute -bottom-1 left-0 w-3 h-0.5 bg-[#FF5C00] rounded"></div>
            )}
          </button>
        ))}
      </div>

      {/* Time Period Buttons */}
      <div className="flex items-center space-x-2">
        {timePeriods.map((period) => (
          <Button
            key={period.value}
            variant="outline"
            size="sm"
            onClick={() => onPeriodChange(period.value)}
            className={`text-xs h-[18px] px-2 rounded-[3px] border ${
              period.active || selectedPeriod === period.value
                ? 'bg-[#FF5C00] text-[#8A8B96]  bg-opacity-50 border-transparent'
                : 'bg-transparent border-[rgba(75,82,105,0.5)] text-[#8A8B96] hover:hover:border-gray-500'
            }`}
          >
            {period.label}
          </Button>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="flex items-center space-x-8 mt-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-[#9FA0A9]">
            <span>累计收益</span>
            <span>·</span>
            <span>HKD</span>
            <Info className="w-2.5 h-2.5" />
          </div>
          <div className="text-sm font-bold text-[#16BA71]">
            +64.33
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-[#9FA0A9]">
            <div className="w-1.5 h-0.5 bg-[#FF5C00]"></div>
            <span>收益率</span>
            <span>·</span>
            <span>简单加权</span>
            <svg className="w-3 h-3 text-[#8A8B96]" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8l-3-3h6l-3 3z"/>
            </svg>
          </div>
          <div className="text-sm font-bold text-[#16BA71]">
            +19.55%
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <Card className="bg-[#1A1D28] border-[#2D303D] h-full mt-6">
        <CardContent className="p-0">
          {/* Performance Chart Placeholder */}
          <div className="h-64 bg-gradient-to-b from-transparent to-gray-900/20 rounded relative overflow-hidden">
            {/* Chart Grid Lines */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-full border-t border-[rgba(75,82,105,0.2)]" 
                  style={{ top: `${i * 25}%` }}
                />
              ))}
            </div>
            
            {/* Performance Line */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#12BED9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#12BED9" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Performance area */}
              <path
                d="M0,200 Q100,180 200,160 T400,140 T600,120 T800,100 T1000,110 T1200,130 L1200,250 L0,250 Z"
                fill="url(#performanceGradient)"
              />
              
              {/* Performance line */}
              <path
                d="M0,200 Q100,180 200,160 T400,140 T600,120 T800,100 T1000,110 T1200,130"
                stroke="#12BED9"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Y-axis labels */}
            <div className="absolute right-2 top-0 h-full flex flex-col justify-between text-xs text-[#72737A] py-2">
              <span>+29.98%</span>
              <span>+15%</span>
              <span>0%</span>
              <span>-15%</span>
              <span>-28.44%</span>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 right-8 flex justify-between text-xs text-[#72737A]">
              <span>2025/01/01</span>
              <span>2025/07/11</span>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-6">
              {benchmarkComparisons.map((benchmark, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-1.5 h-0.5 rounded-sm" 
                    style={{ backgroundColor: benchmark.color }}
                  ></div>
                  <span className="text-xs text-[#9FA0A9]">{benchmark.name}</span>
                  <span 
                    className={`text-xs font-medium ${
                      benchmark.isPositive ? 'text-[#16BA71]' : 'text-[#F44345]'
                    }`}
                  >
                    {benchmark.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};