import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  assetBreakdown, 
  currencyBreakdown, 
  chartViews
} from '../../data/account-mock-data';
import { TotalAssetTrend } from './TotalAssetTrend';
import { EarningsCalendar } from './EarningsCalendar';

import { useLanguage } from '../../contexts/LanguageContext';

interface AccountOverviewProps {
  selectedPeriod: string;
  selectedView: string;
  onPeriodChange: (period: string) => void;
  onViewChange: (view: string) => void;
  isMasked?: boolean;
}

export const AccountOverview = ({
  selectedPeriod,
  selectedView,
  onPeriodChange,
  onViewChange,
  isMasked
}: AccountOverviewProps) => {
  const { t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState('2025/09');

  const maskValue = (value: string) => (isMasked ? '****' : value);
  
  // Set default view to 'total-asset' if not already set
  useState(() => {
    if (selectedView !== 'total-asset') {
      onViewChange('total-asset');
    }
  });
  return (
    <>
      {/* Chart Title */}
      <h2 className="text-sm font-medium text-foreground">{t('account.all_accounts')}</h2>
      
      {/* Asset Cards */}
      <div className='flex gap-2'>
        {/* Asset Breakdown */}
        <Card className="w-96">
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
                  <span className="text-xs">{maskValue(item.percentage)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Currency Breakdown */}
        <Card className="w-96">
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
                  <span className="text-xs">{maskValue(item.percentage)}</span>
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
      {selectedView === 'calendar' ? (
        <EarningsCalendar 
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          isMasked={isMasked}
        />
      ) : (
        <TotalAssetTrend 
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
          isMasked={isMasked}
        />
      )}
    </>
  );
};