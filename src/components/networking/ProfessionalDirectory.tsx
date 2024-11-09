import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, Users, MessageSquare, UserPlus, UserCheck } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar?: string;
  connections: number;
  isConnected: boolean;
  isPending: boolean;
}

const SAMPLE_PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop',
    connections: 482,
    isConnected: false,
    isPending: false,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Product Designer',
    company: 'Design Studio Inc',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop',
    connections: 325,
    isConnected: true,
    isPending: false,
  },
];

export function ProfessionalDirectory() {
  const [professionals] = useState<Professional[]>(SAMPLE_PROFESSIONALS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    industry: '',
    company: '',
  });

  const handleConnect = (professionalId: string) => {
    // Handle connection request
    console.log('Connect with:', professionalId);
  };

  const handleMessage = (professionalId: string) => {
    // Handle messaging
    console.log('Message:', professionalId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Professional Directory</h1>
          <p className="mt-2 text-gray-600">Connect with professionals in your industry</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by name, title, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              >
                <option value="">All Locations</option>
                <option value="sf">San Francisco</option>
                <option value="ny">New York</option>
                <option value="remote">Remote</option>
              </select>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.industry}
                onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
              >
                <option value="">All Industries</option>
                <option value="tech">Technology</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {professional.avatar ? (
                      <img
                        src={professional.avatar}
                        alt={professional.name}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">
                          {professional.name[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {professional.name}
                      </h3>
                      <p className="text-sm text-gray-600">{professional.title}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {professional.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {professional.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {professional.connections} connections
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  {professional.isConnected ? (
                    <button
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => handleMessage(professional.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </button>
                  ) : (
                    <button
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleConnect(professional.id)}
                    >
                      {professional.isPending ? (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Pending
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 flex justify-center">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}