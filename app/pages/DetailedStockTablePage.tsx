import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { DetailedStock } from "../types/market";
import { ChevronUp, ChevronDown, List, Grid3X3, ArrowLeft } from "lucide-react";
import { mockStockGridData } from "../data/mock-grid-data";
import { mockDetailedStocks } from "../data/mock-detailed-stocks";
import { StockGridItem } from "../components/stock-grid-item";
import { useNavigate } from "react-router-dom";

interface DetailedStockTablePageProps {
  onBack: () => void;
}

function getColorClass(value: string): string {
  if (value.startsWith('+')) return 'text-chart-1';
  if (value.startsWith('-')) return 'text-chart-2';
  return 'text-foreground';
}

type SortField = keyof DetailedStock;
type SortDirection = 'asc' | 'desc';


export function DetailedStockTablePage({ onBack }: DetailedStockTablePageProps) {
  const [sortField, setSortField] = useState<SortField>('percentage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const navigate = useNavigate();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleStockDoubleClick = (stockCode: string) => {
    navigate(`/stock/${encodeURIComponent(stockCode)}`);
  };

  const handleGridStockClick = (stockCode: string) => {
    setViewMode('list');
    navigate(`/stock/${encodeURIComponent(stockCode)}`);
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
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
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
                    <TableRow 
                      key={index} 
                      className="border-border hover:bg-muted/50 cursor-pointer"
                      onDoubleClick={() => handleStockDoubleClick(stock.code)}
                    >
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
                    onClick={() => handleGridStockClick(stock.code)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}