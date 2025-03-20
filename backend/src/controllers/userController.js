import { UserService } from "../services/userService.js";

const userService = new UserService();

export class UserController{
  
  async updateUser(req, res) {
    
    try {
        const userId = req.params.id;
        const loggedInUserId = req.user.userId; // Extracted from JWT middleware
        const updateData = req.body;

        const updatedUser = await userService.updateUser(userId, updateData, loggedInUserId);
        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }


  async deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const loggedInUserId = req.user.userId; 

        const response = await userService.deleteUser(userId, loggedInUserId, res);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }
}
