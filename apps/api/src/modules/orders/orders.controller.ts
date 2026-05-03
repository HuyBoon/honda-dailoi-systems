import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, Request, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '@/common/guards/optional-jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new order (Public for Storefront)' })
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: any) {
    try {
      // If user exists, pass their ID. Otherwise pass null for guest order.
      const result = await this.ordersService.create(createOrderDto, user?.id || null);
      return result;
    } catch (error) {
      console.error('Controller Error creating order:', error);
      // Return a proper JSON error even for non-HttpExceptions
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'List all orders (Staff only)' })
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Get orders for the logged-in customer' })
  async findMyOrders(@Request() req) {
    return this.ordersService.findByUserId(req.user.id);
  }

  @Get('customer/:phone')
  @ApiOperation({ summary: 'Get orders by customer phone number (Tracking)' })
  async findByPhone(@Param('phone') phone: string) {
    return this.ordersService.findByCustomerPhone(phone);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get order details by ID (Staff only)' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update order status (Staff only)' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
}
