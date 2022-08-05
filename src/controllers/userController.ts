import { Request, Response } from "express";
import userService, { ICreateUser } from './../services/userService.js';

async function createUser(req: Request, res: Response) {
    const userData: ICreateUser = req.body;
    await userService.createUser(userData);
    res.sendStatus(201);
}

const userController = {
    createUser
}

export default userController;