import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePartDto {
  @ApiProperty({ example: 'CPR9EA-9', description: 'Official Honda Part Number' })
  @IsString()
  @IsNotEmpty()
  partNumber: string;

  @ApiProperty({ example: 'Spark Plug', description: 'Name of the part' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Detailed description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 45000, description: 'Price in local currency' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 100, description: 'Current stock quantity' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stockQuantity?: number;

  @ApiPropertyOptional({ example: 10, description: 'Minimum threshold' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minStockLevel?: number;

  @ApiPropertyOptional({ description: 'Barcode for scanning' })
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiProperty({ description: 'UUID of the category' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiPropertyOptional({ type: [String], description: 'List of compatible vehicle IDs' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  vehicleIds?: string[];
}
