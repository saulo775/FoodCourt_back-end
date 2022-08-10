import { Router } from "express";
import managerRouter from "./managerRouter.js";
import userRouter from "./userRouter.js";

const routes = Router();
routes.use(userRouter);
routes.use(managerRouter);


export default routes;