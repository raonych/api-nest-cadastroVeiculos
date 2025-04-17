import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import {Veiculo} from './veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo-dto';
import { UpdateVeiculoDto } from './dto/update-veiculo-dto';

@Injectable()
export class VeiculoService{
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
  ){}

  create( createVeiculoDto: CreateVeiculoDto ): Promise<Veiculo> {
    const veiculoData = this.veiculoRepository.create(createVeiculoDto);
    return this.veiculoRepository.save(veiculoData);
  }

  findAll(): Promise<Veiculo[]>{
    const veiculosData = this.veiculoRepository.find();
    if (!veiculosData) {
      throw new HttpException(
        'Veiculo não encontrado',
        404
      );
    }
    return veiculosData;
  }

  async findOne(id: number): Promise<Veiculo>{
    const veiculoData = await this.veiculoRepository.findOneBy({id});
    if (!veiculoData) {
      throw new HttpException(
        'Veiculo não encontrado',
        404
      );
    }
   return veiculoData;
  }
  
  async update(id: number, updateVeiculoDto: UpdateVeiculoDto): Promise<Veiculo> {
    const existingVeiculo = await this.findOne(id);

    if (!existingVeiculo) {
      throw new HttpException('Veiculo não encontrado',404);
    }

    const veiculoData = this.veiculoRepository.merge(existingVeiculo, updateVeiculoDto);
    return await this.veiculoRepository.save(veiculoData);
  }

  async delete(id: number): Promise<Veiculo> {
    const existingVeiculo = await this.findOne(id);

    if (!existingVeiculo) {
      throw new HttpException('Veiculo não encontrado',404);
    }

    return await this.veiculoRepository.remove(existingVeiculo);

  }

}