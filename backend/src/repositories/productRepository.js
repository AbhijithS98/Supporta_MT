import Product from "../models/productModel.js";

export class ProductRepository{
  async createProduct(productData) {
    return await Product.create(productData);
  }

  async findById(productId) {
    return await Product.findById(productId);
  }

  async findByName(productName) {
    return await Product.findOne({ productName });
  }

  async findAll() {
    return await Product.find().populate("brand addedBy");
  }

  async findByUser(userId) {
    return await Product.find({ addedBy: userId }).populate("brand");
  }

  async updateProduct(productId, updatedData) {
    return await Product.findByIdAndUpdate(productId, updatedData, { new: true });
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
  }
}

