import { Router } from 'express';
import { bookRouter } from './book-routes.js';
import { userRouter } from './user-routes.js';
const router = Router();
router.use('/books', bookRouter);
router.use('/users', userRouter);
export default router;
