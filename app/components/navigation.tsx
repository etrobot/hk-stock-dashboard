import { Button } from "./ui/button"
import { useLanguage } from "../contexts/LanguageContext"

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { t } = useLanguage()
  
  const pages = [
    { id: 'hk', label: t('market.hk') },
    { id: 'us', label: t('market.us') },
    { id: 'crypto', label: t('market.crypto') },
    { id: 'cn', label: t('market.cn') }
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-6">
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
        <div className="ml-auto">
        </div>
      </div>
    </nav>
  )
}
