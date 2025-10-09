'use client'

import React, { useState } from 'react'
import { cn } from '../lib/utils'
import { X, Book, FileText, Users, TrendingUp, MessageSquare, Star } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface HelpCenterPopupProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

interface DocSection {
  id: string
  title: string
  icon: React.ReactNode
  content: string
}

const docSections: DocSection[] = [
  {
    id: 'account',
    title: '账户操作指南',
    icon: <Users className="w-4 h-4" />,
    content: `# 账户操作指南

## 概述
账户页面提供用户个人资料管理、持仓概览和交易历史查看。支持表单编辑和图表可视化持仓趋势。集成登录流程。

## 主要特性
- **个人资料编辑**：更新姓名、邮箱、密码和头像。
- **持仓概览**：显示总资产、持股列表、收益曲线图。
- **证券内容**：详细持仓表格，包括成本价、当前价、盈亏。
- **交易历史**：时间线视图，过滤买入/卖出记录。
- **安全设置**：密码修改、二步验证和密钥管理。

## 操作步骤
1. **访问账户页**：
   - 点击左侧导航"账户"图标，跳转到账户页面。
   - 如未登录，弹出登录窗口（输入用户名和密码）。

2. **查看概览**：
   - 顶部仪表板显示账户余额、今日盈亏、持仓数量。
   - 趋势图渲染线图，展示资产随时间变化（支持1周/1月/1年视图）。
   - 滚动查看"证券持仓"表格：列包括股票代码、数量、成本、现价、盈亏%。

3. **修改资料**：
   - 点击"个人资料"标签，填写表单：姓名、邮箱、手机。
   - 上传头像：拖拽或点击选择图片，预览后保存。
   - 修改密码：输入旧密码、新密码（至少8位，包含数字）。

4. **管理持仓**：
   - 在"证券内容"标签，点击持仓行编辑数量或卖出。
   - 添加新持仓：点击"买入"按钮，打开窗口搜索股票并输入数量。
   - 批量操作：选中多行，执行卖出或转移到自选股。

5. **浏览交易历史**：
   - 切换到"交易记录"标签，按日期/类型过滤。
   - 点击交易项查看详情，包括手续费和市场价。
   - 导出历史：点击"导出CSV"下载所有记录。

6. **安全与设置**：
   - "安全"标签下启用二步验证（邮箱/短信代码）。
   - 查看密钥：生成新密钥，用于外部集成（如移动App）。

## 注意事项
- 修改密码后需重新登录。
- 持仓显示基于当前市场价，实时更新。

## 故障排除
- 登录问题：检查用户名密码，或试试重置。
- 图表不显示：刷新页面。
- 保存失败：确保所有字段填写完整。`
  },
  {
    id: 'market',
    title: '市场操作指南',
    icon: <TrendingUp className="w-4 h-4" />,
    content: `# 市场操作指南

## 概述
市场页面是应用的核心仪表板，提供HK、CN、US和加密货币市场的实时数据概览，包括指数走势、股票涨幅榜、热门股和板块热力图。支持多市场切换和HK专属子标签（首页、概念板块、新股中心）。展示交互式图表和可点击表格。

## 主要特性
- **多市场支持**：一键切换HK（恒生指数）、CN（沪深指数）、US（道琼斯）和Crypto（比特币等）。
- **指数监控**：折线图显示实时价格和成交量。
- **股票表格**：涨幅、跌幅、热门股和高息股表格，支持排序和详情跳转。
- **板块热力图**：可视化行业表现，颜色编码涨跌。
- **响应式布局**：PC/移动端适配，右侧侧边栏固定显示指数详情。

## 操作步骤
1. **切换市场**：
   - 在顶部导航栏点击"HK"、"CN"、"US"或"Crypto"按钮。
   - 页面内容自动刷新为对应市场数据，无需重新加载。
   - HK市场显示额外子标签：首页（默认）、概念板块、新股中心。

2. **查看指数**：
   - 主区域顶部显示主要指数卡片（如恒生指数：当前价、涨跌幅、24h变动）。
   - 点击指数卡进入详情图表，查看1日/1周/1月历史走势。
   - 右侧侧边栏"指数信息面板"持续更新选定市场的实时数据。

3. **浏览股票列表**：
   - 在首页标签下，查看四个表格：涨幅榜、跌幅榜、热门股、高息股。
   - 点击表格头部排序（价格、涨跌%、成交量）；默认按涨跌幅降序。
   - 点击股票行跳转到股票详情页；"显示更多"按钮展开完整表格（分页支持）。

4. **使用HK子标签**：
   - **概念板块**：点击"概念板块"标签，左侧选择行业（如金融、科技），右侧显示过滤后的股票表格。点击板块卡片高亮显示。
   - **新股中心**：点击"新股中心"标签，查看IPO或新上市股票列表，包括发行价、上市日期和首日表现。支持筛选日期范围。

5. **热力图交互**：
   - 在首页或专属热力图页，点击热力图上的板块泡泡查看详情表格。
   - 鼠标悬停显示板块涨跌幅提示；缩放/拖拽探索大型图表。

6. **搜索与过滤**：
   - 顶部搜索栏输入股票代码或名称，实时过滤表格。
   - 过滤器图标（右侧按钮）打开面板，选择市值范围、行业或涨跌阈值。

## 注意事项
- HK市场有额外功能，其他市场使用标准视图。
- 点击股票可查看更多细节，使用浏览器后退返回。

## 故障排除
- 图表不显示：刷新页面试试。
- 表格为空：切换市场或等待数据加载。
- 布局不对：检查浏览器窗口大小，调整分辨率。`
  },
  {
    id: 'discovery',
    title: '发现操作指南',
    icon: <FileText className="w-4 h-4" />,
    content: `# 发现操作指南

## 概述
发现页面帮助用户探索新机会，通过算法推荐股票、最新新闻和市场洞察。集成搜索和过滤器，基于用户偏好（如持仓历史）个性化显示。展示卡片式布局和新闻提要。

## 主要特性
- **智能推荐**：基于热门板块和趋势推荐股票/ETF。
- **新闻聚合**：实时新闻卡片。
- **市场洞察**：分析师报告摘要、趋势预测。
- **个性化**：根据自选股和浏览历史调整推荐。
- **社交分享**：一键分享推荐到社区或消息。

## 操作步骤
1. **进入发现页**：
   - 点击左侧导航"发现"图标，加载推荐内容。
   - 页面分为三栏：推荐股票、热门新闻、市场报告。

2. **浏览推荐**：
   - "今日推荐"部分显示5-10个股票卡片，包括代码、当前价、理由（如"科技板块强势"）。
   - 点击"为什么推荐"展开详情：基本面分析、目标价。
   - "添加到自选"按钮快速添加感兴趣股票。

3. **阅读新闻**：
   - "新闻提要"滚动列表，每条包含标题、来源、发布时间和摘要。
   - 点击新闻链接打开弹出窗口或新标签，显示全文。
   - 过滤新闻：点击标签选择"HK市场"、"加密货币"或"财报季"。

4. **探索洞察**：
   - "市场报告"卡片显示宏观分析，如"恒生指数支撑位分析"。
   - 点击报告下载PDF或查看图表。

5. **个性化设置**：
   - 点击右上"设置"图标，调整推荐类型（激进/保守）、兴趣行业（金融/科技）。
   - "基于持仓"开关：启用后，推荐与现有资产互补股票。
   - 保存设置后，页面实时更新推荐。

6. **搜索与分享**：
   - 顶部搜索栏探索特定主题，如"锂电池概念股"。
   - 分享按钮：复制链接或发送到消息/社区。

## 注意事项
- 推荐基于热门数据。
- 您的兴趣设置保存在浏览器中。

## 故障排除
- 无推荐：重置设置试试。
- 新闻不加载：刷新页面。
- 分享出问题：检查浏览器权限。`
  },
  {
    id: 'community',
    title: '社区操作指南',
    icon: <Users className="w-4 h-4" />,
    content: `# 社区操作指南

## 概述
社区功能连接用户论坛、股票讨论和知识分享。通过嵌入式窗口集成社区平台（tfi.tfisec.cn/communityPC），支持发帖、回复和关注。

## 主要特性
- **论坛集成**：无缝嵌入PC版社区页面，浏览帖子和话题。
- **讨论主题**：HK股票分析、投资策略、实时问答。
- **用户互动**：点赞、回复、@提及（在窗口内）。
- **个性化Feed**：基于关注话题过滤内容。
- **分享集成**：从应用内分享股票到社区帖子。

## 操作步骤
1. **进入社区**：
   - 点击底部导航"社区"图标，打开全屏窗口。
   - 窗口加载社区页面：https://tfi.tfisec.cn/communityPC。

2. **浏览内容**：
   - 窗口内导航到热门话题、板块（如"港股交流"）。
   - 点击帖子查看详情：作者、时间、内容、评论。
   - 使用搜索栏查找"恒生指数"或特定股票讨论。

3. **参与讨论**：
   - 登录社区账户（窗口内部），点击"发帖"创建新主题。
   - 回复评论：点击帖子下"回复"输入文本，支持简单格式。
   - 点赞/收藏：点击心形图标支持帖子。

4. **管理关注**：
   - 关注用户：点击用户头像"关注"，接收其新帖通知。
   - 关注话题：标签页下选择"科技股"，个性化Feed更新。
   - 消息集成：社区回复同步到应用消息中心。

5. **分享与退出**：
   - 从应用股票详情，点击"分享到社区"生成帖子草稿（跳转窗口）。
   - 关闭窗口：点击右上"×"按钮，返回主应用。
   - 调整大小：拖拽窗口边框（响应式设计）。

6. **设置**：
   - 窗口内设置通知偏好：邮箱订阅热门帖。
   - 应用级：社区窗口中启用"自动登录"。

## 注意事项
- 需要在社区网站登录才能发帖。
- 帖子内容需遵守社区规则。
- 在手机上建议横屏查看。

## 故障排除
- 页面不加载：检查网络连接。
- 登录问题：清除浏览器缓存重试。
- 窗口关不上：点击背景或按ESC键。`
  },
  {
    id: 'messages',
    title: '消息操作指南',
    icon: <MessageSquare className="w-4 h-4" />,
    content: `# 消息操作指南

## 概述
消息系统处理系统通知、交易警报和用户间沟通。通过弹出窗口和通知实现，支持未读标记和回复。

## 主要特性
- **通知类型**：价格警报（e.g., 股票达目标价）、系统更新、交易确认。
- **用户消息**：聊天，与客服或社区用户互动。
- **警报设置**：自定义价格阈值、新闻关键词。
- **历史记录**：归档旧消息，支持搜索和导出。
- **多渠道**：弹出式、侧边栏、移动推送。

## 操作步骤
1. **查看新消息**：
   - 点击底部导航"消息"图标（带红点未读指示），打开全屏弹出窗口。
   - 列表显示未读通知，按时间降序；点击标记为已读。
   - 通知自动弹出重要警报（如"恒生指数突破30000"）。

2. **回复消息**：
   - 在消息详情中，点击"回复"按钮打开输入框。
   - 支持文本、表情和附件（上传图片）；发送后实时更新聊天。
   - 对于系统通知，点击"确认"关闭。

3. **设置警报**：
   - 在消息窗口顶部"+警报"按钮，搜索股票选择阈值（e.g., ">5%上涨"）。
   - 选择通知方式：弹出、声音、邮件。
   - 保存后，警报自动触发推送。

4. **管理历史**：
   - 切换"历史"标签，搜索关键词或过滤类型（警报/聊天）。
   - 删除单条：长按消息右滑删除；批量删除选中多条。
   - "导出"功能生成日志文件，包含时间戳和内容。

5. **隐私与通知**：
   - 设置中调整通知权限：静音模式、仅重要消息。
   - 屏蔽用户：长按聊天右上菜单选择屏蔽。

## 注意事项
- 消息保存在您的设备上，换设备需重新设置。
- 新消息会通过小弹窗提醒。
- 附件发送限小文件。

## 故障排除
- 没收到新消息：检查通知设置或刷新。
- 回复不发送：试试重新输入发送。
- 窗口打不开：关闭其他标签重试。`
  },
  {
    id: 'watchlist',
    title: '自选股操作指南',
    icon: <Star className="w-4 h-4" />,
    content: `# 自选股操作指南

## 概述
自选股功能允许用户创建个性化股票关注列表，跟踪特定股票的价格、涨跌幅和基本信息。该功能支持添加、移除和排序股票。

## 主要特性
- **个性化跟踪**：用户可添加感兴趣的HK、CN、US股票或加密货币到列表。
- **实时更新**：列表显示最新价格、变动百分比和成交量。
- **排序与过滤**：按涨跌幅、价格或字母顺序排序；过滤已持仓股票。
- **快速访问**：从列表直接跳转到股票详情页。
- **导入/导出**：支持从CSV文件导入列表，或导出为报告。

## 操作步骤
1. **添加股票**：
   - 在市场页面或股票表格中，点击股票行右边的"+"图标或"添加到自选"按钮。
   - 搜索栏输入股票代码（如"0700.HK"）或名称，选择后确认添加。
   - 添加成功后，列表自动刷新显示新股票。

2. **查看自选列表**：
   - 点击左侧导航栏的"自选股"图标进入页面。
   - 列表显示股票代码、当前价格、涨跌幅（绿色上涨、红色下跌）、成交量。
   - 使用搜索框快速查找特定股票。

3. **管理列表**：
   - **编辑顺序**：拖拽股票行调整显示顺序。
   - **移除股票**：点击股票行"删除"按钮，确认后从列表移除。
   - **批量操作**：选中多个股票，执行批量删除或设置警报。

4. **查看详情**：
   - 点击任何股票行，跳转到股票详情页，显示K线图、历史数据和新闻。
   - 在详情页可进一步添加到持仓或设置价格提醒。

5. **设置与导出**：
   - 点击列表顶部"设置"按钮，调整显示列（如隐藏成交量）或主题（深色模式）。
   - "导出"按钮生成PDF或CSV报告，包含列表快照和性能分析。

## 注意事项
- 自选列表保存在您的浏览器中，换设备需重新添加。
- 如果股票有变动，系统会提示更新。

## 故障排除
- 无法添加股票：刷新页面或检查浏览器权限。
- 列表不显示：确保已添加股票，或清除浏览器缓存重试。`
  }
]

