import {
  IsString,
  Length,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateVeiculoDto {
  @IsString()
  @Length(7, 7, { message: 'A placa deve conter exatamente 7 caracteres.' })
  placa: string;

  @IsString()
  @Length(9, 11, { message: 'O renavam deve ter entre 9 e 11 caracteres.' })
  renavam: string;

  @IsString()
  @Length(1, 50)
  marca: string;

  @IsString()
  @Length(1, 50)
  modelo: string;

  @IsOptional()
  @IsString()
  @Length(0, 30)
  cor?: string;

  @IsInt({ message: 'Ano de fabricação deve ser um número inteiro.' })
  ano_fabricacao: number;

  @IsInt({ message: 'Ano modelo deve ser um número inteiro.' })
  ano_modelo: number;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  tipo_combustivel?: string;

  @IsOptional()
  @IsString()
  @Length(0, 30)
  categoria?: string;
}