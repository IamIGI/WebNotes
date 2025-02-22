import noteService from '../services/note.service';
import validateRequestUtil from '../utils/validateRequest.utils';
import catchErrors from '../utils/catchErrors.utils';
import { NoteUpdate } from '../api/api/generated';

const REQUIRED_KEYS: Array<keyof NoteUpdate> = ['bookmark', 'text'];

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

  res.status(200).json(note);
});

const add = catchErrors(async (req, res) => {
  const payload = req.body as NoteUpdate;

  validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);

  const newProduct = await noteService.add(payload);

  res.status(201).json(newProduct);
});

const editById = catchErrors(async (req, res) => {
  const { id } = req.params;
  const payload = req.body as NoteUpdate;

  validateRequestUtil.validateId(id);
  validateRequestUtil.isValidPayload(payload, REQUIRED_KEYS);

  const updatedNote = await noteService.editById(id, payload);
  if (!updatedNote) {
    res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(updatedNote);
});

const removeById = catchErrors(async (req, res) => {
  const { id } = req.params;

  validateRequestUtil.validateId(id);
  await noteService.removeById(id);

  res.status(200).send({ id });
});

export default {
  getPreviews,
  getRecent,
  getById,
  editById,
  add,
  removeById,
};
