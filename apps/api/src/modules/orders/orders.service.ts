import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { TransactionType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const { items, customerId, customerName, customerPhone, ...orderData } = createOrderDto;

    return this.prisma.$transaction(async (tx) => {
      let finalCustomerId = customerId;

      // 1. Handle Customer (Find or Create)
      if (!finalCustomerId && customerPhone && customerName) {
        const existingCustomer = await tx.customer.findUnique({
          where: { phone: customerPhone },
        });

        if (existingCustomer) {
          finalCustomerId = existingCustomer.id;
        } else {
          const newCustomer = await tx.customer.create({
            data: {
              name: customerName,
              phone: customerPhone,
            },
          });
          finalCustomerId = newCustomer.id;
        }
      }

      // 2. Generate Order Number (HD-YYYYMMDD-XXXX)
      const date = new Date();
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
      const count = await tx.order.count({
        where: {
          createdAt: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lte: new Date(date.setHours(23, 59, 59, 999)),
          },
        },
      });
      const orderNumber = `HD-${dateStr}-${(count + 1).toString().padStart(4, '0')}`;

      // 3. Create Order
      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const order = await tx.order.create({
        data: {
          orderNumber,
          totalAmount,
          notes: orderData.notes,
          status: OrderStatus.PENDING,
          staffId: userId,
          customerId: finalCustomerId,
          items: {
            create: items.map((item) => ({
              partId: item.partId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: { part: true },
          },
          customer: true,
          staff: {
            select: { email: true, id: true },
          },
        },
      });

      return order;
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        staff: { select: { email: true } },
        items: { include: { part: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        staff: { select: { email: true } },
        items: { include: { part: true } },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const currentOrder = await this.findOne(id);

    // If order is already completed/cancelled, prevent status changes
    if (currentOrder.status !== OrderStatus.PENDING && updateOrderDto.status) {
      throw new BadRequestException(`Cannot change status of a ${currentOrder.status} order`);
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id },
        data: updateOrderDto,
        include: {
          items: true,
        },
      });

      // Handle Stock Depletion if status becomes COMPLETED
      if (updateOrderDto.status === OrderStatus.COMPLETED && currentOrder.status === OrderStatus.PENDING) {
        for (const item of updatedOrder.items) {
          // 1. Update Part Stock
          await tx.part.update({
            where: { id: item.partId },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });

          // 2. Create Inventory Transaction (EXPORT)
          await tx.inventoryTransaction.create({
            data: {
              type: TransactionType.EXPORT,
              quantity: item.quantity,
              partId: item.partId,
              notes: `Sold in Order ${updatedOrder.orderNumber}`,
            },
          });
        }
      }

      return this.findOne(id); // Return full included object
    });
  }
}
