import React from 'react';

interface UserPresenceProps {
  userId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function UserPresence({ userId, size = 'sm' }: UserPresenceProps) {
  // In a real app, this would connect to your presence system
  const isOnline = Math.random() > 0.5; // Simulated online status

  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  return (
    <span
      className={`absolute bottom-0 right-0 block ${
        sizeClasses[size]
      } rounded-full ${
        isOnline ? 'bg-green-400' : 'bg-gray-400'
      } ring-2 ring-white`}
    />
  );
}