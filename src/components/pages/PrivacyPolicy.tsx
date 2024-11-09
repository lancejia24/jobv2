import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, Globe, AlertTriangle } from 'lucide-react';

interface PolicySection {
  id: string;
  title: string;
  content: string;
  icon: React.FC<{ className?: string }>;
}

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'collection',
    title: 'Information We Collect',
    content: `We collect information that you provide directly to us, including:
    • Personal information (name, email, phone number)
    • Professional information (work history, education, skills)
    • Account credentials
    • Communication preferences
    • Application history and interactions with our platform`,
    icon: Database
  },
  {
    id: 'usage',
    title: 'How We Use Your Information',
    content: `Your information is used to:
    • Provide and improve our services
    • Match you with relevant job opportunities
    • Communicate with you about your account
    • Analyze platform usage and trends
    • Ensure platform security and prevent fraud`,
    icon: Eye
  },
  {
    id: 'sharing',
    title: 'Information Sharing',
    content: `We may share your information with:
    • Employers (for job applications)
    • Service providers and partners
    • Legal authorities (when required by law)
    • Other users (based on your privacy settings)`,
    icon: Globe
  },
  {
    id: 'security',
    title: 'Data Security',
    content: `We implement industry-standard security measures to protect your data:
    • Encryption of sensitive information
    • Regular security audits
    • Access controls and monitoring
    • Secure data storage and transmission`,
    icon: Lock
  },
  {
    id: 'rights',
    title: 'Your Rights',
    content: `You have the right to:
    • Access your personal information
    • Request corrections or updates
    • Delete your account and data
    • Opt-out of communications
    • Control your privacy settings`,
    icon: UserCheck
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content: `We use cookies and similar technologies to:
    • Remember your preferences
    • Analyze site traffic and usage
    • Personalize your experience
    • Improve our services
    You can control cookie settings in your browser.`,
    icon: AlertTriangle
  }
];

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: March 15, 2024
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {POLICY_SECTIONS.map((section) => (
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

        {/* Policy Sections */}
        <div className="space-y-12">
          {POLICY_SECTIONS.map((section) => (
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
              Questions About Privacy?
            </h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about our privacy policy or how we handle your data,
              please don't hesitate to contact our privacy team.
            </p>
            <div className="inline-flex items-center space-x-2">
              <a
                href="mailto:privacy@jobhub.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                privacy@jobhub.com
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="/help"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Privacy Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}