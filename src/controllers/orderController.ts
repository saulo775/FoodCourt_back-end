import { Request, Response } from "express";
import orderService from "../services/orderService.js";

async function createOrder(req: Request, res: Response) {
    const { productsOrder, table } = req.body;
    await orderService.createOrder(productsOrder, table);

    res.sendStatus(201);
}

async function getAllOrders(req: Request, res: Response) {
    const { tableId } = req.params;
    const allOrders = await orderService.getAllOrders(Number(tableId));
    res.send(allOrders);
}

async function closeAccount(req: Request, res: Response) {
    const { tableId } = req.params;
    await orderService.closeAccount(Number(tableId));
    res.send(200);
}

const orderController = {
    createOrder,
    getAllOrders,
    closeAccount
}
export default orderController;