import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { PartsModule } from './parts/parts.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [CategoriesModule, PrismaModule, PartsModule, VehiclesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
