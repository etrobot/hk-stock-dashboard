'use client'

import { useLanguage } from '../contexts/LanguageContext'

interface CommunityPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function CommunityPopup({ isOpen, onClose }: CommunityPopupProps) {
  const { t } = useLanguage()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded-lg border w-[90vw] h-[90vh] max-w-6xl max-h-[800px] flex flex-col shadow-2xl bg-white">
        <div className="flex justify-between items-center p-4 border-b bg-white rounded-t-lg">
          <h3 className="text-lg font-semibold text-gray-900">{t('nav.community')}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-semibold w-6 h-6 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        <div className="flex-1 bg-white rounded-b-lg">
          <iframe
            src="https://tfi.tfisec.cn/communityPC"
            className="w-full h-full border-0 rounded-b-lg"
            title={t('nav.community')}
          />
        </div>
      </div>
    </div>
  )
}