import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Briefcase, Award, FileText } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  graduationYear: string;
  field: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface ProfileFormData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  professionalTitle: string;
  summary: string;
  // Work Experience
  experiences: Experience[];
  // Education
  education: Education[];
  // Skills & Certifications
  skills: string[];
  certifications: Certification[];
  // Resume
  resume: File | null;
  additionalDocs: File[];
}

const initialFormData: ProfileFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  professionalTitle: '',
  summary: '',
  experiences: [{
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }],
  education: [{
    degree: '',
    institution: '',
    graduationYear: '',
    field: ''
  }],
  skills: [],
  certifications: [],
  resume: null,
  additionalDocs: []
};

const STEPS: Step[] = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: "Let's start with your basic details",
    icon: User,
  },
  {
    id: 'experience',
    title: 'Work Experience',
    description: 'Tell us about your professional journey',
    icon: Briefcase,
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Share your educational background',
    icon: GraduationCap,
  },
  {
    id: 'skills',
    title: 'Skills & Certifications',
    description: 'Highlight your expertise',
    icon: Award,
  },
  {
    id: 'resume',
    title: 'Resume Upload',
    description: 'Upload your resume and additional documents',
    icon: FileText,
  },
];

export function ProfileWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleStepClick = (index: number) => {
    if (index < currentStep || completedSteps.includes(STEPS[index].id)) {
      setCurrentStep(index);
    }
  };

  const handleNext = () => {
    const currentStepId = STEPS[currentStep].id;
    if (!completedSteps.includes(currentStepId)) {
      setCompletedSteps([...completedSteps, currentStepId]);
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    // Save profile data
    console.log('Profile data:', formData);
    navigate('/dashboard/jobseeker');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.professionalTitle}
                  onChange={e => setFormData(prev => ({ ...prev, professionalTitle: e.target.value }))}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State, Country"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.summary}
                  onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief overview of your professional background and career goals"
                />
              </div>
            </div>
          </div>
        );
      // Add other step content here
      default:
        return <div>Step content not implemented yet</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Steps */}
        <nav className="flex justify-between items-center mb-8" aria-label="Progress">
          <ol className="flex w-full">
            {STEPS.map((step, index) => (
              <li 
                key={step.id} 
                className={`flex-1 ${index !== STEPS.length - 1 ? 'pr-8' : ''}`}
              >
                <button
                  onClick={() => handleStepClick(index)}
                  className={`group w-full ${
                    index <= currentStep || completedSteps.includes(step.id)
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed'
                  }`}
                  disabled={index > currentStep && !completedSteps.includes(step.id)}
                >
                  <span className="flex items-center">
                    <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${
                      index === currentStep
                        ? 'bg-blue-600 text-white'
                        : index < currentStep || completedSteps.includes(step.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </span>
                    <span className={`ml-4 text-sm font-medium ${
                      index === currentStep
                        ? 'text-blue-600'
                        : index < currentStep || completedSteps.includes(step.id)
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Step Content */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {STEPS[currentStep].title}
          </h2>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              px-4 py-2 rounded-md transition-colors
              ${currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            Previous
          </button>
          
          {currentStep === STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Complete Profile
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}