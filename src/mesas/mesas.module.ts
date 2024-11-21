import { Module } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { MesasController } from './mesas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesaEntity } from './entities/mesa.entity';
import { UsuarioEntity } from '@drink/usuarios/entities/usuario.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MesaEntity, UsuarioEntity])],
  controllers: [MesasController],
  providers: [MesasService],
})
export class MesasModule {}
