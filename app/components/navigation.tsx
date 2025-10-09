import { useState } from "react"
import { Button } from "./ui/button"
import { useLanguage } from "../contexts/LanguageContext"

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { t } = useLanguage()
  
  const [pages, setPages] = useState([
    { id: 'hk', label: t('market.hk') },
    { id: 'us', label: t('market.us') },
    { id: 'crypto', label: t('market.crypto') },
    { id: 'cn', label: t('market.cn') },
    { id: 'funds', label: t('market.funds') }
  ]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    
    const newPages = [...pages];
    const [draggedPage] = newPages.splice(draggedIndex, 1);
    newPages.splice(dropIndex, 0, draggedPage);
    
    setPages(newPages);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-6">
          {pages.map((page, index) => (
            <Button
              key={page.id}
              variant="ghost"
              draggable
              className={`cursor-move transition-opacity ${
                currentPage === page.id
                  ? "text-foreground hover:text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              } ${draggedIndex === index ? "opacity-50" : ""}`}
              onClick={() => onPageChange(page.id)}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
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
