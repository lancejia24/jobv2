import React, { useState } from 'react';
import { Loader, X } from 'lucide-react';

interface SavedSearch {
  id: string;
  query: string;
  filters: {
    location?: string;
    jobType?: string;
    salary?: string;
  };
  createdAt: Date;
}

export function SearchSettings() {
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Frontend Developer',
    'React Developer San Francisco',
    'Remote JavaScript Jobs',
    'Senior Software Engineer',
  ]);

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: '1',
      query: 'Frontend Developer',
      filters: {
        location: 'San Francisco',
        jobType: 'Full-time',
        salary: '$100k+',
      },
      createdAt: new Date('2024-03-01'),
    },
    {
      id: '2',
      query: 'React Developer',
      filters: {
        location: 'Remote',
        jobType: 'Contract',
      },
      createdAt: new Date('2024-03-05'),
    },
  ]);

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleRemoveSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(search => search.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* Search History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Search History</h2>
            <p className="text-sm text-gray-500">Your recent job searches</p>
          </div>
          <button
            type="button"
            onClick={handleClearHistory}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear History
          </button>
        </div>

        {searchHistory.length > 0 ? (
          <div className="space-y-2">
            {searchHistory.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{search}</span>
                <button
                  type="button"
                  onClick={() => setSearchHistory(prev => prev.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No search history</p>
        )}
      </div>

      {/* Saved Searches */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900">Saved Searches</h2>
          <p className="text-sm text-gray-500">Get notified about new jobs matching your saved searches</p>
        </div>

        {savedSearches.length > 0 ? (
          <div className="space-y-4">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{search.query}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {Object.entries(search.filters).map(([key, value]) => (
                        <span
                          key={key}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Saved on {search.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSearch(search.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No saved searches</p>
        )}
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