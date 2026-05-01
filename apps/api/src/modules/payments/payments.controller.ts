import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('momo/create')
  @ApiOperation({ summary: 'Create a MoMo Payment URL' })
  async createMoMo(@Body() data: { orderId: string; amount: number; orderInfo: string }) {
    return this.paymentsService.createMoMoPayment(data.orderId, data.amount, data.orderInfo);
  }

  @Post('momo/callback')
  @HttpCode(204)
  @ApiOperation({ summary: 'MoMo IPN Callback Handler' })
  async momoCallback(@Body() body: any) {
    return this.paymentsService.handleMoMoWebhook(body);
  }
}
