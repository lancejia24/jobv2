import React, { useState } from 'react';
import { Search, X, MessageSquare, Users } from 'lucide-react';
import { useMessaging } from '../../context/MessagingContext';
import { UserPresence } from './UserPresence';

interface ChatListProps {
  onClose?: () => void;
}

export function ChatList({ onClose }: ChatListProps) {
  const { chats, setActiveChat } = useMessaging();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Messages</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 focus:outline-none"
          >
            {chat.type === 'direct' ? (
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-gray-500" />
                </div>
                <UserPresence userId={chat.participants[0]} />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {chat.name || 'Chat'}
                </p>
                {chat.lastMessage && (
                  <p className="text-xs text-gray-500">
                    {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
              {chat.lastMessage && (
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage.content}
                </p>
              )}
              {chat.isTyping?.length ? (
                <p className="text-sm text-blue-600">Typing...</p>
              ) : null}
            </div>

            {chat.unreadCount ? (
              <div className="ml-2 bg-blue-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {chat.unreadCount}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}