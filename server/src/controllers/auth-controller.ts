import { Request, Response } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User signup - register
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ message: 'Username already taken' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
 
// User login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error: any) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};