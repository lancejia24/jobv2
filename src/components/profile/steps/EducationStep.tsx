import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ProfileFormData } from '../ProfileWizard';

interface EducationStepProps {
  data: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
}

export function EducationStep({ data, onUpdate }: EducationStepProps) {
  const addEducation = () => {
    onUpdate({
      education: [
        ...data.education,
        {
          degree: '',
          field: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    onUpdate({
      education: data.education.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (index: number, field: string, value: string | boolean) => {
    const updatedEducation = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onUpdate({ education: updatedEducation });
  };

  return (
    <div className="space-y-6">
      {data.education.map((education, index) => (
        <div key={index} className="border rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">
              Education {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree *
              </label>
              <input
                type="text"
                required
                value={education.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field of Study *
              </label>
              <input
                type="text"
                required
                value={education.field}
                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                placeholder="e.g., Computer Science"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Institution *
              </label>
              <input
                type="text"
                required
                value={education.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={education.location}
                onChange={(e) => updateEducation(index, 'location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date *
              </label>
              <input
                type="month"
                required
                value={education.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="month"
                value={education.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                disabled={education.current}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={education.current}
                  onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">I'm currently studying here</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                value={education.description}
                onChange={(e) => updateEducation(index, 'description', e.target.value)}
                placeholder="Notable achievements, activities, or relevant coursework"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </button>
    </div>
  );
}