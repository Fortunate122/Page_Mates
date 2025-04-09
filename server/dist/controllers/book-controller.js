import { Book } from '../models/book.js';
import { FavoriteBook } from '../models/favoriteBook.js';
/**
 * GET /books
 * Fetch all saved books from the database.
 */
export const getAllBooks = async (_req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * GET /books/:id
 * Fetch a single book by its ID from the database.
 */
export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * POST /books
 * Save a new book to the database.
 */
export const createBook = async (req, res) => {
    const { title, authors, description, thumbnail, googleBookId } = req.body;
    try {
        const newBook = await Book.create({ title, authors, description, thumbnail, googleBookId });
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/**
 * POST /favorites
 * Save a book as a user's favorite.
 */
export const saveFavoriteBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const favorite = await FavoriteBook.create({ userId, bookId });
        res.status(201).json(favorite);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/**
 * GET /favorites/:userId
 * Fetch all favorite books for a specific user.
 */
export const getFavoriteBooks = async (req, res) => {
    const { userId } = req.params;
    try {
        const favorites = await FavoriteBook.findAll({ where: { userId } });
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * DELETE /favorites
 * Remove a book from a user's favorites.
 */
export const deleteFavoriteBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
        if (favorite) {
            await favorite.destroy();
            res.json({ message: 'Favorite removed' });
        }
        else {
            res.status(404).json({ message: 'Favorite not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
