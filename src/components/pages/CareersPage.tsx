import React from 'react';
import { Briefcase, Users, Globe, Heart, MapPin, Clock } from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

const DEPARTMENTS = [
  {
    name: 'Engineering',
    description: 'Build the future of job search and recruitment',
    icon: Briefcase,
    openings: 4,
  },
  {
    name: 'Product',
    description: 'Shape the next generation of recruitment tools',
    icon: Users,
    openings: 2,
  },
  {
    name: 'Design',
    description: 'Create beautiful and intuitive experiences',
    icon: Heart,
    openings: 3,
  },
];

const JOB_OPENINGS: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
  },
  {
    id: '2',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: '3',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
  },
];

export function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build the future of recruitment and connect millions of people with their dream jobs.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Impact</h3>
              <p className="text-gray-600">
                Work on products that help millions of people find meaningful careers worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Amazing Team</h3>
              <p className="text-gray-600">
                Join a diverse team of talented individuals passionate about innovation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Great Benefits</h3>
              <p className="text-gray-600">
                Competitive salary, equity, health insurance, and flexible work arrangements.
              </p>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.name} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <dept.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {dept.openings} openings
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{dept.name}</h3>
                <p className="text-gray-600">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Open Positions</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {JOB_OPENINGS.map((job, index) => (
              <div
                key={job.id}
                className={`p-6 ${
                  index !== JOB_OPENINGS.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}