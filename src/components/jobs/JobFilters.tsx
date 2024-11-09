import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    search: string;
    type: string[];
    location: string;
    salaryMin: string;
    salaryMax: string;
    experience: string[];
    skills: string[];
    remote: boolean;
    postedWithin: string;
  };
  onChange: (name: string, value: any) => void;
}

export function JobFilters({ filters, onChange }: JobFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const jobTypes = ['full-time', 'part-time', 'contract', 'remote'];
  const experienceLevels = ['entry', 'mid-level', 'senior', 'lead'];
  const commonSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL'];
  const timeFrames = ['24h', '3d', '7d', '14d', '30d'];

  const clearFilters = () => {
    onChange('search', '');
    onChange('type', []);
    onChange('location', '');
    onChange('salaryMin', '');
    onChange('salaryMax', '');
    onChange('experience', []);
    onChange('skills', []);
    onChange('remote', false);
    onChange('postedWithin', '');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Header with toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-lg font-semibold text-gray-900 mb-4"
      >
        <div className="flex items-center">
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Advanced Filters
        </div>
        <div className="flex items-center">
          {filters.type.length > 0 || filters.skills.length > 0 || filters.experience.length > 0 ? (
            <span className="mr-2 text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {filters.type.length + filters.skills.length + filters.experience.length} active
            </span>
          ) : null}
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>

      {/* Search - Always visible */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search job titles, companies, or keywords..."
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
        />
      </div>

      {/* Collapsible filters */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Clear filters button */}
          <div className="flex justify-end">
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <div className="grid grid-cols-2 gap-2">
              {jobTypes.map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={filters.type.includes(type)}
                    onChange={(e) => {
                      const newTypes = e.target.checked
                        ? [...filters.type, type]
                        : filters.type.filter(t => t !== type);
                      onChange('type', newTypes);
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-600 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="space-y-2">
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="City, state, or country"
                value={filters.location}
                onChange={(e) => onChange('location', e.target.value)}
              />
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.remote}
                  onChange={(e) => onChange('remote', e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Remote positions only</span>
              </label>
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Min salary"
                value={filters.salaryMin}
                onChange={(e) => onChange('salaryMin', e.target.value)}
              />
              <input
                type="number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Max salary"
                value={filters.salaryMax}
                onChange={(e) => onChange('salaryMax', e.target.value)}
              />
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <div className="grid grid-cols-2 gap-2">
              {experienceLevels.map((level) => (
                <label key={level} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={filters.experience.includes(level)}
                    onChange={(e) => {
                      const newLevels = e.target.checked
                        ? [...filters.experience, level]
                        : filters.experience.filter(l => l !== level);
                      onChange('experience', newLevels);
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-600 capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {filters.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                    <button
                      onClick={() => onChange('skills', filters.skills.filter(s => s !== skill))}
                      className="ml-1.5 text-blue-600 hover:text-blue-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value=""
                onChange={(e) => {
                  if (e.target.value && !filters.skills.includes(e.target.value)) {
                    onChange('skills', [...filters.skills, e.target.value]);
                  }
                  e.target.value = '';
                }}
              >
                <option value="">Add a skill...</option>
                {commonSkills.filter(skill => !filters.skills.includes(skill)).map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Posted Within */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Posted Within</label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filters.postedWithin}
              onChange={(e) => onChange('postedWithin', e.target.value)}
            >
              <option value="">Any time</option>
              {timeFrames.map(time => (
                <option key={time} value={time}>Last {time}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}