import { Injectable, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
// import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
// import { UserModule } from './modules/user/user.module';
import baseConfig from 'src/config/configuration';
// import { join } from 'path';
// import { ProductModule } from './modules/product/product.module';
// import { BullModule } from '@nestjs/bull';
// import { AudioModule } from 'src/modules/audio/audio.module';
// import { Transport, ClientsModule } from '@nestjs/microservices';
// import { KafkaController } from './kafka.controller';
// import { GrpcServiceModule } from './modules/grpc-service/grpc-service.module';
// import { ChangeHealthModule, ChangeHealthOptionsFactory } from 'src/modules/change-health';
import { ChangeHealthcareModule } from 'src/modules/change-healthcare';

const config = ConfigModule.forRoot({
  // envFilePath: 'config/.env',
  load: [baseConfig],
});
const cacheConfig = CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
    ttl: configService.get<number>('REDIS_TTL'),
  }),
  inject: [ConfigService],
});

// const ormModuleConfig = TypeOrmModule.forRootAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => {
//     return {
//       type: configService.get('DB_TYPE'),
//       host: configService.get('DB_HOST'),
//       port: configService.get('DB_PORT'),
//       username: configService.get('DB_USERNAME'),
//       password: configService.get('DB_PASSWORD'),
//       database: configService.get('DB_DATABASE'),
//       entities: [join(__dirname, '**/entities', '*.entity.{ts,js}')],
//       logging: 'all',
//       // creates the table once if it does not exists.
//       // synchronize: configService.get('DB_SYNC') === 'true',
//     } as TypeOrmModuleAsyncOptions;
//   },
// });

// @Injectable()
// class A implements ChangeHealthOptionsFactory {
//   mustHaveFunction() {
//     return 'get Value from parent';
//   }
// }

@Module({
  imports: [
    config,
    // ChangeHealthModule.registerAsync({
    //   // imports: [ConfigModule],
    //   // inject: [A],
    //   // useFactory: (configService: ConfigService) => {
    //   //   return {
    //   //     host: 'Demo add config into module',
    //   //   }
    //   // }
    //   useExisting: A,
    // }),
    ChangeHealthcareModule.registerAsync({
      imports: [ConfigModule, cacheConfig],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.get<string>('CHANGE_HEALTHCARE_HOST'),
          client_id: configService.get<string>('CHANGE_HEALTHCARE_CLIENT_ID'),
          client_secret: configService.get<string>(
            'CHANGE_HEALTHCARE_CLIENT_SECRET',
          ),
          grant_type: configService.get<string>('CHANGE_HEALTHCARE_GRANT_TYPE'),
        };
      },
    }),
    //   cacheConfig,
    //   ormModuleConfig,
    //   UserModule,
    //   ProductModule,
    //   BullModule.forRoot({
    //     redis: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   }),
    //   AudioModule,
    //   ClientsModule.registerAsync([
    //     {
    //       imports: [ConfigModule],
    //       inject: [ConfigService],
    //       name: 'KAFKA_SERVICE',
    //       useFactory: (configService: ConfigService) => {
    //         return {
    //           transport: Transport.KAFKA,
    //           options: {
    //             client: {
    //               clientId: configService.get<string>('KAFKA_CLIENT_ID'),
    //               brokers: [configService.get<string>('KAFKA_BROKER')],
    //             },
    //             consumer: {
    //               groupId: configService.get<string>('KAFKA_GROUP_ID'), // Should be the same thing we give in consumer
    //             },
    //           },
    //         };
    //       },
    //     },
    //     {
    //       imports: [ConfigModule],
    //       inject: [ConfigService],
    //       name: 'KAFKA_SERVICE',
    //       useFactory: (configService: ConfigService) => {
    //         return {
    //           transport: Transport.KAFKA,
    //           options: {
    //             client: {
    //               clientId: configService.get<string>('KAFKA_CLIENT_ID'),
    //               brokers: [configService.get<string>('KAFKA_BROKER')],
    //             },
    //             consumer: {
    //               groupId: configService.get<string>('KAFKA_GROUP_ID'), // Should be the same thing we give in consumer
    //             },
    //           },
    //         };
    //       },
    //     },
    //   ]),
    //   GrpcServiceModule,
  ],
  controllers: [
    AppController,
    // KafkaController,
  ],
  providers: [AppService],
})
export class AppModule {}
