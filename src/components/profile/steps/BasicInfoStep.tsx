import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { ProfileFormData } from '../ProfileWizard';

interface BasicInfoStepProps {
  data: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const handleChange = (field: keyof ProfileFormData, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            required
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Professional Title *
          </label>
          <input
            type="text"
            required
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Senior Frontend Developer"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location *
          </label>
          <input
            type="text"
            required
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State, Country"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary *
          </label>
          <textarea
            required
            rows={4}
            value={data.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Brief overview of your professional background and career goals"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <p className="mt-2 text-sm text-gray-500">
            Write a brief professional summary that highlights your expertise and career goals.
          </p>
        </div>
      </div>
    </div>
  );
}