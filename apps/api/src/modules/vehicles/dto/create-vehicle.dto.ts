import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Air Blade', description: 'Name of the vehicle model' })
  @IsString()
  @IsNotEmpty()
  modelName: string;

  @ApiProperty({ example: 2022, description: 'Year of manufacture' })
  @IsNumber()
  @Min(1900)
  year: number;

  @ApiPropertyOptional({ example: '125cc', description: 'Engine displacement size' })
  @IsString()
  @IsOptional()
  engineSize?: string;
}
