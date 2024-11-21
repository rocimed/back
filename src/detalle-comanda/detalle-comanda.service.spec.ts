import { Test, TestingModule } from '@nestjs/testing';
import { DetalleComandaService } from './detalle-comanda.service';

describe('DetalleComandaService', () => {
  let service: DetalleComandaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleComandaService],
    }).compile();

    service = module.get<DetalleComandaService>(DetalleComandaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
