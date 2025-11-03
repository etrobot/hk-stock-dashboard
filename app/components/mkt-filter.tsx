'use client';
import { useLanguage } from '../contexts/LanguageContext';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface MktFilterProps {
  onMarketChange?: (market: string) => void;
  className?: string;
}

export function MktFilter({ onMarketChange, className = '' }: MktFilterProps) {
  const { t } = useLanguage();
  const [market, setMarket] = useState('全部');

  const handleMarketChange = (value: string) => {
    setMarket(value);
    if (onMarketChange) {
      onMarketChange(value);
    }
  };


  return (
    <div className={`flex gap-2 ${className}`}>
      <Select value={market} onValueChange={handleMarketChange}>
        <SelectTrigger className="bg-input text-xs h-5 px-2">
          <SelectValue placeholder={t('filters.all_markets')} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="全部" className="text-xs">
            {t('market.all')}
          </SelectItem>
          <SelectItem value="港股" className="text-xs">
            {t('market.hk')}
          </SelectItem>
          <SelectItem value="美股" className="text-xs">
            {t('market.us')}
          </SelectItem>
          <SelectItem value="沪深" className="text-xs">
            {t('market.cn')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
