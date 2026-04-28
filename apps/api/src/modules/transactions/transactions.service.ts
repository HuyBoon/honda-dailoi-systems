import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { partId, type, quantity, notes } = createTransactionDto;

    // Use a Prisma transaction to ensure Atomicity
    return this.prisma.$transaction(async (tx) => {
      // 1. Verify part exists
      const part = await tx.part.findUnique({ where: { id: partId } });
      if (!part) throw new NotFoundException('Part not found');

      // 2. Calculate new stock
      let newStock = part.stockQuantity;
      if (type === TransactionType.IMPORT) {
        newStock += quantity;
      } else {
        if (part.stockQuantity < quantity) {
          throw new BadRequestException('Insufficient stock for export');
        }
        newStock -= quantity;
      }

      // 3. Update Part stock
      await tx.part.update({
        where: { id: partId },
        data: { stockQuantity: newStock },
      });

      // 4. Create Transaction Record
      return tx.inventoryTransaction.create({
        data: {
          type,
          quantity,
          notes,
          partId,
        },
        include: {
          part: true,
        },
      });
    });
  }

  findAll() {
    return this.prisma.inventoryTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        part: {
          select: {
            name: true,
            partNumber: true,
          },
        },
      },
    });
  }
}
