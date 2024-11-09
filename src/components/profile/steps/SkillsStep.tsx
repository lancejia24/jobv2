import React, { useState } from 'react';
import { Plus, X, Award } from 'lucide-react';
import type { ProfileFormData } from '../ProfileWizard';

interface SkillsStepProps {
  data: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
}

const SUGGESTED_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'SQL',
  'Git',
  'AWS',
  'Docker',
];

export function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      onUpdate({ skills: [...data.skills, skill] });
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    onUpdate({
      skills: data.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const addCertification = () => {
    onUpdate({
      certifications: [
        ...data.certifications,
        {
          name: '',
          issuer: '',
          date: '',
          expiryDate: '',
          credentialId: '',
          url: '',
        },
      ],
    });
  };

  const removeCertification = (index: number) => {
    onUpdate({
      certifications: data.certifications.filter((_, i) => i !== index),
    });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = data.certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    onUpdate({ certifications: updatedCertifications });
  };

  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
        
        {/* Skills Input */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(newSkill);
                }
              }}
              placeholder="Add a skill"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => addSkill(newSkill)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </button>
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>

          {/* <boltAction type="file" filePath="src/components/profile/steps/SkillsStep.tsx">          {/* Suggested Skills */}
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Skills</h4>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_SKILLS.filter(skill => !data.skills.includes(skill)).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
          >
            <Award className="h-4 w-4 mr-2" />
            Add Certification
          </button>
        </div>

        <div className="space-y-6">
          {data.certifications.map((certification, index) => (
            <div key={index} className="border rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-900">
                  Certification {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={certification.name}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={certification.issuer}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Issue Date *
                  </label>
                  <input
                    type="month"
                    required
                    value={certification.date}
                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="month"
                    value={certification.expiryDate}
                    onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={certification.credentialId}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Credential URL
                  </label>
                  <input
                    type="url"
                    value={certification.url}
                    onChange={(e) => updateCertification(index, 'url', e.target.value)}
                    placeholder="https://"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}