import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDetalleComandaDto } from './create-detalle-comanda.dto';
import { IsNumber } from 'class-validator';
export class UpdateDetalleComandaDto {
    @ApiProperty({description:'Estatus de los detalles de la comanda 0=preparando 1=listo'})
    @IsNumber()
    estatusDetalle:number;
}
