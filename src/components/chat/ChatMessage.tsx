import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { type Message } from '../../types';

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
}

export function ChatMessage({ message, isOwn, showAvatar }: ChatMessageProps) {
  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} items-end space-x-2`}
    >
      {!isOwn && showAvatar && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">J</span>
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwn
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className={`mt-1 flex items-center justify-end space-x-1 ${
          isOwn ? 'text-blue-200' : 'text-gray-400'
        }`}>
          <span className="text-xs">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {isOwn && (
            message.readBy.length > 1 ? (
              <CheckCheck className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )
          )}
        </div>
      </div>
    </div>
  );
}