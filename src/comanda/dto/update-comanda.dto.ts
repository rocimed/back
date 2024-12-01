import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateComandaDto } from './create-comanda.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateComandaDto /*extends PartialType(CreateComandaDto)*/ {
    @ApiProperty({description:'Estatus para saber su estado actual 0=en proceso, 1=lista, 2=pago'})
    @IsNumber()
    estatusComanda:number;

    @ApiProperty({description:'Metodo de pago al finalizar la comanda'})
    @IsString()
    metodoPago: string;
}
