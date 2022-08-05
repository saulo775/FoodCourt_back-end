import { Router } from "express";
import userController from "../controllers/userController.js";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidatorMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", schemaValidatorMiddleware(userSchema), userController.createUser);

export default userRouter;