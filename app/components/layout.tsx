import React from 'react'
import { SidebarNavigation } from './sidebar-navigation'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {

  return (
    <div className="flex h-screen bg-background text-foreground">
      <SidebarNavigation />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}