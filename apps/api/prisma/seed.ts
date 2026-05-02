import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env['DATABASE_URL'];
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with 100 Honda parts...');

  // 1. Seed 10 Categories (Ensuring they exist)
  const categoriesData = [
    { name: 'Động cơ', description: 'Các chi tiết bên trong máy, piston, xupap...' },
    { name: 'Hệ thống phanh', description: 'Má phanh, đĩa phanh, dây phanh...' },
    { name: 'Dàn nhựa & Vỏ', description: 'Yếm xe, dè chắn bùn, ốp sườn...' },
    { name: 'Hệ thống điện', description: 'Bugi, ắc quy, dây điện, ECU...' },
    { name: 'Giảm xóc & Phuộc', description: 'Phuộc trước, phuộc sau, lò xo...' },
    { name: 'Truyền động', description: 'Nhông sên dĩa, dây curoa, bi nồi...' },
    { name: 'Hệ thống đèn', description: 'Đèn pha, đèn hậu, xi nhan...' },
    { name: 'Lốp & Vành', description: 'Lốp không săm, lốp có săm, vành đúc...' },
    { name: 'Dầu nhớt & Phụ gia', description: 'Nhớt máy, nhớt hộp số, nước làm mát...' },
    { name: 'Lọc gió & Lọc dầu', description: 'Lọc gió động cơ, lọc dầu tinh...' },
  ];

  const createdCategories: any[] = [];
  for (const cat of categoriesData) {
    const c = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    createdCategories.push(c);
  }

  // 2. Seed 10 Vehicles
  const vehiclesData = [
    { modelName: 'Vision', year: 2023, engineSize: '110cc' },
    { modelName: 'Air Blade', year: 2023, engineSize: '125cc' },
    { modelName: 'SH 150i', year: 2022, engineSize: '150cc' },
    { modelName: 'Winner X', year: 2023, engineSize: '150cc' },
    { modelName: 'Wave Alpha', year: 2023, engineSize: '110cc' },
    { modelName: 'Future 125', year: 2023, engineSize: '125cc' },
    { modelName: 'Vario 160', year: 2023, engineSize: '160cc' },
    { modelName: 'Lead 125', year: 2022, engineSize: '125cc' },
    { modelName: 'Exciter 155', year: 2023, engineSize: '155cc' }, // Added for variety
    { modelName: 'SH Mode', year: 2023, engineSize: '125cc' },
  ];

  const createdVehicles: any[] = [];
  for (const v of vehiclesData) {
    const veh = await prisma.vehicle.upsert({
      where: {
        modelName_year_engineSize: { 
          modelName: v.modelName, 
          year: v.year, 
          engineSize: v.engineSize 
        },
      },
      update: {},
      create: v,
    });
    createdVehicles.push(veh);
  }

  // 3. Generate 100 Parts
  const partNames = [
    'Bugi', 'Má phanh', 'Lọc gió', 'Dây curoa', 'Ắc quy', 'Nhông sên dĩa', 'Lốp trước', 'Lốp sau', 
    'Nhớt máy', 'Nước làm mát', 'Đèn pha', 'Gương chiếu hậu', 'Tay phanh', 'Tay ga', 'Dây phanh',
    'Chắn bùn', 'Ốp sườn', 'Yếm xe', 'Piston', 'Xupap', 'Trục cam', 'Bi nồi', 'Chuông nồi', 
    'Lò xo phuộc', 'Còi xe', 'Bóng đèn xi nhan', 'Đuôi đèn', 'Ổ khóa Smartkey', 'Bọc yên', 'Tem xe'
  ];

  const suffixes = ['Chính hãng', 'Loại 1', 'Thái Lan', 'Nhật Bản', 'Premium', 'Pro', 'Elite', 'Standard'];

  console.log('Generating 100 parts...');
  for (let i = 0; i < 100; i++) {
    const randomName = partNames[Math.floor(Math.random() * partNames.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const name = `${randomName} ${randomSuffix} #${i + 1}`;
    const partNumber = `HD-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${i}`;
    
    const randomCat = createdCategories[Math.floor(Math.random() * createdCategories.length)];
    const price = Math.floor(Math.random() * 2000) * 1000 + 50000;

    const randomVehs = createdVehicles
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    await prisma.part.upsert({
      where: { partNumber },
      update: {},
      create: {
        partNumber,
        name,
        description: `Mô tả chi tiết cho ${name}. Sản phẩm chất lượng cao, độ bền tốt.`,
        price,
        stockQuantity: Math.floor(Math.random() * 100) + 10,
        minStockLevel: 5,
        categoryId: randomCat.id,
        vehicles: {
          connect: randomVehs.map(v => ({ id: v.id })),
        },
      },
    });
  }

  console.log('Seeding complete! 🚀');
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
