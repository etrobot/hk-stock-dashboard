'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Input } from './ui/input'

import { Search, TrendingUp, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { 
  hkGainers, hkLosers, hkHotStocks, hkDividendStocks,
  cnGainers, cnLosers, cnHotStocks, cnDividendStocks,
  usGainers, usLosers, usHotStocks, usDividendStocks,
  hkIndices, cnIndices, usIndices
} from '../data/mock-data'

interface SearchableItem {
  code: string
  name: string
  type: 'stock' | 'index'
  market: 'hk' | 'cn' | 'us' | 'crypto'
  price?: string
  change?: string
  percentage?: string
  isPositive?: boolean
}

export function SearchDropdown() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 合并所有数据源
  const allSearchableItems = useMemo(() => {
    const items: SearchableItem[] = []

    // 港股数据
    const hkStocks = [...hkGainers, ...hkLosers, ...hkHotStocks, ...hkDividendStocks]
    hkStocks.forEach(stock => {
      items.push({
        code: stock.code,
        name: stock.name,
        type: 'stock',
        market: 'hk',
        price: stock.price,
        change: stock.change,
        percentage: stock.percentage,
        isPositive: stock.isPositive
      })
    })

    // 港股指数
    hkIndices.forEach(index => {
      items.push({
        code: index.name,
        name: index.name,
        type: 'index',
        market: 'hk',
        price: index.value,
        change: index.change,
        percentage: index.percentage,
        isPositive: index.isPositive
      })
    })

    // A股数据
    const cnStocks = [...cnGainers, ...cnLosers, ...cnHotStocks, ...cnDividendStocks]
    cnStocks.forEach(stock => {
      items.push({
        code: stock.code,
        name: stock.name,
        type: 'stock',
        market: 'cn',
        price: stock.price,
        change: stock.change,
        percentage: stock.percentage,
        isPositive: stock.isPositive
      })
    })

    // A股指数
    cnIndices.forEach(index => {
      items.push({
        code: index.name,
        name: index.name,
        type: 'index',
        market: 'cn',
        price: index.value,
        change: index.change,
        percentage: index.percentage,
        isPositive: index.isPositive
      })
    })

    // 美股数据
    const usStocks = [...usGainers, ...usLosers, ...usHotStocks, ...usDividendStocks]
    usStocks.forEach(stock => {
      items.push({
        code: stock.code,
        name: stock.name,
        type: 'stock',
        market: 'us',
        price: stock.price,
        change: stock.change,
        percentage: stock.percentage,
        isPositive: stock.isPositive
      })
    })

    // 美股指数
    usIndices.forEach(index => {
      items.push({
        code: index.name,
        name: index.name,
        type: 'index',
        market: 'us',
        price: index.value,
        change: index.change,
        percentage: index.percentage,
        isPositive: index.isPositive
      })
    })

    return items
  }, [])

  // 搜索过滤逻辑
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase().trim()
    
    return allSearchableItems.filter(item => {
      // 按代码搜索
      if (item.code.toLowerCase().includes(query)) return true
      
      // 按名称搜索
      if (item.name.toLowerCase().includes(query)) return true
      
      // 按名称拼音首字母搜索（简单实现）
      const firstLetters = item.name.replace(/[^\u4e00-\u9fa5]/g, '').split('').map(char => {
        return char
      }).join('')
      if (firstLetters.toLowerCase().includes(query)) return true
      
      return false
    }).slice(0, 8) // 限制结果数量
  }, [searchQuery, allSearchableItems])

  const handleItemClick = (item: SearchableItem) => {
    if (item.type === 'stock') {
      navigate(`/stock/${item.code}`)
    } else {
      navigate('/market')
    }
    setIsOpen(false)
    setSearchQuery('')
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredItems.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredItems.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
          handleItemClick(filteredItems[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setIsOpen(value.trim().length > 0)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    if (searchQuery.trim().length > 0) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    // 延迟关闭下拉列表，以便点击事件能够正常触发
    setTimeout(() => {
      setIsOpen(false)
      setSelectedIndex(-1)
    }, 200)
  }

  const getMarketLabel = (market: string) => {
    switch (market) {
      case 'hk': return '港股'
      case 'cn': return 'A股'
      case 'us': return '美股'
      case 'crypto': return '加密'
      default: return ''
    }
  }



  // 点击外部关闭下拉列表
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-64">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="搜索股票代码或名称..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="pl-8 text-sm h-8"
        />
      </div>

      {isOpen && filteredItems.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {filteredItems.map((item, index) => (
            <button
              key={`${item.market}-${item.code}-${index}`}
              className={`w-full text-left p-3 hover:bg-accent transition-colors ${
                index === selectedIndex ? 'bg-accent' : ''
              }`}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.code}</span>
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {getMarketLabel(item.market)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                </div>
                
                {item.price && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium">{item.price}</span>
                    {item.change && item.percentage && (
                      <div className={`flex items-center gap-1 ${
                        item.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{item.percentage}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && searchQuery && filteredItems.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 p-4 text-center text-sm text-muted-foreground"
        >
          未找到相关结果
        </div>
      )}
    </div>
  )
}