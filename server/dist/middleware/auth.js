import jwt from 'jsonwebtoken';
/**
 * Middleware to authenticate a user's JWT token.
 * - Checks for the token in the Authorization header.
 * - Verifies the token.
 * - Attaches decoded user info to the request object.
 */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        res.status(401).json({ message: 'Access token missing' }); // If no token provided
    }
    else {
        try {
            const secret = process.env.JWT_SECRET; // Use JWT secret from .env
            const decoded = jwt.verify(token, secret);
            req.user = decoded; // Add user info to request
            next(); // ✅ Call next middleware
        }
        catch (error) {
            res.status(403).json({ message: 'Invalid or expired token' }); // If token invalid
        }
    }
};
