import express from 'express';
const router = express.Router();
import {getCompanies, createCompany, getCompany} from '../controllers/companyController.js';

router.post('/', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompany);
export default router;