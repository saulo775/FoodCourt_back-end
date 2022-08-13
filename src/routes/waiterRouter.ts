import { Router } from "express";

import waiterController from "../controllers/waiterController.js";

const waiterRouter = Router();

waiterRouter.get("/waiter/:id/tables", waiterController.allTables)

export default waiterRouter;