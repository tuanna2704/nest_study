import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductEntity from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './services/cron.service';

// import { MessageProducerService, MessageConsumer } from './services/message-queue.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ProductController],
  providers: [ProductService, CronService],
})
export class ProductModule {}
