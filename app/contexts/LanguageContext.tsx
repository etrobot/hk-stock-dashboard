import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'zh' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // 从localStorage获取保存的语言设置，默认为中文
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language
      return saved || 'zh'
    }
    return 'zh'
  })

  useEffect(() => {
    // 保存语言设置到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 翻译字典
const translations: Record<Language, Record<string, string>> = {
  zh: {
    // 导航相关
    'nav.watchlist': '自选',
    'nav.market': '市场',
    'nav.account': '账户',
    'nav.options': '期权',
    'nav.discovery': '发现',
    'nav.messages': '消息',
    'nav.community': '社区',
    
    // 市场导航
    'market.hk': '港股',
    'market.us': '美股',
    'market.crypto': '加密货币',
    'market.cn': '沪深',
    'market.funds': '基金',
    'market.all': '全部',
    
    // 主页标签
    'tab.home': '首页',
    'tab.concept_sectors': '概念板块',
    'tab.new_stock_center': '新股中心',
    
    // 表格相关
    'table.gainers': '领涨榜',
    'table.losers': '领跌榜',
    'table.hot_stocks': '成交额榜',
    'table.dividend_stocks': '年初至今涨幅榜',
    'table.show_more': '更多',
    'table.code': '代码',
    'table.name': '名称',
    'table.change_percent': '涨跌幅',
    'table.latest_price': '最新价',
    'table.change_amount': '涨跌额',
    'table.dividend_yield_ttm': '股息率TTM',
    'table.ytd': '年初至今涨跌幅',
    'table.amount': '成交额',
    'table.market': '市场',
    
    // 通用
    'common.home': '首页',
    'common.back': '返回',
    'common.forward': '前进',
    'common.search': '搜索',
    'common.settings': '设置',
    'common.previous_page': '前一页',
    'common.next_page': '后一页',
    'common.quick_trading': '快捷交易',
    'common.cancel': '取消',
    'common.confirm': '确认',
    // 交易通用
    'tab.trade': '交易',
    'trade.code': '代码',
    'trade.price': '价格',
    'trade.quantity': '数量',
    'trade.amount': '金额',
    'trade.cash_buyable': '现金可买',
    'trade.max_sellable': '最大可卖',
    'trade.max_buyable': '最大可买',
    'trade.available_funds': '可用资金',
    'trade.available_units': '买卖单位',
    'trade.settings': '设置',
    'trade.full_position': '全仓',
    'trade.fraction.half': '1/2',
    'trade.fraction.quarter': '1/4',
    'trade.fraction.eighth': '1/8',
    'trade.buy': '买入',
    'trade.sell': '卖出',
    
    // 应用标题
    'app.title': '天风国际PC客户端',
    
    // 页面状态
    'page.developing': '该页面正在开发中...',
    'page.not_found': '页面未找到',
    
    // 功能提示
    'toast.search.title': '搜索',
    'toast.search.description': '搜索功能开发中…',
    'toast.history.title': '历史',
    'toast.history.description': '历史功能开发中…',
    
    // 语言切换
    'language.chinese': '中文',
    'language.english': 'English',
    'language.switch': '语言切换',
    // Aside 分组
    'aside.create_group': '创建分组',
    'aside.manage_group': '管理分组',
    // 分组管理与对话
    'groups.manage': '管理分组',
    'groups.list': '分组列表',
    'groups.create': '创建分组',
    'groups.name': '分组名称',
    'groups.input_name_placeholder': '输入分组名称',
    'groups.stock_list': '股票列表',
    // 通用表头/操作
    'common.market': '市场',
    'common.action': '操作',
    'common.add': '添加',
    'common.close': '关闭',
    'common.create': '创建',
    
    // 账户页面
    'account.total_assets': '总资产',
    'account.securities_position': '证券持仓',
    'account.account_type': '账户类型',
    'account.all_accounts': '全部账户',
    'account.category': '品类',
    'account.currency': '币种',
    'account.proportion': '比例',
    'account.cumulative_return': '累计收益',
    'account.return_rate': '收益率',
    'account.simple_weighted': '简单加权',
    'account.return_trend': '收益率走势',
    'account.total_asset_trend': '总资产走势',
    'account.earnings_calendar': '收益日历',
    
    // 时间周期
    'period.recent_1w': '近1周',
    'period.recent_1m': '近1月',
    'period.ytd': '年初至今',
    'period.custom': '自定义',
    'period.daily': '日',
    'period.weekly': '周',
    'period.monthly': '月',
    'period.quarterly': '季',
    'period.yearly': '年',
    
    // 证券持仓相关
    'securities.assets': '资产',
    'securities.item': '项目',
    'securities.amount': '金额',
    'securities.market_value': '证券市值',
    'securities.available_funds': '可用资金',
    'securities.in_transit_assets': '在途资产',
    'securities.frozen_funds': '冻结资金',
    'securities.risk_level': '风险水平',
    'securities.safe': '安全',
    'securities.cash_details': '现金明细',
    'securities.currency_type': '币种',
    'securities.total_cash': '现金总值',
    'securities.withdrawable_cash': '现金可提',
    
    // 功能按钮
    'actions.deposit_funds': '存入资金',
    'actions.withdraw_funds': '提取资金',
    'actions.currency_exchange': '货币兑换',
    'actions.transfer_to_stocks': '转入股票',
    'actions.fund_transfer': '资金调拨',
    'actions.ipo_subscription': '新股认购',
    'actions.my_statements': '我的结单',
    'actions.vouchers': '卡券',
    'actions.trade': '交易',
    
    // 持仓表格
    'holdings.operation': '操作',
    'holdings.code': '代码',
    'holdings.name': '名称',
    'holdings.quantity': '持有数量',
    'holdings.available_quantity': '可用数量',
    'holdings.current_price': '现价',
    'holdings.cost_price': '摊薄成本价',
    'holdings.market_value': '市值',
    'holdings.profit_loss_ratio': '盈亏比例',
    'holdings.profit_loss_amount': '盈亏金额',
    'holdings.today_profit_loss': '今日盈亏',
    'holdings.position_ratio': '持仓占比',
    
    // 标签页
    'tabs.holdings': '持仓',
    'tabs.today_orders': '当日订单',
    'tabs.today_transactions': '当日成交',
    'tabs.historical_orders': '历史订单',
    'tabs.historical_transactions': '历史成交',
    'tabs.fund_flow': '资金流水',
    'filters.start_date': '起始日期',
    'filters.end_date': '结束日期',
    
    // 订单相关
    'orders.code': '代码',
    'orders.name': '名称',
    'orders.order_time': '委托时间',
    'orders.order_price': '委托价格',
    'orders.avg_price': '成交均价',
    'orders.order_quantity': '委托数量',
    'orders.filled_quantity': '成交数量',
    'orders.direction': '交易方向',
    'orders.status': '委托状态',
    'orders.code_name': '代码名称',
    'orders.buy': '买入',
    'orders.sell': '卖出',
    'orders.pending': '待成交',
    'orders.filled': '已成交',
    'orders.cancelled': '已撤单',
    'orders.partial': '部分成交',
    'orders.action_cancel': '撤单',
    'orders.action_modify': '改单',
    'orders.cancel_confirm_title': '委托撤单确认',
    'orders.cancel_name': '名称',
    'orders.cancel_code': '代码',
    'orders.cancel_direction': '委托方向',
    'orders.cancel_quantity': '委托数量',
    'orders.cancel_price': '委托价格',
    'orders.cancel_submit': '确认撤单',

    // 订单类型与描述
    'orders.order_type': '订单类型',
    'order_type.at_auction': '竞价盘',
    'order_type.at_auction_limit': '竞价限价盘',
    'order_type.limit': '限价盘（美股、沪深仅有此项）',
    'order_type.enhanced_limit': '增强限价盘',
    'order_type.special_limit': '特别限价盘',
    'order_type_desc.at_auction': '无指定价格；于竞价时段按最终的参考平衡价格(IEP)成交；具有更高优先级。',
    'order_type_desc.at_auction_limit': '指定价格；若价格等于或优于IEP则按IEP成交；未成交部分可结转至持续交易时段。',
    'order_type_desc.limit': '指定价格；仅在该价格成交；未成交部分保留在订单簿。',
    'order_type_desc.enhanced_limit': '指定价格；可向上/下最多跨10个价位撮合；未成交部分即时撤销。',
    'order_type_desc.special_limit': '指定价格；可向上/下最多跨10个价位撮合；未成交部分转为限价盘。',
    'confirm.confirm_buy': '确认买入',
    'confirm.confirm_sell': '确认卖出',

    'confirm.account_type': '账户类型',
    'confirm.direction': '交易方向',
    'confirm.code': '代码',
    'confirm.order_type': '订单类型',
    'confirm.price': '价格',
    'confirm.quantity': '数量',
    'confirm.amount': '金额',
    
    // 成交相关
    'transactions.execution_time': '成交时间',
    'transactions.execution_quantity': '成交数量',
    'transactions.execution_amount': '成交金额',
    'transactions.execution_datetime': '成交时间',
    'transactions.execution_price': '成交价',
    
    // 资金流水
    'fund_flow.trade_date': '交易日期',
    'fund_flow.business_name': '业务名称',
    'fund_flow.amount': '发生金额',
    'fund_flow.remaining_amount': '剩余金额',
    'fund_flow.currency': '币种',
    'fund_flow.remarks': '备注',
    'fund_flow.deposit': '存入资金',
    
    // 加密货币相关
    'crypto.defi_yield': 'DeFi收益',
    
    // 新股中心
    'new_stock.upcoming': '待上市',
    'new_stock.listed': '已上市',
    'new_stock.serial_number': '序号',
    'new_stock.ipo_price': '发行价',
    'new_stock.lot_size': '每手股数',
    'new_stock.min_subscription': '最小申购金额',
    'new_stock.latest_price': '最新价',
    'new_stock.first_day_change': '首日涨幅',
    'new_stock.dark_market_change': '暗盘涨跌额',
    'new_stock.subscription_multiple': '申购倍数',
    'new_stock.lottery_rate': '一手中签率',
    'new_stock.listing_date': '上市日期',
    'new_stock.cumulative_change': '累计涨幅',
    
    // 板块热力图
    'heatmap.sector_heatmap': '板块热力图',
    'heatmap.sectors': '板块',
    'heatmap.title': '热力图',
    'heatmap.industry': '行业',
    'heatmap.individual_stocks': '个股',
    'heatmap.hk_sector_heatmap': '港股板块热力图',
    'heatmap.subtitle': '涨幅 > 0: 绿色; 跌幅 < 0: 红色; 无变化 = 0: 灰色',
    'heatmap.market_cap': '市值',
    'heatmap.previous_value': '前值',
    'heatmap.change_percent': '涨跌幅',
    'heatmap.hk_sectors': '港股板块',
    
    // 详细股票表格
    'detailed_table.period.1d': '1日',
    'detailed_table.period.5d': '5日',
    'detailed_table.period.1m': '1月',
    'detailed_table.period.3m': '3月',
    'detailed_table.period.6m': '6月',
    'detailed_table.period.1y': '1年',
    'detailed_table.period.2y': '2年',
    'detailed_table.period.5y': '5年',
    'detailed_table.volume': '成交量',
    'detailed_table.turnover': '成交额',
    'detailed_table.pe_ratio': '市盈率',
    'detailed_table.market_cap': '市值',
    'detailed_table.view_details': '查看详情',
    
    // 通用表格字段
    'table.volume': '成交量',
    'table.turnover': '成交额',
    'table.market_cap': '市值',
    'table.pe_ratio': '市盈率',
    
    // 资金流向
    'capital_flow.title': '资金流向趋势',
    'capital_flow.unit': '单位：元',
    'capital_flow.history': '历史数据',
    'capital_flow.5d': '5日',
    'capital_flow.20d': '20日',
    'capital_flow.60d': '60日',
    'capital_flow.net_inflow': '5日净流入：9.99亿',
    'capital_flow.net_inflow_legend': '净流入',
    'capital_flow.net_outflow_legend': '净流出',
    'capital_flow.close_price_legend': '收盘价',
    
    // 买卖盘
    'order_book.title': '买卖盘十档',
    'order_book.broker_title': '买卖盘经纪',
    'order_book.buy_broker': '买盘经纪',
    'order_book.sell_broker': '卖盘经纪',
    
    // 股票详情页
    'stock_detail.name_code': '名称代码',
    'stock_detail.latest_price': '最新价',
    'stock_detail.change_percent': '涨跌幅',
    'stock_detail.ranking': '股票排行',
    'stock_detail.status_trading': '交易中',
    
    // 关于我们页面
    'about.title': '关于我们',
    'about.app_name': '港股仪表盘',
    'about.version': 'V1.0.1',
    'about.description': '港股仪表盘是一款专业的港股行情分析工具，为投资者提供实时行情数据、技术分析图表和投资决策支持。',
    'about.features': '主要功能',
    'about.feature_1': '• 实时港股行情数据',
    'about.feature_2': '• 专业技术分析图表',
    'about.feature_3': '• 个股详细信息查询',
    'about.feature_4': '• 自选股管理',
    'about.feature_5': '• 多种主题模式',
    'about.contact': '联系我们',
    'about.email': '邮箱: support@hkdashboard.com',
    'about.website': '官网: www.hkdashboard.com',
    'about.copyright': '© 2024 港股仪表盘. All rights reserved.',
    
    // 板块热力图额外文本
    'heatmap.more': '更多',
    'heatmap.title_main': '热力图',
    'heatmap.industry_btn': '行业',
    'heatmap.individual_stocks_btn': '个股',
    
    // 下拉菜单
    'dropdown.business': '业务办理',
    'dropdown.points': '积分中心',
    'dropdown.my_quotes': '我的行情',
    'dropdown.my_cards': '我的卡券',
    'dropdown.settings': '设置',
    'dropdown.logout': '退出登陆',
    'dropdown.updates': '动态',
    'dropdown.following': '关注',
    'dropdown.followers': '粉丝',
    'dropdown.favorites': '收藏',
    'dropdown.help_center': '帮助中心',
    
    // 发现页面
    'discovery.title': '发现',
    'discovery.section.my': '我的',
    'discovery.section.trading': '交易',
    'discovery.section.funds': '资金',
    'discovery.section.value_added_services': '增值服务',
    'discovery.section.account': '账户',
    
    // 发现页面功能项 - 我的
    'discovery.deposit': '入金',
    'discovery.ipo_subscription': '新股认购',
    'discovery.cash_management': '现金理财',
    'discovery.stock_comparison': '股票对比',
    'discovery.stock_transfer': '转股',
    'discovery.strategy_square': '策略广场',
    'discovery.currency_exchange': '货币兑换',
    'discovery.industry_chain': '产业链',
    'discovery.points_center': '积分中心',
    
    // 发现页面功能项 - 交易
    'discovery.trading': '交易',
    'discovery.orders': '订单',
    'discovery.stocks': '股票',
    'discovery.ah_stocks': 'AH',
    'discovery.enterprise_services': '企业服务',
    'discovery.permission_application': '权限申请',
    'discovery.cryptocurrency': '加密货币',
    
    // 发现页面功能项 - 资金
    'discovery.withdraw': '出金',
    'discovery.bank_management': '银行管理',
    'discovery.deposit_withdraw_records': '出入金记录',
    
    // 发现页面功能项 - 增值服务
    'discovery.premium_quotes': '高级行情',
    'discovery.my_vouchers': '我的卡券',
    'discovery.research_reports': '脱水研报',
    'discovery.global_rankings': '环球榜单',
    'discovery.smart_rankings': '智选榜单',
    
    // 发现页面功能项 - 账户
    'discovery.change_password': '修改密码',
    'discovery.devices': '设备',
    'discovery.settings': '设置',
    'discovery.real_name_verification': '实名制',
    'discovery.business_handling': '业务办理',
    'discovery.change_phone': '修改手机',
    'discovery.help_center': '帮助中心',
    'discovery.w8_renewal': 'W-8续期',
    'discovery.account_unfreeze': '账户解冻',
    'discovery.profile_update': '资料更新',
    
    // 指数信息面板
    'index_panel.high': '最高',
    'index_panel.low': '最低',
    'index_panel.open': '今开',
    'index_panel.close': '昨收',
    'index_panel.volume': '成交额',
    'index_panel.avg_price': '平均价',
    'index_panel.related': '相关',
    'index_panel.futures': '期货',
    'index_panel.premium': '高水',
    'index_panel.market_tab': '行情',
    'index_panel.analysis_tab': '分析',
    'index_panel.news_tab': '资讯',
    'index_panel.news_subtab': '新闻',
    'index_panel.announcement_subtab': '公告',
    'index_panel.rating_subtab': '评级',
    'index_panel.stock_analysis_title': '股票分析',
    
    // 基金相关
    'funds.serial_number': '序号',
    'funds.isin': 'ISIN',
    'funds.name': '名称',
    'funds.period_1m': '近一月',
    'funds.period_3m': '近三月',
    'funds.period_6m': '近六月',
    'funds.period_1y': '近一年',
    'funds.period_3y': '近三年',
    'funds.period_ytd': '年初至今',
    'funds.period_since_inception': '成立至今',
    'funds.sharpe_ratio': '夏普比率',
    'funds.min_purchase': '起购金额',
    'funds.currency': '币种',
    'funds.annual_management_fee': '年度管理费',

    // 货币
    'currency.usd': '美元',
    'currency.hkd': '港元',
    'currency.cny': '人民币',

    // 账户
    'account.funds_position': '基金持仓',

    // 基金页
    'funds.assets': '资产',
    'funds.item': '项目',
    'funds.amount': '金额',
    'funds.total_market_value': '总市值',
    'funds.available_funds': '可用资金',
    'funds.pending_orders': '待成交',
    'funds.frozen_funds': '冻结资金',
    'funds.risk_level': '风险水平',
    'funds.moderate': '中等',
    'funds.performance_summary': '绩效摘要',
    'funds.period': '周期',
    'funds.return_rate': '收益率',
    'funds.today_return': '今日收益率',
    'funds.total_return': '总收益率',
    'funds.profit_loss': '盈亏金额',
    'funds.allocation': '基金配置',
    'funds.fund_type': '基金类型',
    'funds.proportion': '占比',
    'funds.equity_funds': '股票型',
    'funds.bond_funds': '债券型',
    'funds.money_market': '货币型',

    // 标签
    'tabs.fund_holdings': '基金持仓',
    'tabs.history': '历史',
    'tabs.orders': '订单',

    // 操作
    'actions.fund_purchase': '基金申购',
    'actions.fund_redemption': '基金赎回',
    'actions.fund_conversion': '基金转换',
    'actions.fixed_investment': '定投',
    'actions.fund_rankings': '基金排行',
    'actions.fund_statements': '基金结单',
    'actions.fund_rewards': '基金奖励',

    // 基金持仓表头
    'fund_holdings.operation': '操作',
    'fund_holdings.fund_code': '基金代码',
    'fund_holdings.fund_name': '基金名称',
    'fund_holdings.shares': '份额',
    'fund_holdings.nav': '单位净值',
    'fund_holdings.cost_nav': '成本净值',
    'fund_holdings.market_value': '市值',
    'fund_holdings.profit_loss_ratio': '盈亏比例',
    'fund_holdings.profit_loss_amount': '盈亏金额',
    'fund_holdings.today_profit_loss': '今日盈亏',
    'fund_holdings.position_ratio': '持仓占比',

    // 资金流水
    'fund_flow.fund_purchase': '基金申购',
    'fund_flow.fund_redemption': '基金赎回',
    'fund_flow.fund_subscription': '基金认购',
    'fund_flow.partial_redemption': '部分赎回',
  },
  en: {
    // 导航相关
    'nav.watchlist': 'Watchlist',
    'nav.market': 'Market',
    'nav.account': 'Account',
    'nav.options': 'Options',
    'nav.discovery': 'Discovery',
    'nav.messages': 'Messages',
    'nav.community': 'Community',
    
    // 市场导航
    'market.hk': 'HK Stocks',
    'market.us': 'US Stocks',
    'market.crypto': 'Crypto',
    'market.cn': 'A Shares',
    'market.funds': 'Funds',
    'market.all': 'All',
    
    // 主页标签
    'tab.home': 'Home',
    'tab.concept_sectors': 'Concept Sectors',
    'tab.new_stock_center': 'New Stock Center',
    'tabs.history': 'History',
    'tabs.orders': 'Orders',
    
    // 表格相关
    'table.gainers': 'Top Gainers',
    'table.losers': 'Top Losers',
    'table.hot_stocks': 'Hot Stocks',
    'table.dividend_stocks': 'High Dividend',
    'table.show_more': 'More',
    'table.code': 'Code',
    'table.name': 'Name',
    'table.change_percent': 'Change %',
    'table.latest_price': 'Price',
    'table.change_amount': 'Change',
    'table.dividend_yield_ttm': 'Dividend Yield TTM',
    'table.ytd': 'YTD',
    'table.amount': 'Amount',
    'table.market': 'Market',
    
    // 通用
    'common.home': 'Home',
    'common.back': 'Back',
    'common.forward': 'Forward',
    'common.search': 'Search',
    'common.settings': 'Settings',
    'common.previous_page': 'Previous',
    'common.next_page': 'Next',
    'common.quick_trading': 'Quick Trade',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    // Trading Common
    'tab.trade': 'Trade',
    'trade.code': 'Code',
    'trade.price': 'Price',
    'trade.quantity': 'Quantity',
    'trade.amount': 'Amount',
    'trade.cash_buyable': 'Cash Buyable',
    'trade.max_sellable': 'Max Sellable',
    'trade.max_buyable': 'Max Buyable',
    'trade.available_funds': 'Available Funds',
    'trade.available_units': 'Available Units',
    'trade.settings': 'Settings',
    'trade.full_position': 'Full',
    'trade.fraction.half': '1/2',
    'trade.fraction.quarter': '1/4',
    'trade.fraction.eighth': '1/8',
    'trade.buy': 'Buy',
    'trade.sell': 'Sell',
    
    // 应用标题
    'app.title': 'TF International PC Client',
    
    // 页面状态
    'page.developing': 'This page is under development...',
    'page.not_found': 'Page Not Found',
    
    // 功能提示
    'toast.search.title': 'Search',
    'toast.search.description': 'Search feature under development...',
    'toast.history.title': 'History',
    'toast.history.description': 'History feature under development...',
    
    // 语言切换
    'language.chinese': '中文',
    'language.english': 'English',
    'language.switch': 'Language',
    // Aside groups
    'aside.create_group': 'Create Group',
    'aside.manage_group': 'Manage Groups',
    // Group management & dialogs
    'groups.manage': 'Manage Groups',
    'groups.list': 'Group List',
    'groups.create': 'Create Group',
    'groups.name': 'Group Name',
    'groups.input_name_placeholder': 'Enter group name',
    'groups.stock_list': 'Stock List',
    // Common table headers/actions
    'common.market': 'Market',
    'common.action': 'Action',
    'common.add': 'Add',
    'common.close': 'Close',
    'common.create': 'Create',
    
    // 账户页面
    'account.total_assets': 'Total Assets',
    'account.securities_position': 'Securities Position',
    'account.account_type': 'Account Type',
    'account.all_accounts': 'All Accounts',
    'account.category': 'Category',
    'account.currency': 'Currency',
    'account.proportion': 'Proportion',
    'account.cumulative_return': 'Cumulative Return',
    'account.return_rate': 'Return Rate',
    'account.simple_weighted': 'Simple Weighted',
    'securities.market_value': 'Securities Market Value',
    'securities.available_funds': 'Available Funds',
    'securities.in_transit_assets': 'In-Transit Assets',
    'securities.frozen_funds': 'Frozen Funds',
    'securities.risk_level': 'Risk Level',
    'securities.safe': 'Safe',
    'securities.cash_details': 'Cash Details',
    'securities.currency_type': 'Currency',
    'securities.total_cash': 'Total Cash',
    'securities.withdrawable_cash': 'Withdrawable Cash',
    
    // 功能按钮
    'actions.deposit_funds': 'Deposit Funds',
    'actions.withdraw_funds': 'Withdraw Funds',
    'actions.currency_exchange': 'Currency Exchange',
    'actions.transfer_to_stocks': 'Transfer to Stocks',
    'actions.fund_transfer': 'Fund Transfer',
    'actions.ipo_subscription': 'IPO Subscription',
    'actions.my_statements': 'My Statements',
    'actions.vouchers': 'Vouchers',
    'actions.trade': 'Trade',
    
    // 持仓表格
    'holdings.operation': 'Operation',
    'holdings.code': 'Code',
    'holdings.name': 'Name',
    'holdings.quantity': 'Holdings',
    'holdings.available_quantity': 'Available',
    'holdings.current_price': 'Current Price',
    'holdings.cost_price': 'Avg Cost',
    'holdings.market_value': 'Market Value',
    'holdings.profit_loss_ratio': 'P&L %',
    'holdings.profit_loss_amount': 'P&L Amount',
    'holdings.today_profit_loss': 'Today P&L',
    'holdings.position_ratio': 'Position %',
    
    // 标签页
    'tabs.holdings': 'Holdings',
    'tabs.today_orders': 'Today Orders',
    'tabs.today_transactions': 'Today Transactions',
    'tabs.historical_orders': 'Historical Orders',
    'tabs.historical_transactions': 'Historical Transactions',
    'tabs.fund_flow': 'Fund Flow',
    'filters.start_date': 'Start Date',
    'filters.end_date': 'End Date',
    
    // 订单相关
    'orders.code': 'Code',
    'orders.name': 'Name',
    'orders.order_time': 'Order Time',
    'orders.order_price': 'Order Price',
    'orders.avg_price': 'Avg Price',
    'orders.order_quantity': 'Order Qty',
    'orders.filled_quantity': 'Filled Qty',
    'orders.direction': 'Direction',
    'orders.status': 'Status',
    'orders.code_name': 'Code & Name',
    'orders.buy': 'Buy',
    'orders.sell': 'Sell',
    'orders.pending': 'Pending',
    'orders.filled': 'Filled',
    'orders.cancelled': 'Cancelled',
    'orders.partial': 'Partial Fill',
    'orders.action_cancel': 'Cancel Order',
    'orders.action_modify': 'Modify Order',
    'orders.cancel_confirm_title': 'Cancel Confirmation',
    'orders.cancel_name': 'Name',
    'orders.cancel_code': 'Code',
    'orders.cancel_direction': 'Direction',
    'orders.cancel_quantity': 'Quantity',
    'orders.cancel_price': 'Price',
    'orders.cancel_submit': 'Confirm Cancel',
    'confirm.confirm_buy': 'Confirm Buy',
    'confirm.confirm_sell': 'Confirm Sell',


    'confirm.account_type': 'Account Type',
    'confirm.direction': 'Direction',
    'confirm.code': 'Code',
    'confirm.order_type': 'Order Type',
    'confirm.price': 'Price',
    'confirm.quantity': 'Quantity',
    'confirm.amount': 'Amount',

    // Order types and descriptions
    'orders.order_type': 'Order Type',
    'order_type.at_auction': 'At-auction Order',
    'order_type.at_auction_limit': 'At-auction Limit Order',
    'order_type.limit': 'Limit Order',
    'order_type.enhanced_limit': 'Enhanced Limit Order',
    'order_type.special_limit': 'Special Limit Order',
    'order_type_desc.at_auction': 'No specified price; matched at final Indicative Equilibrium Price (IEP) during auction sessions; higher priority.',
    'order_type_desc.at_auction_limit': 'Specified price; matched at IEP if price is equal to or better than IEP; unmatched orders may carry over to Continuous Trading Session.',
    'order_type_desc.limit': 'Specified price; matched only at that price; unmatched portion remains in the order book.',
    'order_type_desc.enhanced_limit': 'Specified price; can match up to 10 price levels; unmatched portion is immediately cancelled.',
    'order_type_desc.special_limit': 'Specified price; can match up to 10 price levels; unmatched portion becomes a Limit Order.',
    
    // 成交相关
    'transactions.execution_time': 'Execution Time',
    'transactions.execution_quantity': 'Execution Qty',
    'transactions.execution_amount': 'Execution Amount',
    'transactions.execution_datetime': 'Date Time',
    'transactions.execution_price': 'Execution Price',
    
    // 资金流水
    'fund_flow.trade_date': 'Trade Date',
    'fund_flow.business_name': 'Business Name',
    'fund_flow.amount': 'Amount',
    'fund_flow.remaining_amount': 'Remaining Amount',
    'fund_flow.currency': 'Currency',
    'fund_flow.remarks': 'Remarks',
    'fund_flow.deposit': 'Deposit Funds',
    
    // 加密货币相关
    'crypto.defi_yield': 'DeFi Yield',
    
    // 新股中心
    'new_stock.upcoming': 'Upcoming IPOs',
    'new_stock.listed': 'Newly Listed',
    'new_stock.serial_number': 'No.',
    'new_stock.ipo_price': 'IPO Price',
    'new_stock.lot_size': 'Lot Size',
    'new_stock.min_subscription': 'Min Subscription',
    'new_stock.latest_price': 'Latest Price',
    'new_stock.first_day_change': 'First Day Change',
    'new_stock.dark_market_change': 'Dark Pool Change',
    'new_stock.subscription_multiple': 'Subscription Multiple',
    'new_stock.lottery_rate': 'Lottery Rate',
    'new_stock.listing_date': 'Listing Date',
    'new_stock.cumulative_change': 'Cumulative Change',
    
    // 板块热力图
    'heatmap.sector_heatmap': 'Sector Heatmap',
    'heatmap.sectors': 'Sectors',
    'heatmap.title': 'Heatmap',
    'heatmap.industry': 'Industry',
    'heatmap.individual_stocks': 'Stocks',
    'heatmap.hk_sector_heatmap': 'HK Sector Heatmap',
    'heatmap.subtitle': 'Gain > 0: Green; Loss < 0: Red; No Change = 0: Gray',
    'heatmap.market_cap': 'Market Cap',
    'heatmap.previous_value': 'Prev Value',
    'heatmap.change_percent': 'Change %',
    'heatmap.hk_sectors': 'HK Sectors',
    
    // 详细股票表格
    'detailed_table.period.1d': '1D',
    'detailed_table.period.5d': '5D',
    'detailed_table.period.1m': '1M',
    'detailed_table.period.3m': '3M',
    'detailed_table.period.6m': '6M',
    'detailed_table.period.1y': '1Y',
    'detailed_table.period.2y': '2Y',
    'detailed_table.period.5y': '5Y',
    'detailed_table.volume': 'Volume',
    'detailed_table.turnover': 'Turnover',
    'detailed_table.pe_ratio': 'P/E Ratio',
    'detailed_table.market_cap': 'Market Cap',
    'detailed_table.view_details': 'View Details',
    
    // 通用表格字段
    'table.volume': 'Volume',
    'table.turnover': 'Turnover',
    'table.market_cap': 'Market Cap',
    'table.pe_ratio': 'P/E Ratio',
    
    // 资金流向
    'capital_flow.title': 'Capital Flow Trend',
    'capital_flow.unit': 'Unit: Yuan',
    'capital_flow.history': 'Historical Data',
    'capital_flow.5d': '5D',
    'capital_flow.20d': '20D',
    'capital_flow.60d': '60D',
    'capital_flow.net_inflow': '5-day net inflow: 9.99B',
    'capital_flow.net_inflow_legend': 'Net Inflow',
    'capital_flow.net_outflow_legend': 'Net Outflow',
    'capital_flow.close_price_legend': 'Close Price',
    
    // 买卖盘
    'order_book.title': 'Order Book (10 Levels)',
    'order_book.broker_title': 'Order Book Brokers',
    'order_book.buy_broker': 'Buy Brokers',
    'order_book.sell_broker': 'Sell Brokers',
    
    // 股票详情页
    'stock_detail.name_code': 'Name/Code',
    'stock_detail.latest_price': 'Latest Price',
    'stock_detail.change_percent': 'Change %',
    'stock_detail.ranking': 'Stock Rankings',
    'stock_detail.status_trading': 'Trading',
    
    // 关于我们页面
    'about.title': 'About Us',
    'about.app_name': 'HK Stock Dashboard',
    'about.version': 'V1.0.1',
    'about.description': 'HK Stock Dashboard is a professional Hong Kong stock market analysis tool that provides real-time market data, technical analysis charts, and investment decision support for investors.',
    'about.features': 'Key Features',
    'about.feature_1': '• Real-time HK stock market data',
    'about.feature_2': '• Professional technical analysis charts',
    'about.feature_3': '• Detailed stock information lookup',
    'about.feature_4': '• Watchlist management',
    'about.feature_5': '• Multiple theme modes',
    'about.contact': 'Contact Us',
    'about.email': 'Email: support@hkdashboard.com',
    'about.website': 'Website: www.hkdashboard.com',
    'about.copyright': '© 2024 HK Stock Dashboard. All rights reserved.',
    
    // 板块热力图额外文本
    'heatmap.more': 'More',
    'heatmap.title_main': 'Heatmap',
    'heatmap.industry_btn': 'Industry',
    'heatmap.individual_stocks_btn': 'Stocks',
    
    // 下拉菜单
    'dropdown.business': 'Business Services',
    'dropdown.points': 'Points Center',
    'dropdown.my_quotes': 'My Quotes',
    'dropdown.my_cards': 'My Cards',
    'dropdown.settings': 'Settings',
    'dropdown.logout': 'Logout',
    'dropdown.updates': 'Updates',
    'dropdown.following': 'Following',
    'dropdown.followers': 'Followers',
    'dropdown.favorites': 'Favorites',
    'dropdown.help_center': 'Help Center',
    
    // 发现页面
    'discovery.title': 'Discovery',
    'discovery.section.my': 'My',
    'discovery.section.trading': 'Trading',
    'discovery.section.funds': 'Funds',
    'discovery.section.value_added_services': 'Value-Added Services',
    'discovery.section.account': 'Account',
    
    // 发现页面功能项 - 我的
    'discovery.deposit': 'Deposit',
    'discovery.ipo_subscription': 'IPO Subscription',
    'discovery.cash_management': 'Cash Management',
    'discovery.stock_comparison': 'Stock Comparison',
    'discovery.stock_transfer': 'Stock Transfer',
    'discovery.strategy_square': 'Strategy Square',
    'discovery.currency_exchange': 'Currency Exchange',
    'discovery.industry_chain': 'Industry Chain',
    'discovery.points_center': 'Points Center',
    
    // 发现页面功能项 - 交易
    'discovery.trading': 'Trading',
    'discovery.orders': 'Orders',
    'discovery.stocks': 'Stocks',
    'discovery.ah_stocks': 'AH Stocks',
    'discovery.enterprise_services': 'Enterprise Services',
    'discovery.permission_application': 'Permission Application',
    'discovery.cryptocurrency': 'Cryptocurrency',
    
    // 发现页面功能项 - 资金
    'discovery.withdraw': 'Withdraw',
    'discovery.bank_management': 'Bank Management',
    'discovery.deposit_withdraw_records': 'Deposit/Withdraw Records',
    
    // 发现页面功能项 - 增值服务
    'discovery.premium_quotes': 'Premium Quotes',
    'discovery.my_vouchers': 'My Vouchers',
    'discovery.research_reports': 'Research Reports',
    'discovery.global_rankings': 'Global Rankings',
    'discovery.smart_rankings': 'Smart Rankings',
    
    // 发现页面功能项 - 账户
    'discovery.change_password': 'Change Password',
    'discovery.devices': 'Devices',
    'discovery.settings': 'Settings',
    'discovery.real_name_verification': 'Real Name Verification',
    'discovery.business_handling': 'Business Handling',
    'discovery.change_phone': 'Change Phone',
    'discovery.help_center': 'Help Center',
    'discovery.w8_renewal': 'W-8 Renewal',
    'discovery.account_unfreeze': 'Account Unfreeze',
    'discovery.profile_update': 'Profile Update',
    
    // 指数信息面板
    'index_panel.high': 'High',
    'index_panel.low': 'Low',
    'index_panel.open': 'Open',
    'index_panel.close': 'Prev Close',
    'index_panel.volume': 'Volume',
    'index_panel.avg_price': 'Avg Price',
    'index_panel.related': 'Related',
    'index_panel.futures': 'Futures',
    'index_panel.premium': 'Premium',
    'index_panel.market_tab': 'Market',
    'index_panel.analysis_tab': 'Analysis',
    'index_panel.news_tab': 'News',
    'index_panel.news_subtab': 'News',
    'index_panel.announcement_subtab': 'Announcements',
    'index_panel.rating_subtab': 'Ratings',
    'index_panel.stock_analysis_title': 'Stock Analysis',
    
    // 基金相关
    'funds.serial_number': 'No.',
    'funds.isin': 'ISIN',
    'funds.name': 'Name',
    'funds.period_1m': '1M',
    'funds.period_3m': '3M',
    'funds.period_6m': '6M',
    'funds.period_1y': '1Y',
    'funds.period_3y': '3Y',
    'funds.period_ytd': 'YTD',
    'funds.period_since_inception': 'Since Inception',
    'funds.sharpe_ratio': 'Sharpe Ratio',
    'funds.min_purchase': 'Min Purchase',
    'funds.currency': 'Currency',
    'funds.annual_management_fee': 'Annual Mgmt Fee',

    // Currency
    'currency.usd': 'USD',
    'currency.hkd': 'HKD',
    'currency.cny': 'CNY',

    // Account
    'account.funds_position': 'Funds Position',

    // Funds Page
    'funds.assets': 'Assets',
    'funds.item': 'Item',
    'funds.amount': 'Amount',
    'funds.total_market_value': 'Total Market Value',
    'funds.available_funds': 'Available Funds',
    'funds.pending_orders': 'Pending Orders',
    'funds.frozen_funds': 'Frozen Funds',
    'funds.risk_level': 'Risk Level',
    'funds.moderate': 'Moderate',
    'funds.performance_summary': 'Performance Summary',
    'funds.period': 'Period',
    'funds.return_rate': 'Return Rate',
    'funds.today_return': 'Today Return',
    'funds.total_return': 'Total Return',
    'funds.profit_loss': 'P&L Amount',
    'funds.allocation': 'Allocation',
    'funds.fund_type': 'Fund Type',
    'funds.proportion': 'Proportion',
    'funds.equity_funds': 'Equity',
    'funds.bond_funds': 'Bond',
    'funds.money_market': 'Money Market',

    // Tabs
    'tabs.fund_holdings': 'Fund Holdings',

    // Actions
    'actions.fund_purchase': 'Fund Purchase',
    'actions.fund_redemption': 'Fund Redemption',
    'actions.fund_conversion': 'Fund Conversion',
    'actions.fixed_investment': 'Recurring Investment',
    'actions.fund_rankings': 'Fund Rankings',
    'actions.fund_statements': 'Fund Statements',
    'actions.fund_rewards': 'Fund Rewards',

    // Fund Holdings table headers
    'fund_holdings.operation': 'Operation',
    'fund_holdings.fund_code': 'Fund Code',
    'fund_holdings.fund_name': 'Fund Name',
    'fund_holdings.shares': 'Shares',
    'fund_holdings.nav': 'NAV',
    'fund_holdings.cost_nav': 'Cost NAV',
    'fund_holdings.market_value': 'Market Value',
    'fund_holdings.profit_loss_ratio': 'P&L %',
    'fund_holdings.profit_loss_amount': 'P&L Amount',
    'fund_holdings.today_profit_loss': 'Today P&L',
    'fund_holdings.position_ratio': 'Position %',

    // Fund Flow
    'fund_flow.fund_purchase': 'Fund Purchase',
    'fund_flow.fund_redemption': 'Fund Redemption',
    'fund_flow.fund_subscription': 'Fund Subscription',
    'fund_flow.partial_redemption': 'Partial Redemption',
  }
}