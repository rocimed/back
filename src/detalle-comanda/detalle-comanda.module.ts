import { Module } from '@nestjs/common';
import { DetalleComandaService } from './detalle-comanda.service';
import { DetalleComandaController } from './detalle-comanda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleComandaEntity } from './entities/detalle-comanda.entity';
import { ComandaEntity } from '@drink/comanda/entities/comanda.entity';
import { BebidaEntity } from '@drink/bebidas/entities/bebida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleComandaEntity, ComandaEntity, BebidaEntity]),],
  controllers: [DetalleComandaController],
  providers: [DetalleComandaService],
})
export class DetalleComandaModule {}
