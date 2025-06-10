import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proprietario, ProprietarioDocument } from './proprietario.schema';
import { CreateProprietarioDto } from './dto/create-proprietario-dto';

@Injectable()
export class ProprietarioService {
  constructor(
    @InjectModel(Proprietario.name)
    private readonly proprietarioModel: Model<ProprietarioDocument>,
  ) {}

  async create(proprietario: CreateProprietarioDto): Promise<Proprietario> {
    const createdProprietario = new this.proprietarioModel(proprietario);
    return createdProprietario.save();
  }

  async findAll(): Promise<Proprietario[]> {
    const proprietariosData = await this.proprietarioModel.find().exec();
    if (proprietariosData.length === 0) {
      throw new HttpException('Nenhum proprietario encontrado', 404);
    }
    return proprietariosData;
  }

  async findOne(id: string): Promise<Proprietario> {
    const proprietarioData = await this.proprietarioModel.findById(id).exec();
    if (!proprietarioData) {
      throw new HttpException('Proprietario não encontrado', 404);
    }
    return proprietarioData;
  }
}