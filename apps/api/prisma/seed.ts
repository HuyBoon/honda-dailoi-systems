import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env['DATABASE_URL'];
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Seed Categories
  const categories = [
    { name: 'Engine', description: 'Internal engine components' },
    { name: 'Brakes', description: 'Brake pads, fluid, lines' },
    { name: 'Plastics', description: 'Body panels, cowls' },
    { name: 'Electrical', description: 'Batteries, fuses, wiring' },
    { name: 'Suspension', description: 'Forks, shocks' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  // 2. Fetch some categories to use in part creation
  const engineCategory = await prisma.category.findUnique({ where: { name: 'Engine' } });
  const brakesCategory = await prisma.category.findUnique({ where: { name: 'Brakes' } });

  if (engineCategory && brakesCategory) {
    // 3. Seed Vehicles
    const waveAlpha = await prisma.vehicle.upsert({
      where: {
        modelName_year_engineSize: { modelName: 'Wave Alpha', year: 2023, engineSize: '110cc' },
      },
      update: {},
      create: { modelName: 'Wave Alpha', year: 2023, engineSize: '110cc' },
    });

    const airBlade = await prisma.vehicle.upsert({
      where: {
        modelName_year_engineSize: { modelName: 'Air Blade', year: 2022, engineSize: '125cc' },
      },
      update: {},
      create: { modelName: 'Air Blade', year: 2022, engineSize: '125cc' },
    });

    // 4. Seed Parts
    const sparkPlug = await prisma.part.upsert({
      where: { partNumber: 'CPR9EA-9' },
      update: {},
      create: {
        partNumber: 'CPR9EA-9',
        name: 'Spark Plug',
        description: 'Standard NGK Spark Plug',
        price: 45000,
        stockQuantity: 100,
        minStockLevel: 20,
        categoryId: engineCategory.id,
        vehicles: {
          connect: [{ id: waveAlpha.id }, { id: airBlade.id }],
        },
      },
    });

    const brakePad = await prisma.part.upsert({
      where: { partNumber: '06455-K56-N01' },
      update: {},
      create: {
        partNumber: '06455-K56-N01',
        name: 'Front Brake Pads',
        description: 'Genuine OEM Front Brake Pads',
        price: 120000,
        stockQuantity: 50,
        minStockLevel: 10,
        categoryId: brakesCategory.id,
        vehicles: {
          connect: [{ id: waveAlpha.id }],
        },
      },
    });

    console.log('Seeded parts:', sparkPlug.name, brakePad.name);
  }

  console.log('Database seeded! 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
