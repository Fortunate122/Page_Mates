import { User } from '../models/user.js';
import { sendEmail } from '../utils/sendEmail.js';
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
export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create({ username, email, password });
        await sendEmail(email, 'Welcome to Page Mates Book Club!', `<p>Hi ${username}, welcome to the Page Mates Book Club! 📚✨</p>`);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            if (username)
                user.username = username;
            if (email)
                user.email = email;
            if (password)
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
