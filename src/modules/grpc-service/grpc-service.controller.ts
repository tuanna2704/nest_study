import { Controller, Get, Logger, Query, Inject } from '@nestjs/common';
import { ClientGrpcProxy, GrpcMethod } from '@nestjs/microservices';

@Controller('grpc-service')
export class GrpcServiceController {
  private grpcService;
  private items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  constructor(
    @Inject('GRPC_MICROSERVICE') private grpcClient: ClientGrpcProxy,
  ) {}
  private logger = new Logger('GrpcServiceController');

  onModuleInit() {
    this.grpcService = this.grpcClient.getService('GrpcDemoController');
  }

  @Get()
  find(@Query() { data }) {
    console.log(this.grpcService);
    return this.grpcService.findOne({ id: 1 });
  }

  @Get('all')
  findAll() {
    return this.grpcService.findAll();
  }

  // SERVER
  @GrpcMethod('GrpcDemoController', 'FindOne')
  findGRPC(data, metadata, call) {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('GrpcDemoController', 'FindAll')
  findAllGRPC() {
    return this.items;
  }
}
