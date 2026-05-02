import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    try {
      const customerId = await this.getCustomerId(userId);
      
      return await this.prisma.cart.upsert({
        where: { customerId },
        create: { customerId },
        update: {},
        include: {
          items: {
            include: {
              part: true,
            },
          },
        },
      });
    } catch (err) {
      console.error('Error in getCart:', err);
      throw err;
    }
  }

  async addItem(userId: string, partId: string, quantity: number) {
    const customerId = await this.getCustomerId(userId);
    const cart = await this.getOrCreateCart(customerId);

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_partId: {
          cartId: cart.id,
          partId,
        },
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        partId,
        quantity,
      },
    });
  }

  async updateItemQuantity(userId: string, partId: string, quantity: number) {
    const customerId = await this.getCustomerId(userId);
    const cart = await this.getOrCreateCart(customerId);

    if (quantity <= 0) {
      return this.removeItem(userId, partId);
    }

    return this.prisma.cartItem.update({
      where: {
        cartId_partId: {
          cartId: cart.id,
          partId,
        },
      },
      data: { quantity },
    });
  }

  async removeItem(userId: string, partId: string) {
    const customerId = await this.getCustomerId(userId);
    const cart = await this.getOrCreateCart(customerId);

    return this.prisma.cartItem.delete({
      where: {
        cartId_partId: {
          cartId: cart.id,
          partId,
        },
      },
    });
  }

  async clearCart(userId: string) {
    const customerId = await this.getCustomerId(userId);
    const cart = await this.getOrCreateCart(customerId);

    return this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }

  private async getOrCreateCart(customerId: string) {
    return this.prisma.cart.upsert({
      where: { customerId },
      create: { customerId },
      update: {},
    });
  }

  private async getCustomerId(userId: string): Promise<string> {
    const user: any = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { customerId: true, email: true } as any,
    });

    if (!user) throw new NotFoundException('User not found');

    // If customer profile is missing, create one on the fly
    if (!user.customerId) {
      const updatedUser: any = await this.prisma.user.update({
        where: { id: userId },
        data: {
          customer: {
            create: {
              name: user.email.split('@')[0],
              phone: `0000000000-${user.id.slice(0, 5)}`,
              address: '',
            }
          }
        } as any,
        select: { customerId: true } as any
      });
      return updatedUser.customerId;
    }

    return user.customerId;
  }
}
