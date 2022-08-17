import { Request, Response } from "express";
import orderService from "../services/orderService.js";

async function createOrder(req: Request, res: Response) {
    const { productsOrder, table } = req.body;
    await orderService.createOrder(productsOrder, table);

    res.sendStatus(201);
}

const orderController = {
    createOrder
}
export default orderController;