import express from 'express';
const router = express.Router();
import { createNote, getNotes,getNoteById, updateNote, deleteNote } from '../controllers/notesController.js';
router.get('/', getNotes);
router.get('/:id',getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
export default router;