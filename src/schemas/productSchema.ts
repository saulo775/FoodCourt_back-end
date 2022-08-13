import Joi from "joi";
import { ICreateProduct } from "../services/productService";
const REG_AVATAR = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/


export const createProductSchema = Joi.object<ICreateProduct>({
    title: Joi.string().min(4).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().min(10).required(),
    productImage: Joi.string().pattern(REG_AVATAR),
    categoryId: Joi.number().positive().required()
})