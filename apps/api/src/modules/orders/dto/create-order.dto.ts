import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

class OrderItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  customerId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  customerName?: string; // For creating customer on the fly

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  customerPhone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
