import { Request, Response } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register new user
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

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username }, // ✅ include `id`
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Login existing user
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  console.log('Login attempt for username:', username); // 👈 log username

  try {
    const user = await User.findOne({ where: { username } });

<<<<<<< HEAD
    if (!user || !(await bcrypt.compare(password, user.password))) {
=======
    if (!user) {
      console.log('❌ No user found for username:', username); // 👈 log user not found
>>>>>>> 3f98e9ee09bea9fa2945c67647e1ad50c052bb85
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

<<<<<<< HEAD
    const token = jwt.sign(
      { id: user.id, username: user.username }, // ✅ include `id`
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
=======
    console.log('✅ User found:', user.username); // 👈 log user found
    console.log('🔒 Stored hashed password:', user.password); // 👈 log hashed password in db

    const validPassword = await bcrypt.compare(password, user.password);

    console.log('🔑 Password valid:', validPassword); // 👈 log whether password matched

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
>>>>>>> 3f98e9ee09bea9fa2945c67647e1ad50c052bb85

    res.json({ token });
  } catch (error: any) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: error.message });
  }
};
