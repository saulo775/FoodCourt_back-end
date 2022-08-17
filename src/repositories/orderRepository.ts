
import { ITableOrder } from './../services/orderService';
import { prisma } from "../config/database.js";

async function findSession(tableId: number) {
    const session = prisma.session.findFirst({
        where: {
            tableId,
            AND: {
                isActive: true
            }
        }
    });

    return session;
}

async function createSession(table: ITableOrder) {
    const session = prisma.session.create({
        data: {
            isActive: true,
            tableId: table.id
        }
    });
    return session;
}

async function createSessionProduct(productsOrder: number[], sessionId: number) {
    const sessionProduct = await productsOrder.map(async (product) => {
        return await prisma.sessionProduct.create({
            data: {
                productsId: product,
                sessionId: sessionId,
                quantity: 1
            }
        });
    });

    return sessionProduct
}

const orderRepository = {
    findSession,
    createSession,
    createSessionProduct,
}
export default orderRepository;