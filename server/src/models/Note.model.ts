import mongoose from 'mongoose';
import { DB_COLLECTIONS, MongoDocument } from '../config/MongoDB.config';
import { Note, NotePreview } from '../api/generated';

export interface Note_ObjectId  extends Omit<Note, 'userId'> {
  userId: mongoose.Types.ObjectId
}

export interface NotePreview_ObjectId  extends Omit<NotePreview, 'userId'> {
  userId: mongoose.Types.ObjectId
}

export interface NoteDocument extends MongoDocument<Note_ObjectId> {}

const noteSchema = new mongoose.Schema<NoteDocument>(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DB_COLLECTIONS.Users,
        required: true,
        index: true, //use it as index, cuz we will search by userId
    },
    bookmark: {
      title: String,
      color: String,
    },
    text: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true } //Automatically add createdAt and updatedAt fields;
);

const NoteModel = mongoose.model<NoteDocument>(DB_COLLECTIONS.Notes, noteSchema, DB_COLLECTIONS.Notes);

export default NoteModel;
