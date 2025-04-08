import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

/**
 * POST /login
 * Authenticate a user and return a JWT token.
 */
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.status(401).json({ message: 'Invalid password' });
      } else {
        const token = jwt.sign(
          { username: user.username }, // Payload inside token
          process.env.JWT_SECRET as string, // Secret key
          { expiresIn: '1h' } // Token expiration time
        );

        res.json({ token });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Route for logging in a user
router.post('/login', login);

export default router;
