import React, { useState } from 'react';
import { MapPin, Clock, Briefcase, DollarSign, CheckCircle, BookmarkPlus, BookmarkCheck, Award } from 'lucide-react';
import { type Job } from '../../types';
import { JobApplicationModal } from './JobApplicationModal';
import { AssessmentStatus } from './AssessmentStatus';
import { useAuth } from '../../context/AuthContext';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
  applicationStatus?: {
    status: 'pending' | 'reviewing' | 'assessment' | 'interview' | 'offer' | 'rejected';
    nextStep?: string;
    assessmentStatus?: {
      status: 'pending' | 'in_progress' | 'completed' | 'expired';
      score?: number;
      dueDate?: Date;
    };
  };
}

export function JobCard({ job, onApply, onSave, isSaved, applicationStatus }: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { user } = useAuth();

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'assessment':
        return 'bg-purple-100 text-purple-800';
      case 'interview':
        return 'bg-green-100 text-green-800';
      case 'offer':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApplyClick = () => {
    if (!user) {
      alert('Please log in as a job seeker to apply');
      return;
    }
    if (user.role !== 'jobSeeker') {
      alert('Only job seekers can apply for jobs');
      return;
    }
    setIsModalOpen(true);
  };

  const handleApplicationSubmit = (formData: any) => {
    console.log('Application submitted:', formData);
    setHasApplied(true);
    onApply(job.id);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                <p className="text-gray-600 mt-1">{job.company}</p>
              </div>
              {onSave && (
                <button
                  onClick={() => onSave(job.id)}
                  className="text-gray-400 hover:text-blue-600"
                  title={isSaved ? 'Remove from saved jobs' : 'Save job'}
                >
                  {isSaved ? (
                    <BookmarkCheck className="h-6 w-6" />
                  ) : (
                    <BookmarkPlus className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {job.type}
              </div>
              {job.salary && (
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                </div>
              )}
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Posted {formatDate(job.postedAt)}
              </div>
            </div>

            <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {req}
                </span>
              ))}
            </div>

            {applicationStatus && (
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(applicationStatus.status)} capitalize`}>
                      {applicationStatus.status}
                    </span>
                    {job.assessmentRequired && applicationStatus.assessmentStatus && (
                      <AssessmentStatus {...applicationStatus.assessmentStatus} />
                    )}
                  </div>
                  {applicationStatus.nextStep && (
                    <p className="text-sm text-gray-600">{applicationStatus.nextStep}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="ml-6 flex flex-col items-end space-y-4">
            {hasApplied || applicationStatus ? (
              <button
                disabled
                className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md cursor-default"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Applied
              </button>
            ) : (
              <button
                onClick={handleApplyClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>

      <JobApplicationModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplicationSubmit}
      />
    </>
  );
}