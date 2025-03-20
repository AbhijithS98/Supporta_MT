import express from 'express';
import { AuthController } from '../controllers/authController.js';

const authController = new AuthController();

const router = express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/refresh-token',authController.refreshToken);
router.post('/logout',authController.logout);

export default router;