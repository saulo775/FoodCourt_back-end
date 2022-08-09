import { Request, Response } from "express";
import userService, { ICreateUser, ILoginUser } from './../services/userService.js';

async function createUser(req: Request, res: Response) {
    const userData: ICreateUser = req.body;
    await userService.createUser(userData);
    res.sendStatus(201);
}

async function loginUser(req: Request, res: Response) {
    const loginData: ILoginUser = req.body;
    const userData = await userService.loginUser(loginData);
    res.locals.user = userData.user;
    const token = userData.token;
    return res.status(200).json({ token });
}

const userController = {
    createUser,
    loginUser
}

export default userController;