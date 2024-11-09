import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import type { ProfileFormData } from '../ProfileWizard';

interface ResumeStepProps {
  data: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
}

export function ResumeStep({ data, onUpdate }: ResumeStepProps) {
  const handleResumeDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      onUpdate({ resume: file });
    }
  }, [onUpdate]);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdate({ resume: file });
    }
  };

  const handleAdditionalDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onUpdate({ additionalDocs: [...data.additionalDocs, ...files] });
  };

  const removeAdditionalDoc = (index: number) => {
    onUpdate({
      additionalDocs: data.additionalDocs.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      {/* Resume Upload */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Resume</h3>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleResumeDrop}
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md"
        >
          <div className="space-y-1 text-center">
            {data.resume ? (
              <div className="flex flex-col items-center">
                <FileText className="h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">{data.resume.name}</p>
                <button
                  type="button"
                  onClick={() => onUpdate({ resume: null })}
                  className="mt-2 text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  <label
                    htmlFor="resume-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="resume-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                    />
                  </label>
                  {' '}or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF or Word up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Documents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Additional Documents</h3>
            <p className="text-sm text-gray-500">
              Upload additional documents like certificates, portfolios, or references
            </p>
          </div>
          <label
            htmlFor="additional-docs-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
            <input
              id="additional-docs-upload"
              type="file"
              className="sr-only"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleAdditionalDocChange}
            />
          </label>
        </div>

        {data.additionalDocs.length > 0 && (
          <div className="space-y-2">
            {data.additionalDocs.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{doc.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeAdditionalDoc(index)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}