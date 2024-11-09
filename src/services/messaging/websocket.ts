export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;
  private messageCallbacks: ((message: any) => void)[] = [];
  private statusCallbacks: ((status: boolean) => void)[] = [];

  constructor(private baseUrl: string) {}

  connect(token: string) {
    try {
      this.ws = new WebSocket(`${this.baseUrl}?token=${token}`);
      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      this.handleReconnect();
    }
  }

  private setupEventListeners() {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.notifyStatusChange(true);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageCallbacks.forEach(callback => callback(data));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      this.notifyStatusChange(false);
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.ws?.close();
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect(this.getStoredToken());
    }, this.reconnectTimeout * Math.pow(2, this.reconnectAttempts));
  }

  private getStoredToken(): string {
    return localStorage.getItem('auth_token') || '';
  }

  private notifyStatusChange(isConnected: boolean) {
    this.statusCallbacks.forEach(callback => callback(isConnected));
  }

  send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(callback: (message: any) => void) {
    this.messageCallbacks.push(callback);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    };
  }

  onStatusChange(callback: (status: boolean) => void) {
    this.statusCallbacks.push(callback);
    return () => {
      this.statusCallbacks = this.statusCallbacks.filter(cb => cb !== callback);
    };
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
    this.messageCallbacks = [];
    this.statusCallbacks = [];
  }
}