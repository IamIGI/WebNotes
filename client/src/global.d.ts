export {};

declare global {
	interface Window {
		electron: {
			closeApp: () => void;
			hideWindow: () => void;
			toggleFullScreen: () => void;
		};
	}
}
