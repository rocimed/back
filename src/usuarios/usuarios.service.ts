import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUsuarioDto.contrasena, 10);
  
      const newUsuario = this.usuarioRepository.create({
        nombreUsuario: createUsuarioDto.nombreUsuario,
        apellidoPat: createUsuarioDto.apellidoPat,
        apellidoMat: createUsuarioDto.apellidoMat,
        contrasena: hashedPassword,
        rol: createUsuarioDto.rol,
      });
  
      await this.usuarioRepository.save(newUsuario);
      return {
        statusCode: HttpStatus.OK,
        newUsuario,
      };
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  async findAll() {
    try{
      const usuarioFind = await this.usuarioRepository.find();
      if(usuarioFind.length ===0){
        return {
          message: "No existen usuarios para mostrar",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        usuarios: usuarioFind
      }
      return response;
    }catch(error){
      throw new Error('Error al buscar los usuarios: '+error.message);
    }
  }

  async findOne(id: number) {
    try{
      const usuario = await this.usuarioRepository.findOne({
        where: {idUsuario:id},
        select:['idUsuario','nombreUsuario','apellidoPat', 'apellidoMat', 'contrasena', 'rol']
      })
      if(!usuario){
        return{
          message: "Usuario no encontrado",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      const response = {
        statusCode: HttpStatus.OK,
        usuario
      };
      return response;
    }catch(error){
      throw new Error('Error al buscar el usuario con el id: '+error.message);
    }
  }


  async findUsersByRole(rol: number) {
    try {
      // Convertir el parámetro role a número
      const parsedRole = Number(rol);
      if (isNaN(parsedRole)) {
        return {
          message: `El valor proporcionado para el rol (${rol}) no es un número válido`,
          error: "Bad Request",
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
  
      // Buscar usuarios con el rol especificado
      const usuarios = await this.usuarioRepository.find({
        where: { rol: parsedRole },
      });
  
      // Verificar si existen usuarios con el rol especificado
      if (usuarios.length === 0) {
        return {
          message: `No existen usuarios con el rol ${parsedRole} para mostrar`,
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
  
      // Retornar la lista de usuarios con el rol especificado
      return {
        statusCode: HttpStatus.OK,
        usuarios,
      };
    } catch (error) {
      throw new Error(`Error al buscar los usuarios con rol ${rol}: ` + error.message);
    }
  }
  
  
  

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try{
      const usuarioFind = await this.usuarioRepository.findOne({
        where: {idUsuario: id}
      });
      if(!usuarioFind){
        return {
          message: "Usuario no encontrado",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }else{
        usuarioFind.nombreUsuario = updateUsuarioDto.nombreUsuario ?? usuarioFind.nombreUsuario;
        usuarioFind.apellidoPat = updateUsuarioDto.apellidoPat?? usuarioFind.apellidoPat;
        usuarioFind.apellidoMat = updateUsuarioDto.apellidoMat?? usuarioFind.apellidoMat;
        usuarioFind.contrasena = updateUsuarioDto.contrasena?? usuarioFind.contrasena;
        usuarioFind.rol = updateUsuarioDto.rol?? usuarioFind.rol;
      }
      await this.usuarioRepository.save(usuarioFind);
      const response = {  
        statusCode: HttpStatus.OK,
        usuarioFind
      };
      return response;
    }catch(error){
      throw new Error('Error al actualizar el usuario con el id: ' + error.message);
    }
  }

  async remove(id: number) {
    try{
      const usuarioFind = await this.usuarioRepository.findOne({
        where: {idUsuario: id}
      });
      if(!usuarioFind){
        return{
          message: "Usuario no encontrado",
          error: "Not Found",
          statusCode: HttpStatus.NOT_FOUND
        };
      }
      const usuarioDelete = await this.usuarioRepository.delete(id);
      const response = {
        statusCode: HttpStatus.OK,
        message: "Usuario eliminado correctamente"
      };
        return response;
    }catch(error){
      throw new Error('Error al eliminar el usuario con el id: '+error.message);
    }
  }

  async login(idUsuario: number, contrasena: string) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario },
        select: ['idUsuario', 'nombreUsuario', 'apellidoPat', 'apellidoMat', 'contrasena', 'rol'],
      });

      if (!usuario) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Usuario no encontrado',
          error: 'Not Found',
        };
      }
      const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!isPasswordValid) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Credenciales incorrectas',
          error: 'Unauthorized',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        usuario,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error en el login: ${error.message}`,
        error: 'Internal Server Error',
      };
    }
  }
  
}
