import { Router } from "express";
import orderController from "../controllers/orderController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const orderRouter = Router();
orderRouter.post("/order", tokenMiddleware, orderController.createOrder);
orderRouter.get("/order/cashier/:tableId", tokenMiddleware, orderController.getAllOrders);
orderRouter.post("/order/cashier/close-account/:tableId", tokenMiddleware, orderController.closeAccount);

export default orderRouter;