import { Test, TestingModule } from '@nestjs/testing';
import { BebidasController } from './bebidas.controller';
import { BebidasService } from './bebidas.service';

describe('BebidasController', () => {
  let controller: BebidasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BebidasController],
      providers: [BebidasService],
    }).compile();

    controller = module.get<BebidasController>(BebidasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
