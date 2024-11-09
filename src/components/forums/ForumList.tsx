import React, { useState } from 'react';
import { MessageSquare, Users, TrendingUp, Briefcase, BookOpen, Award, ChevronRight, Calendar, Video, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type ForumCategory } from '../../types';

const SAMPLE_CATEGORIES: ForumCategory[] = [
  {
    id: '1',
    name: 'Career Advice',
    description: 'Get advice on career development, job searching, and professional growth',
    icon: 'trending-up',
    threadCount: 156,
    postCount: 892
  },
  {
    id: '2',
    name: 'Industry Discussions',
    description: 'Discuss trends, news, and developments in various industries',
    icon: 'briefcase',
    threadCount: 98,
    postCount: 445
  },
  {
    id: '3',
    name: 'Learning & Development',
    description: 'Share resources, courses, and learning experiences',
    icon: 'book-open',
    threadCount: 134,
    postCount: 678
  },
  {
    id: '4',
    name: 'Interview Preparation',
    description: 'Tips, mock interviews, and interview experiences',
    icon: 'award',
    threadCount: 245,
    postCount: 1203
  }
];

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Tech Career Fair 2024',
    date: new Date('2024-04-15'),
    type: 'Virtual Event',
    attendees: 234,
    description: 'Connect with top tech companies and explore career opportunities.'
  },
  {
    id: '2',
    title: 'Frontend Development Best Practices',
    date: new Date('2024-04-10'),
    type: 'Webinar',
    attendees: 156,
    description: 'Learn modern frontend development practices from industry experts.'
  }
];

const KNOWLEDGE_RESOURCES = [
  {
    id: '1',
    title: 'Complete Guide to System Design Interviews',
    author: 'Sarah Chen',
    downloads: 1234,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Frontend Developer Roadmap 2024',
    author: 'Michael Rodriguez',
    downloads: 892,
    rating: 4.9
  }
];

export function ForumList() {
  const [activeTab, setActiveTab] = useState<'forums' | 'events' | 'resources'>('forums');

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="mt-2 text-gray-600">Connect, learn, and grow with fellow professionals</p>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('forums')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'forums'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="h-5 w-5 inline-block mr-2" />
              Discussion Forums
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="h-5 w-5 inline-block mr-2" />
              Events & Webinars
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Share2 className="h-5 w-5 inline-block mr-2" />
              Knowledge Sharing
            </button>
          </nav>
        </div>

        {/* Forums Tab */}
        {activeTab === 'forums' && (
          <div className="space-y-6">
            {SAMPLE_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        {category.icon === 'trending-up' && <TrendingUp className="h-6 w-6 text-blue-600" />}
                        {category.icon === 'briefcase' && <Briefcase className="h-6 w-6 text-blue-600" />}
                        {category.icon === 'book-open' && <BookOpen className="h-6 w-6 text-blue-600" />}
                        {category.icon === 'award' && <Award className="h-6 w-6 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                        <p className="mt-1 text-gray-600">{category.description}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{category.threadCount} threads</span>
                          <span>•</span>
                          <span>{category.postCount} posts</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/forums/${category.id}`}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        {event.type === 'Webinar' ? (
                          <Video className="h-6 w-6 text-purple-600" />
                        ) : (
                          <Calendar className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <p className="mt-1 text-gray-600">{event.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{event.date.toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{event.type}</span>
                            <span>•</span>
                            <span>{event.attendees} attending</span>
                          </div>
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {KNOWLEDGE_RESOURCES.map((resource) => (
                <div key={resource.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Share2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">By {resource.author}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{resource.downloads} downloads</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <span className="text-yellow-400">★</span>
                              <span className="ml-1">{resource.rating}</span>
                            </div>
                          </div>
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Button */}
        <div className="mt-8 flex justify-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {activeTab === 'forums' && (
              <>
                <MessageSquare className="h-5 w-5 mr-2" />
                Start a New Discussion
              </>
            )}
            {activeTab === 'events' && (
              <>
                <Calendar className="h-5 w-5 mr-2" />
                Create Event
              </>
            )}
            {activeTab === 'resources' && (
              <>
                <Share2 className="h-5 w-5 mr-2" />
                Share Resource
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}