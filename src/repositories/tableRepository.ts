import { prisma } from "../config/database.js"

async function insert(numberTable: number) {
    const data = {
        numberTable: numberTable
    }

    await prisma.table.create({ data: data });
}

async function findTables() {
    const tables = await prisma.table.findMany({ orderBy: { numberTable: 'asc' } });

    tables.map((table) => {
        delete table.createdAt;
    });

    return tables;
}

async function findOneTable(tableId: number) {
    const table = prisma.table.findFirst({
        where: {
            id: tableId
        }
    });
    return table;
}

async function alterStatus(tableId: number, status) {
    const table = prisma.table.update({
        where: {
            id: tableId
        },
        data: {
            isBusy: status
        }
    });
    return table;
}

const tableRepository = {
    insert,
    findTables,
    findOneTable,
    alterStatus
}
export default tableRepository;