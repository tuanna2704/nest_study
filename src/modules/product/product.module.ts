import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProductService } from './product.service';
import { ProductController } from './controllers/product.controller';
import { MonitorController } from './controllers/monitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductEntity from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './services/cron.service';

import { MessageProducerService, MessageConsumer } from './services/message-queue.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserEntity]),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name:'message-queue'
    }),
  ],
  controllers: [MonitorController, ProductController],
  providers: [ProductService, CronService, MessageProducerService, MessageConsumer],
})
export class ProductModule {}
