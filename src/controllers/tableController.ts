import { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import tableService from "../services/tableService.js";

async function insertTables(req: Request, res: Response) {
    const { quantityTables } = req.body;
    if (!quantityTables) throw new AppError("The number of tables was not reported.", 401);
    await tableService.insertTables(Number(quantityTables));
    return res.sendStatus(201);
}


const tableController = {
    insertTables,
}
export default tableController;