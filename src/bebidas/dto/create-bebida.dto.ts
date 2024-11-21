import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBebidaDto {

    @ApiProperty({ description: 'Nombre de la bebida' })
    @IsString()
    nombreBebida: string;

    @ApiProperty({description:'Precio unitario de cada bebida'})
    @IsNumber()
    precioBebida:number;

    @ApiProperty({description:'Codigo en base64 de la imagen'})
    @IsOptional()
    @IsString()
    url?: string;
}
