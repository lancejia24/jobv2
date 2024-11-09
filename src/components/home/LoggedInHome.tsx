import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MessageSquare,
  Bell,
  TrendingUp,
  Calendar,
  ChevronRight,
  User,
  Briefcase,
  MapPin,
  BookOpen,
  Award,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TimelineEvent {
  id: string;
  type: 'job' | 'application' | 'network' | 'skill';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ReactNode;
}

const SAMPLE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    type: 'job',
    title: 'New Job Match',
    description: 'Frontend Developer position at TechCorp matches your profile',
    timestamp: new Date(),
    icon: <Briefcase className="h-5 w-5 text-blue-500" />
  },
  {
    id: '2',
    type: 'application',
    title: 'Application Update',
    description: 'Your application for Senior Frontend Developer was viewed',
    timestamp: new Date(Date.now() - 3600000),
    icon: <Clock className="h-5 w-5 text-green-500" />
  }
];

const FEATURED_JOBS = [
  {
    id: '1',
    title: 'Junior Frontend Developer',
    company: 'TechStart Inc.',
    location: 'Remote',
    experience: '0-2 years',
    posted: new Date(Date.now() - 86400000)
  },
  {
    id: '2',
    title: 'Graduate Software Engineer',
    company: 'InnovateCo',
    location: 'San Francisco, CA',
    experience: '0-1 year',
    posted: new Date(Date.now() - 172800000)
  }
];

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Resume Writing Workshop',
    date: new Date(Date.now() + 86400000),
    type: 'Workshop',
    attendees: 45
  },
  {
    id: '2',
    title: 'Tech Interview Prep Session',
    date: new Date(Date.now() + 172800000),
    type: 'Webinar',
    attendees: 120
  }
];

export function LoggedInHome() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'jobs' | 'network' | 'skills'>('all');

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-1 text-gray-600">Here's what's happening in your job search journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Timeline */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === 'all'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === 'jobs'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      Jobs
                    </button>
                    <button
                      onClick={() => setActiveTab('network')}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === 'network'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      Network
                    </button>
                    <button
                      onClick={() => setActiveTab('skills')}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === 'skills'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      Skills
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {SAMPLE_EVENTS.map((event, eventIdx) => (
                      <li key={event.id}>
                        <div className="relative pb-8">
                          {eventIdx !== SAMPLE_EVENTS.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>{event.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {event.timestamp.toLocaleTimeString()}
                                </p>
                                <p className="mt-0.5 text-sm font-medium text-gray-900">
                                  {event.title}
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">
                                {event.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Featured Jobs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Featured Jobs</h2>
                  <Link
                    to="/jobs"
                    className="text-sm text-blue-600 hover:text-blue-500 flex items-center"
                  >
                    View all
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {FEATURED_JOBS.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          {job.experience}
                        </div>
                      </div>
                      <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Apply
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Completion</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-blue-600">75%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/profile/setup"
                    className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Complete your bio
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/skills"
                    className="flex items-center justify-between p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Add skills
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
                <Link
                  to="/events"
                  className="text-sm text-blue-600 hover:text-blue-500 flex items-center"
                >
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {UPCOMING_EVENTS.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date.toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      {event.attendees} attending
                    </div>
                    <button className="mt-2 w-full inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}