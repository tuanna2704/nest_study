import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { cwd } from 'process';
import { join } from 'path';
import { GrpcServiceController } from './grpc-service.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [],
        inject: [],
        name: 'GRPC_MICROSERVICE',
        useFactory: () => {
          return {
            transport: Transport.GRPC,
            options: {
              package: 'caculator_package',
              protoPath: join(cwd(), 'dist/modules/grpc-service/grpc-service.proto'),
            },
          }
        }
      }
    ])
  ],
  controllers: [GrpcServiceController]
})
export class GrpcServiceModule {}
