import { DB_COLLECTIONS } from '../config/MongoDB.config';
import NoteModel from '../models/Note.model';
import { HttpStatusCode } from '../constants/error.constants';
import appAssert from '../utils/appErrorAssert.utils';
import { Note, NoteUpdate } from '../api/api/generated';

const SERVICE_NAME = DB_COLLECTIONS.Notes;

const getAll = async (): Promise<Note[]> => {
  return await NoteModel.find();
};

const getById = async (id: string) => {
  return [];
};

const add = async (payload: NoteUpdate): Promise<Note> => {
  const note: Omit<Note, 'id'> = {
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const newNote = new NoteModel(note);

  return await newNote.save();
};

const editById = async (id: string, payload: NoteUpdate) => {
  const note = await NoteModel.findById(id);

  appAssert(note, HttpStatusCode.NotFound, `Not found. UserId: ${id}`, SERVICE_NAME);

  const updateData: Note = {
    ...note,
    createdAt: note.createdAt,
    updatedAt: new Date().toISOString(),
  };

  return await NoteModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const removeById = async (id: string) => {
  const removedNote = await NoteModel.findByIdAndDelete(id);
  appAssert(removedNote, HttpStatusCode.NotFound, `Not found. id: ${id}`, SERVICE_NAME);

  return removedNote;
};

export default {
  getAll,
  getById,
  add,
  editById,
  removeById,
};
