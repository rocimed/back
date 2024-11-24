import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('usuarios')
@ApiTags('Usuarios')

export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({summary:'Crear un usuario en la base de datos', description:'EndPoint que devuelve el objeto creado de un usuario'})
  @ApiBody({type: CreateUsuarioDto})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Usuario creado correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          newUsuario:{
            id: 1,
            nombreUsuario: 'juan',
            apellidoPat: 'Perez',
            apellidoMat: 'Gonzales',
            contrasena: '123456',
            rol: 0
          },
        },
      },
    },
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:'No se encontro el usuario',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'Usuario no encontrado',
          error:'Not Found'
        },
      },
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async create(@Res()response, @Body() createUsuarioDto: CreateUsuarioDto) {
    const resStatus = await this.usuariosService.create(createUsuarioDto);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get()
  @ApiOperation({summary:'Mostrar todos los usuarios de la base de datos', description:'EndPoint que devuelve una lista de objetos de usuarios'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Usuarios obtenidos correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          usuarios:[
            {
              id: 1,
              nombreUsuario: 'juan',
              apellidoPat: 'Perez',
              apellidoMat: 'Gonzales',
              contrasena: '123456',
              rol: 0
            },
            {
              id: 2,
              nombreUsuario: 'ana',
              apellidoPat: 'Lopez',
              apellidoMat: 'Martinez',
              contrasena: '789012',
              rol: 1
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontraron usuarios',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'No se encontraron usuarios',
          error:'Not Found'
        },
      },
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async findAll(@Res()respone) {
    const resStatus = await this.usuariosService.findAll();
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return respone.status(HttpStatus.NOT_FOUND).json(resStatus);
    return respone.status(HttpStatus.OK).json(resStatus);
  }

  @Get(':id')
  @ApiOperation({summary:'Obtener un usuario por id de la base de datos', description:'EndPoint que devuelve un objeto de usuario'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Usuario obtenido correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          usuario:{
            id: 1,
            nombreUsuario: 'juan',
            apellidoPat: 'Perez',
            apellidoMat: 'Gonzales',
            contrasena: '123456',
            rol: 0
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontró el usuario',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'No se encontró el usuario',
          error:'Not Found'
        },
      },
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async findOne(@Res()response, @Param('id') id: number) {
    const resStatus = await this.usuariosService.findOne(id); 
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('usuarios/:rol')
  @ApiQuery({ name: 'rol', required: true, type: Number, description: 'Rol de los usuarios a buscar' })
  async findUsersByRole(@Query('rol') rol: number, @Res() response) {
    const resStatus = await this.usuariosService.findUsersByRole(rol);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    if (resStatus.statusCode === HttpStatus.BAD_REQUEST) {
      return response.status(HttpStatus.BAD_REQUEST).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }
  

  @Patch(':id')
  @ApiOperation({summary:'Actualizar un usuario por id de la base de datos', description:'EndPoint que actualiza un objeto de usuario'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Usuario actualizado correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          usuarioFind:{
            id: 1,
            nombreUsuario: 'juan',
            apellidoPat: 'Perez',
            apellidoMat: 'Gonzales',
            contrasena: '123456',
            rol: 0
          }
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontró el usuario',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'No se encontró el usuario',
          error:'Not Found'
        },
      },
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:'Error en los datos de entrada',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.BAD_REQUEST,
          message:'Error en los datos de entrada',
          error:'Bad Request'
        },
      },
    }
  })
  async update(@Res()response, @Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const resStatus = await this.usuariosService.update(id, updateUsuarioDto);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Delete(':id')
  @ApiOperation({summary:'Borrar un usuario por id de la base de datos', description:'EndPoint que elimina un usuario de la base de datos'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Usuario eliminado correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          message:'Usuario eliminado correctamente',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontró el usuario',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'No se encontró el usuario',
          error:'Not Found'
        },
      },
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async remove(@Res()response, @Param('id') id: number) {
    const resStatus = await this.usuariosService.remove(id);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }
}
