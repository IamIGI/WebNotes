import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import jwtUtils from '../utils/jwt.utils';
import { NoteUpdate, WsMessage, WsNoteUpdate } from '../api/generated';

interface AuthWebSocket extends WebSocket {
  userId?: string;  
}

let wss: WebSocketServer | null = null;

const initWebSocketServer = (server: HttpServer) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: AuthWebSocket, req) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if(!token) {
      ws.close(1008, 'Token requried'); return;
    }
    const {payload} = jwtUtils.verifyToken(token);
    if(!payload || !payload.userId) {
      ws.close(1008, 'Invalid token');
      return;
    }

    ws.userId = payload.userId as string;

    console.log(`New WebSocket connection from user ${ws.userId}`);

    ws.send('Welcome to private WebSocket connection!');
  });

  console.log('WebSocket server initialized');
};

// Export a helper function to send messages to all clients
const broadcastMessageToUser = (userId: string, sessionId: string, message: WsNoteUpdate) => {
  console.log('broadcastMessageToUser')

  if (!wss) {
    console.error('WebSocket server not initialized');
    return;
  }


  wss.clients.forEach((client) => {
    const authedClient = client as AuthWebSocket;
    if (client.readyState === WebSocket.OPEN && authedClient.userId === userId) {
      const msg: WsMessage = {
        message,
        user: {sessionId}
      }
      console.log(msg)
      const eventData =  JSON.stringify(msg);

      authedClient.send(eventData);
    }
  });
};


export default {
  initWebSocketServer, broadcastMessageToUser
}