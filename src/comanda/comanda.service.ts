import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComandaEntity } from './entities/comanda.entity';
import { UsuarioEntity } from '@drink/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { MesaEntity } from '@drink/mesas/entities/mesa.entity';
import { BebidaEntity } from '@drink/bebidas/entities/bebida.entity';
import { DetalleComandaEntity } from '@drink/detalle-comanda/entities/detalle-comanda.entity';
import { response } from 'express';

@Injectable()
export class ComandaService {
  constructor(
    @InjectRepository(ComandaEntity)
    private comandaRepository: Repository<ComandaEntity>,

    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,

    @InjectRepository(MesaEntity)
    private mesaRepository: Repository<MesaEntity>,

    @InjectRepository(BebidaEntity)
    private bebidaRepository: Repository<BebidaEntity>,

    @InjectRepository(DetalleComandaEntity)
    private detalleComandaRepository: Repository<DetalleComandaEntity>,
  ) {}

  async create(createComandaDto: CreateComandaDto) {
    try {
      // Verificar que la mesa existe
      const findMesa = await this.mesaRepository.findOne({
        where: { idMesa: createComandaDto.fkIdMesa },
      });

      if (!findMesa) {
        throw new Error('No se encontró la mesa');
      }
      const newComanda = new ComandaEntity();
      newComanda.fechaComanda = new Date(); // Establecer la fecha actual
      newComanda.fkIdMesa = createComandaDto.fkIdMesa;
      newComanda.estatusComanda = 0; 
      newComanda.total = 0; 
      newComanda.metodoPago = ''; 

      const savedComanda = await this.comandaRepository.save(newComanda);
      const response = {
        statusCode: HttpStatus.OK,
        newComanda: savedComanda, 
      };
      return response;
    } catch (error) {
      throw new Error('Error al crear la comanda: ' + error.message);
    }
  }

  async findAll() {
    try {
      const comandas = await this.comandaRepository.find({
        relations: [
          'mesa',
          'mesa.usuario',
          'detalleComanda',
          'detalleComanda.bebida',
        ],
      });

      if (!comandas || comandas.length === 0) {
        return {
          message: 'No existen comandas para mostrar',
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        comandas,
      };
      return response;
    } catch (error) {
      throw new Error('Error al buscar las comandas: ' + error.message);
    }
  }

  async findOne(id: number) {
    try {
      const comandaFind = await this.comandaRepository.findOne({
        where: { idComanda: id },
        relations: [
          'mesa',
          'mesa.usuario',
          'detalleComanda',
          'detalleComanda.bebida',
        ],
      });
      if (!comandaFind) {
        return {
          message: 'Comanda no encontrada',
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        comandaFind,
      };
      return response;
    } catch (error) {
      throw new Error('Error al buscar la comanda con el id: ' + error.message);
    }
  }

  async update(id: number, updateComandaDto: UpdateComandaDto) {
    try {
      const comandaFind = await this.comandaRepository.findOne({
        where: { idComanda: id },
      });

      if (!comandaFind) {
        return {
          message: 'Comanda no encontrada',
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      comandaFind.estatusComanda =
        updateComandaDto.estatusComanda ?? comandaFind.estatusComanda;
      comandaFind.metodoPago =
        updateComandaDto.metodoPago ?? comandaFind.metodoPago;

      await this.comandaRepository.save(comandaFind);

      const response = {
        statusCode: HttpStatus.OK,
        comandaFind,
      };
      return response;
    } catch (error) {
      throw new Error('Error al actualizar la comanda: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      const comandaFind = await this.comandaRepository.findOne({
        where: { idComanda: id },
      });
      if (!comandaFind) {
        return {
          message: 'Comanda no encontrada',
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      await this.comandaRepository.delete(id);
      const response = {
        statusCode: HttpStatus.OK,
        message: 'Comanda eliminada correctamente',
      };
      return response;
    } catch (error) {
      throw new Error(
        'Error al eliminar la comanda con el id: ' + error.message,
      );
    }
  }
}
