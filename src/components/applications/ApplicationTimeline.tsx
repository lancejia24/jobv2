import React from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, Calendar, MessageSquare } from 'lucide-react';
import { Application, ApplicationStatus } from '../../types/application';

interface ApplicationTimelineProps {
  application: Application;
}

export function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'reviewing':
        return MessageSquare;
      case 'assessment':
        return AlertTriangle;
      case 'interview_scheduled':
      case 'interview_completed':
        return Calendar;
      case 'offer_accepted':
        return CheckCircle;
      case 'offer_declined':
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'reviewing':
        return 'text-blue-500';
      case 'assessment':
        return 'text-purple-500';
      case 'interview_scheduled':
      case 'interview_completed':
        return 'text-indigo-500';
      case 'offer_accepted':
        return 'text-green-500';
      case 'offer_declined':
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {application.timeline.map((event, index) => {
          const Icon = getStatusIcon(event.status);
          const colorClass = getStatusColor(event.status);
          const isLast = index === application.timeline.length - 1;

          return (
            <li key={index}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${colorClass}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-900">
                        {event.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      {event.note && (
                        <p className="mt-1 text-sm text-gray-500">{event.note}</p>
                      )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={event.timestamp.toISOString()}>
                        {event.timestamp.toLocaleDateString()}
                      </time>
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