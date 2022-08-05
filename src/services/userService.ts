import { User } from "@prisma/client"
import { AppError } from "../errors/AppError.js";
import userRepository from "../repositories/userRepository.js";

export type ICreateUser = Omit<User, "id" | "createdAt">;

async function createUser(userData: ICreateUser) {
    await verifyTypeUser(userData.permission);
    await verifyIfAlreadyExistsByEmail(userData.email);
    await userRepository.insert(userData);
}

const verifyTypeUser = async (permission: string) => {
    if (permission === "gerente") {
        const user = await userRepository.findByPermission("gerente");
        if (user) {
            throw new AppError("The manager position is already taken", 409);
        }
    }
}

const verifyIfAlreadyExistsByEmail = async (email: string) => {
    const user = await userRepository.findByEmail(email);
    if (user) {
        throw new AppError("User Already Exists", 409);
    }
}

const userService = {
    createUser
}

export default userService;

