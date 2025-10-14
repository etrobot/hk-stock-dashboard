'use client'

import { useMemo, useState } from 'react'
import { cn } from '../lib/utils'
import { Book } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import docsData from '../data/generated-docs.json'

interface DocEntry { id: string; title: string; content: string }

export default function DocPage() {
  const docs: DocEntry[] = (docsData as any).docs ?? []
  const [selectedId, setSelectedId] = useState<string>(docs[0]?.id ?? '')

  const selectedDoc = useMemo(() => docs.find(d => d.id === selectedId), [docs, selectedId])

  return (
    <div className="h-full w-full bg-[#222632] text-[#DBDBE0]">
      <div className="h-8 bg-card flex items-center justify-between border-b border-border px-4">
        <div className="flex items-center space-x-2">
          <Book className="w-5 h-5" />
          <span className="text-sm font-medium">帮助中心文档</span>
        </div>
      </div>
      <div className="flex h-[calc(100%-2rem)]">
        <aside className="w-64 border-r border-gray-600 bg-[#1A1D26] p-4 overflow-y-auto">
          <nav className="space-y-1">
            {docs.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedId(doc.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-3 py-2 text-left text-sm rounded-md transition-colors',
                  selectedId === doc.id ? 'bg-[#333747] text-[#DBDBE0]' : 'text-[#9CA3AF] hover:bg-[#2A2F3A] hover:text-[#DBDBE0]'
                )}
              >
                <span>{doc.title}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          {selectedDoc ? (
            <div className="prose prose-invert max-w-none text-[#DBDBE0] leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-4 mt-6 border-b border-gray-600 pb-2">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold mb-3 mt-5">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-medium mb-2 mt-4">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-[#B0B7C3] mb-3 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-[#B0B7C3] mb-3 space-y-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-[#B0B7C3] mb-3 space-y-1">{children}</ol>
                  ),
                  li: ({ children }) => <li className="ml-4">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  code: ({ children }) => (
                    <code className="bg-[#2A2F3A] text-[#E5C07B] px-1 py-0.5 rounded text-sm font-mono">{children}</code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-[#9CA3AF]">{children}</blockquote>
                  ),
                }}
              >
                {selectedDoc.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-sm text-[#9CA3AF]">暂无文档</div>
          )}
        </main>
      </div>
    </div>
  )
}
