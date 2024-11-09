import React from 'react';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: Date;
  category: string;
  tags: string[];
  image?: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Stand Out in Today\'s Job Market',
    excerpt: 'Learn effective strategies to differentiate yourself from other candidates and land your dream job.',
    content: '...',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop'
    },
    date: new Date('2024-03-15'),
    category: 'Career Tips',
    tags: ['Job Search', 'Personal Branding', 'Career Development'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Essential Skills for Tech Careers in 2024',
    excerpt: "Stay ahead of the curve with our comprehensive guide to the most in-demand technical skills in today's job market.",
    content: '...',
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop'
    },
    date: new Date('2024-03-10'),
    category: 'Tech Trends',
    tags: ['Technology', 'Skills Development', 'Career Growth'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop'
  }
];

export function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Career Insights & Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice and industry insights to help you navigate your career journey
          </p>
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date.toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </span>
                  </div>
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Career Tips', 'Tech Trends', 'Interview Prep', 'Job Search'].map((category) => (
              <button
                key={category}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                <p className="text-sm text-gray-500 mt-1">12 articles</p>
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest career insights, industry trends, and expert advice.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}