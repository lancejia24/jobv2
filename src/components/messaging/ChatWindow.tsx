import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon, Smile, X } from 'lucide-react';
import { useMessaging } from '../../context/MessagingContext';
import { Message } from '../../types/message';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

interface ChatWindowProps {
  isFullScreen?: boolean;
  onClose?: () => void;
}

export function ChatWindow({ isFullScreen, onClose }: ChatWindowProps) {
  const {
    activeChat,
    messages,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
  } = useMessaging();

  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (activeChat) {
      markAsRead(activeChat.id);
    }
  }, [activeChat, messages, markAsRead]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!activeChat || (!newMessage.trim() && attachments.length === 0)) return;

    await sendMessage(activeChat.id, newMessage, attachments);
    setNewMessage('');
    setAttachments([]);
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      stopTyping(activeChat.id);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!isTyping && activeChat) {
      setIsTyping(true);
      startTyping(activeChat.id);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (activeChat) {
        stopTyping(activeChat.id);
      }
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  if (!activeChat) return null;

  const chatMessages = messages[activeChat.id] || [];

  return (
    <div className={`flex flex-col bg-white rounded-lg shadow-lg ${
      isFullScreen ? 'h-full' : 'h-[32rem]'
    }`}>
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {activeChat.name || 'Chat'}
          </h3>
          {activeChat.isTyping?.length ? (
            <p className="text-sm text-gray-500">Typing...</p>
          ) : null}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message: Message, index: number) => (
          <ChatMessage
            key={message.id}
            message={message}
            showAvatar={
              index === 0 ||
              chatMessages[index - 1].senderId !== message.senderId
            }
          />
        ))}
        {activeChat.isTyping?.length ? <TypingIndicator /> : null}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t">
          <div className="flex flex-wrap gap-2">
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
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 border-t">
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer text-gray-500 hover:text-gray-700">
            <Paperclip className="h-5 w-5" />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <label className="cursor-pointer text-gray-500 hover:text-gray-700">
            <ImageIcon className="h-5 w-5" />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={e => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button className="text-gray-500 hover:text-gray-700">
            <Smile className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() && attachments.length === 0}
            className="text-white bg-blue-600 rounded-full p-2 hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}