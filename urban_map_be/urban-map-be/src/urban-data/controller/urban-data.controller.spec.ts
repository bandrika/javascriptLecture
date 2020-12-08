import { Test, TestingModule } from '@nestjs/testing';
import { UrbanDataController } from './urban-data.controller';

describe('UrbanDataController', () => {
  let controller: UrbanDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrbanDataController],
    }).compile();

    controller = module.get<UrbanDataController>(UrbanDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
