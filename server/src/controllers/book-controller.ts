import { RequestHandler } from 'express';
import { Book } from '../models/book.js';
import { FavoriteBook } from '../models/favoriteBook.js';

export const getAllBooks: RequestHandler = async (_req, res) => {
  try {
    const books = await Book.findAll({ include: FavoriteBook });
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, { include: FavoriteBook });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook: RequestHandler = async (req, res) => {
  const { title, authors, description, thumbnail, googleBookId } = req.body;
  const userId = (req.user as any)?.id;

  console.log("AUTH userId:", userId); // ✅ Confirm this logs a number

  try {
    let book = await Book.findOne({ where: { googleBookId } });
    if (!book) {
      book = await Book.create({ title, authors, description, thumbnail, googleBookId });
    }

    const favorite = await FavoriteBook.create({ userId, bookId: book.id });
    res.status(201).json({ book, favorite });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteBookById: RequestHandler = async (req, res) => {
  const { bookId } = req.body; // ✅ Get bookId from body
  const userId = (req.user as any)?.id;

  try {
    const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
    if (!favorite) {
      res.status(404).json({ message: 'Favorite not found' });
      return;
    }
    await favorite.destroy();
    res.status(200).json({ message: 'Book removed from favorites' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const saveFavoriteBook: RequestHandler = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const favorite = await FavoriteBook.create({ userId, bookId });
    res.status(201).json({ message: 'Book saved to favorites', favorite });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavoriteBooks: RequestHandler = async (req, res) => {
  const userId = (req.user as any)?.id;

  try {
    const favorites = await FavoriteBook.findAll({
      where: { userId },
      include: [Book],
    });
    const books = favorites.map(f => f.Book);
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFavoriteBook: RequestHandler = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
    if (!favorite) {
      res.status(404).json({ message: 'Favorite not found' });
      return;
    }
    await favorite.destroy();
    res.json({ message: 'Favorite removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



// import { Request, Response } from 'express';
// import { Book } from '../models/book.js';
// import { FavoriteBook } from '../models/favoriteBook.js';

// export const getAllBooks = async (_req: Request, res: Response) => {
//   try {
//     const books = await Book.findAll();
//     res.json(books);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getBookById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const book = await Book.findByPk(id);
//     book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createBook = async (req: Request, res: Response) => {
//   const { title, authors, description, thumbnail, googleBookId } = req.body;
//   const userId = (req.user as any)?.id;

//   try {
//     let book = await Book.findOne({ where: { googleBookId } });
//     if (!book) {
//       book = await Book.create({ title, authors, description, thumbnail, googleBookId });
//     }

//     const favorite = await FavoriteBook.create({ userId, bookId: book.id });
//     res.status(201).json({ book, favorite });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const deleteBookById = async (req: Request, res: Response) => {
//   const bookId = parseInt(req.params.id);
//   const userId = (req.user as any)?.id;

//   try {
//     const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
//     if (!favorite) {
//       return res.status(404).json({ message: 'Favorite not found' });
//     }
//     await favorite.destroy();
//     return res.status(200).json({ message: 'Book removed from favorites' });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const saveFavoriteBook = async (req: Request, res: Response) => {
//   const { userId, bookId } = req.body;

//   try {
//     const favorite = await FavoriteBook.create({ userId, bookId });
//     res.status(201).json({ message: 'Book saved to favorites', favorite });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getFavoriteBooks = async (req: Request, res: Response) => {
//   const userId = (req.user as any)?.id;

//   try {
//     const favorites = await FavoriteBook.findAll({
//       where: { userId },
//       include: [Book],
//     });
//     const books = favorites.map(f => f.Book);
//     res.json(books);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteFavoriteBook = async (req: Request, res: Response) => {
//   const { userId, bookId } = req.body;
//   try {
//     const favorite = await FavoriteBook.findOne({ where: { userId, bookId } });
//     if (!favorite) {
//       return res.status(404).json({ message: 'Favorite not found' });
//     }
//     await favorite.destroy();
//     return res.json({ message: 'Favorite removed' });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };
