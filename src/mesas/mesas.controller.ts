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
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('mesas')
@ApiTags('Mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una mesa en la base de datos',
    description: 'EndPoint que devuelve el objeto creado de una mesa',
  })
  @ApiBody({ type: CreateMesaDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mesa creada correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          mesa: {
            id: 1,
            nombreMesa: 'Mesa 1',
            estatusMesa: 1,
            usuario: {
              id: 1,
              nombreUsuario: 'juan',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la mesa con el id proporcionado',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró la mesa con el id proporcionado',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  async create(@Res() response, @Body() createMesaDto: CreateMesaDto) {
    const resStatus = await this.mesasService.create(createMesaDto);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las mesas de la base de datos',
    description: 'EndPoint que devuelve una lista de objetos de mesas',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mesas obtenidas correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          mesas: [
            {
              id: 1,
              nombreMesa: 'Mesa 1',
              estatusMesa: 1,
              usuario: {
                id: 1,
                nombreUsuario: 'juan',
              },
            },
            {
              id: 2,
              nombreMesa: 'Mesa 2',
              estatusMesa: 0,
              usuario: {
                id: 2,
                nombreUsuario: 'pedro',
              },
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron mesas en la base de datos',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron mesas en la base de datos',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  async findAll(@Res() response) {
    const resStatus = await this.mesasService.findAll();
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una mesa por id de la base de datos',
    description: 'EndPoint que devuelve un objeto de mesa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mesa obtenida correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          mesa: {
            id: 1,
            nombreMesa: 'Mesa 1',
            estatusMesa: 1,
            usuario: {
              id: 1,
              nombreUsuario: 'juan',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la mesa con el id proporcionado',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró la mesa con el id proporcionado',
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
    const resStatus = await this.mesasService.findOne(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('usuario/:fkIdUsuario')
  @ApiOperation({
    summary: 'Obtener todas las mesas de un usuario determinado',
    description: 'EndPoint que devuelve una lista de objetos de mesas',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mesas obtenidas correctamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron mesas en la base de datos',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  async findByUser(@Res() response, @Param('fkIdUsuario') fkIdUsuario: number) {
    const resStatus = await this.mesasService.findByUser(fkIdUsuario);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('search/:nombre')
  @ApiOperation({
    summary: 'Buscar mesas por nombre',
    description:
      'Devuelve una lista de mesas cuyo nombre contiene el texto proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mesas encontradas correctamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron mesas',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron mesas',
          error: 'Not Found',
        },
      },
    },
  })
  async findByName(@Res() response, @Param('nombre') nombre: string) {
    const resStatus = await this.mesasService.findByName(nombre);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una mesa por id de la base de datos',
    description: 'EndPoint que actualiza la información de una mesa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mesa actualizada correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          mesaFind: {
            id: 1,
            nombreMesa: 'Mesa 1',
            estatusMesa: 1,
            usuario: {
              id: 1,
              nombreUsuario: 'juan',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la mesa con el id proporcionado',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró la mesa con el id proporcionado',
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
    @Body() updateMesaDto: UpdateMesaDto,
  ) {
    const resStatus = await this.mesasService.update(id, updateMesaDto);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Borrar una mesa por id de la base de datos',
    description: 'EndPoint que elimina una mesa de la base de datos',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mesa eliminada correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          message: 'Mesa eliminada correctamente',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la mesa con el id proporcionado',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró la mesa con el id proporcionado',
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
    const resStatus = await this.mesasService.remove(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }
}
