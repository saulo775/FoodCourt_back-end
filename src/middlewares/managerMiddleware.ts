import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import userRepository from '../repositories/userRepository.js';


export async function managerMiddleware(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await userRepository.findById(Number(id));
    if (user.permission !== 'gerente') throw new AppError(`${user.permission} cannot perform this action`, 403);

    next();
}