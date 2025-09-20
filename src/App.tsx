import { MarketIndices } from "@/components/market-indices"
import { StockTables } from "@/components/stock-tables"
import { SectorHeatmap } from "@/components/sector-heatmap"
import { Navigation } from "@/components/navigation"
import { IndexInfoPanel } from "@/components/index-info-panel"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground dark">
        <div className="flex max-w-full overflow-hidden">
          <main className="flex-1 min-h-screen min-w-0">
            <Navigation />

            <div className="container mx-auto p-4 space-y-6">
              <div className="flex gap-4">
                <MarketIndices />
              </div>

              <div className="flex gap-6">
                <div className="flex-1 min-w-0">
                  <StockTables />
                </div>
                <div className="w-80 flex-shrink-0">
                  <SectorHeatmap />
                </div>
              </div>
            </div>
          </main>

          <aside className="w-80 max-w-80 flex-shrink-0 border-l border-border bg-card/30 overflow-y-auto max-h-screen">
            <IndexInfoPanel />
          </aside>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App