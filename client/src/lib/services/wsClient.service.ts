import authStore from '$lib/stores/auth.store';

export default class WebSocketClient {
	private socket: WebSocket | null = null;
	private url: string;

	constructor(baseUrl: string, accessToken: string) {
		this.url = `${baseUrl}?token=${accessToken}`;
	}

	connect() {
		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			console.log('WebSocket connected');
			this.send('Hello from WebSocketClient!');
		};

		this.socket.onmessage = (event) => {
			console.log('UserSession: ', authStore.getSession());
			console.log('Received message:', JSON.parse(event.data));
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
