import { Session, SessionProduct, Table } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import orderRepository from "../repositories/orderRepository.js";
import productRepository from "../repositories/productRepository.js";
import productService from "./productService.js";
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

async function getAllOrders(tableId: number) {
    const session = await orderRepository.findSession(tableId);
    if (!session) throw new AppError("Session not found", 404);
    if (!session.isActive) throw new AppError("This table has no active sessions", 404);
    //console.log("deu bom a session", session);

    const allProductIds = await orderRepository.findSessionProducts(session.id);

    let allIds = [];
    allProductIds.forEach(async ({ productsId }) => {
        allIds.push(productsId);
    });

    const products = await getAllProducts(allIds);
    return products;
}

async function closeAccount(tableId: number) {
    const session = await orderRepository.findSession(tableId);
    await orderRepository.closeAccount(session.id);
    await tableService.alterStatusTable(tableId, false);
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

const getAllProducts = async (allIds: number[]) => {
    let products = [];
    for (let i = 0; i < allIds.length; i++) {
        const prod = await productService.findById(allIds[i]);
        prod.price = prod.price / 100;
        products.push(prod);
    }

    return products;
}

const orderService = {
    createOrder,
    getAllOrders,
    closeAccount
}
export default orderService;