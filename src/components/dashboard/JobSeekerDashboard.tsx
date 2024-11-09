import React, { useState } from 'react';
import { Briefcase, BookmarkCheck, Clock, User, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../jobs/JobCard';

export function JobSeekerDashboard() {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'saved' | 'profile'>('overview');

  const stats = {
    applications: 2,
    saved: 5,
    viewed: 15,
    interviews: 1,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <nav className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === 'overview' ? 'text-blue-600 bg-blue-50' : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === 'applications' ? 'text-blue-600 bg-blue-50' : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Briefcase className="h-5 w-5 mr-3" />
                Applications
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === 'saved' ? 'text-blue-600 bg-blue-50' : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <BookmarkCheck className="h-5 w-5 mr-3" />
                Saved Jobs
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Applications</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.applications}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <BookmarkCheck className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Saved Jobs</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.saved}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Profile Views</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.viewed}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Interviews</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.interviews}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {jobs.slice(0, 3).map(job => (
                      <div key={job.id} className="p-6">
                        <JobCard
                          job={job}
                          onApply={() => {}}
                          applicationStatus={{
                            status: 'pending',
                            nextStep: 'Application under review'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">All Applications</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {jobs.map(job => (
                      <div key={job.id} className="p-6">
                        <JobCard
                          job={job}
                          onApply={() => {}}
                          applicationStatus={{
                            status: 'pending',
                            nextStep: 'Application under review'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Saved Jobs</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {jobs.slice(0, 2).map(job => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onApply={() => {}}
                          isSaved={true}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-xl font-medium text-gray-900">{user?.name}</h3>
                        <p className="text-gray-500">Frontend Developer</p>
                        <p className="text-gray-500">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Resume</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-6 w-6 text-gray-400" />
                        <span className="ml-2 text-gray-900">resume.pdf</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">Update</button>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}