import { Request, Response } from "express";
import productService, { ICreateProduct } from '../services/productService.js';

async function createProduct(req: Request, res: Response) {
    const productData: ICreateProduct = req.body;
    await productService.createProduct(productData);
    res.sendStatus(201);
}

const productsController = {
    createProduct
}

export default productsController;