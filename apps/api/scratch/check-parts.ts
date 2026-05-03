import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const parts = await prisma.part.findMany({
    select: { id: true, name: true, partNumber: true },
    take: 10
  });
  console.log('Available Parts:', JSON.stringify(parts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
