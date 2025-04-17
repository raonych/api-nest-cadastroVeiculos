import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import {Veiculo} from './veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo-dto';

@Injectable()
export class VeiculoService{
  constructor(
    @InjectRepository(Veiculo)
    private VeiculoRepository: Repository<Veiculo>,
  ){}

  async create( createVeiculoDto: CreateVeiculoDto ): Promise<Veiculo> {
    const veiculoData = this.VeiculoRepository.create(createVeiculoDto);
    return this.VeiculoRepository.save(veiculoData);
  }

  findAll(): Promise<Veiculo[]>{
    return this.VeiculoRepository.find();
  }

  

}