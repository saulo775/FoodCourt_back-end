import { Router } from "express";

import { schemaValidatorMiddleware } from "../middlewares/schemaValidatorMiddleware.js";
import { createCategorySchema } from './../schemas/categorySchema.js';
import { managerMiddleware } from "../middlewares/managerMiddleware.js"
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import categoryController from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.post(
    "/category/create/:managerId/",
    schemaValidatorMiddleware(createCategorySchema),
    managerMiddleware,
    tokenMiddleware,
    categoryController.createCategory
);

export default categoryRouter;