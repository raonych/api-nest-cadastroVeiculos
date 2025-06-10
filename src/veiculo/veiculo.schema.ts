import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CategoriaVeiculo } from '../enums/categoria-veiculos.enum';
import { Proprietario } from '../proprietario/proprietario.schema';

export type VeiculoDocument = Veiculo & Document;

@Schema({ collection: 'veiculos', timestamps: true })
export class Veiculo {
  _id: Types.ObjectId;

  @Prop({ required: true, maxlength: 7, unique: true })
  placa: string;

  @Prop({ required: true, maxlength: 11, unique: true })
  renavam: string;

  @Prop({ required: true, maxlength: 50 })
  marca: string;

  @Prop({ required: true, maxlength: 50 })
  modelo: string;

  @Prop({ maxlength: 30 })
  cor: string;

  @Prop({ required: true })
  ano_fabricacao: number;

  @Prop({ required: true })
  ano_modelo: number;

  @Prop({ maxlength: 20 })
  tipo_combustivel: string;

  @Prop({
    type: String,
    enum: Object.values(CategoriaVeiculo),
    default: CategoriaVeiculo.AUTOMOVEL,
  })
  categoria: string;

  @Prop({ type: Types.ObjectId, ref: 'Proprietario', default: null })
  proprietario: Types.ObjectId | Proprietario | null;

  createdAt: Date;
  updatedAt: Date;
}

export const VeiculoSchema = SchemaFactory.createForClass(Veiculo);