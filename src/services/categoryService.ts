import { Category } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import categoryRepository from "../repositories/categoryRepository.js";

export type ICreateCategory = Omit<Category, "id" | "createdAt">

async function createCategory(title: string) {
    await checkIfCategoryExists(title);
    await categoryRepository.insert(title);
}

const checkIfCategoryExists = async (title: string) => {
    const category = await categoryRepository.findOne(title);
    if (category) throw new AppError("Category already exists", 409);
}

const categoryService = {
    createCategory
}
export default categoryService;