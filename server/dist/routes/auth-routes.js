import { Router } from 'express';
import { register, login } from '../controllers/auth-controller.js'; // ✅ Correct import only
const router = Router();
// Route for logging in a user
router.post('/login', login);
// Route for registering a user
router.post('/register', register);
export default router;
