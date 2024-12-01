import { CreateDetalleComandaDto } from "@drink/detalle-comanda/dto/create-detalle-comanda.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsString, Matches, ValidateNested } from "class-validator";

export class CreateComandaDto {

    @ApiProperty({ description: 'Id de la mesa, identificador de la mesa a la que corresponde la comanda.'})
    @IsNumber()
    fkIdMesa:number;

    @ApiProperty({ description: 'Total de la comanda.'})
    @IsNumber()
    total:number;
    
}
