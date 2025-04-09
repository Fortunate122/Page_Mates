import { User } from '../models/user.js';
import { sendEmail } from '../utils/sendEmail.js'; // ✅ Import sendEmail function
/**
 * GET /users
 * Fetch all users (excluding their passwords).
 */
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * GET /users/:id
 * Fetch a single user by their ID (excluding password).
 */
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * POST /users
 * Create a new user with username and password, then send a welcome email.
 */
export const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        // ✅ Send welcome email after user is created
        await sendEmail('receiver@example.com', // Replace with newUser.email if you collect email addresses
        'Welcome to Page Mates Book Club!', `<p>Hi ${username}, welcome to the Page Mates Book Club! 📚✨</p>`);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/**
 * PUT /users/:id
 * Update an existing user's username and/or password.
 */
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.username = username;
            user.password = password;
            await user.save();
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
/**
 * DELETE /users/:id
 * Delete a user by their ID.
 */
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
