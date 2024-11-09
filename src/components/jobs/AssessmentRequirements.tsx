import React from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { type Job } from '../../types';

interface AssessmentRequirementsProps {
  job: Job;
  acknowledged: boolean;
  onAcknowledge: (value: boolean) => void;
  error?: string;
}

export function AssessmentRequirements({ job, acknowledged, onAcknowledge, error }: AssessmentRequirementsProps) {
  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">Assessment Required</h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>This position requires completing a skills assessment as part of the application process.</p>
            
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Estimated time: 45-60 minutes
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Must be completed within 7 days of applying
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => onAcknowledge(e.target.checked)}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="ml-2 text-sm text-blue-700">
                I understand that I need to complete the assessment to be considered for this position
              </span>
            </label>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}