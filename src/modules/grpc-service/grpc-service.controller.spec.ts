import { Test, TestingModule } from '@nestjs/testing';
import { GrpcServiceController } from './grpc-service.controller';

describe('GrpcServiceController', () => {
  let controller: GrpcServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcServiceController],
    }).compile();

    controller = module.get<GrpcServiceController>(GrpcServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
