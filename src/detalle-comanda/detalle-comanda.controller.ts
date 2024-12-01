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
import { DetalleComandaService } from './detalle-comanda.service';
import { CreateDetalleComandaDto } from './dto/create-detalle-comanda.dto';
import { UpdateDetalleComandaDto } from './dto/update-detalle-comanda.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { error } from 'console';

@Controller('detalle-comanda')
@ApiTags('Detalle comanda')
export class DetalleComandaController {
  constructor(private readonly detalleComandaService: DetalleComandaService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un detalle de la comanda',
    description:
      'EndPoint que devuelve el objeto creado de un detalle de la comanda',
  })
  @ApiBody({ type: CreateDetalleComandaDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de la comanda creado correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          newDetalleComanda: {
            id: 1,
            comandaId: 1,
            bebidaId: 1,
            cantidad: 1,
            precio: 10.0,
            total: 10.0,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de la comanda',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el detalle de la comanda',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Los datos enviados no son válidos',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Los datos enviados no son válidos',
          error: 'Bad request',
        },
      },
    },
  })
  async create(
    @Res() response,
    @Body() createDetalleComandaDto: CreateDetalleComandaDto,
  ) {
    const resStatus = await this.detalleComandaService.create(
      createDetalleComandaDto,
    );
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los detalles de la comanda',
    description:
      'EndPoint que devuelve una lista de objetos de detalles de la comanda',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalles de la comanda obtenidos correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          detallesComanda: [
            {
              id: 1,
              comandaId: 1,
              bebidaId: 1,
              cantidad: 1,
              precio: 10.0,
              total: 10.0,
            },
            {
              id: 2,
              comandaId: 1,
              bebidaId: 2,
              cantidad: 2,
              precio: 20.0,
              total: 40.0,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de la comanda',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el detalle de la comanda',
        },
      },
    },
  })
  async findAll(@Res() response) {
    const resStatus = await this.detalleComandaService.findAll();
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un detalle de la comanda por id de la base de datos',
    description: 'EndPoint que devuelve un objeto de detalle de la comanda',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de la comanda obtenido correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          detalleComanda: {
            id: 1,
            comandaId: 1,
            bebidaId: 1,
            cantidad: 1,
            precio: 10.0,
            total: 10.0,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de la comanda',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el detalle de la comanda',
        },
      },
    },
  })
  async findOne(@Res() response, @Param('id') id: number) {
    const resStatus = await this.detalleComandaService.findOne(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un detalle de la comanda por id de la base de datos',
    description:
      'EndPoint que actualiza la información de un detalle de la comanda',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de la comanda actualizado correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          detalleComandaFind: {
            id: 1,
            comandaId: 1,
            bebidaId: 1,
            cantidad: 1,
            precio: 10.0,
            total: 10.0,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de la comanda',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el detalle de la comanda',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No se pudo actualizar el detalle de la comanda',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'No se pudo actualizar el detalle de la comanda',
          error: 'Bad request',
        },
      },
    },
  })
  async update(
    @Res() response,
    @Param('id') id: number,
    @Body() updateDetalleComandaDto: UpdateDetalleComandaDto,
  ) {
    const resStatus = await this.detalleComandaService.update(
      id,
      updateDetalleComandaDto,
    );
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Borrar un detalle de la comanda por id de la base de datos',
    description:
      'EndPoint que elimina un detalle de la comanda de la base de datos',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de la comanda eliminado correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          message: 'Detalle de la comanda eliminado correctamente',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró el detalle de la comanda',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontró el detalle de la comanda',
        },
      },
    },
  })
  async remove(@Res() response, @Param('id') id: number) {
    const resStatus = await this.detalleComandaService.remove(id);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get('/comanda/:fkIdComanda')
  @ApiOperation({
    summary: 'Obtener detalles por fkIdComanda',
    description:
      'Devuelve una lista de detalles de comanda que coinciden con el fkIdComanda proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalles obtenidos correctamente',
    content: {
      'application/json': {
        example: {
          statusCode: HttpStatus.OK,
          detalles: [
            {
              idDetalleComanda: 1,
              cantidad: 2,
              precio: 20.0,
              fkIdComanda: 1,
              fkIdBebida: 1,
              estatusDetalle: 0,
            },
            {
              idDetalleComanda: 2,
              cantidad: 1,
              precio: 10.0,
              fkIdComanda: 1,
              fkIdBebida: 2,
              estatusDetalle: 0,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron detalles para la comanda',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del sistema',
  })
  async findByFkIdComanda(
    @Res() response,
    @Param('fkIdComanda') fkIdComanda: number,
  ) {
    const resStatus =
      await this.detalleComandaService.findByFkIdComanda(fkIdComanda);
    if (resStatus.statusCode === HttpStatus.NOT_FOUND) {
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    }
    return response.status(HttpStatus.OK).json(resStatus);
  }
}
