import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { MesaEntity } from './entities/mesa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '@drink/usuarios/entities/usuario.entity';
import { response } from 'express';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(MesaEntity) 
    private  mesaRepository: Repository<MesaEntity>,

    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ){}
  async create(createMesaDto: CreateMesaDto) {
    try{
      const findUsuario = await this.usuarioRepository.findOne({
        where: { idUsuario: createMesaDto.fkIdUsuario,
          rol: 1,
        },
      });
      
      if(!findUsuario){
        return {
          message: "Usuario no es mesero",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      
      const newMesa = await this.mesaRepository.create({  
        nombreMesa: createMesaDto.nombreMesa,
        fkIdUsuario: createMesaDto.fkIdUsuario,
        estatusMesa: 1,
      });
      
      const savedMesa = await this.mesaRepository.save(newMesa);
      if(!savedMesa){
        return {
          message: "Error al crear la mesa",
          error: "Internal Server Error",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        mesa: savedMesa
      }
      return response;
    }catch(error){
      throw new Error('Error al crear la mesa: '+ error.message);
    }
  }

  async findAll() {
    try{
      const mesas = await this.mesaRepository.find({
        relations: ['usuario'],
      })

      if(!mesas || mesas.length ===0){
        return {
          message: "No existen mesas para mostrar",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }

      const response = {
        statusCode: HttpStatus.OK,
        mesas
      };
      return response;
    }catch(error){
      throw new Error('Error al buscar las mesas: '+error.message);
    };
  }

  async findOne(id: number) {
    try{
      const mesaFind = await this.mesaRepository.findOne({
        where: { idMesa: id },
        relations: ['usuario'],
      });
      if(!mesaFind){
        return {
          message: "Mesa no encontrada",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        mesa: mesaFind
      };
      return response;
    }catch(error){
      throw new Error('Error al buscar la mesa con el id: '+error.message);
    }
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    try{
      const mesaFind = await this.mesaRepository.findOne({
        where: { idMesa: id },
      });
      if(!mesaFind){
        return {
          message: "Mesa no encontrada",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      if(updateMesaDto.fkIdUsuario){
        const findUsuarios = await this.usuarioRepository.findOne({
          where:{
            idUsuario:updateMesaDto.fkIdUsuario,
            rol: 1
          },
        });
        if(!findUsuarios){
          return {
            message: "Usuario no encontrado",
            error: "Not Found",
            statusCode: HttpStatus.NOT_FOUND
          };
        }
        mesaFind.fkIdUsuario = updateMesaDto.fkIdUsuario ?? mesaFind.fkIdUsuario;
      }
      mesaFind.nombreMesa = updateMesaDto.nombreMesa ?? mesaFind.nombreMesa;
      
      await this.mesaRepository.save(mesaFind);
      const response = {
        statusCode: HttpStatus.OK,
        mesaFind
      };
      return response;
    }catch(error){
      throw new Error('Error al actualizar la mesa con el id: ' + error.message);
    }
  }

  async remove(id: number) {
    try{
      const mesaFind = await this.mesaRepository.findOne({
        where: { idMesa: id },
      });
      if(!mesaFind){
        return {
          message: "Mesa no encontrada",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      await this.mesaRepository.delete(id);
      const response = {
        statusCode: HttpStatus.OK,
        message: "Mesa eliminada con éxito"
      };
      return response;
    }catch(error){
      throw new Error('Error al eliminar la mesa con el id: '+error.message);
    }
  }
}
