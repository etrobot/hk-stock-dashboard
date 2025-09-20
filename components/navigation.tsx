import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="border-b border-border bg-card">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                港股
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                美股
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                加密货币
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                沪深
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                更多
              </Button>
            </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              首页
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              概念板块
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              新股中心
            </Button>
        </div>
    </nav>
  )
}
