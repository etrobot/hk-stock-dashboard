import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface TotalAssetTrendProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const timePeriods = [
  { label: '近1周', value: '1w' },
  { label: '近1月', value: '1m' },
  { label: '年初至今', value: 'ytd' },
  { label: '自定义', value: 'custom' }
];

export const TotalAssetTrend = ({
  selectedPeriod,
  onPeriodChange
}: TotalAssetTrendProps) => {
  return (
    <>
      {/* Time Period Buttons */}
      <div className="flex items-center space-x-2 mb-6">
        {timePeriods.map((period) => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? "default" : "outline"}
            size="sm"
            onClick={() => onPeriodChange(period.value)}
            className={`text-xs h-[18px] px-2 rounded-[3px] ${
              selectedPeriod === period.value
                ? 'bg-[#FF5C00] text-white border-transparent hover:bg-[#FF5C00]/90'
                : 'bg-[rgba(75,82,105,0.5)] text-[#8A8B96] border-transparent hover:bg-[rgba(75,82,105,0.7)]'
            }`}
          >
            {period.label}
          </Button>
        ))}
      </div>

      {/* Asset Metrics */}
      <div className="flex items-center space-x-20 mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>资产净值</span>
            <span>·</span>
            <span>HKD</span>
          </div>
          <div className="text-sm font-bold text-foreground" style={{ fontFamily: 'D', fontSize: '14px' }}>
            408.92
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-0.5 bg-[#FF5C00]"></div>
            <span>当日收益</span>
          </div>
          <div className="text-sm font-bold text-green-500" style={{ fontFamily: 'D', fontSize: '14px' }}>
            +0.65
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <Card className="h-full">
        <CardContent className="p-0">
          {/* Chart Area */}
          <div className="h-96 bg-card rounded relative overflow-hidden">
            {/* Y-axis Grid Lines */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-full border-t border-border/20" 
                  style={{ top: `${i * 25}%` }}
                />
              ))}
            </div>
            
            {/* Asset Trend Line Chart */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="assetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Asset trend area */}
              <path
                d="M0,300 Q200,280 400,260 T800,240 T1200,220 L1200,384 L0,384 Z"
                fill="url(#assetGradient)"
              />
              
              {/* Asset trend line */}
              <path
                d="M0,300 Q200,280 400,260 T800,240 T1200,220"
                stroke="#FF5C00"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Y-axis labels */}
            <div className="absolute right-2 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-4" style={{ fontFamily: 'D', fontSize: '8px' }}>
              <span>424.6</span>
              <span></span>
              <span></span>
              <span></span>
              <span>302.01%</span>
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 right-8 flex justify-between text-xs text-muted-foreground" style={{ fontFamily: 'D', fontSize: '8px' }}>
              <span>2025/01/01</span>
              <span>2025/07/11</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};