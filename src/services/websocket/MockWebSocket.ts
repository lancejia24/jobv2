export class MockWebSocket {
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
    try {
      const parsedData = JSON.parse(data);
      setTimeout(() => {
        this.emit('message', { data: JSON.stringify({ 
          type: `${parsedData.type}_response`,
          payload: parsedData.payload 
        })});
      }, 100);
    } catch (error) {
      console.error('Mock WebSocket error:', error);
    }
  }

  close() {
    this.emit('close');
  }
}