import React from 'react';

interface LinksFormProps {
  formData: {
    linkedin: string;
    github: string;
    portfolio: string;
  };
  onChange: (field: string, value: string) => void;
}

export function LinksForm({ formData, onChange }: LinksFormProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Links & Portfolio</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={e => onChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub Profile</label>
          <input
            type="url"
            value={formData.github}
            onChange={e => onChange('github', e.target.value)}
            placeholder="https://github.com/..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Portfolio Website</label>
          <input
            type="url"
            value={formData.portfolio}
            onChange={e => onChange('portfolio', e.target.value)}
            placeholder="https://..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}