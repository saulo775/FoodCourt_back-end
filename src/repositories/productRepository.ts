import { prisma } from '../config/database.js';
import { ICreateProduct } from './../services/productService.js';

async function insert(productData: ICreateProduct) {
    console.log(typeof productData.categoryId)
    const product = await prisma.product.create({
        data: {
            title: productData.title,
            price: productData.price,
            description: productData.description,
            productImage: productData.productImage,
            categoryId: Number(productData.categoryId),
        }
    });

    console.log("hello", product);
}

async function findByTitle(title: string) {
    const product = await prisma.product.findFirst({
        where: {
            title: title
        }
    });
    return product;
}

async function findAll(categoryId: number) {
    const products = await prisma.product.findMany({
        where: {
            categoryId: categoryId
        }
    });
    return products;
}

async function findById(productId: number) {
    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    });

    return product;
}



const productRepository = {
    insert,
    findByTitle,
    findAll,
    findById
}
export default productRepository;

