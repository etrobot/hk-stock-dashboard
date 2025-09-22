import React, { useState } from 'react'
import { SidebarNavigation } from './sidebar-navigation'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [currentPage, setCurrentPage] = useState('watchlist')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNavigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}