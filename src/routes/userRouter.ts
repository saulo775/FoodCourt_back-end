import { Router } from "express";
import userController from "../controllers/userController.js";
import { schemaValidatorMiddleware } from "../middlewares/schemaValidatorMiddleware.js";
import { signUpSchema, signInSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", schemaValidatorMiddleware(signUpSchema), userController.createUser);
userRouter.post("/sign-in", schemaValidatorMiddleware(signInSchema), userController.loginUser);

export default userRouter;