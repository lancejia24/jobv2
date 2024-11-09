import { useState, useEffect, useCallback, useRef } from 'react';
import { WebSocketManager } from '../services/websocket/WebSocketManager';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const wsManagerRef = useRef<WebSocketManager | null>(null);

  useEffect(() => {
    wsManagerRef.current = new WebSocketManager();

    wsManagerRef.current.on('open', () => {
      setIsConnected(true);
    });

    wsManagerRef.current.on('close', () => {
      setIsConnected(false);
    });

    wsManagerRef.current.on('error', (error) => {
      console.warn('WebSocket error:', error);
      setIsConnected(false);
    });

    return () => {
      wsManagerRef.current?.close();
    };
  }, []);

  const send = useCallback((type: string, payload: any) => {
    wsManagerRef.current?.send(type, payload);
  }, []);

  return {
    isConnected,
    send,
    wsManager: wsManagerRef.current
  };
}