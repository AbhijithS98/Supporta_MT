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
}


