import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Parts')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new part' })
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all parts' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'q', required: false, description: 'Search by name or part number' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('categoryId') categoryId?: string, 
    @Query('q') q?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.partsService.findAll(categoryId, q, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a part by ID' })
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a part' })
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partsService.update(id, updatePartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a part' })
  remove(@Param('id') id: string) {
    return this.partsService.remove(id);
  }
}
