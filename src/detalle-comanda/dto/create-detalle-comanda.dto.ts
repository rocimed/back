import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateDetalleComandaDto {

    @ApiProperty({description:'Cantidad total de bebidas consumidas'})
    @IsNumber()
    cantidad:number;

    @ApiProperty({ description: 'Id de la comanda, identificador de la comanda a la que corresponde los detalles.'})
    @IsOptional()
    @IsNumber()
    fkIdComanda:number;

    @ApiProperty({ description: 'Id de la bebida, identificador de la bebida a la que corresponde los detalles.'})
    @IsNumber()
    fkIdBebida:number;

    @ApiProperty({ description: 'Precio calculado de la cantidad y el precio de la bebida.'})
    @IsNumber()
    precio:number;
}
