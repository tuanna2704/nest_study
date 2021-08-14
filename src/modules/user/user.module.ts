import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from 'src/entities/user.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController]
})

export class UserModule {}
