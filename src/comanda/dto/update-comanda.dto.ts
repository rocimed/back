import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateComandaDto } from './create-comanda.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateComandaDto /*extends PartialType(CreateComandaDto)*/ {
    @ApiProperty({description:'Estatus para saber si la comanda esta activa, 0=libre y 1=ocupada'})
    @IsNumber()
    estatusComanda:number;

    @ApiProperty({description:'Metodo de pago al finalizar la comanda'})
    @IsString()
    metodoPago: string;

    // @ApiProperty({description:'Total a pagar de toda la comanda'})
    // @IsNumber()
    // total: number;
}
