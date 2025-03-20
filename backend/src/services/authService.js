import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {UserRepository} from '../repositories/userRepository.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';

const userRepository = new UserRepository();

export class AuthService {
    async registerUser(username, email, password) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('User already exists');

        const newUser = await userRepository.createUser({ username, email, password });
        return newUser;
    }

    async loginUser(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        return { user, accessToken, refreshToken };
    }


    async refreshToken(oldRefreshToken) {
      if (!oldRefreshToken) throw new Error('Refresh token is required');
      console.log("rt:",oldRefreshToken);
      
      try {
          const decoded = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);
          const user = await userRepository.findById(decoded.userId);
          if (!user) throw new Error('User not found');

          const newAccessToken = generateAccessToken(user._id);
          
          return { accessToken: newAccessToken };
      } catch (error) {
          throw new Error('Invalid or expired refresh token');
      }
  }
}

