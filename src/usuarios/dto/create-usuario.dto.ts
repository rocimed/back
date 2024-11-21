import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty({ description: 'Nombre del usuario' })
    @IsString()
    nombreUsuario: string;

    @ApiProperty({ description: 'Apellido paterno del usuario' })
    @IsString()
    apellidoPat: string;

    @ApiProperty({ description: 'Apellido materno del usuario' })
    @IsString()
    apellidoMat: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsString()
    contrasena: string;

    @ApiProperty({description:'Tipo de rol que tiene el usuario, 0=mesero y 1=admin'})
    @IsNumber()
    rol:number;
}
