import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Calendar, MessageSquare, XCircle } from 'lucide-react';
import { Application } from '../../types/application';

interface ApplicationStatusProps {
  application: Application;
  className?: string;
}

export function ApplicationStatus({ application, className = '' }: ApplicationStatusProps) {
  const getStatusDetails = () => {
    switch (application.status) {
      case 'pending':
        return {
          icon: Clock,
          text: 'Application Pending',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100',
          description: 'Your application is being processed',
        };
      case 'reviewing':
        return {
          icon: MessageSquare,
          text: 'Under Review',
          color: 'text-blue-500',
          bgColor: 'bg-blue-100',
          description: 'Your application is being reviewed',
        };
      case 'assessment':
        return {
          icon: AlertTriangle,
          text: 'Assessment Required',
          color: 'text-purple-500',
          bgColor: 'bg-purple-100',
          description: `Complete assessment by ${application.assessmentDueDate?.toLocaleDateString()}`,
        };
      case 'interview_scheduled':
        return {
          icon: Calendar,
          text: 'Interview Scheduled',
          color: 'text-indigo-500',
          bgColor: 'bg-indigo-100',
          description: `Interview on ${application.interviews?.[0]?.scheduledFor.toLocaleDateString()}`,
        };
      case 'interview_completed':
        return {
          icon: CheckCircle,
          text: 'Interview Completed',
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          description: 'Waiting for feedback',
        };
      case 'offer_pending':
        return {
          icon: Clock,
          text: 'Offer Pending',
          color: 'text-orange-500',
          bgColor: 'bg-orange-100',
          description: 'Preparing your offer',
        };
      case 'offer_sent':
        return {
          icon: MessageSquare,
          text: 'Offer Received',
          color: 'text-blue-500',
          bgColor: 'bg-blue-100',
          description: `Expires on ${application.offer?.expiresAt.toLocaleDateString()}`,
        };
      case 'offer_accepted':
        return {
          icon: CheckCircle,
          text: 'Offer Accepted',
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          description: `Start date: ${application.offer?.startDate.toLocaleDateString()}`,
        };
      case 'offer_declined':
        return {
          icon: XCircle,
          text: 'Offer Declined',
          color: 'text-red-500',
          bgColor: 'bg-red-100',
          description: application.offer?.declinedReason,
        };
      case 'rejected':
        return {
          icon: XCircle,
          text: 'Application Rejected',
          color: 'text-red-500',
          bgColor: 'bg-red-100',
          description: 'Thank you for your interest',
        };
      default:
        return {
          icon: Clock,
          text: 'Processing',
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          description: 'Application is being processed',
        };
    }
  };

  const { icon: Icon, text, color, bgColor, description } = getStatusDetails();

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`p-2 rounded-full ${bgColor}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{text}</p>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}