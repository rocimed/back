import { CreateDetalleComandaDto } from "@drink/detalle-comanda/dto/create-detalle-comanda.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, Matches, ValidateNested } from "class-validator";

export class CreateComandaDto {

    @ApiProperty({ description: 'Fecha del pedido a la comanda en formato AAAA-MM-DD' })
    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    fechaComanda: Date;

    @ApiProperty({ description: 'Id del usuario, identificador del bartender que abrió la comanda.'})
    @IsNumber()
    fkIdUsuario:number;

    @ApiProperty({ description: 'Id de la mesa, identificador de la mesa a la que corresponde la comanda.'})
    @IsNumber()
    fkIdMesa:number;
    
    // @ApiProperty({type: [CreateDetalleComandaDto]})
    // @ValidateNested({each: true})
    // @Type(()=> CreateDetalleComandaDto)
    // @IsNotEmpty()
    // detalleComanda: CreateDetalleComandaDto[];
}
