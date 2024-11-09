import React from 'react';
import { Briefcase, MessageSquare, Calendar, CheckCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'application' | 'message' | 'interview' | 'status';
  title: string;
  description: string;
  timestamp: Date;
}

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'application',
    title: 'Application Submitted',
    description: 'Applied for Frontend Developer at TechCorp',
    timestamp: new Date('2024-03-15T10:00:00'),
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    description: 'Received response from Design Studio Inc',
    timestamp: new Date('2024-03-14T15:30:00'),
  },
  {
    id: '3',
    type: 'interview',
    title: 'Interview Scheduled',
    description: 'Technical interview with StartupCo on March 20',
    timestamp: new Date('2024-03-13T09:15:00'),
  },
  {
    id: '4',
    type: 'status',
    title: 'Application Status Update',
    description: 'Your application is being reviewed by TechCorp',
    timestamp: new Date('2024-03-12T14:45:00'),
  },
];

export function ActivityTimeline() {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'application':
        return Briefcase;
      case 'message':
        return MessageSquare;
      case 'interview':
        return Calendar;
      case 'status':
        return CheckCircle;
      default:
        return Briefcase;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'application':
        return 'text-blue-600 bg-blue-100';
      case 'message':
        return 'text-purple-600 bg-purple-100';
      case 'interview':
        return 'text-green-600 bg-green-100';
      case 'status':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {SAMPLE_ACTIVITIES.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colorClasses = getActivityColor(activity.type);

          return (
            <li key={activity.id}>
              <div className="relative pb-8">
                {index !== SAMPLE_ACTIVITIES.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${colorClasses}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="mt-0.5 text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}