import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from '../src/routes/authRoutes.js';
import userRoutes from '../src/routes/userRoutes.js';
import brandRoutes from '../src/routes/brandRoutes.js';
import productRoutes from '../src/routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(cors({ origin: '*', credentials:true }));

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/brand',brandRoutes);
app.use('/api/product',productRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

