import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User } from 'lucide-react';
import { accountOverview } from '../data/account-mock-data';
import { AccountOverview } from '../components/account/AccountOverview';
import { SecuritiesContent } from '../components/account/SecuritiesContent';
import { useLanguage } from '../contexts/LanguageContext';

const AccountPage = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('ytd');
  const [selectedView, setSelectedView] = useState('returns');
  const [activeTab, setActiveTab] = useState('overview');
  const [accountType, setAccountType] = useState('孖展账户12345678');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content Area */}
      <div className="bg-background min-h-[calc(100vh-30px)] p-6">

        {/* Main Content */}
        <div className="flex gap-2">
        {/* Left Column - Clickable Cards */}
        <div className="w-96">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-primary" />
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger className="bg-input text-foreground text-sm h-6 px-2 w-auto border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="孖展账户12345678" className="text-sm">孖展账户12345678</SelectItem>
                    <SelectItem value="现金账户88888888" className="text-sm">现金账户88888888</SelectItem>
                    <SelectItem value="VA账户12345678" className="text-sm">VA账户12345678</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Account Overview Card */}
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              activeTab === 'overview' 
                ? 'border-[#FF5C00]' 
                : 'hover:border-[#FF5C00]'
            } mb-4`}
            onClick={() => setActiveTab('overview')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{t('account.total_assets')}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{accountOverview.totalAssets.currency}</span>
                  <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 8l-3-3h6l-3 3z"/>
                  </svg>
                </div>
              </div>
              <div className="text-lg font-bold text-card-foreground mb-1">
                {accountOverview.totalAssets.value}
              </div>
            </CardContent>
          </Card>

          {/* Securities Card */}
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              activeTab === 'securities' 
                ? 'border-[#FF5C00]' 
                : 'hover:border-[#FF5C00]'
            }`}
            onClick={() => setActiveTab('securities')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{t('account.securities_position')}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">HKD</span>
                </div>
              </div>
              <div className="text-lg font-bold text-card-foreground mb-1">
                --
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Dynamic Content */}
        <div className="w-full">
          <div className="space-y-4">
            {/* Content based on selected card */}
            {activeTab === 'overview' && (
              <AccountOverview
                selectedPeriod={selectedPeriod}
                selectedView={selectedView}
                onPeriodChange={setSelectedPeriod}
                onViewChange={setSelectedView}
              />
            )}

            {activeTab === 'securities' && (
              <SecuritiesContent />
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;