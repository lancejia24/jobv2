import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Clock, TrendingUp, Star, Users, MessageSquare, CheckCircle } from 'lucide-react';

const EXPERIENCE_LEVELS = [
  { label: '0-3 months', count: 156 },
  { label: '3-6 months', count: 243 },
  { label: '6-12 months', count: 312 },
  { label: '1-2 years', count: 428 },
];

const SUCCESS_STORIES = [
  {
    name: 'Sarah Chen',
    role: 'Junior Frontend Developer',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    story: 'Found my first tech role within 2 months of graduation!',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Associate Product Manager',
    company: 'StartupCo',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    story: 'The mentorship program helped me transition into product management.',
    rating: 5,
  },
];

const FEATURED_COMPANIES = [
  {
    name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=120&h=60&fit=crop',
    openings: 12,
    rating: 4.8,
    responseTime: '2 days',
  },
  {
    name: 'StartupCo',
    logo: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=120&h=60&fit=crop',
    openings: 8,
    rating: 4.6,
    responseTime: '1 day',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Launch Your Career Journey
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              The #1 job platform for recent graduates, certification holders, and early-career professionals with 0-2 years of experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Find Your First Role
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700"
              >
                <Users className="h-5 w-5 mr-2" />
                For Employers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Level Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Jobs for Every Experience Level
          </h2>
          <p className="text-xl text-gray-600">
            Find opportunities that match your experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {EXPERIENCE_LEVELS.map((level) => (
            <div key={level.label} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{level.label}</h3>
              <p className="text-2xl font-bold text-blue-600">{level.count}</p>
              <p className="text-sm text-gray-500">Active Jobs</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Companies */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top-Rated Companies for Early Careers
            </h2>
            <p className="text-xl text-gray-600">
              Companies committed to developing early-career talent
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_COMPANIES.map((company) => (
              <div key={company.name} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-12 object-contain"
                  />
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-900 font-medium">{company.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{company.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{company.openings} open positions</span>
                  <span>Avg. response time: {company.responseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Hear from professionals who started their careers here
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div key={story.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-500">{story.role} at {story.company}</p>
                    </div>
                    <div className="flex">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{story.story}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More Than Just Job Listings
            </h2>
            <p className="text-xl text-gray-600">
              Tools and resources to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community Support
              </h3>
              <p className="text-gray-600">
                Connect with peers, share experiences, and get advice from industry professionals.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Skill Development
              </h3>
              <p className="text-gray-600">
                Access learning resources, workshops, and certification paths.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 inline-block mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Career Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your progress and celebrate career milestones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of early-career professionals finding their path to success.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}