import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { BebidasService } from './bebidas.service';
import { CreateBebidaDto } from './dto/create-bebida.dto';
import { UpdateBebidaDto } from './dto/update-bebida.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { error } from 'console';
import { response } from 'express';

@Controller('bebidas')
@ApiTags('Bebidas')
export class BebidasController {
  constructor(private readonly bebidasService: BebidasService) {}

  @Post()
  @ApiOperation({summary:'Crear una bebida en la base de datos', description:'EndPoint que devuelve el objeto creado de una bebida'})
  @ApiBody({type:CreateBebidaDto})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Bebida creada correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          newBebida:{
            nombreBebida:'Cafe',
            precioBebida:2.5,
            stock:100,
            url:'https://example.com/cafe.jpg'
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontro la bebida',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'Bebida no encontrada',
          error:'Not Found'
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async create(@Res()response, @Body() createBebidaDto: CreateBebidaDto) {
    const resStatus = await this.bebidasService.create(createBebidaDto);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get()
  @ApiOperation({summary:'Obtener todas las bebidas de la base de datos', description:'EndPoint que devuelve una lista de objetos de bebidas'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Bebidas obtenidas correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          bebidas:[
            {
              nombreBebida:'Cafe',
              precioBebida:2.5,
              stock:100,
              url:'https://example.com/cafe.jpg'
            },
            {
              nombreBebida:'Agua',
              precioBebida:1.5,
              stock:200,
              url:'https://example.com/agua.jpg'
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontraron bebidas',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'No se encontraron bebidas',
          error:'Not Found'
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async findAll(@Res()response) {
    const resStatus = await this.bebidasService.findAll();
    if(resStatus.statusCode===HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Get(':id')
  @ApiOperation({summary:'Obtener una bebida por id de la base de datos', description:'EndPoint que devuelve un objeto de bebida'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Bebida obtenida correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          bebida:{
            nombreBebida:'Cafe',
            precioBebida:2.5,
            stock:100,
            url:'https://example.com/cafe.jpg'
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontro la bebida',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'Bebida no encontrada',
          error:'Not Found'
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async findOne(@Res()response, @Param('id') id: number) {
    const resStatus = await this.bebidasService.findOne(id);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Patch(':id')
  @ApiOperation({summary:'Actualizar una bebida por id de la base de datos', description:'EndPoint que actualiza la información de una bebida'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Bebida actualizada correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          bebidaFind:{
            nombreBebida:'Cafe',
            precioBebida:2.5,
            url:'https://example.com/cafe.jpg'
          }
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se actualizó la bebida',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'Bebida no encontrada y actualizada',
          error:'Not Found'
        },
      },
    },
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
    },
  })
  async update(@Res()response, @Param('id') id: number, @Body() updateBebidaDto: UpdateBebidaDto) {
    const resStatus = await this.bebidasService.update(id, updateBebidaDto);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }

  @Delete(':id')
  @ApiOperation({summary:'Borrar una bebida por id de la base de datos', description:'EndPoint que elimina una bebida de la base de datos'})
  @ApiResponse({
    status: HttpStatus.OK,
    description:'Bebida eliminada correctamente',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.OK,
          message:'Bebida eliminada',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:'No se encontró la bebida',
    content:{
      'application/json':{
        example:{
          statusCode: HttpStatus.NOT_FOUND,
          message:'Bebida no encontrada',
          error:'Not Found'
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description:'Error interno en el server',
  })
  async remove(@Res()response, @Param('id') id: number) {
    const resStatus = await this.bebidasService.remove(id);
    if(resStatus.statusCode === HttpStatus.NOT_FOUND)
      return response.status(HttpStatus.NOT_FOUND).json(resStatus);
    return response.status(HttpStatus.OK).json(resStatus);
  }
}
