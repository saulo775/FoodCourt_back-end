import { AppError } from './../errors/AppError.js';
import tableRepository from "../repositories/tableRepository.js";
import { Table } from '@prisma/client';

export type ICreateTable = Omit<Table, "id" | "createdAt">;

async function insertTables(quantityTables: number) {
    await checkIfTablesAlreadyExists();
    const numberTables = [];

    for (let i = 1; i <= quantityTables; i++) {
        numberTables.push(i);
    }

    numberTables.map(async (item) => {
        await tableRepository.insert(item)
    });
}

async function findTables() {
    const tables = await tableRepository.findTables();
    return tables;
}

async function findOneTable(tableId: number) {
    const table = await tableRepository.findOneTable(tableId);
    return table;
}

async function alterStatusTable(tableId: number, status: boolean) {
    const table = await tableRepository.alterStatus(tableId, status);
    return table;
}

const checkIfTablesAlreadyExists = async () => {
    const tables = await tableRepository.findTables();
    if (tables.length > 0) throw new AppError("Tables already registered", 401);
}

const tableService = {
    insertTables,
    findTables,
    findOneTable,
    alterStatusTable
}
export default tableService;