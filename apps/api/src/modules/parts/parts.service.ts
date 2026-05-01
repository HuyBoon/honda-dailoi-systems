import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  create(createPartDto: CreatePartDto) {
    const { vehicleIds, ...partData } = createPartDto;
    return this.prisma.part.create({
      data: {
        ...partData,
        ...(vehicleIds && {
          vehicles: {
            connect: vehicleIds.map((id) => ({ id })),
          },
        }),
      },
      include: { category: true, vehicles: true },
    });
  }

  findAll(categoryId?: string, query?: string) {
    return this.prisma.part.findMany({
      where: {
        ...(categoryId && { categoryId }),
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { partNumber: { contains: query, mode: 'insensitive' } },
            { barcode: { contains: query, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        category: true,
        vehicles: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const part = await this.prisma.part.findUnique({
      where: { id },
      include: { category: true, vehicles: true },
    });
    if (!part) throw new NotFoundException('Part not found');
    return part;
  }

  update(id: string, updatePartDto: UpdatePartDto) {
    const { vehicleIds, ...partData } = updatePartDto;
    return this.prisma.part.update({
      where: { id },
      data: {
        ...partData,
        ...(vehicleIds && {
          vehicles: {
            set: vehicleIds.map((id) => ({ id })),
          },
        }),
      },
      include: { category: true, vehicles: true },
    });
  }

  remove(id: string) {
    return this.prisma.part.delete({
      where: { id },
    });
  }
}
