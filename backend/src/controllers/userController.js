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


  async blockUser(req, res) {
    try {
        const { targetUserId } = req.body;
        const userId = req.user.userId;

        const updatedUser = await userService.blockUser(userId, targetUserId);
        res.status(200).json({ message: "User blocked successfully", blockedUsers: updatedUser.blockedUsers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }


  async unblockUser(req, res) {
    try {
        const { targetUserId } = req.body;
        const userId = req.user.userId;

        const updatedUser = await userService.unblockUser(userId, targetUserId);
        res.status(200).json({ message: "User unblocked successfully", blockedUsers: updatedUser.blockedUsers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }
}
