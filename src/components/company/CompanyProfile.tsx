import React, { useState } from 'react';
import { Globe, MapPin, Users, Building, Calendar, ArrowUpRight, Briefcase, Edit } from 'lucide-react';
import { type Company, type Job } from '../../types';
import { JobCard } from '../jobs/JobCard';
import { EditCompanyModal } from './EditCompanyModal';
import { useAuth } from '../../context/AuthContext';

interface CompanyProfileProps {
  company: Company;
  jobs: Job[];
  onApply: (jobId: string) => void;
  onUpdateCompany?: (updatedCompany: Company) => void;
}

export function CompanyProfile({ company, jobs, onApply, onUpdateCompany }: CompanyProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useAuth();

  // Changed this condition to check only the role
  const isOwner = user?.role === 'employer';

  const handleSaveCompany = (updatedCompany: Company) => {
    onUpdateCompany?.(updatedCompany);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Cover Image & Logo */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-800">
        {company.coverImage && (
          <img
            src={company.coverImage}
            alt={`${company.name} cover`}
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <div className="bg-white rounded-lg p-2 shadow-lg">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-28 h-28 object-contain"
              />
            ) : (
              <Building className="w-28 h-28 text-gray-400" />
            )}
          </div>
          <div className="mb-4 flex items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{company.name}</h1>
              <p className="text-blue-100">{company.industry}</p>
            </div>
            {isOwner && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="mb-1 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {company.name}</h2>
              <p className="text-gray-600 whitespace-pre-line">{company.description}</p>
            </section>

            {/* Company Culture */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Culture</h2>
              <div className="grid gap-8">
                {company.culture.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full md:w-64 h-48 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Open Positions */}
            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Open Positions</h2>
                {isOwner && (
                  <button
                    onClick={() => {/* TODO: Add new job */}}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post New Job
                  </button>
                )}
              </div>
              {jobs.length === 0 ? (
                <p className="text-gray-500 bg-white rounded-lg shadow-sm p-6">
                  No open positions at the moment.
                </p>
              ) : (
                jobs.map(job => (
                  <JobCard key={job.id} job={job} onApply={onApply} />
                ))
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-gray-400" />
                  <span>{company.size} employees</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <span>Founded in {company.founded}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="h-5 w-5 mr-3 text-gray-400" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    Visit website
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
              <div className="grid grid-cols-1 gap-3">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            {company.socialMedia && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
                <div className="space-y-3">
                  {company.socialMedia.linkedin && (
                    <a
                      href={company.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {company.socialMedia.twitter && (
                    <a
                      href={company.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-400"
                    >
                      <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOwner && (
        <EditCompanyModal
          company={company}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveCompany}
        />
      )}
    </div>
  );
}