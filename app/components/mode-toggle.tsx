"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme, resolvedTheme, systemTheme, theme } = useTheme()

  const handleToggle = () => {
    const current = (resolvedTheme || theme || 'system') as 'light' | 'dark' | 'system'
    const base = current === 'system' ? (systemTheme || 'light') : current
    setTheme(base === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="切换主题"
      onClick={handleToggle}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">切换主题</span>
    </Button>
  )
}
