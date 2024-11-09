export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  readBy: string[];
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
  isTyping?: string;
  unreadCount?: number;
}

// ... rest of your existing types