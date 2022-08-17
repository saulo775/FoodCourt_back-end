import { Router } from "express";
import orderController from "../controllers/orderController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const orderRouter = Router();
orderRouter.post("/order", tokenMiddleware, orderController.createOrder);

export default orderRouter;