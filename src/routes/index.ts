import { Router } from "express";
import userRouter from "./userRouter.js";
import managerRouter from "./managerRouter.js";
import waiterRouter from "./waiterRouter.js";
import productsRouter from "./productsRouter.js";
import categoryRouter from "./categoryRouter.js";

const routes = Router();
routes.use(userRouter);
routes.use(managerRouter);
routes.use(waiterRouter);
routes.use(productsRouter);
routes.use(categoryRouter);

export default routes;