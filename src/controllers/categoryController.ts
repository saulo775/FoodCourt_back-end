import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";

async function createCategory(req: Request, res: Response) {
    const { title } = req.body;
    await categoryService.createCategory(title);
    res.sendStatus(201);
}

const categoryController = {
    createCategory
}

export default categoryController;