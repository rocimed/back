import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('usuarios')
@ApiTags('Usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login de usuario',
    description: 'Autentica a un usuario con su nombre de usuario y contraseña',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario autenticado correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          usuario: {
            idUsuario: 1,
            nombreUsuario: 'juan',
            apellidoPat: 'Perez',
            apellidoMat: 'Gonzales',
            rol: 0,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales incorrectas',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
  })
  async login(@Body() loginDto: LoginDto, @Res() response) {
    const resStatus = await this.usuariosService.login(
      loginDto.idUsuario,
      loginDto.contrasena,
    );
    if (resStatus.statusCode !== HttpStatus.OK)
      return response.status(resStatus.statusCode).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un usuario en la base de datos',
    description: 'EndPoint que devuelve el objeto creado de un usuario',
  })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario creado correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          newUsuario: {
            id: 1,
            nombreUsuario: 'juan',
            apellidoPat: 'Perez',
            apellidoMat: 'Gonzales',
            contrasena: '123456',
            rol: 0,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontro el usuario',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Usuario no encontrado',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  async create(@Res() response, @Body() createUsuarioDto: CreateUsuarioDto) {
    const resStatus = await this.usuariosService.create(createUsuarioDto);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get()
  @ApiOperation({
    summary: 'Mostrar todos los usuarios de la base de datos',
    description: 'EndPoint que devuelve una lista de objetos de usuarios',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuarios obtenidos correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          usuarios: [
            {
              id: 1,
              nombreUsuario: 'juan',
              apellidoPat: 'Perez',
              apellidoMat: 'Gonzales',
              contrasena: '123456',
              rol: 0,
            },
            {
              id: 2,
              nombreUsuario: 'ana',
              apellidoPat: 'Lopez',
              apellidoMat: 'Martinez',
              contrasena: '789012',
              rol: 1,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron usuarios',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron usuarios',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  async findAll(@Res() respone) {
    const resStatus = await this.usuariosService.findAll();
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return respone.status(HttpStatus.NOT_FOUND).json(resStatus);
    return respone.status(HttpStatus.OK).json(resStatus);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un usuario por id de la base de datos',
    description: 'EndPoint que devuelve un objeto de usuario',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario obtenido correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          usuario: {
            id: 1,
            nombreUsuario: 'juan',
            apellidoPat: 'Perez',
            apellidoMat: 'Gonzales',
            contrasena: '123456',
            rol: 0,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el usuario',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el usuario',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  async findOne(@Res() response, @Param('id') id: number) {
    const resStatus = await this.usuariosService.findOne(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('rol/:rol')
  @ApiOperation({
    summary: 'Obtener usuarios por rol',
    description: 'Devuelve una lista de usuarios según el rol especificado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuarios obtenidos correctamente.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron usuarios con el rol especificado.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor.',
  })
  async findUsersByRole(@Param('rol') rol: number, @Res() response) {
    const resStatus = await this.usuariosService.findUsersByRole(rol);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('search/:nombre')
  @ApiOperation({
    summary: 'Buscar usuarios por nombre',
    description:
      'Devuelve una lista de usuarios cuyo nombre contiene el texto proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'usuarios encontradas correctamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron usuarios',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron usuarios',
          error: 'Not Found',
        },
      },
    },
  })
  async findByName(@Res() response, @Param('nombre') nombre: string) {
    const resStatus = await this.usuariosService.findByName(nombre);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario por id de la base de datos',
    description: 'EndPoint que actualiza un objeto de usuario',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario actualizado correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          usuarioFind: {
            id: 1,
            nombreUsuario: 'juan',
            apellidoPat: 'Perez',
            apellidoMat: 'Gonzales',
            contrasena: '123456',
            rol: 0,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el usuario',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el usuario',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error en los datos de entrada',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error en los datos de entrada',
          error: 'Bad Request',
        },
      },
    },
  })
  async update(
    @Res() response,
    @Param('id') id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const resStatus = await this.usuariosService.update(id, updateUsuarioDto);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Borrar un usuario por id de la base de datos',
    description: 'EndPoint que elimina un usuario de la base de datos',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario eliminado correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          message: 'Usuario eliminado correctamente',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el usuario',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el usuario',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  async remove(@Res() response, @Param('id') id: number) {
    const resStatus = await this.usuariosService.remove(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }
}
