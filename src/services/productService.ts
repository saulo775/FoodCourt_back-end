import { Product } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import categoryRepository from "../repositories/categoryRepository.js";
import productRepository from "../repositories/productRepository.js";

export type ICreateProduct = Omit<Product, "id" | "createdAt">

async function createProduct(productData: ICreateProduct) {
    await checkIfCategoryExists(productData.categoryId);
    await checkIfProductExists(productData.title);
    const newPrice = productData.price * 100;
    productData.price = newPrice;
    await productRepository.insert(productData);
}

const checkIfCategoryExists = async (categoryId: number) => {
    const category = await categoryRepository.findById(categoryId);
    if (!category) throw new AppError("Category no exists", 404);
}

const checkIfProductExists = async (title: string) => {
    const product = await productRepository.findByTitle(title);
    if (product) throw new AppError(`${title} already exists`, 404);
}

const productService = {
    createProduct
}
export default productService;