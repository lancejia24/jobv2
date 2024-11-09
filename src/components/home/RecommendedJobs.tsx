import React from 'react';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Job } from '../../types';

const SAMPLE_JOBS: Job[] = [
  {
    id: '1',
    title: 'Junior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Great opportunity for a recent graduate to join our frontend team.',
    requirements: ['React', 'JavaScript', 'HTML/CSS'],
    salary: {
      min: 70000,
      max: 90000,
      currency: 'USD',
    },
    postedAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Associate Product Manager',
    company: 'StartupCo',
    location: 'Remote',
    type: 'Full-time',
    description: 'Looking for an enthusiastic APM to join our growing product team.',
    requirements: ['Product Management', 'Agile', 'Analytics'],
    salary: {
      min: 65000,
      max: 85000,
      currency: 'USD',
    },
    postedAt: new Date('2024-03-14'),
  },
];

export function RecommendedJobs() {
  return (
    <div className="space-y-4">
      {SAMPLE_JOBS.map((job) => (
        <Link
          key={job.id}
          to={`/jobs/${job.id}`}
          className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{job.company}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.type}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(job.postedAt).toLocaleDateString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}