import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateDetalleComandaDto {

    @ApiProperty({description:'Cantidad total de bebidas consumidas'})
    @IsNumber()
    cantidad:number;

    // @ApiProperty({description:'Estatus de los detalles de la comanda 0=preparando 1=listo'})
    // @IsNumber()
    // estatusDetalle:number;

    @ApiProperty({ description: 'Id de la comanda, identificador de la comanda a la que corresponde los detalles.'})
    @IsOptional()
    @IsNumber()
    fkIdComanda:number;

    @ApiProperty({ description: 'Id de la bebida, identificador de la bebida a la que corresponde los detalles.'})
    @IsNumber()
    fkIdBebida:number;
}
