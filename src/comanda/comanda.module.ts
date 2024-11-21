import { Module } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { ComandaController } from './comanda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComandaEntity } from './entities/comanda.entity';
import { UsuarioEntity } from '@drink/usuarios/entities/usuario.entity';
import { MesaEntity } from '@drink/mesas/entities/mesa.entity';
import { BebidaEntity } from '@drink/bebidas/entities/bebida.entity';
import { DetalleComandaEntity } from '@drink/detalle-comanda/entities/detalle-comanda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComandaEntity,UsuarioEntity,MesaEntity, BebidaEntity, DetalleComandaEntity])],
  controllers: [ComandaController],
  providers: [ComandaService],
})
export class ComandaModule {}
