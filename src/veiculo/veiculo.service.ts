import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Veiculo, VeiculoDocument } from './veiculo.schema';
import { CreateVeiculoDto } from './dto/create-veiculo-dto';
import { UpdateVeiculoDto } from './dto/update-veiculo-dto';
import { Proprietario, ProprietarioDocument } from '../proprietario/proprietario.schema';

@Injectable()
export class VeiculoService {
  private readonly logger = new Logger(VeiculoService.name);

  constructor(
    @InjectModel(Veiculo.name)
    private readonly veiculoModel: Model<VeiculoDocument>,
    @InjectModel(Proprietario.name)
    private readonly proprietarioModel: Model<ProprietarioDocument>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    this.logger.debug(`Criando veículo com placa ${createVeiculoDto.placa}`);
    const createdVeiculo = new this.veiculoModel(createVeiculoDto);
    return createdVeiculo.save();
  }

  async findAll(): Promise<Veiculo[]> {
    this.logger.log('Buscando todos os veículos');
    const veiculosData = await this.veiculoModel
      .find()
      .populate('proprietario')
      .exec();
    if (veiculosData.length === 0) {
      throw new HttpException('Nenhum veiculo encontrado', 404);
    }
    return veiculosData;
  }

  async findOne(id: string): Promise<Veiculo> {
    const veiculoData = await this.veiculoModel
      .findById(id)
      .populate('proprietario')
      .exec();
    if (!veiculoData) {
      throw new HttpException('Veiculo não encontrado', 404);
    }
    return veiculoData;
  }

  async findByProprietarioId(proprietarioId: string): Promise<Veiculo[]> {
    this.logger.warn(
      `Buscando veiculos do proprietario de ID ${proprietarioId}`,
    );
    const veiculosProprietario = await this.veiculoModel
      .find({ proprietario: new Types.ObjectId(proprietarioId) })
      .populate('proprietario')
      .exec();

    if (veiculosProprietario.length === 0) {
      throw new HttpException('Este proprietario não possui veiculos', 404);
    }

    return veiculosProprietario;
  }

  async vincularProprietario(
    veiculoId: string,
    proprietarioId: string,
  ): Promise<Veiculo> {
    this.logger.warn(
      `Vinculando proprietario de ID ${proprietarioId} com veículo de ID ${veiculoId}`,
    );
    const veiculo = await this.veiculoModel.findById(veiculoId).exec();
    if (!veiculo) {
      throw new HttpException('Veículo não encontrado', 404);
    }

    if (veiculo.proprietario) {
      throw new HttpException('Veiculo já possui proprietario', 409);
    }

    const proprietario = await this.proprietarioModel
      .findById(proprietarioId)
      .exec();
    if (!proprietario) {
      throw new HttpException('Proprietário não encontrado', 404);
    }

    veiculo.proprietario = new Types.ObjectId(proprietarioId);

    return veiculo.save();
  }

  async removerProprietario(veiculoId: string): Promise<Veiculo> {
    this.logger.warn(`Removendo proprietario do veículo com ID ${veiculoId}`);
    const veiculo = await this.veiculoModel.findById(veiculoId).exec();

    if (!veiculo) {
      throw new HttpException('Veículo não encontrado', 404);
    }

    if (!veiculo.proprietario) {
      throw new HttpException('Veiculo já não possui proprietario', 409);
    }

    veiculo.proprietario = null;

    return veiculo.save();
  }

  async update(
    id: string,
    updateVeiculoDto: UpdateVeiculoDto,
  ): Promise<Veiculo> {
    this.logger.warn(`Atualizando veículo com dados: ${updateVeiculoDto}`);
    const existingVeiculo = await this.veiculoModel
      .findByIdAndUpdate(id, updateVeiculoDto, { new: true })
      .populate('proprietario')
      .exec();

    if (!existingVeiculo) {
      throw new HttpException('Veiculo não encontrado', 404);
    }

    return existingVeiculo;
  }

  async delete(id: string): Promise<Veiculo> {
    this.logger.warn(`Deletando veículo com ID ${id}`);
    const existingVeiculo = await this.veiculoModel.findByIdAndDelete(id).exec();

    if (!existingVeiculo) {
      throw new HttpException('Veiculo não encontrado', 404);
    }

    return existingVeiculo;
  }

  async searchVeiculos(termo: string): Promise<Veiculo[]> {
    if (!termo) {
      throw new HttpException('Termo não definido', 400);
    }

    const regex = new RegExp(termo, 'i');

    return this.veiculoModel
      .find({
        $or: [
          { placa: regex },
          { renavam: regex },
          { tipo_combustivel: regex },
          { marca: regex },
          { modelo: regex },
          { cor: regex },
        ],
      })
      .populate('proprietario')
      .exec();
  }
}