export interface NotePreview {
	bookmark: BookmarkPreview;
	textPreview: string;
	isOpen: boolean;
}

export interface Bookmark {
	title: string;
	color: string;
}

export interface BookmarkPreview extends Bookmark {
	updatedAt: Date;
}

export interface Note {
	bookmark: {
		title: string;
		color: string;
	};
	text: string;
}
