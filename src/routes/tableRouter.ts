import { Router } from "express";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { managerMiddleware } from "../middlewares/permissionMiddleware.js";
import tableController from "../controllers/tableController.js";

const tableRouter = Router();
tableRouter.use(tokenMiddleware);

tableRouter.post(
    "/tables/:managerId/insert",
    managerMiddleware,
    tableController.insertTables
);

export default tableRouter;