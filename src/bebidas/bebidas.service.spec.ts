import { Test, TestingModule } from '@nestjs/testing';
import { BebidasService } from './bebidas.service';

describe('BebidasService', () => {
  let service: BebidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BebidasService],
    }).compile();

    service = module.get<BebidasService>(BebidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
