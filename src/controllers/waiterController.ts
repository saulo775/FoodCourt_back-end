import { Request, Response } from "express";
import tableService from "../services/tableService.js";

async function allTables(req: Request, res: Response) {
    const { id } = req.params;
    const tables = await tableService.findTables();

    return res.status(200).send(tables);
}

const waiterController = {
    allTables,

}
export default waiterController;