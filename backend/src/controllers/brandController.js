import { BrandService } from "../services/brandService.js";

const brandService = new BrandService();

export class BrandController{

  async createBrand(req, res) {
    try {
        const { brandName, categories } = req.body;
        const brandLogo = req.file ? req.file.path : null;

        if (!brandLogo) throw new Error('Brand logo is required');

        const brand = await brandService.createBrand({ brandName, brandLogo, categories: JSON.parse(categories) });

        res.status(201).json({ message: "Brand created successfully", brand });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  async getAllBrands(req, res) {
      try {
          const brands = await brandService.getAllBrands();
          res.status(200).json(brands);
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
}
