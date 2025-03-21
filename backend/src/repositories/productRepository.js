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

  // async findAllProducts(blockedUserIds, filters = {}) {
  //   return await Product.find({
  //                   addedBy: { $nin: blockedUserIds }, // Exclude products from users who blocked this user
  //                   ...filters
  //                 }).populate("addedBy", "username email");
  // }

  async findAllProducts(blockedUserIds, filters = {}, sortField = "price", sortOrder = "asc") {
    const query = { addedBy: { $nin: blockedUserIds }, ...filters };

    const sortOptions = {};
    if (["price", "productName"].includes(sortField)) {
        sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
    }

    return await Product.find(query)
        .sort(sortOptions)
        .populate("addedBy", "username email");
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

