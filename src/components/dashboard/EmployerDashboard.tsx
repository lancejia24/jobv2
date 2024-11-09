import React, { useState } from 'react';
import { BarChart, Users, Calendar, Briefcase, Plus, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { JobPostingForm } from '../employer/JobPostingForm';
import { ApplicationsTable } from '../employer/ApplicationsTable';
import { InterviewScheduler } from '../employer/InterviewScheduler';
import { AnalyticsDashboard } from '../employer/AnalyticsDashboard';

export function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'interviews' | 'analytics'>('overview');
  const [showJobPostingForm, setShowJobPostingForm] = useState(false);

  const stats = {
    activeJobs: 5,
    totalApplications: 124,
    scheduledInterviews: 8,
    averageTimeToHire: 18, // days
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <JobPostingForm />;
      case 'applications':
        return <ApplicationsTable />;
      case 'interviews':
        return <InterviewScheduler />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-900">New application for Senior Frontend Developer</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-900">Interview scheduled with John Doe</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-900">Candidate declined offer for Product Designer</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowJobPostingForm(true)}
                  className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                >
                  <Plus className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Post New Job</h3>
                  <p className="text-sm text-gray-500">Create a new job listing</p>
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                >
                  <Users className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Review Applications</h3>
                  <p className="text-sm text-gray-500">5 new applications</p>
                </button>
                <button
                  onClick={() => setActiveTab('interviews')}
                  className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                >
                  <Calendar className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Schedule Interviews</h3>
                  <p className="text-sm text-gray-500">3 pending schedules</p>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="mt-1 text-gray-600">Manage your job postings and candidates</p>
          </div>
          <button
            onClick={() => setShowJobPostingForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeJobs}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Scheduled Interviews</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.scheduledInterviews}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Time to Hire</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.averageTimeToHire}d</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="h-5 w-5 inline-block mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase className="h-5 w-5 inline-block mr-2" />
              Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="h-5 w-5 inline-block mr-2" />
              Applications
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'interviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="h-5 w-5 inline-block mr-2" />
              Interviews
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart className="h-5 w-5 inline-block mr-2" />
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}