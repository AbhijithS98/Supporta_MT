import { UserRepository } from "../repositories/userRepository.js";

const userRepository = new UserRepository();

export class UserService{

  async updateUser(userId, updateData, loggedInUserId) {
    if (userId !== loggedInUserId) {
        throw new Error("You can only update your own profile.");
    }

    const updatedUser = await userRepository.updateUser(userId, updateData);
    if (!updatedUser) throw new Error("User not found.");

    return updatedUser;
  }


  async deleteUser(userId, loggedInUserId, res) {
    if (userId !== loggedInUserId) {
        throw new Error("You can only delete your own profile.");
    }

    const deletedUser = await userRepository.deleteUser(userId);
    if (!deletedUser) throw new Error("User not found.");

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    return { message: "User deleted successfully and logged out." };
}
}