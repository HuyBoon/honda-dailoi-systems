import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env['DATABASE_URL'];
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Migrating existing USER roles to CUSTOMER...');
  
  // Since 'USER' is no longer in the enum, we have to use raw query
  const result = await prisma.$executeRawUnsafe(
    `UPDATE "User" SET role = 'CUSTOMER' WHERE role::text = 'USER';`
  );
  
  console.log(`Updated ${result} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
