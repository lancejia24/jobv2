import { CONFIG } from '../config';
import { MockWebSocket } from './MockWebSocket';

type WebSocketEventMap = {
  open: () => void;
  close: () => void;
  message: (data: any) => void;
  error: (error: any) => void;
};

export class WebSocketManager {
  private socket: WebSocket | MockWebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private eventListeners: Partial<WebSocketEventMap> = {};

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      if (CONFIG.MOCK_WEBSOCKET) {
        this.socket = new MockWebSocket();
      } else {
        this.socket = new WebSocket(CONFIG.WS_URL);
      }

      this.socket.addEventListener('open', () => {
        this.reconnectAttempts = 0;
        this.eventListeners.open?.();
      });

      this.socket.addEventListener('close', () => {
        this.eventListeners.close?.();
        this.handleReconnect();
      });

      this.socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          this.eventListeners.message?.(data);
        } catch (error) {
          console.error('WebSocket message parse error:', error);
        }
      });

      this.socket.addEventListener('error', (error) => {
        this.eventListeners.error?.(error);
        if (this.socket?.readyState === WebSocket.OPEN) {
          this.socket.close();
        }
      });
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= CONFIG.MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached');
      return;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, CONFIG.RECONNECT_INTERVAL);
  }

  public on<K extends keyof WebSocketEventMap>(event: K, callback: WebSocketEventMap[K]) {
    this.eventListeners[event] = callback;
  }

  public send(type: string, payload: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public close() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    this.socket?.close();
    this.socket = null;
  }

  public isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}