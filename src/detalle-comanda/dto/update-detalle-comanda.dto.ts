import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDetalleComandaDto } from './create-detalle-comanda.dto';
import { IsNumber } from 'class-validator';

export class UpdateDetalleComandaDto /*extends PartialType(CreateDetalleComandaDto) */{
    
    @ApiProperty({description:'Cantidad total de bebidas consumidas'})
    @IsNumber()
    cantidad:number;

    @ApiProperty({description:'Estatus de los detalles de la comanda 0=preparando 1=listo'})
    @IsNumber()
    estatusDetalle:number;
}
