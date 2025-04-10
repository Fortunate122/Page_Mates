import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById,
  saveFavoriteBook,
  getFavoriteBooks,
  deleteFavoriteBook,
} from '../../controllers/book-controller.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.delete('/:id', deleteBookById);

// Favorites
router.post('/favorites', saveFavoriteBook);
router.get('/favorites', getFavoriteBooks);
router.delete('/favorites/:id', deleteFavoriteBook);

export default router;