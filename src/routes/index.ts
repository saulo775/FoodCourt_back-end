import { Router } from "express";
import managerRouter from "./managerRouter.js";
import userRouter from "./userRouter.js";
import waiterRouter from "./waiterRouter.js";

const routes = Router();
routes.use(userRouter);
routes.use(managerRouter);
routes.use(waiterRouter);

export default routes;