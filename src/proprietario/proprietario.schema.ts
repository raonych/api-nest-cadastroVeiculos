import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProprietarioDocument = Proprietario & Document;

@Schema({ collection: 'proprietarios', timestamps: true })
export class Proprietario {
  _id: Types.ObjectId;

  @Prop({ required: true, maxlength: 100 })
  nome: string;

  @Prop({ required: true, maxlength: 11, unique: true })
  cpf: string;

  @Prop({ required: true, maxlength: 15 })
  numero: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ProprietarioSchema = SchemaFactory.createForClass(Proprietario);