import Joi from "joi";
const REG_AVATAR = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

export const userSchema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    avatarURL: Joi.string().pattern(REG_AVATAR),
    permission: Joi.string().valid('gerente', 'caixa', 'garçon')
})