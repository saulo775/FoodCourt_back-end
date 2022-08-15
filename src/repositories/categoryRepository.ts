import { prisma } from "../config/database.js";

async function insert(title: string) {
    await prisma.category.create({
        data: {
            title: title
        }
    });
}

async function findOne(title: string) {
    const category = await prisma.category.findFirst({
        where: { title: title }
    });
    return category;
}

async function findById(categoryId: number) {
    const category = await prisma.category.findFirst({
        where: {
            id: categoryId
        }
    });
    return category;
}

async function findAll() {
    const categories = await prisma.category.findMany({});
    return categories;
}

const categoryRepository = {
    insert,
    findOne,
    findById,
    findAll
}
export default categoryRepository;