import { AuthService } from "../services/authService.js";

const authService = new AuthService();

export class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await authService.registerUser(username, email, password);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

            
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });

            res.status(200).json({ message: 'Login successful', user, accessToken });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }


    async refreshToken(req, res) {
      try {
          const oldRefreshToken = req.cookies.refreshToken; 
          const { accessToken } = await authService.refreshToken(oldRefreshToken);

          res.status(200).json({ message: 'Token refreshed successfully', accessToken });
      } catch (error) {
          res.status(403).json({ error: error.message });
      }
  }


  async logout(req, res) {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

}


