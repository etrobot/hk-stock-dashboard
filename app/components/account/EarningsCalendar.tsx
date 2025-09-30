import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

interface EarningsData {
  date: number;
  earnings: number;
  returnRate: number;
  isCurrentMonth: boolean;
}

interface EarningsCalendarProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const mockEarningsData: EarningsData[] = [
  { date: 1, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 2, earnings: -1.20, returnRate: -0.29, isCurrentMonth: true },
  { date: 3, earnings: -1.20, returnRate: -0.29, isCurrentMonth: true },
  { date: 4, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 5, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 6, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 7, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 8, earnings: -1.20, returnRate: -0.29, isCurrentMonth: true },
  { date: 9, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 10, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 11, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 12, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 13, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 14, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 15, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 16, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 17, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 18, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 19, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 20, earnings: 0, returnRate: 0, isCurrentMonth: true },
  { date: 21, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 22, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 23, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 24, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 25, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 26, earnings: 1.20, returnRate: 0.29, isCurrentMonth: true },
  { date: 28, earnings: 0, returnRate: 0, isCurrentMonth: false },
  { date: 29, earnings: 0, returnRate: 0, isCurrentMonth: false },
  { date: 30, earnings: 0, returnRate: 0, isCurrentMonth: false },
  { date: 31, earnings: 0, returnRate: 0, isCurrentMonth: false },
  { date: 1, earnings: 0, returnRate: 0, isCurrentMonth: false },
  { date: 2, earnings: 0, returnRate: 0, isCurrentMonth: false },
  { date: 3, earnings: 0, returnRate: 0, isCurrentMonth: false },
  { date: 4, earnings: 0, returnRate: 0, isCurrentMonth: false },
];

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

const chartData = [
  { day: 1, value: 179 },
  { day: 2, value: -10 },
  { day: 3, value: -52 },
  { day: 4, value: 4 },
  { day: 5, value: 0 },
  { day: 6, value: 0 },
  { day: 7, value: 0 },
  { day: 8, value: 0 },
  { day: 9, value: 0 },
  { day: 10, value: 0 },
  { day: 11, value: -11 },
  { day: 12, value: 0 },
  { day: 13, value: 94 },
  { day: 14, value: 132 },
  { day: 15, value: 45 },
  { day: 16, value: 108 },
  { day: 17, value: 0 },
  { day: 18, value: 7 },
  { day: 19, value: 0 },
  { day: 20, value: -11 },
  { day: 21, value: -20 },
  { day: 22, value: -11 },
  { day: 23, value: -46 },
  { day: 24, value: 0 },
  { day: 25, value: -11 },
  { day: 26, value: 93 },
  { day: 27, value: -76 },
  { day: 28, value: -26 },
  { day: 29, value: 25 },
  { day: 30, value: 0 },
];

