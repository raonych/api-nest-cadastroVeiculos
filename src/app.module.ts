import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Veiculo } from './veiculo/veiculo.entity'; 
import { VeiculoModule } from './veiculo/veiculo.module'; 

@Module({ 
  imports: [ 
    TypeOrmModule.forRoot({ 
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: '',  
      database: 'bdveiculos', 
      entities: [Veiculo], 
      synchronize: false,
    }), 
    VeiculoModule, 
  ], 
}) 
export class AppModule {} 
