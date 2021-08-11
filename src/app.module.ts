import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import baseConfig from 'src/config/configuration'

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
@Module({
  imports: [
    config,
    cacheConfig,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
