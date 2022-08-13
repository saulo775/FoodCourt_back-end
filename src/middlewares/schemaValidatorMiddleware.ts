import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { AppError } from "../errors/AppError.js";

export function schemaValidatorMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            throw new AppError(`${validation.error.message}`, 422);
        }

        next();
    }
}