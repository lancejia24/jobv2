export const CONFIG = {
  WS_URL: import.meta.env.PROD ? 'wss://api.jobhub.com/ws' : 'ws://localhost:8080/ws',
  MOCK_WEBSOCKET: import.meta.env.DEV,
  RECONNECT_INTERVAL: 3000,
  MAX_RECONNECT_ATTEMPTS: 5,
};