import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface Application {
  id: string;
  candidateName: string;
  jobTitle: string;
  appliedDate: Date;
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'interview' | 'offer';
  resume: string;
  matchScore: number;
}

const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: '1',
    candidateName: 'John Doe',
    jobTitle: 'Senior Frontend Developer',
    appliedDate: new Date('2024-03-10'),
    status: 'new',
    resume: '#',
    matchScore: 85,
  },
  {
    id: '2',
    candidateName: 'Jane Smith',
    jobTitle: 'Product Designer',
    appliedDate: new Date('2024-03-09'),
    status: 'interview',
    resume: '#',
    matchScore: 92,
  },
];

export function ApplicationsTable() {
  const [applications] = useState<Application[]>(SAMPLE_APPLICATIONS);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'offer':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    // Handle status change
    console.log('Status changed:', applicationId, newStatus);
  };

  const handleMessage = (applicationId: string) => {
    // Handle messaging
    console.log('Message:', applicationId);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Match Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{application.candidateName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{application.jobTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {application.appliedDate.toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{application.matchScore}%</div>
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${application.matchScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)} capitalize`}>
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleStatusChange(application.id, 'shortlisted')}
                      className="text-green-600 hover:text-green-700"
                      title="Shortlist"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(application.id, 'rejected')}
                      className="text-red-600 hover:text-red-700"
                      title="Reject"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMessage(application.id)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Message"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <a
                      href={application.resume}
                      className="text-gray-600 hover:text-gray-700"
                      title="Download Resume"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => {/* View application details */}}
                      className="text-gray-600 hover:text-gray-700"
                      title="View Details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}