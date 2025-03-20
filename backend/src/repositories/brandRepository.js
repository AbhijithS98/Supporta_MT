import Brand from "../models/brandModel.js";

export class BrandRepository{

  async createBrand(data) {
    return await Brand.create(data);
  }

  async getAllBrands() {
    return await Brand.find();
  }

  async findBrandByName(brandName) {
    return await Brand.findOne({ brandName });
  }
}

