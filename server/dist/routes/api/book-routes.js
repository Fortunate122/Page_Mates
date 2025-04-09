import express from 'express';
import { getAllBooks, getBookById, createBook, saveFavoriteBook, getFavoriteBooks, deleteFavoriteBook, } from '../../controllers/book-controller.js';
const router = express.Router();
/**
 * GET /books
 * Get all saved books from the database.
 */
router.get('/', getAllBooks);
/**
 * GET /books/:id
 * Get a specific book by ID from the database.
 */
router.get('/:id', getBookById);
/**
 * POST /books
 * Save a new book to the database.
 */
router.post('/', createBook);
/**
 * POST /favorites
 * Save a book as a user's favorite.
 */
router.post('/favorites', saveFavoriteBook);
/**
 * GET /favorites/:userId
 * Get all favorite books for a specific user.
 */
router.get('/favorites/:userId', getFavoriteBooks);
/**
 * DELETE /favorites
 * Remove a book from a user's favorites.
 */
router.delete('/favorites', deleteFavoriteBook);
export { router as bookRouter };
