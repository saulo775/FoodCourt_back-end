import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function schemaValidatorMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(422).send({ error: validation.error.message });
        }

        next();
    }
}