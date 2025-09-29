import { useState } from 'react';
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
import { TotalAssetTrend } from './TotalAssetTrend';
import { EarningsCalendar } from './EarningsCalendar';
import { TrendChart } from './TrendChart';
import { useLanguage } from '../../contexts/LanguageContext';

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
  const { t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState('2025/09');
  return (
    <>
      {/* Chart Title */}
      <h2 className="text-sm font-medium text-foreground">{t('account.all_accounts')}</h2>
      
      {/* Asset Cards */}
      <div className='flex gap-2'>
        {/* Asset Breakdown */}
        <Card className="min-w-96">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('account.category')}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {/* Category and Percentage Labels */}
            <div className="flex justify-between text-xs text-muted-foreground mb-4">
              <span>{t('account.category')}</span>
              <span>{t('account.proportion')}</span>
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
                    <span className="text-xs">{item.category}</span>
                  </div>
                  <span className="text-xs">{item.percentage}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Currency Breakdown */}
        <Card className="min-w-96">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('account.currency')}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {/* Category and Percentage Labels */}
            <div className="flex justify-between text-xs text-muted-foreground mb-4">
              <span>{t('account.currency')}</span>
              <span>{t('account.proportion')}</span>
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
                    <span className="text-xs">{item.currency}</span>
                  </div>
                  <span className="text-xs">{item.percentage}</span>
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
              selectedView === view.value
                ? 'text-foreground font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t(view.label)}
            {selectedView === view.value && (
              <div className="absolute -bottom-1 left-0 w-3 h-0.5 bg-[#FF5C00] rounded"></div>
            )}
          </button>
        ))}
      </div>


      {/* Chart Container - Conditional rendering based on selected view */}
      {selectedView === 'total-asset' ? (
        <TotalAssetTrend 
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
        />
      ) : selectedView === 'calendar' ? (
        <EarningsCalendar 
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      ) : (
        <>
          {/* Time Period Buttons - Only for returns view */}
          <div className="flex items-center space-x-2">
            {timePeriods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? "default" : "outline"}
                size="sm"
                onClick={() => onPeriodChange(period.value)}
                className={`text-xs h-[18px] px-2 rounded-[3px] ${
                  selectedPeriod === period.value
                    ? 'bg-[#FF5C00] text-white border-transparent hover:bg-[#FF5C00]/90'
                    : ''
                }`}
              >
                {t(period.label)}
              </Button>
            ))}
          </div>

          {/* Performance Metrics - Only for returns view */}
          <div className="flex items-center space-x-8 mt-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{t('account.cumulative_return')}</span>
                <span>·</span>
                <span>HKD</span>
                <Info className="w-2.5 h-2.5" />
              </div>
              <div className="text-sm font-bold text-[#16BA71]">
                +64.33
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-0.5 bg-[#FF5C00]"></div>
                <span>{t('account.return_rate')}</span>
                <span>·</span>
                <span>{t('account.simple_weighted')}</span>
                <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8l-3-3h6l-3 3z"/>
                </svg>
              </div>
              <div className="text-sm font-bold text-[#16BA71]">
                +19.55%
              </div>
            </div>
          </div>

          <Card className="h-full mt-6">
            <CardContent className="p-0">
              {/* Trend Chart from MasterGo Design */}
              <div className="h-80 relative">
                <TrendChart height={310} className="w-full" />
              </div>

              {/* Benchmark Comparison */}
              <div className="mt-6 px-4 pb-4">
                <div className="flex flex-wrap gap-6">
                  {benchmarkComparisons.map((benchmark, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-1.5 h-0.5 rounded-sm" 
                        style={{ backgroundColor: benchmark.color }}
                      ></div>
                      <span className="text-xs text-muted-foreground">{benchmark.name}</span>
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
      )}
    </>
  );
};