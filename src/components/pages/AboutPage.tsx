import React, { useState } from 'react';
import { Building, Users, Globe, Award, TrendingUp } from 'lucide-react';
import { EditPageButton } from '../common/EditPageButton';
import { PageEditor } from '../common/PageEditor';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface AboutContent {
  mission: string;
  vision: string;
  values: string[];
  stats: {
    users: number;
    companies: number;
    placements: number;
    countries: number;
  };
  team: TeamMember[];
}

const initialContent: AboutContent = {
  mission: "We're on a mission to revolutionize the way people find and secure their dream jobs, while helping companies build amazing teams.",
  vision: "To create a world where every person can achieve their full professional potential and every company can build their ideal team.",
  values: [
    "Innovation in recruitment",
    "Transparency in hiring",
    "Equal opportunities for all",
    "Continuous learning and growth"
  ],
  stats: {
    users: 100000,
    companies: 5000,
    placements: 25000,
    countries: 50
  },
  team: [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
    }
  ]
};

export function AboutPage() {
  const [content, setContent] = useState<AboutContent>(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (updatedContent: AboutContent) => {
    // Here you would typically make an API call to save the content
    setContent(updatedContent);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About JobHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content.mission}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">{content.stats.users.toLocaleString()}+</div>
            <div className="text-gray-500">Active Users</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Building className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">{content.stats.companies.toLocaleString()}+</div>
            <div className="text-gray-500">Companies</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">{content.stats.placements.toLocaleString()}+</div>
            <div className="text-gray-500">Successful Placements</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Globe className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900">{content.stats.countries}+</div>
            <div className="text-gray-500">Countries</div>
          </div>
        </div>

        {/* Vision & Values */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-gray-600 mb-8">{content.vision}</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.values.map((value, index) => (
              <div key={index} className="flex items-center">
                <Award className="h-6 w-6 text-blue-600 mr-3" />
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Button & Editor */}
        <EditPageButton
          pageId="about"
          onEdit={() => setIsEditing(true)}
        />

        {isEditing && (
          <PageEditor
            pageId="about"
            initialContent={content}
            onSave={handleSave}
            onClose={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
}