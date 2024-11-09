import React from 'react';

interface UserPresenceProps {
  userId: string;
  size?: 'sm' | 'md';
}

export function UserPresence({ userId, size = 'sm' }: UserPresenceProps) {
  // In a real app, this would be connected to your presence system
  const status = 'online'; // online, offline, busy

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3.5 h-3.5',
  };

  return (
    <span
      className={`absolute bottom-0 right-0 block ${
        sizeClasses[size]
      } rounded-full ${getStatusColor()} ring-2 ring-white`}
    />
  );
}