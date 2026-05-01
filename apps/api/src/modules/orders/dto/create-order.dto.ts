import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  COD = 'COD',
  MOMO = 'MOMO',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
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
  customerName?: string; 

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  customerPhone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false, enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiProperty({ required: false, enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus;

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
