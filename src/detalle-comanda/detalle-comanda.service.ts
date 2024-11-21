import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetalleComandaDto } from './dto/create-detalle-comanda.dto';
import { UpdateDetalleComandaDto } from './dto/update-detalle-comanda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleComandaEntity } from './entities/detalle-comanda.entity';
import { Repository } from 'typeorm';
import { ComandaEntity } from '@drink/comanda/entities/comanda.entity';
import { BebidaEntity } from '@drink/bebidas/entities/bebida.entity';
import { error } from 'console';

@Injectable()
export class DetalleComandaService {
  constructor(
    @InjectRepository(DetalleComandaEntity)
    private detalleComandaRepository: Repository<DetalleComandaEntity>,

    @InjectRepository(ComandaEntity)
    private comandaRepository: Repository<ComandaEntity>,

    @InjectRepository(BebidaEntity)
    private bebidaRepository: Repository<BebidaEntity>,
  ){}
  async create(createDetalleComandaDto: CreateDetalleComandaDto) {
    try {
      // Verificar si la comanda y la bebida existen
      const findComanda = await this.comandaRepository.findOne({
        where: { idComanda: createDetalleComandaDto.fkIdComanda },
      });
      const findBebida = await this.bebidaRepository.findOne({
        where: { idBebida: createDetalleComandaDto.fkIdBebida },
      });
  
      if (!findComanda || !findBebida) {
        throw new Error('Comanda o bebida no encontrada');
      }
  
      // Calcular el precio basado en el precio de la bebida y la cantidad
      const calculatedPrice = findBebida.precioBebida * createDetalleComandaDto.cantidad;
  
      // Crear un nuevo detalle de comanda con el precio calculado
      const newDetalleComanda = this.detalleComandaRepository.create({
        cantidad: createDetalleComandaDto.cantidad,
        precio: calculatedPrice, // Asignar el precio calculado
        fkIdComanda: createDetalleComandaDto.fkIdComanda,
        fkIdBebida: createDetalleComandaDto.fkIdBebida,
        estatusDetalle: 0
      });
  
      const savedDetallesCom = await this.detalleComandaRepository.save(newDetalleComanda);
  
      if (!savedDetallesCom) {
        return {
          message: 'Error al crear el detalle comanda',
          error: 'Internal Server Error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }
  
      // Llamar al procedimiento almacenado para calcular el total de la comanda
      await this.comandaRepository.query('EXEC sp_CalcularTotalComanda @idComanda = @0', [
        createDetalleComandaDto.fkIdComanda,
      ]);
  
      const response = {
        statusCode: HttpStatus.OK,
        savedDetallesCom,
      };
      return response;
    } catch (error) {
      throw new Error('Error al crear el detalle comanda: ' + error.message);
    }
  }
  
  

  async findAll() {
    try{
      const detalles = await this.detalleComandaRepository.find({
        relations: ['comanda', 'bebida'],
      })
      if(!detalles|| detalles.length===0){
        return {
          message: "No existen detalles comanda para mostrar",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        }
      }

      const response = {
        statusCode: HttpStatus.OK,
        detalles
      }
      return response;
    }catch(error){
      throw new Error('Error al mostrar todos los detalles comanda: '+ error.message)
    }
  }

  async findOne(id: number) {
    try{
      const detalleFind = await this.detalleComandaRepository.findOne({
        where: {idDetalleComanda:id},
        relations: ['comanda', 'bebida'],
      })
      if(!detalleFind){
        return {
          message: "Detalle comanda no encontrado",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        }
      }
      const response = {
        statusCode: HttpStatus.OK,
        detalleFind
      }
      return response;
    }catch(error){
      throw new Error('Error al buscar el detalle comanda con el id: '+error.message)
    }
  }

  async update(id: number, updateDetalleComandaDto: UpdateDetalleComandaDto) {
    try{
      const detalleFind = await this.detalleComandaRepository.findOne({
        where: {idDetalleComanda: id},
      });
      if(!detalleFind){
        return {
          message: "Detalle comanda no encontrado",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        }
      }

      detalleFind.cantidad = updateDetalleComandaDto.cantidad ?? detalleFind.cantidad;
      detalleFind.estatusDetalle = updateDetalleComandaDto.estatusDetalle ?? detalleFind.estatusDetalle;
      
      await this.detalleComandaRepository.save(detalleFind);

      const response = {
        statusCode: HttpStatus.OK,
        detalleFind
      }

      return response;
    }catch(error){
      throw new Error('Error al actualizar el detalle comanda con el id: '+error.message)
    }
  }

  async remove(id: number) {
    try{
      const detalleFind = await this.detalleComandaRepository.findOne({
        where: {idDetalleComanda: id},
      });
      if(!detalleFind){
        return {
          message: "Detalle comanda no encontrado",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        }
      }
      await this.detalleComandaRepository.remove(detalleFind);
      const response ={
        message: "Detalle comanda eliminado correctamente",
        error: "OK",
        statusCode: HttpStatus.OK
      }
      return response;
    }catch(error){
      throw new Error('Error al eliminar el detalle comanda con el id: '+error.message)
    }
  }
}
