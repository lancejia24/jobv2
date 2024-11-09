import React, { useState, useEffect } from 'react';
import { X, Maximize2, Minimize2, Search, Plus, Settings, Users, MessageSquare } from 'lucide-react';
import { ChatSidebar } from './ChatSidebar';
import { ChatRoom } from './ChatRoom';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

export function ChatApplication() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [showRooms, setShowRooms] = useState(false);
  const { user } = useAuth();
  const { chats, createChat } = useChat();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // If going fullscreen, add a class to body to prevent scrolling
    document.body.style.overflow = !isFullScreen ? 'hidden' : 'auto';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleNewChat = () => {
    createChat([user?.id || '']);
  };

  const handleJoinRoom = (roomId: string) => {
    // Join chat room logic here
    setSelectedChatId(roomId);
    setShowRooms(false);
  };

  return (
    <div
      className={`fixed ${
        isFullScreen 
          ? 'inset-0 z-50' 
          : 'bottom-4 right-4 w-96 h-[32rem] z-40'
      } bg-white rounded-lg shadow-xl flex flex-col transition-all duration-200`}
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white rounded-t-lg">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowRooms(true)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              title="Join Chat Rooms"
            >
              <Users className="h-5 w-5" />
            </button>
            <button
              onClick={handleNewChat}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              title="New Chat"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullScreen}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            {isFullScreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setSelectedChatId(null)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`${
          selectedChatId && !isFullScreen ? 'hidden' : 'w-80'
        } border-r flex flex-col bg-white`}>
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {showRooms ? (
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Available Chat Rooms</h3>
              <div className="space-y-2">
                {['General', 'Job Seekers', 'Tech Talk', 'Career Advice'].map((room) => (
                  <button
                    key={room}
                    onClick={() => handleJoinRoom(room)}
                    className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900">{room}</p>
                      <p className="text-xs text-gray-500">32 members active</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ChatSidebar
              selectedChatId={selectedChatId}
              onSelectChat={setSelectedChatId}
            />
          )}
        </div>

        {/* Chat Room */}
        {selectedChatId ? (
          <ChatRoom chatId={selectedChatId} isFullScreen={isFullScreen} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}