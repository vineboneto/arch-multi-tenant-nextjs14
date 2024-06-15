import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seed() {
  return prisma.users.upsert({
    create: {
      email: "vineboneto@gmail.com",
      name: "vineboneto",
      password: bcrypt.hashSync("123456", bcrypt.genSaltSync()),
    },
    update: {},
    where: {
      email: "vineboneto@gmail.com",
    },
  });
}

seed()
  .then(() => console.log("seeded"))
  .finally(() => prisma.$disconnect());
