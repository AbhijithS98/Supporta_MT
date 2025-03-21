import express from 'express';
import { UserController } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userController = new UserController();

const router = express.Router();


router.put('/profile/:id', authMiddleware, userController.updateUser);
router.delete('/profile/:id', authMiddleware, userController.deleteUser);
router.post("/block", authMiddleware, userController.blockUser);
router.post("/unblock", authMiddleware, userController.unblockUser);


export default router;
