import { Router } from 'express';

const router = Router();

import { isAuthenticated } from '../helpers/auth';

import {
	getNote,
	createNote,
	updateNote,
	deleteNote,
	getAllNotes,
} from '../controllers/noteController';

router.get('/note/:id', isAuthenticated, getNote);

router.get('/notes', isAuthenticated, getAllNotes);

router.post('/update_note/:id', isAuthenticated, updateNote);

router.post('/create_note', isAuthenticated, createNote);

router.delete('/deleate_note/:id', isAuthenticated, deleteNote);

export default router;
