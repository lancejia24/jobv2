import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Plus, X } from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  jobTitle: string;
  date: Date;
  time: string;
  type: 'video' | 'in-person';
  location: string;
  interviewers: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

const SAMPLE_INTERVIEWS: Interview[] = [
  {
    id: '1',
    candidateName: 'John Doe',
    jobTitle: 'Senior Frontend Developer',
    date: new Date('2024-03-20'),
    time: '10:00 AM',
    type: 'video',
    location: 'Zoom Meeting',
    interviewers: ['Sarah Chen', 'Michael Rodriguez'],
    status: 'scheduled',
  },
  {
    id: '2',
    candidateName: 'Jane Smith',
    jobTitle: 'Product Designer',
    date: new Date('2024-03-21'),
    time: '2:00 PM',
    type: 'in-person',
    location: 'Office - Room 3A',
    interviewers: ['David Wilson'],
    status: 'scheduled',
  },
];

export function InterviewScheduler() {
  const [interviews] = useState<Interview[]>(SAMPLE_INTERVIEWS);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const handleScheduleInterview = () => {
    setShowScheduleForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Upcoming Interviews</h2>
        <button
          onClick={handleScheduleInterview}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Interview
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Interview Cards */}
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {interview.candidateName}
                  </h3>
                  <p className="text-sm text-gray-500">{interview.jobTitle}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {interview.date.toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {interview.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  {interview.type === 'video' ? (
                    <Video className="h-4 w-4 mr-2" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-2" />
                  )}
                  {interview.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  {interview.interviewers.join(', ')}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Reschedule
                </button>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Join Meeting
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}