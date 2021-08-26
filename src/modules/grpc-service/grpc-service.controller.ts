import { Controller, Get, Logger, Query, Inject } from '@nestjs/common';
import { ClientGrpcProxy, GrpcMethod } from '@nestjs/microservices';

@Controller('grpc-service')
export class GrpcServiceController {
  private grpcService;
  constructor (
    @Inject('GRPC_MICROSERVICE') private grpcClient: ClientGrpcProxy,
  ) {}
  private logger = new Logger('GrpcServiceController');

  onModuleInit() {
    this.grpcService = this.grpcClient.getService('GrpcDemoController');
  }   

  @Get()
  accumulate(@Query() { data })  {
    console.log(this.grpcService)
    return this.grpcService.findOne({ id: 1 });
  }

  @GrpcMethod('GrpcDemoController', 'FindOne')
  findOne(data, metadata, call) {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }

}
