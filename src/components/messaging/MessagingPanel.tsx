import React, { useState } from 'react';
import { MessageSquare, X, Maximize2, Minimize2 } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { ChatList } from './ChatList';
import { useMessaging } from '../../context/MessagingContext';

export function MessagingPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { activeChat } = useMessaging();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="h-full flex">
          <div className="w-80 border-r">
            <ChatList />
          </div>
          <div className="flex-1">
            <ChatWindow 
              isFullScreen={true} 
              onClose={() => setIsFullScreen(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 flex space-x-4">
      {!activeChat && (
        <div className="w-80 bg-white rounded-lg shadow-xl">
          <ChatList onClose={() => setIsOpen(false)} />
        </div>
      )}
      {activeChat && (
        <div className="w-96 bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              {activeChat.name || 'Chat'}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullScreen}
                className="text-gray-400 hover:text-gray-500"
              >
                {isFullScreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <ChatWindow />
        </div>
      )}
    </div>
  );
}