import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon, Smile, MoreVertical, Users, AlertCircle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { UserPresence } from './UserPresence';

interface ChatRoomProps {
  chatId: string;
  isFullScreen: boolean;
}

export function ChatRoom({ chatId, isFullScreen }: ChatRoomProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, chats, isConnected } = useChat();
  const { user } = useAuth();
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const chat = chats.find(c => c.id === chatId);
  const chatMessages = messages.filter(m => m.chatId === chatId);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!newMessage.trim() || !isConnected) return;
    sendMessage(chatId, newMessage, user?.id || '');
    setNewMessage('');
    setIsTyping(false);
    setAttachments([]);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-gray-600">Chat not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {chat.type === 'direct' ? 'John Doe' : chat.name}
          </h3>
          {chat.type === 'direct' && (
            <div className="ml-2 flex items-center">
              <UserPresence userId={chat.participants[0]} />
              <span className="ml-2 text-sm text-green-500">Online</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {chat.type === 'group' && (
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Users className="h-5 w-5" />
            </button>
          )}
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatMessages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.senderId === user?.id}
            showAvatar={index === 0 || chatMessages[index - 1].senderId !== message.senderId}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        {attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 rounded-full pl-3 pr-2 py-1"
              >
                <span className="text-xs text-gray-600 truncate max-w-[100px]">
                  {file.name}
                </span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <AlertCircle className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer text-gray-400 hover:text-gray-500">
            <Paperclip className="h-5 w-5" />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <label className="cursor-pointer text-gray-400 hover:text-gray-500">
            <ImageIcon className="h-5 w-5" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            onKeyPress={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-400 hover:text-gray-500">
            <Smile className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || !isConnected}
            className="text-white bg-blue-600 rounded-full p-2 hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}