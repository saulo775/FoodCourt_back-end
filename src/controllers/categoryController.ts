import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";

async function createCategory(req: Request, res: Response) {
    const { title } = req.body;
    await categoryService.createCategory(title);
    res.sendStatus(201);
}

async function findCategories(req: Request, res: Response) {
    const categories = await categoryService.findCategories();

    res.status(200).send(categories);
}

const categoryController = {
    createCategory,
    findCategories
}

export default categoryController;