import { prisma } from "../config/database.js"

async function insert(numberTable: number) {
    const data = {
        numberTable: numberTable
    }

    await prisma.table.create({ data: data });
}

async function findTables() {
    const tables = await prisma.table.findMany();
    return tables
}

const tableRepository = {
    insert,
    findTables
}
export default tableRepository;