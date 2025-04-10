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

router.get('/', getAllBooks); // GET /api/books
router.get('/:id', getBookById); // GET /api/books/:id
router.post('/', createBook); // POST /api/books
router.delete('/:id', deleteBookById); // DELETE /api/books/:id

// Favorites
router.post('/favorites', saveFavoriteBook); // POST /api/books/favorites
router.get('/favorites/:userId', getFavoriteBooks); // GET /api/books/favorites/:userId
router.delete('/favorites', deleteFavoriteBook); // DELETE /api/books/favorites

export { router as bookRouter };
