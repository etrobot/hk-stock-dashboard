import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { cn } from '../lib/utils'
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
  const sections: { title: string; items: FeatureItem[]; colorClass: string }[] = [
    {
      title: '我的',
      colorClass: 'text-blue-500',
      items: [
        { label: '入金', icon: <ArrowDownToLine className="w-5 h-5" /> },
        { label: '新股认购', icon: <Sparkles className="w-5 h-5" /> },
        { label: '现金理财', icon: <PiggyBank className="w-5 h-5" /> },
        { label: '股票对比', icon: <GitCompare className="w-5 h-5" /> },
        { label: '转股', icon: <RefreshCcw className="w-5 h-5" /> },
        { label: '策略广场', icon: <Blocks className="w-5 h-5" /> },
        { label: '货币兑换', icon: <Coins className="w-5 h-5" /> },
        { label: '产业链', icon: <Blocks className="w-5 h-5" /> },
        { label: '积分中心', icon: <Ticket className="w-5 h-5" /> },
      ],
    },
    {
      title: '交易',
      colorClass: 'text-green-500',
      items: [
        { label: '交易', icon: <ArrowUpToLine className="w-5 h-5" /> },
        { label: '订单', icon: <History className="w-5 h-5" /> },
        { label: '新股认购', icon: <Sparkles className="w-5 h-5" /> },
        { label: '股票', icon: <BarChart3 className="w-5 h-5" /> },
        { label: 'AH', icon: <Building2 className="w-5 h-5" /> },
        { label: '企业服务', icon: <Briefcase className="w-5 h-5" /> },
        { label: '现金理财', icon: <PiggyBank className="w-5 h-5" /> },
        { label: '权限申请', icon: <Key className="w-5 h-5" /> },
        { label: '加密货币', icon: <Coins className="w-5 h-5" /> },
      ],
    },
    {
      title: '资金',
      colorClass: 'text-orange-500',
      items: [
        { label: '入金', icon: <ArrowDownToLine className="w-5 h-5" /> },
        { label: '出金', icon: <ArrowUpToLine className="w-5 h-5" /> },
        { label: '银行管理', icon: <Landmark className="w-5 h-5" /> },
        { label: '出入金记录', icon: <History className="w-5 h-5" /> },
        { label: '货币兑换', icon: <Coins className="w-5 h-5" /> },
      ],
    },
    {
      title: '增值服务',
      colorClass: 'text-purple-500',
      items: [
        { label: '高级行情', icon: <BarChart3 className="w-5 h-5" /> },
        { label: '我的卡券', icon: <Ticket className="w-5 h-5" /> },
        { label: '股票对比', icon: <GitCompare className="w-5 h-5" /> },
        { label: '产业链', icon: <Blocks className="w-5 h-5" /> },
        { label: '脱水研报', icon: <FileText className="w-5 h-5" /> },
        { label: '环球榜单', icon: <Globe className="w-5 h-5" /> },
        { label: '智选榜单', icon: <Sparkles className="w-5 h-5" /> },
        { label: '转股', icon: <RefreshCcw className="w-5 h-5" /> },
      ],
    },
    {
      title: '账户',
      colorClass: 'text-red-500',
      items: [
        { label: '修改密码', icon: <Key className="w-5 h-5" /> },
        { label: '设备', icon: <Smartphone className="w-5 h-5" /> },
        { label: '设置', icon: <Settings className="w-5 h-5" /> },
        { label: '实名制', icon: <User className="w-5 h-5" /> },
        { label: '业务办理', icon: <FileText className="w-5 h-5" /> },
        { label: '修改手机', icon: <Phone className="w-5 h-5" /> },
        { label: '积分中心', icon: <Ticket className="w-5 h-5" /> },
        { label: '帮助中心', icon: <HelpCircle className="w-5 h-5" /> },
        { label: 'W-8续期', icon: <CalendarClock className="w-5 h-5" /> },
        { label: '账户解冻', icon: <Unlock className="w-5 h-5" /> },
        { label: '资料更新', icon: <FileText className="w-5 h-5" /> },
      ],
    },
  ]

  return (
    <div className="h-full bg-background text-foreground">
      <div className="px-6 py-4 border-b border-border">
        <h1 className="text-lg font-semibold">发现</h1>
      </div>

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
