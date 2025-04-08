import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import emailRoutes from './email';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public auth routes (login, register)
router.use('/auth', authRoutes);

// Protected API routes (books, users)
router.use('/api', authenticateToken, apiRoutes);

// Protected email route
router.use('/api/email', emailRoutes);

export default router;




// import { Router } from 'express';
// import authRoutes from './auth-routes.js';
// import apiRoutes from './api/index.js';
// import { authenticateToken } from '../middleware/auth.js';

// const router = Router();

// /**
//  * Routes for authentication (login).
//  * - These do not need a token.
//  */
// router.use('/auth', authRoutes);

// /**
//  * Routes for API (books, users).
//  * - These are protected and require a valid JWT token.
//  */
// router.use('/api', authenticateToken, apiRoutes);

// export default router;
