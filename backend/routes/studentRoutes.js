import express from 'express';
const router = express.Router();
import { createStudent, getStudent, getStudents, deleteStudent, updateStudent, updateStudentServices, updateStudentServiceMinutes } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, createStudent);
router.put('/minuteUpdate', protect, updateStudentServiceMinutes);
router.put('/:_id/services', protect, updateStudentServices);
router.get('/company/:companyId',protect, getStudents);
router.get('/:id', protect, getStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);
export default router;