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
      newComanda.total = createComandaDto.total; 
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

  async findByMesa(fkIdMesa: number) {
    try {
      const comandas = await this.comandaRepository.find({
        where: { fkIdMesa },
        relations: [
          'detalleComanda',
          'detalleComanda.bebida',
        ],
      });
  
      if (!comandas || comandas.length === 0) {
        return {
          message: 'No existen comandas para la mesa especificada',
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
      throw new Error('Error al buscar las comandas por mesa: ' + error.message);
    }
  }

  async findByEstatus(estatus: number) {
    try{
      const comandas = await this.comandaRepository.find({
        where: { estatusComanda: estatus },
        relations: [
          'detalleComanda',
          'detalleComanda.bebida',
        ],
      });
      if (!comandas || comandas.length === 0) {
        return {
          message: 'No existen comandas para el estatus especificado',
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        comandas,
      };
      return response;
    }
    catch (error) {
      throw new Error('Error al buscar las comandas por estatus: ' + error.message);
    }
  }

  async findByUserAndEstado(idUsuario: number, estatus: number) {
    try{
      const comandas = await this.comandaRepository.find({
        where: {
          estatusComanda: estatus,
        },
        relations: [
          'mesa',
          'detalleComanda',
          'detalleComanda.bebida',
        ],
      });

      const filteredComandas = comandas.filter(
        (comanda) => comanda.mesa.fkIdUsuario === idUsuario,
      );

      if (!filteredComandas || filteredComandas.length === 0) {
        return {
          message: 'No existen comandas para el estatus y el usuario especificados',
          error: 'Not Found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        filteredComandas,
      };
      return response;
    }
    catch (error) {
      throw new Error('Error al buscar las comandas por estatus y usuario: ' + error.message);
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
      const detalleComanda = await this.detalleComandaRepository.find({
        where: { fkIdComanda: id },
      });
  
      if (detalleComanda.length > 0) {
        for (const detalle of detalleComanda) {
          await this.detalleComandaRepository.delete(detalle.idDetalleComanda);
        }
      }
      await this.comandaRepository.delete(id);
      const response = {
        statusCode: HttpStatus.OK,
        message: 'Comanda y sus detalles eliminados correctamente',
      };
      return response;
    } catch (error) {
      throw new Error(
        'Error al eliminar la comanda con el id: ' + error.message,
      );
    }
  }
  

  
  
}
