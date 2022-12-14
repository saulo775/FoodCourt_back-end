import { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import tableService from "../services/tableService.js";

async function insertTables(req: Request, res: Response) {
    const { quantityTables } = req.body;
    if (!quantityTables) throw new AppError("The number of tables was not reported.", 401);
    await tableService.insertTables(Number(quantityTables));
    return res.sendStatus(201);
}

async function allTables(req: Request, res: Response) {
    const tables = await tableService.findTables();

    return res.status(200).send(tables);
}

const tableController = {
    insertTables,
    allTables
}
export default tableController;