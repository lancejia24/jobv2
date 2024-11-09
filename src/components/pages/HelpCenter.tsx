import React, { useState } from 'react';
import { Search, Book, MessageSquare, FileText, ChevronRight, User as UserIcon } from 'lucide-react';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  articles: HelpArticle[];
}

interface HelpArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  views: number;
  helpful: number;
}

const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: '1',
    title: 'Getting Started',
    description: 'Learn the basics of using our platform',
    articles: [
      {
        id: '1',
        title: 'Creating Your Account',
        excerpt: 'Step-by-step guide to setting up your profile',
        category: 'Getting Started',
        views: 1234,
        helpful: 156,
      },
      {
        id: '2',
        title: 'Finding the Right Job',
        excerpt: 'Tips for using our search and filter features',
        category: 'Getting Started',
        views: 987,
        helpful: 123,
      },
    ],
  },
  {
    id: '2',
    title: 'Applications & Interviews',
    description: 'Everything about the application process',
    articles: [
      {
        id: '3',
        title: 'Applying for Jobs',
        excerpt: 'How to submit strong applications',
        category: 'Applications',
        views: 2345,
        helpful: 234,
      },
      {
        id: '4',
        title: 'Interview Preparation',
        excerpt: 'Tips for successful interviews',
        category: 'Applications',
        views: 1789,
        helpful: 189,
      },
    ],
  },
];

export function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = HELP_CATEGORIES.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Documentation</h3>
                <p className="text-sm text-gray-500">Browse our detailed guides</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Community</h3>
                <p className="text-sm text-gray-500">Get help from other users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Support</h3>
                <p className="text-sm text-gray-500">Contact our support team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="space-y-4">
                  {category.articles.map((article) => (
                    <button
                      key={article.id}
                      className="w-full text-left hover:bg-gray-50 p-4 rounded-lg transition-colors"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{article.excerpt}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{article.views} views</span>
                        <span>•</span>
                        <span>{article.helpful} found this helpful</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}