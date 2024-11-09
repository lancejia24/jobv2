import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, Filter, MoreVertical } from 'lucide-react';
import { Job } from '../../types';
import { SAMPLE_JOBS } from '../../data/sampleData';

type JobStatus = 'pending' | 'approved' | 'rejected';

interface JobWithStatus extends Job {
  status: JobStatus;
  flags?: string[];
  moderationNotes?: string;
}

export function AdminDashboard() {
  const [jobs, setJobs] = useState<JobWithStatus[]>(
    SAMPLE_JOBS.map(job => ({ ...job, status: 'pending' }))
  );
  const [selectedJob, setSelectedJob] = useState<JobWithStatus | null>(null);
  const [filter, setFilter] = useState<JobStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (jobId: string) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId ? { ...job, status: 'approved' as JobStatus } : job
      )
    );
  };

  const handleReject = (jobId: string, reason: string) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId
          ? { ...job, status: 'rejected' as JobStatus, moderationNotes: reason }
          : job
      )
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-blue-600" />
            Job Moderation Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Review and moderate job listings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-10 w-10 text-yellow-500" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {jobs.filter(j => j.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-500">Pending Review</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {jobs.filter(j => j.status === 'approved').length}
                </p>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <XCircle className="h-10 w-10 text-red-500" />
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">
                  {jobs.filter(j => j.status === 'rejected').length}
                </p>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value as JobStatus | 'all')}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)} capitalize`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>{job.location} • {job.type}</p>
                      <p className="mt-2">{job.description}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 flex items-center space-x-4">
                    {job.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(job.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt('Enter rejection reason:');
                            if (reason) handleReject(job.id, reason);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </>
                    )}
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {job.moderationNotes && (
                  <div className="mt-3 text-sm text-red-600">
                    Rejection reason: {job.moderationNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}