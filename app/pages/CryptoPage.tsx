import { Button } from "../components/ui/button"
import { Stock } from "../types/market"
import { cryptoGainers as 加密货币涨幅榜, cryptoLosers as 加密货币跌幅榜 } from '../data/mock-data'
import { DetailedStockTablePage } from "./DetailedStockTablePage"
import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

interface CryptoPageProps {
  onStockClick?: (stock: any, tableTitle?: string) => void;
}

function StockTable({ title, data, onStockClick, onShowMore }: { title: string; data: Stock[]; onStockClick?: (stock: any, tableTitle?: string) => void; onShowMore?: (tableType: string) => void }) {
  const { t } = useLanguage()
  const rows = data.slice(0, 10)

  return (
    <div className="p-3 border border-border rounded-md bg-card/30">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] leading-4 font-medium text-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-6 px-2 text-[10px]"
          onClick={() => onShowMore?.(title)}
        >
          {t('table.show_more')} →
        </Button>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-5 text-[10px] text-muted-foreground border-b border-border py-1">
          <div className="px-1">{t('table.code')}</div>
          <div className="px-1">{t('table.name')}</div>
          <div className="px-1">{t('table.change_percent')}</div>
          <div className="px-1">{t('table.latest_price')}</div>
          <div className="px-1">{t('table.change_amount')}</div>
        </div>
        <div className="max-h-[280px] overflow-hidden">
          {rows.map((stock, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center text-[10px] text-foreground border-b border-border hover:bg-muted/50 cursor-pointer"
              onClick={() => onStockClick?.(stock, title)}
            >
              <div className="px-1 py-1 font-mono">{stock.code}</div>
              <div className="px-1 py-1 truncate">{stock.name}</div>
              <div className={`px-1 py-1 font-semibold ${stock.percentage?.startsWith('+') ? 'text-chart-1' : stock.percentage?.startsWith('-') ? 'text-chart-2' : 'text-muted-foreground'}`}>{stock.percentage}</div>
              <div className="px-1 py-1 font-mono">{stock.price}</div>
              <div className={`px-1 py-1 ${stock.change?.startsWith('+') ? 'text-chart-1' : 'text-chart-2'}`}>{stock.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CryptoPage({ onStockClick }: CryptoPageProps) {
  const { t } = useLanguage()
  const [showDetailedTable, setShowDetailedTable] = useState<string | null>(null);

  const handleShowMore = (tableType: string) => {
    setShowDetailedTable(tableType);
  };

  const handleBackToMain = () => {
    setShowDetailedTable(null);
  };

  if (showDetailedTable) {
    return (
      <DetailedStockTablePage 
        onBack={handleBackToMain}
      />
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <StockTable 
              title={t('table.gainers')} 
              data={加密货币涨幅榜.map((stock, i) => ({ ...stock, rank: i + 1 }))} 
              onStockClick={onStockClick} 
              onShowMore={handleShowMore} 
            />
          </div>
          <div className="flex-1">
            <StockTable 
              title={t('table.losers')} 
              data={加密货币跌幅榜.map((stock, i) => ({ ...stock, rank: i + 1 }))} 
              onStockClick={onStockClick} 
              onShowMore={handleShowMore} 
            />
          </div>
        </div>
      </div>
    </>
  );
}