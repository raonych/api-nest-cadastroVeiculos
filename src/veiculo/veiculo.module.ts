import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import {Veiculo} from './veiculo.entity';

@Module({ 
  imports: [TypeOrmModule.forFeature([Veiculo])], 
  providers: [VeiculoService], 
  controllers: [VeiculoController], 
  }) 
  export class VeiculoModule {} 


