import express from 'express';
const router = express.Router();
import {getCompanies, createCompany} from '../controllers/companyController.js';

router.post('/', createCompany);
router.get('/', getCompanies);
export default router;