import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user\'s cart' })
  getCart(@Request() req) {
    return this.cartsService.getCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  addItem(@Request() req, @Body() body: { partId: string; quantity: number }) {
    return this.cartsService.addItem(req.user.id, body.partId, body.quantity);
  }

  @Patch('items/:partId')
  @ApiOperation({ summary: 'Update item quantity in cart' })
  updateItem(@Request() req, @Param('partId') partId: string, @Body() body: { quantity: number }) {
    return this.cartsService.updateItemQuantity(req.user.id, partId, body.quantity);
  }

  @Delete('items/:partId')
  @ApiOperation({ summary: 'Remove item from cart' })
  removeItem(@Request() req, @Param('partId') partId: string) {
    return this.cartsService.removeItem(req.user.id, partId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear entire cart' })
  clearCart(@Request() req) {
    return this.cartsService.clearCart(req.user.id);
  }
}
