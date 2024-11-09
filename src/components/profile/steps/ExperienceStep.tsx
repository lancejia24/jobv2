import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ProfileFormData } from '../ProfileWizard';

interface ExperienceStepProps {
  data: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
}

export function ExperienceStep({ data, onUpdate }: ExperienceStepProps) {
  const addExperience = () => {
    onUpdate({
      experiences: [
        ...data.experiences,
        {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    onUpdate({
      experiences: data.experiences.filter((_, i) => i !== index),
    });
  };

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const updatedExperiences = data.experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onUpdate({ experiences: updatedExperiences });
  };

  return (
    <div className="space-y-6">
      {data.experiences.map((experience, index) => (
        <div key={index} className="border rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">
              Experience {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={experience.title}
                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company *
              </label>
              <input
                type="text"
                required
                value={experience.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => updateExperience(index, 'location', e.target.value)}
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
                value={experience.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="month"
                value={experience.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                disabled={experience.current}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={experience.current}
                  onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">I currently work here</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={experience.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </button>
    </div>
  );
}