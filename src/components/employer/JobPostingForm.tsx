import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  type: string;
  location: string;
  salary: {
    min: string;
    max: string;
    currency: string;
  };
  skills: string[];
  benefits: string[];
  assessmentRequired: boolean;
}

const initialFormData: JobFormData = {
  title: '',
  description: '',
  requirements: [''],
  type: 'full-time',
  location: '',
  salary: {
    min: '',
    max: '',
    currency: 'USD',
  },
  skills: [''],
  benefits: [''],
  assessmentRequired: false,
};

export function JobPostingForm() {
  const [formData, setFormData] = useState<JobFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posting data:', formData);
    // Handle job posting submission
  };

  const addField = (field: 'requirements' | 'skills' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeField = (field: 'requirements' | 'skills' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateField = (field: 'requirements' | 'skills' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.salary.currency}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  salary: { ...prev.salary, currency: e.target.value }
                }))}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Salary</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.salary.min}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  salary: { ...prev.salary, min: e.target.value }
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Maximum Salary</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.salary.max}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  salary: { ...prev.salary, max: e.target.value }
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Requirements</h2>
          <button
            type="button"
            onClick={() => addField('requirements')}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Requirement
          </button>
        </div>
        <div className="space-y-4">
          {formData.requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                required
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={req}
                onChange={e => updateField('requirements', index, e.target.value)}
              />
              {formData.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField('requirements', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Required Skills</h2>
          <button
            type="button"
            onClick={() => addField('skills')}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Skill
          </button>
        </div>
        <div className="space-y-4">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                required
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={skill}
                onChange={e => updateField('skills', index, e.target.value)}
              />
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField('skills', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Benefits</h2>
          <button
            type="button"
            onClick={() => addField('benefits')}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Benefit
          </button>
        </div>
        <div className="space-y-4">
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                required
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={benefit}
                onChange={e => updateField('benefits', index, e.target.value)}
              />
              {formData.benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField('benefits', index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Assessment */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Skill Assessment</h2>
            <p className="mt-1 text-sm text-gray-500">
              Require candidates to complete a skill assessment before applying
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={formData.assessmentRequired}
              onChange={e => setFormData(prev => ({
                ...prev,
                assessmentRequired: e.target.checked
              }))}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post Job
        </button>
      </div>
    </form>
  );
}