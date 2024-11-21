import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMesaDto } from './create-mesa.dto';
import { IsNumber } from 'class-validator';

export class UpdateMesaDto extends PartialType(CreateMesaDto) {

    // @ApiProperty({description:'Estatus para saber si la mesa esta disponible, 0=libre y 1=ocupada'})
    // @IsNumber()
    // estatusMesa:number;
}
