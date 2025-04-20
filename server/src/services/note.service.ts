import { DB_COLLECTIONS } from '../config/MongoDB.config';
import NoteModel, { Note_ObjectId, NotePreview_ObjectId } from '../models/Note.model';
import { HttpStatusCode } from '../constants/error.constants';
import appAssert from '../utils/appErrorAssert.utils';
import { NoteUpdate } from '../api/generated';

const SERVICE_NAME = DB_COLLECTIONS.Notes;

const getAll = async (userId: string): Promise<Note_ObjectId[]> => await NoteModel.find({
  userId
}).lean().sort({ updatedAt: -1 });

const getPreviews = async (userId: string): Promise<NotePreview_ObjectId[]> => {
  const notes = await getAll(userId);
  const notePreviews: NotePreview_ObjectId[] = notes.map((note) => ({
    ...note,
    textPreview: note.text.slice(0, 200),
    text: undefined,
  }));

  return notePreviews;
};

const getRecent = async (userId:string, limit: number) => {
  const recentNotes = await NoteModel.find({userId})
    .lean()
    .sort({ updatedAt: -1 }) // Get the most recently updated notes
    .limit(limit);

  return recentNotes;
};

const getById = async (id: string): Promise<Note_ObjectId | null> => {
  return await NoteModel.findById(id).lean();
};

const add = async (userId: string,payload: NoteUpdate): Promise<Note_ObjectId> => {
  const newNoteData = {...payload, userId}
  const newNote = new NoteModel(newNoteData);

  return await newNote.save();
};

const editById = async (id: string, payload: NoteUpdate) => {
  const note = await NoteModel.findById(id);

  appAssert(note, HttpStatusCode.NotFound, `Not found, id: ${id}`, SERVICE_NAME);

  return await NoteModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const removeById = async (id: string) => {
  const removedNote = await NoteModel.findByIdAndDelete(id);
  appAssert(removedNote, HttpStatusCode.NotFound, `Not found, id: ${id}`, SERVICE_NAME);

  return removedNote;
};

const opened = async (id: string) => {
  const note = await NoteModel.findById(id);

  appAssert(note, HttpStatusCode.NotFound, `Not found, id: ${id}`, SERVICE_NAME);

  await NoteModel.findByIdAndUpdate(id, { updatedAt: new Date() });
  return;
};

export default {
  getAll,
  getPreviews,
  getRecent,
  getById,
  add,
  editById,
  removeById,
  opened,
};
