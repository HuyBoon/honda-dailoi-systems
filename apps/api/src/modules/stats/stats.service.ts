import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalParts,
      totalCategories,
      totalVehicles,
      parts,
      recentTransactions,
    ] = await Promise.all([
      this.prisma.part.count(),
      this.prisma.category.count(),
      this.prisma.vehicle.count(),
      this.prisma.part.findMany({
        select: { price: true, stockQuantity: true, minStockLevel: true },
      }),
      this.prisma.inventoryTransaction.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { part: { select: { name: true, partNumber: true } } },
      }),
    ]);

    const lowStockParts = parts.filter(p => p.stockQuantity <= p.minStockLevel).length;
    const totalValue = parts.reduce(
      (acc, part) => acc + Number(part.price) * part.stockQuantity,
      0,
    );

    return {
      totalParts,
      totalCategories,
      totalVehicles,
      lowStockCount: lowStockParts,
      totalValue,
      recentTransactions,
    };
  }
}
