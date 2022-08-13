import Joi from "joi";

export const createCategorySchema = Joi.object({
    title: Joi.string().min(4).required()
})