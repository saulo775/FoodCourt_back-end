import { Router } from "express";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { managerMiddleware } from "../middlewares/managerMiddleware.js";
import managerController from "../controllers/managerController.js";

const managerRouter = Router();
managerRouter.use(tokenMiddleware);
//managerRouter.use(managerMiddleware);

managerRouter.post("/manager/:id/tables", managerMiddleware, managerController.insertTables);

export default managerRouter;