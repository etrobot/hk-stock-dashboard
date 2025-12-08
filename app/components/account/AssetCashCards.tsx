import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { RefreshCwIcon } from 'lucide-react'
import { useState } from 'react'
export type AssetRow = {
  label: string
  value: string
  mask?: boolean // whether this row should be masked when isMasked is true (default true)
}

export type CashRow = {
  label: string
  value: string
  mask?: boolean // whether this row should be masked when isMasked is true (default true)
}

export interface AssetCashCardsProps {
  isMasked?: boolean
  className?: string
  assets: {
    title: string
    rows: AssetRow[]
    footerText?: string
    headers?: [string, string] // optional custom headers; defaults to generic item/amount
  }
  cashDetails: {
    title: string
    headers: [string, string]
    rows: CashRow[]
  }
  withdrawableCash: {
    title: string
    headers: [string, string]
    rows: CashRow[]
  }
}

const maybeMask = (value: string, shouldMaskRow: boolean | undefined, isMasked?: boolean) => {
  if (isMasked && (shouldMaskRow ?? true)) return '****'
  return value
}

export function AssetCashCards({ isMasked, className, assets, cashDetails, withdrawableCash }: AssetCashCardsProps) {
  const [selectedCurrency, setSelectedCurrency] = useState('HKD')
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className ?? ''}`}>
      {/* Assets */}
      <Card>
        <CardContent className="p-4">
                    <div className='flex gap-2 items-center'>

          <h3 className="text-card-foreground font-medium mb-2">{assets.title}</h3>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="bg-input text-foreground text-xs h-5 px-2 w-auto border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="HKD" className="text-xs">HKD</SelectItem>
                      <SelectItem value="USD" className="text-xs">USD</SelectItem>
                      <SelectItem value="CNY" className="text-xs">CNY</SelectItem>
                    </SelectContent>
                  </Select>
                  <RefreshCwIcon/>
</div>
          <Table className="text-xs">
            {assets.headers && (
              <TableHeader>
                <TableRow>
                  <TableHead>{assets.headers[0]}</TableHead>
                  <TableHead>{assets.headers[1]}</TableHead>
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {assets.rows.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>{r.label}</TableCell>
                  <TableCell>{maybeMask(r.value, r.mask, isMasked)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {assets.footerText && (
            <div className="text-center text-sm text-gray-300 mt-2">{assets.footerText}</div>
          )}
        </CardContent>
      </Card>

      {/* Cash Details */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-card-foreground font-medium mb-2">{cashDetails.title}</h3>
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>{cashDetails.headers[0]}</TableHead>
                <TableHead>{cashDetails.headers[1]}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashDetails.rows.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>{r.label}</TableCell>
                  <TableCell>{maybeMask(r.value, r.mask, isMasked)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Withdrawable Cash */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-card-foreground font-medium mb-2">{withdrawableCash.title}</h3>
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead>{withdrawableCash.headers[0]}</TableHead>
                <TableHead>{withdrawableCash.headers[1]}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawableCash.rows.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell>{r.label}</TableCell>
                  <TableCell>{maybeMask(r.value, r.mask, isMasked)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AssetCashCards
