import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ description: 'ID del usuario' })
    @IsInt()
    idUsuario: number; 

    @ApiProperty({ description: 'Contraseña del usuario' })
    @IsString()
    contrasena: string;
}
