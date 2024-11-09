import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import type { Message, Chat } from '../types';

interface MessagingContextType {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (content: string, attachments?: File[]) => void;
  markAsRead: (messageIds: string[]) => void;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

// WebSocket connection URL - in production this would come from environment variables
const WS_URL = 'wss://api.jobhub.com/ws';

export function MessagingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!user) return;

    let ws: WebSocket;
    try {
      ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('WebSocket connected');
        // Authenticate the WebSocket connection
        ws.send(JSON.stringify({
          type: 'auth',
          payload: { userId: user.id }
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        // Implement reconnection logic here
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
    }
  }, [user]);

  const handleWebSocketMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'message':
        setMessages(prev => [...prev, data.payload]);
        // Update last message in chat
        setChats(prev => prev.map(chat => 
          chat.id === data.payload.chatId 
            ? { ...chat, lastMessage: data.payload }
            : chat
        ));
        break;
      case 'typing':
        setChats(prev => prev.map(chat => 
          chat.id === data.payload.chatId 
            ? { ...chat, isTyping: data.payload.userId }
            : chat
        ));
        break;
      case 'read':
        setMessages(prev => prev.map(message => 
          data.payload.messageIds.includes(message.id)
            ? { ...message, readBy: [...message.readBy, data.payload.userId] }
            : message
        ));
        break;
      default:
        break;
    }
  }, []);

  const sendMessage = useCallback((content: string, attachments?: File[]) => {
    if (!socket || !activeChat || !user) return;

    const message: Partial<Message> = {
      chatId: activeChat.id,
      content,
      senderId: user.id,
      createdAt: new Date(),
      readBy: [user.id],
    };

    if (attachments?.length) {
      // In a real app, you would upload files first and then attach their URLs
      message.attachments = attachments.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
      }));
    }

    socket.send(JSON.stringify({
      type: 'message',
      payload: message,
    }));
  }, [socket, activeChat, user]);

  const markAsRead = useCallback((messageIds: string[]) => {
    if (!socket || !user) return;

    socket.send(JSON.stringify({
      type: 'read',
      payload: {
        messageIds,
        userId: user.id,
      },
    }));
  }, [socket, user]);

  return (
    <MessagingContext.Provider value={{
      chats,
      activeChat,
      messages,
      setActiveChat,
      sendMessage,
      markAsRead,
    }}>
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
}