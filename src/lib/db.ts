import { PrismaClient as PrismaClientType } from "@prisma/client"

// For Prisma 6.x
const { PrismaClient } = require("@prisma/client")

const globalForPrisma = global as unknown as { prisma: PrismaClientType }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma