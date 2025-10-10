import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { cn } from '../lib/utils'
import { useLanguage } from '../contexts/LanguageContext'
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Landmark,
  History,
  Coins,
  GitCompare,
  RefreshCcw,
  Blocks,
  BarChart3,
  PiggyBank,
  Sparkles,
  FileText,
  Globe,
  Ticket,
  User,
  Settings,
  Key,
  Smartphone,
  Phone,
  HelpCircle,
  Unlock,
  CalendarClock,
  Briefcase,
  Building2,
} from 'lucide-react'

interface FeatureItem {
  label: string
  icon: React.ReactNode
}

function FeatureTile({ label, icon, iconColorClass, className }: FeatureItem & { iconColorClass?: string; className?: string }) {
  return (
    <div
      className={cn(
        'group flex flex-col items-center justify-center gap-2 rounded-lg border bg-card/50 p-4 text-center hover:bg-accent/40 transition-colors cursor-default',
        className,
      )}
    >
      <div className={cn("flex h-10 w-10 items-center justify-center", iconColorClass)}>
        {icon}
      </div>
      <div className="text-sm leading-tight">{label}</div>
    </div>
  )
}

export default function DiscoveryPage() {
  const { t } = useLanguage()
  
  const sections: { title: string; items: FeatureItem[]; colorClass: string }[] = [
    {
      title: t('discovery.section.trading'),
      colorClass: 'text-green-500',
      items: [
        { label: t('discovery.trading'), icon: <ArrowUpToLine className="w-5 h-5" /> },
        { label: t('discovery.orders'), icon: <History className="w-5 h-5" /> },
        { label: t('discovery.ipo_subscription'), icon: <Sparkles className="w-5 h-5" /> },
        { label: t('discovery.stocks'), icon: <BarChart3 className="w-5 h-5" /> },
        { label: t('discovery.ah_stocks'), icon: <Building2 className="w-5 h-5" /> },
        { label: t('discovery.enterprise_services'), icon: <Briefcase className="w-5 h-5" /> },
        { label: t('discovery.cash_management'), icon: <PiggyBank className="w-5 h-5" /> },
        { label: t('discovery.permission_application'), icon: <Key className="w-5 h-5" /> },
        { label: t('discovery.cryptocurrency'), icon: <Coins className="w-5 h-5" /> },
      ],
    },
    {
      title: t('discovery.section.funds'),
      colorClass: 'text-orange-500',
      items: [
        { label: t('discovery.deposit'), icon: <ArrowDownToLine className="w-5 h-5" /> },
        { label: t('discovery.withdraw'), icon: <ArrowUpToLine className="w-5 h-5" /> },
        { label: t('discovery.bank_management'), icon: <Landmark className="w-5 h-5" /> },
        { label: t('discovery.deposit_withdraw_records'), icon: <History className="w-5 h-5" /> },
        { label: t('discovery.currency_exchange'), icon: <Coins className="w-5 h-5" /> },
      ],
    },
    {
      title: t('discovery.section.value_added_services'),
      colorClass: 'text-purple-500',
      items: [
        { label: t('discovery.premium_quotes'), icon: <BarChart3 className="w-5 h-5" /> },
        { label: t('discovery.my_vouchers'), icon: <Ticket className="w-5 h-5" /> },
        { label: t('discovery.stock_comparison'), icon: <GitCompare className="w-5 h-5" /> },
        { label: t('discovery.industry_chain'), icon: <Blocks className="w-5 h-5" /> },
        { label: t('discovery.research_reports'), icon: <FileText className="w-5 h-5" /> },
        { label: t('discovery.global_rankings'), icon: <Globe className="w-5 h-5" /> },
        { label: t('discovery.smart_rankings'), icon: <Sparkles className="w-5 h-5" /> },
        { label: t('discovery.stock_transfer'), icon: <RefreshCcw className="w-5 h-5" /> },
      ],
    },
    {
      title: t('discovery.section.account'),
      colorClass: 'text-red-500',
      items: [
        { label: t('discovery.change_password'), icon: <Key className="w-5 h-5" /> },
        { label: t('discovery.devices'), icon: <Smartphone className="w-5 h-5" /> },
        { label: t('discovery.settings'), icon: <Settings className="w-5 h-5" /> },
        { label: t('discovery.real_name_verification'), icon: <User className="w-5 h-5" /> },
        { label: t('discovery.business_handling'), icon: <FileText className="w-5 h-5" /> },
        { label: t('discovery.change_phone'), icon: <Phone className="w-5 h-5" /> },
        { label: t('discovery.points_center'), icon: <Ticket className="w-5 h-5" /> },
        { label: t('discovery.help_center'), icon: <HelpCircle className="w-5 h-5" /> },
        { label: t('discovery.w8_renewal'), icon: <CalendarClock className="w-5 h-5" /> },
        { label: t('discovery.account_unfreeze'), icon: <Unlock className="w-5 h-5" /> },
        { label: t('discovery.profile_update'), icon: <FileText className="w-5 h-5" /> },
      ],
    },
  ]

  return (
    <div className="h-full bg-background text-foreground">
      <div className="container mx-auto p-6 space-y-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-0">
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {section.items.map((item) => (
                  <FeatureTile key={`${section.title}-${item.label}`} label={item.label} icon={item.icon} iconColorClass={section.colorClass} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
