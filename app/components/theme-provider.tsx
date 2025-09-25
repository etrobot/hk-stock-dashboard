import * as React from 'react'

export type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: 'dark' | 'light'
  resolvedTheme: 'dark' | 'light'
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeToDom(
  attribute: string,
  resolved: 'dark' | 'light'
) {
  const root = document.documentElement
  if (!root) return

  if (attribute === 'class') {
    root.classList.toggle('dark', resolved === 'dark')
  } else {
    root.setAttribute(attribute, resolved)
  }
}

function withDisabledTransitions(enabled: boolean, fn: () => void) {
  if (!enabled) {
    fn()
    return
  }
  const style = document.createElement('style')
  style.appendChild(
    document.createTextNode(
      '*{transition: none !important; animation-duration: 0s !important; animation-delay: 0s !important;}'
    )
  )
  document.head.appendChild(style)
  fn()
  // Force reflow and then remove the style shortly after to avoid flash
  window.getComputedStyle(document.body)
  setTimeout(() => {
    document.head.removeChild(style)
  }, 75)
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = React.useState<'dark' | 'light'>(getSystemTheme())

  // Load initial theme from storage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored) {
        setThemeState(stored)
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  // Watch system theme changes
  React.useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setSystemTheme(media.matches ? 'dark' : 'light')
    media.addEventListener?.('change', handler)
    handler()
    return () => media.removeEventListener?.('change', handler)
  }, [enableSystem])

  const resolvedTheme = React.useMemo<'dark' | 'light'>(() => {
    return theme === 'system' ? (enableSystem ? systemTheme : 'light') : theme
  }, [theme, systemTheme, enableSystem])

  // Apply to DOM whenever theme or system changes
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    withDisabledTransitions(disableTransitionOnChange, () => {
      applyThemeToDom(attribute, resolvedTheme)
    })
  }, [attribute, resolvedTheme, disableTransitionOnChange])

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next)
      try {
        localStorage.setItem(storageKey, next)
      } catch (e) {
        // ignore
      }
    },
    [storageKey]
  )

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, systemTheme, resolvedTheme }),
    [theme, setTheme, systemTheme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
