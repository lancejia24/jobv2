import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { type Message, type Chat } from '../types';
import { useWebSocket } from '../hooks/useWebSocket';

interface ChatContextType {
  chats: Chat[];
  messages: Message[];
  createChat: (participants: string[]) => Chat;
  sendMessage: (chatId: string, content: string, senderId: string) => void;
  getChatsByUser: (userId: string) => Chat[];
  getMessagesByChat: (chatId: string) => Message[];
  markMessagesAsRead: (chatId: string, userId: string) => void;
  isConnected: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_CHATS: Chat[] = [
  {
    id: '1',
    type: 'direct',
    participants: ['1', '2'],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    chatId: '1',
    senderId: '2',
    content: 'Welcome to the chat!',
    createdAt: new Date(),
    readBy: ['2'],
  }
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats] = useState<Chat[]>(INITIAL_CHATS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const { isConnected, send } = useWebSocket();
  const messageQueueRef = useRef<Message[]>([]);

  const createChat = useCallback((participants: string[]) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      type: participants.length > 2 ? 'group' : 'direct',
      participants,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isConnected) {
      send('create_chat', { chat: newChat });
    }

    return newChat;
  }, [isConnected, send]);

  const sendMessage = useCallback((chatId: string, content: string, senderId: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      senderId,
      content,
      createdAt: new Date(),
      readBy: [senderId],
    };

    setMessages(prev => [...prev, newMessage]);

    if (isConnected) {
      send('send_message', { message: newMessage });
    } else {
      messageQueueRef.current.push(newMessage);
    }
  }, [isConnected, send]);

  const getChatsByUser = useCallback((userId: string) => {
    return chats.filter(chat => chat.participants.includes(userId));
  }, [chats]);

  const getMessagesByChat = useCallback((chatId: string) => {
    return messages.filter(message => message.chatId === chatId);
  }, [messages]);

  const markMessagesAsRead = useCallback((chatId: string, userId: string) => {
    setMessages(prev => prev.map(message => 
      message.chatId === chatId && !message.readBy.includes(userId)
        ? { ...message, readBy: [...message.readBy, userId] }
        : message
    ));

    if (isConnected) {
      send('mark_read', { chatId, userId });
    }
  }, [isConnected, send]);

  return (
    <ChatContext.Provider value={{
      chats,
      messages,
      createChat,
      sendMessage,
      getChatsByUser,
      getMessagesByChat,
      markMessagesAsRead,
      isConnected
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}