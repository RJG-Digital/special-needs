import express from 'express';
const router = express.Router();
import { createStudent, getStudent, getStudents } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/',protect, createStudent);
router.get('/company/:companyId',protect, getStudents);
router.get('/:id',protect, getStudent);

export default router;