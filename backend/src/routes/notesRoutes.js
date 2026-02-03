import express from 'express';
const router = express.Router();
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/notesController.js';
router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
export default router;