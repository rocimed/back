import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMesaDto } from './create-mesa.dto';
import { IsNumber } from 'class-validator';

export class UpdateMesaDto extends PartialType(CreateMesaDto) {}
