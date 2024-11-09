import React, { useState } from 'react';
import { Settings, Bell, Lock, Search, Shield, User } from 'lucide-react';
import { AccountSettings } from './sections/AccountSettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { PrivacySettings } from './sections/PrivacySettings';
import { SearchSettings } from './sections/SearchSettings';
import { SecuritySettings } from './sections/SecuritySettings';

type SettingsSection = 'account' | 'notifications' | 'privacy' | 'search' | 'security';

export function SettingsPanel() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');

  const sections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'security', label: 'Security', icon: Lock },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Settings className="h-8 w-8 text-gray-900" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-full md:w-64 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  activeSection === id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {label}
              </button>
            ))}
          </nav>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              {activeSection === 'account' && <AccountSettings />}
              {activeSection === 'notifications' && <NotificationSettings />}
              {activeSection === 'privacy' && <PrivacySettings />}
              {activeSection === 'search' && <SearchSettings />}
              {activeSection === 'security' && <SecuritySettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}