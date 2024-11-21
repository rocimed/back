import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMesaDto {

    @ApiProperty({ description: 'Nombre de la mesa' })
    @IsString()
    nombreMesa: string;

    @ApiProperty({ description: 'Id del usuario, identificador del usuario que corresponde a esa mesa.'})
    @IsNumber()
    @IsOptional()
    fkIdUsuario?:number;
}
