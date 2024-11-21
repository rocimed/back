import { Test, TestingModule } from '@nestjs/testing';
import { DetalleComandaController } from './detalle-comanda.controller';
import { DetalleComandaService } from './detalle-comanda.service';

describe('DetalleComandaController', () => {
  let controller: DetalleComandaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleComandaController],
      providers: [DetalleComandaService],
    }).compile();

    controller = module.get<DetalleComandaController>(DetalleComandaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
