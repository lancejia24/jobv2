import React, { useState } from 'react';
import { Award, Book, CheckCircle, Clock, TrendingUp, Trophy, Star, BarChart } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: number;
  questionsCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  completedAt?: Date;
  score?: number;
  badge?: {
    name: string;
    icon: string;
    level: 'bronze' | 'silver' | 'gold';
  };
}

const SAMPLE_ASSESSMENTS: Assessment[] = [
  {
    id: '1',
    title: 'React Development',
    description: 'Test your knowledge of React fundamentals, hooks, and best practices.',
    duration: 45,
    questionsCount: 30,
    difficulty: 'Intermediate',
    category: 'Frontend',
    completedAt: new Date('2024-03-01'),
    score: 85,
    badge: {
      name: 'React Expert',
      icon: '⚛️',
      level: 'gold'
    }
  },
  {
    id: '2',
    title: 'TypeScript Fundamentals',
    description: 'Assess your TypeScript skills including types, interfaces, and generics.',
    duration: 30,
    questionsCount: 25,
    difficulty: 'Beginner',
    category: 'Programming Languages'
  }
];

const LEARNING_PATHS = [
  {
    title: 'Frontend Development',
    progress: 65,
    courses: [
      'React Fundamentals',
      'Advanced TypeScript',
      'Modern CSS Techniques'
    ]
  },
  {
    title: 'Backend Development',
    progress: 40,
    courses: [
      'Node.js Essentials',
      'Database Design',
      'API Development'
    ]
  }
];

export function SkillAssessments() {
  const [activeTab, setActiveTab] = useState<'assessments' | 'progress' | 'recommendations'>('assessments');

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'bronze':
        return 'bg-amber-100 text-amber-800';
      case 'silver':
        return 'bg-gray-100 text-gray-800';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Skills Development</h1>
          <p className="mt-2 text-gray-600">Take assessments, track your progress, and grow your skills</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('assessments')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assessments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Award className="h-5 w-5 inline-block mr-2" />
              Assessments
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <TrendingUp className="h-5 w-5 inline-block mr-2" />
              Progress
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recommendations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Book className="h-5 w-5 inline-block mr-2" />
              Recommendations
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'assessments' && (
          <div className="space-y-6">
            {/* Available Assessments */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SAMPLE_ASSESSMENTS.map((assessment) => (
                <div
                  key={assessment.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">{assessment.title}</h3>
                      {assessment.badge && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(assessment.badge.level)}`}>
                          {assessment.badge.icon} {assessment.badge.name}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{assessment.description}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {assessment.duration} minutes
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {assessment.questionsCount} questions
                      </div>
                      <div className="flex items-center text-sm">
                        <Trophy className="h-4 w-4 mr-2 text-gray-500" />
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(assessment.difficulty)}`}>
                          {assessment.difficulty}
                        </span>
                      </div>
                    </div>
                    {assessment.completedAt ? (
                      <div className="mt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Completed</span>
                          <span className="text-sm font-medium text-gray-900">{assessment.score}%</span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${assessment.score}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <button className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Start Assessment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Skills Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Skills Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Completed</p>
                        <p className="text-2xl font-semibold text-blue-600">8</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-8 w-8 text-green-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Average Score</p>
                        <p className="text-2xl font-semibold text-green-600">85%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-8 w-8 text-purple-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Badges Earned</p>
                        <p className="text-2xl font-semibold text-purple-600">5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Paths Progress */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Learning Paths</h2>
              <div className="space-y-6">
                {LEARNING_PATHS.map((path, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{path.title}</h3>
                      <span className="text-sm text-gray-500">{path.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                    <div className="mt-2">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Included Courses:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {path.courses.map((course, idx) => (
                          <li key={idx}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {/* Recommended Assessments */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recommended Next Steps</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <BarChart className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Complete TypeScript Assessment</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Based on your React expertise, we recommend taking the TypeScript assessment next.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <Book className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Frontend Architecture Course</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Enhance your skills with our advanced frontend architecture course.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Gap Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Skill Gap Analysis</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">React</span>
                  <div className="flex items-center">
                    <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                      <div className="w-4/5 h-2 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-500">80%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">TypeScript</span>
                  <div className="flex items-center">
                    <div className="w-48 h-2 bg-gray-200 rounded-full mr-2">
                      <div className="w-3/5 h-2 bg-yellow-500 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-500">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}