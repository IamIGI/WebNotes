// src/lib/WebSocketClient.ts

export default class WebSocketClient {
	private socket: WebSocket | null = null;
	private url: string;

	constructor(url: string) {
		this.url = url;
	}

	connect() {
		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			console.log('WebSocket connected');
			this.send('Hello from WebSocketClient!');
		};

		this.socket.onmessage = (event) => {
			console.log('Received message:', event.data);
		};

		this.socket.onclose = (event) => {
			console.log('WebSocket closed:', event);
		};

		this.socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
	}

	send(message: string) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(message);
		} else {
			console.error('WebSocket is not open. Cannot send message.');
		}
	}

	disconnect() {
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	}
}
