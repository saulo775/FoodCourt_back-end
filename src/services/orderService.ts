import { Session, SessionProduct, Table } from "@prisma/client";
import orderRepository from "../repositories/orderRepository.js";
import tableService from "./tableService.js";

export type ICreateSession = Omit<Session, "id" | "createdAt" | "isActive">;
export type ICreateSessionProduct = Omit<SessionProduct, "id" | "createdAt">;
export type ITableOrder = Omit<Table, "createdAt">;


async function createOrder(productsOrder: number[], table: ITableOrder) {
    const statusTable = await checkStatusTable(table.id);

    if (!statusTable) {
        const session = await createSession(table);
        await createSessionProduct(productsOrder, session.id);
        await tableService.alterStatusTable(table.id, true);
    } else {
        const session = await orderRepository.findSession(table.id);
        await createSessionProduct(productsOrder, session.id);
    }
}

const createSession = async (table: ITableOrder) => {
    const session = await orderRepository.createSession(table);
    return session;
}

const createSessionProduct = async (productsOrder: number[], sessionId: number) => {
    const sessionProduct = await orderRepository.createSessionProduct(productsOrder, sessionId);
    return sessionProduct;
}

const checkStatusTable = async (tableId: number) => {
    const table = await tableService.findOneTable(tableId);
    return table.isBusy;
}

const orderService = {
    createOrder,
}
export default orderService;