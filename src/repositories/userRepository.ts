import { ICreateUser } from './../services/userService';
import { prisma } from "../config/database.js";

async function findByPermission(permission: string) {
    const user = await prisma.user.findFirst({
        where: {
            permission: permission
        }
    });
    return user;
}

async function insert(userData: ICreateUser) {
    await prisma.user.create({ data: userData });
}

async function findByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

async function findById(userId: number) {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    return user;
}

const userRepository = {
    findByPermission,
    insert,
    findByEmail,
    findById
}

export default userRepository;