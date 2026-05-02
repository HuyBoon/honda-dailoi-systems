import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        customer: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user.customer;
  }

  async updateProfile(userId: string, data: { name?: string; phone?: string; address?: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { customerId: true },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!user.customerId) throw new NotFoundException('Customer profile not found');

    return this.prisma.customer.update({
      where: { id: user.customerId },
      data,
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const [items, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip,
        take,
        include: {
          user: {
            select: {
              email: true,
              role: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count(),
    ]);

    return {
      items,
      total,
      page: Number(page),
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
