import express from 'express';
import { BrandController } from '../controllers/brandController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const brandController = new BrandController();
const router = express.Router();

router.post('/add-brand', authMiddleware, upload.single('brandLogo'), brandController.createBrand); 
router.get('/list-brands', brandController.getAllBrands); 

export default router;