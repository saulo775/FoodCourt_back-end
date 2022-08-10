import { AppError } from './../errors/AppError.js';
import tableRepository from "../repositories/tableRepository.js";

//export type ICreateTable = Omit<Table, "id" | "isBusy" | "createdAt">;

async function insertTables(quantityTables: number) {
    await checkIfTablesAlreadyExists();
    const numberTables = [];

    for (let i = 1; i <= quantityTables; i++) {
        numberTables.push(i);
    }

    numberTables.map(async (item) => {
        await tableRepository.insert(item)
    })
}

const checkIfTablesAlreadyExists = async () => {
    const tables = await tableRepository.findTables();
    if (tables.length > 0) throw new AppError("Tables already registered", 401);
}

const tableService = {
    insertTables
}
export default tableService;