import { MarketIndices } from "../components/market-indices"
import { StockTables } from "../components/stock-tables"
import { SectorHeatmap } from "../components/sector-heatmap"
import { Button } from "../components/ui/button"
import { cryptoIndices, cryptoGainers, cryptoLosers, cryptoHotStocks, cryptoDeFiStocks } from '../data/mock-data'

export default function CryptoPage() {
  return (
    <>
      <div className="flex items-center space-x-6">
        <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
          我的持仓
        </Button>
        <Button variant="ghost" className="text-foreground font-medium">
          加密货币市场
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          DeFi
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          NFT
        </Button>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          新币上线
        </Button>
      </div>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex gap-4">
          <MarketIndices indices={cryptoIndices} />
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            <StockTables 
              gainers={cryptoGainers}
              losers={cryptoLosers}
              hotStocks={cryptoHotStocks}
              dividendStocks={cryptoDeFiStocks}
              dividendTitle="DeFi收益"
            />
          </div>
          <div className="w-80 flex-shrink-0">
            <SectorHeatmap />
          </div>
        </div>
      </div>
    </>
  );
}