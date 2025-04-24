import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import {Veiculo} from './veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo-dto';
import { UpdateVeiculoDto } from './dto/update-veiculo-dto';
import { Proprietario } from 'src/proprietario/proprietario.entity';

@Injectable()
export class VeiculoService{
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
    @InjectRepository(Proprietario)
    private readonly proprietarioRepository: Repository<Proprietario>
  ){}

  create( createVeiculoDto: CreateVeiculoDto ): Promise<Veiculo> {
    const veiculoData = this.veiculoRepository.create(createVeiculoDto);
    return this.veiculoRepository.save(veiculoData);
  }

  async findAll(): Promise<Veiculo[]>{
    const veiculosData = await this.veiculoRepository.find();
    if (veiculosData.length === 0) {
      throw new HttpException(
        'Nenhum veiculo encontrado',
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
  async findByProprietarioId(proprietarioId: number): Promise<Veiculo[]> {
    const veiculosProprietario = await this.veiculoRepository.find({
      where: { proprietario: { id: proprietarioId } },
      relations: ['proprietario'],
    });

    if(veiculosProprietario.length === 0){
      throw new HttpException(
        'Este proprietario não possui veiculos',
        404
      );
    }

    return veiculosProprietario;
  }

  async vincularProprietario(veiculoId: number, proprietarioId: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOneBy({ id: veiculoId });
    if (!veiculo) {
      throw new HttpException('Veículo não encontrado',404);
    }

    if(veiculo.proprietario){
      throw new HttpException('Veiculo já possui proprietario', 409);
    }
  
    const proprietario = await this.proprietarioRepository.findOneBy({ id: proprietarioId });
    if (!proprietario) {
      throw new HttpException('Proprietário não encontrado',404);
    }
  
    veiculo.proprietario = proprietario;
  
    return this.veiculoRepository.save(veiculo);
  }

  async removerProprietario(veiculoId: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOneBy({ id: veiculoId });
 
    if (!veiculo) {
      throw new HttpException('Veículo não encontrado', 404);
    }
    
    if(veiculo.proprietario){
      throw new HttpException('Veiculo já não possui proprietario', 409);
    }

    veiculo.proprietario = null;

    return this.veiculoRepository.save(veiculo);
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

  async searchVeiculos(termo: string): Promise<Veiculo[]>{
    if (!termo){
      throw new HttpException('Termo não definido',400);
    };
    

    return this.veiculoRepository
      .createQueryBuilder('veiculo')
      .where('LOWER(placa) LIKE LOWER(:termo)', { termo: `%${termo}%` })
      .orWhere('LOWER(veiculo.renavam) LIKE LOWER(:termo)', { termo: `%${termo}%` })
      .orWhere('LOWER(veiculo.tipo_combustivel) LIKE LOWER(:termo)', { termo: `%${termo}%`})
      .orWhere('LOWER(veiculo.marca) LIKE LOWER(:termo)', { termo: `%${termo}%` })
      .orWhere('LOWER(veiculo.modelo) LIKE LOWER(:termo)', { termo: `%${termo}%` })
      .orWhere('LOWER(veiculo.cor) LIKE :termo', { termo: `%${termo}%` })
      .getMany();
    }

}