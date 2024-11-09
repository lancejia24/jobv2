import React, { useState } from 'react';
import { Loader } from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export function NotificationSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'job-matches',
      title: 'Job Matches',
      description: 'Get notified when new jobs match your preferences',
      email: true,
      push: true,
      sms: false,
    },
    {
      id: 'application-updates',
      title: 'Application Updates',
      description: 'Receive updates about your job applications',
      email: true,
      push: true,
      sms: true,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Get notified when you receive new messages',
      email: true,
      push: true,
      sms: false,
    },
    {
      id: 'profile-views',
      title: 'Profile Views',
      description: 'Know when someone views your profile',
      email: false,
      push: true,
      sms: false,
    },
  ]);

  const handleToggle = (settingId: string, channel: 'email' | 'push' | 'sms') => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === settingId
          ? { ...setting, [channel]: !setting[channel] }
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
        <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose how and when you want to be notified.
        </p>

        <div className="space-y-6">
          {settings.map(setting => (
            <div key={setting.id} className="flex flex-col space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{setting.title}</h3>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={setting.email}
                    onChange={() => handleToggle(setting.id, 'email')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={setting.push}
                    onChange={() => handleToggle(setting.id, 'push')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">Push</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={setting.sms}
                    onChange={() => handleToggle(setting.id, 'sms')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">SMS</span>
                </label>
              </div>
              <div className="border-b border-gray-200"></div>
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