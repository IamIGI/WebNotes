import mongoose from 'mongoose';

import { DB_COLLECTIONS, MongoDocument } from '../config/MongoDB.config';
import { Note } from '../api/api/generated';

export interface NoteDocument extends MongoDocument<Note> {}

const noteSchema = new mongoose.Schema(
  {
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
