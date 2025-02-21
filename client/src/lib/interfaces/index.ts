//This will come from request
export interface NotePreview {
	id: string;
	bookmark: Bookmark;
	textPreview: string;
}

export interface Bookmark {
	title: string;
	color: string;
	updatedAt: Date;
}

//this will come from request for selectById note
//also fetch recent 5 opened notes on app start
export interface Note {
	id: string;
	bookmark: Bookmark;
	text: string;
}

export interface BookmarkWithNoteId extends Bookmark {
	id: string;
}
