import { BrandRepository } from "../repositories/brandRepository.js";

const brandRepository = new BrandRepository();

export class BrandService{

  async createBrand({ brandName, brandLogo, categories }) {
    const existingBrand = await brandRepository.findBrandByName(brandName);
    if (existingBrand) throw new Error("Brand already exists");

    return await brandRepository.createBrand({ brandName, brandLogo, categories });
  }

  async getAllBrands() {
    return await brandRepository.getAllBrands();
  }

}