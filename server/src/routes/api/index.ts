import { Router } from 'express';
import bookRouter from './book-routes.js'; 
import { userRouter } from './user-routes.js'; // ✅ Keep userRouter

const router = Router();

/**
 * Routes for books (Book Club project).
 * - Handles books and favorite books.
 */
router.use('/books', bookRouter);

/**
 * Routes for users.
 * - Handles user CRUD (create, read, update, delete).
 */
router.use('/users', userRouter);

export default router;
