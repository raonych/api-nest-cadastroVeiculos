import { PartialType } from '@nestjs/mapped-types';
import { CreateProprietarioDto } from './create-proprietario-dto';

export class UpdateVeiculoDto extends PartialType(CreateProprietarioDto) {}
