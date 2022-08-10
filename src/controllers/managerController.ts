import { Request, Response } from "express";
import tableService from "../services/tableService.js";

async function insertTables(req: Request, res: Response) {
    const { quantityTables } = req.body;
    await tableService.insertTables(Number(quantityTables));

    return res.sendStatus(201);
}


const managerController = {
    insertTables,
}
export default managerController;