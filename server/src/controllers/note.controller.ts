import noteService from '../services/note.service';
import validateRequestUtil from '../utils/validateRequest.utils';
import catchErrors from '../utils/catchErrors.utils';
import { NoteUpdate } from '../api/generated';
import appAssert from '../utils/appErrorAssert.utils';
import { HttpStatusCode } from '../constants/error.constants';
import { DB_COLLECTIONS } from '../config/MongoDB.config';

const REQUIRED_KEYS: Array<keyof NoteUpdate> = ['bookmark', 'text'];

const getAll = catchErrors(async (req, res) => {
  const notes = await noteService.getAll();
  res.status(200).json(notes);
});

const getPreviews = catchErrors(async (req, res) => {
  const notes = await noteService.getPreviews();
  res.status(200).json(notes);
});

const getRecent = catchErrors(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5; // Default to 5 if not provided

    const recentNotes = await noteService.getRecent(limit);

    res.status(200).json(recentNotes);
  } catch (error) {
    console.error('Error fetching recent notes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getById = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  const note = await noteService.getById(id);
  appAssert(note, HttpStatusCode.NotFound, `Note not found/updated, id: ${id}`, DB_COLLECTIONS.Notes);

  res.status(HttpStatusCode.OK).json(note);
});

const add = catchErrors(async (req, res) => {
  const payload = req.body as NoteUpdate;

  validateRequestUtil.isValidPayload(payload.bookmark, ['title', 'color']);

  const newProduct = await noteService.add(payload);

  res.status(HttpStatusCode.Created).json(newProduct);
});

const editById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const payload = req.body as NoteUpdate;

  validateRequestUtil.validateId(id);
  validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);

  const updatedNote = await noteService.editById(id, payload);
  appAssert(updatedNote, HttpStatusCode.NotFound, `Note not found/updated, id: ${id}`, DB_COLLECTIONS.Notes);

  res.status(HttpStatusCode.OK).json(updatedNote);
});

const removeById = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  await noteService.removeById(id);

  res.status(HttpStatusCode.OK).send({ id });
});

const opened = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  await noteService.opened(id);

  res.sendStatus(HttpStatusCode.OK);
});

export default {
  getPreviews,
  getRecent,
  getById,
  editById,
  add,
  removeById,
  opened,
  getAll,
};
