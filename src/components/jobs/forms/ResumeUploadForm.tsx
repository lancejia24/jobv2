import React from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface ResumeUploadFormProps {
  resume: File | null;
  error?: string;
  onChange: (file: File) => void;
}

export function ResumeUploadForm({ resume, error, onChange }: ResumeUploadFormProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Resume *</h3>
      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <div className="flex flex-col items-center">
            {resume ? (
              <>
                <FileText className="h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">{resume.name}</p>
              </>
            ) : (
              <>
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
                      onChange={handleFileChange}
                    />
                  </label>
                  {' '}or drag and drop
                </p>
              </>
            )}
            <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}