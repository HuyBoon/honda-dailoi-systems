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
}
