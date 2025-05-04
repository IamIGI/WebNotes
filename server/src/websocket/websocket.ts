import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

let wss: WebSocketServer | null = null;

export const initWebSocketServer = (server: HttpServer) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection');

    ws.send('Welcome to WebSocket server!');
  });

  console.log('WebSocket server initialized');
};

// Export a helper function to send messages to all clients
export const broadcastMessage = (message: string) => {
  if (!wss) {
    console.error('WebSocket server not initialized');
    return;
  }

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
