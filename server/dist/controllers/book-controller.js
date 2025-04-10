import { Book } from '../models/book.js';
import { FavoriteBook } from '../models/favoriteBook.js';
export const getAllBooks = async (_req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByPk(id);
        book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createBook = async (req, res) => {
    const { title, authors, description, thumbnail, googleBookId } = req.body;
    const userId = req.user?.id;
    try {
        let book = await Book.findOne({ where: { googleBookId } });
        if (!book) {
            book = await Book.create({ title, authors, description, thumbnail, googleBookId });
        }
        const favorite = await FavoriteBook.create({ userId, bookId: book.id });
        res.status(201).json({ book, favorite });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getFavoriteBooks = async (req, res) => {
    const userId = req.user?.id;
    try {
        const favorites = await FavoriteBook.findAll({
            where: { userId },
            include: [{ model: Book }],
        });
        const books = favorites.map(f => f.Book);
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    const userId = req.user?.id;
    try {
        const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
        if (!favorite) {
            res.status(404).json({ message: 'Favorite not found' });
            return;
        }
        res.status(200).json({ message: 'Book removed from favorites' });
        return;
        res.status(200).json({ message: 'Book removed from favorites' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
