import { PartialType } from '@nestjs/swagger';
import { CreateBebidaDto } from './create-bebida.dto';

export class UpdateBebidaDto extends PartialType(CreateBebidaDto) {}
