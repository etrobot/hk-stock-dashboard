import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { User } from 'lucide-react';
import { accountOverview } from '../data/account-mock-data';
import { AccountOverview } from '../components/account/AccountOverview';
import { SecuritiesContent } from '../components/account/SecuritiesContent';

const AccountPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('ytd');
  const [selectedView, setSelectedView] = useState('returns');
  const [activeTab, setActiveTab] = useState('overview');

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
                <span className="text-sm text-foreground">
                  {accountOverview.accountType}({accountOverview.accountNumber})
                </span>
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
                  <span className="text-xs text-muted-foreground">总资产</span>
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
                  <span className="text-xs text-muted-foreground">证券持仓</span>
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