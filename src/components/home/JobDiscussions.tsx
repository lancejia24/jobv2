import React from 'react';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Discussion {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  replies: number;
  views: number;
  likes: number;
  timestamp: Date;
}

const SAMPLE_DISCUSSIONS: Discussion[] = [
  {
    id: '1',
    title: 'Tips for negotiating your first tech job offer',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
    },
    replies: 15,
    views: 342,
    likes: 28,
    timestamp: new Date('2024-03-15T10:00:00'),
  },
  {
    id: '2',
    title: 'How to prepare for technical interviews?',
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
    },
    replies: 23,
    views: 567,
    likes: 45,
    timestamp: new Date('2024-03-14T15:30:00'),
  },
];

export function JobDiscussions() {
  return (
    <div className="space-y-4">
      {SAMPLE_DISCUSSIONS.map((discussion) => (
        <Link
          key={discussion.id}
          to={`/forums/discussion/${discussion.id}`}
          className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {discussion.author.avatar ? (
                <img
                  src={discussion.author.avatar}
                  alt={discussion.author.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-600">
                    {discussion.author.name[0]}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-900">{discussion.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  by {discussion.author.name} • {discussion.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {discussion.replies} replies
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {discussion.views} views
            </span>
            <span className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {discussion.likes} likes
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}