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
    delete userData.user.createdAt;
    delete userData.user.password;
    return res.status(200).send(userData);
}

const userController = {
    createUser,
    loginUser
}

export default userController;