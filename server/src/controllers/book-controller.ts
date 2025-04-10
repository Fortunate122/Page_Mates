import { Request, Response } from 'express';
import { Book } from '../models/book.js';
import { FavoriteBook } from '../models/favoriteBook.js';

export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { title, authors, description, thumbnail, googleBookId } = req.body;
  try {
    const newBook = await Book.create({ title, authors, description, thumbnail, googleBookId });
    res.status(201).json(newBook);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const saveFavoriteBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  try {
    const favorite = await FavoriteBook.create({ userId, bookId });
    res.status(201).json(favorite);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFavoriteBooks = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const favorites = await FavoriteBook.findAll({ where: { userId } });
    res.json(favorites);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFavoriteBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  try {
    const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    await favorite.destroy();
    return res.json({ message: 'Favorite removed' }); // Explicit return added
  } catch (error: any) {
    return res.status(500).json({ message: error.message }); // Explicit return added
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.destroy();
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
