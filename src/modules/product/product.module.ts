import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductEntity from 'src/entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserEntity])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