export function HelpCenterPopup({ isOpen, onClose, className }: HelpCenterPopupProps) {
  const [selectedSection, setSelectedSection] = useState<string>('account')

  if (!isOpen) return null

  const selectedDoc = docSections.find(doc => doc.id === selectedSection)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div 
        className={cn(
          "bg-[#222632] rounded-lg shadow-xl w-[90vw] max-w-[1000px] h-[80vh] flex flex-col",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <Book className="w-5 h-5 text-[#DBDBE0]" />
            <h2 className="text-lg font-semibold text-[#DBDBE0]">帮助中心</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5 text-[#DBDBE0]" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-600 bg-[#1A1D26] p-4 overflow-y-auto">
            <nav className="space-y-1">
              {docSections.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedSection(doc.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 text-left text-sm rounded-md transition-colors",
                    selectedSection === doc.id
                      ? "bg-[#333747] text-[#DBDBE0]"
                      : "text-[#9CA3AF] hover:bg-[#2A2F3A] hover:text-[#DBDBE0]"
                  )}
                >
                  {doc.icon}
                  <span>{doc.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedDoc && (
              <div className="prose prose-invert max-w-none text-[#DBDBE0] leading-relaxed">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-[#DBDBE0] mb-4 mt-6 border-b border-gray-600 pb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-[#DBDBE0] mb-3 mt-5">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium text-[#DBDBE0] mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-[#B0B7C3] mb-3 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-[#B0B7C3] mb-3 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-[#B0B7C3] mb-3 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="ml-4">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-[#DBDBE0]">{children}</strong>
                    ),
                    code: ({ children }) => (
                      <code className="bg-[#2A2F3A] text-[#E5C07B] px-1 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-[#9CA3AF]">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {selectedDoc.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}