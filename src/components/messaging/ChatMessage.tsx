import React from 'react';
import { Check, CheckCheck, FileText, Image as ImageIcon } from 'lucide-react';
import { Message } from '../../types/message';
import { useAuth } from '../../context/AuthContext';

interface ChatMessageProps {
  message: Message;
  showAvatar: boolean;
}

export function ChatMessage({ message, showAvatar }: ChatMessageProps) {
  const { user } = useAuth();
  const isOwn = message.senderId === user?.id;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && showAvatar && (
        <div className="flex-shrink-0 mr-3">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {message.senderId[0].toUpperCase()}
            </span>
          </div>
        </div>
      )}
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwn
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.content && (
            <p className="text-sm whitespace-pre-line">{message.content}</p>
          )}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center space-x-2"
                >
                  {attachment.type.startsWith('image/') ? (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={attachment.url}
                        alt={attachment.name}
                        className="max-w-[200px] max-h-[200px] rounded-lg"
                      />
                    </a>
                  ) : (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 ${
                        isOwn ? 'text-white' : 'text-blue-600'
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="text-sm underline">{attachment.name}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`mt-1 flex items-center justify-end space-x-2 text-xs ${
          isOwn ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <span>
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