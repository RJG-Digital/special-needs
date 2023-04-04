import express from 'express';
const router = express.Router();
import { createStudent, getStudent, getStudents, deleteStudent, updateStudent } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, createStudent);
router.get('/company/:companyId',protect, getStudents);
router.get('/:id', protect, getStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);
export default router;