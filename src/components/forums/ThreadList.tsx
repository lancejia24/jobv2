import React from 'react';
import { MessageSquare, Pin, Lock, Eye, Clock, Tag } from 'lucide-react';
import { type ForumThread } from '../../types';

const SAMPLE_THREADS: ForumThread[] = [
  {
    id: '1',
    categoryId: '1',
    title: 'Tips for negotiating your first tech job offer',
    content: 'I recently received my first job offer in tech...',
    authorId: '1',
    authorName: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    views: 342,
    replies: 15,
    isPinned: true,
    tags: ['Career', 'Negotiation', 'Tech']
  },
  {
    id: '2',
    categoryId: '1',
    title: 'How to transition from traditional IT to cloud computing?',
    content: "I have been working in traditional IT infrastructure...",
    authorId: '2',
    authorName: 'Michael Rodriguez',
    createdAt: new Date('2024-03-11'),
    updatedAt: new Date('2024-03-12'),
    views: 156,
    replies: 8,
    tags: ['Cloud', 'Career Change', 'IT']
  }
];

interface ThreadListProps {
  categoryId: string;
  categoryName: string;
}

export function ThreadList({ categoryId, categoryName }: ThreadListProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <MessageSquare className="h-4 w-4 mr-2" />
                New Thread
              </button>
              <select className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>Most Recent</option>
                <option>Most Viewed</option>
                <option>Most Replies</option>
              </select>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search threads..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Eye className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Threads */}
        <div className="space-y-4">
          {SAMPLE_THREADS.map((thread) => (
            <div
              key={thread.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {thread.authorAvatar ? (
                      <img
                        src={thread.authorAvatar}
                        alt={thread.authorName}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">
                          {thread.authorName[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      {thread.isPinned && (
                        <Pin className="h-4 w-4 text-blue-600" />
                      )}
                      {thread.isLocked && (
                        <Lock className="h-4 w-4 text-red-600" />
                      )}
                      <h2 className="text-lg font-medium text-gray-900 truncate">
                        {thread.title}
                      </h2>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{thread.authorName}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(thread.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {thread.views} views
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {thread.replies} replies
                      </span>
                    </div>
                    {thread.tags && (
                      <div className="mt-2 flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <div className="flex flex-wrap gap-2">
                          {thread.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">97</span> threads
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}