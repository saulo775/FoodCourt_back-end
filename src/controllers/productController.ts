import { Request, Response } from "express";
import productService, { ICreateProduct } from '../services/productService.js';

async function createProduct(req: Request, res: Response) {
    const productData: ICreateProduct = req.body;

    //console.log(productData)
    await productService.createProduct(productData);
    res.sendStatus(201);
}

async function allProducts(req: Request, res: Response) {
    const { categoryId } = req.params;
    const products = await productService.findAllProducts(Number(categoryId));

    return res.status(200).send(products);
}

const productsController = {
    createProduct,
    allProducts
}

export default productsController;