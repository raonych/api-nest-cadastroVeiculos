import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Proprietario } from './proprietario.entity';
import { CreateProprietarioDto } from './dto/create-proprietario-dto';

@Injectable()
export class ProprietarioService {
    constructor(
        @InjectRepository(Proprietario)
        private readonly proprietarioRepository: Repository<Proprietario>,
      ){}

    create( proprietario: CreateProprietarioDto ): Promise<Proprietario> {
         const proprietarioData = this.proprietarioRepository.create(proprietario);
         return this.proprietarioRepository.save(proprietarioData);
    }

    async findAll(): Promise<Proprietario[]> {
        const proprietariosData = await this.proprietarioRepository.find();
        if(proprietariosData.length === 0) {
            throw new HttpException(
                'Nenhum proprietario encontrado',
                404
            );
        }
        return proprietariosData;
    }

    async findOne(id: number): Promise<Proprietario>{
        const proprietarioData = await this.proprietarioRepository.findOneBy({id});
        if(!proprietarioData) {
            throw new HttpException(
                'Proprietario não encontrado',
                404
            );
        }
        return proprietarioData;
    }

        
}
