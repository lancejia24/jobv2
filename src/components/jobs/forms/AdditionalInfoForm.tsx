import React from 'react';

interface AdditionalInfoFormProps {
  formData: {
    availability: string;
    referral: string;
    additionalInfo: string;
    coverLetter: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AdditionalInfoForm({ formData, onChange }: AdditionalInfoFormProps) {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cover Letter</h3>
        <textarea
          rows={4}
          value={formData.coverLetter}
          onChange={e => onChange('coverLetter', e.target.value)}
          placeholder="Why are you interested in this position?"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Earliest Start Date</label>
            <input
              type="text"
              value={formData.availability}
              onChange={e => onChange('availability', e.target.value)}
              placeholder="e.g., Immediately, 2 weeks notice, etc."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Referral</label>
            <input
              type="text"
              value={formData.referral}
              onChange={e => onChange('referral', e.target.value)}
              placeholder="How did you hear about this position?"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
            <textarea
              rows={3}
              value={formData.additionalInfo}
              onChange={e => onChange('additionalInfo', e.target.value)}
              placeholder="Any additional information you'd like to share?"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
}