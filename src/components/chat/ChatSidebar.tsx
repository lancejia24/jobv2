import React from 'react';
import { Users, MessageSquare, MoreVertical } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { UserPresence } from './UserPresence';

interface ChatSidebarProps {
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export function ChatSidebar({ selectedChatId, onSelectChat }: ChatSidebarProps) {
  const { chats, messages } = useChat();
  const { user } = useAuth();

  const getLastMessage = (chatId: string) => {
    return messages
      .filter(m => m.chatId === chatId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
  };

  const getUnreadCount = (chatId: string) => {
    return messages.filter(
      m => m.chatId === chatId && !m.readBy.includes(user?.id || '')
    ).length;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map(chat => {
        const lastMessage = getLastMessage(chat.id);
        const unreadCount = getUnreadCount(chat.id);

        return (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 ${
              selectedChatId === chat.id ? 'bg-blue-50' : ''
            }`}
          >
            {chat.type === 'direct' ? (
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </div>
                <UserPresence userId={chat.participants[0]} />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {chat.type === 'direct' ? 'John Doe' : chat.name}
                </p>
                {lastMessage && (
                  <p className="text-xs text-gray-500">
                    {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-1">
                {lastMessage ? (
                  <p className="text-sm text-gray-500 truncate">{lastMessage.content}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No messages yet</p>
                )}
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>

            <button className="p-1 text-gray-400 hover:text-gray-500">
              <MoreVertical className="h-4 w-4" />
            </button>
          </button>
        );
      })}
    </div>
  );
}