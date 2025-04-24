import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import {Veiculo} from './veiculo.entity';
import { ProprietarioModule } from 'src/proprietario/proprietario.module';

@Module({ 
  imports: [TypeOrmModule.forFeature([Veiculo]), ProprietarioModule], 
  providers: [VeiculoService], 
  controllers: [VeiculoController], 
  }) 
  export class VeiculoModule {} 


