import express from 'express';
import { sendEmail } from '../utils/sendEmail';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Protect this route with JWT auth
router.post('/', authenticateToken, async (req, res) => {
  const { to, book } = req.body;

  if (!to || !book || !book.title) {
    res.status(400).json({ message: 'Missing required email or book data.' });
    return; // Explicitly return void
  }

  const html = `
    <div>
      <h2>Book Recommendation</h2>
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author(s):</strong> ${book.authors?.join(', ')}</p>
      ${book.thumbnail ? `<img src="${book.thumbnail}" alt="${book.title}" style="height: 120px;"/>` : ''}
    </div>
  `;

  try {
    const result = await sendEmail(to, `Book Recommendation: ${book.title}`, html);
    res.json({ message: 'Email sent successfully.', result });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email.', error: err });
  }
});

export default router;