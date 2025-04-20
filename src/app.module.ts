import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Veiculo } from './veiculo/veiculo.entity'; 
import { VeiculoModule } from './veiculo/veiculo.module'; 
import { Proprietario } from './proprietario/proprietario.entity'; 
import { ProprietarioModule } from './proprietario/proprietario.module';


@Module({ 
  imports: [ 
    TypeOrmModule.forRoot({ 
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: '',  
      database: 'bdveiculos', 
      entities: [Veiculo, Proprietario], 
      synchronize: true,
    }), 
    VeiculoModule,
    ProprietarioModule 
  ], 
}) 
export class AppModule {} 
