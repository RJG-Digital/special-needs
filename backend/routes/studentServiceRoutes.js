import express from 'express';
import { getServices, upsetService } from '../controllers/studentServiceController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
router.post('/', protect, upsetService);
router.get('/user/:_id',protect, getServices);

export default router;