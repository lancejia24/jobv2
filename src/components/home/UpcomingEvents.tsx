import React from 'react';
import { Calendar, Video, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'networking';
  date: Date;
  attendees: number;
}

const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Interview Preparation Workshop',
    type: 'workshop',
    date: new Date('2024-03-20T14:00:00'),
    attendees: 45,
  },
  {
    id: '2',
    title: 'Networking Event: Meet Tech Recruiters',
    type: 'networking',
    date: new Date('2024-03-22T18:00:00'),
    attendees: 120,
  },
];

export function UpcomingEvents() {
  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'webinar':
        return Video;
      case 'workshop':
        return Calendar;
      case 'networking':
        return Users;
      default:
        return Calendar;
    }
  };

  return (
    <div className="space-y-4">
      {SAMPLE_EVENTS.map((event) => {
        const Icon = getEventIcon(event.type);

        return (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {event.date.toLocaleDateString()} at{' '}
                  {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                {event.attendees}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}