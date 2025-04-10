import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Define a custom JwtPayload interface extending jwt's default.
 */
interface JwtPayload {
  username: string;
}

// Extend Express Request to include user field
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware to authenticate JWT.
 * Verifies token in Authorization header and attaches decoded user.
 */
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
    return;
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}
// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

//   if (!token) {
//     res.status(401).json({ message: 'Access token missing' }); // If no token provided
//   } else {
//     try {
//       const secret = process.env.JWT_SECRET as string; // Use JWT secret from .env
//       const decoded = jwt.verify(token, secret) as JwtPayload;

//       req.user = decoded; // Add user info to request
//       next(); // ✅ Call next middleware
//     } catch (error) {
//       res.status(403).json({ message: 'Invalid or expired token' }); // If token invalid
//     }
//   }
// };
