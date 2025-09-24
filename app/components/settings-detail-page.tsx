'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'
import { AboutUsPage } from './about-us-page'

interface SettingsDetailPageProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function SettingsDetailPage({ isOpen, onClose, className }: SettingsDetailPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('简体中文')
  const [selectedColorScheme, setSelectedColorScheme] = useState('红涨绿跌') // '红涨绿跌' | '绿涨红跌'
  const [selectedTheme, setSelectedTheme] = useState('浅色') // '深色' | '浅色'
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showAboutUs, setShowAboutUs] = useState(false)

  const languages = ['简体中文', '繁体中文', 'English']

  if (!isOpen) return null

  return (
    <>
      {/* About Us Page */}
      <AboutUsPage 
        isOpen={showAboutUs} 
        onClose={() => setShowAboutUs(false)}
        className={className}
      />
      
      {/* Settings Detail Page */}
      <div 
        className={cn(
          "absolute left-8 top-0 w-[250px] h-[436px] bg-[#222632] rounded-lg shadow-[0px_4px_30px_0px_rgba(0,0,0,0.6)] z-50",
          showAboutUs && "hidden", // Hide settings when about us is open
          className
        )}
      >
      {/* Header */}
      <div className="relative h-[40px] bg-[#222632] rounded-t-lg border-b border-[rgba(75,82,105,0.2)]">
        <button
          onClick={onClose}
          className="absolute left-[20px] top-[15px] w-[9px] h-[9px] transform rotate-180"
        >
          <ChevronRight className="w-full h-full text-[#DBDBE0]" />
        </button>
        <div className="absolute left-1/2 top-[12px] transform -translate-x-1/2 text-[#DBDBE0] text-[12px] font-medium">
          设置
        </div>
      </div>

      <div className="p-4 space-y-8">
        {/* Language Section */}
        <div className="space-y-3">
          <div className="text-[#DBDBE0] text-[12px] font-normal">语言</div>
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-[147px] h-[27px] bg-[#1D212A] rounded-sm px-2.5 py-1.5 flex items-center justify-between hover:bg-[#2A2F3A] transition-colors"
            >
              <span className="text-white text-[10px] font-normal">{selectedLanguage}</span>
              <ChevronDown className={cn(
                "w-[9px] h-[6px] text-[#8A8B96] transition-transform",
                showLanguageDropdown && "rotate-180"
              )} />
            </button>
            
            {/* Language Dropdown */}
            {showLanguageDropdown && (
              <div className="absolute top-full left-0 mt-1.5 w-[147px] bg-[#1D212A] rounded-sm border border-[#8A8B96] z-10">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => {
                      setSelectedLanguage(language)
                      setShowLanguageDropdown(false)
                    }}
                    className={cn(
                      "w-full px-2.5 py-1.5 text-left text-[10px] font-normal hover:bg-[#2A2F3A] transition-colors",
                      selectedLanguage === language ? "text-white bg-[#2A2F3A]" : "text-[#8A8B96]"
                    )}
                  >
                    {language}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Color Scheme Section */}
        <div className="space-y-3">
          <div className="text-[#DBDBE0] text-[12px] font-normal">涨跌色</div>
          <div className="flex space-x-3">
            {/* Red Up Green Down */}
            <div 
              className={cn(
                "w-[100px] h-[42px] rounded-sm border-[1px] relative overflow-hidden cursor-pointer flex items-center justify-center",
                selectedColorScheme === '红涨绿跌' 
                  ? "border-white bg-white" 
                  : "border-[#1D212A] bg-[#1D212A]"
              )}
              onClick={() => setSelectedColorScheme('红涨绿跌')}
            >
              {/* Stock chart pattern with red/green */}
              <div className="w-9 h-4.5 relative">
                <svg viewBox="0 0 24 12" className="w-full h-full">
                  <path 
                    d="M1 8L3 6L6 4L9 7L12 3L15 5L18 2L21 6L24 4" 
                    stroke="#F44345" 
                    strokeWidth="0.8" 
                    fill="none"
                  />
                </svg>
              </div>
              <div className="absolute bottom-1.5 left-3 text-white text-[10px] leading-tight">
                红涨<br/>绿跌
              </div>
            </div>

            {/* Green Up Red Down */}
            <div 
              className={cn(
                "w-[100px] h-[42px] rounded-sm border-[1px] relative overflow-hidden cursor-pointer flex items-center justify-center",
                selectedColorScheme === '绿涨红跌' 
                  ? "border-white bg-white" 
                  : "border-[#1D212A] bg-[#1D212A]"
              )}
              onClick={() => setSelectedColorScheme('绿涨红跌')}
            >
              {/* Stock chart pattern with green/red */}
              <div className="w-9 h-4.5 relative">
                <svg viewBox="0 0 24 12" className="w-full h-full">
                  <path 
                    d="M1 8L3 6L6 4L9 7L12 3L15 5L18 2L21 6L24 4" 
                    stroke="#16BA71" 
                    strokeWidth="0.8" 
                    fill="none"
                  />
                </svg>
              </div>
              <div className="absolute bottom-1.5 left-3 text-white text-[10px] leading-tight">
                绿涨<br/>红跌
              </div>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="flex space-x-3">
          {/* Dark Theme */}
          <div className="w-[100px] h-[72px] space-y-1">
            <div 
              className={cn(
                "w-full h-[51px] rounded-sm border-[1px] relative overflow-hidden cursor-pointer",
                selectedTheme === '深色' 
                  ? "border-[#DBDBE0] bg-[#DBDBE0]" 
                  : "border-[#11131B] bg-[#11131B]"
              )}
              onClick={() => setSelectedTheme('深色')}
            >
              {/* Dark theme indicators */}
              <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-[#F44345]"></div>
              <div className="absolute top-1 left-[14px] w-1.5 h-1.5 rounded-full bg-[#E9C64E]"></div>
              <div className="absolute inset-x-0 bottom-3 h-[39px] bg-[#1D212A] rounded-sm"></div>
            </div>
            <div className="text-[#72737A] text-[10px] font-normal text-center">深色</div>
          </div>

          {/* Light Theme */}
          <div className="w-[100px] h-[72px] space-y-1">
            <div 
              className={cn(
                "w-full h-[51px] rounded-sm border-[1px] relative overflow-hidden cursor-pointer",
                selectedTheme === '浅色' 
                  ? "border-[#DBDBE0] bg-[#DBDBE0]" 
                  : "border-[#DBDBE0] bg-[#DBDBE0]"
              )}
              onClick={() => setSelectedTheme('浅色')}
            >
              {/* Light theme indicators */}
              <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-[#F44345]"></div>
              <div className="absolute top-1 left-[14px] w-1.5 h-1.5 rounded-full bg-[#E9C64E]"></div>
              <div className="absolute inset-x-0 bottom-3 h-[39px] bg-[#C8C8D2] rounded-sm"></div>
            </div>
            <div className="text-[#72737A] text-[10px] font-normal text-center">浅色</div>
          </div>
        </div>

        {/* About Us Section */}
        <button 
          onClick={() => setShowAboutUs(true)}
          className="w-full flex items-center justify-between hover:bg-[rgba(75,82,105,0.1)] rounded px-2 py-1.5 transition-colors"
        >
          <div className="text-[#DBDBE0] text-[12px] font-normal">关于我们</div>
          <div className="flex items-center space-x-3">
            <div className="text-[#DBDBE0] text-[12px] font-normal">V1.0.1</div>
            <ChevronRight className="w-2.5 h-2.5 text-[#DBDBE0]" />
          </div>
        </button>
      </div>
      </div>
    </>
  )
}