export const EarningsCalendar = ({ selectedMonth }: EarningsCalendarProps) => {
  const getEarningsForDate = (date: number) => {
    return mockEarningsData.find(item => item.date === date);
  };

  const renderCalendarCell = (date: number, earnings?: EarningsData) => {
    const isHighlighted = date === 11;
    const hasEarnings = earnings && (earnings.earnings !== 0 || earnings.returnRate !== 0);
    
    return (
      <div
        key={date}
        className={`
          relative w-[94px] h-[74px] rounded-[3px] border-border flex flex-col items-center justify-center
          ${isHighlighted ? 'bg-green-100/20 dark:bg-green-900/20' : 'bg-transparent'}
          ${!earnings?.isCurrentMonth ? 'text-muted-foreground' : 'text-foreground'}
        `}
      >
        {isHighlighted && (
          <ChevronDown className="absolute top-0.5 w-3 h-3 text-foreground" />
        )}
        
        <div className={`text-xs font-medium ${!earnings?.isCurrentMonth ? 'text-muted-foreground' : 'text-foreground'}`}>
          {date.toString().padStart(2, '0')}
        </div>
        
        {hasEarnings && earnings?.isCurrentMonth && (
          <>
            <div className={`text-[9px] mt-1 ${earnings.earnings > 0 ? 'text-[#16BA71]' : earnings.earnings < 0 ? 'text-[#F44345]' : 'text-muted-foreground'}`}>
              {earnings.earnings > 0 ? '+' : ''}{earnings.earnings.toFixed(2)}
            </div>
            <div className={`text-[9px] ${earnings.returnRate > 0 ? 'text-[#16BA71]' : earnings.returnRate < 0 ? 'text-[#F44345]' : 'text-muted-foreground'}`}>
              {earnings.returnRate > 0 ? '+' : ''}{earnings.returnRate.toFixed(2)}%
            </div>
          </>
        )}
      </div>
    );
  };

  const renderCalendarGrid = () => {
    const cells = [];
    
    // Add previous month's trailing dates
    cells.push(renderCalendarCell(31, { date: 31, earnings: 0, returnRate: 0, isCurrentMonth: false }));
    
    // Add current month dates
    for (let date = 1; date <= 26; date++) {
      const earnings = getEarningsForDate(date);
      cells.push(renderCalendarCell(date, earnings));
    }
    
    // Add next month's leading dates
    for (let date = 28; date <= 30; date++) {
      cells.push(renderCalendarCell(date, { date, earnings: 0, returnRate: 0, isCurrentMonth: false }));
    }
    cells.push(renderCalendarCell(1, { date: 1, earnings: 0, returnRate: 0, isCurrentMonth: false }));
    cells.push(renderCalendarCell(2, { date: 2, earnings: 0, returnRate: 0, isCurrentMonth: false }));
    cells.push(renderCalendarCell(3, { date: 3, earnings: 0, returnRate: 0, isCurrentMonth: false }));
    cells.push(renderCalendarCell(4, { date: 4, earnings: 0, returnRate: 0, isCurrentMonth: false }));
    
    return cells;
  };

  const maxValue = Math.max(...chartData.map(d => Math.abs(d.value)));
  const chartHeight = 256;

  return (
    <div className="flex gap-6">
      {/* Left side - Calendar */}
      <div className="flex-1">
        {/* Month/Year Toggle */}
        <div className="flex gap-1 mb-4">
          <Button
            variant="default"
            size="sm"
            className="h-[18px] px-2 rounded-[3px] bg-[#FF5C00] text-white text-[10px] hover:bg-[#FF5C00]/90"
          >
            月
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-[18px] px-2 rounded-[3px] text-[10px] text-muted-foreground border-border"
          >
            年
          </Button>
        </div>

        {/* Date and Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground font-medium">{selectedMonth}</span>
            <ChevronDown className="w-3 h-3 text-foreground" />
          </div>
          
          <div className="flex gap-8">
            <div className="text-right">
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <span>当日收益</span>
                <span>·</span>
                <span>HKD</span>
              </div>
              <div className="text-[11px] font-medium text-[#16BA71]">+1.20</div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <span>收益率</span>
              </div>
              <div className="text-[11px] font-medium text-[#16BA71]">+0.29%</div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <Card className="bg-transparent border-border">
          <CardContent className="p-0">
            {/* Week header */}
            <div className="bg-muted h-[34px] flex items-center justify-around text-[11px] text-muted-foreground">
              {weekDays.map(day => (
                <span key={day} className="w-[94px] text-center">{day}</span>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="p-2.5 grid grid-cols-7 gap-0">
              {renderCalendarGrid()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Chart */}
      <div className="w-[454px]">
        <div className="relative h-[318px]">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] text-muted-foreground py-2">
            <span className="text-right">-3.51</span>
            <span className="text-right">3.51</span>
            <span className="text-right">0</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-6 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="absolute top-0 w-full h-px bg-border" />
              <div className="absolute top-1/4 w-full h-px bg-border" />
              <div className="absolute top-1/2 w-full h-px bg-border" />
              <div className="absolute top-3/4 w-full h-px bg-border" />
              <div className="absolute bottom-0 w-full h-px bg-border" />
            </div>
            
            {/* Chart bars */}
            <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-start gap-px">
              {chartData.map((item, index) => {
                const barHeight = Math.abs(item.value) / maxValue * (chartHeight * 0.4);
                const isPositive = item.value > 0;
                const isZero = item.value === 0;
                
                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                    style={{ width: '3px' }}
                  >
                    {isPositive && (
                      <div
                        className="bg-[#16BA71]"
                        style={{
                          height: `${barHeight}px`,
                          width: '3px',
                          marginBottom: `${chartHeight / 2}px`
                        }}
                      />
                    )}
                    {item.value < 0 && (
                      <div
                        className="bg-[#F44345]"
                        style={{
                          height: `${barHeight}px`,
                          width: '3px',
                          marginTop: `${chartHeight / 2}px`
                        }}
                      />
                    )}
                    {isZero && (
                      <div
                        className="bg-muted-foreground"
                        style={{
                          height: '1px',
                          width: '3px',
                          marginTop: `${chartHeight / 2}px`
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};