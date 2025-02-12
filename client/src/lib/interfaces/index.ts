export interface NoteItem {
	bookmark: {
		title: string;
		color: string;
		updatedAt: Date;
	};
	textPreview: string;
	isOpen: boolean;
}

export interface Note {
	bookmark: {
		title: string;
		color: string;
	};
	text: string;
}
