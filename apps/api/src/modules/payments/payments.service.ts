import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/database/prisma/prisma.service';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  // --- MOMO LOGIC ---
  async createMoMoPayment(orderId: string, amount: number, orderInfo: string) {
    const partnerCode = this.configService.get<string>('MOMO_PARTNER_CODE') || 'MOMO';
    const accessKey = this.configService.get<string>('MOMO_ACCESS_KEY') || 'F8B64A...';
    const secretKey = this.configService.get<string>('MOMO_SECRET_KEY') || 'K9B1...';
    const redirectUrl = `${this.configService.get<string>('STOREFRONT_URL')}/checkout/success`;
    const ipnUrl = `${this.configService.get<string>('API_URL')}/payments/momo/callback`;
    const requestId = orderId;
    const requestType = 'captureWallet';
    const extraData = '';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode,
      partnerName: "Honda Đại Lợi",
      storeId: "HondaDailoi",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang: 'vi',
      requestType,
      autoCapture: true,
      extraData,
      signature,
    };

    try {
      const res = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
      return res.data; // Contains payUrl
    } catch (error) {
      console.error('MoMo API Error:', error.response?.data || error.message);
      throw new BadRequestException('MoMo API Error');
    }
  }

  // MoMo IPN (Webhook) Handler
  async handleMoMoWebhook(body: any) {
    const { orderId, resultCode, signature } = body;

    // TODO: Verify MoMo signature here for production security

    if (resultCode === 0) {
      await this.prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'PAID' } as any,
      });
    }

    return { statusCode: 204 };
  }
}
