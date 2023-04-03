import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

export default router;