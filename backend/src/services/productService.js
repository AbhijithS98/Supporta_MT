import { ProductRepository } from "../repositories/productRepository.js";
import { BrandRepository } from "../repositories/brandRepository.js";

const productRepository = new ProductRepository();
const brandRepository = new BrandRepository();

export class ProductService {

  async createProduct({ productName, description, price, category, brandName, productImage, addedBy }) {

    // Check if product already exists
    const productExists = await productRepository.findByName(productName);
    if (productExists) throw new Error("Product already exist");

    // Check if brand exists
    const brandExists = await brandRepository.findBrandByName(brandName);
    if (!brandExists) throw new Error("Brand does not exist");

    // Check if category exists within brand's categories array
    if (!brandExists.categories.includes(category)) {
      throw new Error(`Category "${category}" is not available under the selected brand`);
    }
    
    const brand = brandExists._id;
    return await productRepository.createProduct({ productName, description, price, category, brand, productImage, addedBy });
  }

  async getAllProducts() {
    return await productRepository.findAll();
  }

  async getUserProducts(userId) {
    return await productRepository.findByUser(userId);
  }

  async updateProduct(productId, userId, updatedData) {
    const product = await productRepository.findById(productId);
    if (!product) throw new Error("Product not found");

    // Only allow the owner to update the product
    if (product.addedBy.toString() !== userId) {
      throw new Error("Unauthorized to update this product");
    }

    return await productRepository.updateProduct(productId, updatedData);
  }

  async deleteProduct(productId, userId) {
    const product = await productRepository.findById(productId);
    if (!product) throw new Error("Product not found");

    // Only allow the owner to delete the product
    if (product.addedBy.toString() !== userId) {
      throw new Error("Unauthorized to delete this product");
    }

    return await productRepository.deleteProduct(productId);
  }
}


