'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'

export function ConditionalOrdersPanel() {
  const [conditionalQuantity, setConditionalQuantity] = useState('1000')
  const [priceConditionType, setPriceConditionType] = useState('股价条件')
  const [priceLevel, setPriceLevel] = useState('卖五')

  const adjustConditionalQuantity = (delta: number) => {
    const cur = parseInt(conditionalQuantity, 10)
    const current = isNaN(cur) ? 0 : cur
    const next = Math.max(0, current + delta)
    setConditionalQuantity(String(next))
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF5C00] rounded"></div>
            <span className="text-xs text-foreground">买入</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">卖出</span>
          </div>
        </div>

        <div className="bg-input rounded p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              <span className="text-xs text-foreground">小米集团-W</span>
              <span className="text-xs text-foreground">00005</span>
            </div>
            <X className="w-2 h-2 text-muted-foreground" />
          </div>
          
          <div className="text-xs">
            <span className="text-[#F44345]">250.60</span>
            <span className="text-[#F44345] ml-2">0.800</span>
            <span className="text-[#F44345] ml-2">3.08%</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs text-foreground font-medium">触发条件</h3>
          
          <div className="bg-input rounded p-3 h-24 relative">
            <div className="absolute top-2 left-2 text-xs text-muted-foreground">价格</div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">时间</div>
            <div className="absolute top-1/2 right-2 text-xs text-muted-foreground">触发价</div>
            
            <div className="absolute bottom-4 left-4 right-4 h-px bg-muted-foreground opacity-20"></div>
            <div className="absolute bottom-4 left-4 w-px h-16 bg-muted-foreground opacity-20"></div>
            
            <div className="absolute bottom-6 right-8 w-1 h-1 bg-[#FF5C00] rounded-full"></div>
            <div className="absolute bottom-6 right-12 px-1 py-0.5 bg-[#FF5C00] rounded text-xs text-white">触发</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">股价条件</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground rotate-90" />
          </div>
          <div className="bg-input rounded p-3 flex items-center gap-2">
            <Select value={priceConditionType} onValueChange={setPriceConditionType}>
              <SelectTrigger className="bg-input text-xs h-6 px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="股价条件" className="text-xs">股价条件</SelectItem>
                <SelectItem value="日涨幅条件" className="text-xs">日涨幅条件</SelectItem>
                <SelectItem value="回落卖出" className="text-xs">回落卖出</SelectItem>
                <SelectItem value="止盈止损" className="text-xs">止盈止损</SelectItem>
                <SelectItem value="按时卖出" className="text-xs">按时卖出</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceLevel} onValueChange={setPriceLevel}>
              <SelectTrigger className="bg-input text-xs h-6 px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="卖五" className="text-xs">卖五</SelectItem>
                <SelectItem value="卖四" className="text-xs">卖四</SelectItem>
                <SelectItem value="卖三" className="text-xs">卖三</SelectItem>
                <SelectItem value="卖二" className="text-xs">卖二</SelectItem>
                <SelectItem value="卖一" className="text-xs">卖一</SelectItem>
                <SelectItem value="买一" className="text-xs">买一</SelectItem>
                <SelectItem value="买二" className="text-xs">买二</SelectItem>
                <SelectItem value="买三" className="text-xs">买三</SelectItem>
                <SelectItem value="买四" className="text-xs">买四</SelectItem>
                <SelectItem value="买五" className="text-xs">买五</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">委托价格</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground rotate-90" />
          </div>
          
          <div className="bg-input rounded p-3 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent" onClick={() => adjustConditionalQuantity(-100)}>-</Button>
            <div className="flex-1">
              <Input 
                value={conditionalQuantity}
                onChange={(e) => setConditionalQuantity(e.target.value)}
                placeholder="买入数量"
                inputMode="numeric"
                className="bg-transparent border-0 text-xs h-6 px-2 text-center"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent" onClick={() => adjustConditionalQuantity(100)}>+</Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground">参考可买{conditionalQuantity}股</span>
          <span className="text-xs text-[#FF5C00]">编辑仓位</span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 text-xs h-6 bg-[#FF5C00] hover:bg-[#e54f00] text-white border border-[#FF5C00]">
            全仓
          </Button>
          <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-muted-foreground border-border">
            1/2
          </Button>
          <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-muted-foreground border-border">
            1/4
          </Button>
          <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-muted-foreground border-border">
            1/8
          </Button>
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1 text-xs h-6 bg-transparent hover:bg-accent text-[#FF5C00] border-[#FF5C00]">
            添加提醒
          </Button>
          <Button className="flex-1 text-xs h-6 bg-[#FF5C00] hover:bg-[#e54f00] text-white">
            提交条件单
          </Button>
        </div>
      </div>

      <div className="col-span-2 space-y-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">监控中</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">已触发</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">失效</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-input rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">腾讯控股</span>
              <span className="text-xs text-foreground">00700</span>
              <Badge className="bg-[#16BA71] text-white text-xs px-2 py-0.5">卖</Badge>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-foreground">股价条件：</span>
                <span className="text-foreground">触发价格199.99</span>
              </div>
              <div className="text-foreground">买5价*1000股</div>
              <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
            </div>
            
            <div className="flex justify-end">
              <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
            </div>
          </div>

          <div className="bg-input rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">腾讯控股</span>
              <span className="text-xs text-foreground">00700</span>
              <Badge className="bg-[#16BA71] text-white text-xs px-2 py-0.5">卖</Badge>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-foreground">触发买入条件：</span>
                <span className="text-foreground">触发跌幅</span>
              </div>
              <div>
                <span className="text-foreground">触发幅度</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#16BA71]">-5%</span>
                <span className="text-[#F44345]">+2%</span>
              </div>
              <div className="text-foreground">买5价*1000股</div>
              <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
            </div>
            
            <div className="flex justify-end">
              <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
            </div>
          </div>

          <div className="bg-input rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">腾讯控股</span>
              <span className="text-xs text-foreground">00700</span>
              <Badge className="bg-[#16BA71] text-white text-xs px-2 py-0.5">卖</Badge>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-foreground">止盈止损条件：</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-foreground">止盈价格</span>
                  <span className="text-foreground ml-2">12.22</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-foreground">止损价格</span>
                  <span className="text-foreground ml-2">10.90</span>
                </div>
              </div>
              <div className="text-foreground">买5价*1000股</div>
              <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
            </div>
            
            <div className="flex justify-end">
              <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
            </div>
          </div>

          <div className="bg-input rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">腾讯控股</span>
              <span className="text-xs text-foreground">00700</span>
              <Badge className="bg-[#F44345] text-white text-xs px-2 py-0.5">买</Badge>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-foreground">回落卖出条件：</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-foreground">触发跌幅</span>
                  <span className="text-[#16BA71] ml-2">-5%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-foreground">触发幅度</span>
                  <span className="text-[#F44345] ml-2">+2%</span>
                </div>
              </div>
              <div className="text-foreground">买5价*1000股</div>
              <div className="text-muted-foreground">提交于 2023-12-12 10:00 当日收盘失效</div>
            </div>
            
            <div className="flex justify-end">
              <span className="text-xs text-[#FF5C00]">取消监控 &gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
