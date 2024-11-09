import React from 'react';
import { Newspaper, Download, Mail, Phone, Globe, FileText } from 'lucide-react';

interface PressRelease {
  id: string;
  title: string;
  date: Date;
  excerpt: string;
  category: string;
}

interface MediaCoverage {
  id: string;
  title: string;
  publisher: string;
  date: Date;
  logo: string;
  link: string;
}

const PRESS_RELEASES: PressRelease[] = [
  {
    id: '1',
    title: 'JobHub Launches AI-Powered Job Matching Technology',
    date: new Date('2024-03-01'),
    excerpt: 'Revolutionary new feature uses artificial intelligence to match job seekers with their ideal positions.',
    category: 'Product Launch'
  },
  {
    id: '2',
    title: 'JobHub Reaches 1 Million Active Users Milestone',
    date: new Date('2024-02-15'),
    excerpt: 'Platform celebrates significant growth and impact in the job market.',
    category: 'Company News'
  },
  {
    id: '3',
    title: 'JobHub Expands Operations to Asia Pacific Region',
    date: new Date('2024-01-20'),
    excerpt: 'Strategic expansion brings innovative recruitment solutions to new markets.',
    category: 'Expansion'
  }
];

const MEDIA_COVERAGE: MediaCoverage[] = [
  {
    id: '1',
    title: 'How JobHub is Revolutionizing Online Recruitment',
    publisher: 'TechCrunch',
    date: new Date('2024-03-05'),
    logo: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=120&h=60&fit=crop',
    link: '#'
  },
  {
    id: '2',
    title: 'JobHub Named Top HR Tech Startup of 2024',
    publisher: 'Forbes',
    date: new Date('2024-02-20'),
    logo: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=120&h=60&fit=crop',
    link: '#'
  }
];

export function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Press & Media
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the latest news and updates about JobHub's mission to transform the future of work
          </p>
        </div>

        {/* Press Contact */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Press Contact</h2>
              <p className="text-gray-600 mb-6">
                For press inquiries, please contact our media relations team:
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <a href="mailto:press@jobhub.com" className="text-blue-600 hover:text-blue-700">
                    press@jobhub.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand Assets</h2>
              <p className="text-gray-600 mb-6">
                Download our brand assets including logos, screenshots, and guidelines:
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Download Press Kit
              </button>
            </div>
          </div>
        </div>

        {/* Latest Press Releases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Press Releases</h2>
          <div className="space-y-6">
            {PRESS_RELEASES.map((release) => (
              <div key={release.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {release.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {release.date.toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {release.title}
                    </h3>
                    <p className="text-gray-600">{release.excerpt}</p>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <FileText className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Media Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MEDIA_COVERAGE.map((coverage) => (
              <a
                key={coverage.id}
                href={coverage.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <img
                    src={coverage.logo}
                    alt={coverage.publisher}
                    className="h-8 object-contain"
                  />
                  <span className="text-sm text-gray-500">
                    {coverage.date.toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {coverage.title}
                </h3>
                <div className="flex items-center text-blue-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">Read on {coverage.publisher}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}