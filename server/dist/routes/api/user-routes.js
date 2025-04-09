import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, } from '../../controllers/user-controller.js';
const router = express.Router();
/**
 * GET /users
 * Get all users (excluding passwords).
 */
router.get('/', getAllUsers);
/**
 * GET /users/:id
 * Get a specific user by ID (excluding password).
 */
router.get('/:id', getUserById);
/**
 * POST /users
 * Create a new user with username and password.
 */
router.post('/', createUser);
/**
 * PUT /users/:id
 * Update a user's username and/or password by ID.
 */
router.put('/:id', updateUser);
/**
 * DELETE /users/:id
 * Delete a user by ID.
 */
router.delete('/:id', deleteUser);
export { router as userRouter };
