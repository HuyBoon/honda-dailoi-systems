import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { UploadService } from '@/modules/upload/upload.service';

@Injectable()
export class PartsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  create(createPartDto: CreatePartDto) {
    const { vehicleIds, ...partData } = createPartDto;
    
    // Convert empty barcode to null to avoid unique constraint violation
    if (partData.barcode === '') {
      (partData as any).barcode = null;
    }

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

  async findAll(categoryId?: string, query?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const where = {
      ...(categoryId && { categoryId }),
      ...(query && {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { partNumber: { contains: query, mode: 'insensitive' } },
          { barcode: { contains: query, mode: 'insensitive' } },
        ],
      }),
    };

    const [items, total] = await Promise.all([
      this.prisma.part.findMany({
        where: where as any,
        include: {
          category: true,
          vehicles: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.part.count({ where: where as any }),
    ]);

    return {
      items,
      total,
      page: Number(page),
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(id: string) {
    const part = await this.prisma.part.findUnique({
      where: { id },
      include: { category: true, vehicles: true },
    });
    if (!part) throw new NotFoundException('Part not found');
    return part;
  }

  async update(id: string, updatePartDto: UpdatePartDto) {
    const { vehicleIds, ...partData } = updatePartDto;

    // Convert empty barcode to null to avoid unique constraint violation
    if (partData.barcode === '') {
      (partData as any).barcode = null;
    }

    // Get current part to check for old image
    const currentPart = (await this.findOne(id)) as any;
    if (partData.imageUrl && currentPart.imageUrl && partData.imageUrl !== currentPart.imageUrl) {
      await this.uploadService.deleteFile(currentPart.imageUrl);
    }

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

  async remove(id: string) {
    const part = (await this.findOne(id)) as any;
    if (part.imageUrl) {
      await this.uploadService.deleteFile(part.imageUrl);
    }
    return this.prisma.part.delete({
      where: { id },
    });
  }
}
