import {
  IsString,
  Length,
} from 'class-validator';

export class CreateProprietarioDto {
  @IsString()
  nome: string;

  @IsString()
  @Length(1,11)
  cpf: string;

  @IsString()
  @Length(1, 15)
  numero: string;
}