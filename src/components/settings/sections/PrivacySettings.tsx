import React, { useState } from 'react';
import { Loader } from 'lucide-react';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function PrivacySettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: 'profile-visibility',
      title: 'Profile Visibility',
      description: 'Make your profile visible to other users',
      enabled: true,
    },
    {
      id: 'search-visibility',
      title: 'Search Visibility',
      description: 'Allow your profile to appear in search results',
      enabled: true,
    },
    {
      id: 'activity-visibility',
      title: 'Activity Visibility',
      description: 'Show your recent activity to other users',
      enabled: false,
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      description: 'Show your contact information to connected users',
      enabled: true,
    },
  ]);

  const handleToggle = (settingId: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>
        <p className="text-sm text-gray-500 mb-6">
          Control who can see your information and how it's used.
        </p>

        <div className="space-y-6">
          {settings.map(setting => (
            <div key={setting.id} className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{setting.title}</h3>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={setting.enabled}
                    onChange={() => handleToggle(setting.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
}