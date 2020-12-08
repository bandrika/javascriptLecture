import { Test, TestingModule } from '@nestjs/testing';
import { UrbanDataService } from './urban-data.service';

describe('UrbanDataService', () => {
  let service: UrbanDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrbanDataService],
    }).compile();

    service = module.get<UrbanDataService>(UrbanDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
