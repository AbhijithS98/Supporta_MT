import { ProductService } from "../services/productService.js";

const productService = new ProductService();

export class ProductController{
  
  async createProduct(req, res) {
    try {
      const { productName, description, price, category, brandName } = req.body;
      const productImage = req.file ? req.file.path : null;
  
      const newProduct = await productService.createProduct({
        productName,
        description,
        price,
        category,
        brandName,
        productImage,
        addedBy: req.user.userId, 
      });
  
      res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



  async getAllProducts(req, res) {
    try {
        const userId = req.user.userId;
        const { category, sortField = "price", sortOrder = "asc" } = req.query;

        const filters = {};
        if (category) filters.category = category;

        const products = await productService.getAllProducts(userId, filters, sortField, sortOrder);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


  async getUserProducts(req, res) {
    try {
      const products = await productService.getUserProducts(req.user.userId);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  async updateProduct(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.user.userId, req.body);
      res.status(200).json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  async deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.params.id, req.user.userId);
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


}