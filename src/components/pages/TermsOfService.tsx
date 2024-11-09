import React from 'react';
import { Scale, Shield, AlertTriangle, FileText, Users, Globe, Mail } from 'lucide-react';

interface TermsSection {
  id: string;
  title: string;
  content: string;
  icon: React.FC<{ className?: string }>;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: `By accessing or using JobHub's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.`,
    icon: Scale
  },
  {
    id: 'account',
    title: 'Account Terms',
    content: `You are responsible for:
    • Maintaining the security of your account
    • All activities that occur under your account
    • Providing accurate and complete information
    • Updating your information to keep it current
    • Protecting your password and access credentials`,
    icon: Shield
  },
  {
    id: 'conduct',
    title: 'User Conduct',
    content: `Users must not:
    • Post false or misleading information
    • Impersonate others or misrepresent credentials
    • Engage in any unlawful or fraudulent activities
    • Harass, abuse, or harm other users
    • Attempt to gain unauthorized access to the platform
    • Use the service for spam or commercial solicitation`,
    icon: Users
  },
  {
    id: 'content',
    title: 'Content Guidelines',
    content: `All content posted must:
    • Be accurate and truthful
    • Respect intellectual property rights
    • Not contain malicious code or viruses
    • Not violate any applicable laws
    • Not include discriminatory or offensive material`,
    icon: FileText
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: `JobHub shall not be liable for:
    • Any indirect, incidental, or consequential damages
    • Loss of profits or data
    • Service interruptions or errors
    • Third-party actions or content
    • Issues arising from user interactions or transactions`,
    icon: AlertTriangle
  },
  {
    id: 'intellectual',
    title: 'Intellectual Property',
    content: `All content, features, and functionality of our platform are owned by JobHub and protected by international copyright, trademark, and other intellectual property laws.`,
    icon: Globe
  }
];

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Scale className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: March 15, 2024
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TERMS_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50"
              >
                <section.icon className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">{section.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {TERMS_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white rounded-lg shadow-sm p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <section.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about our terms of service or need clarification,
              please contact our legal team.
            </p>
            <div className="inline-flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <a
                href="mailto:legal@jobhub.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                legal@jobhub.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            These terms of service constitute a legally binding agreement between you and JobHub.
            By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </div>
      </div>
    </div>
  );
}