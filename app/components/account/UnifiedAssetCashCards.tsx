import AssetCashCards from './AssetCashCards'
import { useLanguage } from '../../contexts/LanguageContext'

export default function UnifiedAssetCashCards({ isMasked, className }: { isMasked?: boolean; className?: string }) {
  const { t } = useLanguage()

  return (
    <AssetCashCards
      isMasked={isMasked}
      className={className}
      assets={{
        title: t('securities.assets'),
        headers: [t('securities.item'), t('securities.amount')],
        rows: [
          { label: t('securities.market_value'), value: '268.65' },
          { label: t('securities.available_funds'), value: '312.63' },
          { label: t('securities.in_transit_assets'), value: '2.51' },
          { label: t('securities.frozen_funds'), value: '0.69' },
        ],
        footerText: `${t('securities.risk_level')} | ${t('securities.safe')}`,
      }}
      cashDetails={{
        title: t('securities.cash_details'),
        headers: [t('securities.currency_type'), t('securities.amount')],
        rows: [
          { label: 'HKD', value: '-183.31' },
          { label: 'USD', value: '0.00' },
           { label: 'CNH', value: '0.00'},
        ],
      }}
      withdrawableCash={{
        title: t('securities.withdrawable_cash'),
        headers: [t('securities.currency_type'), t('securities.amount')],
        rows: [
          { label: 'HKD', value: '0.00' },
          { label: 'USD', value: '0.00' },
          { label: 'CNH', value: '0.00'},
        ],
      }}
    />
  )
}
