import { Category } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import categoryRepository from "../repositories/categoryRepository.js";

export type ICreateCategory = Omit<Category, "id" | "createdAt">

async function createCategory(title: string) {
    await checkIfCategoryExists(title);
    await categoryRepository.insert(title);
}

async function findCategories() {
    const categories = await categoryRepository.findAll();
    categories.forEach((category) => {
        delete category.createdAt
    });
    return categories;
}

const checkIfCategoryExists = async (title: string) => {
    const category = await categoryRepository.findOne(title);
    if (category) throw new AppError("Category already exists", 409);
}

const categoryService = {
    createCategory,
    findCategories,
}
export default categoryService;