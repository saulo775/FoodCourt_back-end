import { Router } from "express";
import userRouter from "./userRouter.js";
import tableRouter from "./tableRouter.js";
import productsRouter from "./productsRouter.js";
import categoryRouter from "./categoryRouter.js";
import orderRouter from "./orderRouter.js";

const routes = Router();
routes.use(userRouter);
routes.use(tableRouter);
routes.use(productsRouter);
routes.use(categoryRouter);
routes.use(orderRouter);

export default routes;