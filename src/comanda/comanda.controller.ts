import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@Controller('comanda')
@ApiTags('Comanda')

export class ComandaController {
  constructor(private readonly comandaService: ComandaService) {}

  @Post()
  @ApiOperation({summary: 'Crear una nueva comanda', description: 'EndPoint que devuelde el objeto creado de una comanda'})
  @ApiBody({type: CreateComandaDto})
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    content: {
      'application/json':{
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error en los datos de entrada',
          error: 'Bad Request'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Sin resultados',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comanda creada correctamente',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.OK,
          comanda: {
            id: 1,
            fechaComanda: new Date(),
            fkIdMesa: 1,
            estatusComanda: 0,
            metodoPago: 'Efectivo',
            total: 100.00,
          }
        }
      }
    }
  })
  async create(@Res()response, @Body() createComandaDto: CreateComandaDto) {
    try{
      const createComandaWithEstatusDto = { ...createComandaDto, estatusComanda: 0};
      const resStatus = await this.comandaService.create(createComandaWithEstatusDto);
      if(resStatus.statusCode === HttpStatus.BAD_REQUEST)
        return response.status(HttpStatus.BAD_REQUEST).json(resStatus);
      else if (resStatus.statusCode === HttpStatus.NOT_FOUND)
        return response.status(HttpStatus.NOT_FOUND).json(resStatus);
      return response.status(HttpStatus.OK).json(resStatus);
    }catch(error){
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error en los datos de entrada',
        error: error.message
      })
    }
  }

  @Get()
  @ApiOperation({summary:'Obtener todas las comandas', description:'EndPoint que devuelve una lista de objetos de comanda'})
  @ApiResponse({
    status: HttpStatus.OK,
  description:'Comandas obtenidas correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          comandas:[
            {
              id: 1,
              fechaComanda: new Date(),
              fkIdMesa: 1,
              estatusComanda: 0,
              metodoPago: 'Efectivo',
              total: 100.00,
              detalleComanda:[
                {
                  id: 1,
                  fkIdComanda: 1,
                  fkIdBebida: 1,
                  cantidad: 2,
                  precioUnitario: 50.00
                },
                {
                  id: 2,
                  fkIdComanda: 1,
                  fkIdBebida: 2,
                  cantidad: 1,
                  precioUnitario: 75.00
                }
              ]
            },
            {
              id: 2,
              fechaComanda: new Date(),
              fkIdMesa: 2,
              estatusComanda: 1,
              metodoPago: 'Tarjeta',
              total: 200.00,
              detalleComanda:[
                {
                  id: 3,
                  fkIdComanda: 2,
                  fkIdBebida: 3,
                  cantidad: 3,
                  precioUnitario: 100.00
                }
              ]
            }
          ]
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontraron resultados',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async findAll(@Res()response) {
    const resStatus= await this.comandaService.findAll();
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get(':id')
  @ApiOperation({summary:'Obtener una comanda por id de la base de datos', description:'EndPoint que devuelve un objeto de comanda'})
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontro la comanda con el id proporcionado',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Comanda obtenida correctamente',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.OK,
          comanda: {
            id: 1,
            fechaComanda: new Date(),
            fkIdUsuario: 1,
            fkIdMesa: 1,
            detalleComanda: [
              {
                id: 1,
                fkIdComanda: 1,
                fkIdBebida: 1,
                cantidad: 1,
                precioUnitario: 10
              }
            ]
          }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:'Error en los datos de entrada',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error en los datos de entrada',
          error: 'Bad Request'
        }
      }
    }
  })
  async findOne(@Res()response, @Param('id') id: number) {
    const resStatus = await this.comandaService.findOne(id);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Patch(':id')
  @ApiOperation({summary:'Actualizar una comanda por id de la base de datos', description:'EndPoint que devuelve un objeto de comanda actualizado'})
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontro la comanda con el id proporcionado',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Comanda actualizada correctamente',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.OK,
          comanda: {
            id: 1,
            fechaComanda: new Date(),
            fkIdMesa: 1,
            estatusComanda: 0,
            metodoPago: 'Efectivo',
            total: 100.00,
          }
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:'Error en los datos de entrada',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Error en los datos de entrada',
          error: 'Bad Request'
        }
      }
    }
  })
  async update(@Res()response, @Param('id') id: number, @Body() updateComandaDto: UpdateComandaDto) {
    const resStatus = await this.comandaService.update(+id, updateComandaDto);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Delete(':id')
  @ApiOperation({summary:'Borrar una comanda por id de la base de datos', description:'EndPoint que elimina una comanda de la base de datos'})
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontro la comanda con el id proporcionado',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron resultados',
          error: 'Not Found'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Comanda eliminada correctamente',
    content:{
      'application/json':{
        example: {
          statusCode: HttpStatus.OK,
          message: 'Comanda eliminada',
        }
      }
    }
  })
  async remove(@Res()response, @Param('id') id: number) {
    const resStatus = await this.comandaService.remove(id);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }
}
