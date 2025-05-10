import { WsMessageType, type WsMessage } from '$lib/api/generated';
import authStore from '$lib/stores/auth.store';
import noteUtils from '$lib/utils/note.utils';

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
			// console.log('UserSession: ', authStore.getSessionId());
			const msg: WsMessage = JSON.parse(event.data);
			const isInnerUpdate = msg.user.sessionId === authStore.getSessionId();

			if (isInnerUpdate) return;
			const { id, type, update, create } = msg.message;

			switch (type) {
				case WsMessageType.NoteCreated:
					console.log('Note created - logic:', id, create!);

					if (!id) console.error('No ID passed: ', id);
					if (!create) console.error('No payload passed: ', create);
					if (!id || !create) return;

					noteUtils.createNote(create);
					break;
				case WsMessageType.NoteEdited:
					console.log('Note edited - logic', id, update);

					if (!id) console.error('No ID passed: ', id);
					if (!update) console.error('No payload passed: ', update);
					if (!id || !update) return;

					noteUtils.updateAllNoteProperties(id, update!);
					break;
				case WsMessageType.NoteDeleted:
					console.log('Note deleted - logic', id);
					if (!id) {
						console.error('No ID passed: ', id);
						return;
					}

					noteUtils.removeOneNote(id, { isWs: true });
					break;
				default:
					console.error('No handler fro given WS event type: ', type);
					break;
			}
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
