import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { type Job } from '../../types';
import { BasicInfoForm } from './forms/BasicInfoForm';
import { ResumeUploadForm } from './forms/ResumeUploadForm';
import { LinksForm } from './forms/LinksForm';
import { AdditionalInfoForm } from './forms/AdditionalInfoForm';
import { AssessmentRequirements } from './AssessmentRequirements';

interface JobApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export function JobApplicationModal({ job, isOpen, onClose, onSubmit }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    portfolio: '',
    linkedin: '',
    github: '',
    availability: '',
    salary: '',
    referral: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [assessmentAcknowledged, setAssessmentAcknowledged] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    if (job.assessmentRequired && !assessmentAcknowledged) {
      newErrors.assessment = 'You must acknowledge the assessment requirement';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        assessmentAcknowledged
      });
      onClose();
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleResumeChange = (file: File) => {
    setFormData(prev => ({ ...prev, resume: file }));
    if (errors.resume) {
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Apply for {job.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{job.company} • {job.location}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {job.assessmentRequired && (
              <AssessmentRequirements
                job={job}
                acknowledged={assessmentAcknowledged}
                onAcknowledge={setAssessmentAcknowledged}
                error={errors.assessment}
              />
            )}

            <BasicInfoForm
              formData={formData}
              errors={errors}
              onChange={handleFieldChange}
            />

            <ResumeUploadForm
              resume={formData.resume}
              error={errors.resume}
              onChange={handleResumeChange}
            />

            <LinksForm
              formData={formData}
              onChange={handleFieldChange}
            />

            <AdditionalInfoForm
              formData={formData}
              onChange={handleFieldChange}
            />
          </form>

          <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}