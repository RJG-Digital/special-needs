import express from 'express';
const router = express.Router();
import { createStudent, getStudent, getStudents } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/',protect, createStudent);
router.get('/:companyId',protect, getStudents);
router.get('/student/:id',protect, getStudent);

export default router;