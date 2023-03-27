import express from 'express';
const router = express.Router();
import {
    registerUser,
    loginUser,
    getMe,
    resetPassword,
    test
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/registerfirstuser', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/resetpassword', resetPassword);

router.get('/', test);
export default router;