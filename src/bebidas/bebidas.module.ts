import { Module } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { BebidasController } from './bebidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BebidaEntity } from './entities/bebida.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BebidaEntity])],
  controllers: [BebidasController],
  providers: [BebidasService],
})
export class BebidasModule {}
