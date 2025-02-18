export interface NotePreview {
	id: string;
	bookmark: Bookmark;
	textPreview: string;
	isOpen: boolean;
}

export interface Bookmark {
	title: string;
	color: string;
	updatedAt: Date;
}

export interface Note {
	id: string;
	bookmark: Bookmark;
	text: string;
}

export interface BookmarkWithNoteId extends Bookmark {
	id: string;
}
