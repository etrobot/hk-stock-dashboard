import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { DetailedStock } from "../types/market";
import { ArrowLeft, ChevronUp, ChevronDown, List, Grid3X3 } from "lucide-react";
import { mockStockGridData } from "../data/mock-grid-data";
import { mockDetailedStocks } from "../data/mock-detailed-stocks";

interface DetailedStockTablePageProps {
  title: string;
  onBack: () => void;
}

function getColorClass(value: string): string {
  if (value.startsWith('+')) return 'text-chart-1';
  if (value.startsWith('-')) return 'text-chart-2';
  return 'text-foreground';
}

type SortField = keyof DetailedStock;
type SortDirection = 'asc' | 'desc';

// Enhanced K-line chart component with axes
function MiniKLineChart({ data, period }: { data: any[], period: string }) {
  const width = 280;
  const height = 140; // Increased to accommodate axes
  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 25;
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[140px] bg-muted rounded flex items-center justify-center text-muted-foreground">
        No data
      </div>
    );
  }
  
  const prices = data.map(d => [d.open, d.high, d.low, d.close]).flat();
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const xStep = chartWidth / Math.max(data.length - 1, 1);
  
  const getY = (price: number) => paddingTop + ((maxPrice - price) / priceRange) * chartHeight;
  const getX = (index: number) => paddingLeft + index * xStep;
  
  // Format date based on period
  const formatDate = (dateStr: string, period: string) => {
    const date = new Date(dateStr);
    switch (period) {
      case 'daily':
        return `${date.getMonth() + 1}/${date.getDate()}`;
      case 'weekly':
        return `${date.getMonth() + 1}/${date.getDate()}`;
      case 'monthly':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'quarterly':
        return `${date.getFullYear()}Q${Math.floor(date.getMonth() / 3) + 1}`;
      case 'yearly':
        return `${date.getFullYear()}`;
      default:
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  };
  
  // Generate Y-axis labels
  const yAxisLabels = [];
  for (let i = 0; i <= 4; i++) {
    const price = maxPrice - (i * priceRange / 4);
    yAxisLabels.push({
      price: price.toFixed(2),
      y: paddingTop + (i * chartHeight / 4)
    });
  }
  
  // Generate X-axis labels (show every few points to avoid crowding)
  const xAxisLabels = [];
  const step = Math.max(1, Math.floor(data.length / 4));
  for (let i = 0; i < data.length; i += step) {
    if (data[i] && data[i].date) {
      xAxisLabels.push({
        label: formatDate(data[i].date, period),
        x: getX(i)
      });
    }
  }
  
  const pathData = data.map((d, i) => {
    const x = getX(i);
    const openY = getY(d.open);
    const closeY = getY(d.close);
    const highY = getY(d.high);
    const lowY = getY(d.low);
    
    return { x, openY, closeY, highY, lowY, isUp: d.close >= d.open };
  });
  
  return (
    <div className="w-full h-[140px] bg-background rounded border text-foreground">
      <svg width="100%" height="140" viewBox={`0 0 ${width} ${height}`}>
        {/* Chart background */}
        <rect 
          x={paddingLeft} 
          y={paddingTop} 
          width={chartWidth} 
          height={chartHeight}
          fill="currentColor"
          fillOpacity="0.02"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        
        {/* Horizontal grid lines */}
        {yAxisLabels.map((label, i) => (
          <g key={i}>
            <line
              x1={paddingLeft}
              y1={label.y}
              x2={paddingLeft + chartWidth}
              y2={label.y}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <text
              x={paddingLeft - 5}
              y={label.y + 3}
              textAnchor="end"
              fontSize="8"
              fill="currentColor"
              fillOpacity="0.6"
            >
              {label.price}
            </text>
          </g>
        ))}
        
        {/* Vertical grid lines */}
        {xAxisLabels.map((label, i) => (
          <g key={i}>
            <line
              x1={label.x}
              y1={paddingTop}
              x2={label.x}
              y2={paddingTop + chartHeight}
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <text
              x={label.x}
              y={height - 5}
              textAnchor="middle"
              fontSize="7"
              fill="currentColor"
              fillOpacity="0.6"
            >
              {label.label}
            </text>
          </g>
        ))}
        
        {/* Candlestick data */}
        {pathData.map((d, i) => (
          <g key={i}>
            {/* High-Low line */}
            <line
              x1={d.x}
              y1={d.highY}
              x2={d.x}
              y2={d.lowY}
              stroke={d.isUp ? "#22c55e" : "#ef4444"}
              strokeWidth="1"
            />
            {/* Open-Close candlestick */}
            <rect
              x={d.x - Math.max(1, xStep / 4)}
              y={Math.min(d.openY, d.closeY)}
              width={Math.max(2, xStep / 2)}
              height={Math.abs(d.closeY - d.openY) || 1}
              fill={d.isUp ? "#22c55e" : "#ef4444"}
              stroke={d.isUp ? "#16a34a" : "#dc2626"}
              strokeWidth="0.5"
            />
          </g>
        ))}
        
        {/* Trend line */}
        <polyline
          points={pathData.map(d => `${d.x},${d.closeY}`).join(' ')}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          opacity="0.6"
        />
        
        {/* Axes */}
        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={paddingTop + chartHeight}
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <line
          x1={paddingLeft}
          y1={paddingTop + chartHeight}
          x2={paddingLeft + chartWidth}
          y2={paddingTop + chartHeight}
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function StockGridItem({ stock, selectedPeriod }: { stock: any, selectedPeriod: string }) {
  const isPositive = stock.percentage.startsWith('+');
  const klineData = stock.klineData?.[selectedPeriod] || [];
  
  return (
    <Card className="p-4 bg-card border-border hover:shadow-md transition-shadow cursor-pointer">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground text-sm truncate">{stock.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{stock.code}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm font-semibold text-foreground">{stock.price}</p>
            <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stock.percentage}
            </p>
          </div>
        </div>
        
        {/* K-line Chart */}
        <div className="relative">
          <MiniKLineChart 
            data={klineData}
            period={selectedPeriod}
          />
        </div>
      </div>
    </Card>
  );
}

export function DetailedStockTablePage({ title }: DetailedStockTablePageProps) {
  const [sortField, setSortField] = useState<SortField>('percentage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedStocks = [...mockDetailedStocks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    // Handle percentage and numeric values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aNum = parseFloat(aValue.replace(/[%+,万亿]/g, ''));
      const bNum = parseFloat(bValue.replace(/[%+,万亿]/g, ''));
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp className="w-3 h-3" /> : 
            <ChevronDown className="w-3 h-3" />
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0 p-6 pb-0">
        <div className="mb-6 flex items-center">
          {/* View Mode Tabs */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              列表
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              宫格
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-6 pb-6">
        {viewMode === 'list' ? (
            <div className="flex-1 overflow-auto p-6">
              <div className="overflow-x-auto" style={{ minWidth: '100%' }}>
                <Table style={{ minWidth: '1400px' }}>
                  <TableHeader>
                    <TableRow className="border-border">
                      <SortableHeader field="name">名称代码</SortableHeader>
                      <SortableHeader field="price">价格</SortableHeader>
                      <SortableHeader field="percentage">涨跌幅</SortableHeader>
                      <SortableHeader field="fiveMinPercentage">5分钟涨跌幅</SortableHeader>
                      <SortableHeader field="sixtyDayPercentage">60日涨跌幅</SortableHeader>
                      <SortableHeader field="ytdPercentage">年初至今</SortableHeader>
                      <SortableHeader field="change">涨跌额</SortableHeader>
                      <SortableHeader field="listingDate">上市日期</SortableHeader>
                      <SortableHeader field="firstDayGain">首日涨幅</SortableHeader>
                      <SortableHeader field="cumulativeGain">累计涨幅</SortableHeader>
                      <SortableHeader field="volume">成交量</SortableHeader>
                      <SortableHeader field="turnover">成交额</SortableHeader>
                      <SortableHeader field="turnoverRate">换手率</SortableHeader>
                      <SortableHeader field="pe">市盈率</SortableHeader>
                      <SortableHeader field="amplitude">振幅</SortableHeader>
                      <SortableHeader field="marketCap">市值</SortableHeader>
                      <SortableHeader field="volumeRatio">量比</SortableHeader>
                      <SortableHeader field="bidAskRatio">委比</SortableHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStocks.map((stock, index) => (
                      <TableRow key={index} className="border-border hover:bg-muted/50">
                        <TableCell className="text-foreground whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium">{stock.name}</span>
                            <span className="text-sm text-muted-foreground font-mono">{stock.code}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground font-mono whitespace-nowrap">{stock.price}</TableCell>
                        <TableCell className={`font-semibold whitespace-nowrap ${getColorClass(stock.percentage)}`}>
                          {stock.percentage}
                        </TableCell>
                        <TableCell className={`whitespace-nowrap ${getColorClass(stock.fiveMinPercentage)}`}>
                          {stock.fiveMinPercentage}
                        </TableCell>
                        <TableCell className={`whitespace-nowrap ${getColorClass(stock.sixtyDayPercentage)}`}>
                          {stock.sixtyDayPercentage}
                        </TableCell>
                        <TableCell className={`whitespace-nowrap ${getColorClass(stock.ytdPercentage)}`}>
                          {stock.ytdPercentage}
                        </TableCell>
                        <TableCell className={`whitespace-nowrap ${getColorClass(stock.change)}`}>
                          {stock.change}
                        </TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.listingDate}</TableCell>
                        <TableCell className={`whitespace-nowrap ${getColorClass(stock.firstDayGain)}`}>
                          {stock.firstDayGain}
                        </TableCell>
                        <TableCell className={`whitespace-nowrap ${getColorClass(stock.cumulativeGain)}`}>
                          {stock.cumulativeGain}
                        </TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.volume}</TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.turnover}</TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.turnoverRate}</TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.pe}</TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.amplitude}</TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.marketCap}</TableCell>
                        <TableCell className="text-foreground whitespace-nowrap">{stock.volumeRatio}</TableCell>
                        <TableCell className={`whitespace-nowrap ${getColorClass(stock.bidAskRatio)}`}>
                          {stock.bidAskRatio}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Sticky Period Selector Header */}
            <div className="flex-shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border pb-4 mb-4">
              <div className="flex gap-2">
                {[
                  { key: 'daily', label: '日' },
                  { key: 'weekly', label: '周' },
                  { key: 'monthly', label: '月' },
                  { key: 'quarterly', label: '季' },
                  { key: 'yearly', label: '年' }
                ].map((period) => (
                  <Button
                    key={period.key}
                    variant={selectedPeriod === period.key ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.key)}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Scrollable Grid Layout */}
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                {mockStockGridData.map((stock, index) => (
                  <StockGridItem 
                    key={index} 
                    stock={stock} 
                    selectedPeriod={selectedPeriod}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}