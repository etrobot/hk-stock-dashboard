import { Button } from "./ui/button"

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { id: 'hk', label: '港股' },
    { id: 'us', label: '美股' },
    { id: 'crypto', label: '加密货币' },
    { id: 'cn', label: '沪深' },
    { id: 'stock-detail', label: '股票详情' },
    { id: 'more', label: '更多' }
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center space-x-6 px-4 py-2">
        {pages.map((page) => (
          <Button
            key={page.id}
            variant="ghost"
            className={
              currentPage === page.id
                ? "text-foreground hover:text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }
            onClick={() => onPageChange(page.id)}
          >
            {page.label}
          </Button>
        ))}
      </div>
    </nav>
  )
}
