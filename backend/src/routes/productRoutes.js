import express from 'express';
import { ProductController } from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const productController = new ProductController();
const router = express.Router();

router.post("/add-product", authMiddleware, upload.single("productImage"), productController.createProduct);
router.get("/list-products", authMiddleware, productController.getAllProducts);
router.get("/my-products", authMiddleware, productController.getUserProducts);
router.put("/update/:id", authMiddleware, productController.updateProduct);
router.delete("/delete/:id", authMiddleware, productController.deleteProduct);


export default router;
