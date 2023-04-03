import express from 'express';
import { createService, getService, getServices } from '../controllers/companyServiceController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, createService);
router.get('/',protect, getServices);
router.get('/:id', protect, getService);

export default router;