import { useState, useEffect, useCallback, useRef } from 'react';

// Use a mock WebSocket for development without a backend
const MOCK_MODE = true;

class MockWebSocket {
  private listeners: { [key: string]: Function[] } = {};
  public readyState = WebSocket.OPEN;

  constructor() {
    setTimeout(() => {
      this.emit('open');
    }, 100);
  }

  addEventListener(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  removeEventListener(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  emit(event: string, data?: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  send(data: string) {
    console.log('Mock WebSocket message sent:', data);
    // Simulate message echo
    setTimeout(() => {
      this.emit('message', { data });
    }, 100);
  }

  close() {
    this.emit('close');
  }
}

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | MockWebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    try {
      socketRef.current = MOCK_MODE ? new MockWebSocket() : new WebSocket('ws://localhost:8080/ws');

      const handleOpen = () => {
        setIsConnected(true);
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };

      const handleClose = () => {
        setIsConnected(false);
        socketRef.current = null;
        // Attempt to reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };

      const handleError = (error: Event) => {
        console.warn('WebSocket error:', error);
        socketRef.current?.close();
      };

      socketRef.current.addEventListener('open', handleOpen);
      socketRef.current.addEventListener('close', handleClose);
      socketRef.current.addEventListener('error', handleError);

      return () => {
        socketRef.current?.removeEventListener('open', handleOpen);
        socketRef.current?.removeEventListener('close', handleClose);
        socketRef.current?.removeEventListener('error', handleError);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    socketRef.current?.close();
    socketRef.current = null;
    setIsConnected(false);
  }, []);

  const send = useCallback((type: string, payload: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type, payload }));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    send,
    disconnect,
    socket: socketRef.current
  };
}