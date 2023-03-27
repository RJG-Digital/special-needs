import express from 'express';
const router = express.Router();
import {createPrivilege, getPrivileges} from '../controllers/privilegeController.js';

router.post('/', createPrivilege);
router.get('/', getPrivileges);
export default router;