import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import baseConfig from 'src/config/configuration'
import { join } from 'path';
import { ProductModule } from './modules/product/product.module';

const config = ConfigModule.forRoot({
  // envFilePath: 'config/.env',
  load: [baseConfig],
})
const cacheConfig = CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
    ttl: configService.get<number>('REDIS_TTL'),
  }),
  inject: [ConfigService],
})

const ormModuleConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: configService.get('DB_TYPE'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [join(__dirname, '**/entities', '*.entity.{ts,js}')],
      logging: "all",
      // creates the table once if it does not exists.
      // synchronize: configService.get('DB_SYNC') === 'true',
    } as TypeOrmModuleAsyncOptions;
  },
})

@Module({
  imports: [
    config,
    cacheConfig,
    ormModuleConfig,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
