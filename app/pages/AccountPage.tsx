import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User, Eye, EyeOff, Lock } from 'lucide-react';
import { accountOverview } from '../data/account-mock-data';
import { AccountOverview } from '../components/account/AccountOverview';
import { SecuritiesContent } from '../components/account/SecuritiesContent';
import { FundsContent } from '../components/account/FundsContent';
import { useLanguage } from '../contexts/LanguageContext';
import { useTradingLock } from '../contexts/TradingLockContext';
import { Button } from '../components/ui/button';

const AccountPage = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('ytd');
  const [selectedView, setSelectedView] = useState('returns');
  const [activeTab, setActiveTab] = useState('overview');
  const [accountType, setAccountType] = useState('孖展账户12345678');
  const [selectedCurrency, setSelectedCurrency] = useState('HKD');
  const [isMasked, setIsMasked] = useState(false);
  const { isTradeUnlocked, showUnlockDialog } = useTradingLock();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-background min-h-[calc(100vh-30px)] p-6 relative">
        <div className="flex gap-2">
        <div className="w-96 shrink-0">
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
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="bg-input text-foreground text-xs h-5 px-2 w-auto border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="HKD" className="text-xs">HKD</SelectItem>
                      <SelectItem value="USD" className="text-xs">USD</SelectItem>
                      <SelectItem value="CNY" className="text-xs">CNY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <button className="p-1 text-muted-foreground hover:text-foreground" onClick={() => setIsMasked((v) => !v)}>
                  {isMasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-lg font-bold text-card-foreground mb-1">
                {isMasked ? '****' : accountOverview.totalAssets.value}
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              activeTab === 'securities' 
                ? 'border-[#FF5C00]' 
                : 'hover:border-[#FF5C00]'
            } mb-4`}
            onClick={() => setActiveTab('securities')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{t('account.securities_position')}</span>
                </div>
              </div>
              <div className="text-lg font-bold text-card-foreground mb-1">
                --
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              activeTab === 'funds' 
                ? 'border-[#FF5C00]' 
                : 'hover:border-[#FF5C00]'
            }`}
            onClick={() => setActiveTab('funds')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{t('account.funds_position')}</span>
                </div>
              </div>
              <div className="text-lg font-bold text-card-foreground mb-1">
                {isMasked ? '****' : '15,428.65'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full min-w-0">
          <div className="space-y-4">
            {activeTab === 'overview' && (
              <AccountOverview
                selectedPeriod={selectedPeriod}
                selectedView={selectedView}
                onPeriodChange={setSelectedPeriod}
                onViewChange={setSelectedView}
                isMasked={isMasked}
              />
            )}

            {activeTab === 'securities' && (
              <SecuritiesContent isMasked={isMasked} />
            )}

            {activeTab === 'funds' && (
              <FundsContent isMasked={isMasked} />
            )}
          </div>
        </div>
        </div>

        {!isTradeUnlocked && (
          <div className="absolute inset-0 bg-background/70 z-20 flex items-center justify-center">
            <Button
              className="rounded-full w-16 h-16 p-0 bg-[#FF5C00] hover:bg-[#e54f00]"
              onClick={() => showUnlockDialog()}
            >
              <Lock className="w-7 h-7 text-white" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;