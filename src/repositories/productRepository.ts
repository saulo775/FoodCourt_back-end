import { prisma } from '../config/database.js';
import { ICreateProduct } from './../services/productService.js';

async function insert(productData: ICreateProduct) {
    await prisma.product.create({
        data: productData
    });
}

async function findByTitle(title: string) {
    const product = await prisma.product.findFirst({
        where: {
            title: title
        }
    });
    return product;
}




const productRepository = {
    insert,
    findByTitle
}
export default productRepository;

