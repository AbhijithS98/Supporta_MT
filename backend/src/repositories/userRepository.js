import User from '../models/userModel.js';

export class UserRepository {
    
    async createUser(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(id) {
        return await User.findById(id);
    }

    async updateUser(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async blockUser(userId, targetUserId) {
        return await User.findByIdAndUpdate(
            userId,
            { $addToSet: { blockedUsers: targetUserId } }, 
            { new: true }
        );
    }

    async unblockUser(userId, targetUserId) {
        return await User.findByIdAndUpdate(
            userId,
            { $pull: { blockedUsers: targetUserId } }, 
            { new: true }
        );
    }


    async findBlockedByUsers(userId) {
        return await User.find({ blockedUsers: userId }).select("_id"); 
    }
}


