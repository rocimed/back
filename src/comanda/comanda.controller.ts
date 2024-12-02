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
import { ComandaService } from './comanda.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('comanda')
@ApiTags('Comanda')
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva comanda',
    description: 'EndPoint que devuelde el objeto creado de una comanda',
  })
  @ApiBody({ type: CreateComandaDto })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Sin resultados',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comanda creada correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          comanda: {
            id: 1,
            fechaComanda: new Date(),
            fkIdMesa: 1,
            estatusComanda: 0,
            metodoPago: 'Efectivo',
            total: 100.0,
          },
        },
      },
    },
  })
  async create(@Res() response, @Body() createComandaDto: CreateComandaDto) {
    try {
      const createComandaWithEstatusDto = {
        ...createComandaDto,
        estatusComanda: 0,
      };
      const resStatus = await this.comandaService.create(
        createComandaWithEstatusDto,
      );
      if (resStatus.statusCode === HttpStatus.BAD_REQUEST)
        return response.status(HttpStatus.BAD_REQUEST).json(resStatus);
      else if (resStatus.statusCode === HttpStatus.NOT_FOUND)
        return response.status(HttpStatus.NOT_FOUND).json(resStatus);
      return response.status(HttpStatus.OK).json(resStatus);
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error en los datos de entrada',
        error: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las comandas',
    description: 'EndPoint que devuelve una lista de objetos de comanda',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comandas obtenidas correctamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron resultados',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
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
    const resStatus = await this.comandaService.findAll();
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una comanda por id de la base de datos',
    description: 'EndPoint que devuelve un objeto de comanda',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontro la comanda con el id proporcionado',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comanda obtenida correctamente',
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
  async findOne(@Res() response, @Param('id') id: number) {
    const resStatus = await this.comandaService.findOne(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('/estatus/:estatus')
  @ApiOperation({
    summary: 'Obtener comandas por estatus',
    description:
      'EndPoint que devuelve las comandas asociadas a un estatus específico',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el servidor',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron comandas para el estatus especificado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comandas obtenidas correctamente',
  })
  async findByEstatus(@Res() response, @Param('estatus') estatus: number) {
    const resStatus = await this.comandaService.findByEstatus(estatus);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('user/:idUsuario/estatus/:estatus')
  @ApiOperation({
    summary: 'Obtener comandas por usuario y estatus',
    description:
      'EndPoint que devuelve las comandas asociadas a un usuario y un estatus específico',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'No se encontraron comandas para el usuario y el estatus especificados',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comandas obtenidas correctamente',
  })
  async findByUserAndEstado(
    @Res() response,
    @Param('idUsuario') idUsuario: number,
    @Param('estatus') estatus: number,
  ) {
    const resStatus = await this.comandaService.findByUserAndEstado(
      idUsuario,
      estatus,
    );
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una comanda por id de la base de datos',
    description: 'EndPoint que devuelve un objeto de comanda actualizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontro la comanda con el id proporcionado',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comanda actualizada correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          comanda: {
            id: 1,
            fechaComanda: new Date(),
            fkIdMesa: 1,
            estatusComanda: 0,
            metodoPago: 'Efectivo',
            total: 100.0,
          },
        },
      },
    },
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
    @Body() updateComandaDto: UpdateComandaDto,
  ) {
    const resStatus = await this.comandaService.update(+id, updateComandaDto);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Borrar una comanda por id de la base de datos',
    description: 'EndPoint que elimina una comanda de la base de datos',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontro la comanda con el id proporcionado',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comanda eliminada correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          message: 'Comanda eliminada',
        },
      },
    },
  })
  async remove(@Res() response, @Param('id') id: number) {
    const resStatus = await this.comandaService.remove(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('mesa/:fkIdMesa')
  @ApiOperation({
    summary: 'Obtener comandas por mesa, excluye aquellas con estado 0 y 4',
    description:
      'EndPoint que devuelve las comandas asociadas a una mesa específica',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el servidor',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron comandas para la mesa especificada',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comandas obtenidas correctamente',
  })
  async findByMesa(@Res() response, @Param('fkIdMesa') fkIdMesa: number) {
    const resStatus = await this.comandaService.findByMesa(fkIdMesa);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('mesa/:fkIdMesa/estatus/:estatus')
  @ApiOperation({
    summary: 'Obtener comandas por id de mesa y estatus',
    description:
      'EndPoint que devuelve las comandas asociadas a una mesa y un estatus específicos',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el servidor',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'No se encontraron comandas para la mesa y estatus especificados',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comandas obtenidas correctamente',
  })
  async findByMesaAndEstatus(
    @Res() response,
    @Param('fkIdMesa') fkIdMesa: number,
    @Param('estatus') estatus: number,
  ) {
    const resStatus = await this.comandaService.findByMesaAndEstatus(
      fkIdMesa,
      estatus,
    );
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }
}
