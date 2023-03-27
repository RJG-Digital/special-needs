import express from 'express';
const router = express.Router();
import {
    registerUser,
    registerFirstUser,
    loginUser,
    getMe,
    forgotPassword,
    resetPassword,
    test
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/registerfirstuser', registerFirstUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', protect, resetPassword);

router.get('/', test);
export default router;