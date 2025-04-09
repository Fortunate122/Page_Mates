import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public auth routes (login, register)
router.use('/auth', authRoutes);

// Protected API routes (books, users)
router.use(authenticateToken, apiRoutes);

export default router;
