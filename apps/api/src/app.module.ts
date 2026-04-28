import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoriesModule } from '@/modules/categories/categories.module';
import { PrismaModule } from '@/database/prisma/prisma.module';
import { PartsModule } from '@/modules/parts/parts.module';
import { VehiclesModule } from '@/modules/vehicles/vehicles.module';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { HealthModule } from '@/modules/health/health.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { StatsModule } from './modules/stats/stats.module';
import configuration from '@/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CategoriesModule,
    PrismaModule,
    PartsModule,
    VehiclesModule,
    UsersModule,
    AuthModule,
    HealthModule,
    TransactionsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
