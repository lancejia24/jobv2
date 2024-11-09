export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  createdAt: Date;
  readBy: string[];
  replyTo?: string;
  reactions?: {
    type: string;
    users: string[];
  }[];
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
  unreadCount?: number;
  isTyping?: {
    userId: string;
    timestamp: Date;
  }[];
}