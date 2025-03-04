import { Router } from 'express';
import noteController from '../../controllers/note.controller';

const noteRoutes = Router();

noteRoutes.route('/').post(noteController.add);
noteRoutes.route('/recent').get(noteController.getRecent); // Fixed duplicate method and updated to match API spec
noteRoutes.route('/all').get(noteController.getAll);
noteRoutes.route('/all/previews').get(noteController.getPreviews);
noteRoutes.route('/:id').get(noteController.getById);
noteRoutes.route('/:id').put(noteController.editById);
noteRoutes.route('/:id').delete(noteController.removeById);
noteRoutes.route('/opened/:id').put(noteController.opened);

export default noteRoutes;
