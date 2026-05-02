import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private _cart: any;
  public get cart(): any {
    return this._cart;
  }
  public set cart(value: any) {
    this._cart = value;
  }
  private _cartItem: any;
  public get cartItem(): any {
    return this._cartItem;
  }
  public set cartItem(value: any) {
    this._cartItem = value;
  }
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
