import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BebidaEntity } from './entities/bebida.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { response } from 'express';

@Injectable()
export class BebidasService {
  constructor(
    @InjectRepository(BebidaEntity)
    private bebidaRepository: Repository<BebidaEntity>,
  ) {}
  async create(createBebidaDto: CreateBebidaDto) {
    try{
      const newBebida = this.bebidaRepository.create({
        nombreBebida: createBebidaDto.nombreBebida,
        precioBebida: createBebidaDto.precioBebida,
        stock: 100,
        url: createBebidaDto.url,
      });
      await this.bebidaRepository.save(newBebida);
      const response = {
        statusCode: HttpStatus.OK,
        newBebida
      };
      return response;
    }catch(error){
      throw new Error('Error al crear la bebida: '+error.message);
    }
  }

  async findAll() {
    try{
      const bebeidaFind = await this.bebidaRepository.find();
      if(bebeidaFind.length === 0){
        return {
          message: "No existen bebdidas para mostrar",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        }
      }
      const response = {
        statusCode: HttpStatus.OK,
        bebidas: bebeidaFind
      };
      return response;
    }catch (error){
      throw new Error('Error al buscar las bebidas: '+error.message);
    }
  }

  async findOne(id: number) {
    try{
      const bebida = await this.bebidaRepository.findOne({
        where: {idBebida:id},
      select:['idBebida','nombreBebida','precioBebida', 'stock']});
      if(!bebida){
        return{
          message: "Bebida no encontrada",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        bebida
      };
      return response;
    }catch(error){
      throw new Error('Error al buscar la bebida con el id: '+error.message);
    }
  }

  async update(id: number, updateBebidaDto: UpdateBebidaDto) {
    try {
      const bebidaFind = await this.bebidaRepository.findOne({ where: { idBebida: id } });
  
      if (!bebidaFind) {
        return {
          message: "Bebida no encontrada",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      } else {
        // Actualiza solo los campos proporcionados
        bebidaFind.nombreBebida = updateBebidaDto.nombreBebida ?? bebidaFind.nombreBebida;
        bebidaFind.precioBebida = updateBebidaDto.precioBebida ?? bebidaFind.precioBebida;
        
        // Solo actualiza `url` si se proporciona en el DTO
        if (updateBebidaDto.url !== undefined) {
          bebidaFind.url = updateBebidaDto.url;
        }
  
        await this.bebidaRepository.save(bebidaFind);
        return {
          statusCode: HttpStatus.OK,
          bebidaFind
        };
      }
    } catch (error) {
      throw new Error('Error al actualizar la bebida con el id: ' + error.message);
    }
  }

  async remove(id: number) {
    try{
      const bebidaFind = await this.bebidaRepository.findOne({where:{idBebida:id}});
      if(!bebidaFind){
        return{
          message: "Bebida no encontrada",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        }
      }
      const bebidaDelete = await this.bebidaRepository.delete(id);
      const response = {
        statusCode: HttpStatus.OK,
        message: "Bebida eliminada correctamente"
      };
        return response;
      }catch(error){
        throw new Error('Error al eliminar la bebida con el id: '+error.message);
    }
  }
}
