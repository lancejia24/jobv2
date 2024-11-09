import React from 'react';
import { Award, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface AssessmentStatusProps {
  status: 'pending' | 'in_progress' | 'completed' | 'expired';
  score?: number;
  dueDate?: Date;
}

export function AssessmentStatus({ status, score, dueDate }: AssessmentStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'in_progress':
        return Award;
      case 'completed':
        return CheckCircle;
      case 'expired':
        return AlertTriangle;
      default:
        return Award;
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className={`rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center">
        <StatusIcon className="h-5 w-5 mr-2" />
        <div>
          <p className="font-medium capitalize">Assessment {status.replace('_', ' ')}</p>
          {status === 'completed' && score !== undefined && (
            <p className="text-sm mt-1">Score: {score}%</p>
          )}
          {status === 'pending' && dueDate && (
            <p className="text-sm mt-1">
              Due by: {dueDate.toLocaleDateString()}
            </p>
          )}
          {status === 'in_progress' && dueDate && (
            <p className="text-sm mt-1">
              Complete by: {dueDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}