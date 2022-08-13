import { Router } from "express";
import productsController from "../controllers/productController.js";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidatorMiddleware.js";
import { managerMiddleware } from "../middlewares/managerMiddleware.js"
import { createProductSchema } from './../schemas/productSchema.js';
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const productsRouter = Router();
productsRouter.post(
    "/products/create/:managerId/",
    schemaValidatorMiddleware(createProductSchema),
    managerMiddleware,
    tokenMiddleware,
    productsController.createProduct
);

export default productsRouter;