import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@prisma/client"
import { AppError } from "../errors/AppError.js";
import userRepository from "../repositories/userRepository.js";

export type ICreateUser = Omit<User, "id" | "createdAt">;
export interface ILoginUser {
    email: string;
    password: string;
}

async function createUser(userData: ICreateUser) {
    await verifyTypeUser(userData.permission);
    await verifyIfAlreadyExistsByEmail(userData.email);
    const pwdHash = await hashPassword(userData.password);
    userData.password = pwdHash;
    await userRepository.insert(userData);
}

async function loginUser(loginData: ILoginUser) {
    const user = await userRepository.findByEmail(loginData.email);
    if (!user) throw new AppError("User not found", 404);
    const comparation = await comparePassword(loginData.password, user.password);
    if (!comparation) throw new AppError("Password Incorrect", 401);
    const token = generateToken(user.id);
    return { user, token };
}

const verifyTypeUser = async (permission: string) => {
    if (permission === "gerente") {
        const user = await userRepository.findByPermission("gerente");
        if (user) throw new AppError("The manager position is already taken", 409);
    }
}

const verifyIfAlreadyExistsByEmail = async (email: string) => {
    const user = await userRepository.findByEmail(email);
    if (user) throw new AppError("User Already Exists", 409);
}

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

const comparePassword = async (password: string, dbPassword: string) => {
    const pwd = await bcrypt.compare(password, dbPassword);
    return pwd
}

const generateToken = (userId: number) => {
    const data = { userId };
    const secret = process.env.JWT_SECRET;
    const config = { expiresIn: process.env.JWT_EXPIRATION || '1d' };
    const token = jwt.sign(data, secret, config);
    return token;
}

const userService = {
    createUser,
    loginUser
}

export default userService;

