import { Router } from "express";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { managerMiddleware } from "../middlewares/managerMiddleware.js";
import managerController from "../controllers/managerController.js";

const managerRouter = Router();
managerRouter.use(tokenMiddleware);

managerRouter.post("/manager/:managerId/tables", managerMiddleware, managerController.insertTables);

export default managerRouter;