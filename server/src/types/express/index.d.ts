// Whenever you use authenticateToken and access req.user.
// this file It extends the built-in Express Request type to tell TypeScript that req.user exists and is safe to use.

declare namespace Express {
    interface Request {
      user?: {
        username: string;
      };
    }
  }
